/*H**********************************************************************
* DESCRIPTION :
*       GeneralInfo component shows the Blockchain's general info
*/

import React from 'react';
import {Query} from 'react-apollo';
import {TransitionGroup} from 'react-transition-group';
import {Link} from 'react-router-dom';
import {renderBlockNum, renderEOSNum, renderEOSStaked} from '../utils/RenderColors';
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
  eos_volume,
  rex_price,
  rex_loan_num,
  rex_liquidity,
  rex_total_borrowed,
  rex_resource_price;

const GeneralInfoLoading = ({display, isDarkMode}) => {
  return (
    <div className={`card sameheight-item stats mb-1px ${isDarkMode ? 'bg-dark' : 'bg-white'}`} data-exclude="xs">
      <div className={`card-header shadow-sm row m-0 ${isDarkMode ? 'bg-dark' : 'bg-white'}`}>
        <div className="header-block pl-2 col">
          <i className="fa fa-globe text-info fa-lg mr-2" />
          <h1 className="title text-info">General Info</h1>
        </div>
        <div className="stat float-right">
          <TransitionGroup transitionName="example" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
            <div className="value head_block_time_font" />
          </TransitionGroup>
        </div>
      </div>
      <div className="card-block">
        <div className="text-center align-middle overlay pd-gi">
          <i className="fa fa-spinner fa-spin text-info fa-2x" />
        </div>
        <div className="row row-sm stats-container m-0">
          <div className="col-6 col-sm-4 stat-col p-1">
            <div className="stat-icon">
              <i className="fa fa-cube" />
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
              <i className="fa fa-user-cog" />
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
              <i className="fa fa-cube" />
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
              <i className="fa fa-coins" />
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
              <i className="fa fa-lock" />
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
              <i className="fa fa-gavel" />
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
              <i className="fa fa-memory" />
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
              <i className="fa fa-shopping-bag" />
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
              <i className="fa fa-cogs" />
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
        </div>
      </div>
    </div>
  );
};

const GeneralInfo = ({isDarkMode}) => {
  return (
    <Query query={GetGeneralInfo} pollInterval={5000}>
      {({loading, error, data}) => {
        if (loading) return <GeneralInfoLoading isDarkMode={isDarkMode} />;

        if (error) return <GeneralInfoLoading isDarkMode={isDarkMode} />;
        const {eos_stat, staked, chain, global_data, cmc, table_rows, rex_pool} = data;
        if (eos_stat && staked && chain && global_data && cmc && table_rows && rex_pool) {
          if (rex_pool.rows && rex_pool.rows[0]) {
            rex_price =
              Number(rex_pool.rows[0].total_lendable.split(' ')[0]) / Number(rex_pool.rows[0].total_rex.split(' ')[0]);
            rex_loan_num = Number(rex_pool.rows[0].loan_num);
            rex_liquidity = Number(rex_pool.rows[0].total_lendable.split(' ')[0]);
            rex_total_borrowed = Number(rex_pool.rows[0].total_lent.split(' ')[0]);
            rex_resource_price =
              Number(rex_pool.rows[0].total_unlent.split(' ')[0]) / Number(rex_pool.rows[0].total_rent.split(' ')[0]);
          }

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
          eos_price = Number(cmc.EOS.quote.USD.price).toFixed(2);
          percent_change_24h = cmc.EOS.quote.USD.percent_change_24h;
          eos_volume = Number(cmc.EOS.quote.USD.volume_24h).toLocaleString('en', {maximumFractionDigits: 0});

          return (
            <div
              className={`card sameheight-item stats mb-1px ${isDarkMode ? 'bg-dark' : 'bg-white'}`}
              data-exclude="xs"
            >
              <div className={`card-header shadow-sm row m-0 ${isDarkMode ? 'bg-dark' : 'bg-white'}`}>
                <div className="header-block pl-2 col">
                  <i className="fa fa-globe text-info fa-lg mr-2" />
                  <h1 className="title text-info">General Info</h1>
                </div>

                <div className="stat float-right">
                  <TransitionGroup transitionName="example" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
                    <div className="head_block_time_font ">{head_block_time}</div>
                    <div className="head_block_time_font text-right">Head Block Time</div>
                  </TransitionGroup>
                </div>
              </div>
              <div className="card-block ">
                <div className="row row-sm stats-container m-0">
                  <div className="col-6 col-sm-4 stat-col p-1">
                    <div className="stat-icon">
                      <i className="fa fa-cube" />
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
                      <i className="fa fa-user-cog" />
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
                      <i className="fa fa-cube" />
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
                      <i className="fa fa-coins" />
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
                      <i className="fa fa-lock" />
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
                      <i className="fa fa-gavel" />
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
                      <i className="fa fa-memory" />
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
                      <i className="fa fa-shopping-bag" />
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
                  <div className="col-6 col-sm-4 stat-col p-1 ">
                    <div className="stat-icon">
                      <i className="fa fa-cogs" />
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
                  {/* REX liquidity */}
                  <div className="col-6 col-sm-4 stat-col p-1 ">
                    <div className="stat-icon">
                      <i className="fa fa-exchange-alt" />
                    </div>
                    <div className="stat">
                      <div className="value">
                        {renderEOSNum(rex_liquidity)} EOS
                        {/* {rex_liquidity.toLocaleString(undefined, {maximumFractionDigits: 4})} EOS */}
                      </div>
                      <div className="name">{`REX Liquidity (${((rex_liquidity / eos_total_supply) * 100).toFixed(
                        2
                      )}%)`}</div>
                    </div>
                    <div className="progress stat-progress">
                      <div
                        className="progress-bar"
                        style={{
                          width: `${((rex_liquidity / eos_total_supply) * 100).toFixed(2)}%`
                        }}
                      />
                    </div>
                  </div>
                  {/* lent on loan */}
                  <div className="col-6 col-sm-4 stat-col p-1 ">
                    <div className="stat-icon">
                      <i className="fa fa-exchange-alt" />
                    </div>
                    <div className="stat">
                      <div className="value">
                        {renderEOSNum(rex_total_borrowed)} EOS
                        {/* {rex_total_borrowed.toLocaleString(undefined, {maximumFractionDigits: 4})} EOS */}
                      </div>
                      <div className="name">{`Lent on loans (${((rex_total_borrowed / rex_liquidity) * 100).toFixed(
                        2
                      )}%)`}</div>
                    </div>
                    <div className="progress stat-progress">
                      <div
                        className="progress-bar"
                        style={{
                          width: `${((rex_total_borrowed / rex_liquidity) * 100).toFixed(2)}%`
                        }}
                      />
                    </div>
                  </div>
                  {/* # of loan */}
                  <div className="col-6 col-sm-4 stat-col p-1 ">
                    <div className="stat-icon">
                      <i className="fa fa-exchange-alt" />
                    </div>
                    <div className="stat">
                      <div className="value">{rex_loan_num.toLocaleString(undefined, {maximumFractionDigits: 0})}</div>
                      <div className="name">{`Total # of Loans`}</div>
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
                  {/* Price of resource */}
                  <div className="col-12 col-sm-12 stat-col p-1 ">
                    <div className="stat-icon">
                      <i className="fa fa-exchange-alt" />
                    </div>
                    <div className="stat">
                      <div className="value">
                        1 EOS can borrow {renderEOSNum(rex_resource_price)} EOS for 30 days
                        {/* {rex_resource_price.toLocaleString(undefined, {maximumFractionDigits: 0})} */}
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
