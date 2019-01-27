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
  }
`;
