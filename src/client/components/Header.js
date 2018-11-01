import React, {Component} from 'react';
import isHash from 'validator/lib/isHash';
import isLowercase from 'validator/lib/isLowercase';
import {connect} from 'react-redux';
// import * as actions from '../actions/auth';
import {setSidebarStatus} from '../actions/sidebar';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import history from './history';
import KeyAccountsModal from './eosio/KeyAccountsModal';
// const images = require.context('../assets/imgs');
// let scatterimg = images('./Scatter.jpg');

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
  // componentDidMount() {
  //   // try {
  //   //   this.props.getScatter();
  //   // } catch (ex) {
  //   //   return null;
  //   // }
  //   // return null;
  // }
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
  //   if (!this.props.auth.account) {
  //     return (
  //       <div className="col-auto pt-auth">
  //         <button type="button" className="btn btn-outline-info p-1 pr-2" onClick={this.onScatterOpen}>
  //           <img src={scatterimg} className="img-logo rounded-circle" /> Login
  //         </button>
  //       </div>
  //     );
  //   }
  //   return (
  //     <div>
  //       <button className="btn btn-success" onClick={this.onScatterLogout}>
  //         {this.props.auth.account.name}
  //       </button>
  //     </div>
  //   );
  // }

  render() {
    const {isDarkMode} = this.props.sidebar;
    return (
      <div>
        <header className={`header bg-white shadow-sm ${isDarkMode ? 'bg-dark text-white' : ''}`}>
          <div className="header-block header-block-collapse d-lg-none d-xl-none">
            <button className="collapse-btn" id="sidebar-collapse-btn" onClick={this.submitSidebarStatus}>
              <FontAwesomeIcon icon="bars" />
            </button>
          </div>
          <div className="w-100 row m-0 pr-2 pt-2">
            <div className="header-block header-block-search col pr-0 pl-search">
              <form role="search" className="float-left w-100" onSubmit={this.submit}>
                <div className="input-group input-group-seamless">
                  <input
                    type="text"
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
                      type="button"
                      className={`btn ${isDarkMode ? 'btn-success' : 'btn-info'}  mb-0`}
                      onClick={this.submit}
                    >
                      <i className="fa fa-search text-white" />
                    </button>
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

function mapStateToProps({sidebar}) {
  return {sidebar};
}

export default connect(
  mapStateToProps,
  {setSidebarStatus}
)(Header);

// export default Header;
