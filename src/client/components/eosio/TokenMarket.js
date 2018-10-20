import React, {Component} from 'react';
import {Query} from 'react-apollo';
import {connect} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Tokens} from '../utils/Tokens';
import GetTokenMarket from '../../queries/GetTokenMarket';
import {gettPairPrice, gettPairPercent} from '../utils/Tools';
import {renderPPColor} from '../utils/RenderColors';
const images = require.context('../../assets/imgs/symbols');
import {setSearchSymbol} from '../../actions/common';
import {IsTokenSearched} from '../utils/isTokenSearched';

let TokenMarketInfo = []; //tokens market info array
let atoken = null;
let items = [];
let token_logo = null;
let ram_price = 0;
let eos_price = 0;
let eos_percent_change_24h = 0;

const TokenMarketLoading = () => {
  return (
    <div className="card-block p-0 market-scroll">
      <div className="text-center align-middle overlay pd-mi">
        <FontAwesomeIcon icon="spinner" spin className="text-info fa-2x" />
      </div>
    </div>
  );
};

class TokenMarket extends Component {
  updateTokenMarket(data) {
    //update tokens market info
    TokenMarketInfo = [];
    Tokens.map((token) => {
      atoken = {
        name: token.symbol,
        logo: token.logo,
        price: gettPairPrice(
          data,
          token.bitfinex_pair,
          token.bigone_ticker,
          token.blocksence_ticker,
          token.newdex_pair
        ),
        percent: gettPairPercent(
          data,
          token.bitfinex_pair,
          token.bigone_ticker,
          token.blocksence_ticker,
          token.newdex_pair
        )
      };
      TokenMarketInfo.push(atoken);
    });
  }
  render() {
    return (
      <div className={`card sameheight-item stats mb-1 ${this.props.display} pb-2`} data-exclude="xs">
        <div className="card-header shadow-sm bg-white row m-0">
          <div className="header-block pl-2 col">
            <FontAwesomeIcon icon="chart-bar" className="mr-2 text-info fa-lg" />
            <h5 className="title text-info">Market info</h5>
          </div>
          <div>
            <div className="input-group input-group-seamless mb-0 pr-1 float-right" style={{width: 100, height: 30}}>
              <input
                type="text"
                className="form-control border-info"
                aria-label="Text input with checkbox"
                onChange={(event) => {
                  this.props.setSearchSymbol(event.target.value);
                }}
              />
              <div className="input-group-append">
                <div className="input-group-text">
                  <i className="fa fa-search" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row ftz-10 pb-1 pt-1 m-0 token_price_weight shadow-sm" key={1}>
          <div className="pl-2 col-5 text-info"> Pair </div>
          <div className="col-4 text-right pr-4 text-info"> Price </div>
          <div className="col-3 text-right text-info"> 24h % </div>
        </div>

        <div className="card-block bg-light p-0 market-scroll">
          <Query query={GetTokenMarket} pollInterval={5000}>
            {({loading, error, data}) => {
              if (loading) return <TokenMarketLoading />;
              if (error) return <TokenMarketLoading />;
              if (data && data.table_rows && data.cmc) {
                const {table_rows, cmc} = data;

                ram_price =
                  (
                    Number(table_rows.rows[0].quote.balance.split(' ')[0]) /
                    Number(table_rows.rows[0].base.balance.split(' ')[0])
                  ).toFixed(4) * 1024;

                eos_price = Number(cmc.data.quotes.USD.price).toFixed(2);
                eos_percent_change_24h = cmc.data.quotes.USD.percent_change_24h;

                this.updateTokenMarket(data);

                items = [];

                items.push(
                  <div className="card-token-price shadow-sm  p-1" key={2} style={{marginBottom: 1, marginTop: 1}}>
                    <div className="row ftz-10 token_price_weight m-0">
                      <div className="col-5 pl-1 pr-0 d-flex flex-row">
                        <img src={images(`./RAM.svg`)} className="token_logo" />
                        <div className="ml-2 d-flex align-items-center">
                          <div> RAM(EOS/KB) </div>
                        </div>
                      </div>
                      <div className="col-4 text-right d-flex align-items-center flex-row-reverse">
                        <div>{ram_price} </div>
                      </div>
                      <div className="col-3 text-right"> </div>
                    </div>
                  </div>
                );
                items.push(
                  <div className="card-token-price shadow-sm p-1" key={3} style={{marginBottom: 1}}>
                    <div className="row ftz-10 token_price_weight m-0">
                      <div className="col-5 pl-1 pr-0 d-flex flex-row">
                        <img src={images(`./eoslogo.svg`)} className="token_logo" />
                        <div className=" ml-2 d-flex align-items-center">
                          <div> EOS/USD </div>
                        </div>
                      </div>
                      <div className="col-4 text-right d-flex align-items-center flex-row-reverse">
                        <div>{eos_price} </div>
                      </div>
                      <div className="col-3 text-right d-flex align-items-center flex-row-reverse pr-1">
                        <div> {renderPPColor(eos_percent_change_24h)} </div>
                      </div>
                    </div>
                  </div>
                );

                TokenMarketInfo.map((tokeninfo) => {
                  if (tokeninfo.price > 0) {
                    if (IsTokenSearched(tokeninfo, this.props.common.symbol)) {
                      token_logo = images(`./${tokeninfo.logo}`);
                      items.push(
                        <div
                          className="card-token-price shadow-sm  ml-0 p-1 mt-0"
                          key={tokeninfo.name}
                          style={{marginBottom: 1}}
                        >
                          <div className="row ftz-10 token_price_weight m-0">
                            <div className="col-5 pl-1 pr-0 d-flex flex-row">
                              <img src={token_logo} className="token_logo" />
                              <div className="ml-2 d-flex align-items-center">
                                <div> {`${tokeninfo.name}/EOS`}</div>
                              </div>
                            </div>
                            <div className="col-4 text-right token_price_weight d-flex align-items-center flex-row-reverse">
                              <div> {tokeninfo.price} </div>
                            </div>
                            <div className="col-3 d-flex align-items-center flex-row-reverse pr-1">
                              <div className="text-right">{renderPPColor((tokeninfo.percent * 100).toFixed(2))} </div>
                            </div>
                          </div>
                        </div>
                      );
                    }
                  }
                });
                return items;
              } else {
                return <TokenMarketLoading />;
              }
            }}
          </Query>
        </div>
      </div>
    );
  }
}

function mapStateToProps({common}) {
  return {common};
}

export default connect(
  mapStateToProps,
  {
    setSearchSymbol
  }
)(TokenMarket);
