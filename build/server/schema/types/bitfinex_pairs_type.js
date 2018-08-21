const graphql = require('graphql');
const {GraphQLObjectType, GraphQLList, GraphQLString} = graphql;

const BitfinexPairsType = new GraphQLObjectType({
  name: 'BitfinexPairsType',
  fields: () => ({
    data: {type: new GraphQLList(GraphQLList(GraphQLString))}
  })
});

module.exports = BitfinexPairsType;
