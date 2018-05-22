import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* addCampaign() {
    yield takeEvery('ADD_CAMPAIGN', createCampaign)
}

function* createCampaign(action) {
    console.log('createCampign triggered:', action);
    const config = {
        headers: {'Content-Type': 'application/json'},
        withCredentials: true,
    }
    try{
        yield call(axios.post, `/admin/organization`, action.payload, config);
        yield put({
            type: 'GET_CAMPAIGN'
        })
    } catch (error) {
        console.log('error in POST createCampaign', error);
    }
}

export default addCampaign;