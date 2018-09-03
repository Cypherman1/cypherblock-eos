import gql from 'graphql-tag';

export default gql`
  query get_transaction($id: String!) {
    transaction(id: $id) {
      id
      trx {
        receipt {
          status
          cpu_usage_us
          net_usage_words
        }
      }
      block_time
      block_num
      last_irreversible_block
      traces {
        receipt {
          receiver
          act_digest
          global_sequence
        }
        act {
          account
          name
          data
        }
      }
    }
    chain {
      head_block_num
    }
  }
`;
