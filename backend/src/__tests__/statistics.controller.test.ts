import { Request, Response } from 'express'
import { getDailyStats, getWeeklyStats, getMonthlyStats } from '../controllers/statistics.controller'
import * as statisticsService from '../services/statistics.service'

jest.mock('../services/statistics.service')

describe('Statistics Controller', () => {
  let mockRequest: Partial<Request>
  let mockResponse: Partial<Response>
  let responseObject: any

  beforeEach(() => {
    responseObject = {}
    mockRequest = {
      user: { id: 'test-user-id', email: 'test@example.com' },
      query: {},
    }
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockImplementation((result) => {
        responseObject = result
        return mockResponse
      }),
    }
  })

  describe('getDailyStats', () => {
    it('should return daily statistics', async () => {
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

      mockRequest.query = { date: '2024-03-20' }
      ;(statisticsService.getDailyStatistics as jest.Mock).mockResolvedValue(mockStats)

      await getDailyStats(mockRequest as Request, mockResponse as Response)

      expect(mockResponse.status).toHaveBeenCalledWith(200)
      expect(responseObject).toEqual(mockStats)
    })

    it('should return 401 if user is not authenticated', async () => {
      mockRequest.user = undefined

      await getDailyStats(mockRequest as Request, mockResponse as Response)

      expect(mockResponse.status).toHaveBeenCalledWith(401)
      expect(responseObject).toEqual({ error: 'Необхідна авторизація' })
    })

    it('should return 400 if date is missing', async () => {
      mockRequest.query = {}

      await getDailyStats(mockRequest as Request, mockResponse as Response)

      expect(mockResponse.status).toHaveBeenCalledWith(400)
      expect(responseObject).toEqual({ error: 'Дата обовʼязкова' })
    })
  })

  describe('getWeeklyStats', () => {
    it('should return weekly statistics', async () => {
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

      mockRequest.query = { startDate: '2024-03-20' }
      ;(statisticsService.getWeeklyStatistics as jest.Mock).mockResolvedValue(mockStats)

      await getWeeklyStats(mockRequest as Request, mockResponse as Response)

      expect(mockResponse.status).toHaveBeenCalledWith(200)
      expect(responseObject).toEqual(mockStats)
    })

    it('should return 401 if user is not authenticated', async () => {
      mockRequest.user = undefined

      await getWeeklyStats(mockRequest as Request, mockResponse as Response)

      expect(mockResponse.status).toHaveBeenCalledWith(401)
      expect(responseObject).toEqual({ error: 'Необхідна авторизація' })
    })

    it('should return 400 if startDate is missing', async () => {
      mockRequest.query = {}

      await getWeeklyStats(mockRequest as Request, mockResponse as Response)

      expect(mockResponse.status).toHaveBeenCalledWith(400)
      expect(responseObject).toEqual({ error: 'Дата початку обовʼязкова' })
    })
  })

  describe('getMonthlyStats', () => {
    it('should return monthly statistics', async () => {
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

      mockRequest.query = { startDate: '2024-03-01' }
      ;(statisticsService.getMonthlyStatistics as jest.Mock).mockResolvedValue(mockStats)

      await getMonthlyStats(mockRequest as Request, mockResponse as Response)

      expect(mockResponse.status).toHaveBeenCalledWith(200)
      expect(responseObject).toEqual(mockStats)
    })

    it('should return 401 if user is not authenticated', async () => {
      mockRequest.user = undefined

      await getMonthlyStats(mockRequest as Request, mockResponse as Response)

      expect(mockResponse.status).toHaveBeenCalledWith(401)
      expect(responseObject).toEqual({ error: 'Необхідна авторизація' })
    })

    it('should return 400 if startDate is missing', async () => {
      mockRequest.query = {}

      await getMonthlyStats(mockRequest as Request, mockResponse as Response)

      expect(mockResponse.status).toHaveBeenCalledWith(400)
      expect(responseObject).toEqual({ error: 'Дата початку обовʼязкова' })
    })
  })
}) 