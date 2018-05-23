import { all } from 'redux-saga/effects';
import userSaga from './userSaga';
import loginSaga from './loginSaga';
import pipelineSaga from './pipelineSaga';
import organizationSaga from './organizationSaga';
import addOrganizationSaga from './createOrganizationSaga';
import addCampaign from './createCampaignSaga';
import addProduct from './createProductSaga';
import campaignSaga from './campaignSaga';
import productSaga from './productSaga';
import orgLeaderOrderSaga from './orgLeaderOrderSaga';
import adminDeleteOrgSaga from './adminDeleteOrg';
import currentOrder from './currentOrder';


export default function* rootSaga() {
  yield all([
    userSaga(),
    loginSaga(),
    addProduct(),
    productSaga(),
    addCampaign(),
    campaignSaga(),
    pipelineSaga(),
    organizationSaga(),
    adminDeleteOrgSaga(),
    orgLeaderOrderSaga(),
    adminDeleteCampSaga(),
    addOrganizationSaga(),
    currentOrder()
    // watchIncrementAsync()
  ]);
}
