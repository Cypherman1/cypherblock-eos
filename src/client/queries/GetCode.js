import gql from 'graphql-tag';

export default gql`
  query get_code($account_name: String!) {
    code(account_name: $account_name) {
      wast
      abi
    }
  }
`;
