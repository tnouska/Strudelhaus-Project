import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* pipelineSaga() {
    yield takeEvery('GET_PIPELINE', getPipeline)
}

function* getPipeline(action) {
    const config ={
        headers: {'Content-Type': 'application/json'},
        withCredentials: true,
    }
    try{
        const pipelineResponse = yield call(axios.get, `/admin/pipeline`, config);
        yield put({
            type: 'FETCH_PIPELINE',
            payload: pipelineResponse.data,
        })
    } catch (error) {
        console.log('error in getPipeline:', error);
    }
}

export default pipelineSaga;