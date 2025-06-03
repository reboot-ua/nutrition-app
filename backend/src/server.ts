import app from './app'
import { initializeAchievements } from './services/achievement.service'

const PORT = process.env.PORT || 3000

// Ініціалізуємо досягнення при запуску сервера
initializeAchievements()
  .then(() => {
    console.log('Achievements initialized successfully')
  })
  .catch((error) => {
    console.error('Error initializing achievements:', error)
  })

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
}) 