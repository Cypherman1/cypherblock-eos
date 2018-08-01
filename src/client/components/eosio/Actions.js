import React, {Component} from 'react';
import GetActions from '../../queries/GetActions';
import {Query} from 'react-apollo';
import ErrorPage from '../ErrorPage';
var action_digests_tmp = '';

class Actions extends Component {
  renderData(data) {
    let items = [];
    if (typeof data == 'object') {
      for (var name in data) {
        items.push(
          <div className="row" key={name}>
            <a href="#" className="col">
              {name}
            </a>
            <div className="col">
              <div> {JSON.stringify(data[name])} </div>
            </div>
          </div>
        );
      }
      return <div>{items}</div>;
    } else if (typeof data == 'string') {
      return <div className="wordbreak">{data}</div>;
    }
  }

  renderActions(action) {
    if (action.action_trace.receipt.act_digest !== action_digests_tmp) {
      action_digests_tmp = action.action_trace.receipt.act_digest;
      return (
        <tr key={action.account_action_seq}>
          <td>{action.account_action_seq}</td>
          <td>{Date(action.block_time).toString()}</td>
          <td>{action.action_trace.act.name}</td>
          <td>{this.renderData(action.action_trace.act.data)}</td>
        </tr>
      );
    }
  }

  render() {
    return (
      <Query
        query={GetActions}
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
                  <i className="fa fa-spinner fa-spin fa-1x text-info" />
                </div>
              </section>
              //   );
            );
          if (error) return <ErrorPage error={error} />;
          return (
            <div className="card sameheight-item stats" data-exclude="xs">
              <div className="card-block">
                <div className="table-responsive">
                  <table className="table actions_font">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>time</th>
                        <th>type</th>
                        <th>info</th>
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
