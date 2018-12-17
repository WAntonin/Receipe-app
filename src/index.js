import { setFilters } from './filters'
import { renderRecipes, renderIngredientsFilter } from './views'
import { createRecipe } from './recipes'

renderIngredientsFilter()
renderRecipes()


document.querySelector('#create-recipe').addEventListener('click', () => {
    let id = createRecipe()
    location.assign(`/edit.html#${id}`)
})

document.querySelector('#search-text').addEventListener('input', (e) => {
    setFilters({
        searchText: e.target.value
    })
    renderRecipes()
})

window.addEventListener('storage', (e) => {
    if (e.key === 'recipes') {
        console.log('Storage modification detected')
        renderRecipes()
        renderIngredientsFilter()
    }
})