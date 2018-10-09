import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {renderPerm, RoundedIcon} from '../utils/Tools';

const renderPerms = (permissions, account_name) => {
  let items = [];
  permissions.map((permission) => {
    items.push(
      <div className="col-12 col-sm-6 stat-col pl-1 pr-0 pb-1" key={permission.perm_name}>
        {renderPerm(
          permission.perm_name,
          permission.required_auth.threshold,
          permission.required_auth.accounts,
          permission.required_auth.keys,
          account_name
        )}
      </div>
    );
  });
  return items;
};

const AccPermsInfo = ({permissions, account_name}) => {
  return (
    <div className="card sameheight-item stats mbc mr-2 ml-2 pl-1 pr-1" data-exclude="xs">
      <div className="card-header card-header-sm bg-white border-bottom act-xs-height">
        <div className="header-block pl-2">
          <FontAwesomeIcon icon="user-lock" className="mr-2 text-info" />
          <h5 className="title text-info">
            Permissions info
            {/* <Link to={`/account/${account_name}`}>{account_name}</Link> */}
          </h5>
        </div>
      </div>
      <div className="card-block row row-sm ftz-9 m-0 pb-0 pr-0 pl-0">{renderPerms(permissions, account_name)}</div>
    </div>
  );
};

export default AccPermsInfo;
