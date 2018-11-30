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

const getRecipes = () => recipes

const saveRecipes = () => {
    localStorage.setItem('recipes', JSON.stringify(recipes))
}

const findRecipe = (id) => {
    return recipes.find((recipe) => recipe.id === id)
}

const createRecipe = () => {
    const timestamp = moment().valueOf()
    recipes.push({
        title: 'nkkjame',
        instructions: 'blablabalbala',
        
        ingredients: [{
            name: 'poulet',
            inStock: true
        }, {
            name: 'rôti',
            inStock: false
        }],
        id: uuidv4(),
        createdAt: timestamp,
        updatedAt: timestamp,
    })
    saveRecipes()
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
    const {ingredients} = findRecipe(id)
    const ingredientIndex = ingredients.findIndex((ingredient) => ingredient.name === ingredientName)

    if (ingredientIndex > -1) {
        ingredients.splice(ingredientIndex, 1)
        saveRecipes()
    }
}
recipes = loadRecipes()

export { getRecipes, createRecipe, saveRecipes, toggleIngredient, updateRecipe, removeIngredient }