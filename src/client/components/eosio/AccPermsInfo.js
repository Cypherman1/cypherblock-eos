import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {renderAccountLink} from '../utils/Tools';

const renderPerms = (permissions) => {
  let items = [];
  permissions.map((permission) => {
    items.push(
      <div className="col-12 col-sm-6 stat-col" key={permission.perm_name}>
        <div className="value">{permission.perm_name}</div>
        <div className="threshold-icon mr-1">
          <div className="bg-danger rounded text-light pt-2 pb-2"> {permission.required_auth.threshold}</div>
          <div className="ftz-8"> Threshold</div>
        </div>
        <div className="stat">
          <div className="name">{RenderAuths(permission.required_auth.accounts, permission.required_auth.keys)}</div>
        </div>
      </div>
    );
  });
  return items;
};

const RenderAuths = (accounts, keys) => {
  let items = [];

  if (accounts)
    accounts.map((account) => {
      items.push(
        <div key={account.permission.actor} className="row m-0">
          <div className="">
            <div className="d-inline-box pr-2 pl-2 mb-1 mr-1 rounded bg-success font-weight-bold text-light">
              {account.weight}
            </div>
            {renderAccountLink(account.permission.actor)}@{account.permission.permission})
          </div>
        </div>
      );
    });
  if (keys)
    keys.map((key) => {
      items.push(
        <div key={key.key} className="row">
          <div className="d-inline pr-2 pl-2 mb-1 mr-1 rounded bg-success font-weight-bold text-light">
            {key.weight}
          </div>
          <div className="">{key.key}</div>
        </div>
      );
    });
  return items;
};

const AccPermsInfo = ({permissions}) => {
  return (
    <div className="card sameheight-item stats mbc border-0 pl-1 pr-1" data-exclude="xs">
      <div className="card-header card-header-sm bg-light shadow-sm act-xs-height">
        <div className="header-block pl-2">
          <FontAwesomeIcon icon="user-lock" className="mr-2 text-info" />
          <h5 className="title text-info">
            Permissions info
            {/* <Link to={`/account/${account_name}`}>{account_name}</Link> */}
          </h5>
        </div>
      </div>
      <div className="card-block row row-sm  ftz-9">{renderPerms(permissions)}</div>
    </div>
  );
};

export default AccPermsInfo;
