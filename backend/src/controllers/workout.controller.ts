import { Request, Response } from 'express'
import { prisma } from '../prisma'

export const createWorkout = async (req: Request, res: Response) => {
  const { type, duration, calories, date } = req.body
  const userId = req.user?.id

  if (!userId) {
    return res.status(401).json({ error: 'Необхідна авторизація' })
  }

  if (!type || !duration || !calories || !date) {
    return res.status(400).json({ error: 'Усі поля обовʼязкові' })
  }

  try {
    const workout = await prisma.workout.create({
      data: {
        type,
        duration,
        calories,
        date: new Date(date),
        userId
      }
    })

    return res.status(201).json(workout)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Помилка сервера' })
  }
}

export const getWorkouts = async (req: Request, res: Response) => {
  const userId = req.user?.id

  if (!userId) {
    return res.status(401).json({ error: 'Необхідна авторизація' })
  }

  try {
    const workouts = await prisma.workout.findMany({
      where: { userId },
      orderBy: { date: 'desc' }
    })

    return res.status(200).json(workouts)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Помилка сервера' })
  }
}

export const getWorkout = async (req: Request, res: Response) => {
  const { id } = req.params
  const userId = req.user?.id

  if (!userId) {
    return res.status(401).json({ error: 'Необхідна авторизація' })
  }

  try {
    const workout = await prisma.workout.findUnique({
      where: { id }
    })

    if (!workout) {
      return res.status(404).json({ error: 'Тренування не знайдено' })
    }

    if (workout.userId !== userId) {
      return res.status(403).json({ error: 'Немає доступу' })
    }

    return res.status(200).json(workout)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Помилка сервера' })
  }
}

export const updateWorkout = async (req: Request, res: Response) => {
  const { id } = req.params
  const { type, duration, calories, date } = req.body
  const userId = req.user?.id

  if (!userId) {
    return res.status(401).json({ error: 'Необхідна авторизація' })
  }

  try {
    const existingWorkout = await prisma.workout.findUnique({
      where: { id }
    })

    if (!existingWorkout) {
      return res.status(404).json({ error: 'Тренування не знайдено' })
    }

    if (existingWorkout.userId !== userId) {
      return res.status(403).json({ error: 'Немає доступу' })
    }

    const updatedWorkout = await prisma.workout.update({
      where: { id },
      data: {
        type,
        duration,
        calories,
        date: date ? new Date(date) : undefined
      }
    })

    return res.status(200).json(updatedWorkout)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Помилка сервера' })
  }
}

export const deleteWorkout = async (req: Request, res: Response) => {
  const { id } = req.params
  const userId = req.user?.id

  if (!userId) {
    return res.status(401).json({ error: 'Необхідна авторизація' })
  }

  try {
    const existingWorkout = await prisma.workout.findUnique({
      where: { id }
    })

    if (!existingWorkout) {
      return res.status(404).json({ error: 'Тренування не знайдено' })
    }

    if (existingWorkout.userId !== userId) {
      return res.status(403).json({ error: 'Немає доступу' })
    }

    await prisma.workout.delete({
      where: { id }
    })

    return res.status(200).json({ message: 'Тренування видалено' })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Помилка сервера' })
  }
} 