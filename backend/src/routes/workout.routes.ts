import { Router } from 'express'
import { createWorkout, getWorkouts, getWorkout, updateWorkout, deleteWorkout } from '../controllers/workout.controller'
import { verifyToken } from '../middleware/auth.middleware'

const router = Router()

// Всі маршрути захищені middleware авторизації
router.use(verifyToken)

/**
 * @swagger
 * /api/workouts:
 *   post:
 *     summary: Create a new workout
 *     tags: [Workouts]
 *     security:
 *       - bearerAuth:
 *           []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             # Add workout properties here (e.g., name, duration, caloriesBurned)
 *     responses:
 *       201:
 *         description: Workout created successfully
 *       401:
 *         description: Unauthorized
 */
router.post('/', createWorkout)

/**
 * @swagger
 * /api/workouts:
 *   get:
 *     summary: Get all workouts for the current user
 *     tags: [Workouts]
 *     security:
 *       - bearerAuth:
 *           []
 *     responses:
 *       200:
 *         description: A list of workouts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object # Consider defining a specific Workout schema later
 *       401:
 *         description: Unauthorized
 */
router.get('/', getWorkouts)

/**
 * @swagger
 * /api/workouts/{id}:
 *   get:
 *     summary: Get a workout by ID for the current user
 *     tags: [Workouts]
 *     security:
 *       - bearerAuth:
 *           []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the workout to retrieve
 *     responses:
 *       200:
 *         description: Workout details
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Workout not found
 */
router.get('/:id', getWorkout)

/**
 * @swagger
 * /api/workouts/{id}:
 *   put:
 *     summary: Update a workout by ID for the current user
 *     tags: [Workouts]
 *     security:
 *       - bearerAuth:
 *           []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the workout to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             # Add workout properties here (e.g., name, duration, caloriesBurned)
 *     responses:
 *       200:
 *         description: Workout updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Workout not found
 */
router.put('/:id', updateWorkout)

/**
 * @swagger
 * /api/workouts/{id}:
 *   delete:
 *     summary: Delete a workout by ID for the current user
 *     tags: [Workouts]
 *     security:
 *       - bearerAuth:
 *           []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the workout to delete
 *     responses:
 *       200:
 *         description: Workout deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Workout not found
 */
router.delete('/:id', deleteWorkout)

export default router 