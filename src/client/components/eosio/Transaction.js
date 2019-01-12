import React, {Component} from 'react';
import {Query} from 'react-apollo';
import {CSSTransitionGroup} from 'react-transition-group';
import {ToastContainer, toast} from 'react-toastify';
import GetTransaction from '../../queries/GetTransaction';
import ActionCard from './ActionCard';
import {convertUTCDateToLocalDate, renderBlockLink} from '../utils/Tools';
import {formatBandUnits, formatCPUUnits} from '../utils/FormatUnits';
var action_digests_tmp = '';
import BlockConfirmation from './BlockConfirmation';

const TransactionLoading = () => {
  return (
    <div className="card-block">
      <div className="text-center align-middle overlay pt-50">
        <i className="fa fa-spinner fa-spin text-info fa-2x" />
      </div>
      <div className="row row-sm stats-container m-0 plheight" />
    </div>
  );
};

class Transaction extends Component {
  notify = () =>
    toast.error('Not found!', {
      position: toast.POSITION.TOP_RIGHT
    });
  render() {
    this.action_digests_tmp = '';
    const {isDarkMode} = this.props;
    return (
      <Query
        query={GetTransaction}
        variables={{
          id: this.props.id
        }}
      >
        {({loading, error, data}) => {
          if (loading) return <TransactionLoading />;
          if (error) return <TransactionLoading />;
          const {transaction, chain} = data;
          if (transaction && chain) {
            action_digests_tmp = '';
            return (
              <div>
                <div className={`pr-1 ${isDarkMode ? 'bg-dark' : ''} `}>
                  <div className="row row-sm stats-container m-0">
                    <div className="col-12 col-sm-12 stat-col pr-2 pl-2">
                      <div className="stat">
                        <div className="blocktxid">{transaction.id}</div>
                        <div className="name">Transaction ID</div>
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

                    <div className="col-12 col-sm-12 stat-col pr-1 pl-1">
                      <div className="row m-0">
                        <div className="col-6 col-sm-4 col-md-2 p-1">
                          <div className="stat">
                            <div className="value ftz-11">{renderBlockLink(transaction.block_num)}</div>
                            <div className="name">Block num</div>
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
                        <div className="col-6 col-sm-4 col-md-2 p-1">
                          <div className="stat">
                            <div className="value ftz-11">
                              {convertUTCDateToLocalDate(new Date(transaction.block_time)).toLocaleString()}
                            </div>
                            <div className="name">Block time</div>
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
                        <div className="col-6 col-sm-4 col-md-2 p-1">
                          {/* <div className="stat-icon">
                              <FontAwesomeIcon icon="dollar-sign" />
                            </div> */}
                          <div className="stat">
                            <div className="value ftz-11">{transaction.trx.receipt.status}</div>
                            <div className="name">Transaction status</div>
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
                        {/* Irriversible */}
                        <div className="col-6 col-sm-4 col-md-2 p-1">
                          {/* <div className="stat-icon">
                              <FontAwesomeIcon icon="dollar-sign" />
                            </div> */}
                          <div className="stat">
                            <div className="value ftz-11">
                              <BlockConfirmation block_num={transaction.block_num} />
                            </div>
                            <div className="name">Block status</div>
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
                        <div className="col-6 col-sm-4 col-md-2 p-1">
                          {/* <div className="stat-icon">
                              <FontAwesomeIcon icon="dollar-sign" />
                            </div> */}
                          <div className="stat">
                            <div className="value ftz-11">
                              {formatCPUUnits(Number(transaction.trx.receipt.cpu_usage_us))}
                            </div>
                            <div className="name">CPU usage</div>
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
                        {/* Irriversible */}
                        <div className="col-6 col-sm-4 col-md-2 p-1">
                          {/* <div className="stat-icon">
                              <FontAwesomeIcon icon="dollar-sign" />
                            </div> */}
                          <div className="stat">
                            <div className="value ftz-11">
                              {formatBandUnits(Number(transaction.trx.receipt.net_usage_words))}
                            </div>
                            <div className="name">Net usage</div>
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
                    <div className="col-12 col-sm-12 pr-0 pl-1">
                      <div className="card sameheight-item mb-0 " data-exclude="xs">
                        <div className="card-header card-header-sm bg-actions shadow-sm row m-0">
                          <div className="header-block pl-2 col">
                            <i className="fa fa-tasks text-info mr-2" />
                            <h1 className="title text-info ftz-12">Actions</h1>
                          </div>
                        </div>
                        <div
                          className={`card-block ${isDarkMode ? 'bg-secondary' : 'bg-actions'}`}
                          style={{paddingTop: 2, paddingLeft: 2, paddingRight: 2, paddingBottom: 0}}
                        >
                          <CSSTransitionGroup
                            component="div"
                            transitionName="example"
                            transitionEnterTimeout={500}
                            transitionLeaveTimeout={300}
                          >
                            {transaction.traces.map((trace) => {
                              if (trace.receipt.act_digest !== action_digests_tmp) {
                                action_digests_tmp = trace.receipt.act_digest;

                                return (
                                  <ActionCard
                                    key={trace.receipt.global_sequence}
                                    action_trace={trace}
                                    block_time={transaction.block_time}
                                    block_num={transaction.block_num}
                                    last_irreversible_block={transaction.last_irreversible_block}
                                    head_block_num={chain.head_block_num}
                                    get_block_status={false}
                                    trx_id={transaction.id}
                                    isDarkMode={isDarkMode}
                                    /* account_name={this.props.account_name} */
                                  />
                                );
                              }
                              return null;
                            })}
                          </CSSTransitionGroup>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          } else {
            this.notify();
            return <ToastContainer autoClose={2000} />;
          }
        }}
      </Query>
    );
  }
}

export default Transaction;
