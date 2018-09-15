import React, {Component} from 'react';
import isHash from 'validator/lib/isHash';
import isLowercase from 'validator/lib/isLowercase';
import {connect} from 'react-redux';
import * as actions from '../actions/scatter';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
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
    this.onScatterOpen = this.onScatterOpen.bind(this);
    this.onScatterLogout = this.onScatterLogout.bind(this);
  }
  componentDidMount() {
    // try {
    //   this.props.getScatter();
    // } catch (ex) {
    //   return null;
    // }
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
  onScatterOpen(event) {
    event.preventDefault();
    const network = {
      blockchain: 'eos',
      protocol: 'https',
      host: 'eos.greymass.com',
      port: 443,
      chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906'
    };

    const requiredFields = {accounts: [network]};

    this.props.scatter.getIdentity(requiredFields).then(() => {
      const account = this.props.scatter.identity.accounts.find((x) => x.blockchain === 'eos');
      console.log(account);
    });
    // console.log(this.props.scatter);
  }
  onScatterLogout(event) {
    event.preventDefault();
    this.props.scatter.forgetIdentity();
    console.log(this.props.scatter);
  }
  submit(event) {
    event.preventDefault();
    if (this.state.term.substring(0, 3) == 'EOS' && this.state.term.length == 53) {
      this.onOpenModal();
    } else if (isHash(this.state.term, 'sha256') && this.state.term.substring(0, 2) == '00') {
      history.push(`/block/${this.state.term}`);
    } else if (isHash(this.state.term, 'sha256') && this.state.term.length == 64) {
      history.push(`/transaction/${this.state.term}`);
    } else if (this.state.term.length <= 12 && isLowercase(this.state.term)) {
      history.push(`/account/${this.state.term}`);
    }
  }
  renderModal() {
    if (this.state.term.substring(0, 3) == 'EOS' && this.state.term.length == 53) {
      return <KeyAccountsModal public_key={this.state.term} onCloseModal={this.onCloseModal} open={this.state.open} />;
    } else return null;
  }

  render() {
    return (
      <div>
        <header className="header shadow-sm bg-light">
          <div className="header-block header-block-collapse d-lg-none d-xl-none">
            <button className="collapse-btn" id="sidebar-collapse-btn">
              <FontAwesomeIcon icon="bars" />
            </button>
          </div>
          <div className="w-100 row m-0 pr-2 pt-2">
            <div className="header-block header-block-search col pr-1">
              <form role="search" className="float-left w-100" onSubmit={this.submit}>
                <div className="row">
                  <div className="col pr-0 pl-2">
                    <input
                      type="text"
                      placeholder="Search by account/pubkey/trx/blockid"
                      className="w-100 form-control"
                      onChange={this.changeTerm}
                      name="search"
                      autoCapitalize="off"
                      spellCheck="false"
                    />
                  </div>
                  <div className="col-auto pl-1 pr-3">
                    <button className="btn btn-primary text-light" type="summit">
                      <FontAwesomeIcon icon="search" />
                    </button>
                  </div>
                </div>
              </form>
            </div>
            {/* <div className="col pt-auth">
              <button type="button" className="btn btn-outline-info p-1 pr-2" onClick={this.onScatterLogout}>
                <img src={scatterimg} className="img-logo rounded-circle" /> Logout
              </button>
            </div>
            <div className="col-auto pt-auth">
              <button type="button" className="btn btn-outline-info p-1 pr-2" onClick={this.onScatterOpen}>
                <img src={scatterimg} className="img-logo rounded-circle" /> Login
              </button>
            </div> */}
          </div>
        </header>
        {this.renderModal()}
      </div>
    );
  }
}

function mapStateToProps({scatter}) {
  return {scatter};
}

export default connect(
  mapStateToProps,
  actions
)(Header);
