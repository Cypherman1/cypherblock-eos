import React, {Component} from 'react';
import {Query} from 'react-apollo';
import {CSSTransitionGroup} from 'react-transition-group';
import {ToastContainer, toast} from 'react-toastify';
import GetBlock from '../../queries/GetBlock';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {renderTransLink, renderBlockLink, convertUTCDateToLocalDate, renderAccountLink} from '../utils/Tools';
import BlockConfirmation from './BlockConfirmation';

const BlockLoading = ({isDarkMode}) => {
  return (
    <div className="card-block ">
      <div className="text-center align-middle overlay pt-50">
        <FontAwesomeIcon icon="spinner" spin className="text-info fa-2x" />
      </div>
      <div className="row row-sm stats-container m-0 plheight" />
    </div>
  );
};

class Block extends Component {
  notify = () =>
    toast.error('Not found!', {
      position: toast.POSITION.TOP_RIGHT
    });
  render() {
    const {isDarkMode} = this.props;
    return (
      <Query
        query={GetBlock}
        variables={{
          block_num_or_id: this.props.block_num_or_id
        }}
      >
        {({loading, error, data}) => {
          if (loading) return <BlockLoading />;
          if (error) return <BlockLoading />;
          const {block} = data;

          if (block) {
            return (
              <div>
                <div className="card-block ">
                  <div className="row row-sm stats-container m-0">
                    <div className="col-12 col-sm-12 stat-col pr-1 pl-1">
                      <div className="stat">
                        <div className="blocktxid">{block.id}</div>
                        <div className="name">Block ID</div>
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
                      <div className="stat">
                        <div className="value ftz-11">{renderBlockLink(block.previous)}</div>
                        <div className="name">Previous Block</div>
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
                    <div className="col-12 col-sm-4 stat-col pr-1 pl-1">
                      <div className="col-6 col-sm-12 col-md-6 stat-col pr-1 pl-1">
                        <div className="stat">
                          <div className="value ftz-11">{renderBlockLink(block.block_num)}</div>
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
                      <div className="col-6 col-sm-12 col-md-6 stat-col pr-1 pl-1">
                        <div className="stat">
                          <div className="value ftz-11">
                            {convertUTCDateToLocalDate(new Date(block.timestamp)).toLocaleString()}
                          </div>
                          <div className="name">Timestamp</div>
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
                      <div className="col-6 col-sm-12 col-md-6 stat-col pr-1 pl-1">
                        <div className="stat">
                          <div className="value ftz-11">{renderAccountLink(block.producer)}</div>
                          <div className="name">Producer</div>
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
                      <div className="col-6 col-sm-12 col-md-6 stat-col pr-1 pl-1">
                        <div className="stat">
                          <div className="value ftz-11">
                            <BlockConfirmation block_num={block.block_num} />
                          </div>
                          <div className="name">Status</div>
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
                    <div className="col-12 col-sm-8  pr-0 pl-1">
                      <div className="col-12 col-sm-12  pr-0 pl-1">
                        <div className={`card sameheight-item ${isDarkMode ? 'bg-dark' : ''} mb-0`} data-exclude="xs">
                          <div className="card-header card-header-sm bg-white  row m-0">
                            <div className="header-block pl-2 col">
                              <FontAwesomeIcon icon="list-alt" className="mr-2 text-info" />
                              <h1 className="title text-info ftz-12">Transactions</h1>
                            </div>
                          </div>
                          <div className="card-block pt-0">
                            <div className="no-more-tables1">
                              <table className="table actions_font tablayout mb-0">
                                <thead>
                                  <tr>
                                    <th className="w-10">#</th>
                                    <th className="w-90">ID</th>
                                  </tr>
                                </thead>
                                <CSSTransitionGroup
                                  component="tbody"
                                  transitionName="example"
                                  transitionEnterTimeout={500}
                                  transitionLeaveTimeout={300}
                                >
                                  {block.transactions
                                    .slice()
                                    .reverse()
                                    .map((transaction, num) => {
                                      if (!transaction.trx.id) {
                                        return (
                                          <tr
                                            key={transaction.trx}

                                            /* account_name={this.props.account_name} */
                                          >
                                            <td data-title="#" className="pt-1 pb-1 w-10">
                                              {num + 1}
                                            </td>
                                            <td data-title="ID" className="pt-1 pb-1 w-90">
                                              {renderTransLink(transaction.trx)}
                                            </td>
                                          </tr>
                                        );
                                      } else {
                                        return (
                                          <tr
                                            key={transaction.trx.id}

                                            /* account_name={this.props.account_name} */
                                          >
                                            <td data-title="#" className="pt-1 pb-1 w-10">
                                              {num + 1}
                                            </td>
                                            <td data-title="ID" className="pt-1 pb-1 w-90">
                                              {renderTransLink(transaction.trx.id)}
                                            </td>
                                          </tr>
                                        );
                                      }
                                    })}
                                </CSSTransitionGroup>
                              </table>
                            </div>
                          </div>
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

export default Block;
