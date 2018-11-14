import React, { Component } from "react";

class AuthForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };
  }
  onSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(this.state);
  }
  render() {
    return (
      <div className="row">
        <div className="col s12 m2 l2" />
        <form
          onSubmit={this.onSubmit.bind(this)}
          className="col s12 m7 l6 z-depth-2"
        >
          <h1 className="light-blue-text text-darken-1 center">Login</h1>
          <div className="input-field">
            <input
              placeholder="Email"
              id="email"
              type="email"
              className="validate"
              value={this.state.email}
              onChange={e => this.setState({ email: e.target.value })}
            />
          </div>
          <div className="input-field">
            <input
              placeholder="Password"
              type="password"
              value={this.state.password}
              onChange={e => this.setState({ password: e.target.value })}
            />
          </div>
          <div className="errors">
            {this.props.errors.map(error => <div key={error}> {error} </div>)}
          </div>
          <div className="section right">
            <button className="btn waves-effect waves-light right">
              Submit
            </button>
          </div>
        </form>
        <div className="col s12 m3 l4" />
      </div>
    );
  }
}

export default AuthForm;
