import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* productSaga() {
    yield takeEvery('GET_PRODUCT', getProduct),
    yield takeEvery('ADD_PRODUCT', createProduct)
}

function* getProduct(action) {
    console.log('getProduct triggered:', action);
    try {
        const productResponse = yield call(axios.get, `/admin/product`);
        console.log('productResponse:', productResponse);
        yield put({
            type: 'FETCH_PRODUCT',
            payload: productResponse.data,
        })
    } catch (error) {
        console.log('error in getProduct:', error);
    }
}

function* createProduct(action) {
    console.log('createProduct triggered:', action);
    const config = {
        headers: {'Content-Type': 'application/json'},
        withCredentials: true,
    } 
    try {
        yield call(axios.post, `/admin/product`, action.payload, config);
        yield put({
            type: 'GET_PRODUCT'
        })
    } catch (error) {
        console.log('error in POST createProduct:', error);
    }
} 

export default productSaga;