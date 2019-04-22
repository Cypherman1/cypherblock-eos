const graphql = require('graphql');
const {GraphQLObjectType, GraphQLList, GraphQLString, GraphQLBoolean} = graphql;

const RowType = new GraphQLObjectType({
  name: 'RowType',
  fields: () => ({
    max_block_net_usage: {type: GraphQLString},
    target_block_net_usage_pct: {type: GraphQLString},
    max_transaction_net_usage: {type: GraphQLString},
    base_per_transaction_net_usage: {type: GraphQLString},
    net_usage_leeway: {type: GraphQLString},
    context_free_discount_net_usage_num: {type: GraphQLString},
    context_free_discount_net_usage_den: {type: GraphQLString},
    max_block_cpu_usage: {type: GraphQLString},
    target_block_cpu_usage_pct: {type: GraphQLString},
    max_transaction_cpu_usage: {type: GraphQLString},
    min_transaction_cpu_usage: {type: GraphQLString},
    max_transaction_lifetime: {type: GraphQLString},
    deferred_trx_expiration_window: {type: GraphQLString},
    max_transaction_delay: {type: GraphQLString},
    max_inline_action_size: {type: GraphQLString},
    max_inline_action_depth: {type: GraphQLString},
    max_authority_depth: {type: GraphQLString},
    max_ram_size: {type: GraphQLString},
    total_ram_bytes_reserved: {type: GraphQLString},
    total_ram_stake: {type: GraphQLString},
    last_producer_schedule_update: {type: GraphQLString},
    last_pervote_bucket_fill: {type: GraphQLString},
    pervote_bucket: {type: GraphQLString},
    perblock_bucket: {type: GraphQLString},
    total_unpaid_blocks: {type: GraphQLString},
    total_activated_stake: {type: GraphQLString},
    thresh_activated_stake_time: {type: GraphQLString},
    last_producer_schedule_size: {type: GraphQLString},
    total_producer_vote_weight: {type: GraphQLString},
    last_name_close: {type: GraphQLString}
  })
});

const GlobalDataType = new GraphQLObjectType({
  name: 'GlobalDataType',
  fields: () => ({
    rows: {type: new GraphQLList(RowType)},
    more: {type: GraphQLBoolean}
  })
});

module.exports = GlobalDataType;
