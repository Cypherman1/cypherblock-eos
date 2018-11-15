const graphql = require('graphql');
const {GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt} = graphql;
const {ReceiptType, ActType} = require('./actions_type');
const {TxReceiveType} = require('./transaction_type');

const ActionInlineType = new GraphQLObjectType({
  name: 'ActionInlineType',
  fields: () => ({
    receipt: {type: ReceiptType},
    act: {type: ActType},
    context_free: {type: GraphQLString},
    elapsed: {type: GraphQLInt},
    console: {type: GraphQLString},
    trx_id: {type: GraphQLString},
    block_num: {type: GraphQLString},
    block_time: {type: GraphQLString},
    producer_block_id: {type: GraphQLString},
    account_ram_deltas: {type: new GraphQLList(GraphQLString)},
    inline_traces: {type: new GraphQLList(ActionInlineType)}
  })
});

const MongoTransactionType = new GraphQLObjectType({
  name: 'MongoTransactionType',
  fields: () => ({
    id: {type: GraphQLString},
    block_num: {type: GraphQLString},
    block_time: {type: GraphQLString},
    receipt: {type: TxReceiveType},
    elapsed: {type: GraphQLString},
    net_usage: {type: GraphQLString},
    scheduled: {type: GraphQLString},
    action_traces: {type: new GraphQLList(ActionInlineType)}
  })
});

module.exports = MongoTransactionType;
