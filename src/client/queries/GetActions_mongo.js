import gql from 'graphql-tag';

export default gql`
  query get_actions_mongo($account_name: String!, $skip: Int, $limit: Int) {
    mongo_actions(account_name: $account_name, skip: $skip, limit: $limit) {
      actions {
        block_num
        block_time
        trx_id
        receipt {
          receiver
          act_digest
          global_sequence
          recv_sequence
        }
        act {
          account
          name
          authorization {
            actor
            permission
          }
          data
        }
      }
    }
    chain {
      head_block_num
      last_irreversible_block_num
    }
  }
`;
