import React, {Component} from 'react';
import ErrorBoundary from './ErrorBoundary';
import MarketInfo from './eosio/MarketInfo';
import Actions from './eosio/Actions';

class Dashboard extends Component {
  render() {
    return (
      <article className="content dashboard-page">
        <section className="section">
          <div className="row m-0">
            <div className="col col-12 col-sm-12 col-md-12 col-l-7 col-xl-8 stats-col pd-col">
              <ErrorBoundary>
                <Actions account_name="eosio" />
              </ErrorBoundary>
            </div>
            <ErrorBoundary>
              <MarketInfo />
            </ErrorBoundary>
          </div>
        </section>
      </article>
    );
  }
}

export default Dashboard;
