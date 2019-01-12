import React, {Component} from 'react';
import {Query} from 'react-apollo';
import {CSSTransitionGroup} from 'react-transition-group';
import {ToastContainer, toast} from 'react-toastify';
import GetTransaction_mongo from '../../queries/GetTransaction_mongo';
import ActionCard from './ActionCard';
import {convertUTCDateToLocalDate, renderBlockLink} from '../utils/Tools';
import {formatBandUnits, formatCPUUnits} from '../utils/FormatUnits';
var action_digests_tmp = '';
var action_digests_tmp_1 = '';

import BlockConfirmation from './BlockConfirmation';

const TransactionLoading = () => {
  return (
    <div className="card-block ">
      <div className="text-center align-middle overlay pt-50">
        <i className="fa fa-spinner fa-spin text-info fa-2x" />
      </div>
      <div className="row row-sm stats-container m-0 plheight" />
    </div>
  );
};

class TransactionMongo extends Component {
  notify = () =>
    toast.error('Not found!', {
      position: toast.POSITION.TOP_RIGHT
    });
  render() {
    this.action_digests_tmp = '';
    const {isDarkMode} = this.props;
    return (
      <Query
        query={GetTransaction_mongo}
        variables={{
          id: this.props.id
        }}
      >
        {({loading, error, data}) => {
          if (loading) return <TransactionLoading />;
          if (error) return <TransactionLoading />;
          const {mongo_transaction, chain} = data;
          if (mongo_transaction && chain) {
            action_digests_tmp = '';
            return (
              <div className={`${isDarkMode ? 'bg-dark' : ''}  `}>
                {/* Transaction info */}
                <div className={`card shadow-sm rounded mb-1  ${isDarkMode ? 'bg-dark' : ''}`}>
                  <div
                    className={`pl-2 card-header shadow-sm  stat-col pt-1 pb-1 ${isDarkMode ? 'bg-dark' : 'bg-white'}`}
                  >
                    <div className="stat">
                      <div className="blocktxid">{mongo_transaction.id}</div>
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
                  <div className={`card-body stat-col p-1 ${isDarkMode ? 'bg-dark' : ''}`}>
                    <div className={`row m-0 rounded ${isDarkMode ? 'bg-dark' : ''}`}>
                      <div className="col-6 col-sm-4 col-md-2 p-1">
                        <div className="stat">
                          <div className="value ftz-11">{renderBlockLink(mongo_transaction.block_num)}</div>
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
                            {convertUTCDateToLocalDate(new Date(mongo_transaction.block_time)).toLocaleString()}
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

                      {/* Status */}

                      <div className="col-6 col-sm-4 col-md-2 p-1">
                        {/* <div className="stat-icon">
                              <FontAwesomeIcon icon="dollar-sign" />
                            </div> */}
                        <div className="stat">
                          <div className="value ftz-11">{mongo_transaction.receipt.status}</div>
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
                            <BlockConfirmation block_num={mongo_transaction.block_num} />
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

                      {/* Status */}

                      <div className="col-6 col-sm-4 col-md-2 p-1">
                        {/* <div className="stat-icon">
                              <FontAwesomeIcon icon="dollar-sign" />
                            </div> */}
                        <div className="stat">
                          <div className="value ftz-11">
                            {formatCPUUnits(Number(mongo_transaction.receipt.cpu_usage_us))}
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
                            {formatBandUnits(Number(mongo_transaction.receipt.net_usage_words))}
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
                </div>
                {/* Actions */}
                <div className={`card  sameheight-item mb-0 ${isDarkMode ? ' bg-dark' : ''}`} data-exclude="xs">
                  <div className={`card-header shadow-sm row m-0  ${isDarkMode ? '' : 'bg-white'}`}>
                    <div className="header-block pl-2 col">
                      <i className="fa fa-tasks text-info mr-2" />
                      <h1 className="title text-info ftz-12">Actions</h1>
                    </div>
                  </div>
                  <div className={` pb-0 ${isDarkMode ? 'bg-dark' : 'bg-actions'}`} style={{padding: 2}}>
                    <CSSTransitionGroup
                      component="div"
                      transitionName="example"
                      transitionEnterTimeout={500}
                      transitionLeaveTimeout={300}
                    >
                      {mongo_transaction.action_traces.map((trace) => {
                        if (trace.receipt.act_digest !== action_digests_tmp) {
                          action_digests_tmp = trace.receipt.act_digest;
                          let items = [];
                          items.push(
                            <ActionCard
                              key={trace.receipt.global_sequence}
                              action_trace={trace}
                              block_time={mongo_transaction.block_time}
                              block_num={mongo_transaction.block_num}
                              last_irreversible_block={chain.last_irreversible_block}
                              head_block_num={chain.head_block_num}
                              get_block_status={false}
                              trx_id={mongo_transaction.id}
                              isDarkMode={isDarkMode}
                              /* account_name={this.props.account_name} */
                            />
                          );

                          {
                            /* if (trace.inline_traces.length > 0) {
                            action_digests_tmp_1 = '';
                            let items1 = [];
                            trace.inline_traces.map((trace) => {
                              if (trace.receipt.act_digest !== action_digests_tmp) {
                                action_digests_tmp_1 = trace.receipt.act_digest;
                                items1.push(
                                  <ActionCard
                                    key={trace.receipt.global_sequence}
                                    action_trace={trace}
                                    block_time={mongo_transaction.block_time}
                                    block_num={mongo_transaction.block_num}
                                    last_irreversible_block={chain.last_irreversible_block}
                                    head_block_num={chain.head_block_num}
                                    get_block_status={false}
                                    trx_id={mongo_transaction.id}
                                    isDarkMode={isDarkMode}
                                  />
                                );
                              }
                            });
                            items.push(
                              <div className="row">
                                <div className="col-1">inline 1</div> <div className='col'> {items1} </div>
                              </div>
                            );
                          } */
                          }

                          return items;
                        }
                        return null;
                      })}
                    </CSSTransitionGroup>
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

export default TransactionMongo;
