import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* adminDeleteCampSaga(){
    yield takeEvery('DELETE_CAMPAIGN', deleteCampaign)
}

function* deleteCampaign(action) {
    console.log('deleteCampaign triggered:', action);
    const config = {
        headers: {'Content-Type': 'application/json'},
        withCredentials: true,
    } 
    try{
        yield call(axios.delete, `/admin/campaign/${action.payload.campign.id}`, config);
        yield put({
            type: 'GET_CAMPAIGN',
        })
    } catch (error) {
        console.log('error in deleteCampaign:', error);
    }
}

export default adminDeleteCampSaga;