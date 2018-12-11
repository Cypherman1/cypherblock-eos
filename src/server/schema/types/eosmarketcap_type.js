const graphql = require('graphql');
const {GraphQLObjectType, GraphQLList, GraphQLString} = graphql;

const ExchangeType = new GraphQLObjectType({
  name: 'ExchangesType',
  fields: () => ({
    name: {type: GraphQLString},
    url: {type: GraphQLString},
    percent: {type: GraphQLString},
    last: {type: GraphQLString},
    change: {type: GraphQLString},
    amount: {type: GraphQLString},
    volume: {type: GraphQLString}
  })
});

const SupplyType = new GraphQLObjectType({
  name: 'SupplyType',
  fields: () => ({
    current: {type: GraphQLString},
    max: {type: GraphQLString}
  })
});

const EMTokenType = new GraphQLObjectType({
  name: 'EMTokenType',
  fields: () => ({
    symbol: {type: GraphQLString},
    contract: {type: GraphQLString},
    currency: {type: GraphQLString},
    supply: {type: SupplyType},
    last: {type: GraphQLString},
    change: {type: GraphQLString},
    amount: {type: GraphQLString},
    volume: {type: GraphQLString},
    exchanges: {type: new GraphQLList(ExchangeType)}
  })
});

const EOSMarketcapType = new GraphQLObjectType({
  name: 'EOSMarketcapType',
  fields: () => ({
    data: {type: new GraphQLList(EMTokenType)}
  })
});

module.exports = {EOSMarketcapType, EMTokenType};
