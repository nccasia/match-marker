import { HttpStatus, INestApplication } from '@nestjs/common'
import request from 'supertest'
import { setup, teardown } from '../src/database/orm.config'
import { buildTestApp } from './common'

describe('MediaController', () => {
  let app: INestApplication

  beforeAll(async () => {
    await setup()

    app = await buildTestApp()
  })

  afterAll(async () => {
    await teardown()
    await app.close()
  })

  it('POST /media success', () => {
    return request(app.getHttpServer())
      .post('/media/get-presigned-url')
      .set('Content-Type', 'application/json')
      .send({
        type: 'DOCUMENT_INFO',
        fileName: 'string',
        contentType: 'string',
      })
      .expect(HttpStatus.CREATED)
  })
})
