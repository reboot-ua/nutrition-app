import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const followUser = async (followerId: string, followingId: string) => {
  // Перевіряємо, чи існує користувач, на якого підписуємось
  const followingUser = await prisma.user.findUnique({
    where: { id: followingId },
    include: { profile: true },
  })

  if (!followingUser) {
    throw new Error('User not found')
  }

  // Перевіряємо, чи профіль є публічним
  if (!followingUser.profile?.isPublic) {
    throw new Error('Cannot follow private profile')
  }

  // Створюємо підписку
  return prisma.follow.create({
    data: {
      followerId,
      followingId,
    },
  })
}

export const unfollowUser = async (followerId: string, followingId: string) => {
  return prisma.follow.delete({
    where: {
      followerId_followingId: {
        followerId,
        followingId,
      },
    },
  })
}

export const getFollowers = async (userId: string, page = 1, limit = 10) => {
  const skip = (page - 1) * limit

  const [followers, total] = await Promise.all([
    prisma.follow.findMany({
      where: { followingId: userId },
      include: {
        follower: {
          include: {
            profile: true,
          },
        },
      },
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.follow.count({
      where: { followingId: userId },
    }),
  ])

  return {
    followers,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  }
}

export const getFollowing = async (userId: string, page = 1, limit = 10) => {
  const skip = (page - 1) * limit

  const [following, total] = await Promise.all([
    prisma.follow.findMany({
      where: { followerId: userId },
      include: {
        following: {
          include: {
            profile: true,
          },
        },
      },
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.follow.count({
      where: { followerId: userId },
    }),
  ])

  return {
    following,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  }
}

export const checkFollowStatus = async (followerId: string, followingId: string) => {
  const follow = await prisma.follow.findUnique({
    where: {
      followerId_followingId: {
        followerId,
        followingId,
      },
    },
  })

  return !!follow
} 