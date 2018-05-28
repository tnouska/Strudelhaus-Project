const pipeline = ( state = [], action) => {
    switch(action.type) {
        case 'FETCH_PIPELINE':
        return action.payload
        default:
        return state;
    }
}

export default pipeline;