import gql from 'graphql-tag';

export default gql`
  query get_actions($account_name: String!, $pos: Int, $offset: Int) {
    total: actions(account_name: $account_name, pos: -1, offset: -1) {
      actions {
        account_action_seq
      }
    }
    actions(account_name: $account_name, pos: $pos, offset: $offset) {
      actions {
        global_action_seq
        account_action_seq
        block_num
        block_time
        action_trace {
          receipt {
            receiver
            act_digest
            global_sequence
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
          trx_id
        }
      }
      last_irreversible_block
    }
    chain {
      head_block_num
    }
  }
`;
