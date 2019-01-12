import React, {Component} from 'react';
import {Query} from 'react-apollo';
import {ToastContainer, toast} from 'react-toastify';
import GetBlock from '../../queries/GetBlock';
import {renderTransLink, renderBlockLink, convertUTCDateToLocalDate, renderAccountLink} from '../utils/Tools';
import BlockConfirmation from './BlockConfirmation';

const BlockLoading = ({isDarkMode}) => {
  return (
    <div className="card-block ">
      <div className="text-center align-middle overlay pt-50">
        <i className="fa fa-spinner fa-spin text-info fa-2x" />
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
              <div className="row row-sm stats-container m-0">
                <div className="col-12 col-sm-12 stat-col pr-2 pl-2">
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
                <div className="col-12 col-sm-12 stat-col pr-2 pl-2">
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
                <div className="col-12 col-sm-12 stat-col pr-1 pl-1">
                  <div className="col-6 col-sm-3 col-md-3 stat-col pr-1 pl-1">
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
                  <div className="col-6 col-sm-3 col-md-3 stat-col pr-1 pl-1">
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
                  <div className="col-6 col-sm-3 col-md-3 stat-col pr-1 pl-1">
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
                  <div className="col-6 col-sm-3 col-md-3 stat-col pr-1 pl-1">
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
                <div className="col-12 col-sm-12 mt-1  pr-0 pl-1">
                  <div
                    className={`card sameheight-item ${isDarkMode ? 'bg-dark' : 'bg-actions'} mb-1 mr-1`}
                    data-exclude="xs"
                  >
                    <div className="card-header card-header-sm row m-0">
                      <div className="header-block pl-2 col">
                        <i className="fa fa-list-alt text-info mr-2" />
                        <h1 className="title text-info">Transactions</h1>
                      </div>
                    </div>
                    <div className="card-body rounded-bottom ftz-12 pr-1 pl-1 pt-1 pb-0">
                      {block.transactions.map((transaction, num) => {
                        if (typeof transaction.trx == 'string') {
                          return (
                            <div
                              key={transaction.trx}
                              className={`${isDarkMode ? 'bg-dark' : ''} card-token-price row m-0 mb-1 rounded d-flex`}
                            >
                              <div className="col-2 col-sm-1 ">{num + 1}</div>
                              <div className="col-10 col-sm-11 p-0">{renderTransLink(transaction.trx)}</div>
                            </div>
                          );
                        } else if (typeof transaction.trx == 'object' && typeof transaction.trx.id == 'string') {
                          return (
                            <div
                              key={transaction.trx.id}
                              className={`${isDarkMode ? 'bg-dark' : ''} card-token-price row m-0 mb-1 rounded`}
                            >
                              <div className="col-2 col-sm-1">{num + 1}</div>
                              <div className="col-10 col-sm-11 p-0">{renderTransLink(transaction.trx.id)}</div>
                            </div>
                          );
                        } else {
                          return null;
                        }
                      })}
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
