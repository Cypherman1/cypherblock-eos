const graphql = require('graphql');
const {GraphQLObjectType, GraphQLString} = graphql;

const USDType = new GraphQLObjectType({
  name: 'USDType',
  fields: () => ({
    price: {type: GraphQLString},
    volume_24h: {type: GraphQLString},
    market_cap: {type: GraphQLString},
    percent_change_1h: {type: GraphQLString},
    percent_change_24h: {type: GraphQLString},
    percent_change_7d: {type: GraphQLString}
  })
});

const QuotesType = new GraphQLObjectType({
  name: 'QuotesType',
  fields: () => ({
    USD: {type: USDType}
  })
});

const DataType = new GraphQLObjectType({
  name: 'DataType',
  fields: () => ({
    id: {type: GraphQLString},
    name: {type: GraphQLString},
    symbol: {type: GraphQLString},
    // website_slug: {type: GraphQLString},
    // rank: {type: GraphQLString},
    // circulating_supply: {type: GraphQLString},
    // total_supply: {type: GraphQLString},
    // max_supply: {type: GraphQLString},
    quote: {type: QuotesType}
    // last_updated: {type: GraphQLString}
  })
});

// const MetaDataType = new GraphQLObjectType({
//   name: 'MetaDataType',
//   fields: () => ({
//     timestamp: {type: GraphQLString},
//     error: {type: GraphQLString}
//   })
// });

const CMCType = new GraphQLObjectType({
  name: 'CMCType',
  fields: () => ({
    EOS: {type: DataType}
  })
});

module.exports = CMCType;
