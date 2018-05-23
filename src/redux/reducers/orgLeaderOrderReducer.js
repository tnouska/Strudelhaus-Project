const order = ( state = [], action) => {
    switch(action.type) {
        case 'FETCH_ORDER':
        console.log('orgLeaderOrder:', action.payload);
        return action.payload
        default:
        return state;
    }
}

export default order;