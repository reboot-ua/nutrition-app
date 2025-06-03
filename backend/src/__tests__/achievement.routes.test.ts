import request from 'supertest'
import express from 'express'
import achievementRoutes from '../routes/achievement.routes'
import * as achievementController from '../controllers/achievement.controller'
import { verifyToken } from '../middleware/auth.middleware'

jest.mock('../controllers/achievement.controller')
jest.mock('../middleware/auth.middleware')

describe('Achievement Routes', () => {
  let app: express.Application

  beforeEach(() => {
    app = express()
    app.use(express.json())
    app.use('/api/achievements', achievementRoutes)
    jest.clearAllMocks()
  })

  describe('GET /api/achievements/my', () => {
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

      const expectedResponse = {
        message: 'User achievements retrieved successfully',
        achievements: mockAchievements.map(achievement => ({
          ...achievement,
          earnedAt: achievement.earnedAt.toISOString(),
          achievement: {
            ...achievement.achievement,
            createdAt: achievement.achievement.createdAt.toISOString(),
            updatedAt: achievement.achievement.updatedAt.toISOString()
          }
        }))
      }

      ;(verifyToken as jest.Mock).mockImplementation((req, res, next) => {
        req.user = { id: 'user1', email: 'test@example.com' }
        next()
      })

      jest.spyOn(achievementController, 'getUserAchievementsController').mockImplementation(
        (req, res) => {
          return Promise.resolve(res.status(200).json(expectedResponse))
        }
      )

      const response = await request(app).get('/api/achievements/my')

      expect(response.status).toBe(200)
      expect(response.body).toEqual(expectedResponse)
    })
  })

  describe('POST /api/achievements/check', () => {
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

      const expectedResponse = {
        message: 'Achievements checked successfully',
        newAchievements: mockAchievements.map(achievement => ({
          ...achievement,
          earnedAt: achievement.earnedAt.toISOString(),
          achievement: {
            ...achievement.achievement,
            createdAt: achievement.achievement.createdAt.toISOString(),
            updatedAt: achievement.achievement.updatedAt.toISOString()
          }
        }))
      }

      ;(verifyToken as jest.Mock).mockImplementation((req, res, next) => {
        req.user = { id: 'user1', email: 'test@example.com' }
        next()
      })

      jest.spyOn(achievementController, 'checkAchievementsController').mockImplementation(
        (req, res) => {
          return Promise.resolve(res.status(200).json(expectedResponse))
        }
      )

      const response = await request(app).post('/api/achievements/check')

      expect(response.status).toBe(200)
      expect(response.body).toEqual(expectedResponse)
    })
  })

  describe('GET /api/achievements', () => {
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

      const expectedResponse = {
        message: 'Achievements retrieved successfully',
        achievements: mockAchievements.map(achievement => ({
          ...achievement,
          createdAt: achievement.createdAt.toISOString(),
          updatedAt: achievement.updatedAt.toISOString()
        }))
      }

      jest.spyOn(achievementController, 'getAchievementsListController').mockImplementation(
        (req, res) => {
          return Promise.resolve(res.status(200).json(expectedResponse))
        }
      )

      const response = await request(app).get('/api/achievements')

      expect(response.status).toBe(200)
      expect(response.body).toEqual(expectedResponse)
    })
  })
}) 