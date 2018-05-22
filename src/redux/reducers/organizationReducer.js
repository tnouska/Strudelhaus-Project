const organization = ( state = [], action) => {
    switch(action.type) {
        case 'FETCH_ORGANIZATION':
        console.log('organizationReducer:', action.payload);
        return action.payload
        default:
        return state;
    }
}

export default organization;