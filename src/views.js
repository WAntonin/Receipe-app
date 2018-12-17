import { getRecipes,
    toggleIngredient,
    removeIngredient,
    getAllIngredients,
    getIngredientsInStock,
    refreshIngredientStock,
    findRecipe,
    ingredientsInStock
} from './recipes'

import { getFilters, 
    setFilters,
    unsetFilters
} from './filters'

const generateRecipeDOM = (recipe) => {
    const recipeEl = document.createElement('a')
    const titleEl = document.createElement('p')
    titleEl.classList.add('list-item__title')
    const stockEl = document.createElement('p')
    stockEl.classList.add('list-item__subtitle')

    if (recipe.title.length > 0) {
        const numberOfIngredients = ingredientsInStock(recipe)
        titleEl.textContent = recipe.title
        stockEl.textContent = `You have ${numberOfIngredients} of this recipe`
    } else {
        titleEl.textContent = 'Unamed recipe'
    }

    recipeEl.setAttribute('href', `/display.html#${recipe.id}`)
    recipeEl.appendChild(titleEl)
    recipeEl.appendChild(stockEl)
    recipeEl.classList.add('list-item')
    return recipeEl
}

const renderRecipes = () => {
    console.log('renderRecipe')
    const recipes = getRecipes()
    console.log(recipes)
    const { searchText, myIngredients } = getFilters()
    const recipesEl = document.querySelector('#recipes')

    let filteredRecipes = recipes.filter((recipe) => recipe.title.toLowerCase().includes(searchText.toLowerCase()))
    if (myIngredients.length > 0) {
        
        filteredRecipes = filteredRecipes.filter((recipe) => {
            if (ingredientsInStock(recipe) > 0) {
                return true
            } else {
                return false
            }
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
    console.log('renderIngredientsFilter')
    const availableIngredientsEl = document.querySelector('#available-ingredients')
    const filterIngredientsEl = document.querySelector('#filter-ingredients')
    
    setFilters({
        myIngredients: getIngredientsInStock()
    })
    let {myIngredients} = getFilters()
    console.log('ingredient filter', myIngredients)
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
            refreshIngredientStock(myIngredients)
            renderRecipes()
            renderIngredientsFilter()
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
            refreshIngredientStock(myIngredients)
            renderIngredientsFilter()
            renderRecipes()
        })
        availableIngredientsEl.appendChild(ingredientEl)
    })
}

const initialiseDisplayPage = (recipeId) => {
    const titleEl = document.querySelector('#recipe-title')
    const instructionsEl = document.querySelector('#instruction-display')
    const ingredientListEl = document.querySelector('#ingredients-display')
    const editRecipeEl = document.querySelector('#edit-recipe')
    const recipe = findRecipe(recipeId)

    editRecipeEl.addEventListener('click', () => {
        location.assign(`/edit.html#${recipeId}`)
    })

    titleEl.textContent = recipe.title
    instructionsEl.textContent = recipe.instructions

    recipe.ingredients.forEach((ingredient) => {
        const ingredientContainerEl = document.createElement('label')
        ingredientContainerEl.classList.add('list-ingredient')
        const nameBoxEl = document.createElement('div')
        nameBoxEl.classList.add('list-ingredient__container')
        const checkBoxEl = document.createElement('input')
        const ingredientEl = document.createElement('span')

        checkBoxEl.setAttribute('type', 'checkbox')
        checkBoxEl.checked = ingredient.inStock
        checkBoxEl.addEventListener('change', () => {
            toggleIngredient(recipeId, ingredient.name)
        })
        nameBoxEl.appendChild(checkBoxEl)

        ingredientEl.textContent = ingredient.name
        nameBoxEl.appendChild(ingredientEl)

        ingredientContainerEl.appendChild(nameBoxEl)
        ingredientListEl.appendChild(ingredientContainerEl)
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
    const ingredientListEl = document.querySelector('#ingredients-list')

    document.querySelector('#add-ingredient').reset()
    ingredientListEl.innerHTML = ''

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

        ingredientListEl.appendChild(ingredientContainerEl)
    })
}

export { renderRecipes, initialiseDisplayPage, initialiseEditPage, renderIngredientList, renderIngredientsFilter }