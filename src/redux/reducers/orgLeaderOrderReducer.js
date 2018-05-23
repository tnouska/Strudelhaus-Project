const orgLeaderOrder = ( state = [], action) => {
    switch(aciton.type) {
        case 'FETCH_EVENT':
        console.log('orgLeaderOrder:', action.payload);
        return action.payload
        default:
        return state;
    }
}

export default orgLeaderOrder;