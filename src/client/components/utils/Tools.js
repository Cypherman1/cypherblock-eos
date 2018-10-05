import React from 'react';
import {Link} from 'react-router-dom';

const toTokenNumber = (tokenNum) => {
  if (tokenNum)
    return `${Number(tokenNum.split(' ')[0]).toLocaleString(undefined, {minimumFractionDigits: 4})} ${
      tokenNum.split(' ')[1]
    }`;
};

const convertUTCDateToLocalDate = (date) => {
  var newDate = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);

  var offset = date.getTimezoneOffset() / 60;
  var hours = date.getHours();

  newDate.setHours(hours - offset);

  return newDate;
};

const renderAccountLink = (accountName) => {
  return <Link to={`/account/${accountName}`}>{accountName}</Link>;
};

const renderBlockLink = (block_num) => {
  return <Link to={`/block/${block_num}`}>{block_num}</Link>;
};

const renderTransactiontLink = (trx_id, seq) => {
  return (
    <div data-toggle="tooltip" data-placement="top" title="View transaction">
      <Link to={`/transaction/${trx_id}`}>{seq}</Link>
    </div>
  );
};

const renderTransLink = (trx_id) => {
  return (
    <div>
      <Link to={`/transaction/${trx_id}`}>{trx_id}</Link>
    </div>
  );
};

const RenderAuths = (accounts, keys) => {
  let items = [];
  if (accounts)
    accounts.map((account) => {
      items.push(
        <div key={account.permission.actor} className="d-flex">
          <div className="weight-w mb-1 mr-auth-weight rounded bg-success font-weight-bold text-light ftz-11">
            {account.weight}
          </div>
          <div className="pt-auth-account ftz-11">
            {renderAccountLink(account.permission.actor)}@{account.permission.permission}
          </div>
        </div>
      );
    });
  if (keys)
    keys.map((key) => {
      items.push(
        <div key={key.key} className="d-flex">
          <div className="weight-w mb-1 mr-auth-weight rounded bg-success font-weight-bold text-light">
            {key.weight}
          </div>
          <div className="pt-auth-key ftz-6">{key.key}</div>
        </div>
      );
    });
  return items;
};

const renderPerm = (perm_name, threshold, accounts, keys, account_name) => {
  return (
    <div className="d-flex pt-1">
      <div className="mr-1 pt-1">
        <div className="threshold-icon bg-sent rounded text-light pt-2 ">
          {threshold}
          <div className="ftz-threshold text-light font-weight-bold">Threshold</div>
        </div>
      </div>
      <div className="">
        <div className="pb-permname ftz-12">
          {renderAccountLink(account_name)}
          <span className="font-weight-bold text-info">@{perm_name}</span>
        </div>
        <div className="name">{RenderAuths(accounts, keys)}</div>
      </div>
    </div>
  );
};

export {
  convertUTCDateToLocalDate,
  renderAccountLink,
  renderBlockLink,
  renderTransactiontLink,
  renderTransLink,
  toTokenNumber,
  renderPerm
};
