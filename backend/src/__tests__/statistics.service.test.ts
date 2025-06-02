import { prisma } from '../prisma'
import { getDailyStatistics, getWeeklyStatistics, getMonthlyStatistics } from '../services/statistics.service'

jest.mock('../prisma', () => ({
  prisma: {
    meal: {
      findMany: jest.fn(),
    },
    workout: {
      findMany: jest.fn(),
    },
  },
}))

describe('Statistics Service', () => {
  const mockUserId = 'test-user-id'
  const mockDate = new Date('2024-03-20')
  const mockMeals = [
    {
      id: '1',
      userId: mockUserId,
      name: 'Breakfast',
      calories: 500,
      protein: 20,
      carbs: 50,
      fat: 15,
      date: mockDate,
    },
    {
      id: '2',
      userId: mockUserId,
      name: 'Lunch',
      calories: 700,
      protein: 30,
      carbs: 70,
      fat: 25,
      date: mockDate,
    },
  ]
  const mockWorkouts = [
    {
      id: '1',
      userId: mockUserId,
      type: 'Running',
      duration: 30,
      calories: 300,
      date: mockDate,
    },
    {
      id: '2',
      userId: mockUserId,
      type: 'Cycling',
      duration: 45,
      calories: 400,
      date: mockDate,
    },
  ]

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('getDailyStatistics', () => {
    it('should return daily statistics', async () => {
      ;(prisma.meal.findMany as jest.Mock).mockResolvedValue(mockMeals)
      ;(prisma.workout.findMany as jest.Mock).mockResolvedValue(mockWorkouts)

      const result = await getDailyStatistics(mockUserId, mockDate)

      expect(result).toEqual({
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
      })
    })

    it('should return zero values when no data exists', async () => {
      ;(prisma.meal.findMany as jest.Mock).mockResolvedValue([])
      ;(prisma.workout.findMany as jest.Mock).mockResolvedValue([])

      const result = await getDailyStatistics(mockUserId, mockDate)

      expect(result).toEqual({
        meals: {
          totalCalories: 0,
          totalProtein: 0,
          totalCarbs: 0,
          totalFat: 0,
        },
        workouts: {
          totalDuration: 0,
          totalCalories: 0,
        },
      })
    })
  })

  describe('getWeeklyStatistics', () => {
    it('should return weekly statistics', async () => {
      ;(prisma.meal.findMany as jest.Mock).mockResolvedValue(mockMeals)
      ;(prisma.workout.findMany as jest.Mock).mockResolvedValue(mockWorkouts)

      const result = await getWeeklyStatistics(mockUserId, mockDate)

      expect(result).toEqual({
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
      })
    })

    it('should return zero values when no data exists', async () => {
      ;(prisma.meal.findMany as jest.Mock).mockResolvedValue([])
      ;(prisma.workout.findMany as jest.Mock).mockResolvedValue([])

      const result = await getWeeklyStatistics(mockUserId, mockDate)

      expect(result).toEqual({
        meals: {
          totalCalories: 0,
          totalProtein: 0,
          totalCarbs: 0,
          totalFat: 0,
        },
        workouts: {
          totalDuration: 0,
          totalCalories: 0,
        },
      })
    })
  })

  describe('getMonthlyStatistics', () => {
    it('should return monthly statistics', async () => {
      ;(prisma.meal.findMany as jest.Mock).mockResolvedValue(mockMeals)
      ;(prisma.workout.findMany as jest.Mock).mockResolvedValue(mockWorkouts)

      const result = await getMonthlyStatistics(mockUserId, mockDate)

      expect(result).toEqual({
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
      })
    })

    it('should return zero values when no data exists', async () => {
      ;(prisma.meal.findMany as jest.Mock).mockResolvedValue([])
      ;(prisma.workout.findMany as jest.Mock).mockResolvedValue([])

      const result = await getMonthlyStatistics(mockUserId, mockDate)

      expect(result).toEqual({
        meals: {
          totalCalories: 0,
          totalProtein: 0,
          totalCarbs: 0,
          totalFat: 0,
        },
        workouts: {
          totalDuration: 0,
          totalCalories: 0,
        },
      })
    })
  })
}) 