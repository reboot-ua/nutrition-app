import request from 'supertest'
import { app } from '../app'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

describe('Auth Endpoints', () => {
  const testUser = {
    email: 'test@example.com',
    password: 'password123',
    age: 25,
    weight: 70,
    height: 180,
    gender: 'male',
    activity: 'moderate',
    goal: 'lose_weight'
  }

  let accessToken: string
  let refreshToken: string

  describe('POST /register', () => {
    it('should register a new user', async () => {
      const res = await request(app)
        .post('/auth/register')
        .send(testUser)

      expect(res.status).toBe(201)
      expect(res.body).toHaveProperty('accessToken')
      expect(res.body).toHaveProperty('refreshToken')
      expect(res.body.user).toHaveProperty('email', testUser.email)

      accessToken = res.body.accessToken
      refreshToken = res.body.refreshToken
    })

    it('should not register user with existing email', async () => {
      const res = await request(app)
        .post('/auth/register')
        .send(testUser)

      expect(res.status).toBe(400)
      expect(res.body).toHaveProperty('error', 'Користувач вже існує')
    })
  })

  describe('POST /login', () => {
    it('should login with correct credentials', async () => {
      const res = await request(app)
        .post('/auth/login')
        .send({
          email: testUser.email,
          password: testUser.password
        })

      expect(res.status).toBe(200)
      expect(res.body).toHaveProperty('accessToken')
      expect(res.body).toHaveProperty('refreshToken')
      expect(res.body.user).toHaveProperty('email', testUser.email)

      accessToken = res.body.accessToken
      refreshToken = res.body.refreshToken
    })

    it('should not login with wrong password', async () => {
      const res = await request(app)
        .post('/auth/login')
        .send({
          email: testUser.email,
          password: 'wrongpassword'
        })

      expect(res.status).toBe(401)
      expect(res.body).toHaveProperty('error', 'Невірний email або пароль')
    })
  })

  describe('POST /refresh-token', () => {
    it('should refresh tokens with valid refresh token', async () => {
      const res = await request(app)
        .post('/auth/refresh-token')
        .send({ refreshToken })

      expect(res.status).toBe(200)
      expect(res.body).toHaveProperty('accessToken')
      expect(res.body).toHaveProperty('refreshToken')

      accessToken = res.body.accessToken
      refreshToken = res.body.refreshToken
    })

    it('should not refresh with invalid token', async () => {
      const res = await request(app)
        .post('/auth/refresh-token')
        .send({ refreshToken: 'invalid-token' })

      expect(res.status).toBe(401)
      expect(res.body).toHaveProperty('error', 'Недійсний refresh token')
    })
  })

  describe('GET /protected-route', () => {
    it('should access protected route with valid token', async () => {
      const res = await request(app)
        .get('/auth/protected-route')
        .set('Authorization', `Bearer ${accessToken}`)

      expect(res.status).toBe(200)
      expect(res.body).toHaveProperty('user')
      expect(res.body.user).toHaveProperty('email', testUser.email)
    })

    it('should not access protected route without token', async () => {
      const res = await request(app)
        .get('/auth/protected-route')

      expect(res.status).toBe(401)
      expect(res.body).toHaveProperty('error', 'Токен не надано')
    })
  })

  describe('POST /logout', () => {
    it('should logout successfully', async () => {
      const res = await request(app)
        .post('/auth/logout')
        .send({ refreshToken })

      expect(res.status).toBe(200)
      expect(res.body).toHaveProperty('message', 'Вихід виконано успішно')
    })

    it('should not refresh token after logout', async () => {
      const res = await request(app)
        .post('/auth/refresh-token')
        .send({ refreshToken })

      expect(res.status).toBe(401)
      expect(res.body).toHaveProperty('error', 'Недійсний refresh token')
    })
  })
}) 