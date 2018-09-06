import gql from 'graphql-tag';

export default gql`
  query get_producers($limit: String, $lower_bound: String) {
    producers(limit: $limit, json: true, lower_bound: $lower_bound) {
      rows {
        owner
        total_votes
        url
      }
      more
      total_producer_vote_weight
    }
  }
`;
