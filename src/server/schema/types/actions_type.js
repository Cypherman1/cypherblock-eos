const GraphQLJSON = require('graphql-type-json');

const graphql = require('graphql');

const {GraphQLObjectType, GraphQLList, GraphQLInt, GraphQLString} = graphql;

const ReceiptType = new GraphQLObjectType({
  name: 'ReceiptType',
  fields: () => ({
    receiver: {type: GraphQLString},
    act_digest: {type: GraphQLString},
    global_sequence: {type: GraphQLString},
    recv_sequence: {type: GraphQLString},
    auth_sequence: {type: new GraphQLList(GraphQLList(GraphQLString))},
    code_sequence: {type: GraphQLString},
    abi_sequence: {type: GraphQLString}
  })
});

const AuthorizationType = new GraphQLObjectType({
  name: 'AuthorizationType',
  fields: () => ({
    actor: {type: GraphQLString},
    permission: {type: GraphQLString}
  })
});
const DataType = new GraphQLObjectType({
  name: 'DataType',
  fields: () => ({
    from: {type: GraphQLString},
    to: {type: GraphQLString},
    quantity: {type: GraphQLString},
    memo: {type: GraphQLString},
    payer: {type: GraphQLString},
    receiver: {type: GraphQLString},
    quant: {type: GraphQLString}
  })
});

const ActType = new GraphQLObjectType({
  name: 'ActType',
  fields: () => ({
    account: {type: GraphQLString},
    name: {type: GraphQLString},
    authorization: {type: new GraphQLList(AuthorizationType)},
    data: {type: GraphQLJSON},
    hex_data: {type: GraphQLString}
  })
});

const ActionTraceType = new GraphQLObjectType({
  name: 'ActionTraceType',
  fields: () => ({
    receipt: {type: ReceiptType},
    act: {type: ActType},
    elapsed: {type: GraphQLInt},
    cpu_usage: {type: GraphQLInt},
    console: {type: GraphQLString},
    total_cpu_usage: {type: GraphQLInt},
    trx_id: {type: GraphQLString},
    inline_traces: {type: new GraphQLList(ActionTraceType)}
  })
});

const ActionType = new GraphQLObjectType({
  name: 'ActionType',
  fields: () => ({
    global_action_seq: {type: GraphQLString},
    account_action_seq: {type: GraphQLString},
    block_num: {type: GraphQLString},
    block_time: {type: GraphQLString},
    action_trace: {type: ActionTraceType}
  })
});

const ActionsType = new GraphQLObjectType({
  name: 'ActionsType',
  fields: () => ({
    actions: {type: new GraphQLList(ActionType)},
    last_irreversible_block: {type: GraphQLString}
  })
});

module.exports = {ActionsType, ActionTraceType, ReceiptType, ActType};
