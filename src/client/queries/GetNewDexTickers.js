import gql from 'graphql-tag';

export default gql`
  {
    newdex_tickers {
      data {
        symbol
        contract
        currency
        last
        change
        high
        low
        amount
        volume
      }
    }
  }
`;
