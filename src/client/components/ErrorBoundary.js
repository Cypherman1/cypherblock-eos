import React, {Component} from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      info: null
    };
  }
  componentDidCatch(error, info) {
    this.setState({
      hasError: true,
      error: error,
      info: info
    });
  }
  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h5>Oops!!! Something went wrong</h5>
          <p>The error: {this.state.error.toString()}</p>
          {/* <p>Where it occured: {this.state.info.componentStack}</p> */}
        </div>
      );
    } else {
      return this.props.children;
    }
  }
}

export default ErrorBoundary;
