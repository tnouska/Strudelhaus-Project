import { combineReducers } from 'redux';
import user from './userReducer';
import login from './loginReducer';
import pipeline from './pipelineReducer';
import organization from './organizationReducer';
import campaign from './campaignReducer';

const store = combineReducers({
  user,
  login,
  campaign,
  pipeline,
  organization,
});

export default store;
