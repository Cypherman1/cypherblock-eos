import gql from 'graphql-tag';

export default gql`
  query get_market_info {
    eosioram: account(account_name: "eosio.ram") {
      core_liquid_balance
    }
    eosioramfee: account(account_name: "eosio.ramfee") {
      core_liquid_balance
    }
    cmc {
      data {
        quotes {
          USD {
            price
            volume_24h
            market_cap
            percent_change_24h
          }
        }
      }
      metadata {
        timestamp
        error
      }
    }
    global_data(json: "true", code: "eosio", scope: "eosio", table: "global", limit: "10") {
      rows {
        max_ram_size
        total_ram_bytes_reserved
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
  }
`;
