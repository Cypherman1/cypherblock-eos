const graphql = require('graphql');
const {GraphQLObjectType, GraphQLList, GraphQLString, GraphQLBoolean} = graphql;

const StatType = new GraphQLObjectType({
  name: 'StatType',
  fields: () => ({
    supply: {type: GraphQLString},
    max_supply: {type: GraphQLString},
    issuer: {type: GraphQLString}
  })
});

const EosStatType = new GraphQLObjectType({
  name: 'EosStatType',
  fields: () => ({
    rows: {type: new GraphQLList(StatType)},
    more: {type: GraphQLBoolean}
  })
});

module.exports = EosStatType;
