const organization = ( state = [], action) => {
    switch(action.type) {
        case 'FETCH_ORGANIZATION':
        return action.payload
        default:
        return state;
    }
}

export default organization;