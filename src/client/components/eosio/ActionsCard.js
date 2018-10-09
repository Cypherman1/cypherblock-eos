import React, {Component} from 'react';
import {CSSTransitionGroup} from 'react-transition-group';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import GetActions from '../../queries/GetActions';
import {Query} from 'react-apollo';
import ToggleButton from 'react-toggle-button';
import {connect} from 'react-redux';
import ActionCard from './ActionCard';
import {renderAccountLink} from '../utils/Tools';
import {IsSpam} from '../utils/IsSpam';
import {setLiveActions, setIsRefetch, setIsButtonLoading, setIsMore} from '../../actions/eosActions';

var action_digests_tmp = '';
var showAction = false;
const ActionsCardLoading = () => {
  return (
    <div>
      <div className="card sameheight-item stats mb-1 border-0 pr-1 pl-1" data-exclude="xs">
        <div className="card-header bg-light border-bottom boder-1 shadow-sm row m-0">
          <div className="header-block pl-1 col stat-col">
            <FontAwesomeIcon icon="list-alt" className="mr-2 text-info fa-lg" />
            <h5 className="title text-info">Recent actions</h5>
          </div>
          <div className="col-auto pt-atb pr-1" />
        </div>
        <div className="card-block pt-0 plheight">
          <div className="text-center align-middle overlay pd-vi">
            <FontAwesomeIcon icon="spinner" spin className="text-info fa-2x" />
          </div>
        </div>
      </div>
    </div>
  );
};

class ActionsCard extends Component {
  renderLoadMoreBtn(fetchMore, morelength) {
    if (this.props.showRefetch) {
      if (!this.props.eosActions.ismore) {
        return (
          <button type="button" className="btn btn-primary text-light w-100" disabled>
            END!
          </button>
        );
      } else {
        if (!this.props.eosActions.isbuttonloading) {
          return (
            <button
              type="button"
              className="btn btn-primary w-100"
              onClick={() => {
                this.props.setIsButtonLoading(true);

                fetchMore({
                  variables: {
                    offset: this.props.eosActions.islive ? 0 - morelength - 25 : 0 - morelength - 100
                  },
                  updateQuery: (prev, {fetchMoreResult}) => {
                    if (!fetchMoreResult) {
                      this.props.setIsButtonLoading(false);
                      return prev;
                    }
                    this.props.setIsButtonLoading(false);
                    if (fetchMoreResult.actions.actions[0].account_action_seq == 0) {
                      this.props.setIsMore(false);
                    } else {
                      this.props.setIsMore(true);
                    }
                    return Object.assign(
                      {},
                      {
                        actions: {
                          actions: [...fetchMoreResult.actions.actions],
                          __typename: 'ActionsType'
                        }
                      }
                    );
                  }
                }).catch((error) => {
                  this.props.setIsButtonLoading(false);
                  return true;
                });
              }}
            >
              Load more
            </button>
          );
        } else
          return (
            <div className="w-100 text-center">
              <FontAwesomeIcon icon="spinner" spin className="text-info fa-2x" />
            </div>
          );
      }
    } else
      return (
        <button type="button" className="btn btn-primary text-light w-100" disabled>
          Load more
        </button>
      );
  }
  renderRefetchBtn(refetch) {
    if (!this.props.eosActions.islive) {
      if (!this.props.eosActions.isrefetch)
        return (
          <div className="float-right pr-1">
            <button
              type="button"
              className="btn btn-primary btn-sm col"
              onClick={() => {
                this.props.setIsRefetch(true);
                refetch().then(() => {
                  this.props.setIsRefetch(false);
                  this.props.setIsMore(true);
                });
              }}
            >
              <FontAwesomeIcon icon="sync-alt" className="text-light" />
            </button>
          </div>
        );
      return (
        <div className="float-right pr-1">
          <FontAwesomeIcon icon="spinner" spin className="text-info fa-lg" />
        </div>
      );
    } else {
      return null;
    }
  }
  render() {
    return (
      <Query
        query={GetActions}
        variables={{
          account_name: this.props.account_name,
          pos: -1,
          offset: this.props.eosActions.islive ? -25 : -100
        }}
        pollInterval={this.props.eosActions.islive ? 5000 : 0}
      >
        {({loading, error, data, fetchMore, refetch}) => {
          if (loading) return <ActionsCardLoading />;
          if (error) return <ActionsCardLoading />;
          if (data && data.actions && data.chain) {
            action_digests_tmp = '';

            return (
              <div>
                <div className="card sameheight-item stats mb-1 border-0 pr-1 pl-1 pb-1 " data-exclude="xs">
                  <div className="card-header bg-light border-bottom boder-1 shadow-sm row m-0">
                    <div className="header-block pl-1 col stat-col">
                      <FontAwesomeIcon icon="list-alt" className="mr-2 text-info fa-lg" />
                      <h5 className="title text-info">
                        Recent <span className="ml-1 mr-1">{renderAccountLink(this.props.account_name)}</span> actions
                      </h5>
                    </div>
                    <div className="col-auto pt-atb pr-1">
                      <ToggleButton
                        inactiveLabel={'OFF'}
                        activeLabel={'LIVE'}
                        value={this.props.eosActions.islive}
                        onToggle={(value) => {
                          this.props.setLiveActions(!value);
                        }}
                      />
                    </div>
                    {this.renderRefetchBtn(refetch)}
                  </div>
                  <div className="card-block bg-actions pt-1 pb-0 pr-1 pl-1 ">
                    <CSSTransitionGroup
                      component="div"
                      transitionName="example"
                      transitionEnterTimeout={100}
                      transitionLeaveTimeout={0}
                    >
                      {data.actions.actions
                        .slice()
                        .reverse()
                        .map((action) => {
                          if (
                            action.action_trace.receipt.act_digest !== action_digests_tmp &&
                            !IsSpam(action.action_trace)
                          ) {
                            action_digests_tmp = action.action_trace.receipt.act_digest;

                            return (
                              <ActionCard
                                key={action.global_action_seq}
                                action_trace={action.action_trace}
                                block_time={action.block_time}
                                block_num={action.block_num}
                                last_irreversible_block={data.actions.last_irreversible_block}
                                head_block_num={data.chain.head_block_num}
                                account_name={this.props.account_name}
                                get_block_status={false}
                                trx_id={action.action_trace.trx_id}
                              />
                            );
                          }
                          return null;
                        })}
                    </CSSTransitionGroup>

                    {this.renderLoadMoreBtn(fetchMore, data.actions.actions.length)}
                  </div>
                </div>
              </div>
            );
          } else return <ActionsCardLoading />;
        }}
      </Query>
    );
  }
}

function mapStateToProps({eosActions, antispam}) {
  return {eosActions, antispam};
}

export default connect(
  mapStateToProps,
  {setLiveActions, setIsRefetch, setIsButtonLoading, setIsMore}
)(ActionsCard);
