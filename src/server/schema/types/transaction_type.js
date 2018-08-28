const graphql = require('graphql');
const {GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList} = graphql;
const {ActionTraceType} = require('./actions_type.js');

const TransactionType = new GraphQLObjectType({
  name: 'TransactionType',
  fields: () => ({
    id: {type: GraphQLString},
    tx: {type: txType},
    block_time: {type: GraphQLString},
    block_num: {type: GraphQLString},
    last_irreversible_block: {type: GraphQLString},
    traces: {type: new GraphQLList(ActionTraceType)}
  })
});

const txType = new GraphQLObjectType({
  name: 'txType',
  fields: () => ({
    tx: {type: TxReceiveType}
  })
});

const TxReceiveType = new GraphQLObjectType({
  name: 'TxReceiveType',
  fields: () => ({
    status: {type: GraphQLString},
    cpu_usage_us: {type: GraphQLInt},
    net_usage_words: {type: GraphQLInt},
    trx: {type: new GraphQLList(GraphQLString)}
  })
});

module.exports = TransactionType;
