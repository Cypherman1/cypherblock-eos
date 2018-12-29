import React from 'react';
import {connect} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
const images = require.context('../assets/imgs/symbols');
const telegram_logo = images(`./telegram.png`);
const Footer = ({sidebar}) => {
  return (
    <footer
      className={`footer ${sidebar.isSidebarHide ? 'hf_hide' : ''} acc-name-font row m-0 pr-3 pl-3 ${
        sidebar.isDarkMode ? 'bg-dark border-left border-secondary' : ''
      }`}
    >
      <div className="footer-block buttons col m-0 p-0">
        <div>
          <FontAwesomeIcon icon="heart" className="mr-1 text-success" size="lg" />
          Vote for <a href="https://github.com/greymass/eos-voter"> cypherblocks</a>
        </div>
      </div>
      <div className="footer-block author col m-0 p-0">
        <div className="text-right">
          <a href="https://t.me/cypherblockio">
            <img src={telegram_logo} className="telegram_logo" /> Contact us
          </a>
        </div>
      </div>
    </footer>
  );
};

// export default Footer;

function mapStateToProps({myStore}) {
  return {sidebar: myStore.sidebar};
}

export default connect(
  mapStateToProps,
  null
)(Footer);
