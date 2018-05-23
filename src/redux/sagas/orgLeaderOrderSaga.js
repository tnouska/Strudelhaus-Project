import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* orgLeaderOrderSaga() {
    yield takeEvery('GET_ORDER', getOrgLeaderOrder)
}

function* getOrgLeaderOrder(action) {
    console.log('getOrgLeaderOrder triggered:', action);
    try{
        const orgLeaderOrderResponse = yield call(axios.get, `/orgleader/order/${action.payload.id}`);
        console.log(orgLeaderOrderResponse);
        yield put({
            type: 'FETCH_ORDER',
            payload: orgLeaderOrderResponse.data,
        })
    } catch (error) {
        console.log('error in getOrgLeaderOrder', error);
    }
}

export default orgLeaderOrderSaga;