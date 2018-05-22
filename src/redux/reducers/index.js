import { combineReducers } from 'redux';
import user from './userReducer';
import login from './loginReducer';
import pipeline from './pipelineReducer';

const store = combineReducers({
  user,
  login,
  pipeline,
});

export default store;
