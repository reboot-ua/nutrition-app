import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const initializeAchievements = async () => {
  const existingAchievements = await prisma.achievement.findMany()
  
  if (existingAchievements.length === 0) {
    await prisma.achievement.createMany({
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
  }
}

export const getUserAchievements = async (userId: string) => {
  return prisma.userAchievement.findMany({
    where: { userId },
    include: { achievement: true }
  })
}

export const checkAchievements = async (userId: string) => {
  const newAchievements = []

  // Check for first meal achievement
  const mealCount = await prisma.meal.count({
    where: { userId }
  })

  if (mealCount > 0) {
    const existingAchievement = await prisma.userAchievement.findFirst({
      where: {
        userId,
        achievement: { name: 'First Meal' }
      }
    })

    if (!existingAchievement) {
      const achievement = await prisma.achievement.findFirst({
        where: { name: 'First Meal' }
      })

      if (achievement) {
        const userAchievement = await prisma.userAchievement.create({
          data: {
            userId,
            achievementId: achievement.id
          },
          include: { achievement: true }
        })
        newAchievements.push(userAchievement)
      }
    }
  }

  // Check for first workout achievement
  const workoutCount = await prisma.workout.count({
    where: { userId }
  })

  if (workoutCount > 0) {
    const existingAchievement = await prisma.userAchievement.findFirst({
      where: {
        userId,
        achievement: { name: 'First Workout' }
      }
    })

    if (!existingAchievement) {
      const achievement = await prisma.achievement.findFirst({
        where: { name: 'First Workout' }
      })

      if (achievement) {
        const userAchievement = await prisma.userAchievement.create({
          data: {
            userId,
            achievementId: achievement.id
          },
          include: { achievement: true }
        })
        newAchievements.push(userAchievement)
      }
    }
  }

  // Check for first follower achievement
  const followerCount = await prisma.follow.count({
    where: { followingId: userId }
  })

  if (followerCount > 0) {
    const existingAchievement = await prisma.userAchievement.findFirst({
      where: {
        userId,
        achievement: { name: 'First Follower' }
      }
    })

    if (!existingAchievement) {
      const achievement = await prisma.achievement.findFirst({
        where: { name: 'First Follower' }
      })

      if (achievement) {
        const userAchievement = await prisma.userAchievement.create({
          data: {
            userId,
            achievementId: achievement.id
          },
          include: { achievement: true }
        })
        newAchievements.push(userAchievement)
      }
    }
  }

  return newAchievements
}

export const getAchievementsList = async () => {
  return prisma.achievement.findMany()
} 