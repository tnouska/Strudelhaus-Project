import { all } from 'redux-saga/effects';
import userSaga from './userSaga';
import loginSaga from './loginSaga';
import pipelineSaga from './pipelineSaga';


export default function* rootSaga() {
  yield all([
    userSaga(),
    loginSaga(),
    pipelineSaga(),
    // watchIncrementAsync()
  ]);
}
