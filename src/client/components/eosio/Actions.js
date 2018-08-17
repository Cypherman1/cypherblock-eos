import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import GetActions from '../../queries/GetActions';
import {Query} from 'react-apollo';
import ReadMoreReact from 'read-more-react';

var action_digests_tmp = '';

class Actions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonloading: false
    };
  }
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
  renderSeq(seq) {
    return (
      <td data-title="#" className="infostyle">
        {seq}
      </td>
    );
  }
  renderTime(time) {
    return <td data-title="Time">{new Date(time).toLocaleString('en-GB', {timeZone: 'UTC'})}</td>;
  }
  renderDefaultAction(action) {
    return (
      <tr key={action.global_action_seq}>
        {this.renderSeq(action.global_action_seq)}
        {this.renderTime(action.block_time)}
        <td data-title="Type">
          <div className=" p-1 d-inline bg-default text-light rounded ">{action.action_trace.act.name}</div>
        </td>
        <td data-title="Info">{this.renderData(action.action_trace.act.data)}</td>
      </tr>
    );
  }
  renderDefaultTransferAction(action) {
    return (
      <tr key={action.global_action_seq}>
        {this.renderSeq(action.global_action_seq)}
        {this.renderTime(action.block_time)}
        <td data-title="Type">
          <div className=" p-1 d-inline bg-default text-light rounded ">Transfer</div>
        </td>
        <td data-title="Info">
          <div className="actinfo-font">
            {this.renderAccountLink(action.action_trace.act.data.from)} {' transfered '}
            <span className="text-info">{action.action_trace.act.data.quantity}</span> {` to `}
            {this.renderAccountLink(action.action_trace.act.data.to)}
          </div>
          <div>
            <span className="font-weight-bold">{`Memo: `}</span>
            {action.action_trace.act.data.memo}
          </div>
        </td>
      </tr>
    );
  }
  renderDefaultTokenTransferAction(action) {
    return (
      <tr key={action.global_action_seq}>
        {this.renderSeq(action.global_action_seq)}
        {this.renderTime(action.block_time)}
        <td data-title="Type">
          <div className=" p-1 d-inline bg-default text-light rounded ">Transfer</div>
          <div className=" p-1">{this.renderAccountLink(action.action_trace.act.account)}</div>
        </td>
        <td data-title="Info">
          <div className="actinfo-font">
            {this.renderAccountLink(action.action_trace.act.data.from)} {' transfered '}
            <span className="text-info">{action.action_trace.act.data.quantity}</span> {` to `}
            {this.renderAccountLink(action.action_trace.act.data.to)}
          </div>
          <div>
            <span className="font-weight-bold">{`Memo: `}</span>
            {action.action_trace.act.data.memo}
          </div>
        </td>
      </tr>
    );
  }
  renderAccountLink(accountName) {
    return <Link to={`/account/${accountName}`}>{accountName}</Link>;
  }
  renderReceivedAction(action) {
    return (
      <tr key={action.global_action_seq}>
        {this.renderSeq(action.global_action_seq)}
        {this.renderTime(action.block_time)}
        <td data-title="Type">
          <div className=" p-1 d-inline bg-success text-light rounded ">Receive</div>
        </td>
        <td data-title="Info">
          <div className="actinfo-font">
            {this.renderAccountLink(action.action_trace.act.data.to)} {' received '}
            <span className="text-info">{action.action_trace.act.data.quantity}</span> {` from `}
            {this.renderAccountLink(action.action_trace.act.data.from)}
          </div>
          <div>
            <span className="font-weight-bold">{`Memo: `}</span>
            {action.action_trace.act.data.memo}
          </div>
        </td>
      </tr>
    );
  }
  renderTokenReceivedAction(action) {
    return (
      <tr key={action.global_action_seq}>
        {this.renderSeq(action.global_action_seq)}
        {this.renderTime(action.block_time)}
        <td data-title="Type">
          <div className=" p-1 d-inline bg-received text-light rounded ">Receive(tokens)</div>
          <div className=" p-1">{this.renderAccountLink(action.action_trace.act.account)}</div>
        </td>
        <td data-title="Info">
          <div className="actinfo-font">
            {this.renderAccountLink(action.action_trace.act.data.to)} {' received '}
            <span className="text-info">{action.action_trace.act.data.quantity}</span> {` from `}
            {this.renderAccountLink(action.action_trace.act.data.from)}
          </div>
          <div>
            <span className="font-weight-bold">{`Memo: `}</span>
            {action.action_trace.act.data.memo}
          </div>
        </td>
      </tr>
    );
  }

  renderTokenSentAction(action) {
    return (
      <tr key={action.global_action_seq}>
        {this.renderSeq(action.global_action_seq)}
        {this.renderTime(action.block_time)}
        <td data-title="Type">
          <div className=" p-1 d-inline bg-senttoken text-light rounded ">Send(tokens)</div>
          <div className=" p-1">{this.renderAccountLink(action.action_trace.act.account)}</div>
        </td>
        <td data-title="Info">
          <div className="actinfo-font">
            {this.renderAccountLink(action.action_trace.act.data.from)} {' sent '}
            <span className="text-info">{action.action_trace.act.data.quantity}</span> {` to `}
            {this.renderAccountLink(action.action_trace.act.data.to)}
          </div>
          <div>
            <span className="font-weight-bold">{`Memo: `}</span>
            {action.action_trace.act.data.memo}
          </div>
        </td>
      </tr>
    );
  }

  renderSentAction(action) {
    return (
      <tr key={action.global_action_seq}>
        {this.renderSeq(action.global_action_seq)}
        {this.renderTime(action.block_time)}
        <td data-title="Type">
          <div className=" p-1 d-inline bg-sent text-light rounded ">send</div>
          {/* <div className=" p-1">{this.renderAccountLink(action.action_trace.act.account)}</div> */}
        </td>
        <td data-title="Info">
          <div className="actinfo-font">
            {this.renderAccountLink(action.action_trace.act.data.from)} {' sent '}
            <span className="text-info">{action.action_trace.act.data.quantity}</span> {` to `}
            {this.renderAccountLink(action.action_trace.act.data.to)}
          </div>
          <div>
            <span className="font-weight-bold">{`Memo: `}</span>
            {action.action_trace.act.data.memo}
          </div>
        </td>
      </tr>
    );
  }

  RenderDelegatebw(action) {
    return (
      <tr key={action.global_action_seq}>
        {this.renderSeq(action.global_action_seq)}
        {this.renderTime(action.block_time)}
        <td data-title="Type">
          <div className=" p-1 d-inline bg-received text-light rounded ">Stake bandwidth</div>
          {/* <div className=" p-1">{this.renderAccountLink(action.action_trace.act.account)}</div> */}
        </td>
        <td data-title="Info">
          <div className="actinfo-font">
            {this.renderAccountLink(action.action_trace.act.data.from)}
            {` delegated `}
            <span className="text-info">{action.action_trace.act.data.stake_net_quantity}</span> {` for NET and `}
            <span className="text-info">{action.action_trace.act.data.stake_cpu_quantity}</span> {` for CPU to `}
            {this.renderAccountLink(action.action_trace.act.data.receiver)}
          </div>
        </td>
      </tr>
    );
  }
  RenderUndelegatebw(action) {
    return (
      <tr key={action.global_action_seq}>
        {this.renderSeq(action.global_action_seq)}
        {this.renderTime(action.block_time)}
        <td data-title="Type">
          <div className=" p-1 d-inline bg-senttoken text-light rounded ">Unstake</div>
          {/* <div className=" p-1">{this.renderAccountLink(action.action_trace.act.account)}</div> */}
        </td>
        <td data-title="Info">
          <div className="actinfo-font">
            {this.renderAccountLink(action.action_trace.act.data.from)}
            {` undelegated `}
            <span className="text-info">{action.action_trace.act.data.unstake_net_quantity}</span> {` for NET and `}
            <span className="text-info">{action.action_trace.act.data.unstake_cpu_quantity}</span> {` for CPU to `}
            {this.renderAccountLink(action.action_trace.act.data.receiver)}
          </div>
        </td>
      </tr>
    );
  }
  RenderBuyram(action) {
    return (
      <tr key={action.global_action_seq}>
        {this.renderSeq(action.global_action_seq)}
        {this.renderTime(action.block_time)}
        <td data-title="Type">
          <div className=" p-1 d-inline bg-received text-light rounded ">Buy RAM</div>
          {/* <div className=" p-1">{this.renderAccountLink(action.action_trace.act.account)}</div> */}
        </td>
        <td data-title="Info">
          <div className="actinfo-font">
            {this.renderAccountLink(action.action_trace.act.data.payer)}
            {` bought `}
            <span className="text-info">{action.action_trace.act.data.quant}</span> {` RAM for `}
            {this.renderAccountLink(action.action_trace.act.data.receiver)}
          </div>
        </td>
      </tr>
    );
  }
  RenderBuyrambytes(action) {
    return (
      <tr key={action.global_action_seq}>
        {this.renderSeq(action.global_action_seq)}
        {this.renderTime(action.block_time)}
        <td data-title="Type">
          <div className=" p-1 d-inline bg-received text-light rounded ">Buy RAM(bytes)</div>
          {/* <div className=" p-1">{this.renderAccountLink(action.action_trace.act.account)}</div> */}
        </td>
        <td data-title="Info">
          <div className="actinfo-font">
            {this.renderAccountLink(action.action_trace.act.data.payer)}
            {` bought `}
            <span className="text-info">{action.action_trace.act.data.bytes}</span> {`bytes RAM for `}
            {this.renderAccountLink(action.action_trace.act.data.receiver)}
          </div>
        </td>
      </tr>
    );
  }
  RenderSellram(action) {
    return (
      <tr key={action.global_action_seq}>
        {this.renderSeq(action.global_action_seq)}
        {this.renderTime(action.block_time)}
        <td data-title="Type">
          <div className=" p-1 d-inline bg-senttoken text-light rounded ">Sell RAM</div>
          {/* <div className=" p-1">{this.renderAccountLink(action.action_trace.act.account)}</div> */}
        </td>
        <td data-title="Info">
          <div className="actinfo-font">
            {this.renderAccountLink(action.action_trace.act.data.account)}
            {` sold `}
            <span className="text-info">{action.action_trace.act.data.bytes}</span> {`bytes RAM `}
            {/* {this.renderAccountLink(action.action_trace.act.data.receiver)} */}
          </div>
        </td>
      </tr>
    );
  }
  RenderNewAccount(action) {
    return (
      <tr key={action.global_action_seq}>
        {this.renderSeq(action.global_action_seq)}
        {this.renderTime(action.block_time)}
        <td data-title="Type">
          <div className=" p-1 d-inline <bg-vote></bg-vote> text-light rounded ">Create account</div>
          {/* <div className=" p-1">{this.renderAccountLink(action.action_trace.act.account)}</div> */}
        </td>
        <td data-title="Info">
          <div className="actinfo-font">
            {this.renderAccountLink(action.action_trace.act.data.name)} {' created by '}
            {this.renderAccountLink(action.action_trace.act.data.creator)}
          </div>
        </td>
      </tr>
    );
  }
  RenderVoteProducers(action) {
    return (
      <tr key={action.global_action_seq}>
        {this.renderSeq(action.global_action_seq)}
        {this.renderTime(action.block_time)}
        <td data-title="Type">
          <div className=" p-1 d-inline bg-vote text-light rounded ">Vote Producers</div>
          {/* <div className=" p-1">{this.renderAccountLink(action.action_trace.act.account)}</div> */}
        </td>
        <td data-title="Info">
          <div className="actinfo-font">
            {this.renderAccountLink(action.action_trace.act.data.voter)} {' voted for producers: '}{' '}
          </div>
          <div> {this.RenderProducers(action.action_trace.act.data.producers)} </div>
        </td>
      </tr>
    );
  }
  RenderProducers(producers) {
    let items = [];
    if (producers)
      producers.map((producer) => {
        items.push(<span key={producer}>{this.renderAccountLink(producer)} </span>);
      });
    else items.push(<span>Noone </span>);
    return items;
  }

  RenderUpdateAuth(action) {
    return (
      <tr key={action.global_action_seq}>
        {this.renderSeq(action.global_action_seq)}
        {this.renderTime(action.block_time)}
        <td data-title="Type">
          <div className=" p-1 d-inline bg-default text-light rounded ">Set Permission</div>
          {/* <div className=" p-1">{this.renderAccountLink(action.action_trace.act.account)}</div> */}
        </td>
        <td data-title="Info">
          <div className="actinfo-font">
            {'Set '}
            <span className="font-weight-bold text-info"> {action.action_trace.act.data.permission} </span>
            {' permission for '}
            {this.renderAccountLink(action.action_trace.act.data.account)}:
          </div>
          <div>
            <span className="font-weight-bold"> {'Threshold:'} </span> {action.action_trace.act.data.auth.threshold}
          </div>
          <div>{this.RenderKeys(action.action_trace.act.data.auth.keys)}</div>
        </td>
      </tr>
    );
  }
  RenderKeys(keys) {
    let items = [];
    items.push(
      <div className="row">
        <div className="col-8 font-weight-bold">Key</div>
        <div className="col-4 font-weight-bold">Weight</div>
      </div>
    );
    if (keys)
      keys.map((key) => {
        items.push(
          <div key={key} className="row">
            <div className="col-8">{key.key} </div>
            <div className="col-4">{key.weight}</div>
          </div>
        );
      });
    else items.push(<span>Noone </span>);
    return items;
  }
  RenderSetABI(action) {
    return (
      <tr key={action.global_action_seq}>
        {this.renderSeq(action.global_action_seq)}
        {this.renderTime(action.block_time)}
        <td data-title="Type">
          <div className=" p-1 d-inline bg-vote text-light rounded ">Set ABI</div>
          {/* <div className=" p-1">{this.renderAccountLink(action.action_trace.act.account)}</div> */}
        </td>
        <td data-title="Info">
          <div className="actinfo-font">{this.renderAccountLink(action.action_trace.act.data.account)} set ABI:</div>
          <div>
            {/* {action.action_trace.act.data.abi} */}
            <ReadMoreReact text={action.action_trace.act.data.abi} />
          </div>
        </td>
      </tr>
    );
  }
  RenderSetCode(action) {
    return (
      <tr key={action.global_action_seq}>
        {this.renderSeq(action.global_action_seq)}
        {this.renderTime(action.block_time)}
        <td data-title="Type">
          <div className=" p-1 d-inline bg-vote text-light rounded ">Set code</div>
          {/* <div className=" p-1">{this.renderAccountLink(action.action_trace.act.account)}</div> */}
        </td>
        <td data-title="Info">
          <div className="actinfo-font">{this.renderAccountLink(action.action_trace.act.data.account)} set code:</div>
          <div>
            {/* {action.action_trace.act.data.abi} */}
            <ReadMoreReact text={action.action_trace.act.data.code} />
          </div>
        </td>
      </tr>
    );
  }
  RenderRefund(action) {
    return (
      <tr key={action.global_action_seq}>
        {this.renderSeq(action.global_action_seq)}
        {this.renderTime(action.block_time)}
        <td data-title="Type">
          <div className=" p-1 d-inline bg-vote text-light rounded ">Refund</div>
          {/* <div className=" p-1">{this.renderAccountLink(action.action_trace.act.account)}</div> */}
        </td>
        <td data-title="Info">
          <div className="actinfo-font">{this.renderAccountLink(action.action_trace.act.data.owner)} got refunded</div>
        </td>
      </tr>
    );
  }

  renderActions(action) {
    if (action.action_trace.receipt.act_digest !== action_digests_tmp) {
      action_digests_tmp = action.action_trace.receipt.act_digest;
      switch (action.action_trace.act.name) {
        case 'transfer': // transfer EOS or tokens
          switch (action.action_trace.act.account) {
            case 'eosio.token': // transfer EOS
              if (
                action.action_trace.receipt.receiver == this.props.account_name &&
                action.action_trace.act.data.to == this.props.account_name
              )
                // received EOS
                return this.renderReceivedAction(action);
              else if (action.action_trace.act.data.from == this.props.account_name)
                // sent EOS
                return this.renderSentAction(action);
              else {
                return this.renderDefaultTransferAction(action);
              }
            default:
              if (
                action.action_trace.receipt.receiver == this.props.account_name &&
                action.action_trace.act.data.to == this.props.account_name
              )
                // receive other tokens
                return this.renderTokenReceivedAction(action);
              else if (action.action_trace.act.data.from == this.props.account_name)
                // send other tokens
                return this.renderTokenSentAction(action);
              else return this.renderDefaultTokenTransferAction(action);
          }
        case 'delegatebw':
          return this.RenderDelegatebw(action);
        case 'undelegatebw':
          return this.RenderUndelegatebw(action);
        case 'buyram':
          return this.RenderBuyram(action);
        case 'buyrambytes':
          if (action.action_trace.act.account == 'eosio') return this.RenderBuyrambytes(action);
          else return this.renderDefaultAction(action);
        case 'sellram':
          return this.RenderSellram(action);
        case 'newaccount':
          return this.RenderNewAccount(action);
        case 'voteproducer':
          return this.RenderVoteProducers(action);
        case 'updateauth':
          return this.RenderUpdateAuth(action);
        case 'setabi':
          return this.RenderSetABI(action);
        case 'setcode':
          return this.RenderSetCode(action);
        case 'refund':
          return this.RenderRefund(action);
        default:
          return this.renderDefaultAction(action);
      }
    }
  }

  render() {
    return (
      <Query
        query={GetActions}
        variables={{
          account_name: this.props.account_name,
          pos: -1,
          offset: -50
        }}
        pollInterval={5000}
      >
        {({loading, error, data, fetchMore}) => {
          if (loading)
            return (
              <section className="section">
                <div className="text-center">
                  <FontAwesomeIcon icon="spinner" spin className="text-info" />
                </div>
              </section>
              //   );
            );
          if (error)
            return (
              <section className="section">
                <div className="text-center">
                  <FontAwesomeIcon icon="spinner" spin className="text-info" />
                </div>
              </section>
            );
          if (data && data.actions)
            return (
              <div className="card sameheight-item stats" data-exclude="xs">
                <div className="card-header card-header-sm bg-light shadow-sm">
                  <div className="header-block pl-3">
                    <FontAwesomeIcon icon="list-alt" className="mr-2 text-info" />
                    <h5 className="title text-info">Recent actions</h5>
                  </div>
                </div>
                <div className="card-block pt-0">
                  <div className="no-more-tables">
                    <table className="table actions_font" style={{tableLayout: 'fixed', width: '100%'}}>
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Time</th>
                          <th>Type</th>
                          <th>Info</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.actions.actions
                          .slice()
                          .reverse()
                          .map((action) => this.renderActions(action))}
                      </tbody>
                    </table>
                  </div>
                  <button
                    type="button"
                    className="btn btn-secondary w-100"
                    onClick={() => {
                      fetchMore({
                        variables: {
                          offset: 0 - data.actions.actions.length - 50
                        },
                        updateQuery: (prev, {fetchMoreResult}) => {
                          if (!fetchMoreResult) return prev;
                          return Object.assign({}, prev, {
                            actions: {
                              actions: [...fetchMoreResult.actions.actions]
                            }
                          });
                        }
                      }).catch((error) => {
                        return true;
                      });
                    }}
                  >
                    Load more
                  </button>
                </div>
              </div>
            );
          return (
            <section className="section">
              <div className="text-center">
                <FontAwesomeIcon icon="spinner" spin className="text-info" />
              </div>
            </section>
          );
        }}
      </Query>
    );
  }
}

export default Actions;
