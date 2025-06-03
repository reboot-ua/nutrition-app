// import { PrismaClient, User } from '@prisma/client'
// import {
//   scheduleMealReminders,
//   scheduleWorkoutReminders,
//   scheduleWeeklyReports,
//   updateNotificationPreferences
// } from '../services/notification.service'
// import { sendMealReminder, sendWorkoutReminder, sendWeeklyReport } from '../services/email.service'

// jest.mock('@prisma/client', () => {
//   const mockPrisma = {
//     user: {
//       findUnique: jest.fn(),
//       update: jest.fn()
//     },
//     meal: {
//       groupBy: jest.fn()
//     },
//     workout: {
//       count: jest.fn()
//     }
//   }
//   return {
//     PrismaClient: jest.fn(() => mockPrisma)
//   }
// })

// const prisma = new PrismaClient()

// describe('Notification Service', () => {
//   beforeEach(() => {
//     jest.clearAllMocks()
//   })

//   describe('updateNotificationPreferences', () => {
//     it('should update user notification preferences', async () => {
//       const mockUser: User = {
//         id: 'user-id',
//         email: 'test@example.com',
//         mealReminders: true,
//         workoutReminders: true,
//         weeklyReports: true,
//         createdAt: new Date(),
//         updatedAt: new Date()
//       }

//       const mockFindUnique = jest.fn().mockResolvedValue(mockUser)
//       const mockUpdate = jest.fn().mockResolvedValue(mockUser)

//       ;(prisma.user.findUnique as jest.Mock).mockImplementation(mockFindUnique)
//       ;(prisma.user.update as jest.Mock).mockImplementation(mockUpdate)

//       const result = await updateNotificationPreferences('user-id', {
//         mealReminders: true,
//         workoutReminders: true,
//         weeklyReports: true
//       })

//       expect(result).toEqual(mockUser)
//       expect(prisma.user.update).toHaveBeenCalledWith({
//         where: { id: 'user-id' },
//         data: {
//           mealReminders: true,
//           workoutReminders: true,
//           weeklyReports: true
//         }
//       })
//     })

//     it('should handle partial updates', async () => {
//       const mockUser: User = {
//         id: 'user-id',
//         email: 'test@example.com',
//         mealReminders: true,
//         workoutReminders: false,
//         weeklyReports: false,
//         createdAt: new Date(),
//         updatedAt: new Date()
//       }

//       const mockFindUnique = jest.fn().mockResolvedValue(mockUser)
//       const mockUpdate = jest.fn().mockResolvedValue(mockUser)

//       ;(prisma.user.findUnique as jest.Mock).mockImplementation(mockFindUnique)
//       ;(prisma.user.update as jest.Mock).mockImplementation(mockUpdate)

//       const result = await updateNotificationPreferences('user-id', {
//         mealReminders: true
//       })

//       expect(result).toEqual(mockUser)
//       expect(prisma.user.update).toHaveBeenCalledWith({
//         where: { id: 'user-id' },
//         data: {
//           mealReminders: true
//         }
//       })
//     })
//   })
// }) 