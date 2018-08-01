import React from "react";

const ErrorPage = error => {
  return (
    <article className="content error-404-page">
      <section className="section">
        <div className="error-card">
          <div className="error-title-block">
            <h1 className="error-title">404</h1>
            <h2 className="error-sub-title"> Sorry, page not found </h2>
          </div>
          <div className="error-container">
            <p> {`Error ${error.message}`} </p>
            <p>You better try our awesome search:</p>
            <div className="row">
              <div className="col-12">
                <div className="input-group">
                  <input type="text" className="form-control" />
                  <span className="input-group-btn">
                    <button className="btn btn-primary" type="button">
                      Search
                    </button>
                  </span>
                </div>
              </div>
            </div>
            <br />
            <a className="btn btn-primary" href="#">
              <i className="fa fa-angle-left" /> Back to Dashboard
            </a>
          </div>
        </div>
      </section>
    </article>
  );
};

export default ErrorPage;
