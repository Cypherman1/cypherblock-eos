export const IsFiltered = (
  action_trace,
  isFilterOthers,
  isFilterSmartContract,
  isFilterResources,
  isFilterSendReceiveTokens,
  isFilterSendReceiveEOS
) => {
  if (action_trace.act) {
    switch (action_trace.act.name) {
      case 'transfer':
        switch (action_trace.act.account) {
          case 'eosio.token': // transfer EOS
            return isFilterSendReceiveEOS;
          default:
            // transfer token
            return isFilterSendReceiveTokens;
        }
      case 'delegatebw':
        return isFilterResources;
      case 'undelegatebw':
        return isFilterResources;
      case 'buyram':
        return isFilterResources;
      case 'buyrambytes':
        return isFilterResources;
      case 'sellram':
        return isFilterResources;
      case 'newaccount':
        return isFilterResources;
      case 'voteproducer':
        return isFilterSmartContract;
      case 'updateauth':
        return isFilterResources;
      case 'bidname':
        return isFilterResources;
      case 'setabi':
        return isFilterResources;
      case 'setcode':
        return isFilterResources;
      case 'refund':
        return isFilterResources;
      case 'claimrewards':
        return isFilterSmartContract;
      case 'canceldelay':
        return isFilterOthers;
      default:
        return isFilterOthers;
    }
  }
  return false;
};
