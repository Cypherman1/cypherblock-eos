import React, {Component} from 'react';
import ErrorBoundary from './ErrorBoundary';
import MarketInfo from './eosio/MarketInfo';
import GeneralInfo from './eosio/GeneralInfo';
import Actions from './eosio/Actions';
import Producers from './eosio/Producers';

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
              <ErrorBoundary>
                <Actions account_name="eosio" pollInterval={3000} showRefetch={true} />
              </ErrorBoundary>
            </div>
            <div className="col col-12 col-sm-12 col-md-12 col-l-7 col-xl-4 history-col pd-col ">
              <MarketInfo className="d-none d-lg-block" />
              <Producers limit="30" />
            </div>
          </div>
        </section>
      </article>
    );
  }
}

export default Dashboard;
