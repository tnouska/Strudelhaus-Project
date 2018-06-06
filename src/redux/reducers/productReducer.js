const product = ( state = [], action) => {
    switch(action.type) {
        case 'FETCH_PRODUCT':
        return action.payload
        default:
        return state;
    }
}

export default product;