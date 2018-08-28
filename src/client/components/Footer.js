import React from 'react';

const Footer = (props) => {
  return (
    <footer className="footer">
      <div className="footer-block buttons">
        Vote for <a href="https://eosportal.io/chain/12/producers/cypherblocks"> cypherblocks</a> to bring the best user
        experience on to EOSIO Blockchain
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
