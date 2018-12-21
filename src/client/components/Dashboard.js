import React, {Component} from 'react';
import withSizes from 'react-sizes';
import GeneralInfo from './eosio/GeneralInfo';
import ActionsCard from './eosio/ActionsCard';
import Producers from './eosio/Producers';
import TokenMarket from './eosio/TokenMarket';
import {connect} from 'react-redux';
import {setLimitValue} from '../actions/eosActions';
import {setActiveLinkID} from '../actions/sidebar';
import {trackPageview} from './utils/Tools';

class Dashboard extends Component {
  componentDidMount() {
    this.props.setLimitValue(20);
    this.props.setActiveLinkID(1);
    trackPageview(window.location.pathname + window.location.search);
  }

  render() {
    const {sidebar, isDesktop} = this.props;
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
                isLive={false}
                isDarkMode={sidebar.isDarkMode}
              />
            </div>
            <div className="col col-12 col-sm-12 col-md-12 col-l-7 col-xl-4 history-col pd-col ">
              <TokenMarket isDarkMode={sidebar.isDarkMode} />
              <Producers limit="21" isDarkMode={sidebar.isDarkMode} />
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
              <Producers limit="21" isDarkMode={sidebar.isDarkMode} />
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
