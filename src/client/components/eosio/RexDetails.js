/*H**********************************************************************
* DESCRIPTION :
*       RexDetails component shows the account's REX related infomation
*/
import React from 'react';
import {connect} from 'react-redux';
import {setRexInfoCollapsed} from '../../actions/common';
// import {renderPerm} from '../utils/Tools';

const RexDetails = ({account_name, isDarkMode, common, setRexInfoCollapsed}) => {
  const {rex_collapsed} = common;
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
            href={`#collapse_rex_info`}
            role="button"
            aria-expanded="true"
            aria-controls={`collapse_perm_info`}
            onClick={() => setRexInfoCollapsed(!rex_collapsed)}
          >
            <i className="fa fa-user-lock mr-2 text-info" />
            <h1 className="title text-info">REX info</h1>
          </a>
        </div>
        <div className="col pr-1 d-flex align-items-center flex-row-reverse rounded-bottom">
          <a
            className="font-weight-normal d-flex align-items-center"
            data-toggle="collapse"
            href={`#collapse_rex_info`}
            role="button"
            aria-expanded="true"
            aria-controls={`collapse_rex_info`}
            onClick={() => setRexInfoCollapsed(!rex_collapsed)}
          >
            {rex_collapsed ? (
              <i className="fa fa-chevron-circle-up text-info ftz-16" />
            ) : (
              <i className="fa fa-chevron-circle-down text-info ftz-16" />
            )}
          </a>
        </div>
      </div>
      <div
        className={`card-body ftz-9 m-0 p-0 collapse mt-1 mb-1 rounded-bottom ${isDarkMode ? 'bg-dark-1' : 'bg-white'}`}
        id={`collapse_rex_info`}
      >
        REX
      </div>
    </div>
  );
};

function mapStateToProps({myStore}) {
  return {common: myStore.common};
}
export default connect(
  mapStateToProps,
  {setRexInfoCollapsed}
)(RexDetails);
