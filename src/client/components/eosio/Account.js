import React, {Component} from 'react';
import {connect} from 'react-redux';
import withSizes from 'react-sizes';
import AccountInfo from './AccountInfo';
import Wallet from './Wallet';
import ActionsCard from './ActionsCard';
import {setLimitValue} from '../../actions/eosActions';

class Account extends Component {
  componentWillMount() {
    this.props.setLimitValue(50);
  }
  render() {
    const {match, sidebar, isDesktop} = this.props;
    return isDesktop ? (
      <article className="content dashboard-page">
        <section className="section">
          <div className="row m-0">
            <div className="col col-12 col-sm-12 col-md-12 col-l-7 col-xl-8 stats-col pd-col ">
              <AccountInfo account_name={match.params.account_name} isDarkMode={sidebar.isDarkMode} />

              {/* <Wallet account_name={match.params.account_name} isDarkMode={sidebar.isDarkMode} /> */}

              <ActionsCard
                account_name={match.params.account_name}
                notifyOnNetworkStatusChange={false}
                showRefetch={true}
                isLive={false}
                isDarkMode={sidebar.isDarkMode}
                defaultLimit={50}
              />
            </div>
            <div className={`col col-12 col-sm-12 col-md-12 col-l-5 col-xl-4 history-col pd-col`}>
              <Wallet account_name={match.params.account_name} isDarkMode={sidebar.isDarkMode} />
            </div>
          </div>
        </section>
      </article>
    ) : (
      <article className="content dashboard-page">
        <section className="section">
          <div className="row m-0">
            <div className="col col-12 col-sm-12 col-md-12 col-l-7 col-xl-8 stats-col pd-col ">
              <AccountInfo account_name={match.params.account_name} isDarkMode={sidebar.isDarkMode} />

              <Wallet account_name={match.params.account_name} isDarkMode={sidebar.isDarkMode} />

              <ActionsCard
                account_name={match.params.account_name}
                notifyOnNetworkStatusChange={false}
                showRefetch={true}
                isLive={false}
                isDarkMode={sidebar.isDarkMode}
              />
            </div>
          </div>
        </section>
      </article>
    );
  }
}

// export default Account;

function mapStateToProps({myStore}) {
  return {sidebar: myStore.sidebar};
}
const mapSizesToProps = ({width}) => ({
  isDesktop: width > 1200
});

export default connect(
  mapStateToProps,
  {setLimitValue}
)(withSizes(mapSizesToProps)(Account));
