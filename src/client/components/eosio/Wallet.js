import React, {Component} from 'react';
import GetCurrencies from '../../queries/GetCurrencies';
import {Tokens} from '../utils/Tokens';

import {renderPPColor} from '../utils/RenderColors';
import GetWalletInfo from '../../queries/GetWalletInfo';
import ErrorPage from '../ErrorPage';
import {Query} from 'react-apollo';
const images = require.context('../../assets/imgs/symbols');

let AllTokens = [];

class Wallet extends Component {
  setAllTokens(data, bitfinex_pairs) {
    AllTokens = [];
    for (var token in data) {
      if (
        data[token] &&
        data[token].data &&
        data[token].data.length > 0 &&
        token != 'bitfinex_pairs' &&
        token != 'account' &&
        token != 'eosioram' &&
        token != 'eosioramfee' &&
        token != 'cmc' &&
        token != 'global_data' &&
        token != 'table_rows'
      ) {
        let atoken = {
          name: data[token].data[0].split(' ')[1],
          ammount: Number(data[token].data[0].split(' ')[0]),
          logo: Tokens.find((o) => o.symbol === data[token].data[0].split(' ')[1]).logo,
          price: this.gettPairPrice(
            bitfinex_pairs,
            Tokens.find((o) => o.symbol === data[token].data[0].split(' ')[1]).bitfinex_pair
          ),
          percent: this.gettPairPercent(
            bitfinex_pairs,
            Tokens.find((o) => o.symbol === data[token].data[0].split(' ')[1]).bitfinex_pair
          )
        };
        AllTokens.push(atoken);
      }
    }
  }
  renderTokens() {
    let items = [];
    AllTokens.map((token) => {
      // let img_src = images(`./${token.logo}`);
      items.push(
        <div className="row row-sm stats-container border-bottom " key={token.name}>
          <div className="col stat-col pl-0">
            <div className="stat-icon">{/* <img src={img_src} className="img-logo" /> */}</div>
            <div className="stat pl-1">
              <div className="value">
                {token.ammount.toLocaleString('en', {
                  maximumSignificantDigits: 17
                })}
              </div>
              <div className="name">
                {token.name} ({(token.ammount * token.price).toFixed(4)} EOS)
              </div>
            </div>
          </div>
          {this.renderBitfinexPrice(token)}
        </div>
      );
    });
    return items;
  }
  renderBitfinexPrice(token) {
    if (token.price > 0) {
      return (
        <div className="col pt-1">
          <div className="stat-icon" />
          <div className="stat float-right">
            <div className="value text-right">{token.price}</div>
            <div className="name float-right">{renderPPColor((token.percent * 100).toFixed(2))}</div>
          </div>
        </div>
      );
    }
  }

  gettPairPrice(bitfinex_pairs, tpair) {
    let tPrice = 0;
    bitfinex_pairs.data.map((pair) => {
      if (pair[0] == tpair) {
        tPrice = Number(pair[7]);
      }
    });

    return tPrice;
  }
  gettPairPercent(bitfinex_pairs, tpair) {
    let tPercent = 0;
    bitfinex_pairs.data.map((pair) => {
      if (pair[0] == tpair) {
        tPercent = Number(pair[6]);
      }
    });
    return tPercent;
  }

  render() {
    return (
      <Query
        query={GetWalletInfo}
        variables={{
          account_name: this.props.account_name
        }}
        pollInterval={10000}
      >
        {({loading, error, data}) => {
          if (loading)
            return (
              <section className="section">
                <div className="text-center">
                  <i className="fa fa-spinner fa-spin fa-1x text-info" />
                </div>
              </section>
              //   );
            );
          if (error) return <ErrorPage error={error} />;
          const {bitfinex_pairs} = data;

          this.setAllTokens(data, bitfinex_pairs);
          return (
            <div className="col col-12 col-sm-12 col-md-12 col-l-7 col-xl-4 history-col pd-col">
              <div className="card sameheight-item stats" data-exclude="xs">
                <div className="card-block">
                  <div className="title-block row ">
                    <div className="col-12 col-sm-12 header-col">
                      <div className="wl-pb border-bottom header-border ">
                        <div className="stat-icon">
                          <i className="fa fa-wallet" />
                        </div>
                        <div className="stat">
                          <div className="value text-info" />
                          <div className="name acc-name-font" />
                        </div>
                      </div>

                      <div className="row border-bottom price-row">
                        <div className="col float-left price-font pl-2"> Tokens </div>
                        <div className="col text-right price-font pr-1">Price (Token/EOS)</div>
                      </div>
                    </div>
                  </div>

                  {this.renderTokens()}
                </div>
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default Wallet;
