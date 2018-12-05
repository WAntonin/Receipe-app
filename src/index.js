import { setFilters, getFilters } from './filters'
import { renderRecipes, renderIngredientsFilter } from './views'
import { createRecipe } from './recipes'

renderRecipes()
renderIngredientsFilter()

document.querySelector('#create-recipe').addEventListener('click', () => {
    location.assign('/edit.html')
})

document.querySelector('#search-text').addEventListener('input', (e) => {
    setFilters({
        searchText: e.target.value
    })
    renderRecipes()
})

window.addEventListener('sotrage', (e) => {
    if (e.key === 'recipes') {
        renderRecipes()
    }
})