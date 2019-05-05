/*H**********************************************************************
* DESCRIPTION :
*       RexDetails component shows the account's REX related infomation
*/
import React from 'react';
import {connect} from 'react-redux';
import {convertUTCDateToLocalDate} from '../utils/Tools';
import {setRexInfoCollapsed} from '../../actions/common';
// import {renderPerm} from '../utils/Tools';

let processing_loans = 0;
let matured_loans = 0;
let saving_loan = 0;
let cpu_loan = 0;
let cpu_payment = 0;
let net_loan = 0;
let net_payment = 0;
let current_head_block_time;
let rex_maturity_date;
Date.prototype.addDays = function(days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

const renderRexBalance = (rex_balance, isDarkMode) => {
  if (rex_balance.rows && rex_balance.rows[0])
    return (
      <div className={`row row-sm m-0 pl-1 pr-1 mb-2 border-bottom pb-2 border-info ${isDarkMode ? 'bg-dark-1' : ''}`}>
        <div className="col-12 col-sm-12 col-md-6 pl-1 pr-1 m-0">
          <div className="row m-0 ">
            <div className="col-6 col-sm-6 col-md-6 pl-0 pr-1 m-0 stat-col">
              <div className="stat">
                <div className="value">
                  {(processing_loans / 10000).toLocaleString(undefined, {maximumFractionDigits: 4})} REX
                </div>
                <div className="name">Processing Loans Amt</div>
              </div>
              <div className="progress stat-progress">
                <div
                  className="progress-bar"
                  style={{
                    width: `0%`
                  }}
                />
              </div>
            </div>
            <div className="col-6 col-sm-6 col-md-6 pl-0 pr-1 m-0 stat-col">
              <div className="stat">
                <div className="value">
                  {(saving_loan / 10000).toLocaleString(undefined, {maximumFractionDigits: 4})} REX
                </div>
                <div className="name">Saving Loans Amt</div>
              </div>
              <div className="progress stat-progress">
                <div
                  className="progress-bar"
                  style={{
                    width: `0%`
                  }}
                />
              </div>
            </div>
            <div className="col-6 col-sm-6 col-md-6 pl-0 pr-1 m-0 stat-col">
              <div className="stat">
                <div className="value">
                  {(matured_loans / 10000).toLocaleString(undefined, {maximumFractionDigits: 4})} REX
                </div>
                <div className="name">Matured Loans Amt</div>
              </div>
              <div className="progress stat-progress">
                <div
                  className="progress-bar"
                  style={{
                    width: `0%`
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-12 col-md-6 pr-0 pl-2">
          <div className="ftz-14 border-bottom text-info">Maturities</div>
          <div className="row m-0">
            <div className="col-6 col-sm-6 col-md-6 pl-0 pr-1 m-0 stat-col ftz-12 border-bottom">Ammount</div>
            <div className="col-6 col-sm-6 col-md-6 pl-0 pr-1 m-0 stat-col ftz-12 border-bottom">Time</div>
          </div>
          {rex_balance.rows[0].rex_maturities.map((rex_maturity) => {
            rex_maturity_date = new Date(rex_maturity.first);
            if (rex_maturity_date < current_head_block_time)
              return (
                <div className="row m-0" key={rex_maturity.first}>
                  <div className="col-6 col-sm-6 col-md-6 pl-0 pr-1 m-0 stat-col ftz-12">
                    {(Number(rex_maturity.second) / 10000).toLocaleString(undefined, {
                      maximumFractionDigits: 4
                    })}{' '}
                    REX
                  </div>
                  <div className="col-6 col-sm-6 col-md-6 pl-0 pr-1 m-0 stat-col ftz-12">
                    {convertUTCDateToLocalDate(new Date(rex_maturity.first).toLocaleDateString())}
                  </div>
                </div>
              );
          })}
        </div>
      </div>
    );
};

const renderNetLoanBalance = (netloan, isDarkMode) => {
  if (netloan.rows.length > 0) {
    return (
      <div className={`row row-sm m-0 pl-1 pr-1 mb-2 pb-2 ${isDarkMode ? 'bg-dark-1' : ''}`}>
        <div className="col-12 col-sm-12 col-md-6 pl-1 pr-1 m-0">
          <div className="row m-0">
            <div className="col-6 col-sm-6 col-md-6 pl-0 pr-1 m-0 stat-col">
              <div className="stat">
                <div className="value"> {net_loan.toLocaleString(undefined, {maximumFractionDigits: 4})} </div>
                <div className="name">NET Loans Staked</div>
              </div>
              <div className="progress stat-progress">
                <div
                  className="progress-bar"
                  style={{
                    width: `0%`
                  }}
                />
              </div>
            </div>
            <div className="col-6 col-sm-6 col-md-6 pl-0 pr-1 m-0 stat-col">
              <div className="stat">
                <div className="value"> {net_payment.toLocaleString(undefined, {maximumFractionDigits: 4})} </div>
                <div className="name">NET Payment</div>
              </div>
              <div className="progress stat-progress">
                <div
                  className="progress-bar"
                  style={{
                    width: `0%`
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-12 col-md-6 pr-0 pl-2">
          <div className="ftz-14 border-bottom text-info">Details</div>
          <div className="row m-0">
            <div className="col-4 col-sm-4 col-md-4 pl-0 pr-1 m-0 stat-col ftz-12 border-bottom">Staked</div>
            <div className="col-4 col-sm-4 col-md-4 pl-0 pr-1 m-0 stat-col ftz-12 border-bottom">Payment</div>
            <div className="col-4 col-sm-4 col-md-4 pl-0 pr-1 m-0 stat-col ftz-12 border-bottom">expiration</div>
          </div>
          {renderCpuLoan(netloan)}
        </div>
      </div>
    );
  }
};

const renderCpuLoanBalance = (cpuloan, isDarkMode) => {
  if (cpuloan.rows.length > 0) {
    return (
      <div className={`row row-sm m-0 pl-1 pr-1 mb-2 border-bottom pb-2 border-info ${isDarkMode ? 'bg-dark-1' : ''}`}>
        <div className="col-12 col-sm-12 col-md-6 pl-1 pr-1 m-0">
          <div className="row m-0">
            <div className="col-6 col-sm-6 col-md-6 pl-0 pr-1 m-0 stat-col">
              <div className="stat">
                <div className="value"> {cpu_loan.toLocaleString(undefined, {maximumFractionDigits: 4})} </div>
                <div className="name">CPU Loans Staked</div>
              </div>
              <div className="progress stat-progress">
                <div
                  className="progress-bar"
                  style={{
                    width: `0%`
                  }}
                />
              </div>
            </div>
            <div className="col-6 col-sm-6 col-md-6 pl-0 pr-1 m-0 stat-col">
              <div className="stat">
                <div className="value"> {cpu_payment.toLocaleString(undefined, {maximumFractionDigits: 4})} </div>
                <div className="name">CPU Payment</div>
              </div>
              <div className="progress stat-progress">
                <div
                  className="progress-bar"
                  style={{
                    width: `0%`
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-12 col-md-6 pr-0 pl-2">
          <div className="ftz-14 border-bottom text-info">Details</div>
          <div className="row m-0">
            <div className="col-4 col-sm-4 col-md-4 pl-0 pr-1 m-0 stat-col ftz-12 border-bottom">Staked</div>
            <div className="col-4 col-sm-4 col-md-4 pl-0 pr-1 m-0 stat-col ftz-12 border-bottom">Payment</div>
            <div className="col-4 col-sm-4 col-md-4 pl-0 pr-1 m-0 stat-col ftz-12 border-bottom">expiration</div>
          </div>
          {renderCpuLoan(cpuloan)}
        </div>
      </div>
    );
  }
};
const renderCpuLoan = (cpuloan) => {
  let items = [];
  if (cpuloan.rows) {
    cpuloan.rows.map((row) => {
      items.push(
        <div className="row m-0" key={row.expiration}>
          <div className="col-4 col-sm-4 col-md-4 pl-0 pr-1 m-0 stat-col ftz-12">{row.total_staked}</div>
          <div className="col-4 col-sm-4 col-md-4 pl-0 pr-1 m-0 stat-col ftz-12">{row.payment}</div>
          <div className="col-4 col-sm-4 col-md-4 pl-0 pr-1 m-0 stat-col ftz-12">
            {convertUTCDateToLocalDate(new Date(row.expiration).toLocaleDateString())}
          </div>
        </div>
      );
    });
  }
  return items;
};

const Calculate_values = (rex_balance, cpuloan, netloan, head_block_time, account_name) => {
  current_head_block_time = new Date(new Date(head_block_time) + 'UTC').addDays(4);
  processing_loans = 0;
  matured_loans = 0;
  saving_loan = 0;
  cpu_loan = 0;
  cpu_payment = 0;
  net_loan = 0;
  net_payment = 0;
  if (rex_balance.rows && rex_balance.rows[0]) {
    if (rex_balance.rows[0].rex_maturities) {
      rex_balance.rows[0].rex_maturities.map((rex_maturity) => {
        rex_maturity_date = new Date(rex_maturity.first);
        if (rex_maturity_date > current_head_block_time) saving_loan += Number(rex_maturity.second);
        else if (rex_maturity_date > new Date(head_block_time)) processing_loans += Number(rex_maturity.second);
        else matured_loans += Number(rex_maturity.second);
      });
    }
  }
  if (cpuloan.rows) {
    cpuloan.rows.map((row) => {
      if (row.total_staked && row.payment) {
        cpu_loan += Number(row.total_staked.split(' ')[0]);
        cpu_payment += Number(row.payment.split(' ')[0]);
      }
    });
  }

  if (netloan.rows) {
    netloan.rows.map((row) => {
      if (row.total_staked && row.payment) {
        net_loan += Number(row.total_staked.split(' ')[0]);
        net_payment += Number(row.payment.split(' ')[0]);
      }
    });
  }
};

const RexDetails = ({
  account_name,
  head_block_time,
  rex_balance,
  cpuloan,
  netloan,
  isDarkMode,
  common,
  setRexInfoCollapsed
}) => {
  const {rex_collapsed} = common;
  Calculate_values(rex_balance, cpuloan, netloan, head_block_time);
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
            <i className="fa fa-exchange-alt mr-2 text-info" />
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
        {/* Render Rex Balance details */}
        {renderRexBalance(rex_balance, isDarkMode)}
        {/* Render CPU Loan details */}
        {renderCpuLoanBalance(cpuloan, isDarkMode)}
        {/* Render NET Loan details */}
        {renderNetLoanBalance(netloan, isDarkMode)}
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
