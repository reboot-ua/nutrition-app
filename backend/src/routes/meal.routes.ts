import { Router } from 'express'
import { createMeal, getMeals, getMeal, updateMeal, deleteMeal } from '../controllers/meal.controller'
import { verifyToken } from '../middleware/auth.middleware'

const router = Router()

// Всі маршрути захищені middleware авторизації
router.use(verifyToken)

router.post('/', createMeal)
router.get('/', getMeals)
router.get('/:id', getMeal)
router.put('/:id', updateMeal)
router.delete('/:id', deleteMeal)

export default router 