import { Router } from 'express'
import { registerUser, loginUser, refreshToken, logout } from '../controllers/auth.controller'
import { verifyToken } from '../middleware/auth.middleware'

const router = Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/refresh-token', refreshToken)
router.post('/logout', verifyToken, logout)

export default router 