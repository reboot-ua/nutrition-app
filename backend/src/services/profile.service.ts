import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const createProfile = async (
  userId: string,
  data: {
    username: string
    bio?: string
    avatar?: string
    isPublic?: boolean
  }
) => {
  return prisma.profile.create({
    data: {
      userId,
      ...data,
    },
  })
}

export const updateProfile = async (
  userId: string,
  data: {
    username?: string
    bio?: string
    avatar?: string
    isPublic?: boolean
  }
) => {
  return prisma.profile.update({
    where: { userId },
    data,
  })
}

export const getProfile = async (userId: string) => {
  return prisma.profile.findUnique({
    where: { userId },
    include: {
      user: {
        select: {
          id: true,
          email: true,
          age: true,
          weight: true,
          height: true,
          gender: true,
          activity: true,
          goal: true,
          createdAt: true,
        },
      },
    },
  })
}

export const getPublicProfiles = async (page = 1, limit = 10) => {
  const skip = (page - 1) * limit

  const [profiles, total] = await Promise.all([
    prisma.profile.findMany({
      where: { isPublic: true },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            age: true,
            weight: true,
            height: true,
            gender: true,
            activity: true,
            goal: true,
            createdAt: true,
          },
        },
      },
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.profile.count({
      where: { isPublic: true },
    }),
  ])

  return {
    profiles,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  }
}

export const searchProfiles = async (query: string, page = 1, limit = 10) => {
  const skip = (page - 1) * limit

  const [profiles, total] = await Promise.all([
    prisma.profile.findMany({
      where: {
        OR: [
          { username: { contains: query, mode: 'insensitive' } },
          { bio: { contains: query, mode: 'insensitive' } },
        ],
        isPublic: true,
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            age: true,
            weight: true,
            height: true,
            gender: true,
            activity: true,
            goal: true,
            createdAt: true,
          },
        },
      },
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.profile.count({
      where: {
        OR: [
          { username: { contains: query, mode: 'insensitive' } },
          { bio: { contains: query, mode: 'insensitive' } },
        ],
        isPublic: true,
      },
    }),
  ])

  return {
    profiles,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  }
} 