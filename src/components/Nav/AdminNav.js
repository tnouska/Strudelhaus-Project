import React from 'react';
import { Link } from 'react-router-dom';


const AdminNav = () => (
  <div className="navbar">
    <img src="http://www.thestrudelhaus.net/uploads/2/1/8/6/21866322/favicon.png" className="navImage"/>
    <div>
      <ul>
        <li>
            <Link to="/pipeline">PIPELINE</Link>
        </li>
        <li>
            <Link to="/organizations">ORGANIZATIONS</Link>
        </li>
        <li>
            <Link to="/campaigns">CAMPAIGNS</Link>
        </li>
        <li>
            <Link to="/products">PRODUCTS</Link>
        </li>
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

export default AdminNav;