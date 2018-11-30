import { initialiseDisplayPage } from './views';


const recipeId = location.hash.substring(1)

initialiseDisplayPage(recipeId)