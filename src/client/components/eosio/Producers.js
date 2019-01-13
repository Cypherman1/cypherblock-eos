import React, {Component} from 'react';
import {CSSTransitionGroup} from 'react-transition-group';
import {Query} from 'react-apollo';
import GetProducers from '../../queries/GetProducers';
import {renderAccountLink} from '../utils/Tools';
import {renderProRank} from '../utils/RenderColors';

const ProducersLoading = ({display, isDarkMode}) => {
  return (
    <div className={`card sameheight-item stats ${isDarkMode ? 'bg-dark' : ''} ${display}`} data-exclude="xs">
      <div className="card-header shadow-sm bg-white">
        <div className="header-block pl-2">
          <i className="fa fa-user-cog mr-2 text-info fa-lg" />
          <h1 className="title text-info ">Top block producers</h1>
        </div>
      </div>
      <div className="card-block p-0">
        <div className="text-center align-middle overlay" style={{paddingTop: 68}}>
          <i className="fa fa-spinner fa-spin text-info fa-2x" />
        </div>
        <div className="title-block row shadow-sm m-0">
          <div className="col-12 col-sm-12 header-col p-0">
            <div className="row shadow-sm price-row">
              <div className="col float-left price-font pl-2" />
              <div className="col text-right price-font pr-1">Vote (%)</div>
            </div>
          </div>
        </div>
        <div className="row row-sm stats-container shadow-sm m-0 pb-1 plheight" />
      </div>
    </div>
  );
};

class Producers extends Component {
  renderProducer(producer, index, total_producer_vote_weight, isDarkMode) {
    return (
      <div
        className={`card-token-price d-flex flex-row justify-content-between shadow-sm pb-1 ${
          isDarkMode ? 'bg-dark' : ''
        }`}
        key={producer.owner}
        style={{marginBottom: 2, marginTop: 1}}
      >
        <div className="p-0 ">
          <div className="stat-icon">{renderProRank(index)}</div>
          <div className="stat">
            <div className="value ftz-13">{renderAccountLink(producer.owner)}</div>
            <div className="name">
              <a href={producer.url} target="_blank" rel="noopener" className="font-weight-acttype ftz-12">
                {producer.url}
              </a>
            </div>
          </div>
        </div>
        <div className="p-0">
          <div className="stat float-right pt-3 ftz-11 ">
            {((Number(producer.total_votes) / Number(total_producer_vote_weight)) * 100).toLocaleString('en', {
              minimumFractionDigits: 4
            })}%
          </div>
        </div>
      </div>
    );
  }
  render() {
    const {display, isDarkMode} = this.props;
    return (
      <Query
        query={GetProducers}
        variables={{
          limit: this.props.limit,
          lower_bound: this.props.lower_bound
        }}
      >
        {({loading, error, data}) => {
          if (loading) return <ProducersLoading display={display} isDarkMode={isDarkMode} />;
          if (error) return <ProducersLoading display={display} isDarkMode={isDarkMode} />;
          const {producers} = data;
          if (producers) {
            return (
              <div
                className={`card  sameheight-item stats mb-1 ${isDarkMode ? 'bg-dark' : ''} ${display}`}
                data-exclude="xs"
              >
                <div className={`card-header shadow-sm mb-1 ${isDarkMode ? 'bg-dark' : 'bg-white'}`}>
                  <div className="header-block pl-2">
                    <i className="fa fa-user-cog text-info fa-lg mr-2" />
                    <h1 className="title text-info ">Top block producers</h1>
                  </div>
                </div>
                <div className={`card-body p-0 ${isDarkMode ? 'bg-dark' : 'bg-white'}`}>
                  <div className="title-block row shadow-sm m-0 ">
                    <div className={`col-12 col-sm-12 ${isDarkMode ? 'bg-dark' : 'bg-white'} header-col p-0`}>
                      <div className="row shadow-sm price-row ">
                        <div className="col float-left price-font pl-2" />
                        <div className="col text-right price-font pr-1 text-info ftz-10">Vote (%)</div>
                      </div>
                    </div>
                  </div>
                  <CSSTransitionGroup
                    transitionName="example"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={300}
                  >
                    {producers.rows.map((producer, index) => {
                      return this.renderProducer(producer, index + 1, producers.total_producer_vote_weight, isDarkMode);
                    })}
                  </CSSTransitionGroup>
                </div>
              </div>
            );
          } else {
            return (
              <div className={display}>
                <ProducersLoading display={display} isDarkMode={isDarkMode} />
              </div>
            );
          }
        }}
      </Query>
    );
  }
}

export default Producers;
