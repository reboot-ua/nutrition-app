import express from 'express'
import { calculateCaloriesForUser } from '../controllers/calorie.controller'
import { verifyToken } from '../middleware/auth.middleware'

const router = express.Router()

router.post('/calculate', verifyToken, calculateCaloriesForUser)

export default router 