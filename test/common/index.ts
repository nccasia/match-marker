import { INestApplication } from '@nestjs/common'
import { Test, TestingModule, TestingModuleBuilder } from '@nestjs/testing'
import { AppModule } from '../../src/app.module'
import { appConfig } from '../../src/common/app.config'

export const buildTestApp = async (
  builder: TestingModuleBuilder = Test.createTestingModule({
    imports: [AppModule],
  }),
): Promise<INestApplication> => {
  const module: TestingModule = await builder.compile()
  const app = module.createNestApplication()
  appConfig(app)
  await app.init()

  return app
}
