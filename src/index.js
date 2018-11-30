import { setFilters, getFilters } from './filters'
import { renderRecipes } from './views'
import { createRecipe } from './recipes'

renderRecipes()

console.log(document.querySelector('#create-recipe'))
document.querySelector('#create-recipe').addEventListener('click', (e) => {
    createRecipe()
    renderRecipes()
})

document.querySelector('#search-text').addEventListener('input', (e) => {
    setFilters({
        searchText: e.target.value
    })
    renderRecipes()
})


