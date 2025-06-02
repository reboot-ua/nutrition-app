import { calculateBMR, calculateTDEE, calculateCalories } from '../services/calorie.service'

describe('Calorie Service', () => {
  describe('calculateBMR', () => {
    it('should calculate BMR for male', () => {
      const weight = 70 // kg
      const height = 175 // cm
      const age = 30
      const gender = 'male'

      const bmr = calculateBMR(weight, height, age, gender)

      // Using Mifflin-St Jeor Equation for male:
      // (10 × weight) + (6.25 × height) - (5 × age) + 5
      // (10 × 70) + (6.25 × 175) - (5 × 30) + 5
      // 700 + 1093.75 - 150 + 5 = 1648.75
      expect(bmr).toBe(1649) // Rounded to nearest integer
    })

    it('should calculate BMR for female', () => {
      const weight = 60 // kg
      const height = 165 // cm
      const age = 25
      const gender = 'female'

      const bmr = calculateBMR(weight, height, age, gender)

      // Using Mifflin-St Jeor Equation for female:
      // (10 × weight) + (6.25 × height) - (5 × age) - 161
      // (10 × 60) + (6.25 × 165) - (5 × 25) - 161
      // 600 + 1031.25 - 125 - 161 = 1345.25
      expect(bmr).toBe(1345) // Rounded to nearest integer
    })
  })

  describe('calculateTDEE', () => {
    it('should calculate TDEE for sedentary activity level', () => {
      const bmr = 1500
      const activity = 'sedentary'

      const tdee = calculateTDEE(bmr, activity)

      // TDEE = BMR × 1.2
      // 1500 × 1.2 = 1800
      expect(tdee).toBe(1800)
    })

    it('should calculate TDEE for light activity level', () => {
      const bmr = 1500
      const activity = 'light'

      const tdee = calculateTDEE(bmr, activity)

      // TDEE = BMR × 1.375
      // 1500 × 1.375 = 2062.5
      expect(tdee).toBe(2063) // Rounded to nearest integer
    })

    it('should calculate TDEE for moderate activity level', () => {
      const bmr = 1500
      const activity = 'moderate'

      const tdee = calculateTDEE(bmr, activity)

      // TDEE = BMR × 1.55
      // 1500 × 1.55 = 2325
      expect(tdee).toBe(2325)
    })

    it('should calculate TDEE for active activity level', () => {
      const bmr = 1500
      const activity = 'active'

      const tdee = calculateTDEE(bmr, activity)

      // TDEE = BMR × 1.725
      // 1500 × 1.725 = 2587.5
      expect(tdee).toBe(2588) // Rounded to nearest integer
    })

    it('should calculate TDEE for very active activity level', () => {
      const bmr = 1500
      const activity = 'veryActive'

      const tdee = calculateTDEE(bmr, activity)

      // TDEE = BMR × 1.9
      // 1500 × 1.9 = 2850
      expect(tdee).toBe(2850)
    })

    it('should use sedentary multiplier for unknown activity level', () => {
      const bmr = 1500
      const activity = 'unknown'

      const tdee = calculateTDEE(bmr, activity)

      // TDEE = BMR × 1.2 (default sedentary multiplier)
      // 1500 × 1.2 = 1800
      expect(tdee).toBe(1800)
    })
  })

  describe('calculateCalories', () => {
    it('should calculate both BMR and TDEE', () => {
      const weight = 70 // kg
      const height = 175 // cm
      const age = 30
      const gender = 'male'
      const activity = 'moderate'

      const result = calculateCalories(weight, height, age, gender, activity)

      // BMR = (10 × 70) + (6.25 × 175) - (5 × 30) + 5 = 1649
      // TDEE = 1649 × 1.55 = 2556
      expect(result).toEqual({
        bmr: 1649,
        tdee: 2556,
      })
    })
  })
}) 