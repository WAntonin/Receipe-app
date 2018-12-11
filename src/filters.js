class Filter {
    constructor(text = '', ingredient = []) {
        this.searchText = text.toLowerCase().trim()
        this.myIngredients = ingredient
    }
    getFilters() {
        return this
    }
    setFilters({ text, ingredient }) {
        if (typeof searchText === 'string') {
            this.searchText = text
        }
        if (typeof myIngredients === 'string') {
            this.myIngredients.push(ingredient)
        }
    }
    unsetFilters({ removeIngredient }){

        if (typeof myIngredients === 'string') {
            const removeIngredientIndex = this.myIngredients.findIndex((ingredient) => ingredient === removeIngredient)
            if (removeIngredientIndex > -1) {
                this.myIngredients.splice(removeIngredientIndex, 1)
            }
        }
    }
}

export {Filter}
// const filters = {
//     searchText: '',
//     myIngredients: []
// }

// const getFilters = () => filters

// const setFilters = ({ searchText, myIngredients }) => {
//     if (typeof searchText === 'string') {
//         filters.searchText = searchText
//     }
//     if (typeof myIngredients === 'string') {
//         filters.myIngredients.push(myIngredients)
//     }
// }

// const unsetFilters = ({ myIngredients }) => {

//     if (typeof myIngredients === 'string') {
//         const myIngredientsIndex = filters.myIngredients.findIndex((ingredient) => ingredient === myIngredients)
//         if (myIngredientsIndex > -1) {
//             filters.myIngredients.splice(myIngredientsIndex, 1)
//         }
//     }
// }

// export {
//     getFilters,
//     setFilters,
//     unsetFilters
// }
