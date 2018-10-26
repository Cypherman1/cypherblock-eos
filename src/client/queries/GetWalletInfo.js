import gql from 'graphql-tag';

import {Tokens} from '../components/utils/Tokens';

const GenCurGql = (Tokens) => {
  let gqlstr = '';
  Tokens.map((token) => {
    gqlstr += `${token.currency}: currency_balance(
            code: "${token.contract}",
            account: $account_name,
            symbol: "${token.currency}"
        ){
            data
        }
        `;
  });

  return (
    gqlstr +
    `bitfinex_pairs{
    data
  }
  blocksence_tickers {
    data
  }
  newdex_tickers {
    data {
      symbol
      contract
      currency
      last
      change
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
  bigone_tickers {
    data {
      market_id
      volume
      daily_change_perc
      close
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
