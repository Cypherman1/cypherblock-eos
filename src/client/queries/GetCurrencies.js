import gql from 'graphql-tag';

import {Tokens} from '../components/utils/Tokens';

const GenCurGql = (Tokens) => {
  let gqlstr = '';
  Tokens.map((token) => {
    gqlstr += `${token.symbol}: currency_balance(
            code: "${token.code}",
            account: $account,
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
  query get_currency_balance ($account: String!) {
    ${GenCurGql(Tokens)}
  }
`;
