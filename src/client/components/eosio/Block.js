import React, {Component} from 'react';
import {Query} from 'react-apollo';
import GetBlock from '../../queries/GetBlock';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

class Block extends Component {
  render() {
    return (
      <Query
        query={GetBlock}
        variables={{
          block_num_or_id: this.props.block_num_or_id
        }}
      >
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
          const {block} = data;

          if (block) {
            return (
              <div>
                <div className="card-block ">
                  <div className="row row-sm stats-container m-0">
                    <div className="col-12 col-sm-12 stat-col pr-1 pl-1">
                      <div className="stat-icon">
                        <FontAwesomeIcon icon="cube" />
                      </div>
                      <div className="stat">
                        <div className="value ftz-11">{block.id}</div>
                        <div className="name">Block ID</div>
                      </div>
                      <div className="progress stat-progress">
                        <div
                          className="progress-bar"
                          style={{
                            width: `0%`
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          } else
            return (
              <section className="section">
                <div className="text-center">
                  <FontAwesomeIcon icon="spinner" spin className="text-info" />
                </div>
              </section>
            );
        }}
      </Query>
    );
  }
}

export default Block;
