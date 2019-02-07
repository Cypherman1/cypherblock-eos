import React, {Component} from 'react';
import {Query} from 'react-apollo';
import {TransitionGroup} from 'react-transition-group';
import {renderRamColor, renderToFiatColor} from '../utils/RenderColors';
import {convertUTCDateToLocalDate} from '../utils/Tools';
import {formatBandUnits, formatCPUUnits} from '../utils/FormatUnits';
import eoslogo from '../../assets/imgs/eoslogo1.svg';

import {ToastContainer, toast} from 'react-toastify';
import VoterInfo from './VoterInfo';
import AccPermsInfo from './AccPermsInfo';
import SmartContract from './SmartContract';
import ErrorAccNotFound from '../ErrorAccNotFound';

// import ErrorBoundary from '../ErrorBoundary';

import GetAccountInfo from '../../queries/GetAccountInfo';

var staked = 0;

var staked_cpu = 0;

var staked_net = 0;

var unstaked = 0;

var refund_net = 0;

var refund_cpu = 0;

var refund = 0;

var tmp = 0;

var total_balance = 0;

var total_balance_usd = 0;

var total_balance_ramincluded = 0;

var ram_price = 0;

var ram_reserve = 0;

var eos_ram_equivalent = 0;

var ram_usage_num = 0;

var limited_ram_num = 0;

var limited_net_num = 0;

var used_net_num = 0;

var limited_cpu_num = 0;

var used_cpu_num = 0;

var to_fiat = 0;

var refunded_time = null;

var limited_net = '';

var limited_cpu = '';

var limited_ram = '';

var used_net = '';

var used_cpu = '';

var used_ram = '';

var available_net = '';

var available_cpu = '';

var availabe_ram = '';

var account_name = '';

var block_timestamp_epoch = 946684800000;

Date.prototype.addDays = function(days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

const AccountInfoLoading = ({isDarkMode}) => {
  return (
    <div className={`card ${isDarkMode ? 'bg-dark' : 'bg-actions'} mb-1`}>
      <div className={`card-header row m-0 shadow-sm ${isDarkMode ? 'bg-dark' : 'bg-white'}`}>
        <div className="col p-0 d-flex flex-row">
          <div className="pt-2 pl-2">
            {/* <FontAwesomeIcon icon="user" className="mr-2 text-info fa-lg" /> */}
            <i className="fa fa-user mr-2 text-info fa-lg" />
          </div>
          <div className="">
            <div>
              <h1 className="title text-info " />
            </div>
            <div className="name ftz-8 text-success">Created:</div>
          </div>
        </div>
        <div className="stat float-right mt-1">
          <TransitionGroup transitionName="example" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
            <div className="head_block_time_font " />
            <div className="head_block_time_font text-right">Head Block Time</div>
          </TransitionGroup>
        </div>
      </div>
      <div
        className={`card sameheight-item stats mbc  shadow-sm ${isDarkMode ? 'bg-dark-1' : ''}  pb-1`}
        style={{margin: 2}}
      >
        <div className="text-center align-middle overlay pd-gi">
          <i className="fa fa-spinner fa-spin text-info fa-2x" />
        </div>
        <div className={`card-header card-header-sm shadow-sm ${isDarkMode ? 'bg-dark' : 'bg-white'}  mb-1`}>
          <div className="header-block pl-2">
            <i className="fa fa-globe text-info mr-2" />
            {/* <FontAwesomeIcon icon="globe" className="mr-2 text-info" /> */}
            <h1 className="title text-info">
              General info
              {/* <Link to={`/account/${account_name}`}>{account_name}</Link> */}
            </h1>
          </div>
        </div>
        <div className=" row row-sm stats-container m-0 ">
          <div className="col-6 col-sm-4 stat-col pr-1 pl-1">
            <div className="mr-1 eos-icon">
              <img src={eoslogo} alt="eos block explorer" />
            </div>
            <div className="stat">
              <div className="value"> EOS</div>
              <div className="name">Balance</div>
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
          <div className="col-6 col-sm-4 stat-col pr-1 pl-1 d-none d-sm-block">
            <div className="pd-bl">
              <div className=" mr-2 eos-icon">
                <img src={eoslogo} alt="eos block explorer" />
              </div>
              <div className="stat">
                <div className="value"> USD</div>
                <div className="name">To USD</div>
              </div>
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
          <div className="col-6 col-sm-4 stat-col pr-1 pl-1">
            <div className="stat-icon">{/* <i className="fa fa-dollar-sign" /> */}</div>
            <div className="stat">
              <div className="value"> USD</div>
              <div className="name">To USD(RAM included)</div>
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
          <div className="col-6 col-sm-4 stat-col pr-1 pl-1">
            <div className="stat-icon">
              <i className="fa fa-lock-open" />
            </div>
            <div className="stat">
              <div className="value" />
              <div className="name"> EOS unstaked </div>
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
          <div className="col-6 col-sm-4 stat-col pr-1 pl-1">
            <div className="stat-icon">
              <i className="fa fa-lock" />
            </div>
            <div className="stat">
              <div className="value" />
              <div className="name"> EOS staked(Vote power) </div>
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
          <div className="col-6 col-sm-4  stat-col pr-1 pl-1">
            <div className="stat-icon">
              <i className="fa fa-key" />
            </div>
            <div className="stat">
              <div className="value">EOS</div>
              <div className="name">
                Refunding<span className="ftz-8 text-success"> </span>{' '}
              </div>
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

          <div className="col-6 col-sm-4  stat-col pr-1 pl-1">
            <div className="stat-icon">
              <i className="fa fa-microchip" />
            </div>
            <div className="stat">
              <div className="value" />
              <div className="name">{`CPU `}</div>
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
          <div className="col-6 col-sm-4 stat-col pr-1 pl-1">
            <div className="stat-icon">
              <i className="fa fa-bolt" />
            </div>
            <div className="stat">
              <div className="value" />
              <div className="name">{`NET `}</div>
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
          <div className="col-6 col-sm-4  stat-col pr-1 pl-1">
            <div className="stat-icon">
              <i className="fa fa-memory" />
            </div>
            <div className="stat">
              <div className="value" />
              <div className="name">RAM </div>
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
      {/* <AccPermsInfo permissions={[]} isDarkMode={isDarkMode} />
      <VoterInfo isDarkMode={isDarkMode} />
      <SmartContract account_name={null} isDarkMode={isDarkMode} /> */}
    </div>
  );
};

class AccountInfo extends Component {
  getAccountInfo(account, table_rows, cmc) {
    try {
      if (account && table_rows && cmc) {
        account_name = account.account_name;
        if (account.total_resources) {
          staked_net = Number(account.total_resources.net_weight.split(' ')[0]);
        } else {
          staked_net = 0;
        }
        //staked CPU ammount calculation
        if (account.total_resources) {
          staked_cpu = Number(account.total_resources.cpu_weight.split(' ')[0]);
        } else {
          staked_cpu = 0;
        }
        //unstake ammount calculation
        if (account.core_liquid_balance) {
          unstaked = Number(account.core_liquid_balance.split(' ')[0]);
        } else {
          unstaked = 0;
        }
        //Bandwidth refund ammount calculation
        if (account.refund_request) {
          refund_net = Number(account.refund_request.net_amount.split(' ')[0]);
        } else {
          refund_net = 0;
        }
        //CPU refund ammount calculation
        if (account.refund_request) {
          refund_cpu = Number(account.refund_request.cpu_amount.split(' ')[0]);
        } else {
          refund_cpu = 0;
        }

        if (account.refund_request) {
          refunded_time = convertUTCDateToLocalDate(
            new Date(account.refund_request.request_time).addDays(3)
          ).toLocaleString();
        } else {
          refunded_time = null;
        }

        if (account.voter_info) {
          staked = Number(
            account.voter_info.staked.substr(0, account.voter_info.staked.length - 4) +
              '.' +
              account.voter_info.staked.substr(account.voter_info.staked.length - 4)
          );
        } else {
          staked = 0;
        }
        //Total staked ammount
        //staked = staked_cpu + staked_net;
        //Total refund ammount calculation
        refund = refund_cpu + refund_net;
        //Tolal balance calculation
        if (staked > 0) {
          total_balance = staked + unstaked + refund;
        } else {
          total_balance = unstaked + refund;
        }
        //Banwidth limit
        limited_net = formatBandUnits(Number(account.net_limit.max));
        limited_cpu_num = Number(account.net_limit.max);
        //Bandwidth used
        used_net = formatBandUnits(Number(account.net_limit.used));
        used_net_num = Number(account.net_limit.used);
        //Bandwidth available
        available_net = formatBandUnits(Number(account.net_limit.available));
        //CPU limit
        limited_cpu = formatCPUUnits(Number(account.cpu_limit.max));
        limited_cpu_num = Number(account.cpu_limit.max);
        //CPU used
        used_cpu = formatCPUUnits(Number(account.cpu_limit.used));
        used_cpu_num = Number(account.cpu_limit.used);
        //CPU available
        available_cpu = formatCPUUnits(Number(account.cpu_limit.available));
        //RAM limited
        if (account.total_resources) {
          limited_ram = formatBandUnits(Number(account.total_resources.ram_bytes));
          limited_ram_num = Number(account.total_resources.ram_bytes);
        }
        //RAM used
        used_ram = formatBandUnits(Number(account.ram_usage));
        ram_usage_num = Number(account.ram_usage);
        //RAM price
        if (table_rows)
          ram_price = (
            (Number(table_rows.rows[0].quote.balance.split(' ')[0]) /
              Number(table_rows.rows[0].base.balance.split(' ')[0])) *
            1024
          ).toFixed(4);
        //EOS RAM equivalent
        if (account.total_resources)
          eos_ram_equivalent = ((Number(account.total_resources.ram_bytes) * ram_price) / 1024).toFixed(4);

        if (total_balance && cmc) {
          total_balance_ramincluded = total_balance + Number(eos_ram_equivalent);
          if (cmc.EOS.quote.USD.price) {
            to_fiat = (total_balance_ramincluded * Number(cmc.EOS.quote.USD.price)).toFixed(0);
            total_balance_usd = total_balance * Number(cmc.EOS.quote.USD.price);
          }
        }
      }
    } catch (e) {
      throw e;
    }
  }
  notify = () =>
    toast.error('Not found!', {
      position: toast.POSITION.TOP_RIGHT
    });
  render() {
    const {isDarkMode} = this.props;
    return (
      <Query query={GetAccountInfo} variables={{account_name: this.props.account_name}} pollInterval={0}>
        {({loading, error, data}) => {
          if (loading) return <AccountInfoLoading isDarkMode={isDarkMode} />;
          if (error) return <AccountInfoLoading isDarkMode={isDarkMode} />;
          const {account, table_rows, cmc, voteinfo} = data;
          this.getAccountInfo(account, table_rows, cmc);

          if (account && table_rows && cmc)
            return (
              <div className={`card ${isDarkMode ? 'bg-dark ' : 'bg-actions'} mb-1 `}>
                <div className={`card-header row m-0 shadow-sm ${isDarkMode ? 'bg-dark' : 'bg-white'}`}>
                  <div className="col p-0 d-flex flex-row">
                    <div className="pt-2 pl-2">
                      {/* <FontAwesomeIcon icon="user" className="mr-2 text-info fa-lg" /> */}
                      <i className="fa fa-user text-info fa-lg mr-2" />
                    </div>
                    <div className="">
                      <div>
                        <h1 className="title text-info ">{account_name}</h1>
                      </div>
                      <div className="name ftz-8 text-success">
                        Created: {convertUTCDateToLocalDate(new Date(account.created)).toLocaleString()}{' '}
                      </div>
                    </div>
                  </div>
                  <div className="stat float-right mt-1">
                    <TransitionGroup transitionName="example" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
                      <div className="head_block_time_font ">
                        {convertUTCDateToLocalDate(new Date(account.head_block_time)).toLocaleString()}
                      </div>
                      <div className="head_block_time_font text-right">Head Block Time</div>
                    </TransitionGroup>
                  </div>
                </div>
                <div
                  className={`card sameheight-item stats mbc  shadow-sm ${isDarkMode ? 'bg-dark-1' : ''}  pb-1`}
                  style={{margin: 2}}
                >
                  <div className={`card-header card-header-sm shadow-sm ${isDarkMode ? 'bg-dark' : 'bg-white'}  mb-1`}>
                    <div className="header-block pl-2">
                      <i className="fa fa-globe text-info mr-2" />
                      <h1 className="title text-info">
                        General info
                        {/* <Link to={`/account/${account_name}`}>{account_name}</Link> */}
                      </h1>
                    </div>
                  </div>
                  <div className=" row row-sm stats-container m-0 ">
                    <div className="col-6 col-sm-4 stat-col pr-1 pl-1">
                      <div className="mr-1 eos-icon">
                        <img src={eoslogo} alt="eos block explorer" />
                      </div>
                      <div className="stat">
                        <div className="value">{`${total_balance.toLocaleString('en', {
                          maximumSignificantDigits: 14
                        })} EOS`}</div>

                        <div className="name">Balance</div>
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
                    <div className="col-6 col-sm-4 stat-col pr-1 pl-1 d-none d-sm-block">
                      <div className="pd-bl">
                        <div className="stat-icon">
                          <i className="fa fa-dollar-sign" />
                        </div>
                        <div className="stat">
                          <div className="value">
                            {total_balance_usd.toLocaleString(undefined, {maximumFractionDigits: 0})} USD
                          </div>
                          <div className="name">To USD</div>
                        </div>
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
                    <div className="col-6 col-sm-4 stat-col pr-1 pl-1">
                      <div className="stat-icon">
                        <i className="fa fa-dollar-sign" />
                      </div>
                      <div className="stat">
                        <div className="value">{renderToFiatColor(to_fiat, isDarkMode)} USD</div>
                        <div className="name">To USD(RAM included)</div>
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
                    <div className="col-6 col-sm-4 stat-col pr-1 pl-1">
                      <div className="stat-icon">
                        <i className="fa fa-lock-open" />
                      </div>
                      <div className="stat">
                        <div className="value">
                          {unstaked.toLocaleString('en', {
                            maximumSignificantDigits: 14
                          })}
                        </div>
                        <div className="name">EOS unstaked</div>
                      </div>
                      <div className="progress stat-progress">
                        <div
                          className="progress-bar"
                          style={{
                            width: `${((unstaked / total_balance) * 100).toFixed(3)}%`
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-6 col-sm-4 stat-col pr-1 pl-1">
                      <div className="stat-icon">
                        <i className="fa fa-lock" />
                      </div>
                      <div className="stat">
                        <div className="value">
                          {staked.toLocaleString('en', {
                            maximumSignificantDigits: 14
                          })}
                        </div>
                        <div className="name"> EOS staked(Vote power) </div>
                      </div>
                      <div className="progress stat-progress">
                        <div
                          className="progress-bar"
                          style={{
                            width: `${((staked / total_balance) * 100).toFixed(3)}%`
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-6 col-sm-4  stat-col pr-1 pl-1">
                      <div className="stat-icon">
                        <i className="fa fa-key" />
                      </div>
                      <div className="stat">
                        <div className="value">
                          {refund.toLocaleString('en', {
                            maximumSignificantDigits: 14
                          })}{' '}
                          EOS
                        </div>
                        <div className="name">
                          Refunding<span className="ftz-8 text-success"> {refunded_time}</span>{' '}
                        </div>
                      </div>
                      <div className="progress stat-progress">
                        <div
                          className="progress-bar"
                          style={{
                            width: `${((refund / total_balance) * 100).toFixed(3)}%`
                          }}
                        />
                      </div>
                    </div>

                    <div className="col-6 col-sm-4  stat-col pr-1 pl-1">
                      <div className="stat-icon">
                        <i className="fa fa-microchip" />
                      </div>
                      <div className="stat">
                        <div className="value">{`${used_cpu}/${limited_cpu}`}</div>
                        <div className="name">{`CPU (${staked_cpu.toLocaleString('en', {
                          maximumSignificantDigits: 14
                        })} EOS)`}</div>
                      </div>
                      <div className="progress stat-progress">
                        <div
                          className="progress-bar"
                          style={{
                            width: `${((used_cpu_num / limited_cpu_num) * 100).toFixed(3)}%`
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-6 col-sm-4 stat-col pr-1 pl-1">
                      <div className="stat-icon">
                        <i className="fa fa-bolt" />
                      </div>
                      <div className="stat">
                        <div className="value">{`${used_net}/${limited_net}`}</div>
                        <div className="name">{`NET (${staked_net.toLocaleString('en', {
                          maximumSignificantDigits: 14
                        })} EOS)`}</div>
                      </div>
                      <div className="progress stat-progress">
                        <div
                          className="progress-bar"
                          style={{
                            width: `${((used_net_num / limited_net_num) * 100).toFixed(3)}%`
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-6 col-sm-4  stat-col pr-1 pl-1">
                      <div className="stat-icon">
                        <i className="fa fa-memory" />
                      </div>
                      <div className="stat">
                        <div className="value">{`${used_ram}/${limited_ram}`}</div>
                        <div className="name">RAM ({renderRamColor(eos_ram_equivalent, isDarkMode)} EOS)</div>
                      </div>
                      <div className="progress stat-progress">
                        <div
                          className="progress-bar"
                          style={{
                            width: `${((ram_usage_num / limited_ram_num) * 100).toFixed(3)}%`
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <AccPermsInfo permissions={account.permissions} account_name={account_name} isDarkMode={isDarkMode} />
                <VoterInfo voteinfo={voteinfo} head_block_time={account.head_block_time} isDarkMode={isDarkMode} />
                <SmartContract account_name={account_name} isDarkMode={isDarkMode} />
              </div>
            );
          else {
            return <ErrorAccNotFound account_name={this.props.account_name} />;
          }
        }}
      </Query>
    );
  }
}

export default AccountInfo;
