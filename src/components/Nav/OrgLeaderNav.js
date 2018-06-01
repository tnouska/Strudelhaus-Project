import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const OrgLeaderNav = () => (
  <div className="navbar">
    <img src="http://www.thestrudelhaus.net/uploads/2/1/8/6/21866322/favicon.png" className="navImage"/>
    <div>
      <ul>
        <li>
            <Link to="/performance">PERFORMANCE</Link>
        </li>
        <li>
            <Link to="/orders">ORDERS</Link>
        </li>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <li>
        <Link to="/home">Log Out</Link>
         </li> 
      </ul>
    </div>
  </div>
);

export default OrgLeaderNav;