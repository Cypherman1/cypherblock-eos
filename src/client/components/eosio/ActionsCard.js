import React from 'react';
import ActionCardHeader from './ActionCardHeader';
import ActionsCardBody from './ActionsCardBody';
const ActionsCard = ({account_name, showRefetch, isLive, isDarkMode}) => {
  return (
    <div className={`card mb-1 border pb-1 ${isDarkMode ? 'bg-dark' : 'bg-white'} `} data-exclude="xs">
      <ActionCardHeader account_name={account_name} isDarkMode={isDarkMode} />
      <ActionsCardBody account_name={account_name} showRefetch={showRefetch} isLive={isLive} isDarkMode={isDarkMode} />
    </div>
  );
};

export default ActionsCard;
