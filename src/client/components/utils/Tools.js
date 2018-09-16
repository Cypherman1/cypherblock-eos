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

export {
  convertUTCDateToLocalDate,
  renderAccountLink,
  renderBlockLink,
  renderTransactiontLink,
  renderTransLink,
  toTokenNumber
};
