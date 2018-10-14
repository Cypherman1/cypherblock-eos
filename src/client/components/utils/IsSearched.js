export const IsSearched = (action_trace, memoTags) => {
  if (memoTags.length == 0) return true;

  for (var i = 0; i < memoTags.length; i++) {
    if (action_trace.act.data && action_trace.act.data.memo && typeof action_trace.act.data.memo == 'string') {
      if (action_trace.act.data.memo.includes(memoTags[i])) return true;
    }
    if (
      action_trace.receipt.receiver.includes(memoTags[i]) ||
      action_trace.act.account.includes(memoTags[i]) ||
      action_trace.act.name.includes(memoTags[i])
    )
      return true;
  }

  return false;
};
