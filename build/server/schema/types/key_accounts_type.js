const graphql = require('graphql');
const {GraphQLObjectType, GraphQLList, GraphQLString} = graphql;

const KeyAccountsType = new GraphQLObjectType({
  name: 'KeyAccountsType',
  fields: () => ({
    account_names: {type: new GraphQLList(GraphQLString)}
  })
});

module.exports = KeyAccountsType;
