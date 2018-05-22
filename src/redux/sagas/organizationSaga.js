import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* getOrganization(action) {
    console.log('getOrganization:', action);
    try{
        const organizationResponse = yield call(axios.get, `/api/`)
    }
}