const TOKENS_PATH = __dirname + '/../db/tokens.json';
const TOKENS_SUPPLY_PATH = __dirname + '/../db/tokens_supply.json';
const BIGONE_TICKERS_PATH = __dirname + '/../db/bigone_tickers.json';
const BITFINEX_TICKERS_PATH = __dirname + '/../db/bitfinex_tickers.json';
const BLOCKSENCE_TICKERS_PATH = __dirname + '/../db/blocksence_tickers.json';
const NEWDEX_TICKERS_PATH = __dirname + '/../db/newdex_tickers.json';
const EOSMARKETCAP_PATH = __dirname + '/../db/eosmarketcap.json';
let fs = require('fs');

let EOSMarkets = [];
let NewdexTickers = [];
let BigoneTickers = [];
let BlocksenceTickers = [];
let BitfinexPairs = [];
let TokensSupply = [];
let index = 0;
let tmp_amount = 0;
let tmp_last = 0;
let tmp_change = 0;
let tmp_volume = 0;
let exs_count = 0;

const Aggregate_Markets = () => {
  for (var i = 0; i < EOSMarkets.length; i++) {
    tmp_amount = 0;
    tmp_last = 0;
    tmp_change = 0;
    tmp_volume = 0;
    exs_count = 0;
    // aggregate volume, price, 24h percent of all exchanges for each token
    EOSMarkets[i].exchanges.map((exchange) => {
      tmp_amount += exchange.amount;
      tmp_volume += exchange.volume;
      tmp_last += exchange.last * exchange.amount;
      tmp_change += exchange.change * exchange.amount;
    });
    //update ammout and volume of each token
    EOSMarkets[i].amount = tmp_amount;
    EOSMarkets[i].volume = tmp_volume;
    if (tmp_amount > 0) {
      //calculate volume percentage of each exchange
      EOSMarkets[i].exchanges.map((exchange, index) => {
        EOSMarkets[i].exchanges[index].percent = ((EOSMarkets[i].exchanges[index].amount / tmp_amount) * 100).toFixed(
          2
        );
      });
      //update price and change percent of each token
      EOSMarkets[i].last = tmp_last / tmp_amount;
      EOSMarkets[i].change = tmp_change / tmp_amount;
    } else {
      EOSMarkets[i].last = tmp_last;
      EOSMarkets[i].change = tmp_change;
    }
    //calcualate total statistic
  }
};

const AddTokensSupply = () => {
  TokensSupply = JSON.parse(fs.readFileSync(TOKENS_SUPPLY_PATH));
  TokensSupply.data.map((token) => {
    index = EOSMarkets.findIndex((e) => e.symbol.toUpperCase() == token.symbol.toUpperCase());
    if (index >= 0) {
      EOSMarkets[index].supply.current = token.supply;
      EOSMarkets[index].supply.max = token.max_supply;
    }
  });
};

const AddBitfinexPairs = () => {
  BitfinexPairs = JSON.parse(fs.readFileSync(BITFINEX_TICKERS_PATH));
  BitfinexPairs.map((pair) => {
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

const AddBlocksenceTickers = () => {
  BlocksenceTickers = JSON.parse(fs.readFileSync(BLOCKSENCE_TICKERS_PATH));

  for (var ticker in BlocksenceTickers) {
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
          last: Number(BlocksenceTickers[ticker].eos_price),
          change: Number(BlocksenceTickers[ticker].percent_change),
          amount: Number(BlocksenceTickers[ticker]['24_hour_volume']),
          volume: Number(BlocksenceTickers[ticker]['24_hour_volume_in_eos'])
        });
      }
    }
  }
};

const BigonetoNewdex_sybol = (market_id, contract) => {
  return contract + '-' + market_id.substring(0, market_id.indexOf('-')).toLowerCase() + '-eos';
};

const AddBigoneTickers = () => {
  BigoneTickers = JSON.parse(fs.readFileSync(BIGONE_TICKERS_PATH));

  BigoneTickers.data.map((ticker) => {
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

const AddNewdexTickers = () => {
  NewdexTickers = JSON.parse(fs.readFileSync(NEWDEX_TICKERS_PATH));

  NewdexTickers.map((ticker) => {
    // // find current ticker list, if existed, return the index
    // index = EOSMarkets.findIndex((e) => e.symbol == ticker.symbol);
    // if (index === -1) {
    //   //if not existed, add ticker to the list
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
    // } else if (index >= 0) {
    //   //if existed, update the info
    //   EOSMarkets[index].exchanges.push({
    //     name: 'newdex',
    //     url: 'https://newdex.io/trade/' + ticker.symbol,
    //     percent: 0,
    //     last: Number(ticker.last),
    //     change: Number(ticker.change) * 100,
    //     amount: Number(ticker.amount),
    //     volume: Number(ticker.volume)
    //   });
    // }
  });
};

const calEOSMarketcap = () => {
  EOSMarkets = [];

  AddNewdexTickers();

  AddBigoneTickers();

  AddBlocksenceTickers();

  AddBitfinexPairs();

  AddTokensSupply();

  Aggregate_Markets();

  fs.writeFile(EOSMARKETCAP_PATH, JSON.stringify(EOSMarkets), (err) => {
    if (err) process.stdout.write('Write tokens file fail!' + err);
  });
};

module.exports = calEOSMarketcap;
