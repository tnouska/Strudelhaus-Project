import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* createOrder() {
    yield takeEvery('CURRENT_ORDER', currentOrder);
}

function* currentOrder(action){
    try {
        yield put({
            type: 'ORDER_VIEW',
            payload: action.payload
        })
    } catch (error) {}
    
}

export default createOrder;