import gql from 'graphql-tag';

export default gql`
  query get_block($block_num_or_id: String!) {
    block(block_num_or_id: $block_num_or_id) {
      id
      timestamp
      producer
      previous
      block_num
      transactions {
        trx
      }
    }
  }
`;
