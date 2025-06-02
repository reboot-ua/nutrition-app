import axios from 'axios'

const SPOONACULAR_API_KEY = process.env.SPOONACULAR_API_KEY
const SPOONACULAR_BASE_URL = 'https://api.spoonacular.com/recipes'

interface SearchRecipesParams {
  query: string
  number?: number
  offset?: number
  type?: string
  cuisine?: string
  diet?: string
  intolerances?: string
}

interface Recipe {
  id: number
  title: string
  image: string
  imageType: string
  calories: number
  protein: number
  fat: number
  carbs: number
  readyInMinutes: number
  servings: number
  sourceUrl: string
  spoonacularSourceUrl: string
  summary: string
  cuisines: string[]
  dishTypes: string[]
  diets: string[]
  instructions: string
  analyzedInstructions: {
    name: string
    steps: {
      number: number
      step: string
      ingredients: {
        id: number
        name: string
        localizedName: string
        image: string
      }[]
      equipment: {
        id: number
        name: string
        localizedName: string
        image: string
      }[]
    }[]
  }[]
  extendedIngredients: {
    id: number
    original: string
    originalName: string
    name: string
    amount: number
    unit: string
    meta: string[]
    measures: {
      us: {
        amount: number
        unitShort: string
        unitLong: string
      }
      metric: {
        amount: number
        unitShort: string
        unitLong: string
      }
    }
  }[]
}

export const searchRecipes = async (params: SearchRecipesParams) => {
  try {
    const response = await axios.get(`${SPOONACULAR_BASE_URL}/complexSearch`, {
      params: {
        apiKey: SPOONACULAR_API_KEY,
        addRecipeNutrition: true,
        ...params,
      },
    })

    return response.data
  } catch (error) {
    console.error('Error searching recipes:', error)
    throw error
  }
}

export const getRecipeById = async (id: number) => {
  try {
    const response = await axios.get(`${SPOONACULAR_BASE_URL}/${id}/information`, {
      params: {
        apiKey: SPOONACULAR_API_KEY,
        addRecipeNutrition: true,
      },
    })

    return response.data
  } catch (error) {
    console.error('Error getting recipe:', error)
    throw error
  }
}

export const getRandomRecipes = async (number: number = 10, tags?: string) => {
  try {
    const response = await axios.get(`${SPOONACULAR_BASE_URL}/random`, {
      params: {
        apiKey: SPOONACULAR_API_KEY,
        number,
        tags,
        addRecipeNutrition: true,
      },
    })

    return response.data
  } catch (error) {
    console.error('Error getting random recipes:', error)
    throw error
  }
}

export const searchIngredients = async (query: string, number: number = 10) => {
  try {
    const response = await axios.get('https://api.spoonacular.com/food/ingredients/search', {
      params: {
        apiKey: SPOONACULAR_API_KEY,
        query,
        number,
      },
    })

    return response.data
  } catch (error) {
    console.error('Error searching ingredients:', error)
    throw error
  }
}

export const getIngredientById = async (id: number) => {
  try {
    const response = await axios.get(`https://api.spoonacular.com/food/ingredients/${id}/information`, {
      params: {
        apiKey: SPOONACULAR_API_KEY,
        amount: 100,
        unit: 'grams',
      },
    })

    return response.data
  } catch (error) {
    console.error('Error getting ingredient:', error)
    throw error
  }
} 