import React, {Component} from 'react';
import {graphql} from 'react-apollo';
import {connect} from 'react-redux';
import ReactImageFallback from 'react-image-fallback';
import {CSSTransitionGroup} from 'react-transition-group';
import NumberEasing from '../utils/NumberEasing';
import {renderEOSNum, renderPPColor} from '../utils/RenderColors';
import {Tokens} from '../utils/Tokens';
import {gettPairPrice, gettPairPercent} from '../utils/Tools';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import GetWalletInfo from '../../queries/GetWalletInfo';
import eoslogo from '../../assets/imgs/eoslogo1.svg';
import {setRefetchWalletFunc, setTokenBalanceUnitl} from '../../actions/common';

const images = '../imgs';

let token_logo = null;
let fallback_logo = `${images}/COMMON.png`;
let AllTokens = [];
let total_token_value = 0;
let atoken = null;
let eos_price = 0;
let token_usd_value = 0;
let total_value = 0;
let unitsign = null;
let token_value = 0;

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

class WalletBody extends Component {
  componentDidMount() {
    this.props.setRefetchWalletFunc(this.props.data.refetch);
  }

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
  renderTokens(isEOSUnit, eos_price, isDarkMode) {
    let items = [];
    AllTokens.sort((a, b) => b.ammount * b.price - a.ammount * a.price).map((token) => {
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
          token_value = isEOSUnit
            ? Number(token.ammount * token.price)
            : Number((token.ammount * token.price * eos_price).toFixed(2));

          items.push(
            <div
              className={`${isDarkMode ? 'border-bottom border-secondary' : ''} row m-0 shadow-sm  ftz-10`}
              key={token.name}
            >
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
                      <div className="d-inline-block " style={{width: 13}}>
                        <img src={eoslogo} />
                      </div>
                    ) : (
                      <div className="d-inline-block pl-1" style={{width: 13}}>
                        <i className="fa fa-dollar" style={{fontSize: 11}} />
                      </div>
                    )}
                    <div
                      className="d-inline pcursor"
                      role="button"
                      onClick={() => {
                        this.props.setTokenBalanceUnitl(!this.props.common.isEOSUnit);
                      }}
                    >
                      <NumberEasing
                        value={token_value}
                        ease="backIn"
                        precision={4}
                        speed={500}
                        trail={true}
                        useLocaleString={true}
                      />
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
    total_value = isEOSUnit ? total_token_value : token_usd_value.toFixed(2);
    unitsign = isEOSUnit ? (
      <div className="d-inline-block" style={{width: 13}}>
        <img src={eoslogo} />
      </div>
    ) : (
      <div className="pl-1 d-inline-block" style={{width: 13}}>
        <i className="fa fa-dollar" style={{fontSize: 11}} />
      </div>
    );

    return (
      <div>
        {unitsign}
        <div
          className="d-inline-block font-weight-bold ftz-12 pcursor"
          role="button"
          onClick={() => {
            this.props.setTokenBalanceUnitl(!this.props.common.isEOSUnit);
          }}
        >
          <NumberEasing
            value={total_value}
            ease="backIn"
            precision={4}
            speed={500}
            trail={true}
            useLocaleString={true}
          />
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

    const {display, data, isDarkMode, common} = this.props;
    const {isEOSUnit, isWalletRefetch} = common;
    if (data.loading) return <WalletLoading display={display} isDarkMode={isDarkMode} />;
    if (data.error) return <WalletLoading display={display} isDarkMode={isDarkMode} />;
    if (isWalletRefetch) return <WalletLoading display={display} isDarkMode={isDarkMode} />;

    if (data && data.cmc) {
      this.setAllTokens(data);
      total_token_value = 0;
      eos_price = Number(data.cmc.data.quotes.USD.price);
      AllTokens.map((token) => {
        total_token_value += token.ammount * token.price;
      });
      token_usd_value = total_token_value * eos_price;
      return (
        <div className={`${isDarkMode ? 'bg-dark border-secondary' : ' bg-white '} card border`} style={{margin: 2}}>
          <div className=" card-header bg-white row m-0 shadow-sm mb-1">
            <div className="col p-0 pl-2">
              <div className="text-info ftz-7 ">TOTAL VALUE</div>
              {this.renderTotalValue(total_token_value, token_usd_value, isEOSUnit)}
            </div>
            <div className="pr-2">
              <div className="text-info text-right ftz-7 mb-1"># ASSETS</div>
              <div className="text-right font-weight-bold ftz-12"> {AllTokens.length} </div>
            </div>
          </div>
          <div className="card-block p-0">
            <div className="title-block row m-0 shadow-sm ">
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
            <CSSTransitionGroup transitionName="example" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
              {this.renderTokens(isEOSUnit, eos_price, isDarkMode)}
            </CSSTransitionGroup>
          </div>
        </div>
      );
    } else {
      return <WalletLoading display={display} isDarkMode={isDarkMode} />;
    }
  }
}

function mapStateToProps({common}) {
  return {common};
}

export default connect(
  mapStateToProps,
  {setRefetchWalletFunc, setTokenBalanceUnitl}
)(
  graphql(GetWalletInfo, {
    options: ({account_name}) => {
      return {
        variables: {
          account_name: account_name
        }
      };
    }
  })(WalletBody)
);
