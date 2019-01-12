import React, {Component} from 'react';

import Transaction from './Transaction';
// import TransactionMongo from './TransactionMongo';
import {connect} from 'react-redux';
import {Helmet} from 'react-helmet';
import ErrorBoundary from '../ErrorBoundary';
import {setActiveLinkID} from '../../actions/sidebar';

class TransactionView extends Component {
  componentWillMount() {
    this.props.setActiveLinkID(1);
  }
  render() {
    const {match, sidebar} = this.props;
    return (
      <article className="content dashboard-page">
        <Helmet>
          <title>Transaction | Cypherblock | EOS Block Explorer </title>
          <meta
            name="keywords"
            content="eos, eosio, eos block explorer, account, transaction, block, balance, RAM, voting, block producer, token, airdrop, price, wallet, dapp, project, marketcap, blockchain, mainnet, crypto, currency"
          />
          <meta name="title" content="Transaction | Cypherblock | EOS Block Explorer" />
          <meta
            name="description"
            content="Cypherblock | One of top EOS Block Explorer showing account, RAM, token, airdrop, price, voting, smart contract, transaction, dapp on EOSIO blockchain mainnet"
          />
          <meta property="og:title" content="Transaction | Cypherblock | EOS Block Explorer " />
          <meta
            property="og:description"
            content="Cypherblock | One of top EOS Block Explorer showing account, RAM, token, airdrop, price, voting, smart contract, transaction, dapp on EOSIO blockchain mainnet"
          />
          <meta name="twitter:title" content="Transaction | Cypherblock | EOS Block Explorer " />
          <meta
            name="twitter:description"
            content="Cypherblock | One of top EOS Block Explorer showing account, RAM, token, airdrop, price, voting, smart contract, transaction,  dapp on EOSIO blockchain mainnet"
          />
        </Helmet>
        <section className="section">
          <div className="row m-0">
            <div className="col col-12 col-sm-12 col-md-12 col-l-12 col-xl-12 stats-col pd-col">
              <div
                className={`card sameheight-item stats mbc pb-1 ${sidebar.isDarkMode ? 'bg-dark' : ''} `}
                data-exclude="xs"
              >
                <div className="card-header  bg-white shadow-sm mb-1">
                  <div className="header-block pl-2">
                    <i className="fa fa-table text-info fa-lg mr-2" />
                    <h1 className="title text-info">
                      <div>Transaction </div>
                    </h1>
                  </div>
                </div>
                <ErrorBoundary>
                  <Transaction id={match.params.id} isDarkMode={sidebar.isDarkMode} />
                </ErrorBoundary>
              </div>
            </div>
          </div>
        </section>
      </article>
    );
  }
}

function mapStateToProps({myStore}) {
  return {sidebar: myStore.sidebar};
}

export default connect(
  mapStateToProps,
  {setActiveLinkID}
)(TransactionView);
