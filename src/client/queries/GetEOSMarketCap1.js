import gql from 'graphql-tag';

export default gql`
  query eos_marketcap {
    tokens_supply {
      data {
        symbol
        currency
        supply
        max_supply
        issuer
      }
    }
    table_rows(json: "true", code: "eosio", scope: "eosio", table: "rammarket", limit: "10") {
      rows {
        supply
        base {
          balance
          weight
        }
        quote {
          balance
          weight
        }
      }
    }
    eos_stat(json: "true", code: "eosio.token", scope: "EOS", table: "stat", limit: "10") {
      rows {
        supply
      }
    }
    global_data(json: "true", code: "eosio", scope: "eosio", table: "global", limit: "10") {
      rows {
        max_ram_size
      }
    }
    cmc {
      EOS {
        quotes {
          USD {
            price
            volume_24h
            percent_change_24h
          }
        }
      }
    }
    newdex_tickers {
      data {
        symbol
        contract
        currency
        last
        change
        amount
        volume
      }
    }
    bigone_tickers {
      data {
        market_id
        volume
        daily_change_perc
        close
      }
    }
    bitfinex_pairs {
      data
    }
    blocksence_tickers {
      data
    }
  }
`;
