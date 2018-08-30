const graphql = require('graphql');
const GraphQLJSON = require('graphql-type-json');
const {GraphQLObjectType, GraphQLString} = graphql;

const CodeType = new GraphQLObjectType({
  name: 'CodeType',
  fields: () => ({
    account_name: {type: GraphQLString},
    code_hash: {type: GraphQLString},
    wast: {type: GraphQLString},
    abi: {type: GraphQLJSON}
  })
});

module.exports = CodeType;
