import React from 'react';
import ReactGA from 'react-ga';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-client';
import {ApolloProvider} from 'react-apollo';
import {ApolloLink} from 'apollo-link';
import {createHttpLink} from 'apollo-link-http';
import {onError} from 'apollo-link-error';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {Provider} from 'react-redux';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
require('typeface-poppins');
import {mainstore} from './store';

// import './assets/css/all.min.css';
import './assets/css/bootstrap.css';
import './assets/fontawesome/css/all.css';
import 'react-toastify/dist/ReactToastify.css';
import './assets/css/custom.css';
import './bp.json';
import App from './components/App';

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

// Rea ctGA.initialize('UA-125792941-1');

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Provider store={mainstore}>
        <App />
      </Provider>
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.querySelector('#root'));
