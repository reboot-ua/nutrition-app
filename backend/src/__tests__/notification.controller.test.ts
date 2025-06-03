// import { Request, Response } from 'express'
// import { updatePreferences } from '../controllers/notification.controller'
// import { updateNotificationPreferences } from '../services/notification.service'

// jest.mock('../services/notification.service')

// describe('Notification Controller', () => {
//   let mockRequest: Partial<Request>
//   let mockResponse: Partial<Response>
//   let responseObject: any

//   beforeEach(() => {
//     responseObject = {}
//     mockRequest = {
//       user: { id: 'user-id', email: 'test@example.com' },
//       body: {
//         mealReminders: true,
//         workoutReminders: false,
//         weeklyReports: true,
//       },
//     }
//     mockResponse = {
//       status: jest.fn().mockReturnThis(),
//       json: jest.fn().mockImplementation((result) => {
//         responseObject = result
//         return mockResponse
//       }),
//     }
//   })

//   describe('updatePreferences', () => {
//     it('should update notification preferences successfully', async () => {
//       const mockUser = {
//         id: 'user-id',
//         email: 'test@example.com',
//         mealReminders: true,
//         workoutReminders: false,
//         weeklyReports: true,
//       }

//       ;(updateNotificationPreferences as jest.Mock).mockResolvedValue(mockUser)

//       await updatePreferences(
//         mockRequest as Request,
//         mockResponse as Response
//       )

//       expect(mockResponse.status).not.toHaveBeenCalled()
//       expect(mockResponse.json).toHaveBeenCalledWith({
//         message: 'Notification preferences updated successfully',
//         preferences: {
//           mealReminders: true,
//           workoutReminders: false,
//           weeklyReports: true,
//         },
//       })
//     })

//     it('should return 401 if user is not authenticated', async () => {
//       mockRequest.user = undefined

//       await updatePreferences(
//         mockRequest as Request,
//         mockResponse as Response
//       )

//       expect(mockResponse.status).toHaveBeenCalledWith(401)
//       expect(mockResponse.json).toHaveBeenCalledWith({
//         message: 'Unauthorized',
//       })
//     })

//     it('should handle server errors', async () => {
//       ;(updateNotificationPreferences as jest.Mock).mockRejectedValue(
//         new Error('Database error')
//       )

//       await updatePreferences(
//         mockRequest as Request,
//         mockResponse as Response
//       )

//       expect(mockResponse.status).toHaveBeenCalledWith(500)
//       expect(mockResponse.json).toHaveBeenCalledWith({
//         message: 'Internal server error',
//       })
//     })
//   })
// }) 