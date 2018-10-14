const graphql = require('graphql');
const {GraphQLObjectType, GraphQLString, GraphQLList} = graphql;

const BigOneTickerType = new GraphQLObjectType({
  name: 'BigOneTickerType',
  fields: () => ({
    market_id: {type: GraphQLString},
    volume: {type: GraphQLString},
    daily_change_perc: {type: GraphQLString},
    close: {type: GraphQLString}
  })
});

const BigOneTickersType = new GraphQLObjectType({
  name: 'BigOneTickersType',
  fields: () => ({
    data: {type: GraphQLList(BigOneTickerType)}
  })
});

module.exports = BigOneTickersType;
