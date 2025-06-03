import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import swaggerUi from 'swagger-ui-express'
import swaggerJsdoc from 'swagger-jsdoc'
import authRoutes from './routes/auth.routes'
// import userRoutes from './routes/user.routes' // removed
import mealRoutes from './routes/meal.routes'
import workoutRoutes from './routes/workout.routes'
import calorieRoutes from './routes/calorie.routes'
import statisticsRoutes from './routes/statistics.routes'
import externalFoodRoutes from './routes/externalFood.routes'
import notificationRoutes from './routes/notification.routes'
import profileRoutes from './routes/profile.routes'
import followRoutes from './routes/follow.routes'
import achievementRoutes from './routes/achievement.routes'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

const specs = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Nutrition App API',
      version: '1.0.0',
      description: 'API documentation for Nutrition App'
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server'
      }
    ]
  },
  apis: ['./src/routes/*.ts']
})

// Routes
app.use('/api/auth', authRoutes)
// app.use('/api/users', userRoutes) // removed
app.use('/api/meals', mealRoutes)
app.use('/api/workouts', workoutRoutes)
app.use('/api/calories', calorieRoutes)
app.use('/api/statistics', statisticsRoutes)
app.use('/api/food', externalFoodRoutes)
app.use('/api/notifications', notificationRoutes)
app.use('/api/profiles', profileRoutes)
app.use('/api/follow', followRoutes)
app.use('/api/achievements', achievementRoutes)

// Swagger UI endpoint
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Щось пішло не так!' })
})

export default app 