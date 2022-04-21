import { ConfigService, ConfigType } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'
import { appConfig } from './common/app.config'
import { baseEnv, BASE_ENV } from './configs'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  appConfig(app)

  const config = new DocumentBuilder()
    .setTitle('Token Sales')
    .setDescription('Token Sales API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  const configService = app.get(ConfigService)
  const base = configService.get<ConfigType<typeof baseEnv>>(BASE_ENV)

  await app.listen(base.port)
  console.log(`Listening on: ${await app.getUrl()}...`)
}
bootstrap()
