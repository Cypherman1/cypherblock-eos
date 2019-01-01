import React from 'react';
import {connect} from 'react-redux';
import {Helmet} from 'react-helmet';
import Block from './Block';
import ErrorBoundary from '../ErrorBoundary';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const BlockView = ({match, sidebar}) => {
  return (
    <article className="content dashboard-page">
      <Helmet>
        <title>Block | Cypherblock | EOS Block Explorer </title>
        <meta
          name="keywords"
          content="eos, eosio, eos block explorer, account, transaction, block, balance, RAM, voting, block producer, token, airdrop, price, wallet, dapp, project, marketcap, blockchain, mainnet, crypto, currency"
        />
        <meta name="title" content="Block | Cypherblock | EOS Block Explorer" />
        <meta
          name="description"
          content="Cypherblock | One of top EOS Block Explorer showing account, RAM, token, airdrop, price, voting, smart contract, transaction, dapp on EOSIO blockchain mainnet"
        />
        <meta property="og:title" content="Block | Cypherblock | EOS Block Explorer " />
        <meta
          property="og:description"
          content="Cypherblock | One of top EOS Block Explorer showing account, RAM, token, airdrop, price, voting, smart contract, transaction, dapp on EOSIO blockchain mainnet"
        />
        <meta name="twitter:title" content="Block | Cypherblock | EOS Block Explorer " />
        <meta
          name="twitter:description"
          content="Cypherblock | One of top EOS Block Explorer showing account, RAM, token, airdrop, price, voting, smart contract, transaction,  dapp on EOSIO blockchain mainnet"
        />
      </Helmet>
      <section className="section">
        <div className="row m-0">
          <div className="col col-12 col-sm-12 col-md-12 col-l-12 col-xl-12 pd-col">
            <div className={`card sameheight-item stats ${sidebar.isDarkMode ? 'bg-dark' : ''} mbc`} data-exclude="xs">
              <div className="card-header  bg-white shadow-sm">
                <div className="header-block pl-2">
                  <FontAwesomeIcon icon="cube" className="mr-2 text-info ftz-24" />
                  <h1 className="title text-info">Block</h1>
                </div>
              </div>
              <ErrorBoundary>
                <Block block_num_or_id={match.params.block_num_or_id} isDarkMode={sidebar.isDarkMode} />
              </ErrorBoundary>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
};

function mapStateToProps({myStore}) {
  return {sidebar: myStore.sidebar};
}

export default connect(
  mapStateToProps,
  null
)(BlockView);
