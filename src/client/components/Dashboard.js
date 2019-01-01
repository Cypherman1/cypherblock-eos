import React, {Component} from 'react';
import withSizes from 'react-sizes';
import {Helmet} from 'react-helmet';
import GeneralInfo from './eosio/GeneralInfo';
import ActionsCard from './eosio/ActionsCard';
import Producers from './eosio/Producers';
import TokenMarket from './eosio/TokenMarket';
import {connect} from 'react-redux';
import {setLimitValue} from '../actions/eosActions';
import {setActiveLinkID} from '../actions/sidebar';

class Dashboard extends Component {
  componentDidMount() {
    this.props.setLimitValue(20);
    this.props.setActiveLinkID(1);
  }

  render() {
    const {sidebar, isDesktop} = this.props;
    return isDesktop ? (
      <article className="content dashboard-page">
        <Helmet>
          <title>Cypherblock | EOS Block Explorer | Account, Token, Airdrop, Price</title>
          <meta
            name="keywords"
            content="eos, eosio, eos block explorer, account, transaction, block, balance, RAM, voting, block producer, token, airdrop, price, wallet, dapp, project, marketcap, blockchain, mainnet, crypto, currency"
          />
          <meta name="title" content="Cypherblock | EOS Block Explorer | Account, Token, Airdrop, Dapp" />
          <meta
            name="description"
            content="Cypherblock | One of top EOS Block Explorer showing account, RAM, token, airdrop, price, voting, smart contract, transaction, dapp on EOSIO blockchain mainet"
          />
          <meta property="og:title" content="Cypherblock | EOS Block Explorer | Account, Token, Airdrop, Price" />
          <meta
            property="og:description"
            content="Cypherblock | One of top EOS Block Explorer showing account, RAM, token, airdrop, price, voting, smart contract, transaction, dapp on EOSIO blockchain mainet"
          />
          <meta name="twitter:title" content="Cypherblock | EOS Block Explorer | Account, Token, Airdrop, Price" />
          <meta
            name="twitter:description"
            content="Cypherblock | One of top EOS Block Explorer showing account, RAM, token, airdrop, price, voting, smart contract, transaction,  dapp on EOSIO blockchain mainet"
          />
        </Helmet>
        <section className="section">
          <div className="row m-0">
            <div className="col col-12 col-sm-12 col-md-12 col-l-7 col-xl-8 stats-col pd-col">
              <GeneralInfo isDarkMode={sidebar.isDarkMode} />
              {/* <TokenMarket display="d-xl-none" isDarkMode={sidebar.isDarkMode} />
            <Producers limit="30" display="d-xl-none" isDarkMode={sidebar.isDarkMode} /> */}
              <ActionsCard
                account_name="eosio"
                notifyOnNetworkStatusChange={false}
                showRefetch={true}
                isLive={false}
                isDarkMode={sidebar.isDarkMode}
              />
            </div>
            <div className="col col-12 col-sm-12 col-md-12 col-l-7 col-xl-4 history-col pd-col ">
              <TokenMarket isDarkMode={sidebar.isDarkMode} />
              <Producers limit="21" isDarkMode={sidebar.isDarkMode} />
            </div>
            <div />
          </div>
        </section>
      </article>
    ) : (
      <article className="content dashboard-page">
        <Helmet>
          <title>Cypherblock | EOS Block Explorer | Account, Token, Airdrop, Price</title>
          <meta
            name="keywords"
            content="eos, eosio, eos block explorer, account, transaction, block, balance, RAM, voting, block producer, token, airdrop, price, wallet, dapp, project, marketcap, blockchain, mainnet, crypto, currency"
          />
          <meta name="title" content="Cypherblock | EOS Block Explorer | Account, Token, Airdrop, Dapp" />
          <meta
            name="description"
            content="Cypherblock | One of top EOS Block Explorer showing account, RAM, token, airdrop, price, voting, smart contract, transaction, dapp on EOSIO blockchain mainet"
          />
          <meta property="og:title" content="Cypherblock | EOS Block Explorer | Account, Token, Airdrop, Price" />
          <meta
            property="og:description"
            content="Cypherblock | One of top EOS Block Explorer showing account, RAM, token, airdrop, price, voting, smart contract, transaction, dapp on EOSIO blockchain mainet"
          />
          <meta name="twitter:title" content="Cypherblock | EOS Block Explorer | Account, Token, Airdrop, Price" />
          <meta
            name="twitter:description"
            content="Cypherblock | One of top EOS Block Explorer showing account, RAM, token, airdrop, price, voting, smart contract, transaction,  dapp on EOSIO blockchain mainet"
          />
        </Helmet>
        <section className="section">
          <div className="row m-0">
            <div className="col col-12 col-sm-12 col-md-12 col-l-7 col-xl-8 stats-col pd-col">
              <GeneralInfo isDarkMode={sidebar.isDarkMode} />
              {/* <TokenMarket display="d-xl-none" isDarkMode={sidebar.isDarkMode} />
            <Producers limit="30" display="d-xl-none" isDarkMode={sidebar.isDarkMode} /> */}
              <TokenMarket isDarkMode={sidebar.isDarkMode} />
              <Producers limit="21" isDarkMode={sidebar.isDarkMode} />
              {/* <ActionsCard
              account_name="eosio"
              notifyOnNetworkStatusChange={false}
              showRefetch={true}
              isLive={true}
              isDarkMode={sidebar.isDarkMode}
            /> */}
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

const mapSizesToProps = ({width}) => ({
  isDesktop: width > 1200
});

export default connect(
  mapStateToProps,
  {setLimitValue, setActiveLinkID}
)(withSizes(mapSizesToProps)(Dashboard));

// export default Dashboard;
