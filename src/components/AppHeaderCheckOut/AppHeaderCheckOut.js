import React from "react";
import { NavLink } from "react-router-dom";

import "./AppHeaderCheckOut.scss";

function AppHeaderCheckOut({ ...props }) {
  return (
    <header className="bg-primary mb-4" {...props}>
      <div className="container-fluid">
        <div className="row">
          <nav className="navbar navbar-expand navbar-dark">
            {/* <NavLink
              exact
              activeClassName="active"
              className="navbar-brand"
              to="/"
            >
              Personal Detail
            </NavLink> */}

            <ul className="navbar-nav mr-auto navbar-checkout">
              <li className="nav-item">
                <NavLink
                  exact
                  activeClassName="active"
                  className="nav-link"
                  to="/checkout"
                >
                  Personal Detail
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  exact
                  activeClassName="active"
                  className="nav-link"
                  to="/checkout"
                >
                  Billind Address
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  exact
                  activeClassName="active"
                  className="nav-link"
                  to="/checkout"
                >
                  Payment Detail
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  exact
                  activeClassName="active"
                  className="nav-link"
                  to="/checkout"
                >
                  Order Confirmed
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default AppHeaderCheckOut;
