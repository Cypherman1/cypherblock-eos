const graphql = require('graphql');
const {GraphQLObjectType, GraphQLString, GraphQLList} = graphql;

const {CompanyInfoType} = require('./company_type.js');

const CompaniesType = new GraphQLObjectType({
  name: 'CompaniesType',
  fields: () => ({
    data: {type: new GraphQLList(CompanyInfoType)}
  })
});

module.exports = CompaniesType;
