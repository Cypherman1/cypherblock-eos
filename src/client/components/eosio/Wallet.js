import React, {Component} from 'react';
import {CSSTransitionGroup} from 'react-transition-group';
import {Query} from 'react-apollo';
import ReactImageFallback from 'react-image-fallback';
import {connect} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Tokens} from '../utils/Tokens';
import {gettPairPrice, gettPairPercent} from '../utils/Tools';
import {renderPPColor} from '../utils/RenderColors';
import GetWalletInfo from '../../queries/GetWalletInfo';
import {renderEOSNum} from '../utils/RenderColors';
import eoslogo from '../../assets/imgs/eoslogo1.svg';
import {setTokenBalanceUnitl} from '../../actions/common';
import WalletHeader from './WalletHeader';
import WalletBody from './WalletBody';

const images = '../imgs';

let token_logo = null;
let fallback_logo = `${images}/COMMON.png`;
let AllTokens = [];
let total_token_value = 0;
let atoken = null;
let eos_price = 0;
let token_usd_value = 0;
let tokens_count = 0;

const WalletLoading = ({display, isDarkMode}) => {
  return (
    <div className={`${isDarkMode ? 'bg-dark border-secondary' : ' bg-white '} card border`} style={{margin: 2}}>
      <div className=" card-header bg-white row m-0 shadow-sm mb-1">
        <div className="col p-0 pl-2">
          <div className="text-info ftz-7 ">TOTAL VALUE</div>
        </div>
        <div className="pr-2">
          <div className="text-info text-right ftz-7 mb-1"># ASSETS</div>
          <div className="text-right font-weight-bold ftz-12"> </div>
        </div>
      </div>
      <div className="card-block p-0">
        <div className="text-center align-middle overlay " style={{paddingTop: 74}}>
          <FontAwesomeIcon icon="spinner" spin className="text-info fa-2x" />
        </div>
        <div className="title-block row m-0 pb-1 shadow-sm ">
          <div
            className={`col-12 col-sm-12 header-col  p-0 ${
              isDarkMode ? 'bg-dark border-bottom border-top border-secondary' : 'bg-white'
            }`}
          >
            <div className="row  m-0">
              <div className="col-4 float-left ftz-10 text-info  pl-2" />
              <div className="col-5 text-right ftz-10  p-0  text-info pl-2">Holding</div>
              <div className="col-3 text-right ftz-10  pr-1 text-info">Price(EOS)</div>
            </div>
          </div>
        </div>
        <div className="row row-sm stats-container shadow-sm m-0 pb-1 plheight" />
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
  renderTokens(isEOSUnit, eos_price) {
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
          // items.push(
          //   <div className="row row-sm stats-container m-0 shadow-sm pb-1" key={token.name}>
          //     <div className="col-8 stat-col p-0">
          //       <div className="stat-icon">
          //         {/* <img src={img_src} className="img-logo" /> */}
          //         <div>
          //           <ReactImageFallback src={token_logo} fallbackImage={fallback_logo} className="img-logo" />
          //         </div>
          //       </div>
          //       <div className="stat">
          //         <div className="value">{renderEOSNum(token.ammount)}</div>

          //         <div className="name">
          //           {token.name} ({Number((token.ammount * token.price).toFixed(4)).toLocaleString('en')} EOS)
          //         </div>
          //       </div>
          //     </div>
          //     {this.renderBitfinexPrice(token)}
          //   </div>
          // );
          items.push(
            <div className="row m-0 shadow-sm ftz-10" key={token.name}>
              {/* token info */}
              <div className="col-4 p-0 pt-1">
                <div className="d-inline-block ml-2 bg-white mr-2 " style={{height: 26, width: 26, borderRadius: 200}}>
                  <ReactImageFallback src={token_logo} fallbackImage={fallback_logo} className="img-logo" />
                </div>
                <div className="d-inline">{token.name}</div>
              </div>
              {/* Balance info */}
              <div className="col-5 p-0 pt-1">
                <div className="text-right">
                  <div className="ftz-11 font-weight-bold">
                    {isEOSUnit ? (
                      <div className="d-inline-block " style={{width: 12}}>
                        <img src={eoslogo} />
                      </div>
                    ) : (
                      <div className="d-inline">
                        <i className="fa fa-dollar" style={{fontSize: 12}} />
                      </div>
                    )}
                    <div className="d-inline">
                      {isEOSUnit
                        ? Number((token.ammount * token.price).toFixed(4)).toLocaleString('en')
                        : Number((token.ammount * token.price * eos_price).toFixed(2)).toLocaleString('en')}
                    </div>
                  </div>
                  <div className="ftz-9">{renderEOSNum(token.ammount)}</div>
                </div>
              </div>
              <div className="col-3 p-0 pt-1">{this.renderPriceinfo(token)}</div>
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
  renderPriceinfo(token) {
    if (token.price > 0) {
      return (
        <div className="text-right ml-2 mr-1">
          <div className="">{token.price}</div>
          <div className="">{renderPPColor((token.percent * 100).toFixed(2))}</div>
        </div>
      );
    } else return null;
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
  renderTotalValue(total_token_value, token_usd_value, isEOSUnit) {
    return isEOSUnit ? (
      <div className="">
        {/* <div className="d-inline">
                        <i class="fa fa-dollar mr-1" style={{fontSize: 12}} />
                      </div> */}
        <div className="d-inline-block" style={{width: 13}}>
          <img src={eoslogo} />
        </div>
        <div className="d-inline-block font-weight-bold ftz-12">
          {total_token_value.toLocaleString(undefined, {maximumFractionDigits: 4})}
        </div>
      </div>
    ) : (
      <div className="">
        <div className="d-inline">
          <i className="fa fa-dollar" style={{fontSize: 11}} />
        </div>
        {/* <div className="mr-1 d-inline-block " style={{width: 14}}>
          <img src={eoslogo} />
        </div> */}
        <div className="d-inline-block font-weight-bold ftz-12">
          {token_usd_value.toLocaleString(undefined, {maximumFractionDigits: 0})}
        </div>
      </div>
    );
  }
  renderHoldingUnit(isEOSUnit) {
    return isEOSUnit ? (
      <div className="d-inline-block " style={{width: 13}}>
        <img src={eoslogo} />
      </div>
    ) : (
      <div className="d-inline">
        <i className="fa fa-dollar" style={{fontSize: 12}} />
      </div>
    );
  }

  render() {
    total_token_value = 0;
    const {display, isDarkMode} = this.props;

    return (
      <div
        className={`${isDarkMode ? 'bg-dark' : ' bg-actions'} border card sameheight-item stats mb-1 ${display} `}
        data-exclude="xs"
      >
        <WalletHeader isDarkMode={isDarkMode} />
        <WalletBody account_name={this.props.account_name} isDarkMode={isDarkMode} />
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
    setTokenBalanceUnitl
  }
)(Wallet);

// export default Wallet;
