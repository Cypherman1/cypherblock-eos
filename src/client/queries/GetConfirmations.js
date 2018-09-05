import gql from 'graphql-tag';

export default gql`
  query get_confirmations {
    chain {
      head_block_num
      last_irreversible_block_num
    }
  }
`;
