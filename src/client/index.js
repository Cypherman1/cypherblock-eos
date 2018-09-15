import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-client';
import {ApolloProvider} from 'react-apollo';
// import { Router, hashHistory, Route, IndexRoute } from "react-router";
import {Router, Route, Switch} from 'react-router-dom';

import {ApolloLink} from 'apollo-link';
import {createHttpLink} from 'apollo-link-http';
import {onError} from 'apollo-link-error';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import reduxThunk from 'redux-thunk';

import reducers from './reducers';

import './assets/css/app-blue.css';
//import './assets/css/vendor.css';
import './assets/css/custom.css';
import 'bootstrap/dist/css/bootstrap.min.css';
//import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'react-toastify/dist/ReactToastify.css';
import './assets/css/metisMenu.min.css';
import './assets/js/metisMenu.min.js';
import './assets/js/sidebar.js';
import './bp.json';
// import './components/utils/sidebar.js';

import {library} from '@fortawesome/fontawesome-svg-core';
import {
  faMemory,
  faBolt,
  faMicrochip,
  faLock,
  faLockOpen,
  faKey,
  faSpinner,
  faBars,
  faSearch,
  faHome,
  faChalkboardTeacher,
  faListAlt,
  faUser,
  faWallet,
  faDollarSign,
  faChartLine,
  faChartBar,
  faChartPie,
  faCoins,
  faCubes,
  faCube,
  faClock,
  faUserCog,
  faCogs,
  faThumbsUp,
  faShoppingBag,
  faShoppingBasket,
  faGavel,
  faBatteryFull,
  faHeart,
  faHandHoldingHeart,
  faSyncAlt,
  faList,
  faTasks,
  faTable,
  faCircle
} from '@fortawesome/free-solid-svg-icons';

// import './assets/css/all.css';
import Dashboard from './components/Dashboard';
import LeftSideBar from './components/LeftSideBar';
import Header from './components/Header';
import Footer from './components/Footer';
import history from './components/history';

library.add(
  faMemory,
  faBolt,
  faMicrochip,
  faLock,
  faLockOpen,
  faKey,
  faSpinner,
  faBars,
  faSearch,
  faHome,
  faChalkboardTeacher,
  faListAlt,
  faUser,
  faWallet,
  faDollarSign,
  faChartLine,
  faChartBar,
  faChartPie,
  faCoins,
  faCubes,
  faCube,
  faClock,
  faUserCog,
  faCogs,
  faThumbsUp,
  faShoppingBag,
  faShoppingBasket,
  faGavel,
  faBatteryFull,
  faHeart,
  faHandHoldingHeart,
  faSyncAlt,
  faList,
  faTasks,
  faTable,
  faCircle
);

class DynamicImport extends Component {
  state = {
    component: null
  };
  componentDidMount() {
    this.props.load().then((component) => {
      this.setState(() => ({
        component: component.default ? component.default : component
      }));
    });
  }
  render() {
    return this.props.children(this.state.component);
  }
}

const Account = (props) => (
  <DynamicImport load={() => import('./components/eosio/Account')}>
    {(Component) => (Component === null ? <p>Loading</p> : <Component {...props} />)}
  </DynamicImport>
);

const CodeView = (props) => (
  <DynamicImport load={() => import('./components/eosio/CodeView')}>
    {(Component) => (Component === null ? <p>Loading</p> : <Component {...props} />)}
  </DynamicImport>
);

const ABIView = (props) => (
  <DynamicImport load={() => import('./components/eosio/ABIView')}>
    {(Component) => (Component === null ? <p>Loading</p> : <Component {...props} />)}
  </DynamicImport>
);

const TransactionView = (props) => (
  <DynamicImport load={() => import('./components/eosio/TransactionView')}>
    {(Component) => (Component === null ? <p>Loading</p> : <Component {...props} />)}
  </DynamicImport>
);

const BlockView = (props) => (
  <DynamicImport load={() => import('./components/eosio/BlockView')}>
    {(Component) => (Component === null ? <p>Loading</p> : <Component {...props} />)}
  </DynamicImport>
);

const errorLink = onError(({graphQLErrors, networkError, operation, response}) => {
  if (graphQLErrors)
    graphQLErrors.map(({message, locations, path}) => {
      console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`);
      if (message == 'Request failed with status code 503') if (response) response.errors = null;
    });
  if (networkError) if (response) response.errors = null;
  // console.log(`[Network error]: ${networkError}`);
});

const httpLink = createHttpLink({uri: '/graphql'});

const link = ApolloLink.from([errorLink, httpLink]);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  queryDeduplication: true
});

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <Router history={history}>
          <div id="main-wrapper">
            <div className="app" id="app">
              <Header />
              <LeftSideBar />
              <Switch>
                <Route path="/" exact component={Dashboard} />
                <Route path="/account/:account_name" component={Account} />
                <Route path="/code/:account_name" component={CodeView} />
                <Route path="/abi/:account_name" component={ABIView} />
                <Route path="/transaction/:id" component={TransactionView} />
                <Route path="/block/:block_num_or_id" component={BlockView} />
              </Switch>
              <Footer />
            </div>
          </div>
        </Router>
      </Provider>
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.querySelector('#root'));
