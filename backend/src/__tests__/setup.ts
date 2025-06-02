import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

beforeAll(async () => {
  // Очищаємо базу даних перед тестами
  await prisma.user.deleteMany()
})

afterAll(async () => {
  await prisma.$disconnect()
}) 