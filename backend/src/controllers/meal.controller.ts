import { Request, Response } from 'express'
import { prisma } from '../prisma'

export const createMeal = async (req: Request, res: Response) => {
  const { name, calories, protein, carbs, fat, date } = req.body
  const userId = req.user?.id

  if (!userId) {
    return res.status(401).json({ error: 'Необхідна авторизація' })
  }

  if (!name || !calories || !protein || !carbs || !fat || !date) {
    return res.status(400).json({ error: 'Усі поля обовʼязкові' })
  }

  try {
    const meal = await prisma.meal.create({
      data: {
        name,
        calories,
        protein,
        carbs,
        fat,
        date: new Date(date),
        userId
      }
    })

    return res.status(201).json(meal)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Помилка сервера' })
  }
}

export const getMeals = async (req: Request, res: Response) => {
  const userId = req.user?.id

  if (!userId) {
    return res.status(401).json({ error: 'Необхідна авторизація' })
  }

  try {
    const meals = await prisma.meal.findMany({
      where: { userId },
      orderBy: { date: 'desc' }
    })

    return res.json(meals)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Помилка сервера' })
  }
}

export const getMeal = async (req: Request, res: Response) => {
  const { id } = req.params
  const userId = req.user?.id

  if (!userId) {
    return res.status(401).json({ error: 'Необхідна авторизація' })
  }

  try {
    const meal = await prisma.meal.findUnique({
      where: { id }
    })

    if (!meal) {
      return res.status(404).json({ error: 'Прийом їжі не знайдено' })
    }

    if (meal.userId !== userId) {
      return res.status(403).json({ error: 'Немає доступу' })
    }

    return res.json(meal)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Помилка сервера' })
  }
}

export const updateMeal = async (req: Request, res: Response) => {
  const { id } = req.params
  const { name, calories, protein, carbs, fat, date } = req.body
  const userId = req.user?.id

  if (!userId) {
    return res.status(401).json({ error: 'Необхідна авторизація' })
  }

  try {
    const existingMeal = await prisma.meal.findUnique({
      where: { id }
    })

    if (!existingMeal) {
      return res.status(404).json({ error: 'Прийом їжі не знайдено' })
    }

    if (existingMeal.userId !== userId) {
      return res.status(403).json({ error: 'Немає доступу' })
    }

    const updatedMeal = await prisma.meal.update({
      where: { id },
      data: {
        name,
        calories,
        protein,
        carbs,
        fat,
        date: date ? new Date(date) : undefined
      }
    })

    return res.json(updatedMeal)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Помилка сервера' })
  }
}

export const deleteMeal = async (req: Request, res: Response) => {
  const { id } = req.params
  const userId = req.user?.id

  if (!userId) {
    return res.status(401).json({ error: 'Необхідна авторизація' })
  }

  try {
    const existingMeal = await prisma.meal.findUnique({
      where: { id }
    })

    if (!existingMeal) {
      return res.status(404).json({ error: 'Прийом їжі не знайдено' })
    }

    if (existingMeal.userId !== userId) {
      return res.status(403).json({ error: 'Немає доступу' })
    }

    await prisma.meal.delete({
      where: { id }
    })

    return res.json({ message: 'Прийом їжі видалено' })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Помилка сервера' })
  }
} 