const ingredients = [{
    name: 'poulet',
    inStore: true
}, {
    name: 'rôti',
    inStore: false
}]

const getIngredients = () => ingredients

// const saveIngredients = () => {
//     localStorage.setItem('recipes', JSON.stringify(recipes))
// }

export { getIngredients }