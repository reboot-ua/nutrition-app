import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
})

export const sendMealReminder = async (email: string, mealTime: string) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Нагадування про прийом їжі',
    html: `
      <h1>Час для прийому їжі!</h1>
      <p>Не забудьте записати ваш ${mealTime} прийом їжі.</p>
      <p>Це допоможе вам краще відстежувати ваш харчовий баланс.</p>
    `,
  }

  try {
    await transporter.sendMail(mailOptions)
  } catch (error) {
    console.error('Error sending email:', error)
    throw error
  }
}

export const sendWorkoutReminder = async (email: string, workoutType: string) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Нагадування про тренування',
    html: `
      <h1>Час для тренування!</h1>
      <p>Не забудьте про ваше заплановане тренування: ${workoutType}</p>
      <p>Регулярні тренування допоможуть вам досягти ваших цілей.</p>
    `,
  }

  try {
    await transporter.sendMail(mailOptions)
  } catch (error) {
    console.error('Error sending email:', error)
    throw error
  }
}

export const sendWeeklyReport = async (email: string, stats: any) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Тижневий звіт про прогрес',
    html: `
      <h1>Ваш тижневий звіт</h1>
      <h2>Статистика за тиждень:</h2>
      <ul>
        <li>Середні калорії: ${stats.averageCalories}</li>
        <li>Середній білок: ${stats.averageProtein}g</li>
        <li>Середній жир: ${stats.averageFat}g</li>
        <li>Середні вуглеводи: ${stats.averageCarbs}g</li>
        <li>Кількість тренувань: ${stats.workoutsCount}</li>
      </ul>
      <p>Продовжуйте в тому ж дусі!</p>
    `,
  }

  try {
    await transporter.sendMail(mailOptions)
  } catch (error) {
    console.error('Error sending email:', error)
    throw error
  }
} 