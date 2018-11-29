import { getRecipes } from './recipes'
import { getFilters } from './filters'

const generateRecipeDOM = (recipe) => {
    const recipeEl = document.createElement('a')
    const titleEl = document.createElement('p')

    if (recipe.name.length > 0) {
        titleEl.textContent = recipe.name
    } else {
        titleEl.textContent = 'Unamed recipe'
    }

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

export { renderRecipes }