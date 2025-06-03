import express from 'express'
import { getDailyStats, getWeeklyStats, getMonthlyStats } from '../controllers/statistics.controller'
import { verifyToken } from '../middleware/auth.middleware'

const router = express.Router()

/**
 * @swagger
 * /api/statistics/daily:
 *   get:
 *     summary: Get daily statistics for the current user
 *     tags: [Statistics]
 *     security:
 *       - bearerAuth:
 *           []
 *     responses:
 *       200:
 *         description: Daily statistics data
 *       401:
 *         description: Unauthorized
 */
router.get('/daily', verifyToken, getDailyStats)

/**
 * @swagger
 * /api/statistics/weekly:
 *   get:
 *     summary: Get weekly statistics for the current user
 *     tags: [Statistics]
 *     security:
 *       - bearerAuth:
 *           []
 *     responses:
 *       200:
 *         description: Weekly statistics data
 *       401:
 *         description: Unauthorized
 */
router.get('/weekly', verifyToken, getWeeklyStats)

/**
 * @swagger
 * /api/statistics/monthly:
 *   get:
 *     summary: Get monthly statistics for the current user
 *     tags: [Statistics]
 *     security:
 *       - bearerAuth:
 *           []
 *     responses:
 *       200:
 *         description: Monthly statistics data
 *       401:
 *         description: Unauthorized
 */
router.get('/monthly', verifyToken, getMonthlyStats)

export default router 