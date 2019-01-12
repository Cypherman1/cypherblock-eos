import React from 'react';
// import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {connect} from 'react-redux';

import {setPermInfoCollapsed} from '../../actions/common';

import {renderPerm} from '../utils/Tools';

const renderPerms = (permissions, account_name, isDarkMode) => {
  let items = [];
  permissions.map((permission) => {
    items.push(
      <div
        className={`col-12 col-sm-6 stat-col pl-2 pr-0 pb-1 ${isDarkMode ? 'bg-dark-1' : 'bg-white'}`}
        key={permission.perm_name}
      >
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

const AccPermsInfo = ({permissions, account_name, isDarkMode, common, setPermInfoCollapsed}) => {
  const {perm_collapsed} = common;
  return (
    <div
      className={`card sameheight-item stats mbc  shadow-sm ${isDarkMode ? 'bg-dark-1' : ''}`}
      style={{marginLeft: 2, marginRight: 2}}
      data-exclude="xs"
    >
      <div className="card-header card-header-sm shadow-sm bg-white row m-0">
        <div className="header-block pl-2 col pr-1">
          <a
            data-toggle="collapse"
            href={`#collapse_perm_info`}
            role="button"
            aria-expanded="true"
            aria-controls={`collapse_perm_info`}
            onClick={() => setPermInfoCollapsed(!perm_collapsed)}
          >
            <i className="fa fa-user-lock mr-2 text-info" />
            <h1 className="title text-info">
              Permissions info
              {/* <Link to={`/account/${account_name}`}>{account_name}</Link> */}
            </h1>
          </a>
        </div>
        <div className="col pr-1 d-flex align-items-center flex-row-reverse rounded-bottom">
          <a
            className="font-weight-normal d-flex align-items-center"
            data-toggle="collapse"
            href={`#collapse_perm_info`}
            role="button"
            aria-expanded="true"
            aria-controls={`collapse_perm_info`}
            onClick={() => setPermInfoCollapsed(!perm_collapsed)}
          >
            {perm_collapsed ? (
              <i className="fa fa-chevron-circle-up text-info ftz-16" />
            ) : (
              <i className="fa fa-chevron-circle-down text-info ftz-16" />
            )}
          </a>
        </div>
      </div>
      <div
        className={`card-body ftz-9 m-0 p-0 collapse mt-1 mb-1 rounded-bottom ${isDarkMode ? 'bg-dark-1' : 'bg-white'}`}
        id={`collapse_perm_info`}
      >
        {renderPerms(permissions, account_name, isDarkMode)}
      </div>
    </div>
  );
};

function mapStateToProps({myStore}) {
  return {common: myStore.common};
}
export default connect(
  mapStateToProps,
  {setPermInfoCollapsed}
)(AccPermsInfo);
