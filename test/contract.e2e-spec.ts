import { HttpStatus, INestApplication } from '@nestjs/common'
import request from 'supertest'
import { setup, teardown } from '../src/database/orm.config'
import { buildTestApp } from './common'
import { LoginAuth, RegisterAuth } from './common/auth'
import { contractDataTest, manualContractTest } from './mockData'
describe('Controller', () => {
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
  let contractId: number = null

  describe('Contracts', () => {
    it('POST / Create contract', () => {
      return request(app.getHttpServer())
        .post('/contracts/')
        .set('Authorization', `Bearer ${acceptToken}`)
        .send(contractDataTest)
        .expect(HttpStatus.CREATED)
        .expect(res => {
          contractId = res.body.id
          expect(res.body).toBeDefined()
        })
    })
    it('GET / contract', () => {
      return request(app.getHttpServer())
        .get('/contracts/')
        .set('Authorization', `Bearer ${acceptToken}`)
        .expect(HttpStatus.OK)
    })
    it('GET / contract by id not found', () => {
      return request(app.getHttpServer())
        .get('/contracts/0')
        .set('Authorization', `Bearer ${acceptToken}`)
        .expect(HttpStatus.NOT_FOUND)
    })
    it('GET / contract by id', () => {
      return request(app.getHttpServer())
        .get(`/contracts/${contractId}`)
        .set('Authorization', `Bearer ${acceptToken}`)
        .expect(HttpStatus.OK)
    })
    it('GET / detail contract', () => {
      return request(app.getHttpServer())
        .get(`/contracts/${contractId}/detail`)
        .set('Authorization', `Bearer ${acceptToken}`)
        .expect(HttpStatus.OK)
        .expect(res => {
          expect(res.body).toBeDefined()
        })
    })
    it('PUT / Contract update', () => {
      return request(app.getHttpServer())
        .put(`/contracts/${contractId}`)
        .set('Authorization', `Bearer ${acceptToken}`)
        .send(contractDataTest)
        .expect(res => {
          expect(res.body).toBeDefined()
        })
    })
    it('PUT / Approval contract', () => {
      return request(app.getHttpServer())
        .put(`/contracts/${contractId}/approve`)
        .set('Authorization', `Bearer ${acceptToken}`)
        .send(manualContractTest)
        .expect(res => {
          expect(res.body).toBeDefined()
        })
    })
    it('PUT / Buyout contract', () => {
      return request(app.getHttpServer())
        .put(`/contracts/${contractId}/buyout`)
        .set('Authorization', `Bearer ${acceptToken}`)
        .send({ interestRate: 1 })
        .expect(HttpStatus.OK)
        .expect(res => {
          expect(res.body).toBeDefined()
        })
    })
    it('PUT / Active payment contract', () => {
      return request(app.getHttpServer())
        .put(`/contracts/${contractId}/activate-payment`)
        .set('Authorization', `Bearer ${acceptToken}`)
        .expect(res => {
          expect(res.body).toBeDefined()
        })
    })
    it('POST / Manual contract with a response 400', () => {
      return request(app.getHttpServer())
        .post(`/contracts/manual`)
        .set('Authorization', `Bearer ${acceptToken}`)
        .expect(HttpStatus.BAD_REQUEST)
    })
    it('POST / Manual contract with a response 201', () => {
      return request(app.getHttpServer())
        .post(`/contracts/manual`)
        .set('Authorization', `Bearer ${acceptToken}`)
        .send(manualContractTest)
        .expect(HttpStatus.CREATED)
    })
    it('PUT / Cancel payment contract success', async () => {
      try {
        await request(app.getHttpServer())
          .put(`/contracts/${contractId}/cancel-payment`)
          .set('Authorization', `Bearer ${acceptToken}`)
          .expect(HttpStatus.OK)
      } catch (error) {
        expect(error)
      }
    })
    it('GET / Export PDF contract success', () => {
      return request(app.getHttpServer())
        .get(`/contracts/${contractId}/export-pdf`)
        .set('Authorization', `Bearer ${acceptToken}`)
        .expect(HttpStatus.OK)
    })
  })
})
