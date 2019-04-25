/*H************************************************************************************
* DESCRIPTION :
*       Wallet component shows the account's Assets|Airdrops balance and value.
*       It contains WalletHeader and WalletBody components.
*/
import React from 'react';
import WalletHeader from './WalletHeader';
import WalletBody from './WalletBody';

const Wallet = ({isDarkMode, account_name}) => {
  return (
    <div className={`${isDarkMode ? 'bg-dark' : ' bg-actions'} card sameheight-item stats mb-1 `} data-exclude="xs">
      <WalletHeader isDarkMode={isDarkMode} />
      <WalletBody account_name={account_name} isDarkMode={isDarkMode} />
    </div>
  );
};

export default Wallet;
