let moment = require('moment');


const order = ( state = [], action) => {
    switch(action.type) {
        case 'FETCH_ORDER':
        for (let i = 0; i < action.payload.length; i++) {
            action.payload[i].date_of_order = moment(action.payload[i].date_of_order).format("MM-DD-YY")
        }
        return action.payload
        default:
        return state;
    }
}

export default order;