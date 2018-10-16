import gql from 'graphql-tag';

export default gql`
  query get_token_market {
    bitfinex_pairs {
      data
    }
    blocksence_tickers {
      data
    }
    bigone_tickers {
      data {
        market_id
        volume
        daily_change_perc
        close
      }
    }
  }
`;
