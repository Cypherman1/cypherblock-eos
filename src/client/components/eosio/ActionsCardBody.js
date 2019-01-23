import React, {Component} from 'react';
import {CSSTransitionGroup} from 'react-transition-group';
import GetActions from '../../queries/GetActions';
import {graphql} from 'react-apollo';
import {connect} from 'react-redux';
import ActionCard from './ActionCard';
import {IsSpam} from '../utils/IsSpam';
import {IsFiltered} from '../utils/IsFiltered';
import {IsSearched} from '../utils/IsSearched';

import {
  setLiveActions,
  setIsRefetch,
  setIsButtonLoading,
  setIsMore,
  setIsAntiSpam,
  setRefetchFunc,
  setActionChecking,
  setIsSettingOpen,
  setLimitValue,
  setActionsLength
} from '../../actions/eosActions';

var action_digests_tmp = '';
let actions_data = null;
let total_actions = 0;
let actions_fetched = 0;

let isMore = true;
const ActionsCardLoading = () => {
  return (
    <div>
      <div className="card-block pt-1 pb-0 pr-1 pl-1 ">
        <div className="text-center align-middle pd-vi">
          <i className="fa fa-spinner fa-spin text-info fa-2x" />
        </div>
      </div>
    </div>
  );
};

class ActionsCardBody extends Component {
  renderLoadMoreBtn(fetchMore, morelength) {
    if (!this.props.eosActions.islive) {
      if (!isMore) {
        return (
          <button type="button" className="btn btn-outline-info text-light w-100" disabled>
            END(fetched:{total_actions}/{total_actions})
          </button>
        );
      } else {
        if (!this.props.eosActions.isbuttonloading) {
          return (
            <button
              type="button"
              className="btn btn-outline-info w-100"
              onClick={() => {
                this.props.setIsButtonLoading(true);

                fetchMore({
                  variables: {
                    offset: 0 - Number(morelength) - Number(this.props.eosActions.limit)
                  },
                  updateQuery: (prev, {fetchMoreResult}) => {
                    if (!fetchMoreResult && !fetchMoreResult.actions) {
                      this.props.setIsButtonLoading(false);
                      return prev;
                    }

                    actions_fetched = Number(morelength) + Number(this.props.eosActions.limit);

                    this.props.setIsButtonLoading(false);

                    if (fetchMoreResult.actions.actions[0].account_action_seq == 0) {
                      isMore = false;
                    } else {
                      isMore = true;
                    }

                    return Object.assign(
                      {},
                      {
                        total: fetchMoreResult.total,
                        chain: fetchMoreResult.chain,
                        actions: {
                          actions: [...fetchMoreResult.actions.actions],
                          last_irreversible_block: fetchMoreResult.actions.last_irreversible_block,
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
              Fetch more(fetched:{actions_fetched}/{total_actions})
            </button>
          );
        } else
          return (
            <div className="w-100 text-center">
              <i className="fa fa-spinner fa-spin text-info fa-2x" />
            </div>
          );
      }
    } else
      return (
        <button type="button" className="btn btn-outline-info text-light w-100">
          Fetch more
        </button>
      );
  }
  componentDidMount() {
    this.props.setRefetchFunc(this.props.data.refetch);
  }
  componentWillMount() {
    this.props.setLiveActions(this.props.isLive);
    this.props.setIsSettingOpen(false);
    //if (this.props.defaultLimit) this.props.setLimitValue(this.props.defaultLimit);
    actions_fetched = Number(this.props.eosActions.limit);
    isMore = true;
  }

  render() {
    //const {loading, error, data, fetchMore, refetch} = this.props.data;
    if (this.props.data.loading) return <ActionsCardLoading />;
    const {data, eosActions, account_name, setIsSettingOpen, isDarkMode} = this.props;
    const {fetchMore} = this.props.data;
    const {
      isAntiSpamed,
      isFilterOthers,
      isFilterSmartContract,
      isFilterResources,
      isFilterSendReceiveTokens,
      isFilterSendReceiveEOS,
      memoTags,
      isSettingOpen,
      actionsLength
    } = eosActions;
    if (data.error) return <ActionsCardLoading />;
    let items = [];
    if (data && data.actions && data.chain && data.total && data.total.actions[0]) {
      action_digests_tmp = '';
      actions_data = [...data.actions.actions].sort(
        (a, b) => Number(b.account_action_seq) - Number(a.account_action_seq)
      );
      total_actions = Number(data.total.actions[0].account_action_seq) + 1; // set total number of action
      actions_fetched = data.actions.actions.length;
      if (actions_fetched < total_actions) {
        //set is more action in this page or not
        isMore = true;
      } else {
        isMore = false;
      }

      actions_data.map((action) => {
        if (
          action.action_trace.receipt.act_digest !== action_digests_tmp &&
          !IsSpam(action.action_trace, isAntiSpamed) &&
          IsFiltered(
            action.action_trace,
            isFilterOthers,
            isFilterSmartContract,
            isFilterResources,
            isFilterSendReceiveTokens,
            isFilterSendReceiveEOS
          ) &&
          IsSearched(action.action_trace, memoTags)
        ) {
          action_digests_tmp = action.action_trace.receipt.act_digest;
          items.push(
            <ActionCard
              key={action.global_action_seq}
              action_trace={action.action_trace}
              block_time={action.block_time}
              block_num={action.block_num}
              last_irreversible_block={data.actions.last_irreversible_block}
              head_block_num={data.chain.head_block_num}
              account_name={account_name}
              get_block_status={false}
              trx_id={action.action_trace.trx_id}
              isDarkMode={isDarkMode}
            />
          );
        }
      });
      if (items.length > 0) {
        return (
          <div className={`pb-0 ${isDarkMode ? 'bg-action-dark' : 'bg-actions'}  `} style={{padding: 2}}>
            <CSSTransitionGroup
              component="div"
              transitionName="example"
              transitionEnterTimeout={100}
              transitionLeaveTimeout={50}
            >
              {items}
            </CSSTransitionGroup>
            {this.renderLoadMoreBtn(fetchMore, actions_fetched)}
          </div>
        );
      } else {
        return (
          <div>
            <div className="pt-1 pb-0">
              <div className="ftz-11 text-danger p-2">
                Oops! No action found! Do you want to "Fetch more" or change actions view settings
                <button
                  type="button"
                  className="btn btn-light btn-pill p-0"
                  data-toggle="collapse"
                  data-target="#collapseExample"
                  aria-expanded="false"
                  aria-controls="collapseExample"
                  onClick={() => {
                    setIsSettingOpen(!isSettingOpen);
                  }}
                >
                  {!isSettingOpen ? (
                    <i className="fa fa-cog fa-lg text-info" />
                  ) : (
                    <i className="fa fa-chevron-circle-up fa-lg text-success" />
                  )}
                </button>
              </div>
              {this.renderLoadMoreBtn(fetchMore, actions_fetched)}
            </div>
          </div>
        );
      }
    } else {
      return (
        <div>
          <div className="card-block pt-1 pb-0 pr-1 pl-1 ">
            <div className="text-center align-middle pd-vi">No actions found!</div>
          </div>
        </div>
      );
    }
  }
}
function mapStateToProps({myStore}) {
  return {eosActions: myStore.eosActions, antispam: myStore.antispam};
}
export default connect(
  mapStateToProps,
  {
    setLiveActions,
    setIsRefetch,
    setIsButtonLoading,
    setIsMore,
    setIsAntiSpam,
    setRefetchFunc,
    setActionChecking,
    setIsSettingOpen,
    setLimitValue,
    setActionsLength
  }
)(
  graphql(GetActions, {
    options: ({account_name, eosActions}) => {
      return {
        variables: {
          account_name: account_name,
          pos: -1,
          offset: eosActions.islive ? -20 : 0 - eosActions.limit
        },
        pollInterval: eosActions.islive ? 5000 : 0
      };
    }
  })(ActionsCardBody)
);
