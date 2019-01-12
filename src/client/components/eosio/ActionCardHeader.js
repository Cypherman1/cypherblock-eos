import React from 'react';
import TagsInput from 'react-tagsinput';
import {renderAccountLink} from '../utils/Tools';
// import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {connect} from 'react-redux';
import {
  setLiveActions,
  setIsRefetch,
  setIsButtonLoading,
  setIsMore,
  setIsAntiSpam,
  setLimitValue,
  setFilterOthers,
  setFilterResources,
  setFilterSendReceieEOS,
  setFilterSendReceieTokens,
  setFilterSmartContract,
  setMemoTag,
  setIsSettingOpen
} from '../../actions/eosActions';

const renderRefetchBtn = (refetch, setIsRefetch, setIsMore, islive, isrefetch, isDarkMode) => {
  if (!islive) {
    if (!isrefetch)
      return (
        <button
          type="button"
          className={`btn ${isDarkMode ? 'bg-dark' : 'btn-white'}  btn-pill p-0 mr-2`}
          onClick={() => {
            setIsRefetch(true);
            refetch().then(() => {
              setIsRefetch(false);
              setIsMore(true);
            });
          }}
        >
          {/* <FontAwesomeIcon icon="sync-alt" className="text-info" size="lg" /> */}
          <i className="fa fa-sync-alt text-info fa-lg" />
        </button>
      );
  } else {
    return null;
  }
};

const ActionCardHeader = ({
  eosActions,
  account_name,
  setLiveActions,
  setIsRefetch,
  setIsButtonLoading,
  setIsMore,
  setIsAntiSpam,
  setLimitValue,
  setFilterOthers,
  setFilterResources,
  setFilterSendReceieEOS,
  setFilterSendReceieTokens,
  setFilterSmartContract,
  setMemoTag,
  setIsSettingOpen,
  isDarkMode
}) => {
  const {
    refetch,
    isAntiSpamed,
    islive,
    limit,
    isrefetch,
    isFilterOthers,
    isFilterSmartContract,
    isFilterResources,
    isFilterSendReceiveTokens,
    isFilterSendReceiveEOS,
    memoTags,
    isSettingOpen
  } = eosActions;

  return (
    <div>
      <div className={`card-header row m-0 ${isDarkMode ? 'bg-dark' : 'bg-white'}  `}>
        <div className="header-block pl-1 col stat-col">
          {/* <FontAwesomeIcon icon="list-alt" className="mr-2 text-info fa-lg" /> */}
          <i className="fa fa-list-alt text-info fa-lg mr-2" />
          <h1 className="title text-info">
            Recent <span className="ml-1 mr-1">{renderAccountLink(account_name)}</span> actions
          </h1>
        </div>
        <div className="col-auto pt-atb pr-1">
          {renderRefetchBtn(refetch, setIsRefetch, setIsMore, islive, isrefetch, isDarkMode)}
          <button
            type="button"
            className={`btn ${isDarkMode ? 'btn-dark' : 'btn-white'}  btn-pill p-0`}
            data-toggle="collapse"
            data-target="#collapseExample"
            aria-expanded="false"
            aria-controls="collapseExample"
            onClick={() => {
              setIsSettingOpen(!isSettingOpen);
            }}
          >
            {!isSettingOpen ? (
              <i className="fa fa-cog text-info fa-lg" />
            ) : (
              <i className="fa fa-chevron-circle-up fa-lg text-success" />
            )}
          </button>
        </div>
      </div>
      <div className="collapse shadow-sm" id="collapseExample">
        <div className="card card-body pt-2 pb-0 pd-action-setting">
          <div className="row  ">
            <div className="col-6 font-weight-normal">
              {/* Toggles */}
              <fieldset>
                <strong className="text-muted d-block mb-2 h6">Config</strong>
                <div className="custom-control  custom-toggle mb-3">
                  <input
                    type="checkbox"
                    id="antiSpam"
                    name="antiSpam"
                    className="custom-control-input"
                    checked={isAntiSpamed}
                    onChange={() => {
                      setIsAntiSpam(!isAntiSpamed);
                    }}
                  />
                  <label className="custom-control-label font-weight-normal" htmlFor="antiSpam">
                    Anti spam
                  </label>
                </div>
                <div className="custom-control custom-toggle  mb-3">
                  <input
                    type="checkbox"
                    id="liveAction"
                    name="liveAction"
                    className="custom-control-input"
                    checked={islive}
                    onChange={() => {
                      setLiveActions(!islive);
                    }}
                  />
                  <label className="custom-control-label font-weight-normal" htmlFor="liveAction">
                    Live Actions
                  </label>
                </div>
                <label className="font-weight-normal">
                  <select
                    id="inputLimit"
                    className="form-control-sm mr-2"
                    value={limit}
                    onChange={(event) => {
                      setLimitValue(event.target.value);
                    }}
                  >
                    <option value={20} defaultChecked>
                      20
                    </option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                    <option value={500}>500</option>
                  </select>
                  Offset
                </label>
              </fieldset>

              {/* / Toggles */}
            </div>
            <div className="col-6 ftz-12 pl-0">
              {/* Checkboxes */}
              <strong className="text-muted d-block mb-2 h6">Show/Filter</strong>
              <fieldset>
                <div className="custom-control custom-checkbox mb-1 pt-actgrp">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="ckxSendReceiveEOS"
                    checked={isFilterSendReceiveEOS}
                    onChange={(event) => {
                      setFilterSendReceieEOS(event.target.checked);
                    }}
                  />
                  <label className="custom-control-label font-weight-normal  text-success" htmlFor="ckxSendReceiveEOS">
                    Send/Receive EOS
                  </label>
                </div>

                <div className="custom-control custom-checkbox mb-1 pt-actgrp">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="cbxSendReceiveToken"
                    checked={isFilterSendReceiveTokens}
                    onChange={(event) => {
                      setFilterSendReceieTokens(event.target.checked);
                    }}
                  />
                  <label className="custom-control-label font-weight-normal  text-info" htmlFor="cbxSendReceiveToken">
                    Send/Receive tokens
                  </label>
                </div>
                <div className="custom-control custom-checkbox mb-1 pt-actgrp">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="cbxResources"
                    checked={isFilterResources}
                    onChange={(event) => {
                      setFilterResources(event.target.checked);
                    }}
                  />
                  <label className="custom-control-label font-weight-normal text-primary" htmlFor="cbxResources">
                    Account, Resources, Contract
                  </label>
                </div>

                <div className="custom-control custom-checkbox mb-1 pt-actgrp">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="cbxSmartContract"
                    checked={isFilterSmartContract}
                    onChange={(event) => {
                      setFilterSmartContract(event.target.checked);
                    }}
                  />
                  <label className="custom-control-label font-weight-normal text-danger" htmlFor="cbxSmartContract">
                    Vote,Producers
                  </label>
                </div>
                <div className="custom-control custom-checkbox mb-1 pt-actgrp">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="cbxOthers"
                    checked={isFilterOthers}
                    onChange={(event) => {
                      setFilterOthers(event.target.checked);
                    }}
                  />
                  <label className="custom-control-label font-weight-normal text-warning" htmlFor="cbxOthers">
                    Others
                  </label>
                </div>
              </fieldset>
              {/* / Checkboxes */}
            </div>
            <div className="col-12 ftz-12">
              <strong className="text-muted d-block mb-2 h6">Search</strong>
              <fieldset>
                <TagsInput
                  value={memoTags}
                  onChange={(tags) => setMemoTag(tags)}
                  className="input-tag-form-control rounded border border-info"
                  inputProps={{
                    className: 'react-tagsinput-input',
                    placeholder: 'Memo/Receiver/Account/Actname'
                  }}
                  tagProps={{
                    className: 'react-tagsinput-tag badge-success',
                    classNameRemove: 'react-tagsinput-remove'
                  }}
                />
              </fieldset>
              {/* / Checkboxes */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function mapStateToProps({myStore}) {
  return {eosActions: myStore.eosActions};
}

export default connect(
  mapStateToProps,
  {
    setLiveActions,
    setIsRefetch,
    setIsButtonLoading,
    setIsMore,
    setIsAntiSpam,
    setLimitValue,
    setFilterOthers,
    setFilterResources,
    setFilterSendReceieEOS,
    setFilterSendReceieTokens,
    setFilterSmartContract,
    setMemoTag,
    setIsSettingOpen
  }
)(ActionCardHeader);
