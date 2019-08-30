import React, { Component } from "react";

class ErrorBoundary extends Component {
  state = {
    error: undefined,
    errorInfo: undefined
  };

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      errorInfo: null
    };
  }

  render() {
    if (this.isError()) {
      console.warn(`this.isError() = ${this.isError()}`);
      let renderedErrorPage = (
        <div style={{ background: "red" }}>
          <h1>Error</h1>
          <h2>Error:</h2>
          <h2>ErrorInfo:</h2>
        </div>
      );
      return renderedErrorPage;
    } else {
      console.warn(`this.isError() = ${this.isError()}`);
      try {
        let renderedChildren = this.props.children;
        return renderedChildren;
      } catch (e) {
        for (let i = 0; i < 20; i++) {
          console.warn(
            `Caught error at ErrorBoundary class >>> render() >>> return.this.props.children.\n\rerror:${e}`
          );
        }
      }
    }
  }

  componentDidCatch = (error, errorInfo) => {
    for (let i = 0; i < 10; i++) {
      console.warn(`#${i} CAUGHT #${i}`);
    }

    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  };

  isError = () => {
    if (this.state.error) return true;
    else return false;
  };
}

export default ErrorBoundary;
