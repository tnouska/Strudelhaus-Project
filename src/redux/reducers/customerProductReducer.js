const customerProducts = ( state = [], action) => {
    switch(action.type) {
        case 'CUSTOMER_PRODUCTS':
        return action.payload
        default:
        return state;
    }
}

export default customerProducts;