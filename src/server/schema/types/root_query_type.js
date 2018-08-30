const graphql = require('graphql');
const axios = require('axios');
const {GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLInt, GraphQLBoolean} = graphql;
const AccountType = require('./account_type');
const CMCType = require('./cmc_type');
const ChainType = require('./chain_type');
const keys = require('../../config/keys');
const UserType = require('./user_type');
const {ActionsType} = require('./actions_type');
const TableRowsType = require('./table_rows_type');
const GlobalDataType = require('./global_data_type');
const CurrencyBalanceType = require('./currency_balance_type');
const BitfinexPairsType = require('./bitfinex_pairs_type');
const KeyAccountsType = require('./key_accounts_type');
const EosStatType = require('./eos_stat_type');
const TransactionType = require('./transaction_type');
const ProducersType = require('./producers_type');
const BlockType = require('./block_type');
const CodeType = require('./code_type');
const VoterFullInfoType = require('./voter_info_type');
const ABIType = require('./abi_type');

let VoterInfo = {};

const onError = (error) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.log(error.response.data);
    console.log(error.response.status);
    if (error.response.status == '503') return Promise.reject(error);
    //console.log(error.response.headers);
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.log(error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log('Error', error.message);
  }
  console.log(error.config);
};

const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    account: {
      type: AccountType,
      args: {account_name: {type: new GraphQLNonNull(GraphQLString)}},
      resolve(parentValue, {account_name}) {
        return axios
          .post(keys.chainURL + '/v1/chain/get_account', {
            account_name
          })
          .then((res) => res.data)
          .catch((error) => {
            onError(error);
          });
      }
    },
    voteinfo: {
      type: VoterFullInfoType,
      args: {account_name: {type: new GraphQLNonNull(GraphQLString)}},
      resolve(parentValue, {account_name}) {
        return axios
          .post(keys.chainURL_ALT1 + '/v1/chain/get_account', {
            account_name
          })
          .then((res) => {
            if (!res.data.voter_info.proxy) {
              return res.data.voter_info;
            } else {
              VoterInfo = res.data.voter_info;

              return axios
                .post(keys.chainURL_ALT1 + '/v1/chain/get_account', {
                  account_name: res.data.voter_info.proxy
                })
                .then((res1) => {
                  VoterInfo.proxy_vote_info = res1.data.voter_info;
                  return VoterInfo;
                })
                .catch((error) => {
                  onError(error);
                });
            }
          })
          .catch((error) => {
            onError(error);
          });
      }
    },
    code: {
      type: CodeType,
      args: {account_name: {type: new GraphQLNonNull(GraphQLString)}},
      resolve(parentValue, {account_name}) {
        return axios
          .post(keys.chainURL_ALT1 + '/v1/chain/get_code', {
            account_name
          })
          .then((res) => res.data)
          .catch((error) => {
            onError(error);
          });
      }
    },
    abi: {
      type: ABIType,
      args: {account_name: {type: new GraphQLNonNull(GraphQLString)}},
      resolve(parentValue, {account_name}) {
        return axios
          .post(keys.chainURL_ALT1 + '/v1/chain/get_abi', {
            account_name
          })
          .then((res) => res.data)
          .catch((error) => {
            onError(error);
          });
      }
    },
    transaction: {
      type: TransactionType,
      args: {
        id: {type: new GraphQLNonNull(GraphQLString)}
      },
      resolve(parentValue, {id}) {
        return axios
          .post(keys.chainURL + '/v1/history/get_transaction', {
            id
          })
          .then((res) => res.data)
          .catch((error) => {
            onError(error);
          });
      }
    },
    block: {
      type: BlockType,
      args: {
        block_num_or_id: {type: new GraphQLNonNull(GraphQLString)}
      },
      resolve(parentValue, {block_num_or_id}) {
        return axios
          .post(keys.chainURL + '/v1/chain/get_block', {
            block_num_or_id
          })
          .then((res) => res.data)
          .catch((error) => {
            onError(error);
          });
      }
    },
    producers: {
      type: ProducersType,
      args: {
        limit: {type: GraphQLString},
        lower_bound: {type: GraphQLString},
        json: {type: GraphQLBoolean}
      },
      resolve(parentValue, {limit, lower_bound, json}) {
        return axios
          .post(keys.chainURL + '/v1/chain/get_producers', {
            limit,
            lower_bound,
            json
          })
          .then((res) => res.data)
          .catch((error) => {
            onError(error);
          });
      }
    },
    actions: {
      type: ActionsType,
      args: {
        account_name: {type: new GraphQLNonNull(GraphQLString)},
        pos: {type: GraphQLInt},
        offset: {type: GraphQLInt}
      },
      resolve(parentValue, {account_name, pos, offset}) {
        return axios
          .post(keys.chainURL + '/v1/history/get_actions', {
            account_name,
            pos,
            offset
          })
          .then((res) => res.data)
          .catch((error) => {
            onError(error);
          });
      }
    },
    eos_stat: {
      type: EosStatType,
      args: {
        json: {type: GraphQLString},
        code: {type: GraphQLString},
        scope: {type: GraphQLString},
        table: {type: GraphQLString},
        limit: {type: GraphQLString}
      },
      resolve(parentValue, {json, code, scope, table, limit}) {
        return axios
          .post(keys.chainURL + '/v1/chain/get_table_rows', {
            json,
            code,
            scope,
            table,
            limit
          })
          .then((res) => res.data)
          .catch((error) => {
            onError(error);
          });
      }
    },
    key_accounts: {
      type: KeyAccountsType,
      args: {
        public_key: {type: new GraphQLNonNull(GraphQLString)}
      },
      resolve(parentValue, {public_key}) {
        return axios
          .post(keys.chainURL + '/v1/history/get_key_accounts', {
            public_key
          })
          .then((res) => res.data)
          .catch((error) => {
            onError(error);
          });
      }
    },
    currency_balance: {
      type: CurrencyBalanceType,
      args: {
        code: {type: new GraphQLNonNull(GraphQLString)},
        account: {type: new GraphQLNonNull(GraphQLString)},
        symbol: {type: new GraphQLNonNull(GraphQLString)}
      },
      resolve(parentValue, {code, account, symbol}) {
        return axios
          .post(keys.chainURL + '/v1/chain/get_currency_balance', {
            code,
            account,
            symbol
          })
          .then((res) => res)
          .catch((error) => {
            onError(error);
          });
      }
    },
    bitfinex_pairs: {
      type: BitfinexPairsType,
      resolve() {
        return axios
          .get('https://api.bitfinex.com/v2/tickers?symbols=tIQXEOS')
          .then((res) => res)
          .catch((error) => {
            onError(error);
          });
      }
    },
    table_rows: {
      type: TableRowsType,
      args: {
        json: {type: GraphQLString},
        code: {type: GraphQLString},
        scope: {type: GraphQLString},
        table: {type: GraphQLString},
        limit: {type: GraphQLString}
      },
      resolve(parentValue, {json, code, scope, table, limit}) {
        return axios
          .post(keys.chainURL + '/v1/chain/get_table_rows', {
            json,
            code,
            scope,
            table,
            limit
          })
          .then((res) => res.data)
          .catch((error) => {
            onError(error);
          });
      }
    },
    global_data: {
      type: GlobalDataType,
      args: {
        json: {type: GraphQLString},
        code: {type: GraphQLString},
        scope: {type: GraphQLString},
        table: {type: GraphQLString},
        limit: {type: GraphQLString}
      },
      resolve(parentValue, {json, code, scope, table, limit}) {
        return axios
          .post(keys.chainURL + '/v1/chain/get_table_rows', {
            json,
            code,
            scope,
            table,
            limit
          })
          .then((res) => res.data)
          .catch((error) => {
            onError(error);
          });
      }
    },
    chain: {
      type: ChainType,
      resolve() {
        return axios
          .get(keys.chainURL + '/v1/chain/get_info')
          .then((resp) => resp.data)
          .catch((error) => {
            onError(error);
          });
      }
    },
    cmc: {
      type: CMCType,
      resolve() {
        return axios
          .get('https://api.coinmarketcap.com/v2/ticker/1765/')
          .then((resp) => resp.data)
          .catch((error) => {
            onError(error);
          });
      }
    },
    user: {
      type: UserType,
      resolve(parentValue, args, req) {
        return req.user;
      }
    }
  }
});

module.exports = RootQueryType;
