import React, {Component} from 'react';
import {Query} from 'react-apollo';
import {connect} from 'react-redux';
import ReactImageFallback from 'react-image-fallback';
import {Helmet} from 'react-helmet';
import {setActiveLinkID, setMarketcapUnit} from '../../actions/sidebar';
import GetProject from '../../queries/GetProject';
const images = '../imgs';
import {renderMCPrice, renderMCVal, renderAccountLink} from '../utils/Tools';
import {renderPPColor} from '../utils/RenderColors';

let eos_price = 0;
let exchanges_info = [];

const RenderExchanges = (exchanges, isDarkMode, mcUnit, eos_price) => {
  let tmp_exchanges = [...exchanges].sort((a, b) => b.percent - a.percent);
  exchanges_info = [];
  tmp_exchanges.map((exchange) => {
    exchanges_info.push(
      <div
        className={`row mt-1 shadow-sm mb-1 mbt-1px pt-1 pb-1 border-bottom ${isDarkMode ? 'border-secondary' : ''} `}
        key={exchange.name}
      >
        <div className="col-6 row pl-2 p-0 m-0 d-flex align-items-center ">
          <div className="mr-1 bg-white logo-exc d-flex align-items-center">
            <ReactImageFallback
              src={`${images}/${exchange.name.toLowerCase()}.png`}
              fallbackImage={`${images}/COMMON.png`}
              alt={`${exchange.name} token airdrop`}
              className="token_logo"
            />
          </div>
          <div>
            <a
              href={exchange.url}
              target="_blank"
              rel="noopener"
              className={`${isDarkMode ? 'linkcolor-dark' : ''}  font-weight-normal`}
            >
              {exchange.name} (<span className="ftz-10">{exchange.percent}%</span>)
            </a>
          </div>
        </div>
        <div className="col-3 row p-0 m-0 d-flex align-items-center ">
          <div className="col-12 col-sm-6 p-0 text-right">
            {renderMCVal(exchange.volume, mcUnit, eos_price)}
            {/* {Number(exchange.volume).toLocaleString(undefined, {maximumFractionDigits: 0})} */}
          </div>
          <div className="col-12 col-sm-6 p-0 text-right">
            {/* {renderMCVal(exchange.amount, mcUnit, eos_price)} */}
            {Number(exchange.amount).toLocaleString(undefined, {maximumFractionDigits: 0})}
          </div>
        </div>
        <div className="col-3 row p-0 m-0 d-flex align-items-center ">
          <div className="col-12 col-sm-7 p-0 text-right pr-1">
            {renderMCPrice(exchange.last, mcUnit, eos_price)}
            {/* {Number(exchange.last).toLocaleString(undefined, {maximumSignificantDigits: 4})} */}
          </div>
          <div className="col-12 col-sm-5 p-0 text-right pr-1">
            {exchange.change ? renderPPColor(Number(exchange.change).toFixed(2)) : ''}{' '}
          </div>
        </div>
      </div>
    );
  });
  return exchanges_info;
};

const ProjectLoading = ({isDarkMode}) => {
  return (
    <article className="content dashboard-page">
      <section className="section">
        <div className={`card mlr-2px shadow-sm ftz-marketcap mb-1 ${isDarkMode ? 'bg-dark' : 'bg-white'}`}>
          <div
            className={`card-header border-bottom pl-2 ${
              isDarkMode ? 'bg-dark border-secondary' : 'bg-actions border-light'
            }`}
          >
            <i className="fa fa-chart-bar text-info fa-lg mr-2" />
            <h1 className="title text-info">EOS Marketcap</h1>
          </div>
          <div className="card-body bg-white p-0">
            <div style={{height: 50}} />
            <div className="text-center align-middle overlay" style={{paddingTop: 55}}>
              <i className="fa fa-spinner fa-spin text-info fa-2x" />
            </div>
          </div>
        </div>
      </section>
    </article>
  );
};

class Project extends Component {
  componentWillMount() {
    this.props.setActiveLinkID(3);
  }

  render() {
    const {match} = this.props;
    const {isDarkMode, mcUnit} = this.props.sidebar;

    // console.log(match);
    return (
      <Query query={GetProject} pollInterval={0} variables={{symbol: match.params.symbol}}>
        {({loading, error, data}) => {
          if (loading) return <ProjectLoading isDarkMode={isDarkMode} />;
          if (error) return <ProjectLoading isDarkMode={isDarkMode} />;

          if (data && data.company && data.cmc) {
            eos_price = Number(data.cmc.EOS.quote.USD.price);
            const {
              symbol,
              contract,
              currency,
              supply,
              last,
              change,
              amount,
              volume,
              exchanges
            } = data.company.marketcap;
            return (
              <article className="content dashboard-page">
                <Helmet>
                  <title>{currency} eos marketcap, price, project, ranking | Cypherblock </title>
                </Helmet>
                <section className="section">
                  <div className={`card ${isDarkMode ? 'bg-dark' : ''}`}>
                    <div
                      className={`d-flex row m-0 align-items-center card-header pr-2 ${isDarkMode ? 'bg-dark' : ''}`}
                    >
                      <div className="col d-flex align-items-center p-0">
                        <div className="ml-2 bg-white cpy-logo-bgr">
                          <ReactImageFallback
                            src={`${images}/${symbol}.png`}
                            fallbackImage={`${images}/COMMON.png`}
                            alt={`${currency} eos token airdrop`}
                            className="cpy-logo"
                          />
                        </div>
                        <div className="ml-2 ftz-14">
                          {data.company.company_info.name} (
                          <span className="text-info">{currency}</span>)
                        </div>
                      </div>
                      <label className="font-weight-normal float-right mb-0">
                        <select
                          id="inputmcUnit"
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
                    <div className="card-body p-0">
                      <div className={` row m-0 pt-3 pb-3 ftz-marketcap ${isDarkMode ? 'bg-dark' : ''}`}>
                        <div className="col-3 pr-0 pl-1">
                          <div className="d-flex align-items-center m-1 ftz-13">
                            <i className="fa fa-bar-chart ftz-18" style={{marginRight: 10}} />
                            <span className="badge badge-info p-1">Rank {Number(data.company.rank) + 2}</span>
                          </div>
                          <div className="d-flex align-items-center m-1 ftz-14">
                            <i className="fa fa-link mr-3 ftz-18" />
                            <a href={data.company.company_info.website} target="_blank" rel="noopener">
                              website
                            </a>
                          </div>
                          <div />
                        </div>
                        <div className=" row m-0 col-9 p-0 pt-1">
                          <div className="col-4  row pl-0 m-0">
                            <div className="col-12 col-sm-6 p-0">
                              <div className="text-info ftz-headermc text-right"> PRICE </div>
                              <div className="text-right">
                                {renderMCPrice(data.company.marketcap.last, mcUnit, eos_price)}
                                {renderPPColor(Number(change).toFixed(2))}
                              </div>
                            </div>
                            <div className="col-12 col-sm-6 p-0 ">
                              <div className="text-info ftz-headermc text-right"> 24H VOLUME </div>
                              <div className="text-right"> {renderMCVal(volume, mcUnit, eos_price)} </div>
                            </div>
                          </div>
                          <div className="col-4  row pl-0 m-0">
                            <div className="col-12 col-sm-6 p-0">
                              <div className="text-info ftz-headermc text-right"> MARKETCAP </div>
                              <div className="text-right">
                                {renderMCVal(Number(supply.current) * Number(last), mcUnit, eos_price)}
                                <div> {`\b `} </div>
                              </div>
                            </div>
                            <div className="col-12 col-sm-6 p-0 ">
                              <div className="text-info ftz-headermc text-right"> CIRCULATING SUPPLY </div>
                              <div className="text-right">
                                {Number(supply.current).toLocaleString(undefined, {maximumFractionDigits: 0})}
                              </div>
                            </div>
                          </div>
                          <div className="col-4  row pl-0 m-0">
                            <div className="col-12 col-sm-6 p-0">
                              <div className="text-info ftz-headermc text-right"> MAX SUPPLY </div>
                              <div className="text-right">
                                {Number(supply.max).toLocaleString(undefined, {maximumFractionDigits: 0})}
                                <div> {`\b `} </div>
                              </div>
                            </div>
                            <div className="col-12 col-sm-6 p-0 ">
                              <div className="text-info ftz-headermc text-right"> CONTRACT </div>
                              <div className="text-right"> {renderAccountLink(contract)} </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <ul className="nav nav-tabs ftz-12" id="myTab" role="tablist">
                          <li className="nav-item">
                            <a
                              className={`nav-link  active ${
                                isDarkMode ? 'border border-secondary bg-dark' : 'bg-light border border-white'
                              }`}
                              id="home-tab"
                              data-toggle="tab"
                              href="#home"
                              role="tab"
                              aria-controls="home"
                              aria-selected="true"
                            >
                              <i className="fa fa-globe mr-2 ftz-18" />
                              Introduction
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              className={`nav-link  ${
                                isDarkMode ? 'border border-secondary bg-dark' : 'bg-light border border-white'
                              }`}
                              id="profile-tab"
                              data-toggle="tab"
                              href="#profile"
                              role="tab"
                              aria-controls="profile"
                              aria-selected="false"
                            >
                              <i className="fa fa-exchange mr-2 ftz-18" />
                              Market
                            </a>
                          </li>
                        </ul>
                        <div className="tab-content" id="myTabContent">
                          <div
                            className="tab-pane fade show active p-1"
                            id="home"
                            role="tabpanel"
                            aria-labelledby="home-tab"
                          >
                            {data.company.company_info.intro}
                          </div>
                          <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                            <div
                              className={`row mt-1 shadow-sm mb-1 mbt-1px pt-1 pb-1 border-bottom mc-headfont text-info ${
                                isDarkMode ? 'border-secondary' : ''
                              }`}
                              key={1}
                            >
                              <div className="col-6 row pl-2 p-0 m-0 d-flex align-items-center ">
                                <div className="col-12 col-sm-6 p-0">
                                  Exchange
                                  {/* {Number(exchange.volume).toLocaleString(undefined, {maximumFractionDigits: 0})} */}
                                </div>
                                <div className="col-12 col-sm-6 p-0">
                                  {/* {renderMCVal(exchange.amount, mcUnit, eos_price)} */}
                                  Pair
                                </div>
                              </div>
                              <div className="col-3 row p-0 m-0 d-flex align-items-center ">
                                <div className="col-12 col-sm-6 p-0 text-right">
                                  24h Volume
                                  {/* {Number(exchange.volume).toLocaleString(undefined, {maximumFractionDigits: 0})} */}
                                </div>
                                <div className="col-12 col-sm-6 p-0 text-right">
                                  {/* {renderMCVal(exchange.amount, mcUnit, eos_price)} */}
                                  Amount
                                </div>
                              </div>
                              <div className="col-3 row p-0 m-0 d-flex align-items-center ">
                                <div className="col-12 col-sm-7 p-0 text-right pr-1">
                                  Price
                                  {/* {Number(exchange.last).toLocaleString(undefined, {maximumSignificantDigits: 4})} */}
                                </div>
                                <div className="col-12 col-sm-5 p-0 text-right pr-1">Change</div>
                              </div>
                            </div>
                            {RenderExchanges(exchanges, isDarkMode, mcUnit, eos_price, currency)}
                          </div>
                          <div className="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab" />
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </article>
            );
          }
        }}
      </Query>
    );
  }
}

function mapStateToProps({myStore}) {
  return {sidebar: myStore.sidebar};
}
export default connect(
  mapStateToProps,
  {setActiveLinkID, setMarketcapUnit}
)(Project);
