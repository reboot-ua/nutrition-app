import { Request, Response } from 'express'
import { getDailyStatistics, getWeeklyStatistics, getMonthlyStatistics } from '../services/statistics.service'

export const getDailyStats = async (req: Request, res: Response) => {
  const userId = req.user?.id
  const { date } = req.query

  if (!userId) {
    return res.status(401).json({ error: 'Необхідна авторизація' })
  }

  if (!date) {
    return res.status(400).json({ error: 'Дата обовʼязкова' })
  }

  try {
    const stats = await getDailyStatistics(userId, new Date(date as string))
    return res.status(200).json(stats)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Помилка сервера' })
  }
}

export const getWeeklyStats = async (req: Request, res: Response) => {
  const userId = req.user?.id
  const { startDate } = req.query

  if (!userId) {
    return res.status(401).json({ error: 'Необхідна авторизація' })
  }

  if (!startDate) {
    return res.status(400).json({ error: 'Дата початку обовʼязкова' })
  }

  try {
    const stats = await getWeeklyStatistics(userId, new Date(startDate as string))
    return res.status(200).json(stats)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Помилка сервера' })
  }
}

export const getMonthlyStats = async (req: Request, res: Response) => {
  const userId = req.user?.id
  const { startDate } = req.query

  if (!userId) {
    return res.status(401).json({ error: 'Необхідна авторизація' })
  }

  if (!startDate) {
    return res.status(400).json({ error: 'Дата початку обовʼязкова' })
  }

  try {
    const stats = await getMonthlyStatistics(userId, new Date(startDate as string))
    return res.status(200).json(stats)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Помилка сервера' })
  }
} 