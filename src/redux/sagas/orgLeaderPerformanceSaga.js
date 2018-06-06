import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* getOrgLeaderPerformance(action){
    try {
        const performanceResult = yield axios.get(`/orgleader/performance/${action.payload.id}`)
        
        yield put({
            type: 'FETCH_PERFORMANCE',
            payload: performanceResult.data
        })
    } catch (error) {
        console.log('error in getOrgLeaderPerformance Saga');
    }
}


function* orgLeaderPerformanceSaga(){
    yield takeEvery('GET_PERFORMANCE', getOrgLeaderPerformance) 
}

export default orgLeaderPerformanceSaga