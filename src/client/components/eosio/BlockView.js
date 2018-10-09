import React from 'react';

import Block from './Block';
import ErrorBoundary from '../ErrorBoundary';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const BlockView = ({match}) => {
  return (
    <article className="content dashboard-page">
      <section className="section">
        <div className="row m-0">
          <div className="col col-12 col-sm-12 col-md-12 col-l-12 col-xl-12 pd-col">
            <div className="card sameheight-item stats mbc" data-exclude="xs">
              <div className="card-header  bg-light shadow-sm">
                <div className="header-block pl-2">
                  <FontAwesomeIcon icon="cube" className="mr-2 text-info" />
                  <h5 className="title text-info">
                    <div>Block </div>
                  </h5>
                </div>
              </div>
              <ErrorBoundary>
                <Block block_num_or_id={match.params.block_num_or_id} />
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

export default BlockView;
