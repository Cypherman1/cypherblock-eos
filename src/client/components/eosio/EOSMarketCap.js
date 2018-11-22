import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Query} from 'react-apollo';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {setActiveLinkID} from '../../actions/sidebar';
import GetTokenMarket from '../../queries/GetTokenMarket';

let EOSMarkets = [];
let tmp_last = 0;
let tmp_change = 0;
let tmp_amount = 0;
let tmp_volume = 0;
let exs_count = 0;
let index = null;

const CalculateEOSMarkets = (data) => {
  EOSMarkets = [];
  // add newdex's tickers to market
  Add_NewdexTickers(data.newdex_tickers);
  Add_BigoneTickers(data.bigone_tickers);
  Add_BlockSenceTicker(data.blocksence_tickers);
  Add_BifinexPairs(data.bitfinex_pairs);
  Aggregate_Markets();
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
    EOSMarkets[i].last = tmp_last / tmp_amount;
    EOSMarkets[i].volume = tmp_volume;
    EOSMarkets[i].change = tmp_change / tmp_amount;
  }
};

const Add_BifinexPairs = (pairs) => {
  pairs.data.map((pair) => {
    index = EOSMarkets.findIndex((e) => e.symbol == 'iq_eos');
    if (index === -1) {
      //if not existed, add ticker to the list
      EOSMarkets.push({
        symbol: 'iq_eos',
        contract: null,
        currency: 'IQ',
        last: 0,
        change: 0,
        amount: 0,
        volume: 0,
        exchanges: [
          {
            name: 'bitfinex',
            last: Number(pair[7]),
            change: Number(pair[6]) * 100,
            amount: Number(pair[8]),
            volume: Number(pair[7]) * Number(pair[8])
          }
        ]
      });
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
        EOSMarkets.push({
          symbol: ticker.toLowerCase() + '_eos',
          contract: null,
          currency: ticker.toUpperCase(),
          last: 0,
          change: 0,
          amount: 0,
          volume: 0,
          exchanges: [
            {
              name: 'chaince',
              last: Number(tickers.data[ticker].eos_price),
              change: Number(tickers.data[ticker].percent_change),
              amount: Number(tickers.data[ticker]['24_hour_volume']),
              volume: Number(tickers.data[ticker]['24_hour_volume_in_eos'])
            }
          ]
        });
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
      EOSMarkets.push({
        symbol: BigonetoNewdex_sybol(ticker.market_id),
        contract: null,
        currency: BigonetoNewdex_currency(ticker.market_id),
        last: 0,
        change: 0,
        amount: 0,
        volume: 0,
        exchanges: [
          {
            name: 'bigone',
            last: Number(ticker.close),
            change: Number(ticker.daily_change_perc),
            amount: Number(ticker.volume),
            volume: Number(ticker.close) * Number(ticker.volume)
          }
        ]
      });
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

const EOSMarketCapLoading = () => {
  return (
    <article className="content dashboard-page">
      <section className="section">
        <div className="card row mlr-2px bg-white shadow-sm">
          <div className="card-header pl-2 bg-white mb-1 shadow-sm">
            <FontAwesomeIcon icon="chart-bar" className="mr-2 text-info fa-lg" />
            <h1 className="title text-info">EOS Marketcap</h1>
          </div>
          <div className="card-body  bg-white p-0">
            <div style={{height: 50}} />
            <div className="text-center align-middle overlay" style={{paddingTop: 50}}>
              <FontAwesomeIcon icon="spinner" spin className="text-info fa-2x" />
            </div>
          </div>
        </div>
      </section>
    </article>
  );
};

class EOSMarketCap extends Component {
  componentWillMount() {
    this.props.setActiveLinkID(3);
  }
  render() {
    const {isDarkMode} = this.props.sidebar;
    return (
      <Query query={GetTokenMarket} pollInterval={0}>
        {({loading, error, data}) => {
          if (loading) return <EOSMarketCapLoading isDarkMode={isDarkMode} />;
          if (error) return <EOSMarketCapLoading isDarkMode={isDarkMode} />;
          if (
            data &&
            data.table_rows &&
            data.cmc &&
            data.newdex_tickers &&
            data.bigone_tickers &&
            data.bitfinex_pairs &&
            data.blocksence_tickers
          ) {
            CalculateEOSMarkets(data);
            console.log(EOSMarkets);
          }
          return (
            <article className="content dashboard-page">
              <section className="section">
                <div className="card row mlr-2px bg-white shadow-sm">
                  <div className="card-header pl-2 bg-white mb-1 shadow-sm">
                    <FontAwesomeIcon icon="chart-bar" className="mr-2 text-info fa-lg" />
                    <h1 className="title text-info">EOS Marketcap</h1>
                  </div>
                  <div className="card-body  bg-white p-0">
                    <div> Price </div>
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
