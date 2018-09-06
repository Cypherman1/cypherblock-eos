import React, {Component} from 'react';
import {CSSTransitionGroup} from 'react-transition-group';
import {Query} from 'react-apollo';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import GetProducers from '../../queries/GetProducers';
import {renderAccountLink} from '../utils/Tools';
import {renderProRank} from '../utils/RenderColors';

class Producers extends Component {
  renderProducer(producer, index, total_producer_vote_weight) {
    return (
      <div className="row row-sm stats-container border-bottom m-0 pb-1" key={producer.owner}>
        <div className="col-8 stat-col p-0">
          <div className="stat-icon">{renderProRank(index)}</div>
          <div className="stat">
            <div className="value">{renderAccountLink(producer.owner)}</div>

            <div className="name">
              <a href={producer.url}> {producer.url} </a>{' '}
            </div>
          </div>
        </div>
        <div className="col-4 p-0">
          <div className="stat float-right pt-3 ftz-11 font-weight-bold">
            {((Number(producer.total_votes) / Number(total_producer_vote_weight)) * 100).toLocaleString('en', {
              minimumFractionDigits: 4
            })}%
          </div>
        </div>
      </div>
    );
  }
  render() {
    return (
      <Query
        query={GetProducers}
        variables={{
          limit: this.props.limit,
          lower_bound: this.props.lower_bound
        }}
      >
        {({loading, error, data}) => {
          if (loading)
            return (
              <section className="section container">
                <div className="text-center">
                  <FontAwesomeIcon icon="spinner" spin className="text-info" />
                </div>
              </section>
              //   );
            );
          if (error)
            return (
              <section className="section container">
                <div className="text-center">
                  <FontAwesomeIcon icon="spinner" spin className="text-info" />
                </div>
              </section>
            );
          const {producers} = data;
          if (producers) {
            return (
              <div className="card sameheight-item stats" data-exclude="xs">
                <div className="card-header card-header-sm bg-light shadow-sm">
                  <div className="header-block pl-2">
                    <FontAwesomeIcon icon="user-cog" className="mr-2 text-info" />
                    <h5 className="title text-info ">Top producers</h5>
                  </div>
                </div>
                <div className="card-block">
                  <div className="title-block row ">
                    <div className="col-12 col-sm-12 header-col">
                      <div className="row border-bottom price-row">
                        <div className="col float-left price-font pl-2" />
                        <div className="col text-right price-font pr-1">Vote (%)</div>
                      </div>
                    </div>
                  </div>
                  <CSSTransitionGroup
                    transitionName="example"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={300}
                  >
                    {producers.rows.map((producer, index) => {
                      return this.renderProducer(producer, index + 1, producers.total_producer_vote_weight);
                    })}
                  </CSSTransitionGroup>
                </div>
              </div>
            );
          } else {
            return (
              <section className="section container">
                <div className="text-center">
                  <FontAwesomeIcon icon="spinner" spin className="text-info" />
                </div>
              </section>
            );
          }
        }}
      </Query>
    );
  }
}

export default Producers;
