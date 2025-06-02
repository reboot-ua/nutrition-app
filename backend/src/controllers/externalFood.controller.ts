import { Request, Response } from 'express'
import {
  searchRecipes,
  getRecipeById,
  getRandomRecipes,
  searchIngredients,
  getIngredientById,
} from '../services/externalFood.service'

export const searchRecipesController = async (req: Request, res: Response) => {
  try {
    const {
      query,
      number = 10,
      offset = 0,
      type,
      cuisine,
      diet,
      intolerances,
    } = req.query

    if (!query) {
      return res.status(400).json({ message: 'Query parameter is required' })
    }

    const recipes = await searchRecipes({
      query: query as string,
      number: Number(number),
      offset: Number(offset),
      type: type as string,
      cuisine: cuisine as string,
      diet: diet as string,
      intolerances: intolerances as string,
    })

    return res.status(200).json(recipes)
  } catch (error) {
    console.error('Error in searchRecipesController:', error)
    return res.status(500).json({ message: 'Помилка при пошуку рецептів' })
  }
}

export const getRecipeByIdController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    if (!id) {
      return res.status(400).json({ message: 'Recipe ID is required' })
    }

    const recipe = await getRecipeById(Number(id))
    return res.status(200).json(recipe)
  } catch (error) {
    console.error('Error in getRecipeByIdController:', error)
    return res.status(500).json({ message: 'Помилка при отриманні рецепту' })
  }
}

export const getRandomRecipesController = async (req: Request, res: Response) => {
  try {
    const { number = 10, tags } = req.query

    const recipes = await getRandomRecipes(Number(number), tags as string)
    return res.status(200).json(recipes)
  } catch (error) {
    console.error('Error in getRandomRecipesController:', error)
    return res.status(500).json({ message: 'Помилка при отриманні випадкових рецептів' })
  }
}

export const searchIngredientsController = async (req: Request, res: Response) => {
  try {
    const { query, number = 10 } = req.query

    if (!query) {
      return res.status(400).json({ message: 'Query parameter is required' })
    }

    const ingredients = await searchIngredients(query as string, Number(number))
    return res.status(200).json(ingredients)
  } catch (error) {
    console.error('Error in searchIngredientsController:', error)
    return res.status(500).json({ message: 'Помилка при пошуку інгредієнтів' })
  }
}

export const getIngredientByIdController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    if (!id) {
      return res.status(400).json({ message: 'Ingredient ID is required' })
    }

    const ingredient = await getIngredientById(Number(id))
    return res.status(200).json(ingredient)
  } catch (error) {
    console.error('Error in getIngredientByIdController:', error)
    return res.status(500).json({ message: 'Помилка при отриманні інгредієнту' })
  }
} 