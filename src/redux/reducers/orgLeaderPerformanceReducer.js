const orgLeaderPerformance = (state = [{campaign_id: '', campaign_name: '',
                                date_end:'', date_start: '', goal: '', id: '', orderList: []}],action) => {
    switch (action.type) {
        case 'FETCH_ORDER':
            return action.payload;
        default:
            return state;
    }//end switch statement
};//end orgLeaderPerformance

export default orgLeaderPerformance