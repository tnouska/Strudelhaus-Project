const orgLeaderPerformance = (state = [],action) => {
    switch (action.type) {
        case 'FETCH_ORDER':
            return action.payload;
        default:
            return state;
    }//end switch statement
};//end orgLeaderPerformance

export default orgLeaderPerformance