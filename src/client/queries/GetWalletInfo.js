import gql from "graphql-tag";

import { Tokens } from "../components/utils/Tokens";

const GenCurGql = Tokens => {
  let gqlstr = "";
  Tokens.map(token => {
    gqlstr =
      gqlstr +
      `${token.symbol}: currency_balance(
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
  query get_wallet_info($account_name: String!) {
    ${GenCurGql(Tokens)}
  }
`;
