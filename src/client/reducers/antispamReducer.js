import {SET_ANTISPAM_CONFIG} from '../actions/types';

const INITIAL_STATE = {
  min_eos_ammount: 0.0005,
  min_token_ammount: 0.0005,
  black_list: [
    {
      act_account: 'betdicealert',
      act_name: 'broadcast'
    },
    {
      act_account: '1hello1world',
      act_name: 'hi'
    }
  ]
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    default:
      return state;
  }
}
