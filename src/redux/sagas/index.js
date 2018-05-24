import { all } from 'redux-saga/effects';
import userSaga from './userSaga';
import loginSaga from './loginSaga';
import pipelineSaga from './pipelineSaga';
import organizationSaga from './organizationSaga';
import campaignSaga from './campaignSaga';
import productSaga from './productSaga';
import orgLeaderOrderSaga from './orgLeaderOrderSaga';
import currentOrder from './currentOrder';
import customerProductsSaga from './customerProducts';
import orgLeaderPerformanceSaga from './orgLeaderPerformanceSaga'
import currentCustomerInfoSaga from './currentCustomerInfoSaga';
import customerInfoPostSaga from './customerInfoPostSaga';

export default function* rootSaga() {
  yield all([
    userSaga(),
    loginSaga(),
    productSaga(),
    campaignSaga(),
    pipelineSaga(),
    organizationSaga(),
    orgLeaderOrderSaga(),
    currentOrder(),
    customerProductsSaga(),
    orgLeaderPerformanceSaga(),
    currentCustomerInfoSaga(),
    customerInfoPostSaga()

    // watchIncrementAsync()
  ]);
}
