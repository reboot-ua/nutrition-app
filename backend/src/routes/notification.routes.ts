import { Router } from 'express'
import { updatePreferences } from '../controllers/notification.controller'
import { verifyToken } from '../middleware/auth.middleware'

const router = Router()

/**
 * @swagger
 * /api/notifications/preferences:
 *   put:
 *     summary: Update user notification preferences
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth:
 *           []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mealReminders:
 *                 type: boolean
 *               workoutReminders:
 *                 type: boolean
 *               weeklyReports:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Notification preferences updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */
router.put('/preferences', verifyToken, updatePreferences)

export default router 