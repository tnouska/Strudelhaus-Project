import { combineReducers } from 'redux';
import user from './userReducer';
import login from './loginReducer';
import pipeline from './pipelineReducer';
import organization from './organizationReducer';
import campaign from './campaignReducer';
import product from './productReducer';
import order from './orderReducer';
import orderView from './orderViewReducer';
import customerProducts from './customerProductReducer';


const store = combineReducers({
  user,
  login,
  product,
  campaign,
  pipeline,
  organization,
  order,
  orderView,
  customerProducts
});

export default store;
