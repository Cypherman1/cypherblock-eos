const graphql = require('graphql');
const {GraphQLObjectType, GraphQLString, GraphQLList} = graphql;

const RexMaturityType = new GraphQLObjectType({
  name: 'RexMaturityType',
  fields: () => ({
    first: {type: GraphQLString},
    second: {type: GraphQLString}
  })
});

const RexBalanceType = new GraphQLObjectType({
  name: 'RexBalanceType',
  fields: () => ({
    version: {type: GraphQLString},
    owner: {type: GraphQLString},
    vote_stake: {type: GraphQLString},
    rex_balance: {type: GraphQLString},
    matured_rex: {type: GraphQLString},
    rex_maturities: {type: new GraphQLList(RexMaturityType)}
  })
});

const RexBalancesType = new GraphQLObjectType({
  name: 'RexBalancesType',
  fields: () => ({
    rows: {type: new GraphQLList(RexBalanceType)},
    more: {type: GraphQLString}
  })
});

module.exports = RexBalancesType;
