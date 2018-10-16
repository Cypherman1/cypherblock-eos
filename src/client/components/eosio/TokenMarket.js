import React, {Component} from 'react';
import {Query} from 'react-apollo';
import {Tokens} from '../utils/Tokens';
import GetTokenMarket from '../../queries/GetTokenMarket';

let TokenMarket = []; //tokens market info array
let atoken = null;

class TokenMarket extends Component {
  updateTokenMarket(data) {
    //update tokens market info
    TokenMarket = [];
    Tokens.map((token) => {
      atoken = {
        name: token.symbol,
        logo: token.logo,
        price: this.
      };
    });
  }
  render() {
    return (
      <Query query={GetTokenMarket} pollInterval={60000}>
        {({loading, error, data}) => {
          if (loading) return <div />;
          if (error) return <div />;
        }}
      </Query>
    );
  }
}

export default TokenMarket;
