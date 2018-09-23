import React, {Component} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {renderAccountLink} from '../utils/Tools';
import {renderStake2Vote} from '../utils/RenderColors';

const block_timestamp_epoch = 946684800000 / 1000;
const seconds_per_day = 24 * 60 * 60;
let stake2vote = 0;

const NoVote = () => {
  return (
    <div className="card sameheight-item stats mbc border-0 pr-1 pl-1" data-exclude="xs">
      <div className="card-header card-header-sm bg-light shadow-sm act-xs-height">
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
    const {voteinfo, head_block_time} = this.props;

    if (voteinfo && head_block_time) {
      stake2vote = (
        Number(voteinfo.staked) *
        Math.pow(2, (Math.floor(new Date(head_block_time)) / 1000 - block_timestamp_epoch) / (seconds_per_day * 7) / 52)
      ).toFixed(0);

      if (voteinfo.is_proxy == 0) {
        if (voteinfo.producers.length > 0 || voteinfo.proxy) {
          if (!voteinfo.proxy) {
            //vote normaly

            return (
              <div className="card sameheight-item stats mbc border-0 pl-1 pr-1" data-exclude="xs">
                <div className="card-header card-header-sm bg-light shadow-sm act-xs-height">
                  <div className="header-block pl-2">
                    <FontAwesomeIcon icon="gavel" className="mr-2 text-info" />
                    <h5 className="title text-info">
                      Voter info
                      {/* <Link to={`/account/${account_name}`}>{account_name}</Link> */}
                    </h5>
                  </div>
                </div>
                <div className="card-block row row-sm m-0 pb-0">
                  <div className="col-12 col-sm-12 col-md-4 pl-1 pr-1 m-0">
                    <div className="row m-0">
                      <div className="col-8 col-sm-8 col-md-12 pl-0 pr-1 m-0">
                        <div className="stat-icon">
                          <FontAwesomeIcon icon="heart" />
                        </div>
                        <div className="stat">
                          <div className="value ftz-11">
                            {Number(voteinfo.last_vote_weight).toLocaleString(undefined, {
                              maximumFractionDigits: 0
                            })}
                          </div>
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
                      </div>
                      <div className="col-4 col-sm-4 col-md-12 pl-1 pr-0 m-0">
                        <div className="stat-icon">
                          <FontAwesomeIcon icon="hand-holding-heart" />
                        </div>
                        <div className="stat">
                          <div className="value">{voteinfo.producers.length}</div>
                          <div className="name"> # producers</div>
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
                      <div className="col-8 col-sm-8 col-md-12 pl-0 pr-1 m-0">
                        <div className="stat-icon">
                          <FontAwesomeIcon icon="sync-alt" />
                        </div>
                        <div className="stat">
                          <div className="value ftz-11">{renderStake2Vote(Number(stake2vote))}</div>
                          <div className="name">Stake2Vote Now</div>
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
                      <div className="col-4 col-sm-4 col-md-12 pl-1 pr-0 m-0">
                        <div className="stat-icon">
                          <FontAwesomeIcon icon="arrow-alt-circle-down" />
                        </div>
                        <div className="stat">
                          <div className="value text-danger">
                            {(
                              ((Number(stake2vote) - Number(voteinfo.last_vote_weight)) / Number(stake2vote)) *
                              100
                            ).toLocaleString(undefined, {maximumFractionDigits: 2})}{' '}
                            %
                          </div>
                          <div className="name">Vote decayed</div>
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
                  <div className="col-12 col-sm-12 col-md-8 pr-0 pl-1">
                    <div className="card sameheight-item mb-1 border-0" data-exclude="xs">
                      <div className="p-0"> {this.renderVotedProducers(voteinfo.producers)}</div>
                    </div>
                  </div>
                </div>
              </div>
            );
          } else {
            // voted by proxy
            return (
              <div className="card sameheight-item stats mbc border-0 pl-1 pr-1" data-exclude="xs">
                <div className="card-header card-header-sm bg-light shadow-sm act-xs-height">
                  <div className="header-block pl-2">
                    <FontAwesomeIcon icon="gavel" className="mr-2 text-info" />
                    <h5 className="title text-info">
                      Voter info
                      {/* <Link to={`/account/${account_name}`}>{account_name}</Link> */}
                    </h5>
                  </div>
                </div>
                <div className="card-block row row-sm m-0">
                  <div className="col-12 col-sm-12 col-md-4 pl-1 pr-1 m-0">
                    <div className="row m-0">
                      <div className="col-8 col-sm-8 col-md-12 pl-0 pr-0 m-0">
                        <div className="stat-icon">
                          <FontAwesomeIcon icon="heart" />
                        </div>
                        <div className="stat">
                          <div className="value ftz-11">
                            {Number(voteinfo.last_vote_weight).toLocaleString(undefined, {
                              maximumFractionDigits: 0
                            })}
                          </div>
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
                      </div>
                      {/* render # vote */}
                      <div className="col-4 col-sm-4 col-md-12 pl-1 pr-1 m-0">
                        <div className="stat-icon">
                          <FontAwesomeIcon icon="hand-holding-heart" />
                        </div>
                        <div className="stat">
                          <div className="value">{voteinfo.proxy_vote_info.producers.length}</div>
                          <div className="name"># producers</div>
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
                      {/* render decay */}
                      <div className="col-8 col-sm-8 col-md-12 pl-0 pr-1 m-0">
                        <div className="stat-icon">
                          <FontAwesomeIcon icon="sync-alt" />
                        </div>
                        <div className="stat">
                          <div className="value ftz-11">{renderStake2Vote(Number(stake2vote))}</div>
                          <div className="name">Stake2Vote Now</div>
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
                      <div className="col-4 col-sm-4 col-md-12 pl-1 pr-0 m-0">
                        <div className="stat-icon">
                          <FontAwesomeIcon icon="arrow-alt-circle-down" />
                        </div>
                        <div className="stat">
                          <div className="value text-danger">
                            {(
                              ((Number(stake2vote) - Number(voteinfo.last_vote_weight)) / Number(stake2vote)) *
                              100
                            ).toLocaleString(undefined, {maximumFractionDigits: 2})}{' '}
                            %
                          </div>
                          <div className="name">Vote decayed</div>
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
                      {/* render proxy */}
                      <div className="col-6 col-sm-6 col-md-12 pl-1 pr-1 m-0">
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
                    </div>
                  </div>
                  <div className="col-12 col-sm-12 col-md-8  pr-0 pl-1">
                    <div className="card sameheight-item mb-1 border-0" data-exclude="xs">
                      <div className="p-0"> {this.renderVotedProducers(voteinfo.proxy_vote_info.producers)}</div>
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
        /* render proxy */
        if (voteinfo.producers.length > 0 || voteinfo.proxy) {
          if (!voteinfo.proxy)
            return (
              <div className="card sameheight-item stats mbc border-0 pr-1 pl-1" data-exclude="xs">
                <div className="card-header card-header-sm bg-light shadow-sm act-xs-height">
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
                  <div className="col-12 col-sm-12 col-md-4 pl-1 pr-1 m-0">
                    <div className="row m-0">
                      <div className="col-8 col-sm-8 col-md-12 pl-0 pr-0 m-0">
                        <div className="stat-icon">
                          <FontAwesomeIcon icon="heart" />
                        </div>
                        <div className="stat">
                          <div className="value ftz-11">{Number(voteinfo.last_vote_weight).toLocaleString()}</div>
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
                      </div>
                      <div className="col-4 col-sm-4 col-md-12 pl-0 pr-0 m-0">
                        <div className="stat-icon">
                          <FontAwesomeIcon icon="hand-holding-heart" />
                        </div>
                        <div className="stat">
                          <div className="value">{voteinfo.producers.length}</div>
                          <div className="name"> #producers</div>
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
                      <div className="col-8 col-sm-8 col-md-12 pl-0 pr-1 m-0">
                        <div className="stat-icon">
                          <FontAwesomeIcon icon="sync-alt" />
                        </div>
                        <div className="stat">
                          <div className="value ftz-11">{renderStake2Vote(Number(stake2vote))}</div>
                          <div className="name">Stake2Vote Now</div>
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
                      <div className="col-4 col-sm-4 col-md-12 pl-1 pr-0 m-0">
                        <div className="stat-icon">
                          <FontAwesomeIcon icon="arrow-alt-circle-down" />
                        </div>
                        <div className="stat">
                          <div className="value text-danger">
                            {(
                              ((Number(stake2vote) -
                                (Number(voteinfo.last_vote_weight) - Number(voteinfo.proxied_vote_weight))) /
                                Number(stake2vote)) *
                              100
                            ).toLocaleString(undefined, {maximumFractionDigits: 2})}{' '}
                            %
                          </div>
                          <div className="name">Vote decayed</div>
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
                      <div className="col-8 col-sm-8 col-md-12 pl-0 pr-0 m-0">
                        <div className="stat-icon">
                          <FontAwesomeIcon icon="heart" />
                        </div>
                        <div className="stat">
                          <div className="value ftz-11">{Number(voteinfo.proxied_vote_weight).toLocaleString()}</div>
                          <div className="name">Proxied vote weight</div>
                        </div>
                        <div className="progress stat-progress" />
                        <div
                          className="progress-bar"
                          style={{
                            width: `0%`
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-sm-12 col-md-8  pr-0 pl-1">
                    <div className="card sameheight-item mb-1 border-0" data-exclude="xs">
                      <div className="p-0"> {this.renderVotedProducers(voteinfo.producers)}</div>
                    </div>
                  </div>
                </div>
                <div />
              </div>
            );
          else {
            return <div />;
          }
        } else {
          return <NoVote />;
        }
      }
    } else {
      return <NoVote />;
    }
  }
}

export default VoterInfo;
