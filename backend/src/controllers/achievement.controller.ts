import { Request, Response } from 'express'
import * as achievementService from '../services/achievement.service'

export const getUserAchievementsController = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    const achievements = await achievementService.getUserAchievements(userId)
    return res.status(200).json({
      message: 'User achievements retrieved successfully',
      achievements
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      message: 'Error retrieving user achievements',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}

export const checkAchievementsController = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    const newAchievements = await achievementService.checkAchievements(userId)
    return res.status(200).json({
      message: 'Achievements checked successfully',
      achievements: newAchievements
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      message: 'Error checking achievements',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}

export const getAchievementsListController = async (req: Request, res: Response) => {
  try {
    const achievements = await achievementService.getAchievementsList()
    return res.status(200).json({
      message: 'Achievements list retrieved successfully',
      achievements
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      message: 'Error retrieving achievements list',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
} 