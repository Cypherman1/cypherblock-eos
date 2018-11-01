import React from 'react';
import ErrorBoundary from './ErrorBoundary';
import GeneralInfo from './eosio/GeneralInfo';
import ActionsCard from './eosio/ActionsCard';
import Producers from './eosio/Producers';
import TokenMarket from './eosio/TokenMarket';
import {connect} from 'react-redux';

const Dashboard = ({sidebar}) => {
  return (
    <article className="content dashboard-page">
      <section className="section">
        <div className="row m-0">
          <div className="col col-12 col-sm-12 col-md-12 col-l-7 col-xl-8 stats-col pd-col">
            <ErrorBoundary>
              <GeneralInfo isDarkMode={sidebar.isDarkMode} />
            </ErrorBoundary>
            <TokenMarket display="d-xl-none" isDarkMode={sidebar.isDarkMode} />

            <Producers limit="30" display="d-xl-none" isDarkMode={sidebar.isDarkMode} />
            {/* <TokenMarket className="d-none" /> */}
            {/* <Producers limit="30" className="d-xl-none" /> */}
            <ErrorBoundary>
              <ActionsCard
                account_name="eosio"
                notifyOnNetworkStatusChange={false}
                showRefetch={true}
                isLive={true}
                isDarkMode={sidebar.isDarkMode}
              />
            </ErrorBoundary>
          </div>
          <div className="col col-12 col-sm-12 col-md-12 col-l-7 col-xl-4 history-col pd-col ">
            <TokenMarket display="d-none d-xl-block" isDarkMode={sidebar.isDarkMode} />
            <Producers limit="30" display="d-none d-xl-block" isDarkMode={sidebar.isDarkMode} />
          </div>
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
)(Dashboard);

// export default Dashboard;
