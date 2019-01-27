import gql from 'graphql-tag';

export default gql`
  query eos_marketcap($limit: String) {
    eosmarketcap(limit: $limit) {
      data {
        symbol
        contract
        currency
        supply {
          current
          max
        }
        last
        change
        amount
        volume
        exchanges {
          name
          url
          percent
          last
          change
          amount
          volume
        }
      }
    }
    companies {
      data {
        symbol
        website
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
        quote {
          USD {
            price
            volume_24h
            percent_change_24h
          }
        }
      }
    }
  }
`;
