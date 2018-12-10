import { initialiseDisplayPage } from './views';


const recipeId = location.hash.substring(1)

initialiseDisplayPage(recipeId)

window.addEventListener('sotrage', (e) => {
    if (e.key === 'recipes') {
        initialiseDisplayPage(recipeId)
    }
})