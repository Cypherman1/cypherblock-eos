import gql from 'graphql-tag';

import {Tokens} from '../components/utils/Tokens';

const GenCurGql = (Tokens) => {
  let gqlstr = '';
  Tokens.map((token) => {
    gqlstr += `${token.symbol}: currency_balance(
            code: "${token.code}",
            account: $account_name,
            symbol: "${token.symbol}"
        ){
            data
        }
        `;
  });

  return (
    gqlstr +
    `bitfinex_pairs{
    data
  }`
  );
};

export default gql`
  query get_account($account_name: String!) {
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
    eosioram: account(account_name: "eosio.ram") {
      core_liquid_balance
    }
    eosioramfee: account(account_name: "eosio.ramfee") {
      core_liquid_balance
    }
    cmc {
      EOS {
        quote {
          USD {
            price
            volume_24h
            market_cap
            percent_change_24h
          }
        }
      }
    }
    global_data(
      json: "true"
      code: "eosio"
      scope: "eosio"
      table: "global"
      limit: "10"
    ) {
      rows {
        max_ram_size
        total_ram_bytes_reserved
      }
    }
    ${GenCurGql(Tokens)}
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
