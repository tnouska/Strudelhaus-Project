import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* orgLeaderOrderSaga() {
    yield takeEvery('GET_ORGORDER', getOrgLeaderOrder)
}

function* getOrgLeaderOrder(action) {
    console.log('getOrgLeaderOrder triggered:', action);
    try{
        const orgLeaderOrderResponse = yield call(axios.get, `/orgleader/order`);
        console.log(orgLeaderOrderResponse);
        yield put({
            type: 'FETCH_ORGORDER',
            payload: orgLeaderOrderResponse.data,
        })
    } catch (error) {
        console.log('error in getOrgLeaderOrder', error);
    }
}

export default orgLeaderOrderSaga;