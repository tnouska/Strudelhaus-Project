const customerProducts = ( state = [], action) => {
    switch(action.type) {
        case 'CUSTOMER_PRODUCTS':
        console.log('action.payload:', action.payload);
        return action.payload
        default:
        return state;
    }
}

export default customerProducts;