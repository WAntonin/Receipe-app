import { updateRecipe, removeRecipe } from './recipes'
import { initialiseEditPage, renderIngredientList, } from './views'

const recipeId = location.hash.substring(1)
let newIngredient = ''

initialiseEditPage(recipeId)
renderIngredientList(recipeId)

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

// document.querySelector('#input-ingredient').addEventListener('input', (e) => {
//     newIngredient = e.target.value.trim()
// })

// document.querySelector('#add-ingredient').addEventListener('click', () => {
//     updateRecipe(recipeId, {
//         ingredient: newIngredient
//     })
//     renderIngredientList(recipeId)
// })

document.querySelector('#ingredient-form').addEventListener('submit', (e) => {
    e.preventDefault()
    console.log(e.target.ingredient.value)
    updateRecipe(recipeId, {
        ingredient: e.target.ingredient.value.trim()
    })
    renderIngredientList(recipeId)
})

document.querySelector('#remove-recipe').addEventListener('click', () => {
    removeRecipe(recipeId)
    location.assign('/index.html')
})

window.addEventListener('storage', (e) => {
    if (e.key === 'recipes') {
        console.log('test storage listenerS')
        initialiseEditPage(recipeId)
        renderIngredientList(recipeId)
    }
})