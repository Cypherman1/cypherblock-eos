const graphql = require('graphql');
const {GraphQLObjectType, GraphQLString, GraphQLList} = graphql;

const TokenSupplyType = new GraphQLObjectType({
  name: 'TokenSupplyType',
  fields: () => ({
    symbol: {type: GraphQLString},
    currency: {type: GraphQLString},
    supply: {type: GraphQLString},
    max_supply: {type: GraphQLString},
    issuer: {type: GraphQLString}
  })
});

const TokensSupplyType = new GraphQLObjectType({
  name: 'TokensSupplyType',
  fields: () => ({
    data: {type: new GraphQLList(TokenSupplyType)}
  })
});

module.exports = TokensSupplyType;
