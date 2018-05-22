import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* addProduct() {
    yield takeEvery('ADD_PRODUCT', createProduct)
}

function* createProduct(action) {
    console.log('createProduct triggered:', action);
    const config = {
        headers: {'Content-Type': 'application/json'},
        withCredentials: true,
    } 
    try {
        yield call(axios.post, `/admin/organization`, action.payload, config);
        yield put({
            type: 'GET_PIPELINE'
        })
    } catch (error) {
        console.log('error in POST createProduct:', error);
    }
} 

export default addProduct;

