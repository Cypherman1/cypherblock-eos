import gql from 'graphql-tag';

export default gql`
  query get_actions($account_name: String!, $pos: Int, $offset: Int) {
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
            recv_sequence
            auth_sequence
            code_sequence
            abi_sequence
          }
          act {
            account
            name
            authorization {
              actor
              permission
            }
            data
            hex_data
          }
          elapsed
          cpu_usage
          console
          total_cpu_usage
          trx_id
          inline_traces {
            receipt {
              receiver
              act_digest
              global_sequence
              recv_sequence
              auth_sequence
              code_sequence
              abi_sequence
            }
            act {
              account
              name
              authorization {
                actor
                permission
              }
              data
              hex_data
            }
            elapsed
            cpu_usage
            console
            total_cpu_usage
            trx_id
          }
        }
      }
      last_irreversible_block
    }
  }
`;
