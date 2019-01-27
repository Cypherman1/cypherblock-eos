import gql from 'graphql-tag';

export default gql`
  query get_token_market {
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
    eos_stat(json: "true", code: "eosio.token", scope: "EOS", table: "stat", limit: "10") {
      rows {
        supply
      }
    }
    eosmarketcap(limit: "8") {
      data {
        symbol
        contract
        currency
        supply {
          current
        }
        last
        change
        amount
        volume
      }
    }
  }
`;
