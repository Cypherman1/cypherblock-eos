import React, {Component} from 'react';
import {renderBlockNum} from '../utils/RenderColors';
import {Query} from 'react-apollo';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import GetGeneralInfo from '../../queries/GetGeneralInfo';
import {convertUTCDateToLocalDate, renderAccountLink} from '../utils/Tools';
import {TransitionGroup} from 'react-transition-group';

var eos_total_supply,
  total_staked,
  head_block_num,
  head_block_time,
  head_block_producer,
  last_irreversible_block_num,
  max_ram_size,
  total_ram_bytes_reserved,
  total_ram_stake,
  total_activated_stake,
  total_producder_vote_weight;

class GeneralInfo extends Component {
  render() {
    return (
      <Query query={GetGeneralInfo} pollInterval={500}>
        {({loading, error, data}) => {
          if (loading)
            return (
              <section className="section">
                <div className="text-center">
                  <FontAwesomeIcon icon="spinner" spin className="text-info" />
                </div>
              </section>
              //   );
            );

          if (error)
            return (
              <section className="section">
                <div className="text-center">
                  <FontAwesomeIcon icon="spinner" spin className="text-info" />
                </div>
              </section>
            );
          const {eos_stat, staked, chain, global_data} = data;
          if (eos_stat && staked && chain && global_data) {
            eos_total_supply = Number(eos_stat.rows[0].supply.split(' '));
            total_staked = Number(staked.data[0].split(' '));
            head_block_num = Number(chain.head_block_num);
            head_block_time = convertUTCDateToLocalDate(new Date(chain.head_block_time)).toLocaleString();
            last_irreversible_block_num = Number(chain.last_irreversible_block_num);
            head_block_producer = chain.head_block_producer;
            max_ram_size = Number(global_data.rows[0].max_ram_size);
            total_ram_bytes_reserved = Number(global_data.rows[0].total_ram_bytes_reserved);
            total_ram_stake = Number(global_data.rows[0].total_ram_stake);
            total_activated_stake = Number(global_data.rows[0].total_activated_stake);
          }
          return (
            <div className="card sameheight-item stats" data-exclude="xs">
              <div className="card-header card-header-sm bg-light shadow-sm">
                <div className="header-block pl-3">
                  <FontAwesomeIcon icon="cubes" className="mr-2 text-info" />
                  <h5 className="title">
                    General Info
                    {/* <Link to={`/account/${account_name}`}>{account_name}</Link> */}
                  </h5>
                </div>
              </div>
              <div className="card-block ">
                <div className="row row-sm stats-container m-0">
                  <div className="col-6 col-sm-3 stat-col p-1">
                    <div className="stat-icon text-secondary">
                      <FontAwesomeIcon icon="cube" />
                    </div>
                    <div className="stat">
                      <div className="value">{renderBlockNum(head_block_num)}</div>
                      <div className="name"> Head Block </div>
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
                  <div className="col-6 col-sm-3 stat-col p-1">
                    <div className="stat-icon text-secondary">
                      <FontAwesomeIcon icon="clock" />
                    </div>
                    <div className="stat">
                      <TransitionGroup
                        transitionName="example"
                        transitionEnterTimeout={500}
                        transitionLeaveTimeout={300}
                      >
                        <div className="value head_block_time_font">{head_block_time}</div>
                      </TransitionGroup>
                      <div className="name"> Head Block Time </div>
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
                  <div className="col-6 col-sm-3  stat-col p-1">
                    <div className="stat-icon text-secondary">
                      <FontAwesomeIcon icon="user-cog" />
                    </div>
                    <div className="stat">
                      <TransitionGroup
                        transitionName="example"
                        transitionAppear={true}
                        transitionAppearTimeout={500}
                        transitionEnter={false}
                        transitionLeave={false}
                      >
                        <div className="value">{renderAccountLink(head_block_producer)}</div>
                      </TransitionGroup>
                      <div className="name">Head Block Producer </div>
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
                  <div className="col-6 col-sm-3  stat-col p-1">
                    <div className="stat-icon text-secondary">
                      <FontAwesomeIcon icon="cube" />
                    </div>
                    <div className="stat">
                      <div className="value">{renderBlockNum(last_irreversible_block_num)}</div>
                      <div className="name">Last Inreversible Block</div>
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
                  {/* <div className="col-12 col-sm-4  stat-col p-1">
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
                  <div className="col-12 col-sm-4 stat-col p-1">
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
                  </div> */}
                </div>
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default GeneralInfo;
