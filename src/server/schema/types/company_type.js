const graphql = require('graphql');
const {GraphQLObjectType, GraphQLString} = graphql;

const {EMTokenType} = require('./eosmarketcap_type.js');

const CompanyInfoType = new GraphQLObjectType({
  name: 'CompanyInfoType',
  fields: () => ({
    website: {type: GraphQLString},
    intro: {type: GraphQLString}
  })
});

const CompanyType = new GraphQLObjectType({
  name: 'CompanyType',
  fields: () => ({
    marketcap: {type: EMTokenType},
    company_info: {type: CompanyInfoType}
  })
});

module.exports = CompanyType;
