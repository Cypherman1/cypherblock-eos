const graphql = require('graphql');
const {GraphQLObjectType, GraphQLString, GraphQLList} = graphql;

const RexPoolType = new GraphQLObjectType({
  name: 'RexPoolType',
  fields: () => ({
    version: {type: GraphQLString},
    total_lent: {type: GraphQLString},
    total_unlent: {type: GraphQLString},
    total_rent: {type: GraphQLString},
    total_lendable: {type: GraphQLString},
    total_rex: {type: GraphQLString},
    namebid_proceeds: {type: GraphQLString},
    loan_num: {type: GraphQLString}
  })
});

const RexPoolsType = new GraphQLObjectType({
  name: 'RexPoolsType',
  fields: () => ({
    rows: {type: new GraphQLList(RexPoolType)},
    more: {type: GraphQLString}
  })
});

module.exports = RexPoolsType;
