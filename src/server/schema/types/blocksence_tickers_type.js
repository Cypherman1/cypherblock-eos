const graphql = require('graphql');
const GraphQLJSON = require('graphql-type-json');
const {GraphQLObjectType} = graphql;

const BlockSenceTickersType = new GraphQLObjectType({
  name: 'BlockSenceTickersType',
  fields: () => ({
    data: {type: GraphQLJSON}
  })
});

module.exports = BlockSenceTickersType;
