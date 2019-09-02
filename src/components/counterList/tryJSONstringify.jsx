import Stringify from "react-stringify";
import React, { Component } from "react";
import ErrorBoundary from "../errorBoundary/errorBoundary";

class TryJSONstringify extends Component {
  state = {
    objectToStringify: undefined,
    errorBoundaryComponent: undefined
  };

  constructor(props) {
    super(props);
    this.state.objectToStringify = this.props.object;
    this.state.errorBoundaryComponent = React.createRef();
  }

  render() {
    return (
      <React.Fragment>
        <span className={this.getPropsClassName()[1]}>
          {"this.stringify(): "}
        </span>{" "}
        {this.stringify()} <br />
      </React.Fragment>
    );
  }

  stringify = () => {
    if (!this.state.objectToStringify)
      throw new Error("!this.state.objectToStringify");
    let errorBoundStringifyComponent = (
      <ErrorBoundary ref={this.state.errorBoundaryComponent}>
        <Stringify
          value={this.state.objectToStringify}
          render={outputString => {
            return (
              <span className={this.getPropsClassName()[2]}>
                {outputString}
              </span>
            );
          }}
        />
      </ErrorBoundary>
    );
    return errorBoundStringifyComponent;
  };

  getPropsClassName() {
    return [
      this.badgeM2(" badge-warning"),
      this.badgeM2(" badge-primary"),
      this.badgeM2(" badge-secondary")
    ];
  }

  badgeM2 = stringToAppendBy => `badge m-2${stringToAppendBy}`;
}

export default TryJSONstringify;
