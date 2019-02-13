import React, {Component} from 'react';
import MetisMenu from 'react-metismenu';
import withSizes from 'react-sizes';
import RouterLink from 'react-metismenu-router-link';
import {connect} from 'react-redux';
import {setActiveLinkID, setSidebarStatus, setIsDarkMode, setIsSidebarHide} from '../actions/sidebar';
import logo from '../assets/imgs/logo.png';
import {mainstore} from '../store';
import SocialShare from './eosio/SocialShare';

let menu1 = [
  {
    id: 1,
    icon: 'cubes',
    label: '',
    to: '/',
    tmp1: 'Block Explorer'
  },
  {
    id: 3,
    icon: 'chart-bar',
    label: '',
    to: '/eosmarketcap',
    tmp1: 'EOS Marketcap'
  }
];

const genMenu = (isSidebarHide) => {
  return [
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
};

const UpdateName = (menu, isShowName) => {
  return menu.map((menuItem) => ({
    ...menuItem,
    label: isShowName ? menuItem.tmp1 : ''
  }));
};

class SideBar extends Component {
  componentWillMount() {
    if (localStorage.getItem('isDarkMode') == null) {
      localStorage.setItem('isDarkMode', 'true');
    }
    this.props.setIsDarkMode(localStorage.getItem('isDarkMode') == 'true');
    if (!this.props.isDesktop) menu1 = UpdateName(menu1, true);
    else menu1 = UpdateName(menu1, !this.props.sidebar.isSidebarHide);
  }
  componentDidMount() {}

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
  componentWillReceiveProps(nextProps) {
    if (
      this.props.isDesktop !== nextProps.isDesktop ||
      this.props.sidebar.isSidebarHide != nextProps.sidebar.isSidebarHide
    ) {
      if (!nextProps.isDesktop) menu1 = UpdateName(menu1, true);
      else menu1 = UpdateName(menu1, !nextProps.sidebar.isSidebarHide);
    }
  }
  render() {
    const {setSidebarStatus, sidebar, isDesktop, setIsDarkMode, setIsSidebarHide, setActiveLinkID} = this.props;
    const {isDarkMode, isSidebarHide, menu} = sidebar;
    // if (!this.props.isDesktop) menu1 = UpdateName(menu1, true);
    // else menu1 = UpdateName(menu1, !isSidebarHide);

    return (
      <div>
        <aside className={`sidebar ${isSidebarHide ? 'whide' : ''} ${sidebar.isDarkMode ? 'bg-dark' : 'bg-light'}`}>
          <div className="sidebar-container">
            <div className="sidebar-header">
              <div className={`${isDarkMode ? 'bg-black' : 'bg-white'} brand-container d-flex align-items-center`}>
                {isDesktop && isSidebarHide ? '' : <img src={logo} alt="cypherblock" className="main-logo" />}
                {isDesktop ? (
                  <a
                    className={`${isSidebarHide ? 'ml-2' : 'ml-3'} text-info  d-flex align-items-center `}
                    href="#"
                    onClick={() => {
                      setIsSidebarHide(!isSidebarHide);
                      menu1 = UpdateName(menu1, isSidebarHide && isDesktop);
                    }}
                  >
                    <i className="fa fa-bars ftz-20" />
                  </a>
                ) : (
                  ''
                )}
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
                content={menu1}
                LinkComponent={RouterLink}
                activeLinkId={sidebar.activeLinkId}
                useExternalReduxStore={mainstore}
              />
            </nav>
          </div>
          <footer className="sidebar-footer">
            <div className={`sidebar-menu ${isSidebarHide ? 'whide' : ''}`} id="customize-menu">
              <div className={`${isDarkMode ? 'border-secondary' : ''}  pl-1 border-bottom pb-1 `}>
                <SocialShare />
              </div>
              <button
                className={`btn ${isDarkMode ? 'btn-dark' : 'btn-secondary'}  btn-squared w-100 pl-3 mb-0`}
                style={{height: 50}}
                onClick={() => {
                  setIsDarkMode(!isDarkMode);
                  localStorage.setItem('isDarkMode', !isDarkMode);
                }}
              >
                {isDarkMode ? (
                  <i className="fa fa-moon ftz-20 text-success" />
                ) : (
                  <i className="fa fa-sun ftz-20 text-success" />
                )}
                {isSidebarHide && isDesktop ? (
                  ''
                ) : (
                  <div className="d-inline ml-1 "> {isDarkMode ? 'Dark Mode' : 'Light Mode'} </div>
                )}
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

const mapSizesToProps = ({width}) => ({
  isDesktop: width > 992
});

export default connect(
  mapStateToProps,
  {setActiveLinkID, setSidebarStatus, setIsDarkMode, setIsSidebarHide}
)(withSizes(mapSizesToProps)(SideBar));
