import { Router } from 'express'
import {
  createUserProfile,
  updateUserProfile,
  getUserProfile,
  getPublicProfilesList,
  searchPublicProfiles,
} from '../controllers/profile.controller'
import { verifyToken } from '../middleware/auth.middleware'

const router = Router()

// Захищені маршрути (потрібна автентифікація)
/**
 * @swagger
 * /api/profiles:
 *   post:
 *     summary: Create a user profile
 *     tags: [Profile]
 *     security:
 *       - bearerAuth:
 *           []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             # Add profile properties here (e.g., name, bio, avatarUrl)
 *     responses:
 *       201:
 *         description: Profile created successfully
 *       401:
 *         description: Unauthorized
 *       409:
 *         description: Profile already exists
 */
router.post('/', verifyToken, createUserProfile)

/**
 * @swagger
 * /api/profiles:
 *   put:
 *     summary: Update the current user's profile
 *     tags: [Profile]
 *     security:
 *       - bearerAuth:
 *           []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             # Add profile properties here (e.g., name, bio, avatarUrl)
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Profile not found
 */
router.put('/', verifyToken, updateUserProfile)

/**
 * @swagger
 * /api/profiles/me:
 *   get:
 *     summary: Get the current user's profile
 *     tags: [Profile]
 *     security:
 *       - bearerAuth:
 *           []
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               # Add profile properties here
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Profile not found
 */
router.get('/me', verifyToken, getUserProfile)

// Публічні маршрути
/**
 * @swagger
 * /api/profiles/public:
 *   get:
 *     summary: Get a list of all public profiles
 *     tags: [Profile]
 *     responses:
 *       200:
 *         description: A list of public profiles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 # Add public profile properties here
 */
router.get('/public', getPublicProfilesList)

/**
 * @swagger
 * /api/profiles/search:
 *   get:
 *     summary: Search for public profiles by name or other criteria
 *     tags: [Profile]
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         description: Search query (e.g., name)
 *     responses:
 *       200:
 *         description: A list of matching public profiles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 # Add public profile properties here
 */
router.get('/search', searchPublicProfiles)

export default router 