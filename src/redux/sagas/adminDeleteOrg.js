import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* adminDeleteOrgSaga() {
    yield takeEvery('DELETE_ORGANIZATION', deleteOrganization)
}

function* deleteOrganization(action) {
    console.log('deleteOraganization triggered:', action);
    const config = {
        headers: {'Content-Type': 'application/json'},
        withCredentials: true,
    } 
    try{
        yield call(axios.delete, `/admin/organization/${action.payload.id}`, config);
        yield put({
            type: 'GET_ORGANIZATION',
        })
    } catch (error) {
        console.log('error in deleteOrganization:', error);

    }
}

export default adminDeleteOrgSaga;