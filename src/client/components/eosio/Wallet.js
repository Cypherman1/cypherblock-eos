import React, {Component} from 'react';
import {CSSTransitionGroup} from 'react-transition-group';
import {Query} from 'react-apollo';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Tokens} from '../utils/Tokens';
import {renderPPColor} from '../utils/RenderColors';
import GetWalletInfo from '../../queries/GetWalletInfo';
import {renderEOSNum} from '../utils/RenderColors';
const images = require.context('../../assets/imgs/symbols');

let AllTokens = [];

const WalletLoading = () => {
  return (
    <div className="col col-12 col-sm-12 col-md-12 col-l-7 col-xl-4 history-col pd-col">
      <div className="card sameheight-item stats" data-exclude="xs">
        <div className="card-header shadow-sm bg-white">
          <div className="header-block pl-2">
            <FontAwesomeIcon icon="wallet" className="mr-2 text-info fa-lg" />
            <h5 className="title text-info ">Wallet</h5>
          </div>
        </div>
        <div className="card-block">
          <div className="text-center align-middle overlay pd-mi">
            <FontAwesomeIcon icon="spinner" spin className="text-info fa-2x" />
          </div>
          <div className="title-block row ">
            <div className="col-12 col-sm-12 header-col">
              <div className="row border-bottom price-row">
                <div className="col float-left price-font pl-2"> Tokens </div>
                <div className="col text-right price-font pr-1">Price (Token/EOS)</div>
              </div>
            </div>
          </div>

          <div className="row row-sm stats-container border-bottom m-0 pb-1 plheight" />
        </div>
      </div>
    </div>
  );
};

class Wallet extends Component {
  // Create AllTokens array containing all Token infomation: Token_name, balance, price, percent,...
  setAllTokens(data) {
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
        token != 'table_rows' &&
        token != 'blocksence_tickers' &&
        token != 'bigone_tickers'
      ) {
        let atoken = {
          name: data[token].data[0].split(' ')[1], //token name
          ammount: Number(data[token].data[0].split(' ')[0]), // token ammount
          logo: Tokens.find((o) => o.symbol === data[token].data[0].split(' ')[1]).logo, //token logo
          price: this.gettPairPrice(
            //get token price
            data,
            Tokens.find((o) => o.symbol === data[token].data[0].split(' ')[1]).bitfinex_pair, //get bitfinex pair name of the token
            Tokens.find((o) => o.symbol === data[token].data[0].split(' ')[1]).bigone_ticker,
            Tokens.find((o) => o.symbol === data[token].data[0].split(' ')[1]).blocksence_ticker
          ),
          percent: this.gettPairPercent(
            //get token percent
            data,
            Tokens.find((o) => o.symbol === data[token].data[0].split(' ')[1]).bitfinex_pair,
            Tokens.find((o) => o.symbol === data[token].data[0].split(' ')[1]).bigone_ticker,
            Tokens.find((o) => o.symbol === data[token].data[0].split(' ')[1]).blocksence_ticker
          )
        };
        //console.log(Tokens.find((o) => o.symbol === data[token].data[0].split(' ')[1]).bigone_tiker);
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
      } else {
        if (token.price > 0) {
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
        } else {
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
            </div>
          );
        }
      }
    });
    return items;
  }
  renderBitfinexPrice(token) {
    if (token.price > 0) {
      return (
        <div className="col-4 p-0">
          <div className="stat float-right">
            <div className="value text-right w-100 font-weight-normal">{token.price}</div>
            <div className="name">{renderPPColor((token.percent * 100).toFixed(2))}</div>
          </div>
        </div>
      );
    }
  }
  // get the token pirce
  gettPairPrice(data, bitfinex_pair, bigone_ticker, blocksence_ticker) {
    let tPrice = 0;
    if (data.bitfinex_pairs && bitfinex_pair)
      data.bitfinex_pairs.data.map((pair) => {
        if (pair[0] == bitfinex_pair) {
          tPrice = Number(pair[7]);
        }
      });

    // console.log(bigone_tiker);
    if (data.bigone_tickers && bigone_ticker)
      data.bigone_tickers.data.map((ticker) => {
        if (ticker.market_id == bigone_ticker) {
          tPrice = Number(ticker.close);
        }
      });
    return tPrice;
  }
  //get the token price percent change
  gettPairPercent(data, bitfinex_pair, bigone_ticker, blocksence_ticker) {
    let tPercent = 0;
    if (data.bitfinex_pairs)
      data.bitfinex_pairs.data.map((pair) => {
        if (pair[0] == bitfinex_pair) {
          tPercent = Number(pair[6]);
        }
      });

    if (data.bigone_tickers && bigone_ticker)
      data.bigone_tickers.data.map((ticker) => {
        if (ticker.market_id == bigone_ticker) {
          tPercent = Number(ticker.daily_change_perc) / 100;
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
        pollInterval={60000}
      >
        {({loading, error, data}) => {
          if (loading) return <WalletLoading />;
          if (error) return <WalletLoading />;
          const {bitfinex_pairs} = data;

          if (data) {
            this.setAllTokens(data);
            return (
              <div className="col col-12 col-sm-12 col-md-12 col-l-7 col-xl-4 history-col pd-col">
                <div className="card sameheight-item stats" data-exclude="xs">
                  <div className="card-header  shadow-sm bg-white">
                    <div className="header-block pl-2">
                      <FontAwesomeIcon icon="wallet" className="mr-2 text-info fa-lg" />
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
