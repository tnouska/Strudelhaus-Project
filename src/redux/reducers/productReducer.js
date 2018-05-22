const product = ( state = [], action) => {
    switch(action.type) {
        case 'FETCH_PRODUCT':
        console.log('action.payload:', action.payload);
        return action.payload
        default:
        return state;
    }
}

export default product;