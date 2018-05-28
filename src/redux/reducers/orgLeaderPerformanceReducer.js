const orgLeaderPerformance = (state = [],action) => {
    switch (action.type) {
        case 'FETCH_PERFORMANCE':
            return action.payload;
        default:
            return state;
    }//end switch statement
};//end orgLeaderPerformance

export default orgLeaderPerformance