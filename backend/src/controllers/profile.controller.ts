import { Request, Response } from 'express'
import {
  createProfile,
  updateProfile,
  getProfile,
  getPublicProfiles,
  searchProfiles,
} from '../services/profile.service'

export const createUserProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    const { username, bio, avatar, isPublic } = req.body

    const profile = await createProfile(userId, {
      username,
      bio,
      avatar,
      isPublic,
    })

    res.status(201).json({
      message: 'Profile created successfully',
      profile,
    })
  } catch (error) {
    console.error('Error creating profile:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const updateUserProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    const { username, bio, avatar, isPublic } = req.body

    const profile = await updateProfile(userId, {
      username,
      bio,
      avatar,
      isPublic,
    })

    res.json({
      message: 'Profile updated successfully',
      profile,
    })
  } catch (error) {
    console.error('Error updating profile:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const getUserProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    const profile = await getProfile(userId)
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' })
    }

    res.json(profile)
  } catch (error) {
    console.error('Error getting profile:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const getPublicProfilesList = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1
    const limit = parseInt(req.query.limit as string) || 10

    const result = await getPublicProfiles(page, limit)

    res.json(result)
  } catch (error) {
    console.error('Error getting public profiles:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const searchPublicProfiles = async (req: Request, res: Response) => {
  try {
    const { query } = req.query
    if (!query || typeof query !== 'string') {
      return res.status(400).json({ message: 'Search query is required' })
    }

    const page = parseInt(req.query.page as string) || 1
    const limit = parseInt(req.query.limit as string) || 10

    const result = await searchProfiles(query, page, limit)

    res.json(result)
  } catch (error) {
    console.error('Error searching profiles:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
} 