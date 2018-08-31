import gql from 'graphql-tag';

export default gql`
  query get_actions($account_name: String!, $pos: Int, $offset: Int) {
    actions(account_name: $account_name, pos: $pos, offset: $offset) {
      actions {
        global_action_seq
        account_action_seq
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
            data
          }
          trx_id
        }
      }
    }
  }
`;
