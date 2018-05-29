import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* orgLeaderOrderSaga() {
    yield takeEvery('GET_ORDER', getOrgLeaderOrder)
    yield takeEvery('CREATE_ORDER', createOrder)
}

function * getOrgLeaderOrder(action) {
    try{
        const orgLeaderOrderResponse = yield call(axios.get, `/orgleader/order/${action.payload.id}`);
        yield put({
            type: 'FETCH_ORDER',
            payload: orgLeaderOrderResponse.data,
        })
    } catch (error) {
        console.log('error in getOrgLeaderOrder', error);
    }
}

function * createOrder(action) {
    console.log('createOrder:', action);
    const config = {
        headers: {'Content-Type': 'application/json'},
        withCredentials: true,
    }
    try{
        yield call(axios.post, `/orgleader/order`, action.payload, config);
        yield put({
            type: 'GET_ORDER'
        })
    } catch (error) {
        console.log('error ing POST createOrder:', error);
    }
}

export default orgLeaderOrderSaga;