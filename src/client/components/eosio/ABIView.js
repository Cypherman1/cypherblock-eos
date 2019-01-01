import React from 'react';
import {Query} from 'react-apollo';
import JSONPretty from 'react-json-pretty';
import {Helmet} from 'react-helmet';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
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
                <meta
                  name="keywords"
                  content="eos, eosio, eos block explorer, account, transaction, block, balance, RAM, voting, block producer, token, airdrop, price, wallet, dapp, project, marketcap, blockchain, mainnet, crypto, currency"
                />
                <meta name="title" content="Smart Contract | Cypherblock | EOS Block Explorer" />
                <meta
                  name="description"
                  content="Cypherblock | One of top EOS Block Explorer showing account, RAM, token, airdrop, price, voting, smart contract, transaction, dapp on EOSIO blockchain mainet"
                />
                <meta property="og:title" content="Smart Contract | Cypherblock | EOS Block Explorer " />
                <meta
                  property="og:description"
                  content="Cypherblock | One of top EOS Block Explorer showing account, RAM, token, airdrop, price, voting, smart contract, transaction, dapp on EOSIO blockchain mainet"
                />
                <meta name="twitter:title" content="Smart Contract | Cypherblock | EOS Block Explorer " />
                <meta
                  name="twitter:description"
                  content="Cypherblock | One of top EOS Block Explorer showing account, RAM, token, airdrop, price, voting, smart contract, transaction,  dapp on EOSIO blockchain mainet"
                />
              </Helmet>
              <section className="section">
                <div className="text-center">
                  <FontAwesomeIcon icon="spinner" spin className="text-info" />
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
                  <FontAwesomeIcon icon="spinner" spin className="text-info" />
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
