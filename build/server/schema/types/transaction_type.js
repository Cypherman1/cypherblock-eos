const graphql = require('graphql');
const {GraphQLObjectType, GraphQLString, GraphQLList} = graphql;
const {ActionTraceType} = require('./actions_type.js');

const TransactionType = new GraphQLObjectType({
  name: 'TransactionType',
  fields: () => ({
    id: {type: GraphQLString},
    trx: {type: txType},
    block_time: {type: GraphQLString},
    block_num: {type: GraphQLString},
    last_irreversible_block: {type: GraphQLString},
    traces: {type: new GraphQLList(ActionTraceType)}
  })
});

const txType = new GraphQLObjectType({
  name: 'txType',
  fields: () => ({
    receipt: {type: TxReceiveType}
  })
});

const TxReceiveType = new GraphQLObjectType({
  name: 'TxReceiveType',
  fields: () => ({
    status: {type: GraphQLString},
    cpu_usage_us: {type: GraphQLString},
    net_usage_words: {type: GraphQLString}
  })
});

module.exports = {TransactionType, TxReceiveType};
