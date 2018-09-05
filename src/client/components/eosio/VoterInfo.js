import React, {Component} from 'react';
import {Query} from 'react-apollo';
import GetVoterInfo from '../../queries/GetVoterInfo';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {renderAccountLink} from '../utils/Tools';

const NoVote = () => {
  return (
    <div className="card sameheight-item stats mbc" data-exclude="xs">
      <div className="card-header card-header-sm bg-light shadow-sm">
        <div className="header-block pl-2">
          <FontAwesomeIcon icon="gavel" className="mr-2 text-info" />
          <h5 className="title text-info">
            Voter info
            {/* <Link to={`/account/${account_name}`}>{account_name}</Link> */}
          </h5>
        </div>
      </div>
      <div className="card-block text-danger ftz-12">
        <div> No producer voted</div>
      </div>
    </div>
  );
};

class VoterInfo extends Component {
  renderVotedProducers(producers) {
    let items = [];
    producers.map((producer) => {
      items.push(
        <div className="d-inline-block mr-2 ftz-12" key={producer}>
          {renderAccountLink(producer)}
        </div>
      );
    });
    return items;
  }

  render() {
    return (
      <Query query={GetVoterInfo} variables={{account_name: this.props.account_name}}>
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
          const {voteinfo} = data;
          if (voteinfo) {
            if (voteinfo.is_proxy == 0) {
              if (voteinfo.producers.length > 0 || voteinfo.proxy) {
                if (!voteinfo.proxy)
                  return (
                    <div className="card sameheight-item stats mbc" data-exclude="xs">
                      <div className="card-header card-header-sm bg-light shadow-sm">
                        <div className="header-block pl-2">
                          <FontAwesomeIcon icon="gavel" className="mr-2 text-info" />
                          <h5 className="title text-info">
                            Voter info
                            {/* <Link to={`/account/${account_name}`}>{account_name}</Link> */}
                          </h5>
                        </div>
                      </div>
                      <div className="card-block row row-sm m-0 pb-0">
                        <div className="col-12 col-sm-5 col-md-4 pl-1 pr-1 m-0">
                          <div className="stat-icon">
                            <FontAwesomeIcon icon="heart" />
                          </div>
                          <div className="stat">
                            <div className="value">{Number(voteinfo.last_vote_weight).toLocaleString()}</div>
                            <div className="name">Last vote weight</div>
                          </div>
                          <div className="progress stat-progress">
                            <div
                              className="progress-bar"
                              style={{
                                width: `0%`
                              }}
                            />
                          </div>
                          <div className="stat-icon">
                            <FontAwesomeIcon icon="hand-holding-heart" />
                          </div>
                          <div className="stat">
                            <div className="value">{voteinfo.producers.length}</div>
                            <div className="name"> Num of voted producers</div>
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

                        <div className="col-12 col-sm-7 col-md-8  pr-0 pl-1">
                          <div className="card sameheight-item mb-1" data-exclude="xs">
                            <div className="card-header card-header-sm bg-light shadow-sm row m-0">
                              <div className="header-block pl-2 col">
                                <FontAwesomeIcon icon="user-cog" className="mr-2 text-info" />
                                <h5 className="title text-info ftz-12">Voted producers</h5>
                              </div>
                            </div>

                            <div className="p-2"> {this.renderVotedProducers(voteinfo.producers)}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                else {
                  return (
                    <div className="card sameheight-item stats mbc" data-exclude="xs">
                      <div className="card-header card-header-sm bg-light shadow-sm">
                        <div className="header-block pl-2">
                          <FontAwesomeIcon icon="gavel" className="mr-2 text-info" />
                          <h5 className="title text-info">
                            Voter info
                            {/* <Link to={`/account/${account_name}`}>{account_name}</Link> */}
                          </h5>
                        </div>
                      </div>
                      <div className="card-block row row-sm m-0">
                        <div className="col-12 col-sm-5 col-md-4 pl-1 pr-1 m-0">
                          <div className="stat-icon">
                            <FontAwesomeIcon icon="heart" />
                          </div>
                          <div className="stat">
                            <div className="value">{Number(voteinfo.last_vote_weight).toLocaleString()}</div>
                            <div className="name">Last vote weight</div>
                          </div>
                          <div className="progress stat-progress">
                            <div
                              className="progress-bar"
                              style={{
                                width: `0%`
                              }}
                            />
                          </div>
                          <div className="stat-icon">
                            <FontAwesomeIcon icon="hand-holding-heart" />
                          </div>
                          <div className="stat">
                            <div className="value">{voteinfo.proxy_vote_info.producers.length}</div>
                            <div className="name"> Num of voted producers</div>
                          </div>
                          <div className="progress stat-progress">
                            <div
                              className="progress-bar"
                              style={{
                                width: `0%`
                              }}
                            />
                          </div>
                          <div className="stat-icon">
                            <FontAwesomeIcon icon="user-cog" />
                          </div>
                          <div className="stat">
                            <div className="value">{renderAccountLink(voteinfo.proxy)}</div>
                            <div className="name">Vote by proxy</div>
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
                        <div className="col-12 col-sm-7 col-md-8  pr-0 pl-1">
                          <div className="card sameheight-item mb-1" data-exclude="xs">
                            <div className="card-header card-header-sm bg-light shadow-sm row m-0">
                              <div className="header-block pl-2 col">
                                <FontAwesomeIcon icon="user-cog" className="mr-2 text-info" />
                                <h5 className="title text-info ftz-12">Voted producers</h5>
                              </div>
                            </div>

                            <div className="p-2"> {this.renderVotedProducers(voteinfo.producers)}</div>
                          </div>
                        </div>
                      </div>
                      <div />
                    </div>
                  );
                }
              } else {
                return <NoVote />;
              }
            } else {
              if (voteinfo.producers.length > 0 || voteinfo.proxy) {
                if (!voteinfo.proxy)
                  return (
                    <div className="card sameheight-item stats mbc" data-exclude="xs">
                      <div className="card-header card-header-sm bg-light shadow-sm">
                        <div className="header-block pl-2 pr-2">
                          <FontAwesomeIcon icon="gavel" className="mr-2 text-info" />
                          <h5 className="title text-info">
                            Voter info
                            {/* <Link to={`/account/${account_name}`}>{account_name}</Link> */}
                          </h5>
                        </div>
                        <span className="badge badge-pill badge-primary mb-2">Proxy</span>
                      </div>
                      <div className="card-block row row-sm m-0">
                        <div className="col-12 col-sm-5 col-md-4 pl-1 pr-1 m-0">
                          <div className="stat-icon">
                            <FontAwesomeIcon icon="heart" />
                          </div>
                          <div className="stat">
                            <div className="value">{Number(voteinfo.last_vote_weight).toLocaleString()}</div>
                            <div className="name">Last vote weight</div>
                          </div>
                          <div className="progress stat-progress">
                            <div
                              className="progress-bar"
                              style={{
                                width: `0%`
                              }}
                            />
                          </div>
                          <div className="stat-icon">
                            <FontAwesomeIcon icon="heart" />
                          </div>
                          <div className="stat">
                            <div className="value">{Number(voteinfo.proxied_vote_weight).toLocaleString()}</div>
                            <div className="name">Proxied vote weight</div>
                          </div>
                          <div className="progress stat-progress" />
                          <div
                            className="progress-bar"
                            style={{
                              width: `0%`
                            }}
                          />
                          <div className="stat-icon">
                            <FontAwesomeIcon icon="hand-holding-heart" />
                          </div>
                          <div className="stat">
                            <div className="value">{voteinfo.producers.length}</div>
                            <div className="name"> Num of voted producers</div>
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
                        <div className="col-12 col-sm-7 col-md-8  pr-0 pl-1">
                          <div className="card sameheight-item mb-1" data-exclude="xs">
                            <div className="card-header card-header-sm bg-light shadow-sm row m-0">
                              <div className="header-block pl-2 col">
                                <FontAwesomeIcon icon="user-cog" className="mr-2 text-info" />
                                <h5 className="title text-info ftz-12">Voted producers</h5>
                              </div>
                            </div>

                            <div className="p-2"> {this.renderVotedProducers(voteinfo.producers)}</div>
                          </div>
                        </div>
                      </div>
                      <div />
                    </div>
                  );
                else {
                  return (
                    <div className="card sameheight-item stats mbc" data-exclude="xs">
                      <div className="card-header card-header-sm bg-light shadow-sm">
                        <div className="header-block pl-2">
                          <FontAwesomeIcon icon="gavel" className="mr-2 text-info" />
                          <h5 className="title text-info">
                            Voter info
                            {/* <Link to={`/account/${account_name}`}>{account_name}</Link> */}
                          </h5>
                        </div>
                      </div>
                      <div className="card-block row row-sm m-0">
                        <div className="col-12 col-sm-5 col-md-4 pl-1 pr-1 m-0">
                          <div className="stat-icon">
                            <FontAwesomeIcon icon="coins" />
                          </div>
                          <div className="stat">
                            <div className="value">{Number(voteinfo.last_vote_weight).toLocaleString()}</div>
                            <div className="name">Last vote weight</div>
                          </div>
                          <div className="progress stat-progress">
                            <div
                              className="progress-bar"
                              style={{
                                width: `0%`
                              }}
                            />
                          </div>
                          <div className="stat-icon">
                            <FontAwesomeIcon icon="coins" />
                          </div>
                          <div className="stat">
                            <div className="value">{renderAccountLink(voteinfo.proxy)}</div>
                            <div className="name">proxy</div>
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
                        <div className="col-12 col-sm-7 col-md-8  pr-0 pl-1">
                          <div className="card sameheight-item mb-1" data-exclude="xs">
                            <div className="card-header card-header-sm bg-light shadow-sm row m-0">
                              <div className="header-block pl-2 col">
                                <FontAwesomeIcon icon="user-cog" className="mr-2 text-info" />
                                <h5 className="title text-info ftz-12">Voted producers</h5>
                              </div>
                            </div>
                            <div className="p-2"> {this.renderVotedProducers(voteinfo.producers)}</div>
                          </div>
                        </div>
                      </div>
                      <div />
                    </div>
                  );
                }
              } else {
                return <NoVote />;
              }
            }
          } else {
            return <NoVote />;
          }
        }}
      </Query>
    );
  }
}

export default VoterInfo;