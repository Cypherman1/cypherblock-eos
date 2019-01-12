import React, {Component} from 'react';
import {renderAccountLink} from '../utils/Tools';
import {connect} from 'react-redux';

import {setVoterInfoCollapsed} from '../../actions/common';
import {renderStake2Vote, renderDecayedPercent, renderDecayedPercentProxy} from '../utils/RenderColors';

const block_timestamp_epoch = 946684800000;
const seconds_per_day = 24 * 60 * 60;
let stake2vote = 0;
let nextDecayTimestamp = 0;
let nextDecayDate = null;

const NoVote = ({isDarkMode}) => {
  return (
    <div
      className={`card sameheight-item stats mbc  pb-1 shadow-sm ${isDarkMode ? 'bg-dark-1 ' : ''}`}
      style={{marginLeft: 2, marginRight: 2}}
      data-exclude="xs"
    >
      <div className="card-header card-header-sm shadow-sm bg-white ">
        <div className="header-block pl-2">
          <i className="fa fa-gavel mr-2 text-info" />
          <h1 className="title text-info">
            Voting info
            {/* <Link to={`/account/${account_name}`}>{account_name}</Link> */}
          </h1>
        </div>
      </div>
      <div className={`card-block text-danger ftz-12 ${isDarkMode ? 'bg-dark-1' : ''} `}>
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
        <div className="d-inline-block mr-2 pl-1 ftz-12" key={producer}>
          {renderAccountLink(producer)}
        </div>
      );
    });
    return items;
  }
  render() {
    const {voteinfo, head_block_time, isDarkMode, common, setVoterInfoCollapsed} = this.props;
    const {voter_collapsed} = common;
    if (voteinfo && head_block_time) {
      const head_block_time_utc = new Date(head_block_time);
      stake2vote =
        voteinfo.staked *
        Math.pow(
          2,
          Math.floor(
            (new Date(head_block_time_utc + 'UTC').getTime() / 1000 - block_timestamp_epoch / 1000) /
              (seconds_per_day * 7)
          ) / 52
        );

      nextDecayTimestamp =
        block_timestamp_epoch +
        (Math.floor(
          (new Date(head_block_time_utc + 'UTC').getTime() / 1000 - block_timestamp_epoch / 1000) /
            (seconds_per_day * 7)
        ) +
          1) *
          (seconds_per_day * 7 * 1000);
      nextDecayDate = new Date(Number(nextDecayTimestamp)).toLocaleString();

      if (voteinfo.is_proxy == 0) {
        if (voteinfo.producers.length > 0 || voteinfo.proxy) {
          if (!voteinfo.proxy) {
            //vote normaly
            return (
              <div
                className={`card sameheight-item stats mbc shadow-sm ${isDarkMode ? 'bg-dark-1' : ''}`}
                style={{marginLeft: 2, marginRight: 2}}
                data-exclude="xs"
              >
                <div className="card-header card-header-sm shadow-sm bg-white row m-0 ">
                  <div className="header-block col pl-2">
                    <a
                      data-toggle="collapse"
                      href={`#collapse_voter_info`}
                      role="button"
                      aria-expanded="true"
                      aria-controls={`collapse_voter_info`}
                      onClick={() => {
                        setVoterInfoCollapsed(!voter_collapsed);
                      }}
                    >
                      <i className="fa fa-gavel text-info mr-2" />
                      <h1 className="title text-info">Voting info</h1>
                    </a>
                  </div>
                  <div className="col pr-1 d-flex align-items-center flex-row-reverse rounded-bottom">
                    <a
                      className="font-weight-normal d-flex align-items-center"
                      data-toggle="collapse"
                      href={`#collapse_voter_info`}
                      role="button"
                      aria-expanded="true"
                      aria-controls={`collapse_voter_info`}
                      onClick={() => {
                        setVoterInfoCollapsed(!voter_collapsed);
                      }}
                    >
                      {voter_collapsed ? (
                        <i className="fa fa-chevron-circle-up text-info ftz-16" />
                      ) : (
                        <i className="fa fa-chevron-circle-down text-info ftz-16" />
                      )}
                    </a>
                  </div>
                </div>
                <div
                  className={`card-body ftz-9 m-0 p-0 collapse rounded-bottom mt-1 ${
                    isDarkMode ? 'bg-dark-1' : 'bg-white'
                  }`}
                  id={`collapse_voter_info`}
                >
                  <div className={`row row-sm m-0 pl-1 pr-1 ${isDarkMode ? 'bg-dark-1' : ''}`}>
                    <div className="col-12 col-sm-12 col-md-5 pl-1 pr-1 m-0">
                      <div className="row m-0">
                        <div className="col-8 col-sm-8 col-md-8 pl-0 pr-1 m-0 stat-col">
                          <div className="stat-icon d-inline-block d-md-none">
                            <i className="fa fa-heart" />
                          </div>
                          <div className="stat">
                            <div className="value">
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
                        <div className="col-4 col-sm-4 col-md-4 pl-0 pr-0 m-0 stat-col">
                          <div className="stat-icon d-inline-block d-md-none">
                            <i className="fa fa-hand-holding-heart" />
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
                        <div className="col-8 col-sm-8 col-md-8 pl-0 pr-1 m-0 stat-col">
                          <div className="stat-icon d-inline-block d-md-none">
                            <i className="fa fa-sync-alt" />
                          </div>
                          <div className="stat">
                            <div className="value">
                              {renderStake2Vote(
                                stake2vote.toFixed(0),
                                Number(voteinfo.last_vote_weight).toFixed(0),
                                isDarkMode
                              )}
                            </div>
                            <div className="name">Current Stake2Vote</div>
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
                        <div className="col-4 col-sm-4 col-md-4 pl-0 pr-0 m-0 stat-col">
                          <div className="stat-icon d-inline-block d-md-none">
                            <i className="fa fa-arrow-alt-circle-down" />
                          </div>
                          <div className="stat">
                            <div className="value">
                              {renderDecayedPercent(stake2vote, voteinfo.last_vote_weight)}
                              {/* {(((stake2vote - voteinfo.last_vote_weight) / stake2vote) * 100).toFixed(2)} % */}
                            </div>
                            <div className="name">Vote Decayed</div>
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
                        <div className="col-8 col-sm-8 col-md-8 pl-0 pr-1 m-0 stat-col">
                          <div className="stat-icon d-inline-block d-md-none">
                            <i className="fa fa-lock" />
                          </div>
                          <div className="stat">
                            <div className="value ftz-10">{nextDecayDate}</div>
                            <div className="name">Next decay time</div>
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
                    <div className="col-12 col-sm-12 col-md-7 pr-0 pl-2">
                      <div className="ftz-10 border-bottom mr-2 text-info"> Producers</div>
                      <div
                        className={`card sameheight-item mb-1 border-0 ${isDarkMode ? 'bg-dark-1' : ''} `}
                        data-exclude="xs"
                      >
                        <div className="p-0"> {this.renderVotedProducers(voteinfo.producers)}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          } else {
            // voted by proxy
            return (
              <div
                className={`card sameheight-item stats mbc shadow-sm ${isDarkMode ? 'bg-dark-1 ' : ''}`}
                style={{marginLeft: 2, marginRight: 2}}
                data-exclude="xs"
              >
                <div className="card-header card-header-sm shadow-sm bg-white row m-0 ">
                  <div className="header-block col pl-2">
                    <a
                      data-toggle="collapse"
                      href={`#collapse_voter_info`}
                      role="button"
                      aria-expanded="true"
                      aria-controls={`collapse_voter_info`}
                      onClick={() => {
                        setVoterInfoCollapsed(!voter_collapsed);
                      }}
                    >
                      <i className="fa fa-gavel mr-2 text-info" />
                      <h1 className="title text-info">Voting info</h1>
                    </a>
                  </div>
                  <div className="col pr-1 d-flex align-items-center flex-row-reverse rounded-bottom">
                    <a
                      className="font-weight-normal d-flex align-items-center"
                      data-toggle="collapse"
                      href={`#collapse_voter_info`}
                      role="button"
                      aria-expanded="true"
                      aria-controls={`collapse_voter_info`}
                      onClick={() => {
                        setVoterInfoCollapsed(!voter_collapsed);
                      }}
                    >
                      {voter_collapsed ? (
                        <i className="fa fa-chevron-circle-up text-info ftz-16" />
                      ) : (
                        <i className="fa fa-chevron-circle-down text-info ftz-16" />
                      )}
                    </a>
                  </div>
                </div>
                <div
                  className={`card-body ftz-9 m-0 p-0 collapse rounded-bottom mt-1 ${
                    isDarkMode ? 'bg-dark-1' : 'bg-white'
                  }`}
                  id={`collapse_voter_info`}
                >
                  <div className={`row row-sm m-0 pl-1 pr-1 ${isDarkMode ? 'bg-dark-1' : ''}`}>
                    <div className="col-12 col-sm-12 col-md-5 pl-1 pr-1 m-0">
                      <div className="row m-0">
                        <div className="col-8 col-sm-8 col-md-8 pl-0 pr-1 m-0 stat-col">
                          <div className="stat-icon d-inline-block d-md-none">
                            <i className="fa fa-heart" />
                          </div>
                          <div className="stat">
                            <div className="value">
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
                        <div className="col-4 col-sm-4 col-md-4 pl-0 pr-1 m-0 stat-col">
                          <div className="stat-icon d-inline-block d-md-none">
                            <i className="fa fa-hand-holding-heart" />
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
                        <div className="col-8 col-sm-8 col-md-8 pl-0 pr-1 m-0 stat-col">
                          <div className="stat-icon d-inline-block d-md-none">
                            <i className="fa fa-sync-alt" />
                          </div>
                          <div className="stat">
                            <div className="value">
                              {renderStake2Vote(
                                stake2vote.toFixed(0),
                                Number(voteinfo.last_vote_weight).toFixed(0),
                                isDarkMode
                              )}
                            </div>
                            <div className="name">Current Stake2Vote</div>
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
                        <div className="col-4 col-sm-4 col-md-4 pl-0 pr-1 m-0 stat-col">
                          <div className="stat-icon d-inline-block d-md-none">
                            <i className="fa fa-arrow-alt-circle-down" />
                          </div>
                          <div className="stat">
                            <div className="value">{renderDecayedPercent(stake2vote, voteinfo.last_vote_weight)}</div>
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
                        <div className="col-7 col-sm-8 col-md-8 pl-0 pr-1 m-0 stat-col">
                          <div className="stat-icon d-inline-block d-md-none">
                            <i className="fa fa-lock" />
                          </div>
                          <div className="stat">
                            <div className="value ftz-10">{nextDecayDate}</div>
                            <div className="name">Next decay time</div>
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
                        <div className="col-5 col-sm-4 col-md-4 pl-1 pr-1 m-0 stat-col">
                          <div className="stat-icon d-inline-block d-md-none">
                            <i className="fa fa-user-cog" />
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
                    <div className="col-12 col-sm-12 col-md-7  pr-0 pl-2">
                      <div className="ftz-10 border-bottom mr-2 text-info"> Producers</div>
                      <div
                        className={`card sameheight-item mb-1 border-0 ${isDarkMode ? 'bg-dark-1' : ''} `}
                        data-exclude="xs"
                      >
                        <div className="p-0"> {this.renderVotedProducers(voteinfo.proxy_vote_info.producers)}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          }
        } else {
          return <NoVote isDarkMode={isDarkMode} />;
        }
      } else {
        /* render proxy */
        if (voteinfo.producers.length > 0 || voteinfo.proxy) {
          if (!voteinfo.proxy)
            return (
              <div
                className={`card sameheight-item stats mbc shadow-sm ${isDarkMode ? 'bg-dark-1 ' : ''}`}
                style={{marginLeft: 2, marginRight: 2}}
                data-exclude="xs"
              >
                <div className="card-header card-header-sm bg-white shadow-sm  row m-0">
                  <div className="col d-flex p-0">
                    <div className="header-block pl-2 pr-2">
                      <a
                        data-toggle="collapse"
                        href={`#collapse_voter_info`}
                        role="button"
                        aria-expanded="true"
                        aria-controls={`collapse_voter_info`}
                        onClick={() => {
                          setVoterInfoCollapsed(!voter_collapsed);
                        }}
                      >
                        <i className="fa fa-gavel mr-2 text-info" />
                        <h1 className="title text-info">Voting info</h1>
                      </a>
                    </div>
                    <span className="badge badge-pill badge-primary p-1 pt-2">Proxy</span>
                  </div>
                  <div className="col pr-1 d-flex align-items-center flex-row-reverse rounded-bottom">
                    <a
                      className="font-weight-normal d-flex align-items-center"
                      data-toggle="collapse"
                      href={`#collapse_voter_info`}
                      role="button"
                      aria-expanded="true"
                      aria-controls={`collapse_voter_info`}
                      onClick={() => {
                        setVoterInfoCollapsed(!voter_collapsed);
                      }}
                    >
                      {voter_collapsed ? (
                        <i className="fa fa-chevron-circle-up text-info ftz-16" />
                      ) : (
                        <i className="fa fa-chevron-circle-down text-info ftz-16" />
                      )}
                    </a>
                  </div>
                </div>
                <div
                  className={`card-body ftz-9 m-0 p-0 collapse rounded-bottom mt-1 ${
                    isDarkMode ? 'bg-dark-1' : 'bg-white'
                  }`}
                  id={`collapse_voter_info`}
                >
                  <div className={`card-block row row-sm m-0 pr-1 pl-1 ${isDarkMode ? 'bg-dark-1' : ''}`}>
                    <div className="col-12 col-sm-12 col-md-5 pl-1 pr-1 m-0 stat-col">
                      <div className="row m-0">
                        <div className="col-8 col-sm-8 col-md-8 pl-0 pr-1 m-0 stat-col">
                          <div className="stat-icon d-inline-block d-md-none">
                            <i className="fa fa-heart" />
                          </div>
                          <div className="stat">
                            <div className="value ">
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
                        <div className="col-4 col-sm-4 col-md-4 pl-0 pr-1 m-0 stat-col">
                          <div className="stat-icon d-inline-block d-md-none">
                            <i className="fa fa-hand-holding-heart" />
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
                        <div className="col-8 col-sm-8 col-md-8 pl-0 pr-1 m-0 stat-col">
                          <div className="stat-icon d-inline-block d-md-none">
                            <i className="fa fa-sync-alt" />
                          </div>
                          <div className="stat">
                            <div className="value">{renderStake2Vote(stake2vote.toFixed(0), isDarkMode)}</div>
                            <div className="name">Current Stake2Vote</div>
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
                        <div className="col-4 col-sm-4 col-md-4 pl-0 pr-1 m-0 stat-col">
                          <div className="stat-icon d-inline-block d-md-none">
                            <i className="fa fa-arrow-alt-circle-down" />
                          </div>
                          <div className="stat">
                            <div className="value">
                              {renderDecayedPercentProxy(
                                stake2vote,
                                voteinfo.last_vote_weight,
                                voteinfo.proxied_vote_weight
                              )}
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
                        <div className="col-8 col-sm-8 col-md-8 pl-0 pr-1 m-0 stat-col">
                          <div className="stat-icon d-inline-block d-md-none">
                            <i className="fa fa-lock" />
                          </div>
                          <div className="stat">
                            <div className="value ftz-10">{nextDecayDate}</div>
                            <div className="name">Next decay time</div>
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
                        <div className="col-8 col-sm-8 col-md-8 pl-0 pr-1 m-0 stat-col">
                          <div className="stat-icon d-inline-block d-md-none">
                            <i className="fa fa-heart" />
                          </div>
                          <div className="stat">
                            <div className="value">
                              {Number(voteinfo.proxied_vote_weight).toLocaleString(undefined, {
                                maximumFractionDigits: 0
                              })}
                            </div>
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
                    <div className="col-12 col-sm-12 col-md-7  pr-0 pl-2">
                      <div className="ftz-10 border-bottom mr-2 text-info"> Producers</div>
                      <div
                        className={`card sameheight-item mb-1 border-0 ${isDarkMode ? 'bg-dark-1' : ''} `}
                        data-exclude="xs"
                      >
                        <div className="p-0"> {this.renderVotedProducers(voteinfo.producers)}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          else {
            return <div />;
          }
        } else {
          return <NoVote isDarkMode={isDarkMode} />;
        }
      }
    } else {
      return <NoVote isDarkMode={isDarkMode} />;
    }
  }
}

function mapStateToProps({myStore}) {
  return {common: myStore.common};
}
export default connect(
  mapStateToProps,
  {setVoterInfoCollapsed}
)(VoterInfo);
