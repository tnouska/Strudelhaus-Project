import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const OrgLeaderNav = () => (
  <div className="navbar">
    <img src="http://www.thestrudelhaus.net/uploads/2/1/8/6/21866322/favicon.png" className="navImage"/>
    <div>
      <ul>
        <li>
            <Link to="/performance"><Button className="navButton">PERFORMANCE</Button></Link>
        </li>
        <li>
            <Link to="/orders"><Button className="navButton">ORDERS</Button></Link>
        </li>
        <li>
            <Link to="/account"><Button className="navButton">ACCOUNT</Button></Link>
        </li>
      </ul>
    </div>
  </div>
);

export default OrgLeaderNav;