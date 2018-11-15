import gql from 'graphql-tag';

export default gql`
  query get_mongo_transaction($id: String!) {
    mongo_transaction(id: $id) {
      id
      receipt {
        status
        cpu_usage_us
        net_usage_words
      }
      block_num
      block_time
      action_traces {
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
        inline_traces {
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
          inline_traces {
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
            inline_traces {
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
              inline_traces {
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
          }
        }
      }
    }
    chain {
      head_block_num
      last_irreversible_block_num
    }
  }
`;
