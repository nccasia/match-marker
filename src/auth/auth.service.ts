import { Inject, Injectable } from '@nestjs/common'
import { ConfigService, ConfigType } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { createHmac } from 'crypto'
import { AccessTokenResponse, LoginEmailDto } from './auth.dto'
import { authEnv } from './auth.env'
import { TokensService } from './tokens.service'

const ALGO = 'sha256'
const ENCODING = 'base64'

@Injectable()
export class AuthService {
  constructor(
    @Inject(authEnv.KEY) private readonly env: ConfigType<typeof authEnv>,
    private readonly jwtService: JwtService,
    private configService: ConfigService,
    private readonly tokensService: TokensService,
  ) {}

  private hash(raw: string, salt: string): string {
    return createHmac(ALGO, salt).update(raw).digest(ENCODING)
  }

  async loginByEmail({ email }: LoginEmailDto): Promise<AccessTokenResponse> {
    return this.tokensService.emailUpsert({ email })
  }
}
