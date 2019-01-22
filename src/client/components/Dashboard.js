import React, {Component, Suspense} from 'react';
import withSizes from 'react-sizes';
import {Helmet} from 'react-helmet';
// import GeneralInfo from './eosio/GeneralInfo';
// import ActionsCard from './eosio/ActionsCard';
import Producers from './eosio/Producers';
import TokenMarket from './eosio/TokenMarket';
import {connect} from 'react-redux';
import {setLimitValue} from '../actions/eosActions';
import {setActiveLinkID} from '../actions/sidebar';

const GeneralInfo = React.lazy(() => import('./eosio/GeneralInfo'));
const ActionsCard = React.lazy(() => import('./eosio/ActionsCard'));
// const Producers = React.lazy(() => import('./eosio/Producers'));
// const TokenMarket = React.lazy(() => import('./eosio/TokenMarket'));

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
        </Helmet>
        <section className="section">
          <div className="row m-0">
            <div className="col col-12 col-sm-12 col-md-12 col-l-7 col-xl-8 stats-col pd-col">
              <Suspense fallback={<div> Loading... </div>}>
                <GeneralInfo isDarkMode={sidebar.isDarkMode} />
              </Suspense>
              {/* <TokenMarket display="d-xl-none" isDarkMode={sidebar.isDarkMode} />
            <Producers limit="30" display="d-xl-none" isDarkMode={sidebar.isDarkMode} /> */}
              <Suspense fallback={<div> Loading... </div>}>
                <ActionsCard
                  account_name="eosio"
                  notifyOnNetworkStatusChange={false}
                  showRefetch={true}
                  isLive={false}
                  isDarkMode={sidebar.isDarkMode}
                />
              </Suspense>
            </div>
            <div className="col col-12 col-sm-12 col-md-12 col-l-7 col-xl-4 history-col pd-col ">
              <Suspense fallback={<div> Loading... </div>}>
                <TokenMarket isDarkMode={sidebar.isDarkMode} />
              </Suspense>
              <Suspense fallback={<div> Loading... </div>}>
                <Producers limit="21" isDarkMode={sidebar.isDarkMode} />
              </Suspense>
            </div>
            <div />
          </div>
        </section>
      </article>
    ) : (
      <article className="content dashboard-page">
        <Helmet>
          <title>Cypherblock | EOS Block Explorer | Account, Token, Airdrop, Price</title>
        </Helmet>
        <section className="section">
          <div className="row m-0">
            <div className="col col-12 col-sm-12 col-md-12 col-l-7 col-xl-8 stats-col pd-col">
              <Suspense fallback={<div> Loading... </div>}>
                <GeneralInfo isDarkMode={sidebar.isDarkMode} />
              </Suspense>
              {/* <TokenMarket display="d-xl-none" isDarkMode={sidebar.isDarkMode} />
            <Producers limit="30" display="d-xl-none" isDarkMode={sidebar.isDarkMode} /> */}
              <Suspense fallback={<div> Loading... </div>}>
                <TokenMarket isDarkMode={sidebar.isDarkMode} />
              </Suspense>
              <Suspense fallback={<div> Loading... </div>}>
                <Producers limit="21" isDarkMode={sidebar.isDarkMode} />
              </Suspense>
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
