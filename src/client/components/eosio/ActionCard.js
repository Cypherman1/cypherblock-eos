import React from 'react';
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
  children
}) => {
  return (
    <div className="card ftz-11 mb-1 shadow-sm" key={action_trace.receipt.global_sequence}>
      <div className="card-header bg-white  act-head-height pt-1 shadow-sm">
        <div className="row w-100 m-0">
          {children[0]}

          <div className="col pl-1 pr-0">
            <div className="">{children[1]}</div>
            <div className="pb-1">
              {renderBlockStatus(block_num, last_irreversible_block, head_block_num, get_block_status)}
            </div>
          </div>
          <div className="col text-right pr-2 pl-0 pt-1">
            <div className="act-date-fz"> {renderTime(block_time)} </div>
            <div>Receiver: {renderAccountLink(action_trace.receipt.receiver)}</div>
          </div>
        </div>
      </div>

      <div className="card-body border-0 p-1">
        {/* {this.renderActions(action_trace, account_name)} */}
        <div className="row m-0">
          <div className="col-12 p-0">
            <div className="row m-0">
              <div className="card sameheight-item mb-0 border-0 w-100 " data-exclude="xs">
                <div className="pr-2 pl-2"> {children[2]} </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="card-footer action_fp border-0 bg-light">
        <div className="w-100 ml-1 pr-1">
          <a
            className="badge badge-warning text-light float-right"
            data-toggle="collapse"
            href={`#collapse${action_trace.receipt.global_sequence}`}
            role="button"
            aria-expanded="false"
            aria-controls={`collapse${action_trace.receipt.global_sequence}`}
          >
            <FontAwesomeIcon icon="code" className="mr-0 text-light" /> JSON
          </a>
          <div className="collapse" id={`collapse${action_trace.receipt.global_sequence}`}>
            <JSONPretty id="json-pretty" json={action_trace} className="my-json-pretty" />
          </div>
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
  antispam
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
    >
      {RenderAct(action_trace, account_name, trx_id)}
    </ActionCommon>
  );
};

export default ActionCard;
