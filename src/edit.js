import { updateRecipe, removeRecipe } from './recipes'
import { initialiseEditPage, renderIngredientList, } from './views'

const recipeId = location.hash.substring(1)

initialiseEditPage(recipeId)
renderIngredientList(recipeId)

document.querySelector('#save').addEventListener('click', () => {
    location.assign('/index.html')
})

document.querySelector('#recipe-title').addEventListener('input', (e) => {
    updateRecipe(recipeId, {
        title: e.target.value
    })
})

document.querySelector('#recipe-instructions').addEventListener('input', (e) => {
    updateRecipe(recipeId, {
        instructions: e.target.value
    })
})

document.querySelector('#add-ingredient').addEventListener('submit', (e) => {
    const newIngredient = e.target.ingredient.value.trim()
    e.preventDefault()
    if (newIngredient.length > 0) {
        updateRecipe(recipeId, {
        ingredient: newIngredient
    })
    renderIngredientList(recipeId)
    }  
})

document.querySelector('#remove-recipe').addEventListener('click', () => {
    removeRecipe(recipeId)
    location.assign('/index.html')
})

window.addEventListener('storage', (e) => {
    if (e.key === 'recipes') {
        initialiseEditPage(recipeId)
        renderIngredientList(recipeId)
    }
})