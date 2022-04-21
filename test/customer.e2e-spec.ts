import { HttpStatus, INestApplication } from '@nestjs/common'
import request from 'supertest'
import { setup, teardown } from '../src/database/orm.config'
import { buildTestApp } from './common'
import { LoginAuth, RegisterAuth } from './common/auth'
import { contractDataTest, customerDataTest } from './mockData'

describe('Customer Controller', () => {
  let app: INestApplication
  let acceptToken: string = null
  let contractToken: string = null
  let contractId: string = null

  beforeAll(async () => {
    await setup()

    app = await buildTestApp()
    await RegisterAuth(app)

    const login = await LoginAuth(app)
    acceptToken = login.acceptToken

    await request(app.getHttpServer())
      .post('/contracts/')
      .set('Authorization', `Bearer ${acceptToken}`)
      .send(contractDataTest)
      .expect(HttpStatus.CREATED)
      .expect(res => {
        contractId = res.body.id
        expect(res.body).toBeDefined()
      })
    await request(app.getHttpServer())
      .get(`/contracts/${contractId}`)
      .set('Authorization', `Bearer ${acceptToken}`)
      .expect(HttpStatus.OK)
      .expect(res => {
        contractToken = res.body.tokenContract
        expect(res.body).toBeDefined()
      })
  })

  afterAll(async () => {
    await teardown()
    await app.close()
  })

  it('GET / token customer not found', () => {
    return request(app.getHttpServer())
      .get('/customers/token-contract?token=1abc')
      .set('Authorization', `Bearer ${acceptToken}`)
      .expect(HttpStatus.NOT_FOUND)
  })

  it('GET / token customer success', async () => {
    return request(app.getHttpServer())
      .get(`/customers/token-contract?token=${contractToken}`)
      .set('Authorization', `Bearer ${acceptToken}`)
      .expect(HttpStatus.OK)
  })

  it('PUT / token customer success', async () => {
    return request(app.getHttpServer())
      .put(`/customers?token=${contractToken}`)
      .set('Authorization', `Bearer ${acceptToken}`)
      .send(customerDataTest)
      .expect(HttpStatus.OK)
  })
})
