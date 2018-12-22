import React from 'react';
import {Link} from 'react-router-dom';
import ReactGA from 'react-ga';
import {
  AT_SEND_EOS,
  AT_RECEIVE_EOS,
  AT_TRANSFER_EOS,
  AT_SEND_TOKEN,
  AT_RECEIVE_TOKEN,
  AT_TRANSFER_TOKEN,
  AG_TRANSFER_EOS,
  AG_TRANSFER_TOKEN,
  AT_STAKE,
  AT_UNSTAKE,
  AT_BUY_RAM,
  AT_BUY_RAM_BYTES,
  AT_SELL_RAM,
  AT_REFUND,
  AG_RESOURCES,
  AT_CREATE_ACCOUNT,
  AT_UPDATE_AUTH,
  AG_ACCOUNT,
  AT_VOTE_PRODUCERS,
  AT_SET_CODE,
  AT_SET_ABI,
  AG_CONTRACT,
  AT_CLAIMREWARDS,
  AT_CANCELDELAY,
  AT_OTHERS,
  AG_OTHERS,
  AG_VOTE
} from './ConstTypes';

import eoslogo from '../../assets/imgs/eoslogo1.svg';

let isDarkMode = null;

const toTokenNumber = (tokenNum) => {
  if (tokenNum)
    return `${Number(tokenNum.split(' ')[0]).toLocaleString(undefined, {minimumFractionDigits: 4})} ${
      tokenNum.split(' ')[1]
    }`;
};

const classifyAction = (action_trace, account_name) => {
  let ActionInfo = {
    action_type: '',
    action_style: {
      icon: '',
      color: ''
    },
    action_group: ''
  };
  switch (action_trace.act.name) {
    case 'transfer': // transfer EOS or tokens
      switch (action_trace.act.account) {
        case 'eosio.token': // transfer EOS
          if (action_trace.receipt.receiver == account_name && action_trace.act.data.to == account_name) {
            // received EOS

            ActionInfo = {
              action_type: AT_RECEIVE_EOS,
              action_style: {icon: 'fa-sign-in', color: 'icon-received'},
              action_group: AG_TRANSFER_EOS
            };

            return ActionInfo;
          } else if (action_trace.act.data.from == account_name) {
            // sent EOS

            ActionInfo = {
              action_type: AT_SEND_EOS,
              action_style: {icon: 'fa-sign-out', color: 'icon-sent'},
              action_group: AG_TRANSFER_EOS
            };

            return ActionInfo;
            // return this.renderSentAction(action_trace);
          } else {
            // default transfer EOS action

            ActionInfo = {
              action_type: AT_TRANSFER_EOS,
              action_style: {icon: 'fa-retweet', color: 'icon-default'},
              action_group: AG_TRANSFER_EOS
            };

            return ActionInfo;
          }
        default:
          if (action_trace.act.data.quantity) {
            if (action_trace.receipt.receiver == account_name && action_trace.act.data.to == account_name) {
              // receive other tokens

              ActionInfo = {
                action_type: AT_RECEIVE_TOKEN,
                action_style: {icon: 'fa-sign-in', color: 'icon-receivetoken'},
                action_group: AG_TRANSFER_TOKEN
              };

              return ActionInfo;
            } else if (action_trace.act.data.from == account_name) {
              // send other tokens

              ActionInfo = {
                action_type: AT_SEND_TOKEN,
                action_style: {icon: 'fa-sign-out', color: 'icon-senttoken'},
                action_group: AG_TRANSFER_TOKEN
              };

              return ActionInfo;
            } else {
              // default transfer token action

              ActionInfo = {
                action_type: AT_TRANSFER_TOKEN,
                action_style: {icon: 'fa-retweet', color: 'icon-default'},
                action_group: AG_TRANSFER_TOKEN
              };

              return ActionInfo;
            }
          } else {
            //other actions

            ActionInfo = {
              action_type: AT_OTHERS,
              action_style: {icon: 'fa-paper-plane', color: 'icon-default'},
              action_group: AG_OTHERS
            };

            return ActionInfo;
            // return this.renderDefaultAction(action_trace);
          }
      }
    case 'delegatebw':
      ActionInfo = {
        action_type: AT_STAKE,
        action_style: {icon: 'fa-lock', color: 'icon-receivetoken'},
        action_group: AG_RESOURCES
      };

      return ActionInfo;
    case 'undelegatebw':
      ActionInfo = {
        action_type: AT_UNSTAKE,
        action_style: {icon: 'fa-unlock', color: 'icon-senttoken'},
        action_group: AG_RESOURCES
      };

      return ActionInfo;

    case 'buyram':
      ActionInfo = {
        action_type: AT_BUY_RAM,
        action_style: {icon: 'fa-sign-in', color: 'icon-receivetoken'},
        action_group: AG_RESOURCES
      };

      return ActionInfo;
    case 'buyrambytes':
      if (action_trace.act.account == 'eosio') {
        ActionInfo = {
          action_type: AT_BUY_RAM_BYTES,
          action_style: {icon: 'fa-sign-in', color: 'icon-receivetoken'},
          action_group: AG_RESOURCES
        };

        return ActionInfo;
      } else {
        ActionInfo = {
          action_type: AT_OTHERS,
          action_style: {icon: 'fa-paper-plane', color: 'icon-default'},
          action_group: AG_OTHERS
        };

        return ActionInfo;
      }
    case 'sellram':
      ActionInfo = {
        action_type: AT_SELL_RAM,
        action_style: {icon: 'fa-sign-out', color: 'icon-senttoken'},
        action_group: AG_RESOURCES
      };

      return ActionInfo;
    case 'newaccount':
      ActionInfo = {
        action_type: AT_CREATE_ACCOUNT,
        action_style: {icon: 'fa-user-plus', color: 'icon-vote'},
        action_group: AG_ACCOUNT
      };

      return ActionInfo;
    case 'voteproducer':
      ActionInfo = {
        action_type: AT_VOTE_PRODUCERS,
        action_style: {icon: 'fa-gavel', color: 'icon-vote'},
        action_group: AG_VOTE
      };

      return ActionInfo;
    case 'updateauth':
      ActionInfo = {
        action_type: AT_UPDATE_AUTH,
        action_style: {icon: 'fa-user-secret', color: 'icon-vote'},
        action_group: AG_ACCOUNT
      };

      return ActionInfo;
    case 'setabi':
      ActionInfo = {
        action_type: AT_SET_ABI,
        action_style: {icon: 'fa-cogs', color: 'icon-vote'},
        action_group: AG_CONTRACT
      };

      return ActionInfo;
    case 'setcode':
      ActionInfo = {
        action_type: AT_SET_CODE,
        action_style: {icon: 'fa-cogs', color: 'icon-vote'},
        action_group: AG_CONTRACT
      };

      return ActionInfo;
    case 'refund':
      ActionInfo = {
        action_type: AT_REFUND,
        action_style: {icon: 'fa-key', color: 'icon-vote'},
        action_group: AG_RESOURCES
      };

      return ActionInfo;
    case 'claimrewards':
      ActionInfo = {
        action_type: AT_CLAIMREWARDS,
        action_style: {icon: 'fa-dollar', color: 'icon-received'},
        action_group: AG_OTHERS
      };

      return ActionInfo;
    case 'canceldelay':
      ActionInfo = {
        action_type: AT_CANCELDELAY,
        action_style: {icon: 'fa-hand-stop-o', color: 'icon-default'},
        action_group: AG_OTHERS
      };

      return ActionInfo;
    default:
      ActionInfo = {
        action_type: AT_OTHERS,
        action_style: {icon: 'fa-paper-plane', color: 'icon-default'},
        action_group: AG_OTHERS
      };

      return ActionInfo;
    // items.push(<ActType bg="bg-secondary{"> {action_trace.act.name} </ActType>);
    // items.push(<DefaultAction action_trace={action_trace}> </DefaultAction>);
    // return items;
  }
};

const antispamCheck = (action_trace, antispam) => {
  return true;
};

// const convertUTCDateToLocalDate = (date) => {
//   var newDate = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);

//   var offset = date.getTimezoneOffset() / 60;
//   var hours = date.getHours();

//   newDate.setHours(hours - offset);

//   return newDate;
// };

const convertUTCDateToLocalDate = (date) => {
  // var newDate = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);

  // var offset = date.getTimezoneOffset() / 60;
  // var hours = date.getHours();

  // newDate.setHours(hours - offset);

  var newdate = new Date(date + ' UTC');
  // date.toString(); // "Wed Jun 29 2011 09:52:48 GMT-0700 (PDT)"

  return newdate.toLocaleString();
};

const renderAccountLink = (accountName) => {
  isDarkMode = localStorage.getItem('isDarkMode') == 'true';
  return (
    <Link className={`font-weight-acttype  ${isDarkMode ? 'linkcolor-dark' : ''} `} to={`/account/${accountName}`}>
      {accountName}
    </Link>
  );
};

const renderProjectLink = (token) => {
  isDarkMode = localStorage.getItem('isDarkMode') == 'true';
  return (
    <Link
      className={`font-weight-acttype ftz-13  ${isDarkMode ? 'linkcolor-dark' : ''} `}
      to={{
        pathname: `/project/${token.symbol}`
      }}
    >
      {token.currency.toUpperCase()}
    </Link>
  );
};

const renderBlockLink = (block_num) => {
  isDarkMode = localStorage.getItem('isDarkMode') == 'true';
  return (
    <Link to={`/block/${block_num}`} className={`font-weight-acttype  ${isDarkMode ? 'linkcolor-dark' : ''} `}>
      {block_num}
    </Link>
  );
};

const renderTransactiontLink = (trx_id, seq) => {
  return (
    <div data-toggle="tooltip" data-placement="top" title="View transaction">
      <Link to={`/transaction/${trx_id}`}>{seq}</Link>
    </div>
  );
};

const renderTransLink = (trx_id) => {
  return (
    <div>
      <Link to={`/transaction/${trx_id}`}>{trx_id}</Link>
    </div>
  );
};

const RenderAuths = (accounts, keys) => {
  let items = [];
  if (accounts)
    accounts.map((account) => {
      items.push(
        <div key={account.permission.actor} className="d-flex">
          <div className="weight-w mb-1 mr-auth-weight rounded bg-success  text-light ftz-11">{account.weight}</div>
          <div className="pt-auth-account ftz-11">
            {renderAccountLink(account.permission.actor)}@{account.permission.permission}
          </div>
        </div>
      );
    });
  if (keys)
    keys.map((key) => {
      items.push(
        <div key={key.key} className="d-flex">
          <div className="weight-w mb-1 mr-auth-weight rounded bg-success  text-light">{key.weight}</div>
          <div className="pt-auth-key ftz-6">{key.key}</div>
        </div>
      );
    });
  return items;
};

const renderPerm = (perm_name, threshold, accounts, keys, account_name) => {
  return (
    <div className="d-flex pt-1">
      <div className="mr-1 pt-1">
        <div className="threshold-icon bg-sent rounded text-light pt-2 ">
          {threshold}
          <div className="ftz-threshold text-light ">Threshold</div>
        </div>
      </div>
      <div className="">
        <div className="pb-permname ftz-12">
          {renderAccountLink(account_name)}
          <span className="text-info">@{perm_name}</span>
        </div>
        <div className="name">{RenderAuths(accounts, keys)}</div>
      </div>
    </div>
  );
};

const RoundedIcon = ({icon, color}) => {
  return (
    <div className="d-inline-block pt-act-icon">
      <span className="fa-stack">
        <i className={`fa fa-circle fa-stack-2x ${color}`} />
        <i className={`fa ${icon} fa-stack-1x text-light`} />
      </span>
    </div>
  );
};

// get the token pirce
const gettPairPrice = (data, bitfinex_pair, bigone_ticker, blocksence_ticker, symbol) => {
  let tPrice = 0;
  if (data.bitfinex_pairs && bitfinex_pair)
    data.bitfinex_pairs.data.map((pair) => {
      if (pair[0] == bitfinex_pair) {
        tPrice = Number(pair[7]);
      }
    });

  if (data.bigone_tickers && bigone_ticker)
    data.bigone_tickers.data.map((ticker) => {
      if (ticker.market_id == bigone_ticker) {
        tPrice = Number(ticker.close);
      }
    });

  if (data.blocksence_tickers && data.blocksence_tickers.data && blocksence_ticker) {
    for (var ticker in data.blocksence_tickers.data) {
      if (ticker == blocksence_ticker) {
        tPrice = data.blocksence_tickers.data[ticker].eos_price;
      }
    }
  }
  if (data.newdex_tickers && symbol)
    data.newdex_tickers.data.map((ticker) => {
      if (ticker.symbol == symbol) {
        tPrice = Number(ticker.last);
      }
    });
  return tPrice;
};
//get the token price percent change
const gettPairPercent = (data, bitfinex_pair, bigone_ticker, blocksence_ticker, symbol) => {
  let tPercent = 0;
  if (data.bitfinex_pairs)
    data.bitfinex_pairs.data.map((pair) => {
      if (pair[0] == bitfinex_pair) {
        tPercent = Number(pair[6]);
      }
    });

  if (data.bigone_tickers && bigone_ticker)
    data.bigone_tickers.data.map((ticker) => {
      if (ticker.market_id == bigone_ticker) {
        tPercent = Number(ticker.daily_change_perc) / 100;
      }
    });

  if (data.blocksence_tickers && data.blocksence_tickers.data && blocksence_ticker) {
    for (var ticker in data.blocksence_tickers.data) {
      if (ticker == blocksence_ticker) {
        tPercent = Number(data.blocksence_tickers.data[ticker].percent_change) / 100;
      }
    }
  }
  if (data.newdex_tickers && symbol)
    data.newdex_tickers.data.map((ticker) => {
      if (ticker.symbol == symbol) {
        tPercent = Number(ticker.change);
      }
    });
  return tPercent;
};

const renderMCVal = (mcVal, mcUnit, eos_price) => {
  return (
    <div>
      {mcUnit == 1 ? <img src={eoslogo} alt="eos" className="eos-unit" /> : '$'}
      {mcUnit == 1
        ? Number(mcVal).toLocaleString(undefined, {maximumFractionDigits: 0})
        : (Number(mcVal) * Number(eos_price)).toLocaleString(undefined, {maximumFractionDigits: 0})}
    </div>
  );
};
const renderMCPrice = (mcVal, mcUnit, eos_price) => {
  return (
    <div>
      {mcUnit == 1 ? <img src={eoslogo} alt="eos" className="eos-unit" /> : '$'}
      {mcUnit == 1
        ? Number(mcVal).toLocaleString(undefined, {maximumSignificantDigits: 4})
        : (Number(mcVal) * Number(eos_price)).toLocaleString(undefined, {maximumSignificantDigits: 4})}
    </div>
  );
};

export {
  convertUTCDateToLocalDate,
  renderAccountLink,
  renderBlockLink,
  renderTransactiontLink,
  renderTransLink,
  toTokenNumber,
  renderPerm,
  antispamCheck,
  RoundedIcon,
  gettPairPrice,
  gettPairPercent,
  renderProjectLink,
  renderMCVal,
  renderMCPrice
};
