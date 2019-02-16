import React from 'react';
import {connect} from 'react-redux';
const images = require.context('../assets/imgs/symbols');
const telegram_logo = images(`./telegram.png`);
const twitter_logo = images(`./twitter.png`);
const medium_logo = images(`./medium.png`);
const Footer = ({sidebar}) => {
  return (
    <footer
      className={`footer ${sidebar.isSidebarHide ? 'hf_hide' : ''} acc-name-font row m-0 pr-3 pl-3 ${
        sidebar.isDarkMode ? 'bg-dark border-left border-secondary' : ''
      }`}
    >
      <div className="footer-block buttons col m-0 p-0">
        <div>
          <i className="fa fa-heart text-success fa-lg mr-1" />
          Vote for <a href="https://github.com/greymass/eos-voter"> cypherblocks</a>
        </div>
      </div>
      <div className="footer-block author col m-0 p-0">
        <div className="text-right">
          <a href="https://twitter.com/tungnt2112 ">
            <img src={twitter_logo} alt="twitter" className="telegram_logo" />
          </a>
          <a href="https://medium.com/@tungnt.billing">
            <img src={medium_logo} alt="medium" className="telegram_logo"/>
          </a>
          <a href="https://t.me/cypherblockio">
            <img src={telegram_logo} alt="telegram" className="telegram_logo" /> Contact us
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
