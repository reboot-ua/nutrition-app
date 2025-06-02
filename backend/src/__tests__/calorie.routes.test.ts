import request from 'supertest'
import express from 'express'
import calorieRoutes from '../routes/calorie.routes'
import * as calorieController from '../controllers/calorie.controller'

jest.mock('../controllers/calorie.controller')
jest.mock('../middleware/auth.middleware', () => ({
  verifyToken: (req: any, res: any, next: any) => next(),
}))

describe('Calorie Routes', () => {
  const app = express()
  app.use(express.json())
  app.use('/api/calories', calorieRoutes)

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('POST /api/calories/calculate', () => {
    it('should call calculateCaloriesForUser controller', async () => {
      const mockResult = {
        bmr: 1649,
        tdee: 2556,
      }

      ;(calorieController.calculateCaloriesForUser as jest.Mock).mockImplementation((req, res) => {
        res.status(200).json(mockResult)
      })

      const response = await request(app)
        .post('/api/calories/calculate')
        .send({
          weight: 70,
          height: 175,
          age: 30,
          gender: 'male',
          activity: 'moderate',
        })

      expect(response.status).toBe(200)
      expect(response.body).toEqual(mockResult)
      expect(calorieController.calculateCaloriesForUser).toHaveBeenCalled()
    })
  })
}) 