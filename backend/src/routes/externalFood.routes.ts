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
/**
 * @swagger
 * /api/food/recipes/search:
 *   get:
 *     summary: Search for recipes
 *     tags: [External Food - Recipes]
 *     security:
 *       - bearerAuth:
 *           []
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         description: Search term for recipes
 *     responses:
 *       200:
 *         description: A list of recipes matching the search term
 *       401:
 *         description: Unauthorized
 */
router.get('/recipes/search', verifyToken, searchRecipesController)

/**
 * @swagger
 * /api/food/recipes/random:
 *   get:
 *     summary: Get a list of random recipes
 *     tags: [External Food - Recipes]
 *     security:
 *       - bearerAuth:
 *           []
 *     parameters:
 *       - in: query
 *         name: number
 *         schema:
 *           type: integer
 *           format: int32
 *         description: The number of random recipes to retrieve (default is 10)
 *     responses:
 *       200:
 *         description: A list of random recipes
 *       401:
 *         description: Unauthorized
 */
router.get('/recipes/random', verifyToken, getRandomRecipesController)

/**
 * @swagger
 * /api/food/recipes/{id}:
 *   get:
 *     summary: Get a recipe by its ID
 *     tags: [External Food - Recipes]
 *     security:
 *       - bearerAuth:
 *           []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the recipe to retrieve
 *     responses:
 *       200:
 *         description: Recipe details
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Recipe not found
 */
router.get('/recipes/:id', verifyToken, getRecipeByIdController)

// Ingredient routes
/**
 * @swagger
 * /api/food/ingredients/search:
 *   get:
 *     summary: Search for ingredients
 *     tags: [External Food - Ingredients]
 *     security:
 *       - bearerAuth:
 *           []
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         description: Search term for ingredients
 *     responses:
 *       200:
 *         description: A list of ingredients matching the search term
 *       401:
 *         description: Unauthorized
 */
router.get('/ingredients/search', verifyToken, searchIngredientsController)

/**
 * @swagger
 * /api/food/ingredients/{id}:
 *   get:
 *     summary: Get an ingredient by its ID
 *     tags: [External Food - Ingredients]
 *     security:
 *       - bearerAuth:
 *           []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the ingredient to retrieve
 *     responses:
 *       200:
 *         description: Ingredient details
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Ingredient not found
 */
router.get('/ingredients/:id', verifyToken, getIngredientByIdController)

export default router 