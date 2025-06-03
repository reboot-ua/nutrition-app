import express from 'express'
import { calculateCaloriesForUser } from '../controllers/calorie.controller'
import { verifyToken } from '../middleware/auth.middleware'

const router = express.Router()

/**
 * @swagger
 * /api/calories/calculate:
 *   post:
 *     summary: Calculate daily calorie needs for the current user
 *     tags: [Calories]
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
 *               weight:
 *                 type: number
 *               height:
 *                 type: number
 *               age:
 *                 type: number
 *               gender:
 *                 type: string
 *                 enum: [male, female]
 *               activityLevel:
 *                 type: string
 *                 # Add more specific enum values based on your implementation (e.g., sedentary, light, moderate, etc.)
 *             required:
 *               - weight
 *               - height
 *               - age
 *               - gender
 *               - activityLevel
 *     responses:
 *       200:
 *         description: Calculated daily calorie needs
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 calories:
 *                   type: number
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */
router.post('/calculate', verifyToken, calculateCaloriesForUser)

export default router 