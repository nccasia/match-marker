import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { JwtConfig } from './jwt.config'
import { JwtStrategy } from './strategies/jwt.strategy'
import { TokensService } from './tokens.service'

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      useClass: JwtConfig,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, TokensService],
  exports: [AuthService],
})
export class AuthModule {}
