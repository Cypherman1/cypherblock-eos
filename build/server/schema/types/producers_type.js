const graphql = require('graphql');
const {GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList} = graphql;

const ProducerType = new GraphQLObjectType({
  name: 'ProducerType',
  fields: () => ({
    owner: {type: GraphQLString},
    total_votes: {type: GraphQLString},
    producer_key: {type: GraphQLString},
    is_active: {type: GraphQLString},
    url: {type: GraphQLString},
    unpaid_blocks: {type: GraphQLString},
    last_claim_time: {type: GraphQLString},
    location: {type: GraphQLString}
  })
});

const ProducersType = new GraphQLObjectType({
  name: 'ProducersType',
  fields: () => ({
    rows: {type: new GraphQLList(ProducerType)},
    total_producer_vote_weight: {type: GraphQLString},
    more: {type: GraphQLString}
  })
});

module.exports = ProducersType;
