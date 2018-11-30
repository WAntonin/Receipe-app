import { updateRecipe } from './recipes'
import { initialiseEditPage, renderIngredientList,  } from './views'

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

document.querySelector('#input-ingredient').addEventListener('input', (e) => {
   newIngredient = e.target.value.trim()
   console.log(newIngredient)
} )

document.querySelector('#add-ingredient').addEventListener('click', () => {
    updateRecipe(recipeId, {
        ingredient: newIngredient
    })
    renderIngredientList(recipeId)
})