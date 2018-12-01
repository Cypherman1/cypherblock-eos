import React, {Component} from 'react';
// import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import MetisMenu from 'react-metismenu';
import RouterLink from 'react-metismenu-router-link';
import {connect} from 'react-redux';
import {setActiveLinkID, setSidebarStatus, setIsDarkMode} from '../actions/sidebar';
import logo from '../assets/imgs/logo.png';
import {mainstore} from '../store';

const menu = [
  {
    id: 1,
    icon: 'cubes',
    label: 'Block Explorer',
    to: '/'
  },
  // {
  //   id: 2,
  //   icon: 'cogs',
  //   label: 'Block producers',
  //   to: '/blockproducers'
  // },
  {
    id: 3,
    icon: 'bar-chart',
    label: 'EOS Marketcap',
    to: '/eosmarketcap'
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

class SideBar extends Component {
  componentWillMount() {
    if (localStorage.getItem('isDarkMode') == null) {
      localStorage.setItem('isDarkMode', 'true');
    }
    this.props.setIsDarkMode(localStorage.getItem('isDarkMode') == 'true');
  }
  // renderMenu() {

  //   return this.props.sidebar.isDarkMode ? (
  //     <MetisMenu
  //       className="metismenu-dark"
  //       classNameItem="metismenu-item-dark"
  //       classNameContainer="metismenu-container-dark"
  //       content={menu}
  //       LinkComponent={RouterLink}
  //       activeLinkId={this.props.sidebar.activeLinkId}
  //     />
  //   ) : (
  //     <MetisMenu content={menu} LinkComponent={RouterLink} activeLinkId={this.props.sidebar.activeLinkId} />
  //   );
  // }
  render() {
    const {setSidebarStatus, sidebar, setIsDarkMode} = this.props;
    const {isDarkMode} = sidebar;

    return (
      <div>
        <aside className={`sidebar ${sidebar.isDarkMode ? 'bg-dark' : 'bg-light'}`}>
          <div className="sidebar-container">
            <div className="sidebar-header">
              <div className={`${isDarkMode ? 'bg-black' : 'bg-white'} brand-container`}>
                {/* <div className="mylogo logo-font">
                  <FontAwesomeIcon icon="cube" />
                </div>
                CYPHERBLOCK */}
                <img src={logo} className="main-logo" />
              </div>
            </div>
            <nav
              className="menu"
              id={`${isDarkMode ? 'sidebar-dark' : 'sidebar'}`}
              onClick={(e) => {
                e.preventDefault();
                setSidebarStatus(false);
              }}
            >
              {/* {this.renderMenu()} */}
              <MetisMenu
                className={`${sidebar.isDarkMode ? 'metismenu-dark' : ''}`}
                classNameItem={`${isDarkMode ? 'metismenu-item-dark' : ''}`}
                classNameContainer={`${isDarkMode ? 'metismenu-container-dark' : ''}`}
                content={menu}
                LinkComponent={RouterLink}
                activeLinkId={sidebar.activeLinkId}
                useExternalReduxStore={mainstore}
              />
            </nav>
          </div>
          <footer className="sidebar-footer">
            <div className={`sidebar-menu border-top`} id="customize-menu">
              <div className="collapse" id="collapseConfig">
                <div
                  className={`${isDarkMode ? 'bg-secondary' : 'bg-white'}`}
                  style={{height: 50, paddingTop: 4, paddingLeft: 56, borderRight: 1}}
                >
                  <div className="custom-control custom-toggle my-2">
                    <input
                      type="checkbox"
                      id="darkMode"
                      name="darkMode"
                      className="custom-control-input"
                      checked={isDarkMode}
                      onChange={(event) => {
                        setIsDarkMode(event.target.checked);
                        localStorage.setItem('isDarkMode', event.target.checked);
                      }}
                    />
                    <label className="custom-control-label mt-1 font-weight-normal" htmlFor="darkMode">
                      Dark mode
                    </label>
                  </div>
                </div>
              </div>
              <button
                className={`btn ${isDarkMode ? 'btn-dark' : 'btn-secondary'}  btn-squared w-100 mb-0  ftz-15`}
                style={{height: 50}}
                type="button"
                data-toggle="collapse"
                data-target="#collapseConfig"
                aria-expanded="false"
                aria-controls="collapseConfig"
              >
                <FontAwesomeIcon icon="palette" />
                <div className="d-inline ml-1 "> Customize </div>
              </button>
            </div>
          </footer>
        </aside>
        <div
          className="sidebar-overlay"
          id="sidebar-overlay"
          onClick={(e) => {
            e.preventDefault();
            setSidebarStatus(false);
          }}
        />
        <div className="sidebar-mobile-menu-handle" id="sidebar-mobile-menu-handle" />
        <div className="mobile-menu-handle" />
      </div>
    );
  }
}

function mapStateToProps({myStore}) {
  return {sidebar: myStore.sidebar};
}

export default connect(
  mapStateToProps,
  {setActiveLinkID, setSidebarStatus, setIsDarkMode}
)(SideBar);
