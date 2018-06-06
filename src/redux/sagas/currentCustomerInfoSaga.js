import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* currentCustomerInfoSaga() {
    yield takeEvery('CURRENT_CUSTOMERINFO', currentCustomerInfo);
}

function* currentCustomerInfo(action){
    try {
        yield put({
            type: 'CURRENT_CUSTOMER',
            payload: action.payload
        })
    } catch (error) {}
    
}

export default currentCustomerInfoSaga;