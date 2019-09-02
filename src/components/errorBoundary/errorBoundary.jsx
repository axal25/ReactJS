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
      let renderedErrorPage = this.getErrorInfoComp();
      return renderedErrorPage;
    } else {
      return this.getChildrenComp();
    }
  }

  componentDidCatch = (error, errorInfo) => {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  };

  isError = () => {
    if (this.state.error) return true;
    else return false;
  };

  getErrorInfoComp = () => {
    return (
      <div style={this.getDivStyle()}>
        <span className={this.getSpanClassName()[2]}>Error: </span>
        <textarea
          style={this.getTextAreaStyle()}
          className={this.getSpanClassName()[2]}
          value={`${this.state.error.toString()}`}
          onChange={this.doNothing}
        />
        <br />
        <span className={this.getSpanClassName()[1]}>
          ErrorInfo.ComponentStack:
        </span>
        <span className={this.getSpanClassName()[1]}>
          {this.state.errorInfo.componentStack}
        </span>
      </div>
    );
  };

  getChildrenComp = () => {
    if (!this.props.children) {
      throw new Error(
        `ErrorBoundary class has no children. this.props.children = ${this.props.children}`
      );
    } else {
      try {
        let childrenComp = this.props.children;
        return childrenComp;
      } catch (e) {
        let eMsg = `Caught error at ErrorBoundary class >>> getChildrenComp() >>> return.this.props.children.\n\rerror:${e}`;
        console.warn(eMsg);
        throw new Error(eMsg);
      }
    }
  };

  getDivStyle = () => {
    return {
      textAlign: "center",
      borderStyle: "hidden",
      borderRadius: "20px",
      margin: "2px",
      backgroundColor: "Crimson"
    };
  };

  getSpanClassName = () => {
    return [
      this.badgeM2(" badge-info"),
      this.badgeM2(" badge-warning"),
      this.badgeM2(" badge-danger")
    ];
  };

  badgeM2 = stringToAppendBy => `badge m-2${stringToAppendBy}`;

  getTextAreaStyle = () => {
    return {
      width: "calc(100% - 250px)",
      height: "60px",
      float: "center",
      display: "inline-block",
      verticalAlign: "middle"
    };
  };

  doNothing = () => {};
}

export default ErrorBoundary;
