import React, {Component} from 'react';
import {Query} from 'react-apollo';
import {Link} from 'react-router-dom';
import {renderRamColor} from '../utils/RenderColors';
import {formatBandUnits, formatCPUUnits} from '../utils/FormatUnits';
import ErrorPage from '../ErrorPage';
import eoslogo from '../../assets/imgs/eoslogo1.svg';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import ErrorBoundary from '../ErrorBoundary';

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

var ram_price = 0;

var ram_reserve = 0;

var eos_ram_equivalent = 0;

var ram_usage_num = 0;

var limited_ram_num = 0;

var limited_net_num = 0;

var used_net_num = 0;

var limited_cpu_num = 0;

var used_cpu_num = 0;
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

class AccountInfo extends Component {
  getAccountInfo(account, table_rows) {
    try {
      if (account) {
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
          total_balance = staked_cpu + staked_net + unstaked + refund;
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
        ram_price = (
          (Number(table_rows.rows[0].quote.balance.split(' ')[0]) /
            Number(table_rows.rows[0].base.balance.split(' ')[0])) *
          1024
        ).toFixed(8);
        //EOS RAM equivalent
        if (account.total_resources)
          eos_ram_equivalent = ((Number(account.total_resources.ram_bytes) * ram_price) / 1024).toFixed(4);
      }
    } catch (e) {
      throw e;
    }
  }
  render() {
    return (
      <Query query={GetAccountInfo} variables={{account_name: this.props.account_name}} pollInterval={5000}>
        {({loading, error, data}) => {
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

          const {account, table_rows} = data;
          this.getAccountInfo(account, table_rows);
          return (
            <div className="card sameheight-item stats" data-exclude="xs">
              <div className="card-block">
                <div className="title-block row ">
                  <div className="col-12 col-sm-12 header-col">
                    <div className="pb-2 border-bottom header-border">
                      <div className="ml-1 mr-2 eos-icon">
                        <img src={eoslogo} />
                      </div>
                      <div className="stat">
                        <div className="value text-info">{`${total_balance.toLocaleString('en', {
                          maximumSignificantDigits: 14
                        })} EOS`}</div>
                        <div className="name acc-name-font">
                          <Link to={`/account/${account_name}`}>{account_name}</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row row-sm stats-container">
                  <div className="col-12 col-sm-4 stat-col">
                    <div className="stat-icon text-secondary">
                      <FontAwesomeIcon icon="lock-open" />
                    </div>
                    <div className="stat">
                      <div className="value">
                        {unstaked.toLocaleString('en', {
                          maximumSignificantDigits: 14
                        })}
                      </div>
                      <div className="name"> EOS unstaked </div>
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
                  <div className="col-12 col-sm-4 stat-col">
                    <div className="stat-icon text-secondary">
                      <FontAwesomeIcon icon="lock" />
                    </div>
                    <div className="stat">
                      <div className="value">
                        {staked.toLocaleString('en', {
                          maximumSignificantDigits: 14
                        })}
                      </div>
                      <div className="name"> EOS staked </div>
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
                  <div className="col-12 col-sm-4  stat-col">
                    <div className="stat-icon text-secondary">
                      <FontAwesomeIcon icon="key" />
                    </div>
                    <div className="stat">
                      <div className="value">
                        {refund.toLocaleString('en', {
                          maximumSignificantDigits: 14
                        })}
                      </div>
                      <div className="name">EOS refunding </div>
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
                  <div className="col-12 col-sm-4  stat-col">
                    <div className="stat-icon text-secondary">
                      <FontAwesomeIcon icon="memory" />
                    </div>
                    <div className="stat">
                      <div className="value">{`${used_ram}/${limited_ram}`}</div>
                      <div className="name">RAM ({renderRamColor(eos_ram_equivalent)} EOS)</div>
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
                  <div className="col-12 col-sm-4  stat-col">
                    <div className="stat-icon text-secondary">
                      <FontAwesomeIcon icon="microchip" />
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
                  <div className="col-12 col-sm-4 stat-col">
                    <div className="stat-icon text-secondary">
                      <FontAwesomeIcon icon="bolt" />
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
                </div>
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default AccountInfo;
