import React from 'react';
import {Query} from 'react-apollo';
import {Link} from 'react-router-dom';
import GetABI from '../../queries/GetABI';

const SmartContract = ({account_name, isDarkMode}) => {
  return (
    <Query query={GetABI} variables={{account_name: account_name}}>
      {({loading, error, data}) => {
        const {abi} = data;
        if (abi && abi.abi) {
          return (
            <div
              className={`card sameheight-item stats mbc shadow-sm ${isDarkMode ? '' : ''}`}
              style={{marginLeft: 2, marginRight: 2}}
              data-exclude="xs"
            >
              <div className="card-header card-header-sm bg-white">
                <div className="header-block pl-2 pr-2">
                  <i className="fa fa-cogs text-info mr-2" />
                  <h1 className="title text-info">
                    Smart contract
                    {/* <Link to={`/account/${account_name}`}>{account_name}</Link> */}
                  </h1>
                </div>
                <span className="badge badge-pill badge-warning mr-2">
                  <Link to={`/abi/${account_name}`}>
                    <span className="text-light"> View ABI </span>
                  </Link>
                </span>
                {/* <span className="badge badge-pill badge-warning">
                  <Link to={`/code/${account_name}`}>
                    <span className="text-light"> View code </span>
                  </Link>
                </span> */}
              </div>
            </div>
          );
        } else return <div />;
      }}
    </Query>
  );
};

export default SmartContract;
