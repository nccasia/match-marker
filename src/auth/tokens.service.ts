import { BadRequestException, Inject, Injectable } from '@nestjs/common'
import { ConfigType } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { JwtPayload, SignOptions, TokenExpiredError } from 'jsonwebtoken'
import { AccessTokenResponse, LoginEmailDto } from './auth.dto'
import { authEnv } from './auth.env'

@Injectable()
export class TokensService {
  constructor(
    @Inject(authEnv.KEY) private readonly env: ConfigType<typeof authEnv>,
    private readonly jwtService: JwtService,
  ) {}

  verify(refreshToken: string): JwtPayload {
    let payload: JwtPayload
    try {
      payload = this.jwtService.verify(refreshToken)
    } catch (e) {
      if (e instanceof TokenExpiredError) {
        throw new BadRequestException('Refresh token expired')
      }
      throw new BadRequestException('Invalid refresh token')
    }

    if (!payload.jti) {
      throw new BadRequestException('Refresh token malformed')
    }

    return payload
  }

  async generateRefreshToken(email: string) : Promise<string> {
    const refreshToken = this.jwtService.sign(
      { sub: email },
      { expiresIn: this.env.jwtRefreshExp, jwtid: email },
    )
    return refreshToken;
  }

  async emailUpsert({ email }: LoginEmailDto): Promise<AccessTokenResponse> {
    const accessToken = this.jwtService.sign({ sub: email })
    const refreshToken = await this.generateRefreshToken(email)
    return { 
      accessToken,
      refreshToken,
      expiresIn: this.env.jwtExp,
      refreshExpiresIn: this.env.jwtRefreshExp
    }
  }

  async createAccessTokenFromRefreshToken(refreshToken: string) : Promise<AccessTokenResponse> {
    const payload = await this.verify(refreshToken);
    return this.emailUpsert({ email: payload.sub });
  }
}
