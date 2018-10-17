import React, {Component} from 'react';
import {Query} from 'react-apollo';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Tokens} from '../utils/Tokens';
import GetTokenMarket from '../../queries/GetTokenMarket';
import {gettPairPrice, gettPairPercent} from '../utils/Tools';
import {renderPPColor} from '../utils/RenderColors';
const images = require.context('../../assets/imgs/symbols');

let TokenMarketInfo = []; //tokens market info array
let atoken = null;
let items = [];
let token_logo = null;
let ram_price = 0;
let eos_price = 0;
let eos_percent_change_24h = 0;

class TokenMarket extends Component {
  updateTokenMarket(data) {
    //update tokens market info
    TokenMarketInfo = [];
    Tokens.map((token) => {
      atoken = {
        name: token.symbol,
        logo: token.logo,
        price: gettPairPrice(data, token.bitfinex_pair, token.bigone_ticker, token.blocksence_ticker),
        percent: gettPairPercent(data, token.bitfinex_pair, token.bigone_ticker, token.blocksence_ticker)
      };
      TokenMarketInfo.push(atoken);
    });
  }
  render() {
    return (
      <div className="card sameheight-item stats mb-1 d-none d-xl-block" data-exclude="xs">
        <div className="card-header shadow-sm bg-white">
          <div className="header-block pl-2">
            <FontAwesomeIcon icon="chart-bar" className="mr-2 text-info fa-lg" />
            <h5 className="title text-info">Market info</h5>
          </div>
        </div>
        <div className="card-block p-0">
          <Query query={GetTokenMarket} pollInterval={60000}>
            {({loading, error, data}) => {
              if (loading) return <div />;
              if (error) return <div />;
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
                  <div className="row ftz-10 pb-1 pt-1 m-0 token_price_weight shadow-sm" key={1}>
                    <div className="col-5"> Pair </div>
                    <div className="col-4 text-right "> Price </div>
                    <div className="col-3 text-right"> 24h % </div>
                  </div>
                );
                items.push(
                  <div className="row ftz-10 token_price_weight pb-1 pt-2 m-0" key={2}>
                    <div className="col-5">
                      <img src={images(`./RAM.svg`)} className="token_logo" />
                      <div className=" ml-2 d-inline-flex pb-1"> RAM(EOS/KB) </div>
                    </div>
                    <div className="col-4 text-right "> {ram_price} </div>
                    <div className="col-3 text-right"> </div>
                  </div>
                );
                items.push(
                  <div className="row ftz-10 token_price_weight pb-1 m-0" key={3}>
                    <div className="col-5">
                      <img src={images(`./eoslogo.svg`)} className="token_logo" />
                      <div className=" ml-2 d-inline-flex"> EOS/USD </div>
                    </div>
                    <div className="col-4 text-right "> {eos_price} </div>
                    <div className="col-3 text-right"> {renderPPColor(eos_percent_change_24h)} </div>
                  </div>
                );

                TokenMarketInfo.map((tokeninfo) => {
                  if (tokeninfo.price > 0) {
                    token_logo = images(`./${tokeninfo.logo}`);
                    items.push(
                      <div className="row ftz-10 token_price_weight pb-1 m-0" key={tokeninfo.name}>
                        <div className="col-5">
                          <img src={token_logo} className="token_logo" />
                          <div className=" ml-2 d-inline-flex">{`${tokeninfo.name}/EOS`}</div>
                        </div>
                        <div className="col-4 text-right token_price_weight"> {tokeninfo.price} </div>
                        <div className="col-3 text-right"> {renderPPColor((tokeninfo.percent * 100).toFixed(2))} </div>
                      </div>
                    );
                  }
                });
                return items;
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
        </div>
      </div>
    );
  }
}

export default TokenMarket;
