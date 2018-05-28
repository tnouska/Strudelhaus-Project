const campaign = ( state = [], action ) => {
    switch(action.type) {
        case 'FETCH_CAMPAIGN':
        return action.payload
        default:
        return state;
    }
}
export default campaign;