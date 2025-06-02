import { Request, Response } from 'express'
import {
  searchRecipesController,
  getRecipeByIdController,
  getRandomRecipesController,
  searchIngredientsController,
  getIngredientByIdController,
} from '../controllers/externalFood.controller'
import {
  searchRecipes,
  getRecipeById,
  getRandomRecipes,
  searchIngredients,
  getIngredientById,
} from '../services/externalFood.service'

jest.mock('../services/externalFood.service')

describe('External Food Controller', () => {
  let mockRequest: Partial<Request>
  let mockResponse: Partial<Response>
  let responseObject: any

  beforeEach(() => {
    responseObject = {}
    mockRequest = {
      query: {},
      params: {},
    }
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockImplementation((result) => {
        responseObject = result
        return mockResponse
      }),
    }
  })

  describe('searchRecipesController', () => {
    it('should return 400 if query is missing', async () => {
      await searchRecipesController(
        mockRequest as Request,
        mockResponse as Response
      )

      expect(mockResponse.status).toHaveBeenCalledWith(400)
      expect(responseObject).toEqual({
        message: 'Query parameter is required',
      })
    })

    it('should search recipes with default parameters', async () => {
      const mockRecipes = {
        results: [
          {
            id: 1,
            title: 'Test Recipe',
            image: 'test.jpg',
          },
        ],
      }
      ;(searchRecipes as jest.Mock).mockResolvedValueOnce(mockRecipes)

      mockRequest.query = { query: 'pasta' }

      await searchRecipesController(
        mockRequest as Request,
        mockResponse as Response
      )

      expect(searchRecipes).toHaveBeenCalledWith({
        query: 'pasta',
        number: 10,
        offset: 0,
      })
      expect(mockResponse.status).toHaveBeenCalledWith(200)
      expect(responseObject).toEqual(mockRecipes)
    })

    it('should search recipes with custom parameters', async () => {
      const mockRecipes = {
        results: [
          {
            id: 1,
            title: 'Test Recipe',
            image: 'test.jpg',
          },
        ],
      }
      ;(searchRecipes as jest.Mock).mockResolvedValueOnce(mockRecipes)

      mockRequest.query = {
        query: 'pasta',
        number: '5',
        offset: '10',
        type: 'main course',
        cuisine: 'italian',
        diet: 'vegetarian',
        intolerances: 'gluten',
      }

      await searchRecipesController(
        mockRequest as Request,
        mockResponse as Response
      )

      expect(searchRecipes).toHaveBeenCalledWith({
        query: 'pasta',
        number: 5,
        offset: 10,
        type: 'main course',
        cuisine: 'italian',
        diet: 'vegetarian',
        intolerances: 'gluten',
      })
      expect(mockResponse.status).toHaveBeenCalledWith(200)
      expect(responseObject).toEqual(mockRecipes)
    })
  })

  describe('getRecipeByIdController', () => {
    it('should return 400 if id is missing', async () => {
      await getRecipeByIdController(
        mockRequest as Request,
        mockResponse as Response
      )

      expect(mockResponse.status).toHaveBeenCalledWith(400)
      expect(responseObject).toEqual({
        message: 'Recipe ID is required',
      })
    })

    it('should get recipe by id', async () => {
      const mockRecipe = {
        id: 1,
        title: 'Test Recipe',
        image: 'test.jpg',
      }
      ;(getRecipeById as jest.Mock).mockResolvedValueOnce(mockRecipe)

      mockRequest.params = { id: '1' }

      await getRecipeByIdController(
        mockRequest as Request,
        mockResponse as Response
      )

      expect(getRecipeById).toHaveBeenCalledWith(1)
      expect(mockResponse.status).toHaveBeenCalledWith(200)
      expect(responseObject).toEqual(mockRecipe)
    })
  })

  describe('getRandomRecipesController', () => {
    it('should get random recipes with default parameters', async () => {
      const mockRecipes = {
        recipes: [
          {
            id: 1,
            title: 'Test Recipe',
            image: 'test.jpg',
          },
        ],
      }
      ;(getRandomRecipes as jest.Mock).mockResolvedValueOnce(mockRecipes)

      await getRandomRecipesController(
        mockRequest as Request,
        mockResponse as Response
      )

      expect(getRandomRecipes).toHaveBeenCalledWith(10, undefined)
      expect(mockResponse.status).toHaveBeenCalledWith(200)
      expect(responseObject).toEqual(mockRecipes)
    })

    it('should get random recipes with custom parameters', async () => {
      const mockRecipes = {
        recipes: [
          {
            id: 1,
            title: 'Test Recipe',
            image: 'test.jpg',
          },
        ],
      }
      ;(getRandomRecipes as jest.Mock).mockResolvedValueOnce(mockRecipes)

      mockRequest.query = { number: '5', tags: 'vegetarian' }

      await getRandomRecipesController(
        mockRequest as Request,
        mockResponse as Response
      )

      expect(getRandomRecipes).toHaveBeenCalledWith(5, 'vegetarian')
      expect(mockResponse.status).toHaveBeenCalledWith(200)
      expect(responseObject).toEqual(mockRecipes)
    })
  })

  describe('searchIngredientsController', () => {
    it('should return 400 if query is missing', async () => {
      await searchIngredientsController(
        mockRequest as Request,
        mockResponse as Response
      )

      expect(mockResponse.status).toHaveBeenCalledWith(400)
      expect(responseObject).toEqual({
        message: 'Query parameter is required',
      })
    })

    it('should search ingredients with default parameters', async () => {
      const mockIngredients = {
        results: [
          {
            id: 1,
            name: 'Test Ingredient',
            image: 'test.jpg',
          },
        ],
      }
      ;(searchIngredients as jest.Mock).mockResolvedValueOnce(mockIngredients)

      mockRequest.query = { query: 'apple' }

      await searchIngredientsController(
        mockRequest as Request,
        mockResponse as Response
      )

      expect(searchIngredients).toHaveBeenCalledWith('apple', 10)
      expect(mockResponse.status).toHaveBeenCalledWith(200)
      expect(responseObject).toEqual(mockIngredients)
    })

    it('should search ingredients with custom parameters', async () => {
      const mockIngredients = {
        results: [
          {
            id: 1,
            name: 'Test Ingredient',
            image: 'test.jpg',
          },
        ],
      }
      ;(searchIngredients as jest.Mock).mockResolvedValueOnce(mockIngredients)

      mockRequest.query = { query: 'apple', number: '5' }

      await searchIngredientsController(
        mockRequest as Request,
        mockResponse as Response
      )

      expect(searchIngredients).toHaveBeenCalledWith('apple', 5)
      expect(mockResponse.status).toHaveBeenCalledWith(200)
      expect(responseObject).toEqual(mockIngredients)
    })
  })

  describe('getIngredientByIdController', () => {
    it('should return 400 if id is missing', async () => {
      await getIngredientByIdController(
        mockRequest as Request,
        mockResponse as Response
      )

      expect(mockResponse.status).toHaveBeenCalledWith(400)
      expect(responseObject).toEqual({
        message: 'Ingredient ID is required',
      })
    })

    it('should get ingredient by id', async () => {
      const mockIngredient = {
        id: 1,
        name: 'Test Ingredient',
        image: 'test.jpg',
      }
      ;(getIngredientById as jest.Mock).mockResolvedValueOnce(mockIngredient)

      mockRequest.params = { id: '1' }

      await getIngredientByIdController(
        mockRequest as Request,
        mockResponse as Response
      )

      expect(getIngredientById).toHaveBeenCalledWith(1)
      expect(mockResponse.status).toHaveBeenCalledWith(200)
      expect(responseObject).toEqual(mockIngredient)
    })
  })
}) 