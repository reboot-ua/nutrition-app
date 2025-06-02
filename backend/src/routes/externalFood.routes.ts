import express from 'express'
import {
  searchRecipesController,
  getRecipeByIdController,
  getRandomRecipesController,
  searchIngredientsController,
  getIngredientByIdController,
} from '../controllers/externalFood.controller'
import { verifyToken } from '../middleware/auth.middleware'

const router = express.Router()

// Recipe routes
router.get('/recipes/search', verifyToken, searchRecipesController)
router.get('/recipes/random', verifyToken, getRandomRecipesController)
router.get('/recipes/:id', verifyToken, getRecipeByIdController)

// Ingredient routes
router.get('/ingredients/search', verifyToken, searchIngredientsController)
router.get('/ingredients/:id', verifyToken, getIngredientByIdController)

export default router 