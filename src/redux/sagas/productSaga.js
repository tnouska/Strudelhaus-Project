import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* productSaga() {
    yield takeEvery('GET_PRODUCT', getProduct)
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

export default productSaga;