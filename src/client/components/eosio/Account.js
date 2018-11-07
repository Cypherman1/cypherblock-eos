import React from 'react';
import {connect} from 'react-redux';
// import MarketInfo from './MarketInfo';
import AccountInfo from './AccountInfo';
import Wallet from './Wallet';
import ErrorBoundary from '../ErrorBoundary';
import ActionsCard from './ActionsCard';

const Account = ({match, sidebar}) => {
  return (
    <article className="content dashboard-page">
      <section className="section">
        <div className="row m-0">
          <div className="col col-12 col-sm-12 col-md-12 col-l-7 col-xl-8 stats-col pd-col ">
            <ErrorBoundary>
              <AccountInfo account_name={match.params.account_name} isDarkMode={sidebar.isDarkMode} />
            </ErrorBoundary>
            <Wallet account_name={match.params.account_name} display="d-xl-none" isDarkMode={sidebar.isDarkMode} />
            <ErrorBoundary>
              <ActionsCard
                account_name={match.params.account_name}
                notifyOnNetworkStatusChange={false}
                showRefetch={true}
                isLive={false}
                isDarkMode={sidebar.isDarkMode}
              />
            </ErrorBoundary>
          </div>
          <div className={`col col-12 col-sm-12 col-md-12 col-l-5 col-xl-4 history-col pd-col`}>
            <Wallet
              account_name={match.params.account_name}
              display="d-none d-xl-block"
              isDarkMode={sidebar.isDarkMode}
            />
          </div>

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

// export default Account;

function mapStateToProps({sidebar}) {
  return {sidebar};
}

export default connect(
  mapStateToProps,
  null
)(Account);
