import gql from 'graphql-tag';

export default gql`
  query get_company($symbol: String) {
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
    company(symbol: $symbol) {
      rank
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
