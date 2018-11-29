const filters = {
    searchText: ''
}

const getFilters = () => filters

const setFilters = ({ searchText }) => {
    if (typeof searchText === 'string') {
        filters.searchText = searchText
        console.log(filters)
    }
}

export { getFilters, setFilters }