import gql from 'graphql-tag';

export default gql`
  query get_account_info($account_name: String!) {
    account(account_name: $account_name) {
      account_name
      head_block_time
      created
      core_liquid_balance
      net_limit {
        used
        available
        max
      }
      cpu_limit {
        used
        available
        max
      }
      ram_usage
      permissions
      total_resources {
        owner
        net_weight
        cpu_weight
        ram_bytes
      }
      voter_info {
        staked
      }
      refund_request {
        owner
        request_time
        cpu_amount
        net_amount
      }
    }
    voteinfo(account_name: $account_name) {
      owner
      proxy
      producers
      staked
      last_vote_weight
      proxied_vote_weight
      is_proxy
      proxy_vote_info {
        owner
        proxy
        producers
        staked
        last_vote_weight
        proxied_vote_weight
        is_proxy
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
    netloan: rex_resloan(
      json: "true"
      code: "eosio"
      scope: "eosio"
      table: "netloan"
      index_position: "3"
      key_type: "name"
      lower_bound: $account_name
      upper_bound: $account_name
      limit: "1000"
    ) {
      rows {
        version
        from
        receiver
        payment
        balance
        total_staked
        loan_num
        expiration
      }
    }
    cpuloan: rex_resloan(
      json: "true"
      code: "eosio"
      scope: "eosio"
      table: "cpuloan"
      index_position: "3"
      key_type: "name"
      lower_bound: $account_name
      upper_bound: $account_name
      limit: "1000"
    ) {
      rows {
        version
        from
        receiver
        payment
        balance
        total_staked
        loan_num
        expiration
      }
    }
    rex_pool(json: "true", code: "eosio", scope: "eosio", table: "rexpool") {
      rows {
        version
        total_lent
        total_unlent
        total_rent
        total_lendable
        total_rex
        namebid_proceeds
        loan_num
      }
    }
    rex_fund(
      json: "true"
      code: "eosio"
      scope: "eosio"
      table: "rexfund"
      lower_bound: $account_name
      upper_bound: $account_name
    ) {
      rows {
        version
        owner
        balance
      }
    }
    rex_balance(
      json: "true"
      code: "eosio"
      scope: "eosio"
      table: "rexbal"
      index_position: "1"
      lower_bound: $account_name
      upper_bound: $account_name
      limit: "1000"
    ) {
      rows {
        version
        owner
        vote_stake
        rex_balance
        matured_rex
        rex_maturities {
          first
          second
        }
      }
    }
  }
`;
