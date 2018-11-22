import React from 'react';

import Transaction from './Transaction';
import TransactionMongo from './TransactionMongo';
import {connect} from 'react-redux';
import ErrorBoundary from '../ErrorBoundary';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const TransactionView = ({match, sidebar}) => {
  return (
    <article className="content dashboard-page">
      <section className="section">
        <div className="row m-0">
          <div className="col col-12 col-sm-12 col-md-12 col-l-12 col-xl-12 stats-col pd-col">
            <div
              className={`card sameheight-item stats mbc pb-1 ${sidebar.isDarkMode ? 'bg-dark' : ''} `}
              data-exclude="xs"
            >
              <div className="card-header  bg-white shadow-sm mb-1">
                <div className="header-block pl-2">
                  <FontAwesomeIcon icon="table" className="mr-2 text-info ftz-24" />
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
};

function mapStateToProps({myStore}) {
  return {sidebar: myStore.sidebar};
}

export default connect(
  mapStateToProps,
  null
)(TransactionView);
