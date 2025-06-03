import { Request, Response } from 'express'
import { updateNotificationPreferences } from '../services/notification.service'

export const updatePreferences = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    const { mealReminders, workoutReminders, weeklyReports } = req.body

    const updatedUser = await updateNotificationPreferences(userId, {
      mealReminders,
      workoutReminders,
      weeklyReports,
    })

    res.json({
      message: 'Notification preferences updated successfully',
      preferences: {
        mealReminders: updatedUser.mealReminders,
        workoutReminders: updatedUser.workoutReminders,
        weeklyReports: updatedUser.weeklyReports,
      },
    })
  } catch (error) {
    console.error('Error updating notification preferences:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
} 