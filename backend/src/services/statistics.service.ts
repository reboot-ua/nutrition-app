import { prisma } from '../prisma'

export const getDailyStatistics = async (userId: string, date: Date) => {
  const startOfDay = new Date(date)
  startOfDay.setHours(0, 0, 0, 0)
  const endOfDay = new Date(date)
  endOfDay.setHours(23, 59, 59, 999)

  const meals = await prisma.meal.findMany({
    where: {
      userId,
      date: {
        gte: startOfDay,
        lte: endOfDay,
      },
    },
  })

  const workouts = await prisma.workout.findMany({
    where: {
      userId,
      date: {
        gte: startOfDay,
        lte: endOfDay,
      },
    },
  })

  const totalCalories = meals.reduce((sum, meal) => sum + meal.calories, 0)
  const totalProtein = meals.reduce((sum, meal) => sum + meal.protein, 0)
  const totalCarbs = meals.reduce((sum, meal) => sum + meal.carbs, 0)
  const totalFat = meals.reduce((sum, meal) => sum + meal.fat, 0)

  const totalWorkoutDuration = workouts.reduce((sum, workout) => sum + workout.duration, 0)
  const totalWorkoutCalories = workouts.reduce((sum, workout) => sum + workout.calories, 0)

  return {
    meals: {
      totalCalories,
      totalProtein,
      totalCarbs,
      totalFat,
    },
    workouts: {
      totalDuration: totalWorkoutDuration,
      totalCalories: totalWorkoutCalories,
    },
  }
}

export const getWeeklyStatistics = async (userId: string, startDate: Date) => {
  const endDate = new Date(startDate)
  endDate.setDate(endDate.getDate() + 6)

  const meals = await prisma.meal.findMany({
    where: {
      userId,
      date: {
        gte: startDate,
        lte: endDate,
      },
    },
  })

  const workouts = await prisma.workout.findMany({
    where: {
      userId,
      date: {
        gte: startDate,
        lte: endDate,
      },
    },
  })

  const totalCalories = meals.reduce((sum, meal) => sum + meal.calories, 0)
  const totalProtein = meals.reduce((sum, meal) => sum + meal.protein, 0)
  const totalCarbs = meals.reduce((sum, meal) => sum + meal.carbs, 0)
  const totalFat = meals.reduce((sum, meal) => sum + meal.fat, 0)

  const totalWorkoutDuration = workouts.reduce((sum, workout) => sum + workout.duration, 0)
  const totalWorkoutCalories = workouts.reduce((sum, workout) => sum + workout.calories, 0)

  return {
    meals: {
      totalCalories,
      totalProtein,
      totalCarbs,
      totalFat,
    },
    workouts: {
      totalDuration: totalWorkoutDuration,
      totalCalories: totalWorkoutCalories,
    },
  }
}

export const getMonthlyStatistics = async (userId: string, startDate: Date) => {
  const endDate = new Date(startDate)
  endDate.setMonth(endDate.getMonth() + 1)
  endDate.setDate(0)

  const meals = await prisma.meal.findMany({
    where: {
      userId,
      date: {
        gte: startDate,
        lte: endDate,
      },
    },
  })

  const workouts = await prisma.workout.findMany({
    where: {
      userId,
      date: {
        gte: startDate,
        lte: endDate,
      },
    },
  })

  const totalCalories = meals.reduce((sum, meal) => sum + meal.calories, 0)
  const totalProtein = meals.reduce((sum, meal) => sum + meal.protein, 0)
  const totalCarbs = meals.reduce((sum, meal) => sum + meal.carbs, 0)
  const totalFat = meals.reduce((sum, meal) => sum + meal.fat, 0)

  const totalWorkoutDuration = workouts.reduce((sum, workout) => sum + workout.duration, 0)
  const totalWorkoutCalories = workouts.reduce((sum, workout) => sum + workout.calories, 0)

  return {
    meals: {
      totalCalories,
      totalProtein,
      totalCarbs,
      totalFat,
    },
    workouts: {
      totalDuration: totalWorkoutDuration,
      totalCalories: totalWorkoutCalories,
    },
  }
} 