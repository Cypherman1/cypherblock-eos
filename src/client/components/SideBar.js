import React from 'react';
// import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import MetisMenu from 'react-metismenu';
import RouterLink from 'react-metismenu-router-link';
import {connect} from 'react-redux';
import {setActiveLinkID, setSidebarStatus} from '../actions/sidebar';

const menu = [
  {
    id: 1,
    icon: 'dashboard',
    label: 'Dashboard',
    to: '/'
  }
  // ,
  // {
  //   id: 2,
  //   icon: 'bolt',
  //   label: 'Account',
  //   to: '/account'
  //   // content: [
  //   //   {
  //   //     icon: 'bolt',
  //   //     label: 'Sub Menu',
  //   //     to: 'sub-menu'
  //   //   }
  //   // ]
  // },
  // {
  //   id: 3,
  //   icon: 'bolt',
  //   label: 'Blocks',
  //   to: '/block'
  //   // content: [
  //   //   {
  //   //     icon: 'bolt',
  //   //     label: 'Sub Menu',
  //   //     to: 'sub-menu'
  //   //   }
  //   // ]
  // },
  // {
  //   id: 4,
  //   icon: 'bell',
  //   label: 'transaction',
  //   to: '/transaction'
  // }
];

const SideBar = (props) => {
  return (
    <div>
      <aside className="sidebar">
        <div className="sidebar-container">
          <div className="sidebar-header">
            <div className="brand text-white font-weight-bold ftz-16">
              <div className="mylogo logo-font">
                <FontAwesomeIcon icon="cube" />
              </div>
              CYPHERBLOCK
            </div>
          </div>
          <nav
            className="menu"
            onClick={(e) => {
              e.preventDefault();
              props.setSidebarStatus(false);
            }}
          >
            <MetisMenu content={menu} LinkComponent={RouterLink} activeLinkId={props.sidebar.activeLinkId} />
          </nav>
        </div>
        <footer className="sidebar-footer">
          {/* <div className="sidebar-menu" id="customize-menu">
            <button className="btn btn-secondary btn-squared w-100 mb-0" style={{}}>
              <i className="fa fa-cog mr-2 fa-lg" /> Customize
            </button>
          </div> */}
        </footer>
      </aside>
      <div
        className="sidebar-overlay"
        id="sidebar-overlay"
        onClick={(e) => {
          e.preventDefault();
          props.setSidebarStatus(false);
        }}
      />
      <div className="sidebar-mobile-menu-handle" id="sidebar-mobile-menu-handle" />
      <div className="mobile-menu-handle" />
    </div>
  );
};

function mapStateToProps({sidebar}) {
  return {sidebar};
}

export default connect(
  mapStateToProps,
  {setActiveLinkID, setSidebarStatus}
)(SideBar);
