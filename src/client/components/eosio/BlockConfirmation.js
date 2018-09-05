import React, {Component} from 'react';
import {Query} from 'react-apollo';
import GetConfirmations from '../../queries/GetConfirmations';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {renderBlockNum} from '../utils/RenderColors';

class BlockConfirmation extends Component {
  render() {
    return (
      <Query query={GetConfirmations} pollInterval={5000}>
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
          const {chain} = data;
          const {block_num} = this.props;
          if (chain) {
            if (Number(chain.last_irreversible_block_num) >= Number(block_num))
              return <div className="d-inline bg-success text-light rounded irr-mark ">Irreversible</div>;
            else {
              if (chain.head_block_num && Number(chain.head_block_num) >= Number(block_num)) {
                return (
                  <div className="d-inline">
                    Confirmations{' '}
                    <span className="text-light bg-info rounded font-weight-bold p-1">
                      {renderBlockNum(Number(chain.head_block_num) - Number(block_num))}
                    </span>
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
            }
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

export default BlockConfirmation;
