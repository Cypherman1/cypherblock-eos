const graphql = require('graphql');
const {GraphQLObjectType, GraphQLString, GraphQLList} = graphql;

const RexFundType = new GraphQLObjectType({
  name: 'RexFundType',
  fields: () => ({
    version: {type: GraphQLString},
    owner: {type: GraphQLString},
    balance: {type: GraphQLString}
  })
});

const RexFundsType = new GraphQLObjectType({
  name: 'RexFundsType',
  fields: () => ({
    rows: {type: new GraphQLList(RexFundType)},
    more: {type: GraphQLString}
  })
});

module.exports = RexFundsType;
