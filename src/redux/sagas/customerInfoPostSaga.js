import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* customerInfoPostSaga() {
    yield takeEvery('POST_CUSTINFO', customerInfoPost)
   
}

function* customerInfoPost(action) {
    console.log('post customer info', action);
    try{
        const postTransaction = yield call(axios.post, `/api/payment/customerinfo`, action.payload);
        yield call(axios.post, `/api/payment/postcustomer`)
        console.log(postTransaction.data)
        yield put({
            type: 'PAYMENT_VIEW',
            payload: postTransaction.data
        })
    } catch (error) {
        console.log('error ing POST customerinfo:', error);
    }
}

export default customerInfoPostSaga;