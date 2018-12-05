import { getRecipes, toggleIngredient, removeIngredient, getAllIngredients } from './recipes'
import { refreshIngredientStock, findRecipe } from './recipes'
import { getFilters, setFilters, unsetFilters } from './filters'

const generateRecipeDOM = (recipe) => {
    const recipeEl = document.createElement('a')
    const titleEl = document.createElement('p')

    titleEl.classList.add('list-item__title')
    if (recipe.title.length > 0) {
        titleEl.textContent = recipe.title
    } else {
        titleEl.textContent = 'Unamed recipe'
    }

    recipeEl.setAttribute('href', `/display.html#${recipe.id}`)
    recipeEl.appendChild(titleEl)
    recipeEl.classList.add('list-item') 
    return recipeEl
}

const renderRecipes = () => {
    const { searchText, myIngredients } = getFilters()
    const recipes = getRecipes()
    const recipesEl = document.querySelector('#recipes')

    // 
    let filteredRecipes = recipes.filter((recipe) => recipe.title.toLowerCase().includes(searchText.toLowerCase()))

    // const filterIngredients = myIngredients.includes(recipe.ingredients.forEach((ingredient) => ingredient.name))
    // console.log(recipe.ingredients.forEach((ingredient) => ingredient.name))
    // console.log('filterIngredients', filterIngredients)
    // // recipe.ingredients.forEach((ingredient) => myIngredients.includes(ingredient.name))

    if (myIngredients.length > 0) {
        refreshIngredientStock(myIngredients)
        filteredRecipes = filteredRecipes.filter((recipe) => {
            let display = false
            recipe.ingredients.forEach((ingredient) => {
                display = display || ingredient.inStock
                return display
            })
            return display
        })
    }

    recipesEl.innerHTML = ''

    if (filteredRecipes.length > 0) {
        filteredRecipes.forEach((recipe) => {
        const recipeEl = generateRecipeDOM(recipe)
        recipesEl.appendChild(recipeEl)
    })
    } else {
        const emptyMessage = document.createElement('p')
        emptyMessage.textContent = 'Sorry. No recipes matching your criterias.'
        emptyMessage.classList.add('empty-message')
        recipesEl.appendChild(emptyMessage)
    }
}

const renderIngredientsFilter = () => {
    const { myIngredients } = getFilters()
    const availableIngredientsEl = document.querySelector('#available-ingredients')
    const filterIngredientsEl = document.querySelector('#filter-ingredients')
    let availableIngredients = getAllIngredients()

    // Clear ingredients
    availableIngredientsEl.innerHTML = ''
    filterIngredientsEl.innerHTML = ''

    // Remove filtered ingredients from available ingredients
    availableIngredients = availableIngredients.filter((ingredient) => !myIngredients.includes(ingredient))

    myIngredients.forEach((ingredient) => {
        const ingredientEl = document.createElement('span')
        ingredientEl.textContent = ingredient
        ingredientEl.classList.add('actions__filter-item')
        ingredientEl.addEventListener('click', () => {
            unsetFilters({
                myIngredients: ingredient
            })
            renderIngredientsFilter()
            renderRecipes()
        })
        filterIngredientsEl.appendChild(ingredientEl)
    })

    availableIngredients.forEach((ingredient) => {
        const ingredientEl = document.createElement('span')
        ingredientEl.textContent = ingredient
        ingredientEl.classList.add('actions__filter-item')
        ingredientEl.addEventListener('click', () => {
            setFilters({
                myIngredients: ingredient
            })
            renderIngredientsFilter()
            renderRecipes()
        })
        availableIngredientsEl.appendChild(ingredientEl)
    })
}

const initialiseDisplayPage = (recipeId) => {
    const titleEl = document.querySelector('#recipe-title')
    const instructionsEl = document.querySelector('#instruction-display')
    const ingredientsEl = document.querySelector('#ingredients-display')
    const editRecipeEl = document.querySelector('#edit-recipe')
    const recipe = findRecipe(recipeId)

    editRecipeEl.addEventListener('click', () => {
        location.assign(`/edit.html#${recipeId}`)
    })

    titleEl.textContent = recipe.title
    instructionsEl.textContent = recipe.instructions

    recipe.ingredients.forEach((ingredient) => {
        let ingredientEl = document.createElement('p')
        ingredientEl.textContent = ingredient.name
        ingredientsEl.appendChild(ingredientEl)
    })
}

const initialiseEditPage = (recipeId) => {
    if (!recipeId) {
        return
    }
    const titleEl = document.querySelector('#recipe-title')
    const instructionsEl = document.querySelector('#recipe-instructions')
    const recipe = findRecipe(recipeId)
    titleEl.value = recipe.title
    instructionsEl.value = recipe.instructions
}

const renderIngredientList = (recipeId) => {
    if (!recipeId) {
        return
    }
    const { ingredients, id } = findRecipe(recipeId)
    const ingredientsListEl = document.querySelector('#ingredients-list')

    ingredientsListEl.innerHTML = ''

    ingredients.forEach((ingredient) => {
        const ingredientContainerEl = document.createElement('label')
        ingredientContainerEl.classList.add('list-ingredient')
        const nameBoxEl = document.createElement('div')
        nameBoxEl.classList.add('list-ingredient__container')
        const checkBoxEl = document.createElement('input')
        const ingredientEl = document.createElement('span')
        const removeBtnEl = document.createElement('button')

        checkBoxEl.setAttribute('type', 'checkbox')
        checkBoxEl.checked = ingredient.inStock
        checkBoxEl.addEventListener('change', () => {
            toggleIngredient(id, ingredient.name)
        })
        nameBoxEl.appendChild(checkBoxEl)

        ingredientEl.textContent = ingredient.name
        nameBoxEl.appendChild(ingredientEl)

        ingredientContainerEl.appendChild(nameBoxEl)

        removeBtnEl.textContent = 'remove'
        removeBtnEl.classList.add('button', 'button--text')
        removeBtnEl.addEventListener('click', () => {
            removeIngredient(id, ingredient.name)
            renderIngredientList(recipeId)
        })
        ingredientContainerEl.appendChild(removeBtnEl)

        ingredientsListEl.appendChild(ingredientContainerEl)
    })
}

export { renderRecipes, initialiseDisplayPage, initialiseEditPage, renderIngredientList, renderIngredientsFilter }