const recipes = [{
    id: uuidv4(),
    name: 'poulet frittes',
    instructions: 'step1 , step2'
},
{
    id: uuidv4(),
    name: 'rôti',
    instructions: 'step1 , step2'
}]

const getRecipes = () => recipes

export { getRecipes }