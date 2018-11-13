import React from 'react';
import withSizes from 'react-sizes';
import GeneralInfo from './eosio/GeneralInfo';
import ActionsCard from './eosio/ActionsCard';
import Producers from './eosio/Producers';
import TokenMarket from './eosio/TokenMarket';
import {connect} from 'react-redux';

const Dashboard = ({sidebar, isDesktop}) => {
  return isDesktop ? (
    <article className="content dashboard-page">
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
              isLive={true}
              isDarkMode={sidebar.isDarkMode}
            />
          </div>
          <div className="col col-12 col-sm-12 col-md-12 col-l-7 col-xl-4 history-col pd-col ">
            <TokenMarket isDarkMode={sidebar.isDarkMode} />
            <Producers limit="30" isDarkMode={sidebar.isDarkMode} />
          </div>
          <div />
        </div>
      </section>
    </article>
  ) : (
    <article className="content dashboard-page">
      <section className="section">
        <div className="row m-0">
          <div className="col col-12 col-sm-12 col-md-12 col-l-7 col-xl-8 stats-col pd-col">
            <GeneralInfo isDarkMode={sidebar.isDarkMode} />
            {/* <TokenMarket display="d-xl-none" isDarkMode={sidebar.isDarkMode} />
            <Producers limit="30" display="d-xl-none" isDarkMode={sidebar.isDarkMode} /> */}
            <TokenMarket isDarkMode={sidebar.isDarkMode} />
            <Producers limit="30" isDarkMode={sidebar.isDarkMode} />
            <ActionsCard
              account_name="eosio"
              notifyOnNetworkStatusChange={false}
              showRefetch={true}
              isLive={true}
              isDarkMode={sidebar.isDarkMode}
            />
          </div>
        </div>
      </section>
    </article>
  );
};

function mapStateToProps({sidebar}) {
  return {sidebar};
}

const mapSizesToProps = ({width}) => ({
  isDesktop: width > 1200
});

export default connect(
  mapStateToProps,
  null
)(withSizes(mapSizesToProps)(Dashboard));

// export default Dashboard;
