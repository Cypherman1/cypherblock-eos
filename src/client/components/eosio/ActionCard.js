import React from 'react';
import {Link} from 'react-router-dom';
import {convertUTCDateToLocalDate, toTokenNumber, renderAccountLink} from '../utils/Tools';
import {renderBlockNum} from '../utils/RenderColors';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import JSONPretty from 'react-json-pretty';

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
            <div className="col-4 col-sm-2 font-weight-bold pr-0">{name}</div>
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
            <div className="col-4 col-sm-2 font-weight-bold pr-0">{name}:</div>
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
        <span className="text-light bg-info rounded font-weight-bold pd-confirm">
          {renderBlockNum(Number(head_block_num) - Number(block_num))}
        </span>
      </div>
    );
  return null;
};
const renderBlockStatus = (block_num, last_irreversible_block, head_block_num, get_block_status) => {
  if (get_block_status) {
    return <div />;
  } else {
    if (Number(last_irreversible_block) >= Number(block_num) || Number(head_block_num) - Number(block_num) > 370) {
      return <div className="d-inline bg-success text-light rounded irr-mark ">Irreversible</div>;
    }
    return renderConfirmation(block_num, head_block_num);
  }
};
const renderAuthorization = (auths) => {
  let items = [];
  if (auths)
    auths.map((auth) => {
      items.push(
        <div className="col-12 col-sm-12 col-md-12 p-0" key={auth.actor}>
          <div className="row m-0 pr-1">
            <div className="col-12 col-sm-12 col-md-6 p-0 pr-1 pl-1 stat-col">
              {/* <div className="stat-icon">
                              <FontAwesomeIcon icon="dollar-sign" />
                            </div> */}
              <div className="stat">
                <div className="value">{renderAccountLink(auth.actor)}</div>
                <div className="name">Actor</div>
              </div>
              <div className="progress stat-progress">
                <div
                  className="progress-bar"
                  style={{
                    width: `0%`
                  }}
                />
              </div>
            </div>
            <div className="col-12 col-sm-12 col-md-6 p-0 pr-1 pl-1 stat-col">
              {/* <div className="stat-icon">
                              <FontAwesomeIcon icon="dollar-sign" />
                            </div> */}
              <div className="stat">
                <div className="value text-info">{auth.permission}</div>
                <div className="name">Permission</div>
              </div>
              <div className="progress stat-progress">
                <div
                  className="progress-bar"
                  style={{
                    width: `0%`
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      );
    });
  // else items.push(<span>Noone </span>);
  return items;
};
const renderTime = (time) => {
  return <div data-title="Time">{convertUTCDateToLocalDate(new Date(time)).toLocaleString()}</div>;
};
const ActType = ({bg, children}) => {
  return <span className={`bg-light ${bg} font-weight-bold ftz-13`}>{children}</span>;
};
const ReceivedAction = ({action_trace}) => {
  return (
    <div className="pt-1 pb-1">
      <div className="actinfo-font">
        {renderAccountLink(action_trace.act.data.to)} {' received '}
        <span className="text-info font-weight-bold">{toTokenNumber(action_trace.act.data.quantity)}</span> {` from `}
        {renderAccountLink(action_trace.act.data.from)}
      </div>
      <div className="aln-text actinfo-font">
        <span className="font-weight-bold">{`Memo:`}</span>
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
        <span className="text-info font-weight-bold">{toTokenNumber(action_trace.act.data.quantity)}</span> {` to `}
        {renderAccountLink(action_trace.act.data.to)}
      </div>
      <div className="aln-text actinfo-font">
        <span className="font-weight-bold">{`Memo:`}</span>
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
        <span className="text-info font-weight-bold">{toTokenNumber(action_trace.act.data.quantity)}</span> {` to `}
        {renderAccountLink(action_trace.act.data.to)}
      </div>
      <div className="aln-text actinfo-font">
        <span className="font-weight-bold">{`Memo:`}</span>
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
        <span className="text-info font-weight-bold">{toTokenNumber(action_trace.act.data.quantity)}</span> {` from `}
        {renderAccountLink(action_trace.act.data.from)}
      </div>
      <div className="aln-text actinfo-font">
        <span className="font-weight-bold">{`Memo:`}</span>
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
        <span className="text-info font-weight-bold">{toTokenNumber(action_trace.act.data.quantity)}</span> {` to `}
        {renderAccountLink(action_trace.act.data.to)}
      </div>
      <div className="aln-text actinfo-font">
        <span className="font-weight-bold">{`Memo:`}</span>
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
        <span className="text-info font-weight-bold">{toTokenNumber(action_trace.act.data.quantity)}</span> {` to `}
        {renderAccountLink(action_trace.act.data.to)}
      </div>
      <div className="aln-text actinfo-font">
        <span className="font-weight-bold">{`Memo:`}</span>
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
        <span className="text-info">{toTokenNumber(action_trace.act.data.stake_net_quantity)}</span> {` for NET and `}
        <span className="text-info">{toTokenNumber(action_trace.act.data.stake_cpu_quantity)}</span> {` for CPU to `}
        {renderAccountLink(action_trace.act.data.receiver)}
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
        <span className="text-info">{toTokenNumber(action_trace.act.data.unstake_net_quantity)}</span> {`  NET and `}
        <span className="text-info">{toTokenNumber(action_trace.act.data.unstake_cpu_quantity)}</span>{' '}
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
        <span className="text-info">{toTokenNumber(action_trace.act.data.quant)}</span> {` RAM for `}
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
        <span className="text-info">{action_trace.act.data.bytes}</span> {`bytes RAM for `}
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
        <span className="text-info">{action_trace.act.data.bytes}</span> {`bytes RAM `}
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
      items.push(<span key={producer}>{renderAccountLink(producer)} </span>);
    });
  else items.push(<span key="1">Noone </span>);
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
      <div data-title="Info" className="pt-1 pb-1" key="2">
        <div className="actinfo-font">
          {renderAccountLink(action_trace.act.data.account)} {' set '}
          <span className="font-weight-bold text-info"> {action_trace.act.data.permission} </span>
          {' permission as: '}
        </div>
        <div>
          <span className="font-weight-bold"> {'Threshold:'} </span> {action_trace.act.data.auth.threshold}
        </div>
        <div>{RenderAuth(action_trace.act.data.auth)}</div>
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
const RenderAuth = (auth) => {
  // if (auth.keys.length > 0) {
  //   return this.RenderKeys(auth.keys);
  // } else if (auth.accounts.length > 0) {
  //   return this.RenderAccounts(auth.accounts);
  // }
  return RenderAccounts(auth.accounts, auth.keys);
};

const RenderAccounts = (accounts, keys) => {
  let items = [];
  items.push(
    <div className="row m-0" key={1}>
      <div className="col-8 font-weight-bold mb-1 mr-1 ml-0 p-0  border-bottom">Accounts/Keys</div>
      <div className="col font-weight-bold text-center m-1 p-0 border-bottom">Weight</div>
    </div>
  );
  if (accounts)
    accounts.map((account) => {
      items.push(
        <div key={account.permission.actor} className="row">
          <div className="col-8">
            {renderAccountLink(account.permission.actor)} (permission: {account.permission.permission}){' '}
          </div>
          <div className="col-4 text-center">{account.weight}</div>
        </div>
      );
    });
  if (keys)
    keys.map((key) => {
      items.push(
        <div key={key.key} className="row">
          <div className="col-8">{key.key}</div>
          <div className="col-4 text-center">{key.weight}</div>
        </div>
      );
    });
  return items;
};

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
        <Link to={`/code/${action_trace.act.data.account}`}>View code</Link>
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
      <div className="col-4 font-weight-bold">Actor:</div>
      <div className="col-8 aln-text">
        <div> {renderAccountLink(action_trace.act.data.canceling_auth.actor)} </div>
      </div>
      <div className="col-4 font-weight-bold">Permission:</div>
      <div className="col-8 aln-text text-info">
        <div> {action_trace.act.data.canceling_auth.permission} </div>
      </div>
      <div className="col-4 font-weight-bold">Trx:</div>
      <div className="col-8 aln-text">
        <div> {action_trace.act.data.trx_id} </div>
      </div>
    </div>
  );
};

const RenderAction = (action_trace, account_name, trx_id) => {
  let items = [];
  switch (action_trace.act.name) {
    case 'transfer': // transfer EOS or tokens
      switch (action_trace.act.account) {
        case 'eosio.token': // transfer EOS
          if (action_trace.receipt.receiver == account_name && action_trace.act.data.to == account_name) {
            // received EOS
            items.push(<ActSign key="0" icon="fa-sign-in" color="icon-received" trx_id={trx_id} />);
            items.push(
              <ActType bg="icon-received" key="1">
                Receive EOS
              </ActType>
            );
            items.push(<ReceivedAction action_trace={action_trace} key="2" />);
            return items;
          } else if (action_trace.act.data.from == account_name) {
            // sent EOS
            items.push(<ActSign key="0" icon="fa-sign-out" color="icon-sent" trx_id={trx_id} />);
            items.push(
              <ActType bg="icon-sent" key="1">
                Send EOS
              </ActType>
            );
            items.push(<SentAction action_trace={action_trace} key="2" />);
            return items;
            // return this.renderSentAction(action_trace);
          } else {
            // default transfer action
            items.push(<ActSign key="0" icon="fa-retweet" color="icon-default" trx_id={trx_id} />);
            items.push(
              <ActType bg="icon-default" key="1">
                Transfer
              </ActType>
            );
            items.push(<DefaultTransferAction action_trace={action_trace} key="2" />);
            return items;
          }
        default:
          if (action_trace.act.data.quantity) {
            if (action_trace.receipt.receiver == account_name && action_trace.act.data.to == account_name) {
              // receive other tokens
              items.push(<ActSign key="0" icon="fa-sign-in" color="icon-receivetoken" trx_id={trx_id} />);
              items.push(
                <ActType bg="icon-receivetoken" key="1">
                  Receive token
                </ActType>
              );
              items.push(<TokenReceivedAction action_trace={action_trace} key="2" />);
              return items;
              // return this.renderTokenReceivedAction(action_trace);
            } else if (action_trace.act.data.from == account_name) {
              // send other tokens
              items.push(<ActSign key="0" icon="fa-sign-out" color="icon-senttoken" trx_id={trx_id} />);
              items.push(
                <ActType bg="icon-senttoken" key="1">
                  Send token
                </ActType>
              );
              items.push(<TokenSentAction action_trace={action_trace} key="2" />);
              return items;
              // return this.renderTokenSentAction(action_trace);
            } else {
              items.push(<ActSign key="0" icon="fa-retweet" color="icon-default" trx_id={trx_id} />);
              items.push(
                <ActType bg="icon-default" key="1">
                  Transfer
                </ActType>
              );
              items.push(<DefaultTokenTransferAction action_trace={action_trace} key="2" />);
              return items;
              // return this.renderDefaultTokenTransferAction(action_trace);
            }
          } else {
            items.push(<ActSign key="0" icon="fa-paper-plane" color="icon-default" trx_id={trx_id} />);
            items.push(
              <ActType bg="icon-default" key="1">
                {action_trace.act.name}
              </ActType>
            );
            items.push(<DefaultAction action_trace={action_trace} key="2" />);
            return items;
            // return this.renderDefaultAction(action_trace);
          }
      }
    case 'delegatebw':
      items.push(<ActSign key="0" icon="fa-lock" color="icon-receivetoken" trx_id={trx_id} />);
      items.push(
        <ActType bg="icon-receivetoken" key="1">
          Stake
        </ActType>
      );
      items.push(<Delegatebw action_trace={action_trace} key="2" />);
      return items;
    case 'undelegatebw':
      items.push(<ActSign key="0" icon="fa-unlock" color="icon-sent" trx_id={trx_id} />);
      items.push(
        <ActType bg="icon-sent" key="1">
          Unstake
        </ActType>
      );
      items.push(<Undelegatebw action_trace={action_trace} key="2" />);
      return items;
    case 'buyram':
      items.push(<ActSign key="0" icon="fa-sign-in" color="icon-receivetoken" trx_id={trx_id} />);
      items.push(
        <ActType bg="icon-receivetoken" key="1">
          Buy RAM
        </ActType>
      );
      items.push(<Buyram action_trace={action_trace} key="2" />);
      return items;
    case 'buyrambytes':
      if (action_trace.act.account == 'eosio') {
        items.push(<ActSign key="0" icon="fa-sign-in" color="icon-receivetoken" trx_id={trx_id} />);
        items.push(
          <ActType bg="icon-receivetoken" key="1">
            Buy RAM
          </ActType>
        );
        items.push(<Buyrambytes action_trace={action_trace} key="2" />);
        return items;
      } else {
        items.push(<ActSign key="0" icon="fa-paper-plane" color="icon-default" trx_id={trx_id} />);
        items.push(
          <ActType bg="icon-default" key="1">
            {action_trace.act.name}
          </ActType>
        );
        items.push(<DefaultAction action_trace={action_trace} key="2" />);
        return items;
      }
    case 'sellram':
      items.push(<ActSign key="0" icon="fa-sign-out" color="icon-senttoken" trx_id={trx_id} />);
      items.push(
        <ActType bg="icon-senttoken" key="1">
          Sell RAM
        </ActType>
      );
      items.push(<Sellram action_trace={action_trace} key="2" />);
      return items;
    case 'newaccount':
      items.push(<ActSign key="0" icon="fa-user-plus" color="icon-vote" trx_id={trx_id} />);
      items.push(
        <ActType bg="icon-vote" key="1">
          Create Account
        </ActType>
      );
      items.push(<NewAccount action_trace={action_trace} key="2" />);
      return items;
    case 'voteproducer':
      items.push(<ActSign key="0" icon="fa-gavel" color="icon-vote" trx_id={trx_id} />);
      items.push(
        <ActType bg="icon-vote" key="1">
          Vote Producer
        </ActType>
      );
      items.push(<VoteProducers action_trace={action_trace} key="2" />);
      return items;
    case 'updateauth':
      items.push(<ActSign key="0" icon="fa-user-secret" color="icon-vote" trx_id={trx_id} />);
      items.push(
        <ActType bg="icon-vote" key="1">
          Update Authorization
        </ActType>
      );
      items.push(<UpdateAuth action_trace={action_trace} key="2" />);
      return items;
    case 'setabi':
      items.push(<ActSign key="0" icon="fa-cogs" color="icon-vote" trx_id={trx_id} />);
      items.push(
        <ActType bg="icon-vote" key="1">
          Set ABI
        </ActType>
      );
      items.push(<SetABI action_trace={action_trace} key="2" />);
      return items;
    case 'setcode':
      items.push(<ActSign key="0" icon="fa-cogs" color="icon-vote" trx_id={trx_id} />);
      items.push(
        <ActType bg="icon-vote" key="1">
          Set Code
        </ActType>
      );
      items.push(<SetCode action_trace={action_trace} key="2" />);
      return items;
    case 'refund':
      items.push(<ActSign key="0" icon="fa-key" color="icon-vote" trx_id={trx_id} />);
      items.push(
        <ActType bg="icon-vote" key="1">
          Refund
        </ActType>
      );
      items.push(<Refund action_trace={action_trace} key="2" />);
      return items;
    case 'claimrewards':
      items.push(<ActSign key="0" icon="fa-dollar" color="icon-received" trx_id={trx_id} />);
      items.push(
        <ActType bg="icon-vote" key="1">
          Claim Rewards
        </ActType>
      );
      items.push(<Claimrewards action_trace={action_trace} key="2" />);
      return items;
    case 'canceldelay':
      items.push(<ActSign key="0" icon="fa-hand-stop-o" color="icon-default" trx_id={trx_id} />);
      items.push(
        <ActType bg="icon-default" key="1">
          Cancel Delay
        </ActType>
      );
      items.push(<CancelDelay action_trace={action_trace} key="2" />);
      return items;
    default:
      items.push(<ActSign key="0" icon="fa-paper-plane" color="icon-default" trx_id={trx_id} />);
      items.push(
        <ActType bg="icon-default" key="1">
          {action_trace.act.name}
        </ActType>
      );
      items.push(<DefaultAction action_trace={action_trace} key="2" />);
      return items;
    // items.push(<ActType bg="bg-secondary{"> {action_trace.act.name} </ActType>);
    // items.push(<DefaultAction action_trace={action_trace}> </DefaultAction>);
    // return items;
  }
};
const ActSign = ({icon, color, trx_id}) => {
  return (
    <Link to={`/transaction/${trx_id}`}>
      <div className="d-inline-block pt-act-icon">
        <span className="fa-stack fa-lg">
          <i className={`fa fa-circle fa-stack-2x ${color}`} />
          <i className={`fa ${icon} fa-stack-1x text-light`} />
        </span>
      </div>
    </Link>
  );
};

const ActionCommon = ({
  action_trace,
  block_time,
  account_name,
  block_num,
  last_irreversible_block,
  head_block_num,
  get_block_status,
  trx_id,
  children
}) => {
  return (
    <div className="card ftz-11 mb-1 shadow-sm" key={action_trace.receipt.global_sequence}>
      <div className="card-header bg-light shadow-sm act-head-height pt-1">
        <div className="row w-100 m-0">
          {children[0]}

          <div className="col pl-1 pr-0">
            <div className="">{children[1]}</div>
            <div className="pb-1">
              {renderBlockStatus(block_num, last_irreversible_block, head_block_num, get_block_status)}
            </div>
          </div>
          <div className="col text-right pr-2 pl-0 pt-1">
            <div className="act-date-fz"> {renderTime(block_time)} </div>
            <div>Receiver: {renderAccountLink(action_trace.receipt.receiver)}</div>
          </div>
        </div>
      </div>

      <div className="card-body p-1">
        {/* {this.renderActions(action_trace, account_name)} */}
        <div className="row m-0">
          <div className="col-12 p-0">
            <div className="row m-0">
              <div className="card sameheight-item mb-0 border-0 w-100 " data-exclude="xs">
                <div className="pr-2 pl-2"> {children[2]} </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="card-footer border-light action_fp">
        <div className="w-100 ml-1 pr-1">
          <a
            className="badge badge-warning text-light float-right"
            data-toggle="collapse"
            href={`#collapse${action_trace.receipt.global_sequence}`}
            role="button"
            aria-expanded="false"
            aria-controls={`collapse${action_trace.receipt.global_sequence}`}
          >
            <FontAwesomeIcon icon="code" className="mr-0 text-light" /> JSON
          </a>
          <div className="collapse" id={`collapse${action_trace.receipt.global_sequence}`}>
            <JSONPretty id="json-pretty" json={action_trace} className="my-json-pretty" />
          </div>
        </div>
      </div>
    </div>
  );
};

const ActionCard = ({
  action_trace,
  block_time,
  account_name,
  block_num,
  last_irreversible_block,
  head_block_num,
  get_block_status,
  trx_id
}) => {
  return (
    <ActionCommon
      action_trace={action_trace}
      block_time={block_time}
      account_name={account_name}
      block_num={block_num}
      last_irreversible_block={last_irreversible_block}
      head_block_num={head_block_num}
      get_block_status={get_block_status}
      trx_id={trx_id}
    >
      {RenderAction(action_trace, account_name, trx_id)}
    </ActionCommon>
  );
};

export default ActionCard;
