import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* customerInfoPostSaga() {
    yield takeEvery('POST_CUSTINFO', customerInfoPost)
   
}

function* customerInfoPost(action) {
    console.log('post customer info', action);
    try{
        const postTransaction = yield call(axios.post, `/api/payment/customerinfo`, action.payload);
        
        console.log(postTransaction.data)
        if(typeof postTransaction.data.errors == 'object'){
            postTransaction.data = false
        }
        yield put({
            type: 'PAYMENT_VIEW',
            payload: postTransaction.data
        })
        yield call(axios.post, `/api/payment/postcustomer`)
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