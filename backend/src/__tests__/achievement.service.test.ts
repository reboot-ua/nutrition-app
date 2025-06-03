import { PrismaClient, Achievement, UserAchievement } from '@prisma/client'
import {
  initializeAchievements,
  getUserAchievements,
  checkAchievements,
  getAchievementsList
} from '../services/achievement.service'

jest.mock('@prisma/client', () => {
  const mockPrisma = {
    achievement: {
      findMany: jest.fn(),
      createMany: jest.fn(),
      findFirst: jest.fn()
    },
    userAchievement: {
      findMany: jest.fn(),
      create: jest.fn(),
      findFirst: jest.fn()
    },
    meal: {
      findFirst: jest.fn(),
      count: jest.fn()
    },
    workout: {
      findFirst: jest.fn(),
      count: jest.fn()
    },
    follow: {
      findFirst: jest.fn(),
      count: jest.fn()
    }
  }
  return {
    PrismaClient: jest.fn(() => mockPrisma)
  }
})

const prisma = new PrismaClient()

describe('Achievement Service', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('initializeAchievements', () => {
    it('should create achievements if they do not exist', async () => {
      const mockFindMany = jest.fn().mockResolvedValue([])
      const mockCreateMany = jest.fn().mockResolvedValue({ count: 3 })

      ;(prisma.achievement.findMany as jest.Mock).mockImplementation(mockFindMany)
      ;(prisma.achievement.createMany as jest.Mock).mockImplementation(mockCreateMany)

      await initializeAchievements()

      expect(prisma.achievement.findMany).toHaveBeenCalled()
      expect(prisma.achievement.createMany).toHaveBeenCalledWith({
        data: [
          {
            name: 'First Meal',
            description: 'Add your first meal',
            icon: '🍽️'
          },
          {
            name: 'First Workout',
            description: 'Complete your first workout',
            icon: '💪'
          },
          {
            name: 'First Follower',
            description: 'Get your first follower',
            icon: '👥'
          }
        ]
      })
    })

    it('should not create achievements if they already exist', async () => {
      const mockAchievements: Achievement[] = [
        {
          id: 'ach1',
          name: 'First Meal',
          description: 'Add your first meal',
          icon: '🍽️',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]

      const mockFindMany = jest.fn().mockResolvedValue(mockAchievements)
      ;(prisma.achievement.findMany as jest.Mock).mockImplementation(mockFindMany)

      await initializeAchievements()

      expect(prisma.achievement.findMany).toHaveBeenCalled()
      expect(prisma.achievement.createMany).not.toHaveBeenCalled()
    })
  })

  describe('getUserAchievements', () => {
    it('should return user achievements', async () => {
      const mockAchievements: (UserAchievement & { achievement: Achievement })[] = [
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

      const mockFindMany = jest.fn().mockResolvedValue(mockAchievements)
      ;(prisma.userAchievement.findMany as jest.Mock).mockImplementation(mockFindMany)

      const result = await getUserAchievements('user1')

      expect(result).toEqual(mockAchievements)
      expect(prisma.userAchievement.findMany).toHaveBeenCalledWith({
        where: { userId: 'user1' },
        include: { achievement: true }
      })
    })
  })

  describe('checkAchievements', () => {
    it('should award first meal achievement', async () => {
      const mockAchievement: Achievement = {
        id: 'ach1',
        name: 'First Meal',
        description: 'Add your first meal',
        icon: '🍽️',
        createdAt: new Date(),
        updatedAt: new Date()
      };
      (prisma.meal.count as jest.Mock).mockResolvedValue(1);
      (prisma.userAchievement.findFirst as jest.Mock).mockResolvedValue(null);
      (prisma.achievement.findFirst as jest.Mock).mockResolvedValue(mockAchievement);
      (prisma.userAchievement.create as jest.Mock).mockResolvedValue({
        id: 'ua1',
        userId: 'user1',
        achievementId: 'ach1',
        earnedAt: new Date(),
        achievement: mockAchievement
      });
      (prisma.workout.count as jest.Mock).mockResolvedValue(0);
      (prisma.follow.count as jest.Mock).mockResolvedValue(0);

      const result = await checkAchievements('user1');

      expect(result).toContainEqual(
        expect.objectContaining({
          achievement: expect.objectContaining({ name: 'First Meal' })
        })
      );
    });

    it('should award first workout achievement', async () => {
      const mockAchievement: Achievement = {
        id: 'ach2',
        name: 'First Workout',
        description: 'Complete your first workout',
        icon: '💪',
        createdAt: new Date(),
        updatedAt: new Date()
      };
      (prisma.workout.count as jest.Mock).mockResolvedValue(1);
      (prisma.userAchievement.findFirst as jest.Mock).mockResolvedValueOnce(null);
      (prisma.achievement.findFirst as jest.Mock).mockResolvedValueOnce(mockAchievement);
      (prisma.userAchievement.create as jest.Mock).mockResolvedValueOnce({
        id: 'ua2',
        userId: 'user1',
        achievementId: 'ach2',
        earnedAt: new Date(),
        achievement: mockAchievement
      });
      (prisma.meal.count as jest.Mock).mockResolvedValue(0);
      (prisma.follow.count as jest.Mock).mockResolvedValue(0);

      const result = await checkAchievements('user1');

      expect(result).toContainEqual(
        expect.objectContaining({
          achievement: expect.objectContaining({ name: 'First Workout' })
        })
      );
    });

    it('should award first follower achievement', async () => {
      const mockAchievement: Achievement = {
        id: 'ach3',
        name: 'First Follower',
        description: 'Get your first follower',
        icon: '👥',
        createdAt: new Date(),
        updatedAt: new Date()
      };
      (prisma.follow.count as jest.Mock).mockResolvedValue(1);
      (prisma.userAchievement.findFirst as jest.Mock).mockResolvedValueOnce(null);
      (prisma.achievement.findFirst as jest.Mock).mockResolvedValueOnce(mockAchievement);
      (prisma.userAchievement.create as jest.Mock).mockResolvedValueOnce({
        id: 'ua3',
        userId: 'user1',
        achievementId: 'ach3',
        earnedAt: new Date(),
        achievement: mockAchievement
      });
      (prisma.meal.count as jest.Mock).mockResolvedValue(0);
      (prisma.workout.count as jest.Mock).mockResolvedValue(0);

      const result = await checkAchievements('user1');

      expect(result).toContainEqual(
        expect.objectContaining({
          achievement: expect.objectContaining({ name: 'First Follower' })
        })
      );
    });
  })

  describe('getAchievementsList', () => {
    it('should return all achievements', async () => {
      const mockAchievements: Achievement[] = [
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

      const mockFindMany = jest.fn().mockResolvedValue(mockAchievements)
      ;(prisma.achievement.findMany as jest.Mock).mockImplementation(mockFindMany)

      const result = await getAchievementsList()

      expect(result).toEqual(mockAchievements)
      expect(prisma.achievement.findMany).toHaveBeenCalled()
    })
  })
}) 