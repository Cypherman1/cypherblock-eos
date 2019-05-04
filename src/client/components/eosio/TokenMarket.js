/*H******************************************************************************
* DESCRIPTION :
*       TokenMarket component shows the market info of EOS, RAM and tops tokens
*/
import React, {Component} from 'react';
import {Query} from 'react-apollo';
import {connect} from 'react-redux';
import ReactImageFallback from 'react-image-fallback';
import {Link} from 'react-router-dom';
import GetTokenMarket from '../../queries/GetTokenMarket';
import {renderProjectLink, renderMCVal, renderMCPrice, renderMCPriceRex} from '../utils/Tools';
import {renderPPColor} from '../utils/RenderColors';
const images = './imgs';
import {setSearchSymbol} from '../../actions/common';
import {setMarketcapUnit} from '../../actions/sidebar';
import {IsTokenSearched} from '../utils/isTokenSearched';

let items = [];
let token_logo = null;
let fallback_logo = `${images}/COMMON.png`;
let ram_price = 0;
let eos_price = 0;
let eos_percent_change_24h = 0;
let eos_volume_24h = 0;
let eos_total_supply = 0;
let ticker_count = 0;
let rex_price = 0;

const TokenMarketLoading = ({isDarkMode}) => {
  return (
    <div
      className={`card sameheight-item stats mb-1  ${isDarkMode ? 'bg-dark text-secondary' : ''} pb-2`}
      data-exclude="xs"
    >
      <div className="card-header shadow-sm bg-white row m-0">
        <div className="header-block pl-2 col">
          <i className="fa fa-chart-bar text-info fa-lg mr-2" />
          <h1 className="title text-info">EOSMarketcap</h1>
        </div>
        <label className="font-weight-normal float-right mb-0 pr-1">
          <select id="inputmcUnitm" className="form-control-sm border-0" style={{height: 30}}>
            <option value={1}>EOS</option>
            <option value={2}>USD</option>
          </select>
        </label>
      </div>

      <div
        className={`card-token-price shadow-sm ${isDarkMode ? 'bg-dark text-cypher' : ''} ml-0 p-1 mt-0`}
        style={{marginBottom: 1}}
      >
        <div className="row ftz-12 text-info  m-0">
          <div className="col-4 pl-1 pr-0 d-flex align-items-center">
            <div className="d-flex align-items-center mr-3">#</div>
            <div className=""> Name </div>
            <div className=" ml-2 d-flex align-items-center">
              <div> </div>
            </div>
          </div>
          <div className="col-4 p-0 ">
            <div className="text-right">24h Volume</div>
            <div className="text-right">Marketcap</div>
          </div>
          <div className="col-4  pr-1">
            <div className="text-right">Price </div>
            <div className="text-right">24h Change </div>
          </div>
        </div>
      </div>
      <div className={`card-block p-0 market-scroll`}>
        <div style={{height: 40}} />
        <div className="text-center align-middle overlay" style={{paddingTop: 92}}>
          <i className="fa fa-spinner fa-spin text-info fa-2x" />
        </div>
      </div>
    </div>
  );
};

class TokenMarket extends Component {
  render() {
    const {display, isDarkMode} = this.props;
    const {mcUnit} = this.props.sidebar;

    return (
      <Query query={GetTokenMarket} pollInterval={0}>
        {({loading, error, data}) => {
          if (loading) return <TokenMarketLoading isDarkMode={isDarkMode} />;
          if (error) return <TokenMarketLoading isDarkMode={isDarkMode} />;
          if (data && data.table_rows && data.cmc && data.eosmarketcap && data.eos_stat && data.rex_pool) {
            const {table_rows, cmc, eos_stat, rex_pool} = data;
            ticker_count = 0;
            if (rex_pool.rows && rex_pool.rows[0]) {
              rex_price =
                Number(rex_pool.rows[0].total_lendable.split(' ')[0]) /
                Number(rex_pool.rows[0].total_rex.split(' ')[0]);
            }
            ram_price = (
              (Number(table_rows.rows[0].quote.balance.split(' ')[0]) /
                Number(table_rows.rows[0].base.balance.split(' ')[0])) *
              1024
            ).toFixed(4);
            eos_total_supply = Number(eos_stat.rows[0].supply.split(' ')[0]);

            eos_price = Number(cmc.EOS.quote.USD.price);
            eos_percent_change_24h = cmc.EOS.quote.USD.percent_change_24h;
            eos_volume_24h = cmc.EOS.quote.USD.volume_24h;

            items = [];
            //RAM
            items.push(
              <div className={`card-token-price shadow-sm ${isDarkMode ? 'bg-dark' : ''} p-1 mbt-1px`} key={0}>
                <div className="row ftz-12  m-0">
                  <div className="col-6 pl-1 pr-0 d-flex align-items-center">
                    <div className="d-flex align-items-center mr-3">-</div>
                    <div className="token_logo" style={{fontSize: 16}}>
                      <i className="fa fa-memory" />
                    </div>
                    <div className="ml-2 d-flex align-items-center">
                      <div>RAM(KB)</div>
                    </div>
                  </div>
                  <div className="col-6  pr-1 d-flex align-items-center flex-row-reverse">
                    <div className="text-right">{renderMCPrice(ram_price, mcUnit, eos_price)} </div>
                  </div>
                </div>
              </div>
            );
            //REX
            items.push(
              <div className={`card-token-price shadow-sm ${isDarkMode ? 'bg-dark' : ''} p-1 mbt-1px`} key={2}>
                <div className="row ftz-12  m-0">
                  <div className="col-6 pl-1 pr-0 d-flex align-items-center">
                    <div className="d-flex align-items-center mr-3">-</div>
                    <div className="token_logo" style={{fontSize: 16}}>
                      <i className="fa fa-exchange-alt" />
                    </div>
                    <div className="ml-2 d-flex align-items-center">
                      <div>REX</div>
                    </div>
                  </div>
                  <div className="col-6  pr-1 d-flex align-items-center flex-row-reverse">
                    <div className="text-right">{renderMCPriceRex(rex_price, mcUnit, eos_price)} </div>
                  </div>
                </div>
              </div>
            );

            items.push(
              <div
                className={`card-token-price shadow-sm pl-1 pr-1 ${isDarkMode ? 'bg-dark' : ''}`}
                key={3}
                style={{marginBottom: 1}}
              >
                <div className="row ftz-12  m-0">
                  <div className="col-4 pl-1 pr-0 d-flex align-items-center">
                    <div className="d-flex align-items-center mr-3">1</div>
                    <div className="">
                      <ReactImageFallback
                        src={`${images}/EOS.png`}
                        fallbackImage={fallback_logo}
                        className="token_logo"
                        alt="eos airdrop"
                      />
                    </div>
                    <div className=" ml-2 d-flex align-items-center">
                      <div> EOS </div>
                    </div>
                  </div>
                  <div className="col-4 p-0 ">
                    <div className="text-right">
                      {renderMCVal(Number(eos_volume_24h) / Number(eos_price), 2, eos_price)}
                    </div>
                    <div className="text-right">{renderMCVal(eos_total_supply, 2, eos_price)}</div>
                  </div>
                  <div className="col-4  pr-1">
                    <div className="text-right">${Number(eos_price).toFixed(2)} </div>
                    <div className="text-right"> {renderPPColor(eos_percent_change_24h)} </div>
                  </div>
                </div>
              </div>
            );

            data.eosmarketcap.data.map((tokeninfo, index) => {
              if (tokeninfo.last > 0) {
                ticker_count += 1;
                if (IsTokenSearched(tokeninfo, this.props.common.symbol)) {
                  token_logo = `${images}/${tokeninfo.symbol}.png`;

                  items.push(
                    <div
                      className={`card-token-price shadow-sm ${
                        isDarkMode ? 'bg-dark text-cypher' : ''
                      } ml-0 pl-1 pr-1 mt-0`}
                      key={tokeninfo.symbol}
                      style={{marginBottom: 1}}
                    >
                      <div className="row ftz-12  m-0">
                        <div className="col-4 pl-1 pr-0 d-flex align-items-center">
                          {/* <img src={token_logo} className="token_logo" /> */}
                          <div className="d-flex align-items-center mr-3">{index + 2}</div>
                          <div className="bg-white logo-bgr">
                            <ReactImageFallback
                              src={token_logo}
                              fallbackImage={fallback_logo}
                              alt={`${tokeninfo.currency}`}
                              className="token_logo"
                            />
                          </div>
                          <div className="ml-2 d-flex align-items-center">
                            {renderProjectLink(tokeninfo)}
                            {/* <div> {`${tokeninfo.currency.toUpperCase()}`}</div> */}
                          </div>
                        </div>
                        <div className="col-4 p-0 ">
                          <div className="text-right">{renderMCVal(tokeninfo.volume, mcUnit, eos_price)}</div>
                          <div className="text-right">
                            {renderMCVal(Number(tokeninfo.last) * Number(tokeninfo.supply.current), mcUnit, eos_price)}
                          </div>
                        </div>

                        <div className="col-4  pl-0 pr-1">
                          <div className="text-right"> {renderMCPrice(tokeninfo.last, mcUnit, eos_price)} </div>
                          <div className="text-right">{renderPPColor(Number(tokeninfo.change).toFixed(2))} </div>
                        </div>
                      </div>
                    </div>
                  );
                }
              }
            });
            return (
              <div
                className={`card  sameheight-item stats ${display} ${
                  isDarkMode ? 'bg-dark text-cypher  ' : ''
                } pb-2 mb-1px`}
                data-exclude="xs"
              >
                <div className="card-header shadow-sm bg-white row m-0">
                  <div className="header-block pl-2 col">
                    <Link className="font-weight-normal text-info" aria-label="eos marketcap" to={`/eosmarketcap`}>
                      <i className="fa fa-chart-bar text-info fa-lg mr-2" />
                    </Link>
                    <h1 className="title text-info">
                      <Link className="font-weight-normal text-info" to={`/eosmarketcap`}>
                        EOS Marketcap
                      </Link>
                    </h1>
                  </div>
                  <label className="font-weight-normal float-right mb-0 pr-1">
                    <select
                      id="inputmcUnitm"
                      className="form-control-sm border-0"
                      value={mcUnit}
                      onChange={(event) => {
                        this.props.setMarketcapUnit(event.target.value);
                      }}
                      style={{height: 30}}
                    >
                      <option value={1}>EOS</option>
                      <option value={2}>USD</option>
                    </select>
                  </label>
                </div>
                <div
                  className={`card-token-price shadow-sm ${isDarkMode ? 'bg-dark text-cypher' : ''} ml-0 p-1 mt-0`}
                  style={{marginBottom: 1}}
                >
                  <div className="row ftz-12 text-info  m-0">
                    <div className="col-4 pl-1 pr-0 d-flex align-items-center">
                      <div className="d-flex align-items-center mr-3">#</div>
                      <div className=""> Name </div>
                      <div className=" ml-2 d-flex align-items-center">
                        <div> </div>
                      </div>
                    </div>
                    <div className="col-4 p-0 ">
                      <div className="text-right">24h Volume</div>
                      <div className="text-right">Marketcap</div>
                    </div>
                    <div className="col-4  pr-1">
                      <div className="text-right">Price </div>
                      <div className="text-right">24h Change </div>
                    </div>
                  </div>
                </div>

                <div className={`card-body ${isDarkMode ? 'bg-dark' : 'bg-light'}  p-0 market-scroll `}>{items}</div>
                <div className="text-right pr-2 mt-2">
                  <Link to={`/eosmarketcap`}> >> Show more </Link>
                </div>
              </div>
            );
          } else {
            return <TokenMarketLoading isDarkMode={isDarkMode} />;
          }
        }}
      </Query>
    );
  }
}

function mapStateToProps({myStore}) {
  return {common: myStore.common, sidebar: myStore.sidebar};
}

export default connect(
  mapStateToProps,
  {
    setSearchSymbol,
    setMarketcapUnit
  }
)(TokenMarket);
