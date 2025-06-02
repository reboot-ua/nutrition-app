import request from 'supertest'
import { app } from '../app'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

describe('Auth Endpoints', () => {
  beforeAll(async () => {
    await prisma.user.deleteMany()
  })

  afterAll(async () => {
    await prisma.$disconnect()
  })

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

  describe('POST /api/auth/register', () => {
    it('should register a new user', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send(testUser)

      expect(res.status).toBe(201)
      expect(res.body).toHaveProperty('accessToken')
      expect(res.body).toHaveProperty('refreshToken')
      expect(res.body.user).toHaveProperty('email', testUser.email)
    })

    it('should not register a user with existing email', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send(testUser)

      expect(res.status).toBe(400)
      expect(res.body).toHaveProperty('error', 'Користувач вже існує')
    })
  })

  describe('POST /api/auth/login', () => {
    it('should login with valid credentials', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: testUser.email,
          password: testUser.password
        })

      expect(res.status).toBe(200)
      expect(res.body).toHaveProperty('accessToken')
      expect(res.body).toHaveProperty('refreshToken')
      expect(res.body.user).toHaveProperty('email', testUser.email)
    })

    it('should not login with invalid credentials', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: testUser.email,
          password: 'wrongpassword'
        })

      expect(res.status).toBe(401)
      expect(res.body).toHaveProperty('error', 'Невірний email або пароль')
    })
  })

  describe('POST /api/auth/refresh-token', () => {
    let refreshToken: string

    beforeAll(async () => {
      const loginRes = await request(app)
        .post('/api/auth/login')
        .send({
          email: testUser.email,
          password: testUser.password
        })
      refreshToken = loginRes.body.refreshToken
    })

    it('should refresh token with valid refresh token', async () => {
      const res = await request(app)
        .post('/api/auth/refresh-token')
        .send({ refreshToken })

      expect(res.status).toBe(200)
      expect(res.body).toHaveProperty('accessToken')
      expect(res.body).toHaveProperty('refreshToken')
    })

    it('should not refresh token with invalid refresh token', async () => {
      const res = await request(app)
        .post('/api/auth/refresh-token')
        .send({ refreshToken: 'invalid-token' })

      expect(res.status).toBe(401)
      expect(res.body).toHaveProperty('error', 'Недійсний refresh token')
    })
  })

  describe('POST /api/auth/logout', () => {
    let accessToken: string
    let refreshToken: string

    beforeAll(async () => {
      const loginRes = await request(app)
        .post('/api/auth/login')
        .send({
          email: testUser.email,
          password: testUser.password
        })
      accessToken = loginRes.body.accessToken
      refreshToken = loginRes.body.refreshToken
    })

    it('should logout with valid tokens', async () => {
      const res = await request(app)
        .post('/api/auth/logout')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ refreshToken })

      expect(res.status).toBe(200)
      expect(res.body).toHaveProperty('message', 'Вихід виконано успішно')
    })

    it('should not logout without access token', async () => {
      const res = await request(app)
        .post('/api/auth/logout')
        .send({ refreshToken })

      expect(res.status).toBe(401)
      expect(res.body).toHaveProperty('error', 'Токен не надано')
    })
  })
}) 