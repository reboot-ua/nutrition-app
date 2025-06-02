import axios from 'axios'
import {
  searchRecipes,
  getRecipeById,
  getRandomRecipes,
  searchIngredients,
  getIngredientById,
} from '../services/externalFood.service'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('External Food Service', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('searchRecipes', () => {
    it('should search recipes with default parameters', async () => {
      const mockResponse = {
        data: {
          results: [
            {
              id: 1,
              title: 'Test Recipe',
              image: 'test.jpg',
            },
          ],
        },
      }
      mockedAxios.get.mockResolvedValueOnce(mockResponse)

      const result = await searchRecipes({ query: 'pasta' })

      expect(mockedAxios.get).toHaveBeenCalledWith(
        'https://api.spoonacular.com/recipes/complexSearch',
        expect.objectContaining({
          params: expect.objectContaining({
            query: 'pasta',
            addRecipeNutrition: true,
          }),
        })
      )
      expect(result).toEqual(mockResponse.data)
    })

    it('should search recipes with custom parameters', async () => {
      const mockResponse = {
        data: {
          results: [
            {
              id: 1,
              title: 'Test Recipe',
              image: 'test.jpg',
            },
          ],
        },
      }
      mockedAxios.get.mockResolvedValueOnce(mockResponse)

      const result = await searchRecipes({
        query: 'pasta',
        number: 5,
        offset: 10,
        type: 'main course',
        cuisine: 'italian',
        diet: 'vegetarian',
        intolerances: 'gluten',
      })

      expect(mockedAxios.get).toHaveBeenCalledWith(
        'https://api.spoonacular.com/recipes/complexSearch',
        expect.objectContaining({
          params: expect.objectContaining({
            query: 'pasta',
            number: 5,
            offset: 10,
            type: 'main course',
            cuisine: 'italian',
            diet: 'vegetarian',
            intolerances: 'gluten',
            addRecipeNutrition: true,
          }),
        })
      )
      expect(result).toEqual(mockResponse.data)
    })
  })

  describe('getRecipeById', () => {
    it('should get recipe by id', async () => {
      const mockResponse = {
        data: {
          id: 1,
          title: 'Test Recipe',
          image: 'test.jpg',
        },
      }
      mockedAxios.get.mockResolvedValueOnce(mockResponse)

      const result = await getRecipeById(1)

      expect(mockedAxios.get).toHaveBeenCalledWith(
        'https://api.spoonacular.com/recipes/1/information',
        expect.objectContaining({
          params: expect.objectContaining({
            addRecipeNutrition: true,
          }),
        })
      )
      expect(result).toEqual(mockResponse.data)
    })
  })

  describe('getRandomRecipes', () => {
    it('should get random recipes with default parameters', async () => {
      const mockResponse = {
        data: {
          recipes: [
            {
              id: 1,
              title: 'Test Recipe',
              image: 'test.jpg',
            },
          ],
        },
      }
      mockedAxios.get.mockResolvedValueOnce(mockResponse)

      const result = await getRandomRecipes()

      expect(mockedAxios.get).toHaveBeenCalledWith(
        'https://api.spoonacular.com/recipes/random',
        expect.objectContaining({
          params: expect.objectContaining({
            number: 10,
            addRecipeNutrition: true,
          }),
        })
      )
      expect(result).toEqual(mockResponse.data)
    })

    it('should get random recipes with custom parameters', async () => {
      const mockResponse = {
        data: {
          recipes: [
            {
              id: 1,
              title: 'Test Recipe',
              image: 'test.jpg',
            },
          ],
        },
      }
      mockedAxios.get.mockResolvedValueOnce(mockResponse)

      const result = await getRandomRecipes(5, 'vegetarian')

      expect(mockedAxios.get).toHaveBeenCalledWith(
        'https://api.spoonacular.com/recipes/random',
        expect.objectContaining({
          params: expect.objectContaining({
            number: 5,
            tags: 'vegetarian',
            addRecipeNutrition: true,
          }),
        })
      )
      expect(result).toEqual(mockResponse.data)
    })
  })

  describe('searchIngredients', () => {
    it('should search ingredients with default parameters', async () => {
      const mockResponse = {
        data: {
          results: [
            {
              id: 1,
              name: 'Test Ingredient',
              image: 'test.jpg',
            },
          ],
        },
      }
      mockedAxios.get.mockResolvedValueOnce(mockResponse)

      const result = await searchIngredients('apple')

      expect(mockedAxios.get).toHaveBeenCalledWith(
        'https://api.spoonacular.com/food/ingredients/search',
        expect.objectContaining({
          params: expect.objectContaining({
            query: 'apple',
            number: 10,
          }),
        })
      )
      expect(result).toEqual(mockResponse.data)
    })

    it('should search ingredients with custom parameters', async () => {
      const mockResponse = {
        data: {
          results: [
            {
              id: 1,
              name: 'Test Ingredient',
              image: 'test.jpg',
            },
          ],
        },
      }
      mockedAxios.get.mockResolvedValueOnce(mockResponse)

      const result = await searchIngredients('apple', 5)

      expect(mockedAxios.get).toHaveBeenCalledWith(
        'https://api.spoonacular.com/food/ingredients/search',
        expect.objectContaining({
          params: expect.objectContaining({
            query: 'apple',
            number: 5,
          }),
        })
      )
      expect(result).toEqual(mockResponse.data)
    })
  })

  describe('getIngredientById', () => {
    it('should get ingredient by id', async () => {
      const mockResponse = {
        data: {
          id: 1,
          name: 'Test Ingredient',
          image: 'test.jpg',
        },
      }
      mockedAxios.get.mockResolvedValueOnce(mockResponse)

      const result = await getIngredientById(1)

      expect(mockedAxios.get).toHaveBeenCalledWith(
        'https://api.spoonacular.com/food/ingredients/1/information',
        expect.objectContaining({
          params: expect.objectContaining({
            amount: 100,
            unit: 'grams',
          }),
        })
      )
      expect(result).toEqual(mockResponse.data)
    })
  })
}) 