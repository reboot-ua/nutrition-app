import { Request, Response } from 'express'
import { calculateCaloriesForUser } from '../controllers/calorie.controller'
import * as calorieService from '../services/calorie.service'

jest.mock('../services/calorie.service')

describe('Calorie Controller', () => {
  let mockRequest: Partial<Request>
  let mockResponse: Partial<Response>
  let responseObject: any

  beforeEach(() => {
    responseObject = {}
    mockRequest = {
      body: {},
    }
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockImplementation((result) => {
        responseObject = result
        return mockResponse
      }),
    }
  })

  describe('calculateCaloriesForUser', () => {
    it('should calculate calories successfully', async () => {
      const mockResult = {
        bmr: 1649,
        tdee: 2556,
      }

      mockRequest.body = {
        weight: 70,
        height: 175,
        age: 30,
        gender: 'male',
        activity: 'moderate',
      }

      ;(calorieService.calculateCalories as jest.Mock).mockReturnValue(mockResult)

      await calculateCaloriesForUser(mockRequest as Request, mockResponse as Response)

      expect(mockResponse.status).toHaveBeenCalledWith(200)
      expect(responseObject).toEqual(mockResult)
    })

    it('should return 400 if weight is missing', async () => {
      mockRequest.body = {
        height: 175,
        age: 30,
        gender: 'male',
        activity: 'moderate',
      }

      await calculateCaloriesForUser(mockRequest as Request, mockResponse as Response)

      expect(mockResponse.status).toHaveBeenCalledWith(400)
      expect(responseObject).toEqual({ error: 'Усі поля обовʼязкові' })
    })

    it('should return 400 if height is missing', async () => {
      mockRequest.body = {
        weight: 70,
        age: 30,
        gender: 'male',
        activity: 'moderate',
      }

      await calculateCaloriesForUser(mockRequest as Request, mockResponse as Response)

      expect(mockResponse.status).toHaveBeenCalledWith(400)
      expect(responseObject).toEqual({ error: 'Усі поля обовʼязкові' })
    })

    it('should return 400 if age is missing', async () => {
      mockRequest.body = {
        weight: 70,
        height: 175,
        gender: 'male',
        activity: 'moderate',
      }

      await calculateCaloriesForUser(mockRequest as Request, mockResponse as Response)

      expect(mockResponse.status).toHaveBeenCalledWith(400)
      expect(responseObject).toEqual({ error: 'Усі поля обовʼязкові' })
    })

    it('should return 400 if gender is missing', async () => {
      mockRequest.body = {
        weight: 70,
        height: 175,
        age: 30,
        activity: 'moderate',
      }

      await calculateCaloriesForUser(mockRequest as Request, mockResponse as Response)

      expect(mockResponse.status).toHaveBeenCalledWith(400)
      expect(responseObject).toEqual({ error: 'Усі поля обовʼязкові' })
    })

    it('should return 400 if activity is missing', async () => {
      mockRequest.body = {
        weight: 70,
        height: 175,
        age: 30,
        gender: 'male',
      }

      await calculateCaloriesForUser(mockRequest as Request, mockResponse as Response)

      expect(mockResponse.status).toHaveBeenCalledWith(400)
      expect(responseObject).toEqual({ error: 'Усі поля обовʼязкові' })
    })

    it('should return 500 if calculation fails', async () => {
      mockRequest.body = {
        weight: 70,
        height: 175,
        age: 30,
        gender: 'male',
        activity: 'moderate',
      }

      ;(calorieService.calculateCalories as jest.Mock).mockImplementation(() => {
        throw new Error('Calculation failed')
      })

      await calculateCaloriesForUser(mockRequest as Request, mockResponse as Response)

      expect(mockResponse.status).toHaveBeenCalledWith(500)
      expect(responseObject).toEqual({ error: 'Помилка сервера' })
    })
  })
}) 