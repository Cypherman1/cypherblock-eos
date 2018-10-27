import React, {Component} from 'react';
import {CSSTransitionGroup} from 'react-transition-group';
import {Query} from 'react-apollo';
import ReactImageFallback from 'react-image-fallback';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Tokens} from '../utils/Tokens';
import {gettPairPrice, gettPairPercent} from '../utils/Tools';
import {renderPPColor} from '../utils/RenderColors';
import GetWalletInfo from '../../queries/GetWalletInfo';
import {renderEOSNum} from '../utils/RenderColors';

const images = '../imgs';

let token_logo = null;
let fallback_logo = `${images}/COMMON.png`;
let AllTokens = [];
let total_token_value = 0;
let atoken = null;
let eos_price = 0;
let token_usd_value = 0;
let tokens_count = 0;

const WalletLoading = () => {
  return (
    <div className="col col-12 col-sm-12 col-md-12 col-l-7 col-xl-4 history-col pd-col">
      <div className="card sameheight-item stats" data-exclude="xs">
        <div className="card-header shadow-sm m-0 row m-0 bg-white">
          <div className="pl-2 d-flex ">
            <FontAwesomeIcon icon="wallet" className="mr-1 text-info fa-lg" />
            <div className="text-info title">Tokens</div>
          </div>
        </div>
        <div className="row m-0 pb-1 pt-1 border-left border-right border-light" style={{backgroundColor: '#ddd'}}>
          <div className=" pl-2 col">
            <div className="text-info ftz-8 font-weight-bold">TOTAL VALUE</div>
            <div className="value font-weight-bold ft-tvalue" style={{color: '#ff7d00'}} />
          </div>
          <div className="pr-2 col text-right">
            <div className="ftz-8 text-info font-weight-bold">USD VALUE</div>
            <div className="value font-weight-bold ft-tvalue" style={{color: '#ff7d00'}}>
              {' '}
            </div>
          </div>
        </div>
        <div className="card-block p-0">
          <div className="text-center align-middle overlay " style={{paddingTop: 84}}>
            <FontAwesomeIcon icon="spinner" spin className="text-info fa-2x" />
          </div>
          <div className="title-block row m-0 shadow-sm ">
            <div className="col-12 col-sm-12 header-col p-0  bg-white">
              <div className="row  m-0">
                <div className="col float-left price-font pl-2" />
                <div className="col text-right ftz-10  pr-1">Price (Token/EOS)</div>
              </div>
            </div>
          </div>
          <div className="row row-sm stats-container shadow-sm m-0 pb-1 plheight" />
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
        token != 'bigone_tickers' &&
        token != 'newdex_tickers'
      ) {
        atoken = {
          name: data[token].data[0].split(' ')[1], //token name
          ammount: Number(data[token].data[0].split(' ')[0]), // token ammount
          price: gettPairPrice(
            //get token price
            data,
            Tokens.find((o) => o.currency === data[token].data[0].split(' ')[1]).bitfinex_pair, //get bitfinex pair name of the token
            Tokens.find((o) => o.currency === data[token].data[0].split(' ')[1]).bigone_ticker,
            Tokens.find((o) => o.currency === data[token].data[0].split(' ')[1]).blocksence_ticker,
            Tokens.find((o) => o.currency === data[token].data[0].split(' ')[1]).symbol
          ),
          percent: gettPairPercent(
            //get token percent
            data,
            Tokens.find((o) => o.currency === data[token].data[0].split(' ')[1]).bitfinex_pair,
            Tokens.find((o) => o.currency === data[token].data[0].split(' ')[1]).bigone_ticker,
            Tokens.find((o) => o.currency === data[token].data[0].split(' ')[1]).blocksence_ticker,
            Tokens.find((o) => o.currency === data[token].data[0].split(' ')[1]).symbol
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
      token_logo = `${images}/${token.name}.png`;

      if (token.name == 'EOS') {
        items.push(
          <div className="row row-sm stats-container shadow-sm pb-1  m-0" key={token.name}>
            <div className="col-8 stat-col p-0">
              <div className="stat-icon">
                {/* <img src={img_src} className="img-logo" /> */}
                <div>
                  <ReactImageFallback src={token_logo} fallbackImage={fallback_logo} className="img-logo" />
                </div>
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
            <div className="row row-sm stats-container m-0 shadow-sm pb-1" key={token.name}>
              <div className="col-8 stat-col p-0">
                <div className="stat-icon">
                  {/* <img src={img_src} className="img-logo" /> */}
                  <div>
                    <ReactImageFallback src={token_logo} fallbackImage={fallback_logo} className="img-logo" />
                  </div>
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
            <div className="row row-sm stats-container shadow-sm pb-1 m-0" key={token.name}>
              <div className="col-8 stat-col p-0">
                <div className="stat-icon">
                  {/* <img src={img_src} className="img-logo" /> */}
                  <div>
                    <ReactImageFallback src={token_logo} fallbackImage={fallback_logo} className="img-logo" />
                  </div>
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
  renderWPrice(price) {
    return price ? <div>{price} </div> : <FontAwesomeIcon icon="spinner" spin className="text-info" />;
  }
  renderBitfinexPrice(token) {
    if (token.price > 0) {
      return (
        <div className="col-4 p-0">
          <div className="stat float-right">
            <div className="value text-right w-100">{this.renderWPrice(token.price)}</div>
            <div className="name">{renderPPColor((token.percent * 100).toFixed(2))}</div>
          </div>
        </div>
      );
    } else return null;
  }
  // get the token pirce

  render() {
    total_token_value = 0;
    return (
      <Query
        query={GetWalletInfo}
        variables={{
          account_name: this.props.account_name
        }}
        pollInterval={5000}
      >
        {({loading, error, data}) => {
          if (loading) return <WalletLoading />;
          if (error) return <WalletLoading />;

          if (data && data.cmc) {
            this.setAllTokens(data);
            total_token_value = 0;
            eos_price = Number(data.cmc.data.quotes.USD.price);
            AllTokens.map((token) => {
              total_token_value += token.ammount * token.price;
            });
            token_usd_value = total_token_value * eos_price;
            return (
              <div className="col col-12 col-sm-12 col-md-12 col-l-7 col-xl-4 history-col pd-col">
                <div className="card sameheight-item stats" data-exclude="xs">
                  <div className="card-header shadow-sm m-0 row m-0 bg-white">
                    <div className="pl-2 d-flex ">
                      <FontAwesomeIcon icon="wallet" className="mr-1 text-info fa-lg" />
                      <div className="text-info title">
                        Tokens
                        <span className="badge badge-primary ml-1 pr-1 pl-1 font-weight-bold">{AllTokens.length}</span>
                      </div>
                    </div>
                  </div>
                  <div className="row m-0 pb-1 pt-1 border-left border-right border-light shadow-sm">
                    <div className=" pl-2 col">
                      <div className="text-info ftz-8 font-weight-bold">TOTAL VALUE</div>
                      <div className="value font-weight-bold ft-tvalue" style={{color: '#fc4a1a'}}>
                        {total_token_value.toLocaleString()} EOS
                      </div>
                    </div>
                    <div className="pr-2 col text-right">
                      <div className="ftz-8 text-info font-weight-bold">USD VALUE</div>
                      <div className="value font-weight-bold ft-tvalue" style={{color: '#fc4a1a'}}>
                        {token_usd_value.toLocaleString(undefined, {maximumFractionDigits: 0})} USD{' '}
                      </div>
                    </div>
                  </div>
                  <div className="card-block p-0">
                    <div className="title-block row m-0 shadow-sm ">
                      <div className="col-12 col-sm-12 header-col p-0  bg-white">
                        <div className="row  m-0">
                          <div className="col float-left price-font pl-2" />
                          <div className="col text-right ftz-10  pr-1">Price (Token/EOS)</div>
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
