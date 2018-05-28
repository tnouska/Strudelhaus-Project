import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Header from './components/Header/Header';
import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import Organizations from './components/Base Structure/Admin/Organizations/Organizations';
import Campaigns from './components/Base Structure/Admin/Campaigns/Campaigns';
import Products from './components/Base Structure/Admin/Products/Products';
import Pipeline from './components/Base Structure/Admin/Pipeline/Pipeline';
import Performance from './components/Base Structure/OrgLeader/Performance/Performance';
import Orders from './components/Base Structure/OrgLeader/Orders/Orders';
import Account from './components/Base Structure/OrgLeader/Account/Account';
import FundraiserPortal from './components/Base Structure/Customer/FundraiserPortal/FundraiserPortal';
import SquareForm from './components/Base Structure/Customer/SquareForm/SquareForm';

import './styles/main.css';


const App = () => (
  <div>
    <Router>
      <Switch>
        <Redirect exact from="/" to="/home" />
        <Route path="/home" component={LoginPage}/>
        <Route path="/register" component={RegisterPage}/>
        <Route path="/organizations" component={Organizations}/>
        <Route path="/campaigns" component={Campaigns}/>
        <Route path="/products" component={Products}/>
        <Route path="/pipeline" component={Pipeline}/>
        <Route path="/performance" component={Performance}/>
        <Route path="/orders" component={Orders}/>
        <Route path="/account" component={Account}/>
        <Route path="/fundraiser/:name" component={FundraiserPortal}/>
        <Route path="/squreform" component={SquareForm}/>
        {/* OTHERWISE (no path!) */}
        <Route render={() => <h1>404</h1>} />

      </Switch>
    </Router>
  </div>
);

export default App;
