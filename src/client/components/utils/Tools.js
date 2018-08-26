import React from 'react';
import {Link} from 'react-router-dom';

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

export {convertUTCDateToLocalDate, renderAccountLink};
