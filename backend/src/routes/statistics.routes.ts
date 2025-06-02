import express from 'express'
import { getDailyStats, getWeeklyStats, getMonthlyStats } from '../controllers/statistics.controller'
import { verifyToken } from '../middleware/auth.middleware'

const router = express.Router()

router.get('/daily', verifyToken, getDailyStats)
router.get('/weekly', verifyToken, getWeeklyStats)
router.get('/monthly', verifyToken, getMonthlyStats)

export default router 