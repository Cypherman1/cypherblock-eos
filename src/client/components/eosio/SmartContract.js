import React, {Component} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Query} from 'react-apollo';
import {Link} from 'react-router-dom';
import GetABI from '../../queries/GetABI';

class SmartContract extends Component {
  render() {
    return (
      <Query query={GetABI} variables={{account_name: this.props.account_name}}>
        {({loading, error, data}) => {
          if (loading)
            return (
              <section className="section">
                <div className="text-center">
                  <FontAwesomeIcon icon="spinner" spin className="text-info" />
                </div>
              </section>
              //   );
            );
          if (error)
            return (
              <section className="section">
                <div className="text-center">
                  <FontAwesomeIcon icon="spinner" spin className="text-info" />
                </div>
              </section>
            );
          const {abi} = data;
          if (abi && abi.abi) {
            return (
              <div className="card sameheight-item stats mbc" data-exclude="xs">
                <div className="card-header card-header-sm bg-light shadow-sm">
                  <div className="header-block pl-2 pr-2">
                    <FontAwesomeIcon icon="cogs" className="mr-2 text-info" />
                    <h5 className="title text-info">
                      Smart contract
                      {/* <Link to={`/account/${account_name}`}>{account_name}</Link> */}
                    </h5>
                  </div>
                  <span className="badge badge-pill badge-secondary mr-2">
                    <Link to={`/abi/${this.props.account_name}`}>
                      <span className="text-light"> View ABI </span>
                    </Link>
                  </span>
                  <span className="badge badge-pill badge-secondary">
                    <Link to={`/code/${this.props.account_name}`}>
                      <span className="text-light"> View code </span>
                    </Link>
                  </span>
                </div>
              </div>
            );
          } else return <div />;
        }}
      </Query>
    );
  }
}

export default SmartContract;
