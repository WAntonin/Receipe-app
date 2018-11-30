import uuidv4 from 'uuid/v4'
import moment from 'moment'

let recipes = []

const loadRecipes = () => {
    const recipesJSON = localStorage.getItem('notes')

    try {
        return recipesJSON ? JSON.parse(recipesJSON) : []
    } catch (e) {
        return []
    }
}

const getRecipes = () => recipes

const saveRecipes = () => {
    localStorage.setItem('notes', JSON.stringify(recipes))
}

const createRecipe = () => {
    const timestamp = moment().valueOf()
    recipes.push({
        id: uuidv4(),
        name: 'nkkjame',
        instructions: 'blablabalbala',
        createdAt: timestamp,
        updatedAt: timestamp,
        ingredients: [{
            name: 'poulet',
            inStore: true
        }, {
            name: 'rôti',
            inStore: false
        }]
    })
    saveRecipes()
}

recipes = loadRecipes()

export { getRecipes,createRecipe, saveRecipes }