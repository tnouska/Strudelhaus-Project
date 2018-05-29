import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Header from './components/Header/Header';
import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import Organizations from './components/BaseStructure/Admin/Organizations/Organizations';
import Campaigns from './components/BaseStructure/Admin/Campaigns/Campaigns';
import Products from './components/BaseStructure/Admin/Products/Products';
import Pipeline from './components/BaseStructure/Admin/Pipeline/Pipeline';
import Performance from './components/BaseStructure/OrgLeader/Performance/Performance';
import Orders from './components/BaseStructure/OrgLeader/Orders/Orders';
import Account from './components/BaseStructure/OrgLeader/Account/Account';
import FundraiserPortal from './components/BaseStructure/Customer/FundraiserPortal/FundraiserPortal';
import SquareForm from './components/BaseStructure/Customer/SquareForm/SquareForm';
import ThankYou from './components/BaseStructure/Customer/ThankYou/ThankYou'
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
        <Route path="/thankyou" component={ThankYou}/>
        {/* OTHERWISE (no path!) */}
        <Route render={() => <h1>404</h1>} />

      </Switch>
    </Router>
  </div>
);

export default App;
