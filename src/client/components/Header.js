import React, {Component} from 'react';
import {graphql} from 'react-apollo';
import query from '../queries/CurrentUser';
import mutation from '../mutations/Logout';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import history from './history';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: ''
    };
    this.submit = this.submit.bind(this);
    this.changeTerm = this.changeTerm.bind(this);
  }
  changeTerm(event) {
    this.setState({term: event.target.value});
  }
  submit(event) {
    event.preventDefault();
    history.push(`/account/${this.state.term}`);
  }

  onLogoutClick() {
    this.props.mutate({
      refetchQueries: [{query}]
    });
  }
  render() {
    const {loadding, user} = this.props.data;
    if (loadding) {
      return <div />;
    }
    if (user) {
      return (
        <header className="header">
          <div className="header-block header-block-collapse d-lg-none d-xl-none">
            <button className="collapse-btn" id="sidebar-collapse-btn">
              <FontAwesomeIcon icon="lock-open" />
            </button>
          </div>
          <div className="header-block">
            <form role="search" onSubmit={this.submit}>
              <div className="input-container">
                <i className="fa fa-search" />
                <input type="search" placeholder="AccountName/Public Key/Tx" onChange={this.changeTerm} />
                <div className="underline" />
              </div>
            </form>
          </div>

          <div className="header-block header-block-nav">
            <ul className="nav-profile">
              <li className="profile dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  data-toggle="dropdown"
                  href="#"
                  role="button"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <div className="img" />
                  <span className="name"> </span>
                </a>
                <div className="dropdown-menu profile-dropdown-menu" aria-labelledby="dropdownMenu1">
                  <a className="dropdown-item" href="#">
                    <i className="fa fa-user icon" /> Profile{' '}
                  </a>
                  <a className="dropdown-item" href="#">
                    <i className="fa fa-bell icon" /> Notifications{' '}
                  </a>
                  <a className="dropdown-item" href="#">
                    <i className="fa fa-gear icon" /> Settings{' '}
                  </a>
                  <div className="dropdown-divider" />
                  <a className="dropdown-item" href="login.html">
                    <i className="fa fa-power-off icon" /> Logout{' '}
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </header>
      );
    } else {
      return (
        <header className="header shadow-sm bg-light">
          <div className="header-block header-block-collapse d-lg-none d-xl-none">
            <button className="collapse-btn" id="sidebar-collapse-btn">
              <FontAwesomeIcon icon="bars" />
            </button>
          </div>
          <div className="header-block header-block-search w-100 pr-2 pt-2">
            <form role="search" className="float-left card w-100" onSubmit={this.submit}>
              <div className="input-container">
                <input
                  type="search"
                  placeholder="Search by ACCOUNT/PUBKEY/TX"
                  className="search_font w-100 form-control"
                  onChange={this.changeTerm}
                  name="search"
                />
              </div>
            </form>
          </div>
          {/* <div className="header-block header-block-nav">
            <ul className="nav-profile">
              <li className="profile dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  data-toggle="dropdown"
                  href="#"
                  role="button"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <div className="img" />
                  <span className="name"> </span>
                </a>
                <div className="dropdown-menu profile-dropdown-menu" aria-labelledby="dropdownMenu1">
                  <a className="dropdown-item" href="#">
                    <i className="fa fa-user icon" /> Profile{' '}
                  </a>
                  <a className="dropdown-item" href="#">
                    <i className="fa fa-bell icon" /> Notifications{' '}
                  </a>
                  <a className="dropdown-item" href="#">
                    <i className="fa fa-gear icon" /> Settings{' '}
                  </a>
                  <div className="dropdown-divider" />
                  <a className="dropdown-item" href="login.html">
                    <i className="fa fa-power-off icon" /> Logout{' '}
                  </a>
                </div>
              </li>
            </ul>
          </div> */}
        </header>
      );
    }
  }
}

export default graphql(mutation)(graphql(query)(Header));
