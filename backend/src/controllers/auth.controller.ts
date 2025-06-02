import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import { PrismaClient } from '@prisma/client'
import jwt, { Secret, SignOptions } from 'jsonwebtoken'
import { authConfig } from '../config/auth.config'

const prisma = new PrismaClient()

const generateTokens = (userId: string, email: string) => {
  const options: SignOptions = { expiresIn: authConfig.jwt.accessTokenExpiresIn as jwt.SignOptions['expiresIn'] }
  const refreshOptions: SignOptions = { expiresIn: authConfig.jwt.refreshTokenExpiresIn as jwt.SignOptions['expiresIn'] }

  const accessToken = jwt.sign(
    { id: userId, email },
    authConfig.jwt.secret as Secret,
    options
  )

  const refreshToken = jwt.sign(
    { id: userId, email },
    authConfig.jwt.secret as Secret,
    refreshOptions
  )

  return { accessToken, refreshToken }
}

export const registerUser = async (req: Request, res: Response) => {
  const { email, password, age, weight, height, gender, activity, goal } = req.body

  if (!email || !password || !age || !weight || !height || !gender || !activity || !goal) {
    return res.status(400).json({ error: 'Усі поля обовʼязкові' })
  }

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser) {
      return res.status(400).json({ error: 'Користувач вже існує' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        age,
        weight,
        height,
        gender,
        activity,
        goal
      },
    })

    const { accessToken, refreshToken } = generateTokens(user.id, user.email)

    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken }
    })

    return res.status(201).json({
      message: 'Користувач створений',
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
        age: user.age,
        weight: user.weight,
        height: user.height,
        gender: user.gender,
        activity: user.activity,
        goal: user.goal
      }
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Помилка сервера' })
  }
}

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ error: 'Email та пароль обовʼязкові' })
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      return res.status(401).json({ error: 'Невірний email або пароль' })
    }

    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) {
      return res.status(401).json({ error: 'Невірний email або пароль' })
    }

    const { accessToken, refreshToken } = generateTokens(user.id, user.email)

    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken }
    })

    return res.json({
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
        age: user.age,
        weight: user.weight,
        height: user.height,
        gender: user.gender,
        activity: user.activity,
        goal: user.goal
      }
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Помилка сервера' })
  }
}

export const refreshToken = async (req: Request, res: Response) => {
  const { refreshToken } = req.body

  if (!refreshToken) {
    return res.status(400).json({ error: 'Refresh token не надано' })
  }

  try {
    const decoded = jwt.verify(refreshToken, authConfig.jwt.secret) as { id: string; email: string }
    const user = await prisma.user.findUnique({ where: { id: decoded.id } })

    if (!user || user.refreshToken !== refreshToken) {
      return res.status(401).json({ error: 'Недійсний refresh token' })
    }

    const tokens = generateTokens(user.id, user.email)

    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken: tokens.refreshToken }
    })

    return res.json(tokens)
  } catch (error) {
    return res.status(401).json({ error: 'Недійсний refresh token' })
  }
}

export const logout = async (req: Request, res: Response) => {
  const { refreshToken } = req.body

  if (!refreshToken) {
    return res.status(400).json({ error: 'Refresh token не надано' })
  }

  try {
    const user = await prisma.user.findFirst({ where: { refreshToken } })
    if (user) {
      await prisma.user.update({
        where: { id: user.id },
        data: { refreshToken: null }
      })
    }

    return res.json({ message: 'Вихід виконано успішно' })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Помилка сервера' })
  }
}