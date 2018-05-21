import React from 'react';
import { Link } from 'react-router-dom';

const AdminNav = () => (
  <div className="navbar">
    <div>
      <ul>
        <li>
            <Link to="/pipeline">Pipeline</Link>
        </li>
        <li>
            <Link to="/organizations">Organizations</Link>
        </li>
        <li>
            <Link to="/campaigns">Campaigns</Link>
        </li>
        <li>
            <Link to="/products">Products</Link>
        </li>
      </ul>
    </div>
  </div>
);

export default AdminNav;