import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Query} from 'react-apollo';
import ReactImageFallback from 'react-image-fallback';
import ReactPaginate from 'react-paginate';
import {Helmet} from 'react-helmet';

import {renderPPColor} from '../utils/RenderColors';
import {renderProjectLink, renderAccountLink} from '../utils/Tools';
import {setActiveLinkID, setMarketcapUnit} from '../../actions/sidebar';
import {setMCSearchSymbol, setMcSortBy, setMCPGOffset, setMCPGPageSelected} from '../../actions/common';
import eoslogo from '../../assets/imgs/eoslogo1.svg';
import {IsTokenSearched} from '../utils/isTokenSearched';

import GetEOSMarketcap2 from '../../queries/GetEOSMarketcap2';

import {formatBandUnits} from '../utils/FormatUnits';
const images = './imgs';
const perPage = 49;

let EOSMarkets = [];
let tokens = [];
let exchanges_info = [];
let tmp_last = 0;
let tmp_change = 0;
let tmp_amount = 0;
let tmp_volume = 0;
let index = null;
let exs_count = 0;
let ram_price = 0;
let max_ram_size = 0;
let eos_total_supply = 0;
let eos_price = 0;
let eos_percent_change_24h = 0;
let eos_volume_24h = 0;
let eosio_ram = 0;
let total_token_marketcap = 0;
let total_token_volume = 0;
let token_num = 0;
let Sorted_tokens = [];
let Org_tokens = [];

const calTotal = (eosmarketcap) => {
  total_token_marketcap = 0;
  total_token_volume = 0;
  eosmarketcap.data.map((token) => {
    if (token.symbol != 'eosio.token-eos-eusd' && token.symbol.substring(token.symbol.length - 4) == '-eos') {
      total_token_volume += Number(token.volume);
      total_token_marketcap += Number(token.last) * Number(token.supply.current);
    }
  });
};

const EOSMarketCapLoading = ({isDarkMode}) => {
  return (
    <article className="content dashboard-page">
      <section className="section">
        <div className={`card mlr-2px shadow-sm ftz-marketcap mb-1 ${isDarkMode ? 'bg-dark' : 'bg-white'}`}>
          <div
            className={`card-header border-bottom pl-2 ${
              isDarkMode ? 'bg-dark border-secondary' : 'bg-actions border-light'
            }`}
          >
            {/* <FontAwesomeIcon icon="chart-bar" className="mr-2 text-info fa-lg" /> */}
            <i className="fa fa-chart-bar text-info fa-lg mr-2" />

            <h1 className="title text-info">EOS Market Cap</h1>
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
              className="exchange_logo"
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

const renderSortHeader = (mc_sortby, setMcSortBy, val) => {
  if (mc_sortby == val + '_DEC') setMcSortBy(val + '_ASC');
  else if (mc_sortby == val + '_ASC') setMcSortBy(val + '_DEC');
  else setMcSortBy(val + '_DEC');
};

const renderMCVal = (mcVal, mcUnit, eos_price) => {
  return (
    <div>
      {mcUnit == 1 ? <img src={eoslogo} alt="eos" className="eos-unit" /> : '$'}
      {mcUnit == 1
        ? Number(mcVal).toLocaleString(undefined, {maximumFractionDigits: 0})
        : (Number(mcVal) * Number(eos_price)).toLocaleString(undefined, {maximumFractionDigits: 0})}
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

const renderSortUD = (mc_sortby, val) => {
  if (mc_sortby == val + '_DEC') return <i className="fa fa-sort-down text-success" />;
  else if (mc_sortby == val + '_ASC') return <i className="fa fa-sort-up text-success " />;
  else return null;
};

class EOSMarketCap extends Component {
  componentWillMount() {
    this.props.setActiveLinkID(3);
  }
  handlePageClick = (data) => {
    let selected = data.selected;
    this.props.setMCPGPageSelected(selected);
    this.props.setMCPGOffset(Math.ceil(selected * perPage));
  };

  render() {
    const {isDarkMode, mcUnit} = this.props.sidebar;
    const {mc_symbol, mc_sortby, mcpg_offset, mcpg_selected} = this.props.common;
    const {setMcSortBy} = this.props;

    tokens = [];
    exchanges_info = [];
    token_num = 0;
    total_token_marketcap = 0;
    total_token_volume = 0;
    return (
      <Query query={GetEOSMarketcap2} pollInterval={0}>
        {({loading: loadingTM, error: errorTM, data: dataTM}) => {
          if (loadingTM) return <EOSMarketCapLoading isDarkMode={isDarkMode} />;
          if (errorTM) return <EOSMarketCapLoading isDarkMode={isDarkMode} />;
          if (
            dataTM &&
            dataTM.global_data &&
            dataTM.eos_stat &&
            dataTM.table_rows &&
            dataTM.cmc &&
            dataTM.eosmarketcap &&
            dataTM.companies
          ) {
            const {global_data, eos_stat, table_rows, cmc, eosmarketcap, companies} = dataTM;

            calTotal(eosmarketcap);

            ram_price = (
              (Number(table_rows.rows[0].quote.balance.split(' ')[0]) /
                Number(table_rows.rows[0].base.balance.split(' ')[0])) *
              1024
            ).toFixed(4);
            max_ram_size = Number(global_data.rows[0].max_ram_size);
            eos_total_supply = Number(eos_stat.rows[0].supply.split(' ')[0]);
            eos_price = Number(cmc.EOS.quote.USD.price);
            eos_percent_change_24h = cmc.EOS.quote.USD.percent_change_24h;
            eos_volume_24h = cmc.EOS.quote.USD.volume_24h;

            //RAM
            tokens.push(
              <div className={`row p-1 shadow-sm mbt-1px ${isDarkMode ? 'bg-dark' : 'bg-white'}`} key={'EOSTOKEN'}>
                <div className="col-3 pl-1 row m-0 d-flex align-items-center">
                  <div className="col-2 p-0 d-flex align-items-center">{0}</div>
                  <div className="col-10 p-0 pl-2 d-flex align-items-center">
                    <div className=" mr-2 token_logo" style={{fontSize: 16}}>
                      <i className="fa fa-memory" />
                    </div>
                    <div>RAM(KB)</div>
                  </div>
                </div>
                <div className="col-3 row p-0 m-0 d-flex align-items-center flex-row-reverse">
                  <div className="col-12 col-sm-6 p-0 text-right">{formatBandUnits(max_ram_size)}</div>
                  <div className="col-12 col-sm-6 p-0 text-right">
                    {renderMCVal((max_ram_size / 1024) * ram_price, mcUnit, eos_price)}
                  </div>
                </div>
                <div className="col-3 row p-0 m-0 d-flex align-items-center flex-row-reverse">
                  <div className="col-12 col-sm-6 p-0 text-right" />
                  <div className="col-12 col-sm-6 p-0 text-right"> </div>
                </div>
                <div className="col-3 row p-0 m-0 d-flex align-items-center ">
                  <div className="col-12 col-sm-7 p-0 text-right pr-1">
                    {renderMCPrice(ram_price, mcUnit, eos_price)}
                  </div>
                  <div className="col-12 col-sm-5 p-0 text-right pr-1" />
                </div>
              </div>
            );

            //EOS
            token_num = 0;
            tokens.push(
              <div className={`row p-1 shadow-sm mbt-1px ${isDarkMode ? 'bg-dark' : 'bg-white'}`} key={'RAM'}>
                <div className="col-3 pl-1 row m-0 d-flex align-items-center">
                  <div className="col-2 p-0 d-flex align-items-center">{1}</div>
                  <div className="col-10 p-0 pl-2 d-flex align-items-center">
                    <div className="mr-2 logo-bgr">
                      <ReactImageFallback
                        src={`${images}/EOS.png`}
                        fallbackImage={`${images}/COMMON.png`}
                        alt={`eos airdrop`}
                        className="token_logo"
                      />
                    </div>
                    <div>EOS</div>
                  </div>
                </div>
                <div className="col-3 row p-0 m-0 d-flex align-items-center">
                  <div className="col-12 col-sm-6 p-0 text-right">
                    {renderMCVal(eos_total_supply, mcUnit, eos_price)}
                  </div>
                  <div className="col-12 col-sm-6 p-0 text-right">
                    {eos_total_supply.toLocaleString(undefined, {maximumFractionDigits: 0})}
                  </div>
                </div>
                <div className="col-3 row p-0 m-0 d-flex align-items-center ">
                  <div className="col-12 col-sm-6 p-0 text-right">
                    {renderMCVal(eos_volume_24h / eos_price, mcUnit, eos_price)}
                  </div>
                  <div className="col-12 col-sm-6 p-0 text-right">
                    {Number(eos_volume_24h / eos_price).toLocaleString(undefined, {maximumFractionDigits: 0})}
                  </div>
                </div>
                <div className="col-3 row p-0 m-0 d-flex align-items-center ">
                  <div className="col-12 col-sm-7 p-0 text-right pr-1">${eos_price.toFixed(2)}</div>
                  <div className="col-12 col-sm-5 p-0 text-right pr-1">{renderPPColor(eos_percent_change_24h)}</div>
                </div>
              </div>
            );
            Sorted_tokens = [];
            Org_tokens = [];
            Org_tokens = eosmarketcap.data
              .filter((a) => {
                return a.symbol != 'eosio.token-eos-eusd' && a.symbol.substring(a.symbol.length - 4) == '-eos';
              })
              .map((x, index) => ({...x, rank: index}));

            switch (mc_sortby) {
              case 'VOL_DEC':
                Sorted_tokens = [...Org_tokens].sort((a, b) => Number(b.volume) - Number(a.volume));
                break;
              case 'VOL_ASC':
                Sorted_tokens = [...Org_tokens].sort((a, b) => Number(a.volume) - Number(b.volume));
                break;
              case 'AMT_DEC':
                Sorted_tokens = [...Org_tokens].sort((a, b) => Number(b.amount) - Number(a.amount));
                break;
              case 'AMT_ASC':
                Sorted_tokens = [...Org_tokens].sort((a, b) => Number(a.amount) - Number(b.amount));
                break;
              case 'LAST_DEC':
                Sorted_tokens = [...Org_tokens].sort((a, b) => Number(b.last) - Number(a.last));
                break;
              case 'LAST_ASC':
                Sorted_tokens = [...Org_tokens].sort((a, b) => Number(a.last) - Number(b.last));
                break;
              case 'CHANGE_DEC':
                Sorted_tokens = [...Org_tokens].sort((a, b) => Number(b.change) - Number(a.change));
                break;
              case 'CHANGE_ASC':
                Sorted_tokens = [...Org_tokens].sort((a, b) => Number(a.change) - Number(b.change));
                break;
              case 'MCAP_DEC':
                Sorted_tokens = [...Org_tokens].sort(
                  (a, b) => Number(b.supply.current) * Number(b.last) - Number(a.supply.current) * Number(a.last)
                );
                break;
              case 'MCAP_ASC':
                Sorted_tokens = [...Org_tokens].sort(
                  (a, b) => Number(a.supply.current) * Number(a.last) - Number(b.supply.current) * Number(b.last)
                );
                break;
              case 'SUPP_DEC':
                Sorted_tokens = [...Org_tokens].sort((a, b) => Number(b.supply.current) - Number(a.supply.current));
                break;
              case 'SUPP_ASC':
                Sorted_tokens = [...Org_tokens].sort((a, b) => Number(a.supply.current) - Number(b.supply.current));
                break;
              default:
                Sorted_tokens = [...eosmarketcap.data];
            }

            //TOKENS
            Sorted_tokens.map((token, index) => {
              if (mc_symbol && IsTokenSearched(token, mc_symbol)) {
                tokens.push(
                  <div
                    className={`row p-1 shadow-sm mbt-1px ${isDarkMode ? 'bg-dark' : 'bg-white'}`}
                    key={token.symbol}
                  >
                    <div className="col-3 pl-1 row m-0 d-flex align-items-center">
                      <div className="col-2 p-0 d-flex align-items-center">{token.rank + 2}</div>
                      <div className="col-10 p-0 pl-2 d-flex align-items-center">
                        <div className="mr-2 bg-white logo-bgr">
                          <ReactImageFallback
                            src={`${images}/${token.symbol}.png`}
                            fallbackImage={`${images}/COMMON.png`}
                            alt={`${token.currency}`}
                            className="token_logo"
                          />
                        </div>
                        <div className="d-flex align-items-center">
                          {renderProjectLink(token)}
                          <a
                            className="font-weight-normal"
                            data-toggle="collapse"
                            href={`#collapse${token.symbol}`}
                            role="button"
                            aria-expanded="true"
                            aria-controls={`collapse${token.symbol}`}
                          >
                            <i className="fa fa-info-circle ml-1 " />
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="col-3 row p-0 m-0 d-flex align-items-center">
                      <div className="col-12 col-sm-6 p-0 text-right">
                        {renderMCVal(Number(token.supply.current) * Number(token.last), mcUnit, eos_price)}
                      </div>
                      <div className="col-12 col-sm-6 p-0 text-right">
                        {Number(token.supply.current).toLocaleString(undefined, {maximumFractionDigits: 0})}
                      </div>
                    </div>
                    <div className="col-3 row p-0 m-0 d-flex align-items-center">
                      <div className="col-12 col-sm-6 p-0 text-right">
                        <a
                          className="font-weight-normal"
                          data-toggle="collapse"
                          href={`#collapse${token.symbol}`}
                          role="button"
                          aria-expanded="true"
                          aria-controls={`collapse${token.symbol}`}
                        >
                          {renderMCVal(token.volume, mcUnit, eos_price)}
                        </a>
                      </div>
                      <div className="col-12 col-sm-6 p-0 text-right">
                        <a
                          className="font-weight-normal"
                          data-toggle="collapse"
                          href={`#collapse${token.symbol}`}
                          role="button"
                          aria-expanded="true"
                          aria-controls={`collapse${token.symbol}`}
                        >
                          {Number(token.amount).toLocaleString(undefined, {maximumFractionDigits: 0})}
                        </a>
                      </div>
                    </div>
                    <div className="col-3 row p-0 m-0 d-flex align-items-center ">
                      <div className="col-12 col-sm-7 p-0 text-right pr-1">
                        <a
                          className="font-weight-normal"
                          data-toggle="collapse"
                          href={`#collapse${token.symbol}`}
                          role="button"
                          aria-expanded="true"
                          aria-controls={`collapse${token.symbol}`}
                        >
                          {renderMCPrice(token.last, mcUnit, eos_price)}
                          {/* {Number(token.last).toLocaleString(undefined, {maximumSignificantDigits: 4})} */}
                        </a>
                      </div>
                      <div className="col-12 col-sm-5 p-0 text-right pr-1">
                        <a
                          className="font-weight-normal"
                          data-toggle="collapse"
                          href={`#collapse${token.symbol}`}
                          role="button"
                          aria-expanded="true"
                          aria-controls={`collapse${token.symbol}`}
                        >
                          {renderPPColor(Number(token.change).toFixed(2))}
                        </a>
                      </div>
                    </div>
                    <div
                      className={`mt-1 collapse w-100 ${isDarkMode ? 'bg-dark-1' : 'bg-actions'}`}
                      id={`collapse${token.symbol}`}
                    >
                      {/* <div className="pl-2 text-info border-bottom p-1">Exchanges:</div> */}
                      {RenderExchanges(token.exchanges, isDarkMode, mcUnit, eos_price)}
                      <div className="pl-2 text-info p-1">
                        Contract: {renderAccountLink(token.contract)} website:{' '}
                        {companies.data.findIndex((e) => e.symbol == token.symbol) >= 0 ? (
                          <a
                            href={companies.data[companies.data.findIndex((e) => e.symbol == token.symbol)].website}
                            target="_blank"
                            rel="noopener"
                          >
                            {companies.data[companies.data.findIndex((e) => e.symbol == token.symbol)].website}
                          </a>
                        ) : (
                          ''
                        )}
                      </div>
                    </div>
                  </div>
                );
                token_num++;
              } else if (!mc_symbol && index >= mcpg_offset && index < mcpg_offset + perPage) {
                tokens.push(
                  <div
                    className={`row p-1 shadow-sm mbt-1px ${isDarkMode ? 'bg-dark' : 'bg-white'}`}
                    key={token.symbol}
                  >
                    <div className="col-3 pl-1 row m-0 d-flex align-items-center">
                      <div className="col-2 p-0 d-flex align-items-center">{token.rank + 2}</div>
                      <div className="col-10 p-0 pl-2 d-flex align-items-center">
                        <div className="mr-2 bg-white logo-bgr">
                          <ReactImageFallback
                            src={`${images}/${token.symbol}.png`}
                            fallbackImage={`${images}/COMMON.png`}
                            alt={`${token.currency}`}
                            className="token_logo"
                          />
                        </div>
                        <div className="d-flex align-items-center">
                          {renderProjectLink(token)}
                          <a
                            className="font-weight-normal"
                            data-toggle="collapse"
                            href={`#collapse${token.symbol}`}
                            role="button"
                            aria-expanded="true"
                            aria-controls={`collapse${token.symbol}`}
                          >
                            <i className="fa fa-info-circle ml-1 " />
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="col-3 row p-0 m-0 d-flex align-items-center">
                      <div className="col-12 col-sm-6 p-0 text-right">
                        {renderMCVal(Number(token.supply.current) * Number(token.last), mcUnit, eos_price)}
                      </div>
                      <div className="col-12 col-sm-6 p-0 text-right">
                        {Number(token.supply.current).toLocaleString(undefined, {maximumFractionDigits: 0})}
                      </div>
                    </div>
                    <div className="col-3 row p-0 m-0 d-flex align-items-center">
                      <div className="col-12 col-sm-6 p-0 text-right">
                        <a
                          className="font-weight-normal"
                          data-toggle="collapse"
                          href={`#collapse${token.symbol}`}
                          role="button"
                          aria-expanded="true"
                          aria-controls={`collapse${token.symbol}`}
                        >
                          {renderMCVal(token.volume, mcUnit, eos_price)}
                        </a>
                      </div>
                      <div className="col-12 col-sm-6 p-0 text-right">
                        <a
                          className="font-weight-normal"
                          data-toggle="collapse"
                          href={`#collapse${token.symbol}`}
                          role="button"
                          aria-expanded="true"
                          aria-controls={`collapse${token.symbol}`}
                        >
                          {Number(token.amount).toLocaleString(undefined, {maximumFractionDigits: 0})}
                        </a>
                      </div>
                    </div>
                    <div className="col-3 row p-0 m-0 d-flex align-items-center ">
                      <div className="col-12 col-sm-7 p-0 text-right pr-1">
                        <a
                          className="font-weight-normal"
                          data-toggle="collapse"
                          href={`#collapse${token.symbol}`}
                          role="button"
                          aria-expanded="true"
                          aria-controls={`collapse${token.symbol}`}
                        >
                          {renderMCPrice(token.last, mcUnit, eos_price)}
                          {/* {Number(token.last).toLocaleString(undefined, {maximumSignificantDigits: 4})} */}
                        </a>
                      </div>
                      <div className="col-12 col-sm-5 p-0 text-right pr-1">
                        <a
                          className="font-weight-normal"
                          data-toggle="collapse"
                          href={`#collapse${token.symbol}`}
                          role="button"
                          aria-expanded="true"
                          aria-controls={`collapse${token.symbol}`}
                        >
                          {renderPPColor(Number(token.change).toFixed(2))}
                        </a>
                      </div>
                    </div>
                    <div
                      className={`mt-1 collapse w-100 ${isDarkMode ? 'bg-dark-1' : 'bg-actions'}`}
                      id={`collapse${token.symbol}`}
                    >
                      {/* <div className="pl-2 text-info border-bottom p-1">Exchanges:</div> */}
                      {RenderExchanges(token.exchanges, isDarkMode, mcUnit, eos_price)}
                      <div className="pl-2 text-info p-1">
                        Contract: {renderAccountLink(token.contract)} website:{' '}
                        {companies.data.findIndex((e) => e.symbol == token.symbol) >= 0 ? (
                          <a
                            href={companies.data[companies.data.findIndex((e) => e.symbol == token.symbol)].website}
                            target="_blank"
                            rel="noopener"
                          >
                            {companies.data[companies.data.findIndex((e) => e.symbol == token.symbol)].website}
                          </a>
                        ) : (
                          ''
                        )}
                      </div>
                    </div>
                  </div>
                );
                token_num++;
              }
            });
            return (
              <article className="content dashboard-page">
                <Helmet>
                  <title>Cypherblock | EOS Marketcap | Token, Project, Price, Ranking</title>
                </Helmet>
                <section className="section">
                  <div className={`card mlr-2px shadow-sm ftz-marketcap mb-1 ${isDarkMode ? 'bg-dark' : 'bg-white'}`}>
                    <div className={`card-header row m-0 ${isDarkMode ? 'bg-dark' : 'bg-actions'}`}>
                      {/* Page header */}
                      <div className="col-12 p-2 row m-0">
                        <div className="col p-0 d-flex align-items-center">
                          <i className="fa fa-chart-bar text-info fa-lg mr-2" />
                          <h1 className="title text-info">EOS Market Cap</h1>
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
                        <div className="ml-1">
                          <div
                            className="input-group input-group-seamless mb-0 pr-1 float-right"
                            style={{width: 100, height: 30}}
                          >
                            <input
                              type="text"
                              className="form-control border-0"
                              aria-label="Text input with checkbox"
                              onChange={(event) => {
                                this.props.setMCSearchSymbol(event.target.value);
                              }}
                            />
                            <div className="input-group-append">
                              <div className="input-group-text">
                                <i className="fa fa-search" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* Sumaries */}
                      <div
                        className={`col-12 row pt-2 pb-1 pl-0 pr-4 shadow-sm m-0 ${
                          isDarkMode ? 'bg-dark-1' : 'bg-white'
                        }`}
                        key={2}
                      >
                        <div className="col-4  row pl-0 m-0">
                          <div className="col-12 col-sm-6 p-0">
                            <div className="text-info ftz-headermc text-right"> 24H VOLUME </div>
                            <div className="text-right">{renderMCVal(total_token_volume, mcUnit, eos_price)}</div>
                          </div>
                          <div className="col-12 col-sm-6 p-0 ">
                            <div className="text-info ftz-headermc text-right"> 24H VOLUME(+EOS) </div>
                            <div className="text-right">
                              {renderMCVal(total_token_volume + eos_volume_24h / eos_price, mcUnit, eos_price)}
                            </div>
                          </div>
                        </div>
                        <div className="col-4  row pl-0 m-0">
                          <div className="col-12 col-sm-6 p-0">
                            <div className="text-info ftz-headermc text-right"> MARKET CAP </div>
                            <div className="text-right">{renderMCVal(total_token_marketcap, mcUnit, eos_price)}</div>
                          </div>
                          <div className="col-12 col-sm-6 p-0 ">
                            <div className="text-info ftz-headermc text-right"> MARKETCAP(+EOS) </div>
                            <div className="text-right">
                              {renderMCVal(total_token_marketcap + eos_total_supply, mcUnit, eos_price)}
                            </div>
                          </div>
                        </div>
                        <div className="col-4 row pl-0 m-0">
                          <div className="col-12 col-sm-6 p-0 ">
                            <div className="text-info ftz-headermc text-right"> EOS VOL DOMINANCE </div>
                            <div className="text-right">
                              {(
                                ((eos_volume_24h / eos_price) * 100) /
                                (eos_volume_24h / eos_price + total_token_volume)
                              ).toLocaleString(undefined, {maximumFractionDigits: 2})}%
                            </div>
                          </div>
                          <div className="col-12 col-sm-6 p-0 ">
                            <div className="text-info ftz-headermc text-right"> EOS MC DOMINANCE </div>
                            <div className="text-right">
                              {((eos_total_supply * 100) / (eos_total_supply + total_token_marketcap)).toLocaleString(
                                undefined,
                                {maximumFractionDigits: 2}
                              )}%
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="pt-2 pr-2 row m-0">
                      <div className="text-info ml-2 col p-0"> Count: {Sorted_tokens.length + 2} </div>
                      <div className="col text-right pr-1 ">
                        <ReactPaginate
                          previousLabel={'Previous'}
                          nextLabel={'Next'}
                          breakLabel={'...'}
                          pageCount={Math.ceil(Sorted_tokens.length / perPage)}
                          marginPagesDisplayed={2}
                          pageRangeDisplayed={5}
                          onPageChange={this.handlePageClick}
                          containerClassName={'pagination mb-1 cp ftz-12'}
                          subContainerClassName={'pages pagination'}
                          activeClassName={`active ${isDarkMode ? 'bg-white' : 'bg-success'}  rounded`}
                          pageClassName={'mr-1 ml-1 pr-1 pl-1'}
                          forcePage={mcpg_selected}
                        />
                      </div>
                    </div>
                    {/* Table header */}
                    <div className="bg-white p-0 m-0 card-body ">
                      <div
                        className={`row p-1 shadow-sm mc-headfont mbt-1px text-info border-top border-bottom ${
                          isDarkMode ? 'bg-dark border-secondary' : 'bg-white'
                        }`}
                        key={1}
                      >
                        <div className="col-3 pl-1 row m-0 d-flex align-items-center">
                          <div className="col-2 p-0 d-flex align-items-center">#</div>
                          <div className="col-10 p-0 pl-2 d-flex align-items-center">Name</div>
                        </div>
                        <div className="col-3 row p-0 m-0 d-flex align-items-center">
                          <a
                            href="#"
                            className="col-12 col-sm-6 p-0 text-right font-weight-normal text-info"
                            onClick={() => renderSortHeader(mc_sortby, setMcSortBy, 'MCAP')}
                          >
                            {renderSortUD(mc_sortby, 'MCAP')} Marketcap
                          </a>
                          <a
                            href="#"
                            className="col-12 col-sm-6 p-0 text-right font-weight-normal text-info"
                            onClick={() => renderSortHeader(mc_sortby, setMcSortBy, 'SUPP')}
                          >
                            {renderSortUD(mc_sortby, 'SUPP')} Circulating Supply
                          </a>
                        </div>
                        <div className="col-3 row p-0 m-0 d-flex align-items-center">
                          <a
                            href="#"
                            className="col-12 col-sm-6 p-0 text-right font-weight-normal text-info"
                            onClick={() => renderSortHeader(mc_sortby, setMcSortBy, 'VOL')}
                          >
                            {renderSortUD(mc_sortby, 'VOL')} 24h Volume
                          </a>
                          <a
                            href="#"
                            className="col-12 col-sm-6 p-0 text-right font-weight-normal text-info"
                            onClick={() => renderSortHeader(mc_sortby, setMcSortBy, 'AMT')}
                          >
                            {renderSortUD(mc_sortby, 'AMT')} 24h Amount
                          </a>
                        </div>
                        <div className="col-3 row p-0 m-0 d-flex align-items-center ">
                          <a
                            href="#"
                            className="col-12 col-sm-7 p-0 text-right pr-1 font-weight-normal text-info"
                            onClick={() => renderSortHeader(mc_sortby, setMcSortBy, 'LAST')}
                          >
                            {renderSortUD(mc_sortby, 'LAST')} Price
                          </a>
                          <a
                            href="#"
                            className="col-12 col-sm-5 p-0 text-right pr-1 font-weight-normal text-info"
                            onClick={() => renderSortHeader(mc_sortby, setMcSortBy, 'CHANGE')}
                          >
                            {renderSortUD(mc_sortby, 'CHANGE')} 24h Change
                          </a>
                        </div>
                      </div>

                      {tokens}
                    </div>
                    <div className="pt-2 pr-2 row m-0">
                      {/* <div className="text-info ml-2 col p-0"> Total: {Sorted_tokens.length + 2} </div> */}
                      <div className="col text-right pr-1">
                        <ReactPaginate
                          previousLabel={'Previous'}
                          nextLabel={'Next'}
                          breakLabel={'...'}
                          breakClassName={'p-1'}
                          pageCount={Math.ceil(Sorted_tokens.length / perPage)}
                          marginPagesDisplayed={2}
                          pageRangeDisplayed={5}
                          onPageChange={this.handlePageClick}
                          containerClassName={'pagination mb-1 cp ftz-12'}
                          subContainerClassName={'pages pagination'}
                          activeClassName={`active ${isDarkMode ? 'bg-white' : 'bg-success'}  rounded`}
                          pageClassName={'mr-1 ml-1 pr-1 pl-1'}
                          forcePage={mcpg_selected}
                        />
                      </div>
                    </div>
                  </div>
                </section>
              </article>
            );
          } else {
            return <EOSMarketCapLoading isDarkMode={isDarkMode} />;
          }
        }}
      </Query>
    );
  }
}

function mapStateToProps({myStore}) {
  return {sidebar: myStore.sidebar, common: myStore.common};
}
export default connect(
  mapStateToProps,
  {setActiveLinkID, setMarketcapUnit, setMCSearchSymbol, setMcSortBy, setMCPGOffset, setMCPGPageSelected}
)(EOSMarketCap);
