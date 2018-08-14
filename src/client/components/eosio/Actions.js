import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import GetActions from '../../queries/GetActions';
import {Query} from 'react-apollo';
import ErrorPage from '../ErrorPage';
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
  renderDefaultAction(action) {
    return (
      <tr key={action.global_action_seq}>
        <td data-title="#" className="infostyle">
          {action.global_action_seq}
        </td>
        <td data-title="Time">{new Date(action.block_time).toLocaleString('en-GB', {timeZone: 'UTC'})}</td>
        <td data-title="Type">
          <div className=" p-1 d-inline bg-warning text-light rounded ">{action.action_trace.act.name}</div>
        </td>
        <td data-title="Info">{this.renderData(action.action_trace.act.data)}</td>
      </tr>
    );
  }
  renderAccountLink(accountName) {
    return <Link to={`/account/${accountName}`}>{accountName}</Link>;
  }
  renderReceivedAction(action) {
    return (
      <tr key={action.global_action_seq}>
        <td data-title="#" className="infostyle">
          {action.global_action_seq}
        </td>
        <td data-title="Time">{new Date(action.block_time).toLocaleString('en-GB', {timeZone: 'UTC'})}</td>
        <td data-title="Type">
          <div className=" p-1 d-inline bg-success text-light rounded ">Received</div>
        </td>
        <td data-title="Info">
          <div className="actinfo-font">
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
  renderActions(action) {
    if (action.action_trace.receipt.act_digest !== action_digests_tmp) {
      action_digests_tmp = action.action_trace.receipt.act_digest;
      switch (action.action_trace.act.name) {
        case 'transfer':
          switch (action.action_trace.act.account) {
            case 'eosio.token':
              if (
                action.action_trace.receipt.receiver == this.props.account_name &&
                action.action_trace.act.data.to == this.props.account_name
              )
                return this.renderReceivedAction(action);
              else {
                return this.renderDefaultAction(action);
              }
            default:
              return this.renderDefaultAction(action);
          }
        default:
          return this.renderDefaultAction(action);
      }
    }
  }

  render() {
    return (
      <Query
        query={GetActions}
        notifyOnNetworkStatusChange={true}
        variables={{
          account_name: this.props.account_name,
          pos: -1,
          offset: -10
        }}
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
                        offset: 0 - data.actions.actions.length - 10
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
        }}
      </Query>
    );
  }
}

export default Actions;
