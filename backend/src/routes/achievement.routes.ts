import { Router } from 'express'
import {
  getUserAchievementsController,
  getAchievementsListController,
  checkAchievementsController,
} from '../controllers/achievement.controller'
import { verifyToken } from '../middleware/auth.middleware'

const router = Router()

// Захищені маршрути (потрібна автентифікація)
/**
 * @swagger
 * /api/achievements/my:
 *   get:
 *     summary: Get achievements earned by the current user
 *     tags: [Achievements]
 *     security:
 *       - bearerAuth:
 *           []
 *     responses:
 *       200:
 *         description: List of user's achievements
 *       401:
 *         description: Unauthorized
 */
router.get('/my', verifyToken, getUserAchievementsController)

/**
 * @swagger
 * /api/achievements/check:
 *   post:
 *     summary: Check for new achievements based on user activity and award them
 *     tags: [Achievements]
 *     security:
 *       - bearerAuth:
 *           []
 *     responses:
 *       200:
 *         description: List of newly awarded achievements
 *       401:
 *         description: Unauthorized
 */
router.post('/check', verifyToken, checkAchievementsController)

// Публічний маршрут
/**
 * @swagger
 * /api/achievements:
 *   get:
 *     summary: Get a list of all possible achievements
 *     tags: [Achievements]
 *     responses:
 *       200:
 *         description: List of all achievements
 */
router.get('/', getAchievementsListController)

export default router 