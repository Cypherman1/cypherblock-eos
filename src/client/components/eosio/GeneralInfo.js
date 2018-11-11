import React, {Component} from 'react';
import {Query} from 'react-apollo';
import {TransitionGroup} from 'react-transition-group';
import {Link} from 'react-router-dom';
import {
  renderBlockNum,
  renderEOSNum,
  renderEOSStaked,
  renderRamPriceColor,
  renderEOSPriceColor,
  renderPercentColor
} from '../utils/RenderColors';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import GetGeneralInfo from '../../queries/GetGeneralInfo';
import {convertUTCDateToLocalDate, renderAccountLink} from '../utils/Tools';
import {formatBandUnits} from '../utils/FormatUnits';

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
  ram_price,
  eos_price,
  percent_change_24h,
  eos_volume;

const GeneralInfoLoading = ({display, isDarkMode}) => {
  return (
    <div className={`card sameheight-item stats mbc ${isDarkMode ? 'bg-dark' : 'bg-white'}`} data-exclude="xs">
      <div className={`card-header shadow-sm row m-0 ${isDarkMode ? 'bg-dark' : 'bg-white'}`}>
        <div className="header-block pl-2 col">
          <FontAwesomeIcon icon="globe" className="mr-2 text-info fa-lg" />
          <h5 className="title text-info">
            General Info
            {/* <Link to={`/account/${account_name}`}>{account_name}</Link> */}
          </h5>
        </div>
        <div className="stat float-right">
          <TransitionGroup transitionName="example" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
            <div className="value head_block_time_font" />
          </TransitionGroup>
        </div>
      </div>
      <div className="card-block">
        <div className="text-center align-middle overlay pd-gi">
          <FontAwesomeIcon icon="spinner" spin className="text-info fa-2x" />
        </div>
        <div className="row row-sm stats-container m-0">
          <div className="col-6 col-sm-4 stat-col p-1">
            <div className="stat-icon">
              <FontAwesomeIcon icon="cube" />
            </div>
            <div className="stat">
              <div className="value" />
              <div className="name"> Head Block Num</div>
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
          <div className="col-6 col-sm-4  stat-col p-1">
            <div className="stat-icon">
              <FontAwesomeIcon icon="user-cog" />
            </div>
            <div className="stat">
              <TransitionGroup
                transitionName="example"
                transitionEnterTimeout={500}
                transitionLeaveTimeout={300}
                transitionEnter={true}
                transitionLeave={true}
              >
                <div className="value" />
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
          <div className="col-6 col-sm-4  stat-col p-1">
            <div className="stat-icon">
              <FontAwesomeIcon icon="cube" />
            </div>
            <div className="stat">
              <div className="value" />
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
          <div className="col-6 col-sm-4  stat-col p-1">
            <div className="stat-icon">
              <FontAwesomeIcon icon="coins" />
            </div>
            <div className="stat">
              <div className="value" />
              <div className="name">Total EOS supplied</div>
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
          <div className="col-6 col-sm-4 stat-col p-1">
            <div className="stat-icon">
              <FontAwesomeIcon icon="lock" />
            </div>
            <div className="stat">
              <div className="value" />
              <div className="name">Total EOS staked</div>
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
          <div className="col-6 col-sm-4 stat-col p-1">
            <div className="stat-icon">
              <FontAwesomeIcon icon="gavel" />
            </div>
            <div className="stat">
              <div className="value" />
              <div className="name">Total EOS voted</div>
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
          <div className="col-6 col-sm-4  stat-col p-1">
            <div className="stat-icon">
              <FontAwesomeIcon icon="memory" />
            </div>
            <div className="stat">
              <div className="value" />
              <div className="name">Max RAM size</div>
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
          <div className="col-6 col-sm-4 stat-col p-1">
            <div className="stat-icon">
              <FontAwesomeIcon icon="shopping-bag" />
            </div>
            <div className="stat">
              <div className="value" />
              <div className="name">Total RAM reserved</div>
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
          <div className="col-6 col-sm-4 stat-col p-1 d-none d-sm-block">
            <div className="stat-icon">
              <FontAwesomeIcon icon="cogs" />
            </div>
            <div className="stat">
              <div className="value" />
              <div className="name">Total RAM staked</div>
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
          {/* market info */}
          {/* <div className="col-6 col-sm-4 stat-col p-1 d-xl-none">
            <div className="stat-icon">
              <FontAwesomeIcon icon="coins" />
            </div>
            <div className="stat">
              <div className="value" />
              <div className="name"> 24h Volume (USD) </div>
            </div>
            <div className="progress stat-progress">
              <div
                className="progress-bar"
                style={{
                  width: '0%'
                }}
              />
            </div>
          </div>
          <div className="col-6 col-sm-4  stat-col p-1 d-xl-none">
            <div className="stat-icon">
              <FontAwesomeIcon icon="chart-bar" />
            </div>
            <div className="stat">
              <div className="value" />
              <div className="name"> RAM Price (EOS/KB) </div>
            </div>
            <div className="progress stat-progress">
              <div
                className="progress-bar"
                style={{
                  width: '0%'
                }}
              />
            </div>
          </div>
          <div className="col-6 col-sm-4 stat-col p-1 d-xl-none">
            <div className="stat-icon">
              <FontAwesomeIcon icon="dollar-sign" />
            </div>
            <div className="stat">
              <div className="value" />
              <div className="name"> EOS Price (USD) </div>
            </div>
            <div className="progress stat-progress">
              <div
                className="progress-bar"
                style={{
                  width: '0%'
                }}
              />
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

const GeneralInfo = ({isDarkMode}) => {
  return (
    <Query query={GetGeneralInfo} pollInterval={3000}>
      {({loading, error, data}) => {
        if (loading) return <GeneralInfoLoading isDarkMode={isDarkMode} />;

        if (error) return <GeneralInfoLoading isDarkMode={isDarkMode} />;
        const {eos_stat, staked, chain, global_data, cmc, table_rows} = data;
        if (eos_stat && staked && chain && global_data && cmc && table_rows) {
          eos_total_supply = Number(eos_stat.rows[0].supply.split(' ')[0]);
          total_staked = Number(staked.data[0].split(' ')[0]);
          head_block_num = Number(chain.head_block_num);
          head_block_time = convertUTCDateToLocalDate(new Date(chain.head_block_time));

          last_irreversible_block_num = Number(chain.last_irreversible_block_num);
          head_block_producer = chain.head_block_producer;
          max_ram_size = Number(global_data.rows[0].max_ram_size);
          total_ram_bytes_reserved = Number(global_data.rows[0].total_ram_bytes_reserved);
          total_ram_stake = Number(global_data.rows[0].total_ram_stake);
          total_activated_stake = Number(global_data.rows[0].total_activated_stake);
          ram_price =
            (
              Number(table_rows.rows[0].quote.balance.split(' ')[0]) /
              Number(table_rows.rows[0].base.balance.split(' ')[0])
            ).toFixed(8) * 1024;
          eos_price = Number(cmc.data.quotes.USD.price).toFixed(2);
          percent_change_24h = cmc.data.quotes.USD.percent_change_24h;
          eos_volume = Number(cmc.data.quotes.USD.volume_24h).toLocaleString('en', {maximumFractionDigits: 0});

          return (
            <div
              className={`card sameheight-item border stats mbc ${isDarkMode ? 'bg-dark' : 'bg-white'}`}
              data-exclude="xs"
            >
              <div className={`card-header shadow-sm row m-0 ${isDarkMode ? 'bg-dark' : 'bg-white'}`}>
                <div className="header-block pl-2 col">
                  <FontAwesomeIcon icon="globe" className="mr-2 text-info fa-lg" />
                  <h5 className="title text-info">
                    General Info
                    {/* <Link to={`/account/${account_name}`}>{account_name}</Link> */}
                  </h5>
                </div>
                <div className="stat float-right">
                  <TransitionGroup transitionName="example" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
                    <div className="head_block_time_font font-weight-bold">{head_block_time}</div>
                    <div className="head_block_time_font text-right">Head Block Time</div>
                  </TransitionGroup>
                </div>
              </div>
              <div className="card-block ">
                <div className="row row-sm stats-container m-0">
                  <div className="col-6 col-sm-4 stat-col p-1">
                    <div className="stat-icon">
                      <FontAwesomeIcon icon="cube" />
                    </div>
                    <div className="stat">
                      <div className="value">
                        <Link to={`/block/${head_block_num}`}>{renderBlockNum(head_block_num)}</Link>
                      </div>
                      <div className="name"> Head Block Num</div>
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
                  <div className="col-6 col-sm-4  stat-col p-1">
                    <div className="stat-icon">
                      <FontAwesomeIcon icon="user-cog" />
                    </div>
                    <div className="stat">
                      <TransitionGroup
                        transitionName="example"
                        transitionEnterTimeout={500}
                        transitionLeaveTimeout={300}
                        transitionEnter={true}
                        transitionLeave={true}
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
                  <div className="col-6 col-sm-4  stat-col p-1">
                    <div className="stat-icon">
                      <FontAwesomeIcon icon="cube" />
                    </div>
                    <div className="stat">
                      <div className="value">
                        <Link to={`/block/${last_irreversible_block_num}`}>
                          {renderBlockNum(last_irreversible_block_num)}
                        </Link>
                      </div>
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
                  <div className="col-6 col-sm-4  stat-col p-1">
                    <div className="stat-icon">
                      <FontAwesomeIcon icon="coins" />
                    </div>
                    <div className="stat">
                      <div className="value">{renderEOSNum(eos_total_supply)}</div>
                      <div className="name">Total EOS supplied</div>
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
                  <div className="col-6 col-sm-4 stat-col p-1">
                    <div className="stat-icon">
                      <FontAwesomeIcon icon="lock" />
                    </div>
                    <div className="stat">
                      <div className="value">{renderEOSStaked(total_staked, isDarkMode)}</div>
                      <div className="name">{`Total EOS staked (${((total_staked / eos_total_supply) * 100).toFixed(
                        2
                      )}%)`}</div>
                    </div>
                    <div className="progress stat-progress">
                      <div
                        className="progress-bar"
                        style={{
                          width: `${((total_staked / eos_total_supply) * 100).toFixed(3)}%`
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-6 col-sm-4 stat-col p-1">
                    <div className="stat-icon">
                      <FontAwesomeIcon icon="gavel" />
                    </div>
                    <div className="stat">
                      <div className="value">{renderEOSNum(total_activated_stake / 10000)}</div>
                      <div className="name">{`Total EOS voted (${(
                        (total_activated_stake / (eos_total_supply * 10000)) *
                        100
                      ).toFixed(2)}%)`}</div>
                    </div>
                    <div className="progress stat-progress">
                      <div
                        className="progress-bar"
                        style={{
                          width: `${(total_activated_stake / (eos_total_supply * 100)).toFixed(2)}%`
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-6 col-sm-4  stat-col p-1">
                    <div className="stat-icon">
                      <FontAwesomeIcon icon="memory" />
                    </div>
                    <div className="stat">
                      <div className="value">{formatBandUnits(max_ram_size)}</div>
                      <div className="name">Max RAM size</div>
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
                  <div className="col-6 col-sm-4 stat-col p-1">
                    <div className="stat-icon">
                      <FontAwesomeIcon icon="shopping-bag" />
                    </div>
                    <div className="stat">
                      <div className="value">{formatBandUnits(total_ram_bytes_reserved)}</div>
                      <div className="name">{`RAM reserved (${((total_ram_bytes_reserved / max_ram_size) * 100).toFixed(
                        2
                      )}%)`}</div>
                    </div>
                    <div className="progress stat-progress">
                      <div
                        className="progress-bar"
                        style={{
                          width: `${((total_ram_bytes_reserved / max_ram_size) * 100).toFixed(3)}%`
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-6 col-sm-4 stat-col p-1 d-none d-sm-block">
                    <div className="stat-icon">
                      <FontAwesomeIcon icon="cogs" />
                    </div>
                    <div className="stat">
                      <div className="value">{formatBandUnits(total_ram_stake)}</div>
                      <div className="name">{`RAM staked (${((total_ram_stake / max_ram_size) * 100).toFixed(
                        2
                      )}%)`}</div>
                    </div>
                    <div className="progress stat-progress">
                      <div
                        className="progress-bar"
                        style={{
                          width: `${((total_ram_stake * 100) / max_ram_size).toFixed(2)}%`
                        }}
                      />
                    </div>
                  </div>
                  {/* market info */}
                  {/* <div className="col-6 col-sm-4 stat-col p-1 d-xl-none">
                      <div className="stat-icon">
                        <FontAwesomeIcon icon="coins" />
                      </div>
                      <div className="stat">
                        <div className="value">{eos_volume}</div>
                        <div className="name"> 24h Volume (USD) </div>
                      </div>
                      <div className="progress stat-progress">
                        <div
                          className="progress-bar"
                          style={{
                            width: '0%'
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-6 col-sm-4 stat-col p-1 d-xl-none">
                      <div className="stat-icon">
                        <FontAwesomeIcon icon="chart-bar" />
                      </div>
                      <div className="stat">
                        <div className="value">{renderRamPriceColor(ram_price)}</div>
                        <div className="name"> RAM Price (EOS/KB) </div>
                      </div>
                      <div className="progress stat-progress">
                        <div
                          className="progress-bar"
                          style={{
                            width: '0%'
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-6 col-sm-4 stat-col p-1 d-xl-none">
                      <div className="stat-icon">
                        <FontAwesomeIcon icon="dollar-sign" />
                      </div>
                      <div className="stat">
                        <div className="value">
                          {renderEOSPriceColor(eos_price)}
                          {renderPercentColor(percent_change_24h)}
                        </div>
                        <div className="name"> EOS Price (USD) </div>
                      </div>
                      <div className="progress stat-progress">
                        <div
                          className="progress-bar"
                          style={{
                            width: '0%'
                          }}
                        />
                      </div>
                    </div> */}
                </div>
              </div>
            </div>
          );
        } else {
          return <GeneralInfoLoading isDarkMode={isDarkMode} />;
        }
      }}
    </Query>
  );
};

export default GeneralInfo;
