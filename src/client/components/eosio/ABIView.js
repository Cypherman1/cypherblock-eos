import React from 'react';
import {Query} from 'react-apollo';
import JSONPretty from 'react-json-pretty';
import {Helmet} from 'react-helmet';

import GetABI from '../../queries/GetABI';

import 'react-json-pretty/JSONPretty.acai.styl';

const ABIView = ({match}) => {
  return (
    <Query query={GetABI} variables={{account_name: match.params.account_name}}>
      {({loading, error, data}) => {
        if (loading)
          return (
            <article className="content dashboard-page">
              <Helmet>
                <title>Smart Contract | Cypherblock | EOS Block Explorer </title>
              </Helmet>
              <section className="section">
                <div className="text-center">
                  <i className="fa fa-spinner fa-spin text-info fa-2x" />
                </div>
              </section>
            </article>
            //   );
          );

        if (error)
          return (
            <article className="content dashboard-page">
              <section className="section">
                <div className="text-center">
                  <i className="fa fa-spinner fa-spin text-info fa-2x" />
                </div>
              </section>
            </article>
          );
        const {abi} = data;
        return (
          <article className="content dashboard-page">
            <section className="section">
              {/* <div className="card sameheight-item stats" data-exclude="xs"> */}
              <JSONPretty id="json-pretty" json={abi.abi} className="my-json-pretty" />
              {/* </div> */}
            </section>
          </article>
        );
      }}
    </Query>
  );
};

export default ABIView;
