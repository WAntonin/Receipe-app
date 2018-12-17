const filters = {
    searchText: '',
    myIngredients: []
}

const getFilters = () => filters

const setFilters = ({ searchText, myIngredients }) => {
    if (typeof searchText === 'string') {
        filters.searchText = searchText
    }
    if (typeof myIngredients === 'string') {
        filters.myIngredients.push(myIngredients)
    }
    if (Array.isArray(myIngredients)) {
        filters.myIngredients = filters.myIngredients.concat(myIngredients)
    }
    filters.myIngredients = filters.myIngredients.filter((ingredient, index) => filters.myIngredients.indexOf(ingredient) === index)
}

const unsetFilters = ({ myIngredients }) => {

    if (typeof myIngredients === 'string') {
        const myIngredientsIndex = filters.myIngredients.findIndex((ingredient) => ingredient === myIngredients)
        if (myIngredientsIndex > -1) {
            filters.myIngredients.splice(myIngredientsIndex, 1)
        }
    }
}

export {
    getFilters,
    setFilters,
    unsetFilters
}
