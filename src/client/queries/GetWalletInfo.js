import gql from 'graphql-tag';

// import {Tokens} from '../components/utils/Tokens';

import Tokens from '../../server/db/eosmarketcap.json';

const GenCurGql = (Tokens) => {
  let gqlstr = '';
  Tokens.map((token) => {
    if (token.symbol != 'eosio.token-eos-eusd')
      gqlstr += `t_${token.currency}${token.contract.replace('.', '_')}: currency_balance(
            code: "${token.contract}",
            account: $account_name,
            symbol: "${token.currency.toUpperCase()}"
        ){
            data
        }
        `;
  });

  return (
    gqlstr +
    `
    eosmarketcap {
      data {
        symbol
        contract
        currency
        last
        change
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
  `
  );
};

export default gql`
  query get_wallet_info($account_name: String!) {
    ${GenCurGql(Tokens)}
  }
`;
