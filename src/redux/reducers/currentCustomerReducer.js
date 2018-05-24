const customerInfo = ( state = [], action) => {
    switch(action.type) {
        case 'CURRENT_CUSTOMER':
        return action.payload
        default:
        return state;
    }
}

export default customerInfo;