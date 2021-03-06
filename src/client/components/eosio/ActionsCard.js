/*H********************************************************************************
* DESCRIPTION :
*         ActionsCard component shows the account's actions 
*         It contains ActionCardHeader, ActionCardBody components    
*/
import React from 'react';
import ActionCardHeader from './ActionCardHeader';
import ActionsCardBody from './ActionsCardBody';

const ActionsCard = ({account_name, showRefetch, isLive, isDarkMode, defaultLimit}) => {
  return (
    <div className={`card mb-1 pb-1 ${isDarkMode ? 'bg-dark' : 'bg-white'} `} data-exclude="xs">
      <ActionCardHeader account_name={account_name} isDarkMode={isDarkMode} defaultLimit={defaultLimit} />
      <ActionsCardBody account_name={account_name} showRefetch={showRefetch} isLive={isLive} isDarkMode={isDarkMode} />
    </div>
  );
};

export default ActionsCard;
