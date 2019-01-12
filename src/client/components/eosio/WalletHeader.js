import React from 'react';
import {connect} from 'react-redux';
import {setTokenBalanceUnitl, setIsWalletRefetch} from '../../actions/common';

const WalletHeader = ({isDarkMode, common, setTokenBalanceUnitl, setIsWalletRefetch}) => {
  const {isEOSUnit, refetchWallet} = common;
  return (
    <div className="card-header shadow-sm m-0 row m-0 bg-white">
      <div className="col pl-2 d-flex ">
        <i className="fa fa-wallet text-info fa-lg mr-2" />
        <h1 className="text-info title">Assets | Airdrops</h1>
      </div>
      <div className="row m-0">
        <div className="col p-0" style={{marginTop: 2}}>
          <div className="">
            <div className="custom-control  custom-toggle custom-toggle-sm ">
              <input
                type="checkbox"
                id="toggleValue"
                name="toggleValue"
                className="custom-control-input"
                checked={isEOSUnit}
                onChange={() => {
                  setTokenBalanceUnitl(!isEOSUnit);
                }}
              />
              <label className="custom-control-label" htmlFor="toggleValue" />
            </div>
          </div>
          <div className="ftz-7" style={{paddingLeft: 3}}>
            USD/EOS
          </div>
        </div>
        <div className="col p-0 mr-1 pt-1">
          <button
            type="button"
            className={`btn ${isDarkMode ? 'bg-dark' : 'btn-white'}  btn-pill p-1`}
            onClick={() => {
              setIsWalletRefetch(true);
              refetchWallet().then(() => {
                setIsWalletRefetch(false);
              });
            }}
          >
            <i className="fa fa-sync-alt text-info fa-lg" />
          </button>
        </div>
      </div>
    </div>
  );
};

function mapStateToProps({myStore}) {
  return {common: myStore.common};
}

export default connect(
  mapStateToProps,
  {
    setTokenBalanceUnitl,
    setIsWalletRefetch
  }
)(WalletHeader);

// export default WalletHeader;
