const graphql = require('graphql');
const {GraphQLObjectType, GraphQLString, GraphQLList} = graphql;

const NewDexTickerType = new GraphQLObjectType({
  name: 'NewDexTickerType',
  fields: () => ({
    symbol: {type: GraphQLString},
    contract: {type: GraphQLString},
    currency: {type: GraphQLString},
    last: {type: GraphQLString},
    change: {type: GraphQLString},
    high: {type: GraphQLString},
    low: {type: GraphQLString},
    amount: {type: GraphQLString},
    volume: {type: GraphQLString}
  })
});

const NewDexTickersType = new GraphQLObjectType({
  name: 'NewDexTickersType',
  fields: () => ({
    code: {type: GraphQLString},
    data: {type: GraphQLList(NewDexTickerType)}
  })
});

module.exports = NewDexTickersType;
