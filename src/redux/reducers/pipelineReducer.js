const pipeline = ( state = [], action) => {
    switch(action.type) {
        case 'FETCH_PIPELINE':
        console.log('fetch pipeline:', action.payload);
        return action.payload
        default:
        return state;
    }
}

export default pipeline;