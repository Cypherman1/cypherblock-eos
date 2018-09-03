import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {convertUTCDateToLocalDate} from '../utils/Tools';
import {renderBlockNum} from '../utils/RenderColors';

class Action extends Component {
  renderData(data) {
    let items = [];
    if (typeof data == 'object') {
      for (var name in data) {
        if (['sender', 'receiver', 'from', 'to', 'voter', 'owner', 'proxy'].indexOf(name) >= 0)
          items.push(
            <div key={name} className="row">
              <div className="col-3">{name}</div>
              <div className="col-9">
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
              <div className="col-3">{name}</div>
              <div className="col-9">
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
  }
  renderSeq(seq, block_num, last_irreversible_block, head_block_num, trx_id) {
    if (Number(last_irreversible_block) >= Number(block_num))
      return (
        <td data-title="#" className="infostyle">
          <div>
            <Link to={`/transaction/${trx_id}`}>{seq}</Link>
          </div>
          <div className="d-inline bg-success text-light rounded irr-mark ">Irreversible</div>
        </td>
      );
    return (
      <td data-title="#" className="infostyle">
        <div>
          <Link to={`/transaction/${trx_id}`}>{seq}</Link>
        </div>
        {this.renderConfirmation(block_num, head_block_num)}
      </td>
    );
  }
  renderConfirmation(block_num, head_block_num) {
    if (block_num && head_block_num && Number(head_block_num) >= Number(block_num))
      return (
        <div className="d-inline">
          Confirmations:<span className="text-danger bold">
            {renderBlockNum(Number(head_block_num) - Number(block_num))}
          </span>
        </div>
      );
    return null;
  }

  renderTime(time) {
    return <td data-title="Time">{convertUTCDateToLocalDate(new Date(time)).toLocaleString()}</td>;
  }
  renderDefaultAction(action_trace) {
    let items = [];
    items.push(
      <td data-title="Type" key="1">
        <div className=" p-1 d-inline bg-default text-light rounded ">{action_trace.act.name}</div>
        <div className=" p-1">{this.renderAccountLink(action_trace.act.account)}</div>
      </td>
    );
    items.push(
      <td data-title="Info" className="pt-1 pb-1" key="2">
        {this.renderData(action_trace.act.data)}
      </td>
    );

    return items;
  }
  renderDefaultTransferAction(action_trace) {
    let items = [];
    items.push(
      <td data-title="Type" key="1">
        <div className=" p-1 d-inline bg-default text-light rounded ">Transfer</div>
      </td>
    );
    items.push(
      <td data-title="Info" className="pt-1 pb-1" key="2">
        <div className="actinfo-font">
          {this.renderAccountLink(action_trace.act.data.from)} {' transfered '}
          <span className="text-info">{action_trace.act.data.quantity}</span> {` to `}
          {this.renderAccountLink(action_trace.act.data.to)}
        </div>
        <div className="aln-text">
          <span className="font-weight-bold">{`Memo: `}</span>
          {action_trace.act.data.memo}
        </div>
      </td>
    );

    return items;
  }
  renderDefaultTokenTransferAction(action_trace) {
    let items = [];
    items.push(
      <td data-title="Type" key="1">
        <div className=" p-1 d-inline bg-default text-light rounded ">Transfer</div>
        <div className=" p-1">{this.renderAccountLink(action_trace.act.account)}</div>
      </td>
    );
    items.push(
      <td data-title="Info" className="pt-1 pb-1" key="2">
        <div className="actinfo-font">
          {this.renderAccountLink(action_trace.act.data.from)} {' transfered '}
          <span className="text-info">{action_trace.act.data.quantity}</span> {` to `}
          {this.renderAccountLink(action_trace.act.data.to)}
        </div>
        <div className="aln-text">
          <span className="font-weight-bold">{`Memo: `}</span>
          {action_trace.act.data.memo}
        </div>
      </td>
    );

    return items;
  }
  renderAccountLink(accountName) {
    return <Link to={`/account/${accountName}`}>{accountName}</Link>;
  }
  renderReceivedAction(action_trace) {
    let items = [];
    items.push(
      <td data-title="Type" key="1">
        <div className=" p-1 d-inline bg-received text-light rounded ">Receive</div>
      </td>
    );
    items.push(
      <td data-title="Info" className="pt-1 pb-1" key="2">
        <div className="actinfo-font">
          {this.renderAccountLink(action_trace.act.data.to)} {' received '}
          <span className="text-info">{action_trace.act.data.quantity}</span> {` from `}
          {this.renderAccountLink(action_trace.act.data.from)}
        </div>
        <div className="aln-text">
          <span className="font-weight-bold">{`Memo: `}</span>
          {action_trace.act.data.memo}
        </div>
      </td>
    );

    return items;
  }
  renderTokenReceivedAction(action_trace) {
    let items = [];
    items.push(
      <td data-title="Type" key="1">
        <div className=" p-1 d-inline bg-received text-light rounded ">Receive(tokens)</div>
        <div className=" p-1">{this.renderAccountLink(action_trace.act.account)}</div>
      </td>
    );
    items.push(
      <td data-title="Info" className="pt-1 pb-1" key="2">
        <div className="actinfo-font">
          {this.renderAccountLink(action_trace.act.data.to)} {' received '}
          <span className="text-info">{action_trace.act.data.quantity}</span> {` from `}
          {this.renderAccountLink(action_trace.act.data.from)}
        </div>
        <div className="aln-text">
          <span className="font-weight-bold">{`Memo: `}</span>
          {action_trace.act.data.memo}
        </div>
      </td>
    );

    return items;
  }

  renderTokenSentAction(action_trace) {
    let items = [];
    items.push(
      <td data-title="Type" key="1">
        <div className=" p-1 d-inline bg-senttoken text-light rounded ">Send(tokens)</div>
        <div className=" p-1">{this.renderAccountLink(action_trace.act.account)}</div>
      </td>
    );
    items.push(
      <td data-title="Info" className="pt-1 pb-1" key="2">
        <div className="actinfo-font">
          {this.renderAccountLink(action_trace.act.data.from)} {' sent '}
          <span className="text-info">{action_trace.act.data.quantity}</span> {` to `}
          {this.renderAccountLink(action_trace.act.data.to)}
        </div>
        <div className="aln-text">
          <span className="font-weight-bold">{`Memo: `}</span>
          {action_trace.act.data.memo}
        </div>
      </td>
    );

    return items;
  }

  renderSentAction(action_trace) {
    let items = [];
    items.push(
      <td data-title="Type" key="1">
        <div className=" p-1 d-inline bg-sent text-light rounded ">send</div>
        {/* <div className=" p-1">{this.renderAccountLink(action.action_trace.act.account)}</div> */}
      </td>
    );
    items.push(
      <td data-title="Info" className="pt-1 pb-1" key="2">
        <div className="actinfo-font">
          {this.renderAccountLink(action_trace.act.data.from)} {' sent '}
          <span className="text-info">{action_trace.act.data.quantity}</span> {` to `}
          {this.renderAccountLink(action_trace.act.data.to)}
        </div>
        <div className="aln-text">
          <span className="font-weight-bold">{`Memo: `}</span>
          {action_trace.act.data.memo}
        </div>
      </td>
    );

    return items;
  }

  RenderDelegatebw(action_trace) {
    let items = [];
    items.push(
      <td data-title="Type" key="1">
        <div className=" p-1 d-inline bg-received text-light rounded ">Stake bandwidth</div>
        {/* <div className=" p-1">{this.renderAccountLink(action.action_trace.act.account)}</div> */}
      </td>
    );
    items.push(
      <td data-title="Info" className="pt-1 pb-1" key="2">
        <div className="actinfo-font">
          {this.renderAccountLink(action_trace.act.data.from)}
          {` delegated `}
          <span className="text-info">{action_trace.act.data.stake_net_quantity}</span> {` for NET and `}
          <span className="text-info">{action_trace.act.data.stake_cpu_quantity}</span> {` for CPU to `}
          {this.renderAccountLink(action_trace.act.data.receiver)}
        </div>
      </td>
    );

    return items;
  }
  RenderUndelegatebw(action_trace, block_time, block_num, last_irreversible_block, head_block_num) {
    let items = [];
    items.push(
      <td data-title="Type" key="1">
        <div className=" p-1 d-inline bg-senttoken text-light rounded ">Unstake</div>
        {/* <div className=" p-1">{this.renderAccountLink(action.action_trace.act.account)}</div> */}
      </td>
    );
    items.push(
      <td data-title="Info" className="pt-1 pb-1" key="2">
        <div className="actinfo-font">
          {this.renderAccountLink(action_trace.act.data.from)}
          {` undelegated `}
          <span className="text-info">{action_trace.act.data.unstake_net_quantity}</span> {` for NET and `}
          <span className="text-info">{action_trace.act.data.unstake_cpu_quantity}</span> {` for CPU to `}
          {this.renderAccountLink(action_trace.act.data.receiver)}
        </div>
      </td>
    );

    return items;
  }
  RenderBuyram(action_trace) {
    let items = [];
    items.push(
      <td data-title="Type" key="1">
        <div className=" p-1 d-inline bg-received text-light rounded ">Buy RAM</div>
        {/* <div className=" p-1">{this.renderAccountLink(action.action_trace.act.account)}</div> */}
      </td>
    );
    items.push(
      <td data-title="Info" className="pt-1 pb-1" key="2">
        <div className="actinfo-font">
          {this.renderAccountLink(action_trace.act.data.payer)}
          {` bought `}
          <span className="text-info">{action_trace.act.data.quant}</span> {` RAM for `}
          {this.renderAccountLink(action_trace.act.data.receiver)}
        </div>
      </td>
    );

    return items;
  }
  RenderBuyrambytes(action_trace, block_time, block_num, last_irreversible_block, head_block_num) {
    let items = [];
    items.push(
      <td data-title="Type" key="1">
        <div className=" p-1 d-inline bg-received text-light rounded ">Buy RAM(bytes)</div>
        {/* <div className=" p-1">{this.renderAccountLink(action.action_trace.act.account)}</div> */}
      </td>
    );
    items.push(
      <td data-title="Info" className="pt-1 pb-1" key="2">
        <div className="actinfo-font">
          {this.renderAccountLink(action_trace.act.data.payer)}
          {` bought `}
          <span className="text-info">{action_trace.act.data.bytes}</span> {`bytes RAM for `}
          {this.renderAccountLink(action_trace.act.data.receiver)}
        </div>
      </td>
    );

    return items;
  }
  RenderSellram(action_trace) {
    let items = [];
    items.push(
      <td data-title="Type" key="1">
        <div className=" p-1 d-inline bg-senttoken text-light rounded ">Sell RAM</div>
        {/* <div className=" p-1">{this.renderAccountLink(action.action_trace.act.account)}</div> */}
      </td>
    );
    items.push(
      <td data-title="Info" className="pt-1 pb-1" key="2">
        <div className="actinfo-font">
          {this.renderAccountLink(action_trace.act.data.account)}
          {` sold `}
          <span className="text-info">{action_trace.act.data.bytes}</span> {`bytes RAM `}
          {/* {this.renderAccountLink(action.action_trace.act.data.receiver)} */}
        </div>
      </td>
    );

    return items;
  }
  RenderNewAccount(action_trace) {
    let items = [];
    items.push(
      <td data-title="Type" key="1">
        <div className=" p-1 d-inline bg-vote text-light rounded ">Create account</div>
        {/* <div className=" p-1">{this.renderAccountLink(action.action_trace.act.account)}</div> */}
      </td>
    );
    items.push(
      <td data-title="Info" className="pt-1 pb-1" key="2">
        <div className="actinfo-font">
          {this.renderAccountLink(action_trace.act.data.name)} {' created by '}
          {this.renderAccountLink(action_trace.act.data.creator)}
        </div>
      </td>
    );

    return items;
  }
  RenderVoteProducers(action_trace) {
    let items = [];
    items.push(
      <td data-title="Type" key="1">
        <div className=" p-1 d-inline bg-vote text-light rounded ">Vote Producers</div>
        {/* <div className=" p-1">{this.renderAccountLink(action.action_trace.act.account)}</div> */}
      </td>
    );
    if (!action_trace.act.data.proxy)
      items.push(
        <td data-title="Info" className="pt-1 pb-1" key="2">
          <div className="actinfo-font">
            {this.renderAccountLink(action_trace.act.data.voter)} {' voted for producers: '}{' '}
          </div>
          <div> {this.RenderProducers(action_trace.act.data.producers)} </div>
        </td>
      );
    else
      items.push(
        <td data-title="Info" className="pt-1 pb-1" key="3">
          <div className="actinfo-font">
            {this.renderAccountLink(action_trace.act.data.voter)} {' voted the stake through proxy: '}{' '}
            {this.renderAccountLink(action_trace.act.data.proxy)}
          </div>
        </td>
      );

    return items;
  }
  RenderProducers(producers) {
    let items = [];
    if (producers.length > 0)
      producers.map((producer) => {
        items.push(<span key={producer}>{this.renderAccountLink(producer)} </span>);
      });
    else items.push(<span>Noone </span>);
    return items;
  }

  RenderUpdateAuth(action_trace) {
    let items = [];
    items.push(
      <td data-title="Type" key="1">
        <div className=" p-1 d-inline bg-default text-light rounded ">Set Permission</div>
        {/* <div className=" p-1">{this.renderAccountLink(action.action_trace.act.account)}</div> */}
      </td>
    );
    items.push(
      <td data-title="Info" className="pt-1 pb-1" key="2">
        <div className="actinfo-font">
          {'Set '}
          <span className="font-weight-bold text-info"> {action_trace.act.data.permission} </span>
          {' permission for '}
          {this.renderAccountLink(action_trace.act.data.account)}:
        </div>
        <div>
          <span className="font-weight-bold"> {'Threshold:'} </span> {action_trace.act.data.auth.threshold}
        </div>
        <div>{this.RenderAuth(action_trace.act.data.auth)}</div>
      </td>
    );

    return items;
  }
  RenderAuth(auth) {
    if (auth.keys.length > 0) {
      return this.RenderKeys(auth.keys);
    } else if (auth.accounts.length > 0) {
      return this.RenderAccounts(auth.accounts);
    }
    return null;
  }
  RenderAccounts(accounts) {
    let items = [];
    items.push(
      <div className="row" key={1}>
        <div className="col-8 font-weight-bold">Account</div>
        <div className="col-4 font-weight-bold text-center ">Weight</div>
      </div>
    );
    if (accounts)
      accounts.map((account) => {
        items.push(
          <div key={account.permission.actor} className="row">
            <div className="col-8">
              {this.renderAccountLink(account.permission.actor)} (permission: {account.permission.permission}){' '}
            </div>
            <div className="col-4 text-center">{account.weight}</div>
          </div>
        );
      });
    return items;
  }
  KeyClick = () => {
    this.onOpenModal();
  };
  RenderKeys(keys) {
    let items = [];
    items.push(
      <div className="row" key={1}>
        <div className="col-8 font-weight-bold">Key</div>
        <div className="col-4 font-weight-bold">Weight</div>
      </div>
    );
    if (keys)
      keys.map((key) => {
        items.push(
          <div key={key.key} className="row">
            <div className="col-8">{key.key}</div>
            {/* <KeyAccountsModal public_key={key.key} onCloseModal={this.onCloseModal} open={this.state.open} /> */}
            <div className="col-4">{key.weight}</div>
          </div>
        );
      });
    else items.push(<span>Noone </span>);
    return items;
  }
  RenderSetABI(action_trace) {
    let items = [];
    items.push(
      <td data-title="Type" key="1">
        <div className=" p-1 d-inline bg-vote text-light rounded ">Set ABI</div>
        {/* <div className=" p-1">{this.renderAccountLink(action.action_trace.act.account)}</div> */}
      </td>
    );
    items.push(
      <td data-title="Info" className="pt-1 pb-1" key="2">
        <div className="actinfo-font">
          {this.renderAccountLink(action_trace.act.data.account)} set ABI.{' '}
          <Link to={`/abi/${action_trace.act.data.account}`}>View abi</Link>
        </div>
      </td>
    );

    return items;
  }
  RenderSetCode(action_trace) {
    let items = [];
    items.push(
      <td data-title="Type" key="1">
        <div className=" p-1 d-inline bg-vote text-light rounded ">Set code</div>
        {/* <div className=" p-1">{this.renderAccountLink(action.action_trace.act.account)}</div> */}
      </td>
    );
    items.push(
      <td data-title="Info" className="pt-1 pb-1 " key="2">
        <div className="actinfo-font">
          {this.renderAccountLink(action_trace.act.data.account)} set code.{' '}
          <Link to={`/code/${action_trace.act.data.account}`}>View code</Link>
        </div>
        <div />
      </td>
    );

    return items;
  }
  RenderRefund(action_trace) {
    let items = [];
    items.push(
      <td data-title="Type" key="1">
        <div className=" p-1 d-inline bg-vote text-light rounded ">Refund</div>
        {/* <div className=" p-1">{this.renderAccountLink(action.action_trace.act.account)}</div> */}
      </td>
    );
    items.push(
      <td data-title="Info" className="pt-1 pb-1" key="2">
        <div className="actinfo-font">Refunded for {this.renderAccountLink(action_trace.act.data.owner)} </div>
      </td>
    );

    return items;
  }

  renderActions(action_trace, account_name) {
    switch (action_trace.act.name) {
      case 'transfer': // transfer EOS or tokens
        switch (action_trace.act.account) {
          case 'eosio.token': // transfer EOS
            if (action_trace.receipt.receiver == account_name && action_trace.act.data.to == account_name)
              // received EOS
              return this.renderReceivedAction(action_trace);
            else if (action_trace.act.data.from == account_name)
              // sent EOS
              return this.renderSentAction(action_trace);
            else {
              return this.renderDefaultTransferAction(action_trace);
            }
          default:
            if (action_trace.receipt.receiver == account_name && action_trace.act.data.to == account_name)
              // receive other tokens
              return this.renderTokenReceivedAction(action_trace);
            else if (action_trace.act.data.from == account_name)
              // send other tokens
              return this.renderTokenSentAction(action_trace);
            else return this.renderDefaultTokenTransferAction(action_trace);
        }
      case 'delegatebw':
        return this.RenderDelegatebw(action_trace);
      case 'undelegatebw':
        return this.RenderUndelegatebw(action_trace);
      case 'buyram':
        return this.RenderBuyram(action_trace);
      case 'buyrambytes':
        if (action_trace.act.account == 'eosio') return this.RenderBuyrambytes(action_trace);
        else return this.renderDefaultAction(action_trace);
      case 'sellram':
        return this.RenderSellram(action_trace);
      case 'newaccount':
        return this.RenderNewAccount(action_trace);
      case 'voteproducer':
        return this.RenderVoteProducers(action_trace);
      case 'updateauth':
        return this.RenderUpdateAuth(action_trace);
      case 'setabi':
        return this.RenderSetABI(action_trace);
      case 'setcode':
        return this.RenderSetCode(action_trace);
      case 'refund':
        return this.RenderRefund(action_trace);
      default:
        return this.renderDefaultAction(action_trace);
    }
  }
  render() {
    const {action_trace, block_time, account_name, block_num, last_irreversible_block, head_block_num} = this.props;

    return (
      <tr key={action_trace.receipt.global_sequence}>
        {this.renderSeq(
          action_trace.receipt.global_sequence,
          block_num,
          last_irreversible_block,
          head_block_num,
          action_trace.trx_id
        )}
        {this.renderTime(block_time)}
        {this.renderActions(action_trace, account_name)}
      </tr>
    );
  }
}

export default Action;
