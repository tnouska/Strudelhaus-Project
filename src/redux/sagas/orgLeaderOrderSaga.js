import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* orgLeaderOrderSaga() {
    yield takeEvery('GET_ORDER', getOrgLeaderOrder)
    yield takeEvery('CREATE_ORDER', createOrder)
    yield takeEvery('DELETE_ORDER', deleteOrder)
}

function * getOrgLeaderOrder(action) {
    console.log('action.payload',action.payload);
    
    try{
        const orgLeaderOrderResponse = yield call(axios.get, `/orgleader/order/${action.payload}`);
        yield put({
            type: 'FETCH_ORDER',
            payload: orgLeaderOrderResponse.data,
        })
    } catch (error) {
        console.log('error in getOrgLeaderOrder', error);
    }
}

function * deleteOrder(action){
    console.log('action.payload',action.payload);
    
    try {
        yield call(axios.delete, `/orgleader/order/${action.payload.customer_id}`)
        yield put({
            type: 'GET_ORDER',
            payload: action.payload.id
        })
    } catch (error) {
        console.log('error in deleteOrder saga: ',error);
    }
}

function * createOrder(action) {
    const config = {
        headers: {'Content-Type': 'application/json'},
        withCredentials: true,
    }    
    try{
        if (action.payload.csvOrders) {
            yield call(axios.post, `/orgleader/order`, action.payload.csvOrders, config);
            yield put({
                type: 'GET_ORDER',
                payload: action.payload.csvOrders[0].campaign_id
            })
        } else {

            let newOrderArray = []
            newOrderArray.push(action.payload.newOrder)
            yield call(axios.post, `/orgleader/order`, newOrderArray, config)
            yield put({
                type: 'GET_ORDER',
                payload: action.payload.newOrder.campaign_id
            })
        }
    } catch (error) {
        console.log('error ing POST createOrder:', error);
    }
}

export default orgLeaderOrderSaga;