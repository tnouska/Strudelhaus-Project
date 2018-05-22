import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* organizationSaga() {
    yield takeEvery('GET_ORGANIZATION', getOrganization)
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

export default organizationSaga;