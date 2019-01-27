const TOKENS_PATH = __dirname + '/../db/tokens.json';
const TOKENS_SUPPLY_PATH = __dirname + '/../db/tokens_supply.json';
const BIGONE_TICKERS_PATH = __dirname + '/../db/bigone_tickers.json';
const BANCOR_TICKERS_PATH = __dirname + '/../db/bancor_tickers.json';
const BITFINEX_TICKERS_PATH = __dirname + '/../db/bitfinex_tickers.json';
const BLOCKSENCE_TICKERS_PATH = __dirname + '/../db/blocksence_tickers.json';
const NEWDEX_TICKERS_PATH = __dirname + '/../db/newdex_tickers.json';
const EOSMARKETCAP_PATH = __dirname + '/../db/eosmarketcap.json';
const CMC_PATH = __dirname + '/../db/cmc.json';
let fs = require('fs');

let EOSMarkets = [];
let NewdexTickers = [];
let BigoneTickers = [];
let BancorTickers = [];
let BlocksenceTickers = [];
let BitfinexPairs = [];
let TokensSupply = [];
let index = 0;
let tmp_amount = 0;
let tmp_last = 0;
let tmp_change = 0;
let tmp_volume = 0;
let exs_count = 0;
let tmp_change_amount = 0;
let eos_price = 0;
const other_exs = require('./other_exs.js');

const Aggregate_Markets = () => {
  for (var i = 0; i < EOSMarkets.length; i++) {
    tmp_amount = 0;
    tmp_last = 0;
    tmp_change = 0;
    tmp_volume = 0;
    exs_count = 0;
    tmp_change_amount = 0;
    // aggregate volume, price, 24h percent of all exchanges for each token
    EOSMarkets[i].exchanges.map((exchange) => {
      tmp_amount += exchange.amount;
      tmp_volume += exchange.volume;
      tmp_last += exchange.last * exchange.amount;
      if (exchange.change) {
        tmp_change += exchange.change * exchange.amount;
        tmp_change_amount += exchange.amount;
      }
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
      EOSMarkets[i].change = tmp_change / tmp_change_amount;
    } else {
      EOSMarkets[i].last = EOSMarkets[i].exchanges[0].last;
      EOSMarkets[i].change = EOSMarkets[i].exchanges[0].change;
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
        name: 'Bitfinex',
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
      index = EOSMarkets.findIndex(
        (e) => e.symbol == e.contract + '-' + ticker.toLowerCase() + '-eos' && e.symbol != 'ethsidechain-eeth-eos'
      );

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
          name: 'Chaince',
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

const AddBancorTickers = (eos_price) => {
  BancorTickers = JSON.parse(fs.readFileSync(BANCOR_TICKERS_PATH));

  BancorTickers.rows.map((ticker) => {
    // find current ticker list, if existed, return the index
    index = EOSMarkets.findIndex(
      (e) =>
        e.currency.toUpperCase() == ticker.from_token_code.toUpperCase() &&
        e.contract.toUpperCase() == ticker.from_token_account.toUpperCase()
    );

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
        name: 'Bancor',
        url: 'https://eos.bancor.network/',
        percent: 0,
        last: Number(ticker.token_value) / Number(eos_price),
        change: null,
        amount: Number(ticker.volume24) / Number(ticker.token_value),
        volume: Number(ticker.volume24) / Number(eos_price)
      });
    }
  });
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
        name: 'BigONE',
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
          name: 'Newdex',
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
  other_exs.map((ticker) => {
    index = EOSMarkets.findIndex((e) => e.symbol == ticker.symbol);

    if (index == -1) {
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
        exchanges: []
      });
    }
  });
};

const calEOSMarketcap = () => {
  eos_price = JSON.parse(fs.readFileSync(CMC_PATH)).data.EOS.quote.USD.price;

  EOSMarkets = [];

  AddNewdexTickers();

  AddBigoneTickers();

  AddBancorTickers(eos_price);

  AddBlocksenceTickers();

  AddBitfinexPairs();

  AddTokensSupply();

  Aggregate_Markets();

  fs.writeFile(
    EOSMARKETCAP_PATH,
    JSON.stringify(
      EOSMarkets.sort((a, b) => Number(b.supply.current) * Number(b.last) - Number(a.supply.current) * Number(a.last))
    ),
    (err) => {
      if (err) process.stdout.write('Write tokens file fail!' + err);
    }
  );
};

module.exports = calEOSMarketcap;
