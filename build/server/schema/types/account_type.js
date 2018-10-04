const GraphQLJSON = require('graphql-type-json');
const graphql = require('graphql');
const {GraphQLObjectType, GraphQLList, GraphQLInt, GraphQLString, GraphQLBoolean} = graphql;

//const Lyric = mongoose.model('lyric');
const ResLimitType = new GraphQLObjectType({
  name: 'ResLimitType',
  fields: () => ({
    used: {type: GraphQLString},
    available: {type: GraphQLString},
    max: {type: GraphQLString}
  })
});

const KeyType = new GraphQLObjectType({
  name: 'KeyType',
  fields: () => ({
    key: {type: GraphQLString},
    weight: {type: GraphQLInt}
  })
});

const RequireAuthType = new GraphQLObjectType({
  name: 'RequireAuthType',
  fields: () => ({
    threshold: {type: GraphQLString},
    keys: {type: new GraphQLList(KeyType)},
    accounts: {type: new GraphQLList(GraphQLString)},
    waits: {type: new GraphQLList(GraphQLString)}
  })
});

const PermissionType = new GraphQLObjectType({
  name: 'PermissionType',
  fields: () => ({
    perm_name: {type: GraphQLString},
    parent: {type: GraphQLString},
    required_auth: {type: RequireAuthType}
  })
});

const TotalResourcesType = new GraphQLObjectType({
  name: 'TotalResourcesType',
  fields: () => ({
    owner: {type: GraphQLString},
    net_weight: {type: GraphQLString},
    cpu_weight: {type: GraphQLString},
    ram_bytes: {type: GraphQLString}
  })
});

const SelfDelegatedBandwidthType = new GraphQLObjectType({
  name: 'SelfDelegatedBandwidthType',
  fields: () => ({
    from: {type: GraphQLString},
    to: {type: GraphQLString},
    net_weight: {type: GraphQLString},
    cpu_weight: {type: GraphQLString}
  })
});

const VoterInfoType = new GraphQLObjectType({
  name: 'VoterInfoType',
  fields: () => ({
    owner: {type: GraphQLString},
    proxy: {type: GraphQLString},
    producers: {type: new GraphQLList(GraphQLString)},
    staked: {type: GraphQLString},
    last_vote_weight: {type: GraphQLString},
    proxied_vote_weight: {type: GraphQLString},
    is_proxy: {type: GraphQLInt}
  })
});

const RefundRequestType = new GraphQLObjectType({
  name: 'RefundRequestType',
  fields: () => ({
    owner: {type: GraphQLString},
    request_time: {type: GraphQLString},
    net_amount: {type: GraphQLString},
    cpu_amount: {type: GraphQLString}
  })
});

const AccountType = new GraphQLObjectType({
  name: 'AccountType',
  fields: () => ({
    account_name: {type: GraphQLString},
    head_block_num: {type: GraphQLString},
    head_block_time: {type: GraphQLString},
    privileged: {type: GraphQLBoolean},
    last_code_update: {type: GraphQLString},
    created: {type: GraphQLString},
    core_liquid_balance: {type: GraphQLString},
    ram_quota: {type: GraphQLString},
    net_weight: {type: GraphQLString},
    cpu_weight: {type: GraphQLString},
    net_limit: {type: ResLimitType},
    cpu_limit: {type: ResLimitType},
    ram_usage: {type: GraphQLString},
    permissions: {type: GraphQLJSON},
    total_resources: {type: TotalResourcesType},
    self_delegated_bandwidth: {type: SelfDelegatedBandwidthType},
    refund_request: {type: RefundRequestType},
    voter_info: {type: VoterInfoType}
  })
});

module.exports = AccountType;
