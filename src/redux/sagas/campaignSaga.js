import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* campaignSaga() {
    yield takeEvery('GET_CAMPAIGN', getCampaign)
}

function* getCampaign(action) {
    console.log('getCampaign triggered:', action);
    try {
        const campaignResponse = yield call(axios.get, `/admin/campaign`);
        console.log('campaignResponse:', campaignResponse);
        yield put({
            type: 'FETCH_CAMPAIGN',
            payload: campaignResponse.data,
        })
    } catch (error) {
        console.log('error in getCampaign:', error);
    }
}

export default campaignSaga;

