import { PrismaClient } from '@prisma/client'
import cron, { ScheduledTask } from 'node-cron'
import { sendMealReminder, sendWorkoutReminder, sendWeeklyReport } from './email.service'

const prisma = new PrismaClient()

// Зберігаємо активні завдання для можливості їх зупинки
const activeJobs = new Map<string, ScheduledTask>()

export const scheduleMealReminders = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { email: true, mealReminders: true },
  })

  if (!user || !user.mealReminders) return

  // Зупиняємо попереднє завдання, якщо воно існує
  if (activeJobs.has(`meal-${userId}`)) {
    activeJobs.get(`meal-${userId}`)?.stop()
  }

  // Плануємо нагадування на 8:00, 12:00, 18:00
  const schedule = cron.schedule('0 8,12,18 * * *', async () => {
    const currentHour = new Date().getHours()
    let mealTime = ''
    
    switch (currentHour) {
      case 8:
        mealTime = 'сніданок'
        break
      case 12:
        mealTime = 'обід'
        break
      case 18:
        mealTime = 'вечерю'
        break
    }

    await sendMealReminder(user.email, mealTime)
  })

  activeJobs.set(`meal-${userId}`, schedule)
}

export const scheduleWorkoutReminders = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { email: true, workoutReminders: true },
  })

  if (!user || !user.workoutReminders) return

  // Зупиняємо попереднє завдання, якщо воно існує
  if (activeJobs.has(`workout-${userId}`)) {
    activeJobs.get(`workout-${userId}`)?.stop()
  }

  // Плануємо нагадування на 17:00 щодня
  const schedule = cron.schedule('0 17 * * *', async () => {
    await sendWorkoutReminder(user.email, 'щоденне тренування')
  })

  activeJobs.set(`workout-${userId}`, schedule)
}

export const scheduleWeeklyReports = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { email: true, weeklyReports: true },
  })

  if (!user || !user.weeklyReports) return

  // Зупиняємо попереднє завдання, якщо воно існує
  if (activeJobs.has(`report-${userId}`)) {
    activeJobs.get(`report-${userId}`)?.stop()
  }

  // Плануємо звіт на понеділок о 9:00
  const schedule = cron.schedule('0 9 * * 1', async () => {
    const lastWeek = new Date()
    lastWeek.setDate(lastWeek.getDate() - 7)

    const stats = await prisma.meal.groupBy({
      by: ['userId'],
      where: {
        userId,
        date: {
          gte: lastWeek,
        },
      },
      _avg: {
        calories: true,
        protein: true,
        fat: true,
        carbs: true,
      },
    })

    const workoutsCount = await prisma.workout.count({
      where: {
        userId,
        date: {
          gte: lastWeek,
        },
      },
    })

    const weeklyStats = {
      averageCalories: Math.round(stats[0]?._avg.calories || 0),
      averageProtein: Math.round(stats[0]?._avg.protein || 0),
      averageFat: Math.round(stats[0]?._avg.fat || 0),
      averageCarbs: Math.round(stats[0]?._avg.carbs || 0),
      workoutsCount,
    }

    await sendWeeklyReport(user.email, weeklyStats)
  })

  activeJobs.set(`report-${userId}`, schedule)
}

export const updateNotificationPreferences = async (
  userId: string,
  preferences: {
    mealReminders?: boolean
    workoutReminders?: boolean
    weeklyReports?: boolean
  }
) => {
  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: preferences,
  })

  // Оновлюємо розклад нагадувань
  if (preferences.mealReminders !== undefined) {
    if (preferences.mealReminders) {
      await scheduleMealReminders(userId)
    } else {
      activeJobs.get(`meal-${userId}`)?.stop()
      activeJobs.delete(`meal-${userId}`)
    }
  }

  if (preferences.workoutReminders !== undefined) {
    if (preferences.workoutReminders) {
      await scheduleWorkoutReminders(userId)
    } else {
      activeJobs.get(`workout-${userId}`)?.stop()
      activeJobs.delete(`workout-${userId}`)
    }
  }

  if (preferences.weeklyReports !== undefined) {
    if (preferences.weeklyReports) {
      await scheduleWeeklyReports(userId)
    } else {
      activeJobs.get(`report-${userId}`)?.stop()
      activeJobs.delete(`report-${userId}`)
    }
  }

  return updatedUser
} 