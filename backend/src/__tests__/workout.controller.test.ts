import { Request, Response } from 'express'
import { createWorkout, getWorkouts, getWorkout, updateWorkout, deleteWorkout } from '../controllers/workout.controller'

// Mock prisma singleton
const mockCreate = jest.fn()
const mockFindMany = jest.fn()
const mockFindUnique = jest.fn()
const mockUpdate = jest.fn()
const mockDelete = jest.fn()

jest.mock('../prisma', () => ({
  prisma: {
    workout: {
      create: (...args: any) => mockCreate(...args),
      findMany: (...args: any) => mockFindMany(...args),
      findUnique: (...args: any) => mockFindUnique(...args),
      update: (...args: any) => mockUpdate(...args),
      delete: (...args: any) => mockDelete(...args),
    },
  },
}))

describe('Workout Controller', () => {
  let mockRequest: Partial<Request>
  let mockResponse: Partial<Response>
  let responseObject: any

  beforeEach(() => {
    responseObject = {}
    mockRequest = {
      user: { id: 'test-user-id', email: 'test@example.com' },
      body: {},
      params: {},
    }
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockImplementation((result) => {
        responseObject = result
        return mockResponse
      }),
    }
    mockCreate.mockReset()
    mockFindMany.mockReset()
    mockFindUnique.mockReset()
    mockUpdate.mockReset()
    mockDelete.mockReset()
  })

  describe('createWorkout', () => {
    it('should create a workout successfully', async () => {
      const workoutData = {
        type: 'Running',
        duration: 30,
        calories: 300,
        date: '2024-03-20T10:00:00Z',
      }
      mockRequest.body = workoutData

      const mockCreatedWorkout = {
        id: 'test-workout-id',
        ...workoutData,
        userId: 'test-user-id',
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      mockCreate.mockResolvedValue(mockCreatedWorkout)

      await createWorkout(mockRequest as Request, mockResponse as Response)

      expect(mockResponse.status).toHaveBeenCalledWith(201)
      expect(responseObject).toEqual(mockCreatedWorkout)
    })

    it('should return 401 if user is not authenticated', async () => {
      mockRequest.user = undefined

      await createWorkout(mockRequest as Request, mockResponse as Response)

      expect(mockResponse.status).toHaveBeenCalledWith(401)
      expect(responseObject).toEqual({ error: 'Необхідна авторизація' })
    })

    it('should return 400 if required fields are missing', async () => {
      mockRequest.body = {}

      await createWorkout(mockRequest as Request, mockResponse as Response)

      expect(mockResponse.status).toHaveBeenCalledWith(400)
      expect(responseObject).toEqual({ error: 'Усі поля обовʼязкові' })
    })
  })

  describe('getWorkouts', () => {
    it('should get all workouts for user', async () => {
      const mockWorkouts = [
        {
          id: 'workout-1',
          type: 'Running',
          duration: 30,
          calories: 300,
          date: new Date(),
          userId: 'test-user-id',
        },
      ]

      mockFindMany.mockResolvedValue(mockWorkouts)

      await getWorkouts(mockRequest as Request, mockResponse as Response)

      expect(mockResponse.status).toHaveBeenCalledWith(200)
      expect(responseObject).toEqual(mockWorkouts)
    })

    it('should return 401 if user is not authenticated', async () => {
      mockRequest.user = undefined

      await getWorkouts(mockRequest as Request, mockResponse as Response)

      expect(mockResponse.status).toHaveBeenCalledWith(401)
      expect(responseObject).toEqual({ error: 'Необхідна авторизація' })
    })
  })

  describe('getWorkout', () => {
    it('should get a specific workout', async () => {
      const mockWorkout = {
        id: 'test-workout-id',
        type: 'Running',
        duration: 30,
        calories: 300,
        date: new Date(),
        userId: 'test-user-id',
      }

      mockRequest.params = { id: 'test-workout-id' }
      mockFindUnique.mockResolvedValue(mockWorkout)

      await getWorkout(mockRequest as Request, mockResponse as Response)

      expect(mockResponse.status).toHaveBeenCalledWith(200)
      expect(responseObject).toEqual(mockWorkout)
    })

    it('should return 404 if workout not found', async () => {
      mockRequest.params = { id: 'non-existent-id' }
      mockFindUnique.mockResolvedValue(null)

      await getWorkout(mockRequest as Request, mockResponse as Response)

      expect(mockResponse.status).toHaveBeenCalledWith(404)
      expect(responseObject).toEqual({ error: 'Тренування не знайдено' })
    })
  })

  describe('updateWorkout', () => {
    it('should update a workout successfully', async () => {
      const updateData = {
        type: 'Cycling',
        duration: 45,
        calories: 400,
      }

      const existingWorkout = {
        id: 'test-workout-id',
        type: 'Running',
        duration: 30,
        calories: 300,
        date: new Date(),
        userId: 'test-user-id',
      }

      const updatedWorkout = {
        ...existingWorkout,
        ...updateData,
      }

      mockRequest.params = { id: 'test-workout-id' }
      mockRequest.body = updateData
      mockFindUnique.mockResolvedValue(existingWorkout)
      mockUpdate.mockResolvedValue(updatedWorkout)

      await updateWorkout(mockRequest as Request, mockResponse as Response)

      expect(mockResponse.status).toHaveBeenCalledWith(200)
      expect(responseObject).toEqual(updatedWorkout)
    })

    it('should return 403 if user tries to update another user\'s workout', async () => {
      const existingWorkout = {
        id: 'test-workout-id',
        type: 'Running',
        duration: 30,
        calories: 300,
        date: new Date(),
        userId: 'another-user-id',
      }

      mockRequest.params = { id: 'test-workout-id' }
      mockRequest.body = { type: 'Cycling' }
      mockFindUnique.mockResolvedValue(existingWorkout)

      await updateWorkout(mockRequest as Request, mockResponse as Response)

      expect(mockResponse.status).toHaveBeenCalledWith(403)
      expect(responseObject).toEqual({ error: 'Немає доступу' })
    })

    it('should return 404 if workout not found', async () => {
      mockRequest.params = { id: 'not-found-id' }
      mockFindUnique.mockResolvedValue(null)

      await updateWorkout(mockRequest as Request, mockResponse as Response)

      expect(mockResponse.status).toHaveBeenCalledWith(404)
      expect(responseObject).toEqual({ error: 'Тренування не знайдено' })
    })
  })

  describe('deleteWorkout', () => {
    it('should delete a workout successfully', async () => {
      const existingWorkout = {
        id: 'test-workout-id',
        type: 'Running',
        duration: 30,
        calories: 300,
        date: new Date(),
        userId: 'test-user-id',
      }

      mockRequest.params = { id: 'test-workout-id' }
      mockFindUnique.mockResolvedValue(existingWorkout)
      mockDelete.mockResolvedValue(existingWorkout)

      await deleteWorkout(mockRequest as Request, mockResponse as Response)

      expect(mockResponse.status).toHaveBeenCalledWith(200)
      expect(responseObject).toEqual({ message: 'Тренування видалено' })
    })

    it('should return 403 if user tries to delete another user\'s workout', async () => {
      const existingWorkout = {
        id: 'test-workout-id',
        type: 'Running',
        duration: 30,
        calories: 300,
        date: new Date(),
        userId: 'another-user-id',
      }

      mockRequest.params = { id: 'test-workout-id' }
      mockFindUnique.mockResolvedValue(existingWorkout)

      await deleteWorkout(mockRequest as Request, mockResponse as Response)

      expect(mockResponse.status).toHaveBeenCalledWith(403)
      expect(responseObject).toEqual({ error: 'Немає доступу' })
    })

    it('should return 404 if workout not found', async () => {
      mockRequest.params = { id: 'not-found-id' }
      mockFindUnique.mockResolvedValue(null)

      await deleteWorkout(mockRequest as Request, mockResponse as Response)

      expect(mockResponse.status).toHaveBeenCalledWith(404)
      expect(responseObject).toEqual({ error: 'Тренування не знайдено' })
    })
  })
}) 