import React, {Component} from 'react';
import {Router, Route, Switch} from 'react-router-dom';
import Dashboard from './Dashboard';
import LeftSideBar from './LeftSideBar';
import Header from './Header';
import Footer from './Footer';
import history from './history';
import {connect} from 'react-redux';
import {setSidebarStatus} from '../actions/sidebar';
import Account from './eosio/Account';
import TransactionView from './eosio/TransactionView';
import BlockView from './eosio/BlockView';
import BlockProducers from './eosio/BlockProducers';
import EOSMarketCap from './eosio/EOSMarketCap2';
import Project from './eosio/Project';

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

// const Account = (props) => (
//   <DynamicImport load={() => import('./eosio/Account')}>
//     {(Component) => (Component === null ? <p>Loading</p> : <Component {...props} />)}
//   </DynamicImport>
// );

const CodeView = (props) => (
  <DynamicImport load={() => import('./eosio/CodeView')}>
    {(Component) => (Component === null ? <p>Loading</p> : <Component {...props} />)}
  </DynamicImport>
);

const ABIView = (props) => (
  <DynamicImport load={() => import('./eosio/ABIView')}>
    {(Component) => (Component === null ? <p>Loading</p> : <Component {...props} />)}
  </DynamicImport>
);

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

class App extends Component {
  render() {
    const {sidebarStatus, isDarkMode} = this.props.sidebar;
    return (
      <Router history={history}>
        <div id="main-wrapper">
          <div
            className={`app ${sidebarStatus ? 'sidebar-open' : ''} ${
              isDarkMode ? 'bg-secondary text-cypher' : 'bg-main'
            }`}
            id="app"
          >
            <Header />
            <LeftSideBar />
            <Switch>
              <Route path="/" exact component={Dashboard} />
              <Route path="/account/:account_name" component={Account} />
              <Route path="/code/:account_name" component={CodeView} />
              <Route path="/abi/:account_name" component={ABIView} />
              <Route path="/transaction/:id" component={TransactionView} />
              <Route path="/block/:block_num_or_id" component={BlockView} />
              <Route path="/blockproducers" component={BlockProducers} />
              <Route path="/eosmarketcap" component={EOSMarketCap} />
              <Route path="/project/:symbol" component={Project} />
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
  {setSidebarStatus}
)(App);
