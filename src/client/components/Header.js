import React, {Component} from 'react';
import isHash from 'validator/lib/isHash';
import isLowercase from 'validator/lib/isLowercase';
import {connect} from 'react-redux';
// import {getIdentity, getScatter, forgetIdentity, login} from '../actions/auth';
import {setSidebarStatus, setAddedToHomescreen, setDeferredPrompt} from '../actions/sidebar';
import history from './history';
import KeyAccountsModal from './eosio/KeyAccountsModal';
const images = require.context('../assets/imgs');
let scatterimg = images('./Scatter.jpg');

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: '',
      open: false
    };
    this.submit = this.submit.bind(this);
    this.changeTerm = this.changeTerm.bind(this);
    this.submitSidebarStatus = this.submitSidebarStatus.bind(this);
    // this.onScatterOpen = this.onScatterOpen.bind(this);
    // this.onScatterLogout = this.onScatterLogout.bind(this);
  }
  componentDidMount() {
    // try {
    //   this.props.getScatter();
    // } catch (ex) {
    //   return null;
    // }
    // return null;
  }
  changeTerm(event) {
    this.setState({term: event.target.value});
  }
  onOpenModal = () => {
    this.setState({open: true});
  };

  onCloseModal = () => {
    this.setState({open: false});
  };
  // onScatterOpen(event) {
  //   event.preventDefault();
  //   this.props.getIdentity(this.props.auth.scatter);
  // }
  // onScatterLogout(event) {
  //   event.preventDefault();
  //   this.props.auth.scatter.forgetIdentity();
  // }
  submitSidebarStatus(event) {
    event.preventDefault();
    this.props.setSidebarStatus(true);
  }
  submit(event) {
    event.preventDefault();
    if (this.state.term.substring(0, 3) == 'EOS' && this.state.term.length == 53) {
      this.onOpenModal();
    } else if (isHash(this.state.term, 'sha256') && this.state.term.substring(0, 2) == '00') {
      history.push(`/block/${this.state.term}`);
    } else if (isHash(this.state.term, 'sha256') && this.state.term.length == 64) {
      history.push(`/transaction/${this.state.term}`);
    } else {
      history.push(`/account/${this.state.term}`);
    }
  }
  renderModal() {
    if (this.state.term.substring(0, 3) == 'EOS' && this.state.term.length == 53) {
      return <KeyAccountsModal public_key={this.state.term} onCloseModal={this.onCloseModal} open={this.state.open} />;
    } else return null;
  }
  // renderAccount() {
  //   let result = null;

  //   if (!this.props.auth.account) {
  //     result = (
  //       <div className="col-auto pt-auth">
  //         <button type="button" className="btn btn-outline-info p-1 pr-2" onClick={() => this.props.login()}>
  //           <img src={scatterimg} className="img-logo rounded-circle" /> Login
  //         </button>
  //       </div>
  //     );
  //   } else {
  //     result = (
  //       <div>
  //         <button className="btn btn-success" onClick={() => this.props.forgetIdentity(this.props.auth.scatter)}>
  //           {this.props.auth.account.name}
  //         </button>
  //       </div>
  //     );
  //   }

  //   return result;
  // }

  render() {
    const {isDarkMode, isSidebarHide, deferredPrompt, addedToHomesceen} = this.props.sidebar;
    return (
      <div>
        <header
          className={`header ${isSidebarHide ? 'hf_hide' : ''}  bg-white shadow-sm ${
            isDarkMode ? 'bg-dark text-cypher' : ''
          }`}
        >
          <div className="header-block header-block-collapse d-lg-none d-xl-none">
            <button
              aria-label="menu"
              className="collapse-btn"
              id="sidebar-collapse-btn"
              onClick={this.submitSidebarStatus}
            >
              <i className="fa fa-bars" />
            </button>
          </div>
          <div className="w-100 row m-0 pr-1 pt-2">
            <div className="header-block header-block-search col pr-0 pl-search">
              <form role="search" className="float-left w-100" onSubmit={this.submit} autoComplete="on">
                <div className="input-group input-group-seamless">
                  <input
                    type="text"
                    aria-label="search"
                    placeholder="Search by account/pubkey/trx/blockid"
                    className={`w-100 form-control rounded border ${
                      isDarkMode ? 'border-secondary' : 'border-info'
                    }  pl-2 ftz-search`}
                    onChange={this.changeTerm}
                    name="search"
                    autoCapitalize="off"
                    spellCheck="false"
                  />
                  <div className="input-group-append">
                    <button
                      aria-label="search"
                      type="submit"
                      className={`btn ${isDarkMode ? 'btn-success' : 'btn-info'}  mb-0`}
                      onSubmit={this.submit}
                    >
                      <i className="fa fa-search text-light" />
                    </button>
                    {!addedToHomesceen ? (
                      <button
                        aria-label="search"
                        type="button"
                        className={`btn ${isDarkMode ? 'btn-success' : 'btn-info'}  mb-0 border-left`}
                        onClick={() => {
                          deferredPrompt.prompt(); // Wait for the user to respond to the prompt
                          deferredPrompt.userChoice.then(function(choiceResult) {
                            if (choiceResult.outcome === 'accepted') {
                              setAddedToHomescreen(true);
                            } else {
                              setAddedToHomescreen(false);
                            }
                            setDeferredPrompt(null);
                          });
                        }}
                      >
                        <i className="fa fa-plus-square text-light" />
                      </button>
                    ) : null}
                  </div>
                </div>
                {/* <div className="col-auto pl-1 pr-3">
                    <button className="btn btn-primary text-light" type="summit">
                      <FontAwesomeIcon icon="search" />
                    </button>
                  </div> */}
              </form>
            </div>
            {/* {this.renderAccount()} */}
          </div>
        </header>

        {this.renderModal()}
      </div>
    );
  }
}

function mapStateToProps({myStore}) {
  return {sidebar: myStore.sidebar, auth: myStore.auth};
}

export default connect(
  mapStateToProps,
  {setSidebarStatus, setAddedToHomescreen, setDeferredPrompt}
)(Header);

// , getIdentity, getScatter, forgetIdentity, login

// export default Header;
//, getIdentity, getScatter
