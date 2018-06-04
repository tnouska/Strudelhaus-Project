import React from 'react';
import { NavLink } from 'react-router-dom';


const AdminNav = () => (
    <div className="navbar">
        <img src="http://www.thestrudelhaus.net/uploads/2/1/8/6/21866322/favicon.png" className="navImage" />
        <div>
            <ul>
                <li>
                    <NavLink to="/pipeline" activeClassName="selected">PIPELINE</NavLink>
                </li>
                <li>
                    <NavLink to="/organizations" activeClassName="selected">ORGANIZATIONS</NavLink>
                </li>
                <li>
                    <NavLink to="/campaigns" activeClassName="selected">CAMPAIGNS</NavLink>
                </li>
                <li>
                    <NavLink to="/products" activeClassName="selected">PRODUCTS</NavLink>
                </li>
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

export default AdminNav;