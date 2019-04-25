import React, {Component} from 'react';
import {Router, Route, Switch} from 'react-router-dom';
import ReactGA from 'react-ga';
import LeftSideBar from './LeftSideBar';
import ErrorPage from './ErrorPage';
import Header from './Header';
import Footer from './Footer';
import history from './history';
import {connect} from 'react-redux';
import runtime from 'serviceworker-webpack-plugin/lib/runtime';
import {setSidebarStatus, setAddedToHomescreen, setDeferredPrompt} from '../actions/sidebar';
import Project from './eosio/Project';

const AppLoader = () => {
  return <div> Loading .. </div>;
};

import Loadable from 'react-loadable';

const BlockView = Loadable({
  loader: () => import('./eosio/BlockView'),
  loading: AppLoader
});

const TransactionView = Loadable({
  loader: () => import('./eosio/TransactionView'),
  loading: AppLoader
});

const Dashboard = Loadable({
  loader: () => import('./Dashboard'),
  loading: AppLoader
});

const Account = Loadable({
  loader: () => import('./eosio/Account'),
  loading: AppLoader
});

const EOSMarketCap = Loadable({
  loader: () => import('./eosio/EOSMarketCap2'),
  loading: AppLoader
});

const ABIView = Loadable({
  loader: () => import('./eosio/ABIView'),
  loading: AppLoader
});

if ('serviceWorker' in navigator) {
  const registration = runtime.register();
}

class App extends Component {
  componentDidMount() {
    ReactGA.pageview(window.location.pathname);

    window.addEventListener('beforeinstallprompt', (e) => {
      this.props.setAddedToHomescreen(false);
      this.props.setDeferredPrompt(e);
    });
  }
  render() {
    const {sidebar} = this.props;
    //Config routes for the app
    return (
      <Router history={history}>
        <div id="main-wrapper">
          <div
            className={`app ${sidebar.isSidebarHide ? 'pl_hide' : ''} ${sidebar.sidebarStatus ? 'sidebar-open' : ''} ${
              sidebar.isDarkMode ? 'bg-secondary text-cypher' : 'bg-main'
            }`}
            id="app"
          >
            <Header />
            <LeftSideBar />
            <Switch>
              <Route path="/" exact component={Dashboard} />
              <Route path="/account/:account_name" component={Account} />
              <Route path="/abi/:account_name" component={ABIView} />
              <Route path="/transaction/:id" component={TransactionView} />
              <Route path="/block/:block_num_or_id" component={BlockView} />
              <Route path="/eosmarketcap" component={EOSMarketCap} />
              <Route path="/project/:symbol" component={Project} />
              <Route component={ErrorPage} />
            </Switch>
            <Footer />
          </div>
        </div>
      </Router>
    );
  }
}

function mapStateToProps({myStore}) {
  return myStore;
}

export default connect(
  mapStateToProps,
  {setSidebarStatus, setAddedToHomescreen, setDeferredPrompt}
)(App);
