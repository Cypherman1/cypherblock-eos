import React from 'react';

import Transaction from './Transaction';
import {connect} from 'react-redux';
import ErrorBoundary from '../ErrorBoundary';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import history from '../history';

const TransactionView = ({match, sidebar}) => {
  const back = (e) => {
    e.stopPropagation();
    history.goBack();
  };
  return (
    <article className="content dashboard-page">
      <section className="section">
        <div className="row m-0">
          <div className="col col-12 col-sm-12 col-md-12 col-l-12 col-xl-12 stats-col pd-col">
            <div className={`card sameheight-item stats mbc ${sidebar.isDarkMode ? 'bg-dark' : ''} `} data-exclude="xs">
              <div className="card-header  bg-white shadow-sm">
                <div className="header-block pl-2">
                  <FontAwesomeIcon icon="table" className="mr-2 text-info ftz-24" />
                  <h5 className="title text-info">
                    <div>Transaction </div>
                  </h5>
                  {/* <button type="button" className="btn btn-primary" onClick={back}>
                    Go Back
                  </button> */}
                </div>
              </div>
              <ErrorBoundary>
                <Transaction id={match.params.id} isDarkMode={sidebar.isDarkMode} />
              </ErrorBoundary>
            </div>
          </div>

          {/* <ErrorBoundary className="d-none d-xl-block">
            <Wallet account_name={match.params.account_name} />
          </ErrorBoundary> */}

          {/* <Wallet data={data} /> */}
          {/* <MarketInfo
              cmc={cmc}
              eosioramfee={eosioramfee}
              eosioram={eosioram}
              global_data={global_data}
              table_rows={table_rows}
            /> */}
        </div>
      </section>
    </article>
  );
};

function mapStateToProps({sidebar}) {
  return {sidebar};
}

export default connect(
  mapStateToProps,
  null
)(TransactionView);
