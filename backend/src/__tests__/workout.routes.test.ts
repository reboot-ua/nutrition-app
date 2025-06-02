import request from 'supertest'
import express from 'express'
import workoutRoutes from '../routes/workout.routes'
import { verifyToken } from '../middleware/auth.middleware'

// Mock the auth middleware
jest.mock('../middleware/auth.middleware', () => ({
  verifyToken: jest.fn((req, res, next) => {
    req.user = { id: 'test-user-id' }
    next()
  }),
}))

// Mock the workout controller
jest.mock('../controllers/workout.controller', () => ({
  createWorkout: jest.fn((req, res) => res.status(201).json({ message: 'Workout created' })),
  getWorkouts: jest.fn((req, res) => res.status(200).json({ message: 'Get all workouts' })),
  getWorkout: jest.fn((req, res) => res.status(200).json({ message: 'Get single workout' })),
  updateWorkout: jest.fn((req, res) => res.status(200).json({ message: 'Workout updated' })),
  deleteWorkout: jest.fn((req, res) => res.status(200).json({ message: 'Workout deleted' })),
}))

describe('Workout Routes', () => {
  let app: express.Application

  beforeEach(() => {
    app = express()
    app.use(express.json())
    app.use('/workouts', workoutRoutes)
  })

  describe('POST /workouts', () => {
    it('should create a new workout', async () => {
      const response = await request(app)
        .post('/workouts')
        .send({
          type: 'Running',
          duration: 30,
          calories: 300,
          date: '2024-03-20T10:00:00Z',
        })

      expect(response.status).toBe(201)
      expect(response.body).toEqual({ message: 'Workout created' })
    })
  })

  describe('GET /workouts', () => {
    it('should get all workouts', async () => {
      const response = await request(app).get('/workouts')

      expect(response.status).toBe(200)
      expect(response.body).toEqual({ message: 'Get all workouts' })
    })
  })

  describe('GET /workouts/:id', () => {
    it('should get a single workout', async () => {
      const response = await request(app).get('/workouts/123')

      expect(response.status).toBe(200)
      expect(response.body).toEqual({ message: 'Get single workout' })
    })
  })

  describe('PUT /workouts/:id', () => {
    it('should update a workout', async () => {
      const response = await request(app)
        .put('/workouts/123')
        .send({
          type: 'Cycling',
          duration: 45,
          calories: 400,
        })

      expect(response.status).toBe(200)
      expect(response.body).toEqual({ message: 'Workout updated' })
    })
  })

  describe('DELETE /workouts/:id', () => {
    it('should delete a workout', async () => {
      const response = await request(app).delete('/workouts/123')

      expect(response.status).toBe(200)
      expect(response.body).toEqual({ message: 'Workout deleted' })
    })
  })

  describe('Authentication', () => {
    it('should verify token for all routes', async () => {
      // Override the mock for this test
      ;(verifyToken as jest.Mock).mockImplementationOnce((req, res, next) => {
        req.user = { id: 'test-user-id' }
        next()
      })

      const response = await request(app).get('/workouts')

      expect(verifyToken).toHaveBeenCalled()
      expect(response.status).toBe(200)
    })
  })
}) 