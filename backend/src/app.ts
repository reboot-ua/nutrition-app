import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.routes'
// import userRoutes from './routes/user.routes' // removed
import mealRoutes from './routes/meal.routes'
import workoutRoutes from './routes/workout.routes'
import calorieRoutes from './routes/calorie.routes'
import statisticsRoutes from './routes/statistics.routes'
import externalFoodRoutes from './routes/externalFood.routes'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

// Routes
app.use('/api/auth', authRoutes)
// app.use('/api/users', userRoutes) // removed
app.use('/api/meals', mealRoutes)
app.use('/api/workouts', workoutRoutes)
app.use('/api/calories', calorieRoutes)
app.use('/api/statistics', statisticsRoutes)
app.use('/api/food', externalFoodRoutes)

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Щось пішло не так!' })
})

export default app 