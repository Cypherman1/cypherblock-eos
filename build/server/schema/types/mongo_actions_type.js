const graphql = require('graphql');

const {GraphQLObjectType, GraphQLList, GraphQLInt, GraphQLString} = graphql;

const {ReceiptType, ActType} = require('./actions_type');

const MongoActionType = new GraphQLObjectType({
  name: 'MongoActionType',
  fields: () => ({
    receipt: {type: ReceiptType},
    act: {type: ActType},
    context_free: {type: GraphQLString},
    elapsed: {type: GraphQLInt},
    console: {type: GraphQLString},
    trx_id: {type: GraphQLString},
    block_num: {type: GraphQLString},
    block_time: {type: GraphQLString},
    producer_block_id: {type: GraphQLString},
    account_ram_deltas: {type: new GraphQLList(GraphQLString)},
    except: {type: GraphQLString},
    trx_status: {type: GraphQLString},
    createdAt: {type: GraphQLString}
  })
});

const MongoActionsType = new GraphQLObjectType({
  name: 'MongoActionsType',
  fields: () => ({
    actions: {
      type: new GraphQLList(MongoActionType)
    }
  })
});

module.exports = {MongoActionsType, MongoActionType};
