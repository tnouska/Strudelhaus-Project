const paymentView = ( state = [], action) => {
    switch(action.type) {
        case 'PAYMENT_VIEW':
        return action.payload
        default:
        return state;
    }
}

export default paymentView;