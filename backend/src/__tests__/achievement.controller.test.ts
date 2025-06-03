import { Request, Response } from 'express'
import {
  getUserAchievementsController,
  checkAchievementsController,
  getAchievementsListController
} from '../controllers/achievement.controller'
import * as achievementService from '../services/achievement.service'

jest.mock('../services/achievement.service')

describe('Achievement Controller', () => {
  let mockRequest: Partial<Request>
  let mockResponse: Partial<Response>
  let mockJson: jest.Mock
  let mockStatus: jest.Mock

  beforeEach(() => {
    mockJson = jest.fn()
    mockStatus = jest.fn().mockReturnValue({ json: mockJson })
    mockResponse = {
      json: mockJson,
      status: mockStatus
    }
    jest.clearAllMocks()
  })

  describe('getUserAchievementsController', () => {
    it('should return user achievements', async () => {
      const mockAchievements = [
        {
          id: 'ua1',
          userId: 'user1',
          achievementId: 'ach1',
          earnedAt: new Date(),
          achievement: {
            id: 'ach1',
            name: 'First Meal',
            description: 'Add your first meal',
            icon: '🍽️',
            createdAt: new Date(),
            updatedAt: new Date()
          }
        }
      ]

      mockRequest = {
        user: { id: 'user1', email: 'test@example.com' }
      }

      jest.spyOn(achievementService, 'getUserAchievements').mockResolvedValue(mockAchievements)

      await getUserAchievementsController(mockRequest as Request, mockResponse as Response)

      expect(mockStatus).toHaveBeenCalledWith(200)
      expect(mockJson).toHaveBeenCalledWith({
        message: 'User achievements retrieved successfully',
        achievements: mockAchievements
      })
    })

    it('should handle errors', async () => {
      mockRequest = {
        user: { id: 'user1', email: 'test@example.com' }
      }

      jest.spyOn(achievementService, 'getUserAchievements').mockRejectedValue(new Error('Test error'))

      await getUserAchievementsController(mockRequest as Request, mockResponse as Response)

      expect(mockStatus).toHaveBeenCalledWith(500)
      expect(mockJson).toHaveBeenCalledWith({
        message: 'Error retrieving user achievements',
        error: 'Test error'
      })
    })
  })

  describe('checkAchievementsController', () => {
    it('should check and return new achievements', async () => {
      const mockAchievements = [
        {
          id: 'ua1',
          userId: 'user1',
          achievementId: 'ach1',
          earnedAt: new Date(),
          achievement: {
            id: 'ach1',
            name: 'First Meal',
            description: 'Add your first meal',
            icon: '🍽️',
            createdAt: new Date(),
            updatedAt: new Date()
          }
        }
      ]

      mockRequest = {
        user: { id: 'user1', email: 'test@example.com' }
      }

      jest.spyOn(achievementService, 'checkAchievements').mockResolvedValue(mockAchievements)

      await checkAchievementsController(mockRequest as Request, mockResponse as Response)

      expect(mockStatus).toHaveBeenCalledWith(200)
      expect(mockJson).toHaveBeenCalledWith({
        message: 'Achievements checked successfully',
        achievements: mockAchievements
      })
    })

    it('should handle errors', async () => {
      mockRequest = {
        user: { id: 'user1', email: 'test@example.com' }
      }

      jest.spyOn(achievementService, 'checkAchievements').mockRejectedValue(new Error('Test error'))

      await checkAchievementsController(mockRequest as Request, mockResponse as Response)

      expect(mockStatus).toHaveBeenCalledWith(500)
      expect(mockJson).toHaveBeenCalledWith({
        message: 'Error checking achievements',
        error: 'Test error'
      })
    })
  })

  describe('getAchievementsListController', () => {
    it('should return all achievements', async () => {
      const mockAchievements = [
        {
          id: 'ach1',
          name: 'First Meal',
          description: 'Add your first meal',
          icon: '🍽️',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 'ach2',
          name: 'First Workout',
          description: 'Complete your first workout',
          icon: '💪',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]

      jest.spyOn(achievementService, 'getAchievementsList').mockResolvedValue(mockAchievements)

      await getAchievementsListController(mockRequest as Request, mockResponse as Response)

      expect(mockStatus).toHaveBeenCalledWith(200)
      expect(mockJson).toHaveBeenCalledWith({
        message: 'Achievements list retrieved successfully',
        achievements: mockAchievements
      })
    })

    it('should handle errors', async () => {
      jest.spyOn(achievementService, 'getAchievementsList').mockRejectedValue(new Error('Test error'))

      await getAchievementsListController(mockRequest as Request, mockResponse as Response)

      expect(mockStatus).toHaveBeenCalledWith(500)
      expect(mockJson).toHaveBeenCalledWith({
        message: 'Error retrieving achievements list',
        error: 'Test error'
      })
    })
  })
}) 