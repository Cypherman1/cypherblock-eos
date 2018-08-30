const graphql = require('graphql');
const GraphQLJSON = require('graphql-type-json');
const {GraphQLObjectType, GraphQLString} = graphql;

const ABIType = new GraphQLObjectType({
  name: 'ABIType',
  fields: () => ({
    account_name: {type: GraphQLString},
    abi: {type: GraphQLJSON}
  })
});

module.exports = ABIType;
