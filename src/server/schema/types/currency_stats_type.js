const graphql = require('graphql');
const {GraphQLObjectType, GraphQLList, GraphQLString, GraphQLBoolean} = graphql;

const CurrencyStatType = new GraphQLObjectType({
  name: 'CurrencyStatType',
  fields: () => ({
    supply: {type: GraphQLString},
    max_supply: {type: GraphQLString},
    issuer: {type: GraphQLString}
  })
});

const CurrencyStatsType = new GraphQLObjectType({
  name: 'CurrencyStatsType',
  fields: () => ({
    rows: {type: new GraphQLList(CurrencyStatType)},
    more: {type: GraphQLBoolean}
  })
});

module.exports = CurrencyStatsType;
