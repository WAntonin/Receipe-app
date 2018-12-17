import { initialiseDisplayPage } from './views';


const recipeId = location.hash.substring(1)

initialiseDisplayPage(recipeId)

window.addEventListener('storage', (e) => {
    if (e.key === 'recipes') {
        initialiseDisplayPage(recipeId)
    }
})