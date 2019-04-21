const graphql = require('graphql');
const {GraphQLObjectType, GraphQLString} = graphql;

const {EMTokenType} = require('./eosmarketcap_type.js');

const CompanyInfoType = new GraphQLObjectType({
  name: 'CompanyInfoType',
  fields: () => ({
    symbol: {type: GraphQLString},
    website: {type: GraphQLString},
    name: {type: GraphQLString},
    intro: {type: GraphQLString}
  })
});

const CompanyType = new GraphQLObjectType({
  name: 'CompanyType',
  fields: () => ({
    rank: {type: GraphQLString},
    marketcap: {type: EMTokenType},
    company_info: {type: CompanyInfoType}
  })
});

module.exports = {CompanyType, CompanyInfoType};
