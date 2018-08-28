import React from 'react';

const Footer = (props) => {
  return (
    <footer className="footer">
      <div className="footer-block buttons">
        Vote for better user experiences on EOSIO Blockchain. Vote for{' '}
        <a href="https://eosportal.io/chain/12/producers/cypherblocks"> cypherblocks</a>
      </div>
      <div className="footer-block author">
        <ul>
          <li>
            created by <a href="#">Cypherblock</a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
