import React from 'react';

import WalletHeader from './WalletHeader';
import WalletBody from './WalletBody';

const Wallet = ({isDarkMode, account_name}) => {
  // Create AllTokens array containing all Token infomation: Token_name, balance, price, percent,...
  return (
    <div className={`${isDarkMode ? 'bg-dark' : ' bg-actions'} card sameheight-item stats mb-1 `} data-exclude="xs">
      <WalletHeader isDarkMode={isDarkMode} />
      <WalletBody account_name={account_name} isDarkMode={isDarkMode} />
    </div>
  );
};

export default Wallet;

// export default Wallet;
