import React, {Component} from 'react';

class Project extends Component {
  render() {
    const {match} = this.props;
    // console.log(match);
    return (
      <article className="content dashboard-page">
        <section className="section">
          <div> {match.params.symbol} </div>
        </section>
      </article>
    );
  }
}

export default Project;
