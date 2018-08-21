const graphql = require('graphql');
const {GraphQLObjectType, GraphQLInt, GraphQLString} = graphql;

//const Lyric = mongoose.model('lyric');

const ChainType = new GraphQLObjectType({
  name: 'ChainType',
  fields: () => ({
    server_version: {type: GraphQLString},
    chain_id: {type: GraphQLString},
    head_block_num: {type: GraphQLInt},
    last_irreversible_block_num: {type: GraphQLInt},
    last_irreversible_block_id: {type: GraphQLString},
    head_block_id: {type: GraphQLString},
    head_block_time: {type: GraphQLString},
    head_block_producer: {type: GraphQLString},
    virtual_block_cpu_limit: {type: GraphQLInt},
    virtual_block_net_limit: {type: GraphQLInt},
    block_cpu_limit: {type: GraphQLInt},
    block_net_limit: {type: GraphQLInt}
  })
});

module.exports = ChainType;
