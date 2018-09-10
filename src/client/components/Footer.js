import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
const Footer = (props) => {
  return (
    <footer className="footer acc-name-font">
      <div className="footer-block buttons ">
        <div>
          <FontAwesomeIcon icon="heart" className="mr-1 text-success" />
          For better experiences on EOSIO blockchain. Vote for{' '}
          <a href="https://eosportal.io/chain/12/producers/blockinsider"> blockinsider</a>
        </div>
      </div>
      <div className="footer-block author">
        <ul>
          {/* <li>
            created by <a href="#">Cypherblock</a>
          </li> */}
          <li>
            <a href="https://t.me/blockinsiderinfo"> Join our Telegram channel</a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
