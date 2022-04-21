import { HttpStatus, INestApplication } from '@nestjs/common'
import request from 'supertest'
import { setup, teardown } from '../src/database/orm.config'
import { buildTestApp } from './common'
import { LoginAuth, RegisterAuth } from './common/auth'

describe('AuthenticationController', () => {
  let app: INestApplication

  beforeAll(async () => {
    await setup()

    app = await buildTestApp()
  })

  afterAll(async () => {
    await teardown()
    await app.close()
  })

  it('POST /register should be OK', () => {
    return RegisterAuth(app)
  })

  it('POST /login should be OK', () => {
    return LoginAuth(app)
  })

  it('PUT /refresh token', async () => {
    const token = await LoginAuth(app)
    return request(app.getHttpServer())
      .put('/auth/refresh')
      .set('Content-Type', 'application/json')
      .send({
        refreshToken: token.refreshToken,
      })
      .expect(HttpStatus.OK)
  })

  it('POST /reset password', async () => {
    return request(app.getHttpServer())
      .post('/auth/reset-password')
      .set('Content-Type', 'application/json')
      .send({
        email: 'johndoe@a.co',
      })
      .expect(HttpStatus.CREATED)
  })
})
