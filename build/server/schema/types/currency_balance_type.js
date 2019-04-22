const graphql = require('graphql');
const {GraphQLObjectType, GraphQLList, GraphQLString} = graphql;

const CurrencyBalanceType = new GraphQLObjectType({
  name: 'CurrencyBalanceType',
  fields: () => ({
    data: {type: new GraphQLList(GraphQLString)}
  })
});

module.exports = CurrencyBalanceType;
