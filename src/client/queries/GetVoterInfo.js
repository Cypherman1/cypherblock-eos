import gql from 'graphql-tag';

export default gql`
  query get_voter_info($account_name: String!) {
    voteinfo(account_name: $account_name) {
      owner
      proxy
      producers
      staked
      last_vote_weight
      proxied_vote_weight
      is_proxy
      proxy_vote_info {
        owner
        proxy
        producers
        staked
        last_vote_weight
        proxied_vote_weight
        is_proxy
      }
    }
  }
`;
