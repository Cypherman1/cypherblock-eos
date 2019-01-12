import React, {Component} from 'react';
import history from '../history';
import Modal from 'react-responsive-modal';
import {Link} from 'react-router-dom';
import {Query} from 'react-apollo';
import GetKeyAccounts from '../../queries/GetKeyAccounts';

class KeyAccountsModal extends Component {
  renderLink = (accountNames) => {
    let items = [];
    accountNames.map((accountName) => {
      items.push(
        <div key={accountName}>
          <Link to={`/account/${accountName}`} className="text-secondary" onClick={this.props.onCloseModal}>
            <i className="fa fa-chalkboard-teacher mr-2" />
            {accountName}
          </Link>
        </div>
      );
    });
    return items;
  };
  render() {
    return (
      <Query query={GetKeyAccounts} variables={{public_key: this.props.public_key}}>
        {({loading, error, data}) => {
          const {key_accounts} = data;
          if (key_accounts) {
            if (key_accounts.account_names.legth == 1) {
              history.push(`/account/${key_accounts.account_names}`);
              return null;
            } else
              return (
                <Modal open={this.props.open} onClose={this.props.onCloseModal} center showCloseIcon={false}>
                  <h4 className="bg-info">Chose account</h4>
                  {this.renderLink(key_accounts.account_names)}
                </Modal>
              );
          } else {
            return null;
          }
        }}
      </Query>
    );
  }
}

export default KeyAccountsModal;
