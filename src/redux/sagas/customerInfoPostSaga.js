import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* customerInfoPostSaga() {
    yield takeEvery('POST_CUSTINFO', customerInfoPost)
   
}

function* customerInfoPost(action) {
    try{
        const squareInfo = yield call(axios.post, `/api/payment/squareInfo`, action.payload);
        const postTransaction = yield call(axios.post, `/api/payment/customerinfo`, action.payload);
        
        if(typeof postTransaction.data.errors == 'object'){
            postTransaction.data = false
        }
        yield put({
            type: 'PAYMENT_VIEW',
            payload: postTransaction.data
        })
        yield call(axios.post, `/api/payment/postcustomer`);
    } catch (error) {
        console.log('error ing POST customerinfo:', error);
        let catchError = false
        yield put({
            type: 'PAYMENT_VIEW',
            payload: catchError
        })
    } 
}

export default customerInfoPostSaga;