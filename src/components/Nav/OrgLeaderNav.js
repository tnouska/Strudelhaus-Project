import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const OrgLeaderNav = () => (
  <div className="navbar">
    <img src="http://www.thestrudelhaus.net/uploads/2/1/8/6/21866322/favicon.png" className="navImage" />
    <div>
      <ul>
        <li>
          <NavLink to="/performance" activeClassName="selected">PERFORMANCE</NavLink>
        </li>
        <li>
          <NavLink to="/orders" activeClassName="selected">ORDERS</NavLink>
        </li>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <li>
          <NavLink to="/home">Log Out</NavLink>
        </li>
      </ul>
    </div>
  </div>
);

export default OrgLeaderNav;