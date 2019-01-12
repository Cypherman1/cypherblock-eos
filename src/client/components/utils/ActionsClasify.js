import React from 'react';
import {Link} from 'react-router-dom';
import {convertUTCDateToLocalDate, toTokenNumber, renderAccountLink, renderPerm} from './Tools';
import {renderConfNum} from './RenderColors';

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
  AG_VOTE,
  AT_BID_NAME,
  AT_ISSUE_TOKEN
} from '../utils/ConstTypes';

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
              action_component: ReceivedAction,
              action_style: {icon: 'fa-sign-in-alt', color: 'icon-received'},
              action_group: AG_TRANSFER_EOS
            };

            return ActionInfo;
          } else if (action_trace.act.data.from == account_name) {
            // sent EOS

            ActionInfo = {
              action_type: AT_SEND_EOS,
              action_component: SentAction,
              action_style: {icon: 'fa-sign-out-alt', color: 'icon-sent'},
              action_group: AG_TRANSFER_EOS
            };

            return ActionInfo;
            // return this.renderSentAction(action_trace);
          } else {
            // default transfer EOS action

            ActionInfo = {
              action_type: AT_TRANSFER_EOS,
              action_component: DefaultTransferAction,
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
                action_component: TokenReceivedAction,
                action_style: {icon: 'fa-sign-in-alt', color: 'icon-receivetoken'},
                action_group: AG_TRANSFER_TOKEN
              };

              return ActionInfo;
            } else if (action_trace.act.data.from == account_name) {
              // send other tokens

              ActionInfo = {
                action_type: AT_SEND_TOKEN,
                action_component: TokenSentAction,
                action_style: {icon: 'fa-sign-out-alt', color: 'icon-senttoken'},
                action_group: AG_TRANSFER_TOKEN
              };

              return ActionInfo;
            } else {
              // default transfer token action

              ActionInfo = {
                action_type: AT_TRANSFER_TOKEN,
                action_component: DefaultTokenTransferAction,
                action_style: {icon: 'fa-retweet', color: 'icon-default'},
                action_group: AG_TRANSFER_TOKEN
              };

              return ActionInfo;
            }
          } else {
            //other actions

            ActionInfo = {
              action_type: null,
              action_component: DefaultAction,
              action_style: {icon: 'fa-paper-plane', color: 'icon-default'},
              action_group: AG_OTHERS
            };

            return ActionInfo;
            // return this.renderDefaultAction(action_trace);
          }
      }
    case 'issue':
      ActionInfo = {
        action_type: AT_ISSUE_TOKEN,
        action_component: Issue,
        action_style: {icon: 'fa-paper-plane', color: 'icon-receivetoken'},
        action_group: AG_RESOURCES
      };

      return ActionInfo;

    case 'delegatebw':
      ActionInfo = {
        action_type: AT_STAKE,
        action_component: Delegatebw,
        action_style: {icon: 'fa-lock', color: 'icon-receivetoken'},
        action_group: AG_RESOURCES
      };

      return ActionInfo;
    case 'undelegatebw':
      ActionInfo = {
        action_type: AT_UNSTAKE,
        action_component: Undelegatebw,
        action_style: {icon: 'fa-unlock', color: 'icon-senttoken'},
        action_group: AG_RESOURCES
      };

      return ActionInfo;

    case 'buyram':
      ActionInfo = {
        action_type: AT_BUY_RAM,
        action_component: Buyram,
        action_style: {icon: 'fa-sign-in-alt', color: 'icon-receivetoken'},
        action_group: AG_RESOURCES
      };

      return ActionInfo;
    case 'buyrambytes':
      if (action_trace.act.account == 'eosio') {
        ActionInfo = {
          action_type: AT_BUY_RAM_BYTES,
          action_component: Buyrambytes,
          action_style: {icon: 'fa-sign-in-alt', color: 'icon-receivetoken'},
          action_group: AG_RESOURCES
        };

        return ActionInfo;
      } else {
        ActionInfo = {
          action_type: null,
          action_component: DefaultAction,
          action_style: {icon: 'fa-paper-plane', color: 'icon-default'},
          action_group: AG_OTHERS
        };

        return ActionInfo;
      }
    case 'sellram':
      ActionInfo = {
        action_type: AT_SELL_RAM,
        action_component: Sellram,
        action_style: {icon: 'fa-sign-out-alt', color: 'icon-senttoken'},
        action_group: AG_RESOURCES
      };

      return ActionInfo;
    case 'newaccount':
      ActionInfo = {
        action_type: AT_CREATE_ACCOUNT,
        action_component: NewAccount,
        action_style: {icon: 'fa-user-plus', color: 'icon-vote'},
        action_group: AG_ACCOUNT
      };

      return ActionInfo;
    case 'voteproducer':
      ActionInfo = {
        action_type: AT_VOTE_PRODUCERS,
        action_component: VoteProducers,
        action_style: {icon: 'fa-gavel', color: 'icon-vote'},
        action_group: AG_VOTE
      };

      return ActionInfo;
    case 'updateauth':
      ActionInfo = {
        action_type: AT_UPDATE_AUTH,
        action_component: UpdateAuth,
        action_style: {icon: 'fa-user-secret', color: 'icon-vote'},
        action_group: AG_ACCOUNT
      };

      return ActionInfo;
    case 'setabi':
      ActionInfo = {
        action_type: AT_SET_ABI,
        action_component: SetABI,
        action_style: {icon: 'fa-cogs', color: 'icon-vote'},
        action_group: AG_CONTRACT
      };

      return ActionInfo;
    case 'setcode':
      ActionInfo = {
        action_type: AT_SET_CODE,
        action_component: SetCode,
        action_style: {icon: 'fa-cogs', color: 'icon-vote'},
        action_group: AG_CONTRACT
      };

      return ActionInfo;
    case 'refund':
      ActionInfo = {
        action_type: AT_REFUND,
        action_component: Refund,
        action_style: {icon: 'fa-key', color: 'icon-vote'},
        action_group: AG_RESOURCES
      };

      return ActionInfo;
    case 'claimrewards':
      ActionInfo = {
        action_type: AT_CLAIMREWARDS,
        action_component: Claimrewards,
        action_style: {icon: 'fa-dollar-sign', color: 'icon-received'},
        action_group: AG_OTHERS
      };

      return ActionInfo;
    case 'canceldelay':
      ActionInfo = {
        action_type: AT_CANCELDELAY,
        action_component: CancelDelay,
        action_style: {icon: 'fa-ban', color: 'icon-default'},
        action_group: AG_OTHERS
      };

      return ActionInfo;
    case 'bidname':
      ActionInfo = {
        action_type: AT_BID_NAME,
        action_component: BidName,
        action_style: {icon: 'fa-hourglass', color: 'icon-vote'},
        action_group: AG_RESOURCES
      };

      return ActionInfo;
    default:
      ActionInfo = {
        action_type: null,
        action_component: DefaultAction,
        action_style: {icon: 'fa-paper-plane', color: 'icon-default'},
        action_group: AG_OTHERS
      };

      return ActionInfo;
  }
};

const renderData = (data) => {
  let items = [];
  if (typeof data == 'object') {
    for (var name in data) {
      if (
        [
          'sender',
          'receiver',
          'from',
          'to',
          'voter',
          'owner',
          'proxy',
          'account',
          'payee',
          'agent',
          'bettor',
          'recipient'
        ].indexOf(name) >= 0 &&
        name.length <= 12
      )
        items.push(
          <div key={name} className="row">
            <div className="col-4 col-sm-2  pr-0">{name}</div>
            <div className="col-8 col-sm-10">
              <Link to={`/account/${JSON.stringify(data[name]).substring(1, JSON.stringify(data[name]).length - 1)}`}>
                {JSON.stringify(data[name]).substring(1, JSON.stringify(data[name]).length - 1)}
              </Link>
              {/* <div> {JSON.stringify(data[name]).substring(1, JSON.stringify(data[name]).length - 1)} </div> */}
            </div>
          </div>
        );
      else
        items.push(
          <div key={name} className="row">
            <div className="col-4 col-sm-2  pr-0">{name}:</div>
            <div className="col-8 col-sm-10 aln-text">
              <div> {JSON.stringify(data[name]).substring(1, JSON.stringify(data[name]).length - 1)} </div>
            </div>
          </div>
        );
    }
    return <div>{items}</div>;
  } else if (typeof data == 'string') {
    return <div className="wordbreak">{data}</div>;
  }
  return null;
};
const DefaultAction = ({action_trace}) => {
  return <div className="pt-1 pb-1">{renderData(action_trace.act.data)}</div>;
};
const renderConfirmation = (block_num, head_block_num) => {
  if (block_num && head_block_num && Number(head_block_num) >= Number(block_num))
    return (
      <div className="d-inline">
        Confirmations{' '}
        <strong className="text-light bg-info rounded  pd-confirm">
          {renderConfNum(Number(head_block_num) - Number(block_num))}
        </strong>
      </div>
    );
  return null;
};

export const renderBlockStatus = (block_num, last_irreversible_block, head_block_num, get_block_status) => {
  if (get_block_status) {
    return <div />;
  } else {
    if (Number(last_irreversible_block) >= Number(block_num) || Number(head_block_num) - Number(block_num) > 370) {
      return <span className="badge badge-success pad-3 ftz-9 font-weight-normal">Irreversible</span>;
      // return <div className="d-inline bg-success text-light rounded irr-mark ">Irreversible</div>;
    }
    return renderConfirmation(block_num, head_block_num);
  }
};

export const renderTime = (time) => {
  return <div data-title="Time">{convertUTCDateToLocalDate(new Date(time)).toLocaleString()}</div>;
};
const ActType = ({bg, isDarkMode, children}) => {
  return (
    <span className={` ${isDarkMode ? 'bg-transparent' : 'bg-white'}  ${bg}  ftz-13 font-weight-acttype`}>
      {children}
    </span>
  );
};
const ReceivedAction = ({action_trace}) => {
  return (
    <div className="pt-1 pb-1">
      <div className="actinfo-font">
        {renderAccountLink(action_trace.act.data.to)} {' received '}
        <strong className="text-info ">{toTokenNumber(action_trace.act.data.quantity)}</strong> {` from `}
        {renderAccountLink(action_trace.act.data.from)}
      </div>
      <div className="aln-text actinfo-font">
        <strong className="">{`Memo:`}</strong>
        {action_trace.act.data.memo}
      </div>
    </div>
  );
};
const SentAction = ({action_trace}) => {
  return (
    <div className="pt-1 pb-1">
      <div className="actinfo-font">
        {renderAccountLink(action_trace.act.data.from)} {' sent '}
        <strong className="text-info ">{toTokenNumber(action_trace.act.data.quantity)}</strong> {` to `}
        {renderAccountLink(action_trace.act.data.to)}
      </div>
      <div className="aln-text actinfo-font">
        <strong className="">{`Memo:`}</strong>
        {action_trace.act.data.memo}
      </div>
    </div>
  );
};

const DefaultTransferAction = ({action_trace}) => {
  return (
    <div className="pt-1 pb-1">
      <div className="actinfo-font">
        {renderAccountLink(action_trace.act.data.from)} {' transfered '}
        <strong className="text-info ">{toTokenNumber(action_trace.act.data.quantity)}</strong> {` to `}
        {renderAccountLink(action_trace.act.data.to)}
      </div>
      <div className="aln-text actinfo-font">
        <strong className="">{`Memo:`}</strong>
        {action_trace.act.data.memo}
      </div>
    </div>
  );
};

const Issue = ({action_trace}) => {
  return (
    <div className="pt-1 pb-1">
      <div className="actinfo-font">
        {renderAccountLink(action_trace.act.account)} {' issued '}
        <strong className="text-info ">{toTokenNumber(action_trace.act.data.quantity)}</strong> {` to `}
        {renderAccountLink(action_trace.act.data.to)}
      </div>
      <div className="aln-text actinfo-font">
        <strong className="">{`Memo:`}</strong>
        {action_trace.act.data.memo}
      </div>
    </div>
  );
};

const TokenReceivedAction = ({action_trace}) => {
  return (
    <div className="pt-1 pb-1">
      <div className="actinfo-font">
        {renderAccountLink(action_trace.act.data.to)} {' received '}
        <strong className="text-info ">{toTokenNumber(action_trace.act.data.quantity)}</strong> {` from `}
        {renderAccountLink(action_trace.act.data.from)}
      </div>
      <div className="aln-text actinfo-font">
        <strong className="">{`Memo:`}</strong>
        {action_trace.act.data.memo}
      </div>
    </div>
  );
};

const TokenSentAction = ({action_trace}) => {
  return (
    <div className="pt-1 pb-1">
      <div className="actinfo-font">
        {renderAccountLink(action_trace.act.data.from)} {' sent '}
        <strong className="text-info ">{toTokenNumber(action_trace.act.data.quantity)}</strong> {` to `}
        {renderAccountLink(action_trace.act.data.to)}
      </div>
      <div className="aln-text actinfo-font">
        <strong className="">{`Memo:`}</strong>
        {action_trace.act.data.memo}
      </div>
    </div>
  );
};

const DefaultTokenTransferAction = ({action_trace}) => {
  return (
    <div className="pt-1 pb-1">
      <div className="actinfo-font">
        {renderAccountLink(action_trace.act.data.from)} {' transfered '}
        <strong className="text-info ">{toTokenNumber(action_trace.act.data.quantity)}</strong> {` to `}
        {renderAccountLink(action_trace.act.data.to)}
      </div>
      <div className="aln-text actinfo-font">
        <strong className="">{`Memo:`}</strong>
        {action_trace.act.data.memo}
      </div>
    </div>
  );
};

const Delegatebw = ({action_trace}) => {
  return (
    <div className="pt-1 pb-1">
      <div className="actinfo-font">
        {renderAccountLink(action_trace.act.data.from)}
        {` delegated `}
        <strong className="text-info ">{toTokenNumber(action_trace.act.data.stake_net_quantity)}</strong>
        {` for NET and `}
        <strong className="text-info ">{toTokenNumber(action_trace.act.data.stake_cpu_quantity)}</strong>
        {` for CPU to `}
        {renderAccountLink(action_trace.act.data.receiver)}
      </div>
    </div>
  );
};

const BidName = ({action_trace}) => {
  return (
    <div className="pt-1 pb-1">
      <div className="actinfo-font">
        {renderAccountLink(action_trace.act.data.bidder)}
        {` bided `}
        <strong className="text-info">{toTokenNumber(action_trace.act.data.bid)}</strong> {` on name `}
        {renderAccountLink(action_trace.act.data.newname)}
      </div>
    </div>
  );
};

const Undelegatebw = ({action_trace}) => {
  return (
    <div data-title="Info" className="pt-1 pb-1" key="2">
      <div className="actinfo-font">
        {renderAccountLink(action_trace.act.data.from)}
        {` undelegated `}
        <strong className="text-info ">{toTokenNumber(action_trace.act.data.unstake_net_quantity)}</strong>
        {`  NET and `}
        <strong className="text-info ">{toTokenNumber(action_trace.act.data.unstake_cpu_quantity)}</strong>
        {` CPU. Refund to `}
        {renderAccountLink(action_trace.act.data.receiver)}
      </div>
    </div>
  );
};

const Buyram = ({action_trace}) => {
  return (
    <div className="pt-1 pb-1">
      <div className="actinfo-font">
        {renderAccountLink(action_trace.act.data.payer)}
        {` bought `}
        <strong className="text-info">{toTokenNumber(action_trace.act.data.quant)}</strong> {` RAM for `}
        {renderAccountLink(action_trace.act.data.receiver)}
      </div>
    </div>
  );
};
const Buyrambytes = ({action_trace}) => {
  return (
    <div className="pt-1 pb-1">
      <div className="actinfo-font">
        {renderAccountLink(action_trace.act.data.payer)}
        {` bought `}
        <strong className="text-info">{action_trace.act.data.bytes}</strong> {`bytes RAM for `}
        {renderAccountLink(action_trace.act.data.receiver)}
      </div>
    </div>
  );
};
const Sellram = ({action_trace}) => {
  return (
    <div className="pt-1 pb-1">
      <div className="actinfo-font">
        {renderAccountLink(action_trace.act.data.account)}
        {` sold `}
        <strong className="text-info">{action_trace.act.data.bytes}</strong> {`bytes RAM `}
        {/* {this.renderAccountLink(action.action_trace.act.data.receiver)} */}
      </div>
    </div>
  );
};

const VoteProducers = ({action_trace}) => {
  if (!action_trace.act.data.proxy)
    return (
      <div className="pt-1 pb-1">
        <div className="actinfo-font">
          {renderAccountLink(action_trace.act.data.voter)} {' voted for producers: '}{' '}
        </div>
        <div className="actinfo-font"> {RenderProducers(action_trace.act.data.producers)} </div>
      </div>
    );
  else
    return (
      <div className="pt-1 pb-1">
        <div className="actinfo-font">
          {renderAccountLink(action_trace.act.data.voter)} {' voted the stake through proxy: '}{' '}
          {renderAccountLink(action_trace.act.data.proxy)}
        </div>
      </div>
    );
};
const RenderProducers = (producers) => {
  let items = [];
  if (producers.length > 0)
    producers.map((producer) => {
      items.push(<strong key={producer}>{renderAccountLink(producer)} </strong>);
    });
  else items.push(<strong key="1">Noone </strong>);
  return items;
};

const NewAccount = ({action_trace}) => {
  return (
    <div className="pt-1 pb-1">
      <div className="actinfo-font">
        {renderAccountLink(action_trace.act.data.name)} {' created by '}
        {renderAccountLink(action_trace.act.data.creator)}
      </div>
    </div>
  );
};

const UpdateAuth = ({action_trace}) => {
  if (action_trace.act.data.auth)
    return (
      <div className="pt-1 pb-1 row" key="2">
        <div className="actinfo-font col-12 col-sm-5">
          {renderAccountLink(action_trace.act.data.account)} {' update permission: '}
        </div>

        <div className="col-12 col-sm-7">
          {renderPerm(
            action_trace.act.data.permission,
            action_trace.act.data.auth.threshold,
            action_trace.act.data.auth.accounts,
            action_trace.act.data.auth.keys,
            action_trace.act.data.account
          )}
        </div>
      </div>
    );
  else {
    return (
      <div data-title="Info" className="pt-1 pb-1" key="2">
        {renderData(action_trace.act.data)}
      </div>
    );
  }
};
// const RenderAuth = (auth) => {
//   // if (auth.keys.length > 0) {
//   //   return this.RenderKeys(auth.keys);
//   // } else if (auth.accounts.length > 0) {
//   //   return this.RenderAccounts(auth.accounts);
//   // }
//   return RenderAccounts(auth.accounts, auth.keys);
// };

// const RenderAccounts = (accounts, keys) => {
//   let items = [];
//   items.push(
//     <div className="row m-0" key={1}>
//       <div className="col-8  mb-1 mr-1 ml-0 p-0  border-bottom">Accounts/Keys</div>
//       <div className="col  text-center m-1 p-0 border-bottom">Weight</div>
//     </div>
//   );
//   if (accounts)
//     accounts.map((account) => {
//       items.push(
//         <div key={account.permission.actor} className="row">
//           <div className="col-8">
//             {renderAccountLink(account.permission.actor)} (permission: {account.permission.permission}){' '}
//           </div>
//           <div className="col-4 text-center">{account.weight}</div>
//         </div>
//       );
//     });
//   if (keys)
//     keys.map((key) => {
//       items.push(
//         <div key={key.key} className="row">
//           <div className="col-8">{key.key}</div>
//           <div className="col-4 text-center">{key.weight}</div>
//         </div>
//       );
//     });
//   return items;
// };

const SetABI = ({action_trace}) => {
  return (
    <div data-title="Info" className="pt-1 pb-1" key="2">
      <div className="actinfo-font">
        {renderAccountLink(action_trace.act.data.account)} set ABI.{' '}
        <Link to={`/abi/${action_trace.act.data.account}`}>View abi</Link>
      </div>
    </div>
  );
};
const SetCode = ({action_trace}) => {
  return (
    <div data-title="Info" className="pt-1 pb-1 " key="2">
      <div className="actinfo-font">
        {renderAccountLink(action_trace.act.data.account)} set code.{' '}
        {/* <Link to={`/code/${action_trace.act.data.account}`}>View code</Link> */}
      </div>
      <div />
    </div>
  );
};

const Refund = ({action_trace}) => {
  return (
    <div className="pt-1 pb-1">
      <div className="actinfo-font">Refunded for {renderAccountLink(action_trace.act.data.owner)} </div>
    </div>
  );
};
const Claimrewards = ({action_trace}) => {
  return (
    <div className="pt-1 pb-1">
      <div className="actinfo-font">{renderAccountLink(action_trace.act.data.owner)} claim rewards</div>
    </div>
  );
};
const CancelDelay = ({action_trace}) => {
  return (
    <div className="row">
      <div className="col-4 ">Actor:</div>
      <div className="col-8 aln-text">
        <div> {renderAccountLink(action_trace.act.data.canceling_auth.actor)} </div>
      </div>
      <div className="col-4 ">Permission:</div>
      <div className="col-8 aln-text text-info">
        <div> {action_trace.act.data.canceling_auth.permission} </div>
      </div>
      <div className="col-4 ">Trx:</div>
      <div className="col-8 aln-text">
        <div> {action_trace.act.data.trx_id} </div>
      </div>
    </div>
  );
};

export const RenderAct = (action_trace, account_name, trx_id, isDarkMode) => {
  let ActionInfo = classifyAction(action_trace, account_name);

  const {action_type, action_component, action_style} = ActionInfo;
  const {icon, color} = action_style;

  const ActCompnent = action_component;

  let items = [];
  items.push(<ActSign key="0" icon={icon} color={color} trx_id={trx_id} />);
  items.push(
    <ActType bg={color} isDarkMode={isDarkMode} key="1">
      {action_type ? action_type : action_trace.act.name}
    </ActType>
  );
  items.push(<ActCompnent action_trace={action_trace} key="2" />);
  return items;
};

const ActSign = ({icon, color, trx_id}) => {
  return (
    <Link to={`/transaction/${trx_id}`}>
      <div className="d-inline-block pt-act-icon">
        <span className="fa-stack fa-lg">
          <i className={`fa fas fa-circle fa-stack-2x ${color}`} />
          <i className={`fa fas  ${icon} fa-stack-1x text-light`} />
        </span>
      </div>
    </Link>
  );
};
