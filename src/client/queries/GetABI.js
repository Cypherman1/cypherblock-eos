import gql from 'graphql-tag';

export default gql`
  query get_abi($account_name: String!) {
    abi(account_name: $account_name) {
      abi
    }
  }
`;
