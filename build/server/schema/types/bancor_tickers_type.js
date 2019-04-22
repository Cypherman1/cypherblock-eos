const graphql = require('graphql');
const {GraphQLObjectType, GraphQLString, GraphQLList} = graphql;

const BancorTickerType = new GraphQLObjectType({
  name: 'BancorTickerType',
  fields: () => ({
    converter_account: {type: GraphQLString},
    from_token_code: {type: GraphQLString},
    from_token_account: {type: GraphQLString},
    to_token_code: {type: GraphQLString},
    to_token_account: {type: GraphQLString},
    volume24: {type: GraphQLString},
    token_value: {type: GraphQLString},
    display_currency: {type: GraphQLString}
  })
});

const BancorTickersType = new GraphQLObjectType({
  name: 'BigOneTickersType',
  fields: () => ({
    rows: {type: GraphQLList(BancorTickerType)}
  })
});

module.exports = BancorTickersType;
