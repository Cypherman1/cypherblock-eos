const graphql = require('graphql');
const {GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList} = graphql;

const VoterFullInfoType = new GraphQLObjectType({
  name: 'VoterFullInfoType',
  fields: () => ({
    owner: {type: GraphQLString},
    proxy: {type: GraphQLString},
    producers: {type: new GraphQLList(GraphQLString)},
    staked: {type: GraphQLString},
    last_vote_weight: {type: GraphQLString},
    proxied_vote_weight: {type: GraphQLString},
    is_proxy: {type: GraphQLInt},
    proxy_vote_info: {type: VoterFullInfoType}
  })
});

module.exports = VoterFullInfoType;
