import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* organizationSaga() {
    yield takeEvery('GET_ALL_PRODUCTS', getAllProducts)
    yield takeEvery('GET_ORGANIZATION', getOrganization),
    yield takeEvery('ADD_ORGANIZATION', createOrganization),
    yield takeEvery('DELETE_ORGANIZATION', deleteOrganization)
}

function* getAllProducts(action) {
    try {
        const allProductsResponse = yield call(axios.get, `/admin/campaign/allproducts`)
        yield put({
            type: 'FETCH_ALL_PRODUCTS',
            payload: allProductsResponse.data
        })
    } catch (error) {
        console.log('error in getAllProducts: ',error);
    }
}

function* getOrganization(action) {
    console.log('getOrganization:', action);
    try{
        const organizationResponse = yield call(axios.get, `/admin/organization`);
        console.log('organizationResponse:', organizationResponse);
        yield put({
            type: 'FETCH_ORGANIZATION',
            payload: organizationResponse.data,
        })
    } catch (error) {
        console.log('erroring getOrganization:', error);
    }
}

function* createOrganization(action) {
    console.log('createOrganization:', action);
    const config = {
        headers: {'Content-Type': 'application/json'},
        withCredentials: true,
    }
    try{
        yield call(axios.post, `/admin/organization`, action.payload, config);
        yield put({
            type: 'GET_ORGANIZATION'
        })
    } catch (error) {
        console.log('error ing POST createOrganization:', error);
    }
}

function* deleteOrganization(action) {
    console.log('deleteOraganization triggered:', action);
    const config = {
        headers: {'Content-Type': 'application/json'},
        withCredentials: true,
    } 
    try{
        yield call(axios.delete, `/admin/organization/${action.payload.organization_id}`, config);
        yield put({
            type: 'GET_ORGANIZATION',
        })
    } catch (error) {
        console.log('error in deleteOrganization:', error);

    }
}

export default organizationSaga;