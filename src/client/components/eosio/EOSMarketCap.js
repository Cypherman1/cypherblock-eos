import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Query} from 'react-apollo';
import ReactImageFallback from 'react-image-fallback';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {renderPPColor} from '../utils/RenderColors';
import {setActiveLinkID} from '../../actions/sidebar';
import GetEOSMarketcap from '../../queries/GetEOSMarketcap';
const images = './imgs';

let EOSMarkets = [];
let tokens = [];
let tmp_last = 0;
let tmp_change = 0;
let tmp_amount = 0;
let tmp_volume = 0;
let exs_count = 0;
let index = null;
let gqlstr = '';

const CalculateEOSMarkets = (data) => {
  EOSMarkets = [];
  // add newdex's tickers to market
  Add_NewdexTickers(data.newdex_tickers);
  // Add_BigoneTickers(data.bigone_tickers);
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
    index = EOSMarkets.findIndex((e) => e.symbol == 'iq_eos');
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
      index = EOSMarkets.findIndex((e) => e.symbol == ticker.toLowerCase() + '_eos');
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
const BigonetoNewdex_sybol = (market_id) => {
  return market_id.substring(0, market_id.indexOf('-')).toLowerCase() + '_eos';
};
const BigonetoNewdex_currency = (market_id) => {
  return market_id.substring(0, market_id.indexOf('-')).toUpperCase();
};

const Add_BigoneTickers = (tickers) => {
  tickers.data.map((ticker) => {
    // find current ticker list, if existed, return the index
    index = EOSMarkets.findIndex((e) => e.symbol == BigonetoNewdex_sybol(ticker.market_id));

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
          <div className="card-header pl-2 bg-white mb-1 shadow-sm">
            <FontAwesomeIcon icon="chart-bar" className="mr-2 text-info fa-lg" />
            <h1 className="title text-info">EOS Marketcap</h1>
          </div>
          <div className="card-body  bg-white p-0">
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
      token != 'blocksence_tickers'
    ) {
      index = EOSMarkets.findIndex((e) => e.currency == token);

      if (index >= 0) {
        EOSMarkets[index].supply.current = data[token].rows[0].supply.split(' ')[0];
        EOSMarkets[index].supply.max = data[token].rows[0].max_supply.split(' ')[0];
      }
    }
  }
};

class EOSMarketCap extends Component {
  componentWillMount() {
    this.props.setActiveLinkID(3);
  }
  render() {
    const {isDarkMode} = this.props.sidebar;
    tokens = [];
    return (
      <Query query={GetEOSMarketcap} pollInterval={10000}>
        {({loading: loadingTM, error: errorTM, data: dataTM}) => {
          if (loadingTM) return <EOSMarketCapLoading isDarkMode={isDarkMode} />;
          if (errorTM) return <EOSMarketCapLoading isDarkMode={isDarkMode} />;
          if (
            dataTM &&
            dataTM.table_rows &&
            dataTM.cmc &&
            dataTM.newdex_tickers &&
            dataTM.bitfinex_pairs &&
            dataTM.blocksence_tickers
          ) {
            CalculateEOSMarkets(dataTM);
          }
          EOSMarkets.sort(
            (a, b) => Number(b.supply.current) * Number(b.last) - Number(a.supply.current) * Number(a.last)
          ).map((token, index) => {
            tokens.push(
              <div
                className={`row p-1 shadow-sm mb-1 mbt-1px ${isDarkMode ? 'bg-dark' : 'bg-white'}`}
                key={token.currency}
              >
                <div className="col-3 pl-1 row m-0 d-flex align-items-center">
                  <div className="col-2 p-0 d-flex align-items-center">{index + 1}</div>
                  <div className="col-10 p-0 pl-2 d-flex align-items-center">
                    <div className="mr-1 bg-white logo-bgr">
                      <ReactImageFallback
                        src={`${images}/${token.currency}.png`}
                        fallbackImage={`${images}/COMMON.png`}
                        alt={`${token.currency} token airdrop`}
                        className="token_logo"
                      />
                    </div>
                    <div>{token.currency}</div>
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
                    {Number(token.amount).toLocaleString(undefined, {maximumSignificantDigits: 4})}
                  </div>
                  <div className="col-12 col-sm-6 p-0 text-right">
                    {Number(token.volume).toLocaleString(undefined, {maximumSignificantDigits: 4})}
                  </div>
                </div>
                <div className="col-3 row p-0 m-0 d-flex align-items-center ">
                  <div className="col-12 col-sm-7 p-0 text-right pr-1">
                    {Number(token.last).toLocaleString(undefined, {maximumSignificantDigits: 4})}
                  </div>
                  <div className="col-12 col-sm-5 p-0 text-right pr-1"> {renderPPColor(token.change.toFixed(2))} </div>
                </div>
              </div>
            );
          });
          return (
            <article className="content dashboard-page">
              <section className="section">
                <div className={`card mlr-2px shadow-sm ftz-marketcap mb-1 ${isDarkMode ? 'bg-dark' : 'bg-white'}`}>
                  <div className={`card-header pl-2 mb-1 shadow-sm ${isDarkMode ? 'bg-dark' : 'bg-white'}`}>
                    <FontAwesomeIcon icon="chart-bar" className="mr-2 text-info fa-lg" />
                    <h1 className="title text-info">EOS Marketcap</h1>
                  </div>
                  <div className="bg-white p-0 m-0 card-body ">
                    <div
                      className={`row p-1 shadow-sm mb-1 mbt-1px text-info ${isDarkMode ? 'bg-dark' : 'bg-white'}`}
                      key={1}
                    >
                      <div className="col-3 pl-1 row m-0 d-flex align-items-center">
                        <div className="col-2 p-0 d-flex align-items-center">#</div>
                        <div className="col-10 p-0 pl-2 d-flex align-items-center">Name</div>
                      </div>
                      <div className="col-3 row p-0 m-0 d-flex align-items-center flex-row-reverse">
                        <div className="col-12 col-sm-6 p-0 text-right">Supply</div>
                        <div className="col-12 col-sm-6 p-0 text-right">Marketcap</div>
                      </div>
                      <div className="col-3 row p-0 m-0 d-flex align-items-center flex-row-reverse">
                        <div className="col-12 col-sm-6 p-0 text-right">Volume</div>
                        <div className="col-12 col-sm-6 p-0 text-right">Volume(EOS)</div>
                      </div>
                      <div className="col-3 row p-0 m-0 d-flex align-items-center ">
                        <div className="col-12 col-sm-7 p-0 text-right pr-1">Price</div>
                        <div className="col-12 col-sm-5 p-0 text-right pr-1"> 24h </div>
                      </div>
                    </div>
                    {tokens}
                  </div>
                </div>
              </section>
            </article>
          );
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
