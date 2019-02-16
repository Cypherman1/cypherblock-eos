// 1. EOS Action
/// 1.1. Transfer
//// 1.1.1. Types
export const AT_SEND_EOS = 'Send EOS';
export const AT_RECEIVE_EOS = 'Receive EOS';
export const AT_TRANSFER_EOS = 'Tranfer EOS';
export const AT_SEND_TOKEN = 'Send token';
export const AT_RECEIVE_TOKEN = 'Receive token';
export const AT_TRANSFER_TOKEN = 'Transfer token';
export const AT_ISSUE_TOKEN = 'Issue token';
//// 1.1.2. Groups
export const AG_TRANSFER_EOS = 'Transfer EOS';
export const AG_TRANSFER_TOKEN = 'Transfer token';
/// 1.2. Resources
//// 1.2.1. Types
export const AT_STAKE = 'Stake';
export const AT_UNSTAKE = 'Unstake';
export const AT_BUY_RAM = 'Buy RAM';
export const AT_BUY_RAM_BYTES = 'Buy RAM';
export const AT_SELL_RAM = 'Sell RAM';
export const AT_REFUND = 'Refund';
//// 1.2.2. Groups
export const AG_RESOURCES = 'Account Resources';
///1.3. Account
////1.3.1. Types
export const AT_CREATE_ACCOUNT = 'Create Account';
export const AT_UPDATE_AUTH = 'Update Authorization';
export const AT_BID_NAME = 'Bid Name';
////1.3.2. Groups
export const AG_ACCOUNT = 'Account';

export const AT_VOTE_PRODUCERS = 'Vote Producers';
export const AG_VOTE = 'Vote';
//Contract
export const AT_SET_CODE = 'Set Code';
export const AT_SET_ABI = 'Set ABI';
export const AG_CONTRACT = 'Contract';
//Others
export const AT_CLAIMREWARDS = 'Claim Rewards';
export const AT_CANCELDELAY = 'Cancel Delay';
export const AT_OTHERS = 'Other Actions';
export const AG_OTHERS = 'Others';

export const AntiSpams = {
  min_eos_ammount: 0.0009,
  min_token_ammount: 0.0009,
  black_account: [
    'message.bank',
    'contractbase',
    'alert.x',
    'news.x',
    'justgamemora',
    'rockscissors',
    'message.x',
    'experimentms',
    'gameboylucky',
    'eosjackscool',
    'lelego.x',
    'goldioioioio',
    'okbetteam111'
  ],
  black_list: [
    {
      act_account: 'betdicealert',
      act_name: 'broadcast'
    },
    {
      act_account: '1hello1world',
      act_name: 'hi'
    },
    {
      act_account: 'eospromoter1',
      act_name: 'promote'
    },
    {
      act_account: 'eospromotera',
      act_name: 'promote'
    },
    {
      act_account: 'eoseosaddddd',
      act_name: 'eosabcd'
    },
    {
      act_account: 'betdiceadmin',
      act_name: 'promote'
    },
    {
      act_account: 'watchdoggiee',
      act_name: 'promote'
    },
    {
      act_account: 'eosbaycasino',
      act_name: 'ping'
    },
    {
      act_account: 'eosblackdrop',
      act_name: 'alert'
    },
    {
      act_account: 'watchdoggiee',
      act_name: 'ping'
    },
    {
      act_account: 'eospromdress',
      act_name: 'dice'
    },
    {
      act_account: 'experimentms',
      act_name: 'msg'
    },
    {
      act_account: 'eosplayaloud',
      act_name: 'yell'
    },
    {
      act_account: 'candy.pra',
      act_name: 'broadcast'
    },
    {
      act_account: 'eosonthefly1',
      act_name: 'broadcast'
    },
    {
      act_account: 'yumgamealert',
      act_name: 'push'
    },
    {
      act_account: '2g1com.x',
      act_name: 'broadcast'
    },
    {
      act_account: 'betdicealert',
      act_name: 'news'
    },
    {
      act_account: 'wizznetwork1',
      act_name: 'broadcast'
    },
    {
      act_account: 'ecafofficiel',
      act_name: 'arbitration'
    },
    {
      act_account: 'cryptotim.e',
      act_name: 'broadcast'
    }
  ]
};
