import React from 'react';
import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const SideBar = () => {
  return (
    <div>
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
              <li className="border-bottom border-top border-secondary">
                <Link to="/" className="text-secondary">
                  <FontAwesomeIcon icon="home" className="mr-2" /> Dashboard
                </Link>
              </li>

              <li className="border-bottom border-secondary">
                <Link to="/account/cyphercrypto" className="text-secondary">
                  <FontAwesomeIcon icon="chalkboard-teacher" className="mr-2" /> Account
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <footer className="sidebar-footer" />
      </aside>
      <div className="sidebar-overlay" id="sidebar-overlay" />
      <div className="sidebar-mobile-menu-handle" id="sidebar-mobile-menu-handle" />
      <div className="mobile-menu-handle" />
    </div>
  );
};

export default SideBar;
