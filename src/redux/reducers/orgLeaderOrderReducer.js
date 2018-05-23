const orgLeaderOrder = ( state = [], action) => {
    switch(action.type) {
        case 'FETCH_EVENT':
        console.log('orgLeaderOrder:', action.payload);
        return action.payload
        default:
        return state;
    }
}

export default orgLeaderOrder;