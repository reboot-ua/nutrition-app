import request from 'supertest'
import express from 'express'
import externalFoodRoutes from '../routes/externalFood.routes'
import { verifyToken } from '../middleware/auth.middleware'

jest.mock('../middleware/auth.middleware', () => ({
  verifyToken: jest.fn((req, res, next) => next()),
}))

jest.mock('../controllers/externalFood.controller', () => ({
  searchRecipesController: jest.fn((req, res) => res.status(200).json({ message: 'Recipes found' })),
  getRecipeByIdController: jest.fn((req, res) => res.status(200).json({ message: 'Recipe found' })),
  getRandomRecipesController: jest.fn((req, res) => res.status(200).json({ message: 'Random recipes found' })),
  searchIngredientsController: jest.fn((req, res) => res.status(200).json({ message: 'Ingredients found' })),
  getIngredientByIdController: jest.fn((req, res) => res.status(200).json({ message: 'Ingredient found' })),
}))

describe('External Food Routes', () => {
  let app: express.Application

  beforeEach(() => {
    app = express()
    app.use('/api/food', externalFoodRoutes)
  })

  describe('GET /api/food/recipes/search', () => {
    it('should call searchRecipesController', async () => {
      const response = await request(app)
        .get('/api/food/recipes/search')
        .query({ query: 'pasta' })

      expect(response.status).toBe(200)
      expect(response.body).toEqual({ message: 'Recipes found' })
      expect(verifyToken).toHaveBeenCalled()
    })
  })

  describe('GET /api/food/recipes/:id', () => {
    it('should call getRecipeByIdController', async () => {
      const response = await request(app).get('/api/food/recipes/1')

      expect(response.status).toBe(200)
      expect(response.body).toEqual({ message: 'Recipe found' })
      expect(verifyToken).toHaveBeenCalled()
    })
  })

  describe('GET /api/food/recipes/random', () => {
    it('should call getRandomRecipesController', async () => {
      const response = await request(app).get('/api/food/recipes/random')

      expect(response.status).toBe(200)
      expect(response.body).toEqual({ message: 'Random recipes found' })
      expect(verifyToken).toHaveBeenCalled()
    })
  })

  describe('GET /api/food/ingredients/search', () => {
    it('should call searchIngredientsController', async () => {
      const response = await request(app)
        .get('/api/food/ingredients/search')
        .query({ query: 'apple' })

      expect(response.status).toBe(200)
      expect(response.body).toEqual({ message: 'Ingredients found' })
      expect(verifyToken).toHaveBeenCalled()
    })
  })

  describe('GET /api/food/ingredients/:id', () => {
    it('should call getIngredientByIdController', async () => {
      const response = await request(app).get('/api/food/ingredients/1')

      expect(response.status).toBe(200)
      expect(response.body).toEqual({ message: 'Ingredient found' })
      expect(verifyToken).toHaveBeenCalled()
    })
  })
}) 