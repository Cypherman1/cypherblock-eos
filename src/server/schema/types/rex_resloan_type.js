const graphql = require('graphql');
const {GraphQLObjectType, GraphQLString, GraphQLList} = graphql;

const RexResLoanType = new GraphQLObjectType({
  name: 'RexResLoanType',
  fields: () => ({
    version: {type: GraphQLString},
    from: {type: GraphQLString},
    receiver: {type: GraphQLString},
    payment: {type: GraphQLString},
    balance: {type: GraphQLString},
    total_staked: {type: GraphQLString},
    loan_num: {type: GraphQLString},
    expiration: {type: GraphQLString}
  })
});

const RexResLoansType = new GraphQLObjectType({
  name: 'RexResLoansType',
  fields: () => ({
    rows: {type: new GraphQLList(RexResLoanType)},
    more: {type: GraphQLString}
  })
});

module.exports = RexResLoansType;
