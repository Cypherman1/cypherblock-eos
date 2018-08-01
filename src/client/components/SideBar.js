import React from "react";
import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-container">
        <div className="sidebar-header">
          <div className="brand">
            <div className="logo">
              <span className="l l1" />
              <span className="l l2" />
              <span className="l l3" />
              <span className="l l4" />
              <span className="l l5" />
            </div>
            Cypherblock
          </div>
        </div>
        <nav className="menu">
          <ul className="sidebar-menu metismenu" id="sidebar-menu">
            <li>
              <Link to="/">
                <i className="fa fa-home" /> Dashboard
              </Link>
            </li>

            <li>
              <Link to="/account/cyphercrypto">
                <i className="fa fa-area-chart" /> Account
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <footer className="sidebar-footer" />
    </aside>
  );
};

export default SideBar;
