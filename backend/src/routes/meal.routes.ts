import { Router } from 'express'
import { createMeal, getMeals, getMeal, updateMeal, deleteMeal } from '../controllers/meal.controller'
import { verifyToken } from '../middleware/auth.middleware'

const router = Router()

// Всі маршрути захищені middleware авторизації
router.use(verifyToken)

/**
 * @swagger
 * /api/meals:
 *   post:
 *     summary: Create a new meal
 *     tags: [Meals]
 *     security:
 *       - bearerAuth:
 *           []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             # Add meal properties here (e.g., name, description, calories, date)
 *     responses:
 *       201:
 *         description: Meal created successfully
 *       401:
 *         description: Unauthorized
 */
router.post('/', createMeal)

/**
 * @swagger
 * /api/meals:
 *   get:
 *     summary: Get all meals for the current user
 *     tags: [Meals]
 *     security:
 *       - bearerAuth:
 *           []
 *     responses:
 *       200:
 *         description: A list of meals
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object # Consider defining a specific Meal schema later
 *       401:
 *         description: Unauthorized
 */
router.get('/', getMeals)

/**
 * @swagger
 * /api/meals/{id}:
 *   get:
 *     summary: Get a meal by ID for the current user
 *     tags: [Meals]
 *     security:
 *       - bearerAuth:
 *           []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the meal to retrieve
 *     responses:
 *       200:
 *         description: Meal details
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Meal not found
 */
router.get('/:id', getMeal)

/**
 * @swagger
 * /api/meals/{id}:
 *   put:
 *     summary: Update a meal by ID for the current user
 *     tags: [Meals]
 *     security:
 *       - bearerAuth:
 *           []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the meal to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             # Add meal properties here (e.g., name, description, calories)
 *     responses:
 *       200:
 *         description: Meal updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Meal not found
 */
router.put('/:id', updateMeal)

/**
 * @swagger
 * /api/meals/{id}:
 *   delete:
 *     summary: Delete a meal by ID for the current user
 *     tags: [Meals]
 *     security:
 *       - bearerAuth:
 *           []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the meal to delete
 *     responses:
 *       200:
 *         description: Meal deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Meal not found
 */
router.delete('/:id', deleteMeal)

export default router 