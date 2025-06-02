import express from 'express'
import cors from 'cors'
import authRoutes from './routes/auth.routes'

const app = express()

app.use(cors())
app.use(express.json())

// Routes
app.use('/api/auth', authRoutes)

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Щось пішло не так!' })
})

export { app } 