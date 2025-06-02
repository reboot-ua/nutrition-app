import { Router } from 'express'
import { createWorkout, getWorkouts, getWorkout, updateWorkout, deleteWorkout } from '../controllers/workout.controller'
import { verifyToken } from '../middleware/auth.middleware'

const router = Router()

// Всі маршрути захищені middleware авторизації
router.use(verifyToken)

router.post('/', createWorkout)
router.get('/', getWorkouts)
router.get('/:id', getWorkout)
router.put('/:id', updateWorkout)
router.delete('/:id', deleteWorkout)

export default router 