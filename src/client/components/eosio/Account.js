import React from 'react';

// import MarketInfo from './MarketInfo';
import AccountInfo from './AccountInfo';
import Wallet from './Wallet';
import Actions from './Actions';
import VoterInfo from './VoterInfo';
import SmartContract from './SmartContract';
import ErrorBoundary from '../ErrorBoundary';
import ActionsCard from './ActionsCard';

const Account = ({match}) => {
  return (
    <article className="content dashboard-page">
      <section className="section">
        <div className="row m-0">
          <div className="col col-12 col-sm-12 col-md-12 col-l-7 col-xl-8 stats-col pd-col">
            <ErrorBoundary>
              <AccountInfo account_name={match.params.account_name} />
            </ErrorBoundary>
            {/* <ErrorBoundary>
              <VoterInfo account_name={match.params.account_name} />
            </ErrorBoundary> */}
            <ErrorBoundary>
              <SmartContract account_name={match.params.account_name} />
            </ErrorBoundary>
            <ErrorBoundary>
              <ActionsCard
                account_name={match.params.account_name}
                notifyOnNetworkStatusChange={false}
                showRefetch={true}
              />
            </ErrorBoundary>
          </div>

          <ErrorBoundary className="d-none d-xl-block">
            <Wallet account_name={match.params.account_name} />
          </ErrorBoundary>

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

export default Account;
