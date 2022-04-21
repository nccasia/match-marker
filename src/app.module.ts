import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common'
import { ConfigModule, ConfigType } from '@nestjs/config'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { authEnv } from './auth/auth.env'
import { AuthModule } from './auth/auth.module'
import { commonEnv } from './common/common.env'
import { CommonModule } from './common/common.module'
import { baseEnv, baseEnvConfig } from './configs/base.env'
import { dbEnv } from './database/db.env';
import { LoggerService } from './middleware/logger/logger.service'
import { MiddlewareModule } from './middleware/middleware.module'
import { MongooseModule } from '@nestjs/mongoose'
import { MatchMarkerModule } from './modules/matchmarker/matchmarker.module'
import { PresenceModule } from './modules/presence/presence.module'
import { RedisPresence } from './modules/presence/redis.presence'

@Module({
  imports: [
    ConfigModule.forRoot({
      ...baseEnvConfig,
      isGlobal: true,
      load: [baseEnv, authEnv, commonEnv, dbEnv],
    }),
    PresenceModule.forRoot(new RedisPresence()),
    AuthModule,
    CommonModule,
    MiddlewareModule,
    MatchMarkerModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [dbEnv.KEY],
      useFactory: (cfg: ConfigType<typeof dbEnv>) => {
         return  {
            uri: cfg.connection
         }
      }
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerService).forRoutes({ path: '*', method: RequestMethod.ALL })
  }
}
