const graphql = require('graphql');
const {GraphQLObjectType, GraphQLList, GraphQLString, GraphQLBoolean} = graphql;

const ValueType = new GraphQLObjectType({
  name: 'ValueType',
  fields: () => ({
    balance: {type: GraphQLString},
    weight: {type: GraphQLString}
  })
});

const TableRowType = new GraphQLObjectType({
  name: 'TableRowType',
  fields: () => ({
    supply: {type: GraphQLString},
    base: {type: ValueType},
    quote: {type: ValueType}
  })
});

const TableRowsType = new GraphQLObjectType({
  name: 'TableRowsType',
  fields: () => ({
    rows: {type: new GraphQLList(TableRowType)},
    more: {type: GraphQLBoolean}
  })
});

module.exports = TableRowsType;
