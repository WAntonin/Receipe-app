import { getRecipes, toggleIngredient, removeIngredient } from './recipes'
import { getFilters } from './filters'

const generateRecipeDOM = (recipe) => {
    const recipeEl = document.createElement('a')
    const titleEl = document.createElement('p')

    if (recipe.title.length > 0) {
        titleEl.textContent = recipe.title
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
    const filteredRecipes = recipes.filter((recipe) => recipe.title.toLowerCase().includes(searchText.toLowerCase()))

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
    const editRecipeEl = document.querySelector('#edit-recipe')
    const recipe = recipes.find((recipe) => recipe.id.includes(recipeId))

    editRecipeEl.setAttribute('href', `/edit.html#${recipeId}`)

    titleEl.textContent = recipe.title
    instructionsEl.textContent = recipe.instructions

    recipe.ingredients.forEach((ingredient) => {
        let ingredientEl = document.createElement('p')
        ingredientEl.textContent = ingredient.name
        ingredientsEl.appendChild(ingredientEl)
    })
}

const initialiseEditPage = (recipeId) => {
    const recipes = getRecipes()
    const titleEl = document.querySelector('#recipe-title')
    const instructionsEl = document.querySelector('#recipe-instructions')


    const { title, instructions } = recipes.find((recipe) => recipe.id.includes(recipeId))

    titleEl.value = title
    instructionsEl.value = instructions


}

const renderIngredientList = (recipeId) => {
    const recipes = getRecipes()
    const { ingredients, id } = recipes.find((recipe) => recipe.id.includes(recipeId))
    console.log(ingredients, id)
    const ingredientsListEl = document.querySelector('#ingredients-list')

    ingredientsListEl.innerHTML = ''

    ingredients.forEach((ingredient) => {
        const ingredientContainerEl = document.createElement('div')
        const checkBoxEl = document.createElement('input')
        const ingredientEl = document.createElement('span')
        const removeBtnEl = document.createElement('button')

        checkBoxEl.setAttribute('type', 'checkbox')
        checkBoxEl.checked = ingredient.inStock
        checkBoxEl.addEventListener('change', () => {
            toggleIngredient(id, ingredient.name)
        })
        ingredientContainerEl.appendChild(checkBoxEl)

        ingredientEl.textContent = ingredient.name
        ingredientContainerEl.appendChild(ingredientEl)

        removeBtnEl.textContent = 'remove'
        removeBtnEl.addEventListener('click', () => {
            removeIngredient(id, ingredient.name)
            renderIngredientList(recipeId)
        })
        ingredientContainerEl.appendChild(removeBtnEl)

        ingredientsListEl.appendChild(ingredientContainerEl)
    })
}

export { renderRecipes, initialiseDisplayPage, initialiseEditPage, renderIngredientList }