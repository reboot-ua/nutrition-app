import { Router, RequestHandler } from 'express'
import { registerUser, loginUser, refreshToken, logout } from '../controllers/auth.controller'
import { authMiddleware, AuthRequest } from '../middleware/auth.middleware'
import { Response } from 'express'

const router = Router()

router.post('/register', registerUser as unknown as RequestHandler)
router.post('/login', loginUser as unknown as RequestHandler)
router.post('/refresh-token', refreshToken as unknown as RequestHandler)
router.post('/logout', logout as unknown as RequestHandler)

router.get('/protected-route', authMiddleware, async (req: AuthRequest, res: Response) => {
  res.json({ message: 'Захищений маршрут', user: req.user })
})

export default router