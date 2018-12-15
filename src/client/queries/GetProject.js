import gql from 'graphql-tag';

export default gql`
  query get_company($symbol: String) {
    company(symbol: $symbol) {
      marketcap {
        symbol
        contract
        currency
        supply {
          current
          max
        }
        last
        change
        amount
        volume
        exchanges {
          name
          url
          percent
          last
          change
          amount
          volume
        }
      }
      company_info {
        website
        name
        intro
      }
    }
  }
`;
