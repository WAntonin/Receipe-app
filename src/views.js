import { getRecipes } from './recipes'
import { getFilters } from './filters'
import { getIngredients } from './ingredients'

const generateRecipeDOM = (recipe) => {
    const recipeEl = document.createElement('a')
    const titleEl = document.createElement('p')

    if (recipe.name.length > 0) {
        titleEl.textContent = recipe.name
    } else {
        titleEl.textContent = 'Unamed recipe'
    }

    recipeEl.setAttribute('href', `/display.html#${recipe.id}`)
    recipeEl.appendChild(titleEl)

    return recipeEl
}

const renderRecipes = () => {
    const { searchText } = getFilters()
    const recipes = getRecipes()
    const filteredRecipes = recipes.filter((recipe) => recipe.name.toLowerCase().includes(searchText.toLowerCase()))

    const recipesEl = document.querySelector('#recipes')
    recipesEl.innerHTML = ''

    filteredRecipes.forEach((recipe) => {
        const recipeEl = generateRecipeDOM(recipe)
        recipesEl.appendChild(recipeEl)
    })
}

const initialiseDisplayPage = (recipeId) => {
    const recipes = getRecipes()
    const titleEl = document.querySelector('#recipe-title')
    const instructionsEl = document.querySelector('#instruction-display')
    const ingredientsEl = document.querySelector('#ingredients-display')
    
    const recipe = recipes.find((recipe) => recipe.id.includes(recipeId))
    console.log(recipe)

    titleEl.textContent = recipe.name
    instructionsEl.textContent = recipe.instructions

    recipe.ingredients.forEach((ingredient) => {
        let ingredientEl = document.createElement('p')
        ingredientEl.textContent = ingredient.name
        ingredientsEl.appendChild(ingredientEl)
    })
}
export { renderRecipes, initialiseDisplayPage }