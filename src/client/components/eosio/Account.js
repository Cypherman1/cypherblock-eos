import React, {Component, Suspense} from 'react';
import {connect} from 'react-redux';
import withSizes from 'react-sizes';
import {Helmet} from 'react-helmet';

import {setLimitValue} from '../../actions/eosActions';
import {setActiveLinkID} from '../../actions/sidebar';

const AccountInfo = React.lazy(() => import('./AccountInfo'));
const Wallet = React.lazy(() => import('./Wallet'));
const ActionsCard = React.lazy(() => import('./ActionsCard'));

class Account extends Component {
  componentWillMount() {
    this.props.setLimitValue(20);
    this.props.setActiveLinkID(1);
  }

  render() {
    const {match, sidebar, isDesktop} = this.props;
    return isDesktop ? (
      <article className="content dashboard-page">
        <Helmet>
          <title>{match.params.account_name} | EOS Block Explorer | Account, Airdrop, Price</title>
          <meta
            name="keywords"
            content="eos, eosio, eos block explorer, account, transaction, block, balance, RAM, voting, block producer, token, airdrop, price, wallet, dapp, project, marketcap, blockchain, mainnet, crypto, currency"
          />
          <meta name="title" content={`${match.params.account_name} | EOS Block Explorer | Account, Airdrop, Price`} />
          <meta
            name="description"
            content="Cypherblock | One of top EOS Block Explorer showing account, RAM, token, airdrop, price, voting, smart contract, transaction, dapp on EOSIO blockchain mainnet"
          />
          <meta
            property="og:title"
            content={`${match.params.account_name} | EOS Block Explorer | Account, Airdrop, Price`}
          />
          <meta
            property="og:description"
            content="Cypherblock | One of top EOS Block Explorer showing account, RAM, token, airdrop, price, voting, smart contract, transaction, dapp on EOSIO blockchain mainnet"
          />
          <meta
            name="twitter:title"
            content={`${match.params.account_name} | EOS Block Explorer | Account, Airdrop, Price`}
          />
          <meta
            name="twitter:description"
            content="Cypherblock | One of top EOS Block Explorer showing account, RAM, token, airdrop, price, voting, smart contract, transaction,  dapp on EOSIO blockchain mainnet"
          />
        </Helmet>
        <section className="section">
          <div className="row m-0">
            <div className="col col-12 col-sm-12 col-md-12 col-l-7 col-xl-8 stats-col pd-col ">
              <Suspense fallback={<div> Loading... </div>}>
                <AccountInfo account_name={match.params.account_name} isDarkMode={sidebar.isDarkMode} />
              </Suspense>
              {/* <Wallet account_name={match.params.account_name} isDarkMode={sidebar.isDarkMode} /> */}
              <Suspense fallback={<div> Loading... </div>}>
                <ActionsCard
                  account_name={match.params.account_name}
                  notifyOnNetworkStatusChange={false}
                  showRefetch={true}
                  isLive={false}
                  isDarkMode={sidebar.isDarkMode}
                  defaultLimit={50}
                />
              </Suspense>
            </div>
            <div className={`col col-12 col-sm-12 col-md-12 col-l-5 col-xl-4 history-col pd-col`}>
              <Suspense fallback={<div> Loading... </div>}>
                <Wallet account_name={match.params.account_name} isDarkMode={sidebar.isDarkMode} />
              </Suspense>
            </div>
          </div>
        </section>
      </article>
    ) : (
      <article className="content dashboard-page">
        <Helmet>
          <title>{match.params.account_name} | EOS Block Explorer | Account, Airdrop, Price</title>
          <meta
            name="keywords"
            content="eos, eosio, eos block explorer, account, transaction, block, balance, RAM, voting, block producer, token, airdrop, price, wallet, dapp, project, marketcap, blockchain, mainnet, crypto, currency"
          />
          <meta name="title" content={`${match.params.account_name} | EOS Block Explorer | Account, Airdrop, Price`} />
          <meta
            name="description"
            content="Cypherblock | One of top EOS Block Explorer showing account, RAM, token, airdrop, price, voting, smart contract, transaction, dapp on EOSIO blockchain mainnet"
          />
          <meta
            property="og:title"
            content={`${match.params.account_name} | EOS Block Explorer | Account, Airdrop, Price`}
          />
          <meta
            property="og:description"
            content="Cypherblock | One of top EOS Block Explorer showing account, RAM, token, airdrop, price, voting, smart contract, transaction, dapp on EOSIO blockchain mainnet"
          />
          <meta
            name="twitter:title"
            content={`${match.params.account_name} | EOS Block Explorer | Account, Airdrop, Price`}
          />
          <meta
            name="twitter:description"
            content="Cypherblock | One of top EOS Block Explorer showing account, RAM, token, airdrop, price, voting, smart contract, transaction,  dapp on EOSIO blockchain mainnet"
          />
        </Helmet>
        <section className="section">
          <div className="row m-0">
            <div className="col col-12 col-sm-12 col-md-12 col-l-7 col-xl-8 stats-col pd-col ">
              <Suspense fallback={<div> Loading... </div>}>
                <AccountInfo account_name={match.params.account_name} isDarkMode={sidebar.isDarkMode} />
              </Suspense>
              <Suspense fallback={<div> Loading... </div>}>
                <Wallet account_name={match.params.account_name} isDarkMode={sidebar.isDarkMode} />
              </Suspense>
              <Suspense fallback={<div> Loading... </div>}>
                <ActionsCard
                  account_name={match.params.account_name}
                  notifyOnNetworkStatusChange={false}
                  showRefetch={true}
                  isLive={false}
                  isDarkMode={sidebar.isDarkMode}
                />
              </Suspense>
            </div>
          </div>
        </section>
      </article>
    );
  }
}

// export default Account;

function mapStateToProps({myStore}) {
  return {sidebar: myStore.sidebar};
}
const mapSizesToProps = ({width}) => ({
  isDesktop: width > 1200
});

export default connect(
  mapStateToProps,
  {setLimitValue, setActiveLinkID}
)(withSizes(mapSizesToProps)(Account));
