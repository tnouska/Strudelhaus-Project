const allProducts = (state = [{value: '',label: ''}], action) => {
    switch (action.type) {
        case 'FETCH_ALL_PRODUCTS': 
            return action.payload;
        default:
            return state;
    }
}

export default allProducts;