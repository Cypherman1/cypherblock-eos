import React, {Component} from 'react';
import ErrorBoundary from './ErrorBoundary';
import MarketInfo from './eosio/MarketInfo';
import GeneralInfo from './eosio/GeneralInfo';
import ActionsCard from './eosio/ActionsCard';
import Producers from './eosio/Producers';
import TokenMarket from './eosio/TokenMarket';

class Dashboard extends Component {
  render() {
    return (
      <article className="content dashboard-page">
        <section className="section">
          <div className="row m-0">
            <div className="col col-12 col-sm-12 col-md-12 col-l-7 col-xl-8 stats-col pd-col">
              <ErrorBoundary>
                <GeneralInfo />
              </ErrorBoundary>
              <TokenMarket display="d-xl-none" />

              <Producers limit="30" display="d-xl-none" />
              {/* <TokenMarket className="d-none" /> */}
              {/* <Producers limit="30" className="d-xl-none" /> */}
              <ErrorBoundary>
                <ActionsCard
                  account_name="eosio"
                  notifyOnNetworkStatusChange={false}
                  showRefetch={true}
                  isLive={true}
                />
              </ErrorBoundary>
            </div>
            <div className="col col-12 col-sm-12 col-md-12 col-l-7 col-xl-4 history-col pd-col ">
              <TokenMarket display="d-none d-sm-block" />

              <Producers limit="30" display="d-none d-sm-block" />
            </div>
          </div>
        </section>
      </article>
    );
  }
}

export default Dashboard;
