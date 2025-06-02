export const calculateBMR = (weight: number, height: number, age: number, gender: string): number => {
  // Using Mifflin-St Jeor Equation
  let bmr = 10 * weight + 6.25 * height - 5 * age
  if (gender.toLowerCase() === 'male') {
    bmr += 5
  } else {
    bmr -= 161
  }
  return Math.round(bmr)
}

export const calculateTDEE = (bmr: number, activity: string): number => {
  const activityMultipliers: Record<string, number> = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    veryactive: 1.9,
  }
  const multiplier = activityMultipliers[activity.toLowerCase()] || 1.2
  return Math.round(bmr * multiplier)
}

export const calculateCalories = (weight: number, height: number, age: number, gender: string, activity: string): { bmr: number; tdee: number } => {
  const bmr = calculateBMR(weight, height, age, gender)
  const tdee = calculateTDEE(bmr, activity)
  return { bmr, tdee }
} 