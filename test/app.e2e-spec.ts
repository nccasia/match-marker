import { INestApplication } from '@nestjs/common'
import request from 'supertest'
import { setup, teardown } from '../src/database/orm.config'
import { buildTestApp } from './common'

describe('AppController (e2e)', () => {
  let app: INestApplication

  beforeAll(async () => {
    await setup()

    app = await buildTestApp()
  })

  afterAll(async () => {
    await teardown()
    await app.close()
  })

  it('App should be defined', () => expect(app).toBeDefined())

  it('/ (GET)', () => {
    return request(app.getHttpServer()).get('/').expect(200).expect('Hello World!')
  })
})
