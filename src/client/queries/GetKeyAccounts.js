import gql from 'graphql-tag';

export default gql`
  query get_key_accounts($public_key: String!) {
    key_accounts(public_key: $public_key) {
      account_names
    }
  }
`;
