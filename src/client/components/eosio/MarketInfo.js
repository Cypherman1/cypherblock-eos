import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {renderRamPriceColor, renderEOSPriceColor, renderPercentColor} from '../utils/RenderColors';

var ram_price, ram_reserve;

class MarketInfo extends Component {
  render() {
    const {cmc, eosioramfee, eosioram, global_data, table_rows} = this.props;

    ram_price = (
      (Number(table_rows.rows[0].quote.balance.split(' ')[0]) / Number(table_rows.rows[0].base.balance.split(' ')[0])) *
      1024
    ).toFixed(8);
    ram_reserve =
      (Number(global_data.rows[0].total_ram_bytes_reserved) / Number(global_data.rows[0].max_ram_size)) * 100;
    return (
      <div className="col col-12 col-sm-12 col-md-12 col-l-7 col-xl-4 history-col ">
        <div className="card sameheight-item stats" data-exclude="xs">
          <div className="card-block">
            <div className="title-block row">
              <div className="col-12 col-sm-12 header-col">
                <div className="stat-icon text-info">
                  <i className="fa fa-line-chart" />
                </div>
                <div className="stat text-info"> Market info </div>
              </div>
            </div>
            <div className="row row-sm stats-container">
              <div className="col-12 col-sm-6  stat-col">
                <div className="stat-icon">
                  <i className="fa fa-chart-bar" />
                </div>
                <div className="stat">
                  <div className="value">{renderRamPriceColor(ram_price)}</div>
                  <div className="name"> RAM Price (EOS) </div>
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
              <div className="col-12 col-sm-6  stat-col">
                <div className="stat-icon">
                  <i className="fa fa-chart-pie" />
                </div>
                <div className="stat">
                  <div className="value">{`${ram_reserve.toFixed(2)}%`}</div>
                  <div className="name">RAM Reserve (%)</div>
                </div>
                <div className="progress stat-progress">
                  <div
                    className="progress-bar"
                    style={{
                      width: `${ram_reserve.toFixed(0)}%`
                    }}
                  />
                </div>
              </div>
              <div className="col-12 col-sm-6  stat-col">
                <div className="stat-icon">
                  <i className="fa fa-chart-bar" />
                </div>
                <div className="stat">
                  <div className="value">{Number(eosioram.core_liquid_balance.split(' ')[0]).toLocaleString('en')}</div>
                  <div className="name">
                    <Link to={`/account/eosio.ram`}>eosio.ram</Link>
                  </div>
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
              <div className="col-12 col-sm-6  stat-col">
                <div className="stat-icon">
                  <i className="fa fa-chart-pie" />
                </div>
                <div className="stat">
                  <div className="value">
                    {Number(eosioramfee.core_liquid_balance.split(' ')[0]).toLocaleString('en')}
                  </div>
                  <div className="name">
                    <Link to={`/account/eosio.ramfee`}>eosio.ramfee</Link>
                  </div>
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
              <div className="col-12 col-sm-6 stat-col">
                <div className="stat-icon">
                  <i className="fa fa-dollar-sign" />
                </div>
                <div className="stat">
                  <div className="value">
                    {renderEOSPriceColor(Number(cmc.data.quotes.USD.price))}
                    {renderPercentColor(cmc.data.quotes.USD.percent_change_24h)}
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
              </div>
              <div className="col-12 col-sm-6 stat-col">
                <div className="stat-icon">
                  <i className="fa fa-coins" />
                </div>
                <div className="stat">
                  <div className="value">{Number(cmc.data.quotes.USD.volume_24h).toLocaleString('en')}</div>
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
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MarketInfo;
