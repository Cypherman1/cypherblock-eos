const graphql = require('graphql');
const GraphQLJSON = require('graphql-type-json');
const {GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList} = graphql;

const BlockType = new GraphQLObjectType({
  name: 'BlockType',
  fields: () => ({
    timestamp: {type: GraphQLString},
    producer: {type: GraphQLString},
    confirmed: {type: GraphQLInt},
    previous: {type: GraphQLString},
    transaction_mroot: {type: GraphQLString},
    action_mroot: {type: GraphQLString},
    schedule_version: {type: GraphQLString},
    new_producers: {type: GraphQLString},
    header_extensions: {type: new GraphQLList(GraphQLString)},
    producer_signature: {type: GraphQLString},
    transactions: {type: new GraphQLList(BlockTransactionType)},
    block_extensions: {type: new GraphQLList(GraphQLString)},
    id: {type: GraphQLString},
    block_num: {type: GraphQLString},
    ref_block_prefix: {type: GraphQLString}
  })
});

const BlockTransactionType = new GraphQLObjectType({
  name: 'BlockTransactionType',
  fields: () => ({
    status: {type: GraphQLString},
    cpu_usage_us: {type: GraphQLInt},
    net_usage_words: {type: GraphQLInt},
    trx: {type: GraphQLJSON}
  })
});

module.exports = BlockType;
