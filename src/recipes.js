import uuidv4 from 'uuid/v4'
import moment from 'moment'

let recipes = []

const loadRecipes = () => {
    const recipesJSON = localStorage.getItem('recipes')

    try {
        return recipesJSON ? JSON.parse(recipesJSON) : []
    } catch (e) {
        return []
    }
}

const saveRecipes = () => {
    localStorage.setItem('recipes', JSON.stringify(recipes))
}

const getRecipes = () => recipes

const findRecipe = (id) => {
    return recipes.find((recipe) => recipe.id === id)
}

const createRecipe = () => {
    const timestamp = moment().valueOf()
    const id = uuidv4()
    recipes.push({
        title: '',
        instructions: '',
        ingredients: [],
        id: id,
        createdAt: timestamp,
        updatedAt: timestamp,
    })
    saveRecipes()
    return id
}

const ingredientsInStock = (recipe) => {
    let sum = 0
    recipe.ingredients.forEach((ingredient) => ingredient.inStock === true ? sum += 1 : sum += 0)
    return sum
}

const toggleIngredient = (id, name) => {
    const recipe = findRecipe(id)
    if (recipe) {
        const ingredient = recipe.ingredients.find((ingredient) => ingredient.name === name)
        ingredient.inStock = !ingredient.inStock
        saveRecipes()
    }
}

const updateRecipe = (id, { title, instructions, ingredient }) => {
    const recipe = findRecipe(id)
    if (!recipe) {
        return
    }
    if (typeof title === 'string') {
        recipe.title = title
    }
    if (typeof instructions === 'string') {
        recipe.instructions = instructions
    }
    if (typeof ingredient === 'string') {
        recipe.ingredients.push({
            name: ingredient,
            inStock: false
        })
    }
    saveRecipes()
}

const removeIngredient = (id, ingredientName) => {

    const { ingredients } = findRecipe(id)
    const ingredientIndex = ingredients.findIndex((ingredient) => ingredient.name === ingredientName)

    if (ingredientIndex > -1) {
        ingredients.splice(ingredientIndex, 1)
        saveRecipes()
    }
}

const removeRecipe = (id) => {
    const recipeIndex = recipes.findIndex((recipe) => recipe.id === id)

    if (recipeIndex > -1) {
        recipes.splice(recipeIndex, 1)
        saveRecipes()
    }

}

const getAllIngredients = () => {
    let allIngredients = []

    recipes.forEach((recipe) => {
        recipe.ingredients.forEach((ingredient) => allIngredients.push(ingredient.name))
    })
    allIngredients = allIngredients.filter((ingredient, index) => allIngredients.indexOf(ingredient) === index)

    return allIngredients
}

const getIngredientsInStock = () => {
    let ingredientStock = []
    recipes.forEach((recipe) => {
        recipe.ingredients.forEach((ingredient) => {
            if (ingredient.inStock ) {
                ingredientStock.push(ingredient.name)
            }
        })
    })
    ingredientStock = ingredientStock.filter((ingredient, index) => ingredientStock.indexOf(ingredient) === index)
    console.log(ingredientStock)
    return ingredientStock
}

const refreshIngredientStock = (addIngredient) => {
    recipes.forEach((recipe) => {
        recipe.ingredients.forEach((ingredient) => {
            if (addIngredient.includes(ingredient.name)) {
                ingredient.inStock = true
            } else {
                ingredient.inStock = false
            }
        })
    })
    saveRecipes()
}

recipes = loadRecipes()

export {
    getRecipes,
    createRecipe,
    saveRecipes,
    toggleIngredient,
    updateRecipe,
    findRecipe,
    removeIngredient,
    removeRecipe,
    getAllIngredients,
    getIngredientsInStock,
    refreshIngredientStock,
    ingredientsInStock
}