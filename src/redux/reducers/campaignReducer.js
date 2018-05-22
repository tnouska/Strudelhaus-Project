const campaign = ( state = [], action ) => {
    switch(action.type) {
        case 'FETCH_CAMPAIGN':
        console.log('campaign action.payload:', action.payload);
        return action.payload
        default:
        return state;
    }
}

export default campaign;