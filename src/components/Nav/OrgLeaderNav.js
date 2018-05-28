import React from 'react';
import { Link } from 'react-router-dom';

const OrgLeaderNav = () => (
  <div className="navbar">
    <img src="http://www.thestrudelhaus.net/uploads/2/1/8/6/21866322/favicon.png" className="navImage"/>
    <div>
      <ul>
        <li>
            <Link to="/performance">Performance</Link>
        </li>
        <li>
            <Link to="/orders">Orders</Link>
        </li>
        <li>
            <Link to="/account">Account</Link>
        </li>
      </ul>
    </div>
  </div>
);

export default OrgLeaderNav;