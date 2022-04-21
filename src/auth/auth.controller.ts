import { Body, Controller, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { RefreshDto } from './auth.dto';
import { TokensService } from './tokens.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly tokenService: TokensService) {}

    @Post('/refresh-token')
    refreshToken(@Body() body: RefreshDto) {
      return this.tokenService.createAccessTokenFromRefreshToken(body.refreshToken);
    }
}
