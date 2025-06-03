// import request from 'supertest'
// import express from 'express'
// import notificationRoutes from '../routes/notification.routes'
// import { verifyToken } from '../middleware/auth.middleware'

// jest.mock('../middleware/auth.middleware')
// jest.mock('../controllers/notification.controller', () => ({
//   updatePreferences: jest.fn((req, res) => {
//     res.json({
//       message: 'Notification preferences updated successfully',
//       preferences: req.body,
//     })
//   }),
// }))

// describe('Notification Routes', () => {
//   let app: express.Application

//   beforeEach(() => {
//     app = express()
//     app.use(express.json())
//     app.use('/notifications', notificationRoutes)
//     ;(verifyToken as jest.Mock).mockImplementation((req, res, next) => {
//       req.user = { id: 'test-user-id' }
//       next()
//     })
//   })

//   describe('PUT /notifications/preferences', () => {
//     it('should update notification preferences', async () => {
//       const preferences = {
//         mealReminders: true,
//         workoutReminders: false,
//         weeklyReports: true,
//       }

//       const response = await request(app)
//         .put('/notifications/preferences')
//         .send(preferences)

//       expect(response.status).toBe(200)
//       expect(response.body).toEqual({
//         message: 'Notification preferences updated successfully',
//         preferences,
//       })
//     })

//     it('should require authentication', async () => {
//       ;(verifyToken as jest.Mock).mockImplementation((req, res) => {
//         res.status(401).json({ message: 'Unauthorized' })
//       })

//       const response = await request(app)
//         .put('/notifications/preferences')
//         .send({})

//       expect(response.status).toBe(401)
//       expect(response.body).toEqual({ message: 'Unauthorized' })
//     })
//   })
// }) 