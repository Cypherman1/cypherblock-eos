import React from 'react';
import {Link} from 'react-router-dom';

const ErrorAccNotFound = ({account_name}) => {
  return (
    <article className="error-404-page">
      <section className="section">
        <div className="error-card">
          <div className="error-title-block">
            <h1 className="error-title">404</h1>
            <h2 className="error-sub-title">
              Sorry, account <span className="text-info">{account_name}</span> not found!
            </h2>
          </div>
          <div className="text-center">
            <Link to="/" className="btn btn-primary">
              <i className="fa fa-angle-left" /> Back to Dashboard
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
};

export default ErrorAccNotFound;
