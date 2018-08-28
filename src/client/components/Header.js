import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {graphql} from 'react-apollo';
import GetKeyAccounts from '../queries/GetKeyAccounts';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import history from './history';
import Modal from 'react-responsive-modal';
import {Query} from 'react-apollo';
import KeyAccountsModal from './eosio/KeyAccountsModal';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: '',
      open: false
    };
    this.submit = this.submit.bind(this);
    this.changeTerm = this.changeTerm.bind(this);
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
  submit(event) {
    event.preventDefault();
    if (this.state.term.substring(0, 3) == 'EOS') {
      this.onOpenModal();
    } else history.push(`/account/${this.state.term}`);
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
          <div className="header-block header-block-search w-100 pr-2">
            <form role="search" className="float-left w-100" onSubmit={this.submit}>
              <div className="row">
                <div className="col pr-0">
                  <input
                    type="text"
                    placeholder="Search by ACCOUNT/PUBKEY/TX"
                    className="w-100 form-control"
                    onChange={this.changeTerm}
                    name="search"
                    autoCapitalize="off"
                    spellCheck="false"
                  />
                </div>
                <div className="col-auto pl-1 pr-3">
                  <button className="btn btn-info text-light" type="summit">
                    <FontAwesomeIcon icon="search" />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </header>
        {this.renderModal()}
      </div>
    );
  }
}

export default Header;
