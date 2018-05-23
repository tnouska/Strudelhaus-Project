import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* customerProductsSaga() {
    yield takeEvery('GET_CUSTOMERPRODUCTS', getCustomerProducts)
}

function* getCustomerProducts(action) {
    console.log('getcustomerproducts:', action.payload);
    try{
        const customerProductsResponse = yield call(axios.get, '/fundraiser/' + action.payload);
        console.log('customerproductsReducer:', customerProductsResponse);
        yield put({
            type: 'CUSTOMER_PRODUCTS',
            payload: customerProductsResponse.data,
        })
    } catch (error) {
        console.log('erroring getOrganization:', error);
    }
}

export default customerProductsSaga;