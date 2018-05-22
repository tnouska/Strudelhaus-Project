import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* addOrganizationSaga() {
    yield takeEvery('ADD_ORGANIZATION', createOrganization)
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

export default addOrganizationSaga;