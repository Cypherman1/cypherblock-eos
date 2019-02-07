import React, {Component} from 'react';
import {graphql} from 'react-apollo';
import {connect} from 'react-redux';
import ReactImageFallback from 'react-image-fallback';
import {CSSTransitionGroup} from 'react-transition-group';
import {Link} from 'react-router-dom';
import NumberEasing from '../utils/NumberEasing';
import {renderEOSNum, renderPPColor} from '../utils/RenderColors';
import {renderProjectLink} from '../utils/Tools';

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
let index = 0;

const WalletLoading = ({display, isDarkMode}) => {
  return (
    <div className={`${isDarkMode ? 'bg-dark-1 ' : ' bg-white '} card`} style={{margin: 2}}>
      <div className=" card-header bg-white row m-0 shadow-sm">
        <div className="col p-0 pl-2">
          <div className="text-info ftz-9 ">TOTAL VALUE</div>
        </div>
        <div className="pr-2">
          <div className="text-info text-right ftz-9 mb-1"># ASSETS</div>
          <div className="text-right  ftz-12"> </div>
        </div>
      </div>
      <div className="card-block p-0">
        <div className="text-center align-middle overlay " style={{paddingTop: 74}}>
          <i className="fa fa-spinner fa-spin text-info fa-2x" />
        </div>
        <div className="title-block row m-0 pb-1 shadow-sm ">
          <div className={`col-12 col-sm-12 header-col  p-0 ${isDarkMode ? 'bg-dark-1 ' : 'bg-white'}`}>
            <div className={`row border-top ${isDarkMode ? 'border-secondary' : ''} m-0 pt-1`}>
              <div className="col-3 float-left ftz-12 text-info  pl-2"> Holding </div>
              <div className="col-5 text-right ftz-12  p-0  text-info pl-2">Value</div>
              <div className="col-4 text-right ftz-12  pr-1 text-info">Price(EOS)</div>
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
      if (data[token] && data[token].data && data[token].data.length > 0 && token != 'cmc' && token != 'eosmarketcap') {
        index = data.eosmarketcap.data.findIndex(
          (e) => ('t_' + e.currency + e.contract.replace('.', '_')).toUpperCase() == token.toUpperCase()
        );
        if (index >= 0) {
          atoken = {
            name: data.eosmarketcap.data[index].currency.toUpperCase(), //token name
            symbol: data.eosmarketcap.data[index].symbol,
            currency: data.eosmarketcap.data[index].currency,
            ammount: Number(data[token].data[0].split(' ')[0]), // token ammount
            price: Number(data.eosmarketcap.data[index].last),
            percent: Number(data.eosmarketcap.data[index].change)
          };

          AllTokens.push(atoken);
        }
      }
    }
  }
  renderTokens(isEOSUnit, eos_price, isDarkMode) {
    let items = [];
    AllTokens.sort((a, b) => b.ammount * b.price - a.ammount * a.price).map((token) => {
      token_logo = `${images}/${token.symbol}.png`;

      if (token.name == 'EOS') {
        // items.push(
        //   <div className="row row-sm stats-container shadow-sm pb-1  m-0" key={token.name}>
        //     <div className="col-8 stat-col p-0">
        //       <div className="stat-icon">
        //         {/* <img src={img_src} className="img-logo" /> */}
        //         <div>
        //           <ReactImageFallback
        //             src={token_logo}
        //             fallbackImage={fallback_logo}
        //             alt={`${token.name} token airdrop`}
        //             className="img-logo"
        //           />
        //         </div>
        //       </div>
        //       <div className="stat">
        //         <div className="value">{renderEOSNum(token.ammount)}</div>
        //         <div className="name">{token.name}</div>
        //       </div>
        //     </div>
        //     {this.renderBitfinexPrice(token)}
        //   </div>
        // );
      } else {
        //main render for wallet
        if (token.price > 0) {
          token_value = isEOSUnit
            ? Number(token.ammount * token.price)
            : Number((token.ammount * token.price * eos_price).toFixed(2));

          items.push(
            <div
              className={`${isDarkMode ? 'bg-dark-1' : ''} card-token-price  row shadow-sm mbt-1px ftz-12 `}
              key={token.name}
            >
              {/* token info */}
              <div className="col-3 p-0 d-flex align-items-center">
                <div className="ml-2 bg-white mr-2 logo-bgr">
                  <ReactImageFallback
                    src={token_logo}
                    fallbackImage={fallback_logo}
                    alt={`${token.name} eos airdrop`}
                    className="token_logo"
                  />
                </div>
                <div>
                  <div className="">{renderProjectLink(token)}</div>
                  <div className="ftz-13">{renderEOSNum(token.ammount)}</div>
                </div>
              </div>
              {/* Balance info */}
              <div className="col-5 p-0 d-flex align-items-center flex-row-reverse">
                <div className="text-right">
                  <div className="ftz-13 font-weight-acttype">
                    {isEOSUnit ? (
                      <div className="d-inline-block " style={{width: 13}}>
                        <img src={eoslogo} alt="eos airdrop" />
                      </div>
                    ) : (
                      <div className="d-inline-block pl-1" style={{width: 13}}>
                        <i className="fa fa-dollar-sign" style={{fontSize: 11}} />
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
                </div>
              </div>
              <div className="col-4 p-0">{this.renderPriceinfo(token)}</div>
            </div>
          );
        } else {
          token_value = 0;
          items.push(
            <div
              className={`${isDarkMode ? 'bg-dark-1' : ''} card-token-price  row shadow-sm mbt-1px ftz-13 `}
              key={token.name}
            >
              {/* token info */}
              <div className="col-3 p-0 d-flex align-items-center">
                <div className="ml-2 bg-white mr-2 logo-bgr">
                  <ReactImageFallback
                    src={token_logo}
                    fallbackImage={fallback_logo}
                    alt={`${token.name}`}
                    className="token_logo"
                  />
                </div>
                <div className="">{token.name}</div>
              </div>
              {/* Balance info */}
              <div className="col-5 p-0">
                <div className="text-right d-flex align-items-center">
                  <div className="ftz-13 font-weight-acttype">
                    {isEOSUnit ? (
                      <div className="d-inline-block " style={{width: 13}}>
                        <img src={eoslogo} alt="eos block explorer" />
                      </div>
                    ) : (
                      <div className="d-inline-block pl-1" style={{width: 13}}>
                        <i className="fa fa-dollar-sign" style={{fontSize: 11}} />
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
                  <div className="ftz-13">{renderEOSNum(token.ammount)}</div>
                </div>
              </div>
              <div className="col-4 p-0">{this.renderPriceinfo(token)}</div>
            </div>
          );
        }
      }
    });
    return items;
  }
  renderWPrice(price) {
    return price ? <div>{price} </div> : <i className="fa fa-spinner fa-spin text-info" />;
  }
  renderPriceinfo(token) {
    if (Number(token.price) > 0) {
      return (
        <div className="text-right ml-2 mr-1">
          <div className="ftz-13">{Number(token.price).toLocaleString(undefined, {maximumSignificantDigits: 4})}</div>
          <div className="ftz-12 ">{renderPPColor(token.percent.toFixed(2))}</div>
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
            <div className="name">{renderPPColor((Number(token.percent) * 100).toFixed(2))}</div>
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
        <img src={eoslogo} alt="eos airdrop" />
      </div>
    ) : (
      <div className="pl-1 d-inline-block" style={{width: 13}}>
        <i className="fa fa-dollar-sign" style={{fontSize: 11}} />
      </div>
    );

    return (
      <div>
        {unitsign}
        <div
          className="d-inline-block  ftz-13 pcursor"
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
        <img src={eoslogo} alt="eos airdrop" />
      </div>
    ) : (
      <div className="d-inline">
        <i className="fa fa-dollar-sign" style={{fontSize: 12}} />
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

    if (data && data.cmc && data.eosmarketcap) {
      this.setAllTokens(data);
      total_token_value = 0;
      eos_price = Number(data.cmc.EOS.quote.USD.price);
      AllTokens.map((token) => {
        total_token_value += Number(token.ammount) * Number(token.price);
      });
      token_usd_value = Number(total_token_value) * Number(eos_price);
      return (
        <div className={`${isDarkMode ? 'bg-dark-1' : ' bg-white '} card`} style={{margin: 2}}>
          <div className=" card-header bg-white row m-0 shadow-sm ">
            <div className="col p-0 pl-2">
              <div className="text-info ftz-9 ">TOTAL VALUE</div>
              {this.renderTotalValue(total_token_value, token_usd_value, isEOSUnit)}
            </div>
            <div className="pr-2">
              <div className="text-info text-right ftz-9 mb-1"># ASSETS</div>
              <div className="text-right  ftz-13"> {AllTokens.length} </div>
            </div>
          </div>
          <div className="card-body p-0">
            <div className="title-block row m-0 shadow-sm ">
              <div
                className={`col-12 col-sm-12 header-col  p-0 ${
                  isDarkMode ? 'bg-dark-1 border-bottom border-top border-dark' : 'bg-white'
                }`}
              >
                <div className={`row border-top ${isDarkMode ? 'border-secondary' : ''} m-0 pt-1`}>
                  <div className="col-3 float-left ftz-12 text-info  pl-2"> Holding </div>
                  <div className="col-5 text-right ftz-12  p-0  text-info pl-2">Value</div>
                  <div className="col-4 text-right ftz-12  pr-1 text-info">Price(EOS)</div>
                </div>
              </div>
            </div>
            <CSSTransitionGroup transitionName="example" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
              {this.renderTokens(isEOSUnit, eos_price, isDarkMode)}
            </CSSTransitionGroup>
            <div className="text-right ftz-13 pr-2 mt-2 mb-2">
              <Link to={`/eosmarketcap`}> >> Go to eosmarketcap </Link>
            </div>
          </div>
        </div>
      );
    } else {
      return <WalletLoading display={display} isDarkMode={isDarkMode} />;
    }
  }
}

function mapStateToProps({myStore}) {
  return {common: myStore.common};
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
