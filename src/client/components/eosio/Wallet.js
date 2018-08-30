import React, {Component} from 'react';
import {CSSTransitionGroup} from 'react-transition-group';
import {Query} from 'react-apollo';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Tokens} from '../utils/Tokens';
import {renderPPColor} from '../utils/RenderColors';
import GetWalletInfo from '../../queries/GetWalletInfo';
const images = require.context('../../assets/imgs/symbols');
import {renderEOSNum} from '../utils/RenderColors';

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
      let img_src = images(`./${token.logo}`);
      if (token.name == 'EOS') {
        items.push(
          <div className="row row-sm stats-container border-bottom m-0" key={token.name}>
            <div className="col-8 stat-col p-0">
              <div className="stat-icon">
                <img src={img_src} className="img-logo" />
              </div>
              <div className="stat">
                <div className="value">{renderEOSNum(token.ammount)}</div>

                <div className="name">{token.name}</div>
              </div>
            </div>
            {this.renderBitfinexPrice(token)}
          </div>
        );
      } else
        items.push(
          <div className="row row-sm stats-container border-bottom m-0" key={token.name}>
            <div className="col-8 stat-col p-0">
              <div className="stat-icon">
                <img src={img_src} className="img-logo" />
              </div>
              <div className="stat">
                <div className="value">{renderEOSNum(token.ammount)}</div>

                <div className="name">
                  {token.name} ({Number((token.ammount * token.price).toFixed(4)).toLocaleString('en')} EOS)
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
        <div className="col-4 p-0">
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
              <section className="section container">
                <div className="text-center">
                  <FontAwesomeIcon icon="spinner" spin className="text-info" />
                </div>
              </section>
              //   );
            );
          if (error)
            return (
              <section className="section container">
                <div className="text-center">
                  <FontAwesomeIcon icon="spinner" spin className="text-info" />
                </div>
              </section>
            );
          const {bitfinex_pairs} = data;
          if (data && bitfinex_pairs) {
            this.setAllTokens(data, bitfinex_pairs);
            return (
              <div className="col col-12 col-sm-12 col-md-12 col-l-7 col-xl-4 history-col pd-col">
                <div className="card sameheight-item stats" data-exclude="xs">
                  <div className="card-header card-header-sm bg-light shadow-sm">
                    <div className="header-block pl-2">
                      <FontAwesomeIcon icon="wallet" className="mr-2 text-info" />
                      <h5 className="title text-info ">Wallet</h5>
                    </div>
                  </div>
                  <div className="card-block">
                    <div className="title-block row ">
                      <div className="col-12 col-sm-12 header-col">
                        <div className="row border-bottom price-row">
                          <div className="col float-left price-font pl-2"> Tokens </div>
                          <div className="col text-right price-font pr-1">Price (Token/EOS)</div>
                        </div>
                      </div>
                    </div>
                    <CSSTransitionGroup
                      transitionName="example"
                      transitionEnterTimeout={500}
                      transitionLeaveTimeout={300}
                    >
                      {this.renderTokens()}
                    </CSSTransitionGroup>
                  </div>
                </div>
              </div>
            );
          } else {
            return (
              <section className="section container">
                <div className="text-center">
                  <FontAwesomeIcon icon="spinner" spin className="text-info" />
                </div>
              </section>
            );
          }
        }}
      </Query>
    );
  }
}

export default Wallet;
