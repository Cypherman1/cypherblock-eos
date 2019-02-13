import React, {Component} from 'react';
import {Router, Route, Switch} from 'react-router-dom';
import ReactGA from 'react-ga';
// import Dashboard from './Dashboard';
import LeftSideBar from './LeftSideBar';
import ErrorPage from './ErrorPage';
import Header from './Header';
import Footer from './Footer';
import SocialShare from './eosio/SocialShare';
import history from './history';
import {connect} from 'react-redux';
import runtime from 'serviceworker-webpack-plugin/lib/runtime';
import {setSidebarStatus, setAddedToHomescreen, setDeferredPrompt} from '../actions/sidebar';
// import Account from './eosio/Account';
// import TransactionView from './eosio/TransactionView';
// import BlockView from './eosio/BlockView';
import BlockProducers from './eosio/BlockProducers';
// import EOSMarketCap from './eosio/EOSMarketCap2';
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

// class DynamicImport extends Component {
//   state = {
//     component: null
//   };
//   componentDidMount() {
//     this.props.load().then((component) => {
//       this.setState(() => ({
//         component: component.default ? component.default : component
//       }));
//     });
//   }
//   render() {
//     return this.props.children(this.state.component);
//   }
// }

// const Account = (props) => (
//   <DynamicImport load={() => import('./eosio/Account')}>
//     {(Component) => (Component === null ? <p>Loading</p> : <Component {...props} />)}
//   </DynamicImport>
// );

// const CodeView = Loadable({
//   loader: () => import('./eosio/CodeView'),
//   loading: AppLoader
// });

const ABIView = Loadable({
  loader: () => import('./eosio/ABIView'),
  loading: AppLoader
});

// const CodeView = (props) => (
//   <DynamicImport load={() => import('./eosio/CodeView')}>
//     {(Component) => (Component === null ? <p>Loading</p> : <Component {...props} />)}
//   </DynamicImport>
// );

// const ABIView = (props) => (
//   <DynamicImport load={() => import('./eosio/ABIView')}>
//     {(Component) => (Component === null ? <p>Loading</p> : <Component {...props} />)}
//   </DynamicImport>
// );

// const TransactionView = (props) => (
//   <DynamicImport load={() => import('./eosio/TransactionView')}>
//     {(Component) => (Component === null ? <p>Loading</p> : <Component {...props} />)}
//   </DynamicImport>
// );

// const BlockView = (props) => (
//   <DynamicImport load={() => import('./eosio/BlockView')}>
//     {(Component) => (Component === null ? <p>Loading</p> : <Component {...props} />)}
//   </DynamicImport>
// );

if ('serviceWorker' in navigator) {
  const registration = runtime.register();
}

class App extends Component {
  componentDidMount() {
    ReactGA.pageview(window.location.pathname);

    window.addEventListener('beforeinstallprompt', (e) => {
      this.props.setAddedToHomescreen(false);
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      // e.preventDefault();
      // Stash the event so it can be triggered later.

      this.props.setDeferredPrompt(e);
    });
  }
  render() {
    const {sidebar} = this.props;

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
              {/* <Route path="/code/:account_name" component={CodeView} /> */}
              <Route path="/abi/:account_name" component={ABIView} />
              <Route path="/transaction/:id" component={TransactionView} />
              <Route path="/block/:block_num_or_id" component={BlockView} />
              <Route path="/blockproducers" component={BlockProducers} />
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
