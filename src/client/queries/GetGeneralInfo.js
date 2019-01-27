import gql from 'graphql-tag';

export default gql`
  query general_info {
    eos_stat(json: "true", code: "eosio.token", scope: "EOS", table: "stat", limit: "10") {
      rows {
        supply
      }
    }
    staked: currency_balance(code: "eosio.token", account: "eosio.stake", symbol: "EOS") {
      data
    }
    chain {
      head_block_num
      head_block_time
      last_irreversible_block_num
      head_block_producer
    }
    table_rows(json: "true", code: "eosio", scope: "eosio", table: "rammarket", limit: "10") {
      rows {
        supply
        base {
          balance
        }
        quote {
          balance
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
    global_data(json: "true", code: "eosio", scope: "eosio", table: "global", limit: "10") {
      rows {
        max_ram_size
        total_ram_bytes_reserved
        total_ram_stake
        total_activated_stake
        total_producer_vote_weight
      }
    }
  }
`;
