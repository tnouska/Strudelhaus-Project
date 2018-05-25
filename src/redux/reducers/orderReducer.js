const order = ( state = [], action) => {
    switch(action.type) {
        case 'FETCH_ORDER':
        return action.payload
        default:
        return state;
    }
}

export default order;