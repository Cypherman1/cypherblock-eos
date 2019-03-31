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
const {TransactionType} = require('./transaction_type');
const ProducersType = require('./producers_type');
const BlockType = require('./block_type');
const CodeType = require('./code_type');
const VoterFullInfoType = require('./voter_info_type');
const ABIType = require('./abi_type');
const BigOneTickersType = require('./bigone_tickers_type');
// const BancorTickersType = require('./bancor_tickers_type');
const BlockSenceTickersType = require('./blocksence_tickers_type');
const NewDexTickersType = require('./newdex_tickers_type');
const {MongoActionsType} = require('./mongo_actions_type');
const MongoTransactionType = require('./mongo_transaction_type');
const CurrencyStatsType = require('./currency_stats_type');
const TokensSupplyType = require('./tokens_supply_type');
const TOKENS_SUPPLY_PATH = __dirname + '/../../db/tokens_supply.json';
const EOSMARKETCAP_PATH = __dirname + '/../../db/eosmarketcap.json';
const COMPANY_INFO_PATH = __dirname + '/../../db/companies_info.json';
const CMC_PATH = __dirname + '/../../db/cmc.json';
const {EOSMarketcapType} = require('./eosmarketcap_type');
const {CompanyType} = require('./company_type');
const CompaniesType = require('./companies_type');

let fs = require('fs');
const readFileAsync = require('util').promisify(fs.readFile);

let VoterInfo = {};
let eosmc = [];

const onError = (error) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    // console.log(error.response.data);
    // console.log(error.response.status);
    if (error.response.status == '503') return Promise.reject(error);
    //console.log(error.response.headers);
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    // console.log(error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    // console.log('Error', error.message);
  }
  // console.log(error.config);
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
            if (res.data.voter_info && !res.data.voter_info.proxy) {
              return res.data.voter_info;
            } else {
              if (res.data.voter_info) {
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
              } else {
                return null;
              }
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
          .post(keys.historyURL + '/v1/history/get_transaction', {
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
          .post(keys.historyURL + '/v1/chain/get_block', {
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
          .post(keys.historyURL + '/v1/history/get_actions', {
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
    mongo_actions: {
      type: MongoActionsType,
      args: {
        account_name: {type: new GraphQLNonNull(GraphQLString)},
        skip: {type: GraphQLInt},
        limit: {type: GraphQLInt}
      },
      resolve(parentValue, {account_name, skip, limit}) {
        return axios
          .get(keys.mongoHistoryURL + `/v1/history/get_actions/${account_name}?skip=${skip}&limit=${limit}`)
          .then((res) => res.data)
          .catch((error) => {
            onError(error);
          });
      }
    },
    mongo_transaction: {
      type: MongoTransactionType,
      args: {
        id: {type: new GraphQLNonNull(GraphQLString)}
      },
      resolve(parentValue, {id}) {
        return axios
          .get(keys.mongoHistoryURL + `/v1/history/get_transaction/${id}`)
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
    tokens_supply: {
      type: TokensSupplyType,
      resolve() {
        return readFileAsync(TOKENS_SUPPLY_PATH)
          .then((data) => JSON.parse(data))
          .catch((error) => {
            onError(error);
          });
      }
    },
    companies: {
      type: CompaniesType,
      resolve() {
        return readFileAsync(COMPANY_INFO_PATH)
          .then((data) => {
            return {data: JSON.parse(data)};
          })
          .catch((error) => {
            onError(error);
          });
      }
    },
    company: {
      type: CompanyType,
      args: {
        symbol: {type: GraphQLString}
      },
      resolve(parentValue, {symbol}) {
        return readFileAsync(EOSMARKETCAP_PATH)
          .then((imarket) => {
            return readFileAsync(COMPANY_INFO_PATH)
              .then((icompanyinfo) => {
                return {
                  rank: JSON.parse(imarket)
                    .filter((a) => {
                      return a.symbol != 'eosio.token-eos-eusd' && a.symbol.substring(a.symbol.length - 4) == '-eos';
                    })
                    .findIndex((e) => e.symbol == symbol),
                  marketcap:
                    JSON.parse(imarket).findIndex((e) => e.symbol == symbol) > -1
                      ? JSON.parse(imarket)[JSON.parse(imarket).findIndex((e) => e.symbol == symbol)]
                      : null,
                  company_info: {
                    website:
                      JSON.parse(icompanyinfo).findIndex((e) => e.symbol == symbol) > -1
                        ? JSON.parse(icompanyinfo)[JSON.parse(icompanyinfo).findIndex((e) => e.symbol == symbol)]
                            .website
                        : null,
                    name:
                      JSON.parse(icompanyinfo).findIndex((e) => e.symbol == symbol) > -1
                        ? JSON.parse(icompanyinfo)[JSON.parse(icompanyinfo).findIndex((e) => e.symbol == symbol)].name
                        : null,
                    intro:
                      JSON.parse(icompanyinfo).findIndex((e) => e.symbol == symbol) > -1
                        ? JSON.parse(icompanyinfo)[JSON.parse(icompanyinfo).findIndex((e) => e.symbol == symbol)].intro
                        : null
                  }
                };
              })
              .catch((error) => {
                onError(error);
              });
          })
          .catch((error) => {
            onError(error);
          });
      }
    },
    eosmarketcap: {
      type: EOSMarketcapType,
      args: {
        limit: {type: GraphQLString}
      },
      resolve(parentValue, {limit}) {
        return readFileAsync(EOSMARKETCAP_PATH)
          .then((data) => {
            // eosmc = JSON.parse(data);
            if (limit) {
              return {
                data: JSON.parse(data)
                  .sort((a, b) => Number(b.supply.current) * Number(b.last) - Number(a.supply.current) * Number(a.last))
                  .slice(0, limit)
              };
            } else {
              return {
                data: JSON.parse(data).sort(
                  (a, b) => Number(b.supply.current) * Number(b.last) - Number(a.supply.current) * Number(a.last)
                )
              };
            }
          })
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
    newdex_tickers: {
      type: NewDexTickersType,
      resolve() {
        return axios
          .get('https://api.newdex.io/v1/ticker/all')
          .then((res) => {
            if (res.data && res.data.code == '200') return res.data;
            else return null;
          })
          .catch((error) => {
            onError(error);
          });
      }
    },
    // newdex_tickers: {
    //   type: NewDexTickersType,
    //   resolve() {
    //     let mainObject = {data: []};
    //     let promises = [];

    //     tokens.map((token) => {
    //       if (token.newdex_pair) {
    //         promises.push(axios.get('https://api.newdex.io/v1/ticker?symbol=' + token.newdex_pair));
    //       }
    //     });
    //     return axios
    //       .all(promises)
    //       .then((results) => {
    //         results.map((response) => {
    //           if (response.data.code == '200') mainObject.data.push(response.data.data);
    //         });
    //         return mainObject;
    //       })
    //       .catch((error) => {
    //         onError(error);
    //       });
    //   }
    // },
    bigone_tickers: {
      type: BigOneTickersType,
      resolve() {
        let result = {data: []};
        return axios
          .get('https://big.one/api/v2/tickers')
          .then((res) => {
            res.data.data.map((item) => {
              if (item.market_id.match(/-EOS/g)) result.data.push(item);
            });
            return result;
          })
          .catch((error) => {
            onError(error);
          });
      }
    },
    blocksence_tickers: {
      type: BlockSenceTickersType,
      resolve() {
        return axios
          .get('https://blocksense.one/api/token.json')
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
    currency_stats: {
      type: CurrencyStatsType,
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
    // cmc: {
    //   type: CMCType,
    //   resolve() {
    //     return axios
    //       .get('https://api.coinmarketcap.com/v2/ticker/1765/')
    //       .then((resp) => resp.data)
    //       .catch((error) => {
    //         onError(error);
    //       });
    //   }
    // },
    cmc: {
      type: CMCType,
      resolve() {
        return readFileAsync(CMC_PATH)
          .then((data) => JSON.parse(data).data)
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
