import { registerAs } from '@nestjs/config'

type CustomerEnvType = {
  webAppUrl: string
  cdn: string
}

const COMMON_ENV = 'common'

export const commonEnv = registerAs(
  COMMON_ENV,
  (): CustomerEnvType => ({
    webAppUrl: process.env.WEB_APP_URL || '',
    cdn: process.env.S3_CDN || '',
  }),
)
