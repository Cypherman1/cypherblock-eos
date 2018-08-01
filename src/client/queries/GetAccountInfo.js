import gql from "graphql-tag";

export default gql`
  query get_account_info($account_name: String!) {
    account(account_name: $account_name) {
      account_name
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
      total_resources {
        owner
        net_weight
        cpu_weight
        ram_bytes
      }
      refund_request {
        owner
        request_time
        cpu_amount
        net_amount
      }
      voter_info {
        owner
        proxy
        producers
        staked
        last_vote_weight
        is_proxy
      }
    }
    table_rows(
      json: "true"
      code: "eosio"
      scope: "eosio"
      table: "rammarket"
      limit: "10"
    ) {
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
