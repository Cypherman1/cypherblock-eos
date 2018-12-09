import React, {Component} from 'react';
import {Query} from 'react-apollo';
import {connect} from 'react-redux';
import ReactImageFallback from 'react-image-fallback';
import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Tokens} from '../utils/Tokens';
import GetTokenMarket from '../../queries/GetTokenMarket';
import {gettPairPrice, gettPairPercent} from '../utils/Tools';
import {renderPPColor} from '../utils/RenderColors';
const images = './imgs';
import {setSearchSymbol} from '../../actions/common';
import {setMarketcapUnit} from '../../actions/sidebar';
import {IsTokenSearched} from '../utils/isTokenSearched';
import eoslogo from '../../assets/imgs/eoslogo1.svg';

let TokenMarketInfo = []; //tokens market info array
let atoken = null;
let items = [];
let token_logo = null;
let fallback_logo = `${images}/COMMON.png`;
let ram_price = 0;
let eos_price = 0;
let eos_percent_change_24h = 0;
let ticker_count = 0;
let tokensMarket = [];

const TokenMarketLoading = ({isDarkMode}) => {
  return (
    <div
      className={`card sameheight-item stats mb-1  ${isDarkMode ? 'bg-dark text-secondary' : ''} pb-2`}
      data-exclude="xs"
    >
      <div className="card-header shadow-sm bg-white row m-0">
        <div className="header-block pl-2 col">
          <FontAwesomeIcon icon="chart-bar" className="mr-2 text-info fa-lg" />
          <h1 className="title text-info">EOS Market info</h1>
        </div>
        <label className="font-weight-normal float-right mb-0 pr-1">
          <select id="inputmcUnitm" className="form-control-sm border-0" style={{height: 30}}>
            <option value={1}>EOS</option>
            <option value={2}>USD</option>
          </select>
        </label>
        {/* <div>
          <div className="input-group input-group-seamless mb-0 pr-1 float-right" style={{width: 100, height: 30}}>
            <input
              type="text"
              className={`form-control ${isDarkMode ? 'border-secondary' : 'border-info'} `}
              aria-label="Text input with checkbox"
            />
            <div className="input-group-append">
              <div className="input-group-text">
                <i className="fa fa-search" />
              </div>
            </div>
          </div>
        </div> */}
      </div>

      <div
        className={`card-token-price shadow-sm ${isDarkMode ? 'bg-dark text-cypher' : ''} ml-0 p-1 mt-0`}
        style={{marginBottom: 1}}
      >
        <div className="row ftz-12 text-info  m-0">
          <div className="col-5 pl-1 pr-0 d-flex flex-row row m-0">
            {/* <img src={token_logo} className="token_logo" /> */}
            <div className="d-flex align-items-center flex-row-reverse col-2">#</div>
            <div className="">Name</div>
            <div className="ml-2 d-flex align-items-center" />
          </div>
          <div className="col-4 text-right  d-flex align-items-center flex-row-reverse pl-0">Price</div>
          <div className="col-3 d-flex align-items-center flex-row-reverse pr-1">24h %</div>
        </div>
      </div>
      <div className={`card-block p-0 market-scroll`}>
        <div style={{height: 40}} />
        <div className="text-center align-middle overlay pd-mi">
          <FontAwesomeIcon icon="spinner" spin className="text-info fa-2x" />
        </div>
      </div>
    </div>
  );
};

const renderMCPrice = (mcVal, mcUnit, eos_price) => {
  return (
    <div>
      {mcUnit == 1 ? <img src={eoslogo} alt="eos" className="eos-unit" /> : '$'}
      {mcUnit == 1
        ? Number(mcVal).toLocaleString(undefined, {maximumSignificantDigits: 4})
        : (Number(mcVal) * Number(eos_price)).toLocaleString(undefined, {maximumSignificantDigits: 4})}
    </div>
  );
};

class TokenMarket extends Component {
  render() {
    const {display, isDarkMode} = this.props;
    const {mcUnit} = this.props.sidebar;
    // fallback_logo = isDarkMode ? `${images}/eos_white.png` : `${images}/COMMON.png`;
    return (
      <Query query={GetTokenMarket} pollInterval={0}>
        {({loading, error, data}) => {
          if (loading) return <TokenMarketLoading isDarkMode={isDarkMode} />;
          if (error) return <TokenMarketLoading isDarkMode={isDarkMode} />;
          if (data && data.table_rows && data.cmc && data.eosmarketcap) {
            const {table_rows, cmc} = data;
            ticker_count = 0;

            ram_price = (
              (Number(table_rows.rows[0].quote.balance.split(' ')[0]) /
                Number(table_rows.rows[0].base.balance.split(' ')[0])) *
              1024
            ).toFixed(4);

            eos_price = Number(cmc.data.quotes.USD.price).toFixed(2);
            eos_percent_change_24h = cmc.data.quotes.USD.percent_change_24h;

            items = [];

            items.push(
              <div className={`card-token-price shadow-sm ${isDarkMode ? 'bg-dark' : ''} p-1 mbt-1px`} key={2}>
                <div className="row ftz-12  m-0">
                  <div className="col-5 pl-1 pr-0 d-flex flex-row row m-0">
                    <div className="d-flex align-items-center flex-row-reverse col-2">0</div>
                    <div className="token_logo" style={{fontSize: 16}}>
                      <FontAwesomeIcon icon="memory" />
                    </div>
                    <div className="ml-2 d-flex align-items-center">
                      <div>RAM(KB)</div>
                    </div>
                  </div>
                  <div className="col-4 text-right d-flex align-items-center flex-row-reverse">
                    <div>{renderMCPrice(ram_price, mcUnit, eos_price)} </div>
                  </div>
                  <div className="col-3 text-right"> </div>
                </div>
              </div>
            );
            items.push(
              <div
                className={`card-token-price shadow-sm p-1 ${isDarkMode ? 'bg-dark' : ''}`}
                key={3}
                style={{marginBottom: 1}}
              >
                <div className="row ftz-12  m-0">
                  <div className="col-5 pl-1 pr-0 d-flex flex-row row m-0">
                    <div className="d-flex align-items-center flex-row-reverse col-2">1</div>
                    <div>
                      <ReactImageFallback
                        src={`${images}/EOS.png`}
                        fallbackImage={fallback_logo}
                        className="token_logo"
                        alt="eos"
                      />
                    </div>
                    <div className=" ml-2 d-flex align-items-center">
                      <div> EOS </div>
                    </div>
                  </div>
                  <div className="col-4 text-right d-flex align-items-center flex-row-reverse">
                    <div>${eos_price} </div>
                  </div>
                  <div className="col-3 text-right d-flex align-items-center flex-row-reverse pr-1">
                    <div> {renderPPColor(eos_percent_change_24h)} </div>
                  </div>
                </div>
              </div>
            );

            data.eosmarketcap.data.map((tokeninfo, index) => {
              if (tokeninfo.last > 0) {
                ticker_count += 1;
                if (IsTokenSearched(tokeninfo, this.props.common.symbol)) {
                  token_logo = `${images}/${tokeninfo.currency.toUpperCase()}.png`;

                  items.push(
                    <div
                      className={`card-token-price shadow-sm ${isDarkMode ? 'bg-dark text-cypher' : ''} ml-0 p-1 mt-0`}
                      key={tokeninfo.currency}
                      style={{marginBottom: 1}}
                    >
                      <div className="row ftz-12  m-0">
                        <div className="col-5 pl-1 pr-0 d-flex flex-row row m-0">
                          {/* <img src={token_logo} className="token_logo" /> */}
                          <div className="d-flex align-items-center flex-row-reverse col-2">{index + 2}</div>
                          <div className="bg-white" style={{borderRadius: 200}}>
                            <ReactImageFallback
                              src={token_logo}
                              fallbackImage={fallback_logo}
                              alt={`${tokeninfo.currency} token airdrop`}
                              className="token_logo"
                            />
                          </div>

                          <div className="ml-2 d-flex align-items-center">
                            <div> {`${tokeninfo.currency.toUpperCase()}`}</div>
                          </div>
                        </div>
                        <div className="col-4 text-right  d-flex align-items-center flex-row-reverse pl-0">
                          <div> {renderMCPrice(tokeninfo.last, mcUnit, eos_price)} </div>
                        </div>
                        <div className="col-3 d-flex align-items-center flex-row-reverse pr-1">
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
                    <FontAwesomeIcon icon="chart-bar" className="mr-2 text-info fa-lg" />
                    <h1 className="title text-info">EOS Market info</h1>
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
                    <div className="col-5 pl-1 pr-0 d-flex flex-row row m-0">
                      {/* <img src={token_logo} className="token_logo" /> */}
                      <div className="d-flex align-items-center flex-row-reverse col-2">#</div>
                      <div className="">Name</div>
                      <div className="ml-2 d-flex align-items-center" />
                    </div>
                    <div className="col-4 text-right  d-flex align-items-center flex-row-reverse pl-0">Price</div>
                    <div className="col-3 d-flex align-items-center flex-row-reverse pr-1">24h %</div>
                  </div>
                </div>
                {/* <div className="row ftz-12 pb-1 pt-1 m-0  shadow-sm" key={1}>
                  <div className="pl-2 col-5 text-info row m-0 ">
                    <div className="d-flex align-items-center flex-row-reverse col-2">#</div>
                    Name <span className="badge badge-primary p-1 ">{ticker_count + 2}</span>
                  </div>
                  <div className="col-4 text-right pr-4 text-info"> Price </div>
                  <div className="col-3 text-right text-info"> 24h % </div>
                </div> */}

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
