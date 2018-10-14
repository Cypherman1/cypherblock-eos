import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-client';
import {ApolloProvider} from 'react-apollo';
import {ApolloLink} from 'apollo-link';
import {createHttpLink} from 'apollo-link-http';
import {onError} from 'apollo-link-error';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import reduxThunk from 'redux-thunk';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import reducers from './reducers';

import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/app-blue.css';
import './assets/css/custom.css';
import './assets/css/shards.css';
import 'react-toastify/dist/ReactToastify.css';
// import './assets/css/metisMenu.min.css';
//import './assets/js/popper.min.js';
import './bp.json';
import App from './components/App';
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
  faCircle,
  faCode,
  faInfoCircle,
  faArrowAltCircleDown,
  faUserLock,
  faGlobe,
  faCog,
  faChevronCircleRight
} from '@fortawesome/free-solid-svg-icons';

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
  faCircle,
  faCode,
  faInfoCircle,
  faArrowAltCircleDown,
  faUserLock,
  faGlobe,
  faCog,
  faChevronCircleRight
);

const errorLink = onError(({graphQLErrors, networkError, operation, response}) => {
  if (graphQLErrors)
    graphQLErrors.map(({message, locations, path}) => {
      // console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`);
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
        <App />
      </Provider>
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.querySelector('#root'));
