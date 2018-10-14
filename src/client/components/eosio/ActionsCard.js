import React from 'react';
import ActionCardHeader from './ActionCardHeader';
import ActionsCardBody from './ActionsCardBody';
const ActionsCard = ({account_name, showRefetch, isLive}) => {
  return (
    <div className="card sameheight-item bg-white stats mb-1 border-0 pr-1 pl-1 pb-1 " data-exclude="xs">
      <ActionCardHeader account_name={account_name} />
      <ActionsCardBody account_name={account_name} showRefetch={showRefetch} isLive={isLive} />
    </div>
  );
};

export default ActionsCard;
