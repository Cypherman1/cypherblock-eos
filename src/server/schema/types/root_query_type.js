const graphql = require("graphql");
const axios = require("axios");
const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt
} = graphql;
const AccountType = require("./account_type");
const CMCType = require("./cmc_type");
const ChainType = require("./chain_type");
const keys = require("../../config/keys");
const UserType = require("./user_type");
const ActionsType = require("./actions_type");
const TableRowsType = require("./table_rows_type");
const GlobalDataType = require("./global_data_type");
const CurrencyBalanceType = require("./currency_balance_type");
const BitfinexPairsType = require("./bitfinex_pairs_type");

const RootQueryType = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    account: {
      type: AccountType,
      args: { account_name: { type: new GraphQLNonNull(GraphQLString) } },
      resolve(parentValue, { account_name }) {
        return axios
          .post(keys.chainURL + "/v1/chain/get_account", {
            account_name
          })
          .then(res => res.data)
          .catch(res => {
            console.log(res.data);
            // Error
            // if (res.response) {
            //   // The request was made and the server responded with a status code
            //   // that falls out of the range of 2xx
            //   console.log(error.response.data);
            //   console.log(error.response.status);
            //   //console.log(error.response.headers);
            // } else if (error.request) {
            //   // The request was made but no response was received
            //   // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            //   // http.ClientRequest in node.js
            //   //console.log(error.request);
            // } else {
            //   // Something happened in setting up the request that triggered an Error
            //   //console.log("Error", error.message);
            // }
            // //console.log(error.config);
          });
      }
    },
    actions: {
      type: ActionsType,
      args: {
        account_name: { type: new GraphQLNonNull(GraphQLString) },
        pos: { type: GraphQLInt },
        offset: { type: GraphQLInt }
      },
      resolve(parentValue, { account_name, pos, offset }) {
        return axios
          .post(keys.chainURL + "/v1/history/get_actions", {
            account_name,
            pos,
            offset
          })
          .then(res => res.data)
          .catch(res => {
            console.log(res.data);
          });
      }
    },
    currency_balance: {
      type: CurrencyBalanceType,
      args: {
        code: { type: new GraphQLNonNull(GraphQLString) },
        account: { type: new GraphQLNonNull(GraphQLString) },
        symbol: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parentValue, { code, account, symbol }) {
        return axios
          .post(keys.chainURL + "/v1/chain/get_currency_balance", {
            code,
            account,
            symbol
          })
          .then(res => res)
          .catch(err => {
            console.log(err);
          });
      }
    },
    bitfinex_pairs: {
      type: BitfinexPairsType,
      resolve() {
        return axios
          .get("https://api.bitfinex.com/v2/tickers?symbols=tIQXEOS")
          .then(res => res);
      }
    },
    table_rows: {
      type: TableRowsType,
      args: {
        json: { type: GraphQLString },
        code: { type: GraphQLString },
        scope: { type: GraphQLString },
        table: { type: GraphQLString },
        limit: { type: GraphQLString }
      },
      resolve(parentValue, { json, code, scope, table, limit }) {
        return axios
          .post(keys.chainURL + "/v1/chain/get_table_rows", {
            json,
            code,
            scope,
            table,
            limit
          })
          .then(res => res.data)
          .catch(err => {
            console.log(err);
          });
      }
    },
    global_data: {
      type: GlobalDataType,
      args: {
        json: { type: GraphQLString },
        code: { type: GraphQLString },
        scope: { type: GraphQLString },
        table: { type: GraphQLString },
        limit: { type: GraphQLString }
      },
      resolve(parentValue, { json, code, scope, table, limit }) {
        return axios
          .post(keys.chainURL + "/v1/chain/get_table_rows", {
            json,
            code,
            scope,
            table,
            limit
          })
          .then(res => res.data)
          .catch(err => {
            console.log(err);
          });
      }
    },
    chain: {
      type: ChainType,
      resolve() {
        return axios
          .get(keys.chainURL + "/v1/chain/get_info")
          .then(resp => resp.data)
          .catch(err => {
            console.log(err);
          });
      }
    },
    cmc: {
      type: CMCType,
      resolve() {
        return axios
          .get("https://api.coinmarketcap.com/v2/ticker/1765/")
          .then(resp => resp.data)
          .catch(err => {
            console.log(err);
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
