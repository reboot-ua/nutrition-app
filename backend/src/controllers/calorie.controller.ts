import { Request, Response } from 'express'
import { calculateCalories } from '../services/calorie.service'

export const calculateCaloriesForUser = async (req: Request, res: Response) => {
  const { weight, height, age, gender, activity } = req.body

  if (!weight || !height || !age || !gender || !activity) {
    return res.status(400).json({ error: 'Усі поля обовʼязкові' })
  }

  try {
    const result = calculateCalories(weight, height, age, gender, activity)
    return res.status(200).json(result)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Помилка сервера' })
  }
} 