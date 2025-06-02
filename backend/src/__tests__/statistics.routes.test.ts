import request from 'supertest'
import express from 'express'
import statisticsRoutes from '../routes/statistics.routes'
import * as statisticsController from '../controllers/statistics.controller'

jest.mock('../controllers/statistics.controller')
jest.mock('../middleware/auth.middleware', () => ({
  verifyToken: (req: any, res: any, next: any) => next(),
}))

describe('Statistics Routes', () => {
  const app = express()
  app.use(express.json())
  app.use('/api/statistics', statisticsRoutes)

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('GET /api/statistics/daily', () => {
    it('should call getDailyStats controller', async () => {
      const mockStats = {
        meals: {
          totalCalories: 1200,
          totalProtein: 50,
          totalCarbs: 120,
          totalFat: 40,
        },
        workouts: {
          totalDuration: 75,
          totalCalories: 700,
        },
      }

      ;(statisticsController.getDailyStats as jest.Mock).mockImplementation((req, res) => {
        res.status(200).json(mockStats)
      })

      const response = await request(app)
        .get('/api/statistics/daily')
        .query({ date: '2024-03-20' })

      expect(response.status).toBe(200)
      expect(response.body).toEqual(mockStats)
      expect(statisticsController.getDailyStats).toHaveBeenCalled()
    })
  })

  describe('GET /api/statistics/weekly', () => {
    it('should call getWeeklyStats controller', async () => {
      const mockStats = {
        meals: {
          totalCalories: 8400,
          totalProtein: 350,
          totalCarbs: 840,
          totalFat: 280,
        },
        workouts: {
          totalDuration: 525,
          totalCalories: 4900,
        },
      }

      ;(statisticsController.getWeeklyStats as jest.Mock).mockImplementation((req, res) => {
        res.status(200).json(mockStats)
      })

      const response = await request(app)
        .get('/api/statistics/weekly')
        .query({ startDate: '2024-03-20' })

      expect(response.status).toBe(200)
      expect(response.body).toEqual(mockStats)
      expect(statisticsController.getWeeklyStats).toHaveBeenCalled()
    })
  })

  describe('GET /api/statistics/monthly', () => {
    it('should call getMonthlyStats controller', async () => {
      const mockStats = {
        meals: {
          totalCalories: 36000,
          totalProtein: 1500,
          totalCarbs: 3600,
          totalFat: 1200,
        },
        workouts: {
          totalDuration: 2250,
          totalCalories: 21000,
        },
      }

      ;(statisticsController.getMonthlyStats as jest.Mock).mockImplementation((req, res) => {
        res.status(200).json(mockStats)
      })

      const response = await request(app)
        .get('/api/statistics/monthly')
        .query({ startDate: '2024-03-01' })

      expect(response.status).toBe(200)
      expect(response.body).toEqual(mockStats)
      expect(statisticsController.getMonthlyStats).toHaveBeenCalled()
    })
  })
}) 