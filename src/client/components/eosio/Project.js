import React, {Component} from 'react';
import {Query} from 'react-apollo';
import {connect} from 'react-redux';
import ReactImageFallback from 'react-image-fallback';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import GetProject from '../../queries/GetProject';
const images = '../imgs';

const ProjectLoading = ({isDarkMode}) => {
  return (
    <article className="content dashboard-page">
      <section className="section">
        <div className={`card mlr-2px shadow-sm ftz-marketcap mb-1 ${isDarkMode ? 'bg-dark' : 'bg-white'}`}>
          <div
            className={`card-header border-bottom pl-2 ${
              isDarkMode ? 'bg-dark border-secondary' : 'bg-actions border-light'
            }`}
          >
            <FontAwesomeIcon icon="chart-bar" className="mr-2 text-info fa-lg" />
            <h1 className="title text-info">EOS Marketcap</h1>
          </div>
          <div className="card-body bg-white p-0">
            <div style={{height: 50}} />
            <div className="text-center align-middle overlay" style={{paddingTop: 55}}>
              <FontAwesomeIcon icon="spinner" spin className="text-info fa-2x" />
            </div>
          </div>
        </div>
      </section>
    </article>
  );
};

class Project extends Component {
  render() {
    const {match} = this.props;
    const {isDarkMode} = this.props.sidebar;
    // console.log(match);
    return (
      <Query query={GetProject} pollInterval={0} variables={{symbol: match.params.symbol}}>
        {({loading, error, data}) => {
          if (loading) return <ProjectLoading isDarkMode={isDarkMode} />;
          if (error) return <ProjectLoading isDarkMode={isDarkMode} />;

          if (data)
            return (
              <article className="content dashboard-page">
                <section className="section">
                  <div className={`card ${isDarkMode ? 'bg-dark' : ''}`}>
                    <div className={`d-flex align-items-center card-header ${isDarkMode ? 'bg-dark' : ''}`}>
                      <div className="ml-2 bg-white cpy-logo-bgr">
                        <ReactImageFallback
                          src={`${images}/${data.company.marketcap.symbol}.png`}
                          fallbackImage={`${images}/COMMON.png`}
                          alt={`${data.company.marketcap.currency} token airdrop`}
                          className="cpy-logo"
                        />
                      </div>
                      <div className="ml-2 ftz-14 font-weight-bold ">
                        {data.company.company_info.name} (
                        <span className="text-info">{data.company.marketcap.currency}</span>)
                      </div>
                    </div>
                    <div className="card-body p-0">
                      <div className={`${isDarkMode ? 'bg-dark' : ''}`}>
                        <a href={data.company.company_info.website}> {data.company.company_info.website} </a>
                      </div>
                    </div>
                  </div>
                </section>
              </article>
            );
        }}
      </Query>
    );
  }
}

function mapStateToProps({myStore}) {
  return {sidebar: myStore.sidebar};
}
export default connect(
  mapStateToProps,
  null
)(Project);
