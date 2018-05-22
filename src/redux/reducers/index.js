import { combineReducers } from 'redux';
import user from './userReducer';
import login from './loginReducer';
import pipeline from './pipelineReducer';
import organization from './organizationReducer';

const store = combineReducers({
  user,
  login,
  pipeline,
  organization,
});

export default store;
