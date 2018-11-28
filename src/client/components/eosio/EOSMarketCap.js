import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Query} from 'react-apollo';
import ReactImageFallback from 'react-image-fallback';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {renderPPColor} from '../utils/RenderColors';
import {setActiveLinkID} from '../../actions/sidebar';
import GetEOSMarketcap from '../../queries/GetEOSMarketcap';
import {formatBandUnits} from '../utils/FormatUnits';
const images = './imgs';

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

const CalculateEOSMarkets = (data) => {
  EOSMarkets = [];
  // add newdex's tickers to market
  Add_NewdexTickers(data.newdex_tickers);
  Add_BigoneTickers(data.bigone_tickers);
  Add_BlockSenceTicker(data.blocksence_tickers);
  Add_BifinexPairs(data.bitfinex_pairs);
  Aggregate_Markets();
  GetTokensSupply(data);
};

const Aggregate_Markets = () => {
  for (var i = 0; i < EOSMarkets.length; i++) {
    tmp_amount = 0;
    tmp_last = 0;
    tmp_change = 0;
    tmp_volume = 0;
    exs_count = 0;
    EOSMarkets[i].exchanges.map((exchange) => {
      tmp_amount += exchange.amount;
      tmp_volume += exchange.volume;
      tmp_last += exchange.last * exchange.amount;
      tmp_change += exchange.change * exchange.amount;
    });
    EOSMarkets[i].amount = tmp_amount;
    EOSMarkets[i].volume = tmp_volume;
    if (tmp_amount > 0) {
      EOSMarkets[i].exchanges.map((exchange, index) => {
        EOSMarkets[i].exchanges[index].percent = ((EOSMarkets[i].exchanges[index].amount / tmp_amount) * 100).toFixed(
          2
        );
      });
      EOSMarkets[i].last = tmp_last / tmp_amount;
      EOSMarkets[i].change = tmp_change / tmp_amount;
    } else {
      EOSMarkets[i].last = tmp_last;
      EOSMarkets[i].change = tmp_change;
    }
  }
};

const Add_BifinexPairs = (pairs) => {
  pairs.data.map((pair) => {
    index = EOSMarkets.findIndex((e) => e.symbol == 'everipediaiq-iq-eos');
    if (index === -1) {
      //if not existed, add ticker to the list
      // EOSMarkets.push({
      //   symbol: 'iq_eos',
      //   contract: null,
      //   currency: 'IQ',
      //   last: 0,
      //   change: 0,
      //   amount: 0,
      //   volume: 0,
      //   exchanges: [
      //     {
      //       name: 'bitfinex',
      //       last: Number(pair[7]),
      //       change: Number(pair[6]) * 100,
      //       amount: Number(pair[8]),
      //       volume: Number(pair[7]) * Number(pair[8])
      //     }
      //   ]
      // });
    } else if (index >= 0) {
      //if existed, update the info
      EOSMarkets[index].exchanges.push({
        name: 'bitfinex',
        url: 'https://www.bitfinex.com/',
        percent: 0,
        last: Number(pair[7]),
        change: Number(pair[6]) * 100,
        amount: Number(pair[8]),
        volume: Number(pair[7]) * Number(pair[8])
      });
    }
  });
};

const Add_BlockSenceTicker = (tickers) => {
  for (var ticker in tickers.data) {
    if (['source', 'EOS', 'BTC', 'RAM', 'ETH'].indexOf(ticker) == -1) {
      index = EOSMarkets.findIndex((e) => e.symbol == e.contract + '-' + ticker.toLowerCase() + '-eos');
      if (index === -1) {
        //if not existed, add ticker to the list
        // EOSMarkets.push({
        //   symbol: ticker.toLowerCase() + '_eos',
        //   contract: null,
        //   currency: ticker.toUpperCase(),
        //   last: 0,
        //   change: 0,
        //   amount: 0,
        //   volume: 0,
        //   exchanges: [
        //     {
        //       name: 'chaince',
        //       last: Number(tickers.data[ticker].eos_price),
        //       change: Number(tickers.data[ticker].percent_change),
        //       amount: Number(tickers.data[ticker]['24_hour_volume']),
        //       volume: Number(tickers.data[ticker]['24_hour_volume_in_eos'])
        //     }
        //   ]
        // });
      } else if (index >= 0) {
        //if existed, update the info
        EOSMarkets[index].exchanges.push({
          name: 'chaince',
          url: 'https://chaince.com/trade/' + ticker.toLowerCase() + 'eos',
          percent: 0,
          last: Number(tickers.data[ticker].eos_price),
          change: Number(tickers.data[ticker].percent_change),
          amount: Number(tickers.data[ticker]['24_hour_volume']),
          volume: Number(tickers.data[ticker]['24_hour_volume_in_eos'])
        });
      }
    }
  }
};

// Bigone ticker utils
const BigonetoNewdex_sybol = (market_id, contract) => {
  return contract + '-' + market_id.substring(0, market_id.indexOf('-')).toLowerCase() + '-eos';
};
const BigonetoNewdex_currency = (market_id) => {
  return market_id.substring(0, market_id.indexOf('-')).toUpperCase();
};

const Add_BigoneTickers = (tickers) => {
  tickers.data.map((ticker) => {
    // find current ticker list, if existed, return the index
    index = EOSMarkets.findIndex((e) => e.symbol == BigonetoNewdex_sybol(ticker.market_id, e.contract));

    if (index === -1) {
      //if not existed, add ticker to the list
      // EOSMarkets.push({
      //   symbol: BigonetoNewdex_sybol(ticker.market_id),
      //   contract: null,
      //   currency: BigonetoNewdex_currency(ticker.market_id),
      //   last: 0,
      //   change: 0,
      //   amount: 0,
      //   volume: 0,
      //   exchanges: [
      //     {
      //       name: 'bigone',
      //       last: Number(ticker.close),
      //       change: Number(ticker.daily_change_perc),
      //       amount: Number(ticker.volume),
      //       volume: Number(ticker.close) * Number(ticker.volume)
      //     }
      //   ]
      // });
    } else if (index >= 0) {
      //if existed, update the info
      EOSMarkets[index].exchanges.push({
        name: 'bigone',
        url: 'https://big.one/trade/' + ticker.market_id,
        percent: 0,
        last: Number(ticker.close),
        change: Number(ticker.daily_change_perc),
        amount: Number(ticker.volume),
        volume: Number(ticker.volume) * Number(ticker.close)
      });
    }
  });
};

// Add new or update Price from Newdex
const Add_NewdexTickers = (tickers) => {
  //Loop throught all tickers updated from Newdex
  tickers.data.map((ticker) => {
    // find current ticker list, if existed, return the index
    index = EOSMarkets.findIndex((e) => e.symbol == ticker.symbol);
    if (index === -1) {
      //if not existed, add ticker to the list
      EOSMarkets.push({
        symbol: ticker.symbol,
        contract: ticker.contract,
        currency: ticker.currency,
        supply: {
          current: 0,
          max: 0
        },
        last: 0,
        change: 0,
        amount: 0,
        volume: 0,
        exchanges: [
          {
            name: 'newdex',
            url: 'https://newdex.io/trade/' + ticker.symbol,
            percent: 0,
            last: Number(ticker.last),
            change: Number(ticker.change) * 100,
            amount: Number(ticker.amount),
            volume: Number(ticker.volume)
          }
        ]
      });
    } else if (index >= 0) {
      //if existed, update the info
      EOSMarkets[index].exchanges.push({
        name: 'newdex',
        url: 'https://newdex.io/trade/' + ticker.symbol,
        percent: 0,
        last: Number(ticker.last),
        change: Number(ticker.change) * 100,
        amount: Number(ticker.amount),
        volume: Number(ticker.volume)
      });
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
            <FontAwesomeIcon icon="chart-bar" className="mr-2 text-info fa-lg" />
            <h1 className="title text-info">EOS Marketcap</h1>
          </div>
          <div className="card-body bg-white p-0">
            <div style={{height: 50}} />
            <div className="text-center align-middle overlay" style={{paddingTop: 55}}>
              <FontAwesomeIcon icon="spinner" spin className="text-info fa-2x" />
            </div>
          </div>
        </div>
      </section>
    </article>
  );
};

const GetTokensSupply = (data) => {
  for (var token in data) {
    if (
      data[token] &&
      data[token].rows &&
      data[token].rows.length > 0 &&
      token != 'table_rows' &&
      token != 'cmc' &&
      token != 'newdex_tickers' &&
      token != 'bigone_tickers' &&
      token != 'bitfinex_pairs' &&
      token != 'blocksence_tickers' &&
      token != 'global_data' &&
      token != 'eos_stat'
    ) {
      index = EOSMarkets.findIndex((e) => e.currency.toUpperCase() == token.toUpperCase());

      if (index >= 0) {
        EOSMarkets[index].supply.current = data[token].rows[0].supply.split(' ')[0];
        EOSMarkets[index].supply.max = data[token].rows[0].max_supply.split(' ')[0];
      }
    }
  }
};

const RenderExchanges = (exchanges, isDarkMode) => {
  exchanges_info = [];
  exchanges.sort((a, b) => b.amount - a.amount).map((exchange) => {
    exchanges_info.push(
      <div className="row mt-1 shadow-sm mb-1 mbt-1px pt-1 pb-1" key={exchange.name}>
        <div className="col-6 row p-0 m-0 d-flex align-items-center flex-row-reverse">
          <div>
            <a
              href={exchange.url}
              target="_blank"
              className={`${isDarkMode ? 'linkcolor-dark' : ''}  font-weight-normal`}
            >
              {exchange.name} (<span className="ftz-10">{exchange.percent}%</span>)
            </a>
          </div>
          <div className="mr-1 bg-light logo-exc">
            <ReactImageFallback
              src={`${images}/${exchange.name}.png`}
              fallbackImage={`${images}/COMMON.png`}
              alt={`${exchange.name} token airdrop`}
              className="exchange_logo"
            />
          </div>
        </div>
        <div className="col-3 row p-0 m-0 d-flex align-items-center flex-row-reverse">
          <div className="col-12 col-sm-6 p-0 text-right">
            {Number(exchange.amount).toLocaleString(undefined, {maximumFractionDigits: 0})}
          </div>
          <div className="col-12 col-sm-6 p-0 text-right">
            {Number(exchange.volume).toLocaleString(undefined, {maximumFractionDigits: 0})}
          </div>
        </div>
        <div className="col-3 row p-0 m-0 d-flex align-items-center ">
          <div className="col-12 col-sm-7 p-0 text-right pr-1">
            {Number(exchange.last).toLocaleString(undefined, {maximumSignificantDigits: 4})}
          </div>
          <div className="col-12 col-sm-5 p-0 text-right pr-1">{renderPPColor(exchange.change.toFixed(2))} </div>
        </div>
      </div>
    );
  });
  return exchanges_info;
};

class EOSMarketCap extends Component {
  componentWillMount() {
    this.props.setActiveLinkID(3);
  }
  render() {
    const {isDarkMode} = this.props.sidebar;
    tokens = [];
    exchanges_info = [];
    return (
      <Query query={GetEOSMarketcap} pollInterval={0}>
        {({loading: loadingTM, error: errorTM, data: dataTM}) => {
          if (loadingTM) return <EOSMarketCapLoading isDarkMode={isDarkMode} />;
          if (errorTM) return <EOSMarketCapLoading isDarkMode={isDarkMode} />;
          if (
            dataTM &&
            dataTM.global_data &&
            dataTM.eos_stat &&
            dataTM.table_rows &&
            dataTM.cmc &&
            dataTM.newdex_tickers &&
            dataTM.bigone_tickers &&
            dataTM.bitfinex_pairs &&
            dataTM.blocksence_tickers
          ) {
            CalculateEOSMarkets(dataTM);
            const {global_data, eos_stat, table_rows, cmc} = dataTM;

            ram_price = (
              (Number(table_rows.rows[0].quote.balance.split(' ')[0]) /
                Number(table_rows.rows[0].base.balance.split(' ')[0])) *
              1024
            ).toFixed(4);
            max_ram_size = Number(global_data.rows[0].max_ram_size);
            eos_total_supply = Number(eos_stat.rows[0].supply.split(' ')[0]);
            eos_price = Number(cmc.data.quotes.USD.price).toFixed(2);
            eos_percent_change_24h = cmc.data.quotes.USD.percent_change_24h;
            eos_volume_24h = cmc.data.quotes.USD.volume_24h;
            {
              /* eosio_ram = Number(eosioram.core_liquid_balance.split(' ')[0]).toLocaleString('en', {
              maximumFractionDigits: 0
            }); */
            }

            //EOS
            tokens.push(
              <div className={`row p-1 shadow-sm mbt-1px ${isDarkMode ? 'bg-dark' : 'bg-white'}`} key={'RAM'}>
                <div className="col-3 pl-1 row m-0 d-flex align-items-center">
                  <div className="col-2 p-0 d-flex align-items-center">{1}</div>
                  <div className="col-10 p-0 pl-2 d-flex align-items-center">
                    <div className="mr-2 logo-bgr">
                      <ReactImageFallback
                        src={`${images}/EOS.png`}
                        fallbackImage={`${images}/COMMON.png`}
                        alt={`eos token airdrop`}
                        className="token_logo"
                      />
                    </div>
                    <div>EOS</div>
                  </div>
                </div>
                <div className="col-3 row p-0 m-0 d-flex align-items-center flex-row-reverse">
                  <div className="col-12 col-sm-6 p-0 text-right">
                    {eos_total_supply.toLocaleString(undefined, {maximumFractionDigits: 0})}
                  </div>
                  <div className="col-12 col-sm-6 p-0 text-right">
                    {eos_total_supply.toLocaleString(undefined, {maximumFractionDigits: 0})}
                  </div>
                </div>
                <div className="col-3 row p-0 m-0 d-flex align-items-center flex-row-reverse">
                  <div className="col-12 col-sm-6 p-0 text-right">
                    ${Number(eos_volume_24h).toLocaleString(undefined, {maximumFractionDigits: 0})}
                  </div>
                  <div className="col-12 col-sm-6 p-0 text-right">
                    ${Number(eos_volume_24h).toLocaleString(undefined, {maximumFractionDigits: 0})}
                  </div>
                </div>
                <div className="col-3 row p-0 m-0 d-flex align-items-center ">
                  <div className="col-12 col-sm-7 p-0 text-right pr-1">${eos_price}</div>
                  <div className="col-12 col-sm-5 p-0 text-right pr-1">{renderPPColor(eos_percent_change_24h)}</div>
                </div>
              </div>
            );
            //RAM
            tokens.push(
              <div className={`row p-1 shadow-sm mbt-1px ${isDarkMode ? 'bg-dark' : 'bg-white'}`} key={'EOSTOKEN'}>
                <div className="col-3 pl-1 row m-0 d-flex align-items-center">
                  <div className="col-2 p-0 d-flex align-items-center">{2}</div>
                  <div className="col-10 p-0 pl-2 d-flex align-items-center">
                    <div className=" mr-2 token_logo" style={{fontSize: 16}}>
                      <FontAwesomeIcon icon="memory" />
                    </div>
                    <div>RAM</div>
                  </div>
                </div>
                <div className="col-3 row p-0 m-0 d-flex align-items-center flex-row-reverse">
                  <div className="col-12 col-sm-6 p-0 text-right">{formatBandUnits(max_ram_size)}</div>
                  <div className="col-12 col-sm-6 p-0 text-right">
                    {((max_ram_size / 1024) * ram_price).toLocaleString(undefined, {maximumFractionDigits: 0})}
                  </div>
                </div>
                <div className="col-3 row p-0 m-0 d-flex align-items-center flex-row-reverse">
                  <div className="col-12 col-sm-6 p-0 text-right" />
                  <div className="col-12 col-sm-6 p-0 text-right"> </div>
                </div>
                <div className="col-3 row p-0 m-0 d-flex align-items-center ">
                  <div className="col-12 col-sm-7 p-0 text-right pr-1">{ram_price}</div>
                  <div className="col-12 col-sm-5 p-0 text-right pr-1" />
                </div>
              </div>
            );
            //TOKENS
            EOSMarkets.sort(
              (a, b) => Number(b.supply.current) * Number(b.last) - Number(a.supply.current) * Number(a.last)
            ).map((token, index) => {
              tokens.push(
                <div
                  className={`row p-1 shadow-sm mbt-1px ${isDarkMode ? 'bg-dark' : 'bg-white'}`}
                  key={token.currency}
                >
                  <div className="col-3 pl-1 row m-0 d-flex align-items-center">
                    <div className="col-2 p-0 d-flex align-items-center">{index + 3}</div>
                    <div className="col-10 p-0 pl-2 d-flex align-items-center">
                      <div className="mr-2 bg-white logo-bgr">
                        <ReactImageFallback
                          src={`${images}/${token.currency.toUpperCase()}.png`}
                          fallbackImage={`${images}/COMMON.png`}
                          alt={`${token.currency} token airdrop`}
                          className="token_logo"
                        />
                      </div>
                      <div>{token.currency.toUpperCase()}</div>
                    </div>
                  </div>
                  <div className="col-3 row p-0 m-0 d-flex align-items-center flex-row-reverse">
                    <div className="col-12 col-sm-6 p-0 text-right">
                      {Number(token.supply.current).toLocaleString(undefined, {maximumFractionDigits: 0})}
                    </div>
                    <div className="col-12 col-sm-6 p-0 text-right">
                      {(Number(token.supply.current) * Number(token.last)).toLocaleString(undefined, {
                        maximumFractionDigits: 0
                      })}
                    </div>
                  </div>
                  <div className="col-3 row p-0 m-0 d-flex align-items-center flex-row-reverse">
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
                    <div className="col-12 col-sm-6 p-0 text-right">
                      <a
                        className="font-weight-normal"
                        data-toggle="collapse"
                        href={`#collapse${token.symbol}`}
                        role="button"
                        aria-expanded="true"
                        aria-controls={`collapse${token.symbol}`}
                      >
                        {Number(token.volume).toLocaleString(undefined, {maximumFractionDigits: 0})}
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
                        {Number(token.last).toLocaleString(undefined, {maximumSignificantDigits: 4})}
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
                        {renderPPColor(token.change.toFixed(2))}
                      </a>
                    </div>
                  </div>
                  <div
                    className={`mt-1 collapse w-100 ${isDarkMode ? 'bg-dark-1' : 'bg-actions'}`}
                    id={`collapse${token.symbol}`}
                  >
                    {RenderExchanges(token.exchanges, isDarkMode)}
                  </div>
                </div>
              );
            });
            return (
              <article className="content dashboard-page">
                <section className="section">
                  <div className={`card mlr-2px shadow-sm ftz-marketcap mb-1 ${isDarkMode ? 'bg-dark' : 'bg-white'}`}>
                    <div className={`card-header pl-2 ${isDarkMode ? 'bg-dark' : 'bg-actions'}`}>
                      <FontAwesomeIcon icon="chart-bar" className="mr-2 text-info fa-lg" />
                      <h1 className="title text-info">EOS Marketcap</h1>
                    </div>
                    <div className="bg-white p-0 m-0 card-body ">
                      <div
                        className={`row p-1 shadow-sm mbt-1px text-info ${isDarkMode ? 'bg-dark' : 'bg-white'}`}
                        key={1}
                      >
                        <div className="col-3 pl-1 row m-0 d-flex align-items-center">
                          <div className="col-2 p-0 d-flex align-items-center">#</div>
                          <div className="col-10 p-0 pl-2 d-flex align-items-center">Name</div>
                        </div>
                        <div className="col-3 row p-0 m-0 d-flex align-items-center flex-row-reverse">
                          <div className="col-12 col-sm-6 p-0 text-right">Supply</div>
                          <div className="col-12 col-sm-6 p-0 text-right">Marketcap(EOS)</div>
                        </div>
                        <div className="col-3 row p-0 m-0 d-flex align-items-center flex-row-reverse">
                          <div className="col-12 col-sm-6 p-0 text-right">24h Volume</div>
                          <div className="col-12 col-sm-6 p-0 text-right">24h Volume(EOS)</div>
                        </div>
                        <div className="col-3 row p-0 m-0 d-flex align-items-center ">
                          <div className="col-12 col-sm-7 p-0 text-right pr-1">Price</div>
                          <div className="col-12 col-sm-5 p-0 text-right pr-1">24h Change </div>
                        </div>
                      </div>
                      {tokens}
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
  return {sidebar: myStore.sidebar};
}
export default connect(
  mapStateToProps,
  {setActiveLinkID}
)(EOSMarketCap);
