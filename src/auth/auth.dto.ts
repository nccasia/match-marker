import { Transform } from 'class-transformer'

export class AccessTokenResponse {
  accessToken: string
  refreshToken: string
  expiresIn: number
  refreshExpiresIn: number
}

export class LoginEmailDto {
  @Transform(email => email.value ? email.value.toLowerCase() : '')
  email: string
}

export class RefreshDto {
  refreshToken: string
}
