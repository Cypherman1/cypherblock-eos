import React from 'react';
import {Link} from 'react-router-dom';
import {renderAccountLink} from '../utils/Tools';
import {renderBlockStatus, renderTime, RenderAct} from '../utils/ActionsClasify';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import JSONPretty from 'react-json-pretty';

const ActionCommon = ({
  action_trace,
  block_time,
  account_name,
  block_num,
  last_irreversible_block,
  head_block_num,
  get_block_status,
  trx_id,
  children,
  isDarkMode
}) => {
  return (
    <div
      className={`card ftz-11 border shadow-sm ${isDarkMode ? 'bg-dark text-cypher border-secondary' : ''}`}
      style={{marginBottom: 2}}
      key={action_trace.receipt.global_sequence}
    >
      <div className={`card-header act-head-height shadow-sm bg-white ${isDarkMode ? 'bg-dark text-cypher' : ''}`}>
        <div className="row w-100 m-0">
          {children[0]}
          <div className="col pl-1 pr-0">
            <div className="">
              <Link to={`/transaction/${trx_id}`}>
                {children[1]}
                <FontAwesomeIcon icon="external-link-alt" className={`ml-1 ${isDarkMode ? 'linkcolor-dark' : ''}`} />
              </Link>
            </div>
            <div>{renderBlockStatus(block_num, last_irreversible_block, head_block_num, get_block_status)}</div>
          </div>
          <div className="col text-right pr-2 pl-0 pt-1">
            <div className="act-date-fz"> {renderTime(block_time)} </div>
            <div>Receiver: {renderAccountLink(action_trace.receipt.receiver)}</div>
          </div>
        </div>
      </div>

      <div className={`card-body border-0 p-1 ${isDarkMode ? 'bg-dark text-cypher' : ''} `}>
        {/* {this.renderActions(action_trace, account_name)} */}

        <div
          className={`card sameheight-item mb-0 border-0 w-100 ${isDarkMode ? 'bg-dark text-cypher' : ''}`}
          data-exclude="xs"
        >
          <div className="pr-2 pl-2"> {children[2]} </div>
        </div>
      </div>
      <div
        className={`card-footer border-0 ${isDarkMode ? 'bg-dark' : 'bg-white'} `}
        style={{paddingBottom: 2, paddingRight: 3, paddingTop: 0}}
      >
        <a
          className="badge badge-info text-light float-right"
          style={{paddingLeft: 2, paddingRight: 6, paddingTop: 2, paddingBottom: 2}}
          data-toggle="collapse"
          href={`#collapse${action_trace.receipt.global_sequence}`}
          role="button"
          aria-expanded="true"
          aria-controls={`collapse${action_trace.receipt.global_sequence}`}
        >
          <FontAwesomeIcon icon="code" className="mr-0 text-light" /> json
        </a>
        <div className="collapse" id={`collapse${action_trace.receipt.global_sequence}`}>
          <JSONPretty id="json-pretty" json={action_trace} className="my-json-pretty" />
        </div>
      </div>
    </div>
  );
};

const ActionCard = ({
  action_trace,
  block_time,
  account_name,
  block_num,
  last_irreversible_block,
  head_block_num,
  get_block_status,
  trx_id,
  antispam,
  isDarkMode
}) => {
  return (
    <ActionCommon
      action_trace={action_trace}
      block_time={block_time}
      account_name={account_name}
      block_num={block_num}
      last_irreversible_block={last_irreversible_block}
      head_block_num={head_block_num}
      get_block_status={get_block_status}
      trx_id={trx_id}
      isDarkMode={isDarkMode}
    >
      {RenderAct(action_trace, account_name, trx_id, isDarkMode)}
    </ActionCommon>
  );
};

export default ActionCard;
