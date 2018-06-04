import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav = () => (
  <div className="navbar">
    <div>
      <ul>
        <li>
          <NavLink to="/user" activeClassName="selected">
            User Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/info" activeClassName="selected">
            Info Page
          </NavLink>
        </li>
      </ul>
    </div>
  </div>
);

export default Nav;
