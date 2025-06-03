import { Request, Response } from 'express'
import {
  followUser,
  unfollowUser,
  getFollowers,
  getFollowing,
  checkFollowStatus,
} from '../services/follow.service'

export const follow = async (req: Request, res: Response) => {
  try {
    const followerId = req.user?.id
    if (!followerId) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    const { followingId } = req.params

    if (followerId === followingId) {
      return res.status(400).json({ message: 'Cannot follow yourself' })
    }

    const follow = await followUser(followerId, followingId)

    res.status(201).json({
      message: 'Successfully followed user',
      follow,
    })
  } catch (error: any) {
    console.error('Error following user:', error)
    if (error.message === 'User not found') {
      return res.status(404).json({ message: error.message })
    }
    if (error.message === 'Cannot follow private profile') {
      return res.status(403).json({ message: error.message })
    }
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const unfollow = async (req: Request, res: Response) => {
  try {
    const followerId = req.user?.id
    if (!followerId) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    const { followingId } = req.params

    await unfollowUser(followerId, followingId)

    res.json({
      message: 'Successfully unfollowed user',
    })
  } catch (error) {
    console.error('Error unfollowing user:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const getFollowersList = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    const page = parseInt(req.query.page as string) || 1
    const limit = parseInt(req.query.limit as string) || 10

    const result = await getFollowers(userId, page, limit)

    res.json(result)
  } catch (error) {
    console.error('Error getting followers:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const getFollowingList = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    const page = parseInt(req.query.page as string) || 1
    const limit = parseInt(req.query.limit as string) || 10

    const result = await getFollowing(userId, page, limit)

    res.json(result)
  } catch (error) {
    console.error('Error getting following:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const checkFollow = async (req: Request, res: Response) => {
  try {
    const followerId = req.user?.id
    if (!followerId) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    const { followingId } = req.params

    const isFollowing = await checkFollowStatus(followerId, followingId)

    res.json({ isFollowing })
  } catch (error) {
    console.error('Error checking follow status:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
} 