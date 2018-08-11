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

  renderActions(action) {
    if (action.action_trace.receipt.act_digest !== action_digests_tmp) {
      action_digests_tmp = action.action_trace.receipt.act_digest;
      return (
        <tr key={action.account_action_seq}>
          <td data-title="#" className="infostyle">
            {action.account_action_seq}
          </td>
          <td data-title="Time">{new Date(action.block_time).toLocaleString('en-GB', {timeZone: 'UTC'})}</td>
          <td data-title="Type">{action.action_trace.act.name}</td>
          <td data-title="Info">{this.renderData(action.action_trace.act.data)}</td>
        </tr>
      );
    }
    return null;
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
          if (error) return <ErrorPage error={error} />;
          return (
            <div className="card sameheight-item stats" data-exclude="xs">
              <div className="card-block">
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
