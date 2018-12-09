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
      data {
        quotes {
          USD {
            price
            volume_24h
            percent_change_24h
          }
        }
      }
    }
    eosmarketcap(limit: "10") {
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
  }
`;
