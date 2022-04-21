import { HttpStatus, INestApplication } from '@nestjs/common'
import request from 'supertest'
import { setup, teardown } from '../src/database/orm.config'
import { buildTestApp } from './common'
import { LoginAuth, RegisterAuth } from './common/auth'

describe('User Controller', () => {
  let app: INestApplication
  let acceptToken: string = null

  beforeAll(async () => {
    await setup()

    app = await buildTestApp()
    await RegisterAuth(app)

    const login = await LoginAuth(app)
    acceptToken = login.acceptToken
  })

  afterAll(async () => {
    await teardown()
    await app.close()
  })

  it('GET / user by id', () => {
    return request(app.getHttpServer())
      .get('/users/1')
      .set('Authorization', `Bearer ${acceptToken}`)
      .expect(HttpStatus.OK)
  })

  it('GET / user info', () => {
    return request(app.getHttpServer()).get('/me').set('Authorization', `Bearer ${acceptToken}`).expect(HttpStatus.OK)
  })

  it('GET / list users', () => {
    return request(app.getHttpServer())
      .get('/users')
      .set('Authorization', `Bearer ${acceptToken}`)
      .expect(HttpStatus.OK)
  })
})
