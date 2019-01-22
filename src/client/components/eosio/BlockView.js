import React from 'react';
import {connect} from 'react-redux';
import {Helmet} from 'react-helmet';
import Block from './Block';
import ErrorBoundary from '../ErrorBoundary';

const BlockView = ({match, sidebar}) => {
  return (
    <article className="content dashboard-page">
      <Helmet>
        <title>Block | Cypherblock | EOS Block Explorer </title>
      </Helmet>
      <section className="section">
        <div className="row m-0">
          <div className="col col-12 col-sm-12 col-md-12 col-l-12 col-xl-12 pd-col">
            <div className={`card sameheight-item stats ${sidebar.isDarkMode ? 'bg-dark' : ''} mbc`} data-exclude="xs">
              <div className="card-header  bg-white shadow-sm">
                <div className="header-block pl-2">
                  <i className="fa fa-cube text-info fa-lg mr-2" />
                  <h1 className="title text-info">Block</h1>
                </div>
              </div>
              <ErrorBoundary>
                <Block block_num_or_id={match.params.block_num_or_id} isDarkMode={sidebar.isDarkMode} />
              </ErrorBoundary>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
};

function mapStateToProps({myStore}) {
  return {sidebar: myStore.sidebar};
}

export default connect(
  mapStateToProps,
  null
)(BlockView);
