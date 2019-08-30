import Stringify from "react-stringify";
import React, { Component } from "react";
import ErrorBoundary from "./errorBoundary";

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

  componentDidMount = () => {
    try {
      console.log(
        "this.state.errorBoundaryComponent: ",
        this.state.errorBoundaryComponent
      );
      console.log(
        "this.state.errorBoundaryComponent.current.isError(): ",
        this.state.errorBoundaryComponent.current.isError()
      );
    } catch (e) {
      // throw new Error(
      //   `this.state.errorBoundaryComponent: ${this.state.errorBoundaryComponent}`
      // );
      console.warn(
        "this.state.errorBoundaryComponent:",
        this.state.errorBoundaryComponent
      );
    }
  };

  render() {
    return (
      <React.Fragment>
        {"this.stringify(): "} {this.stringify()} <br />
        {"this.tryJSONstringify(): "}
        {/*{this.tryJSONstringify()}*/}
        <br />
      </React.Fragment>
    );
  }

  stringify = () => {
    if (!this.state.objectToStringify)
      throw new Error("!this.state.objectToStringify");
    let errorBoundStringifyComponent = (
      <ErrorBoundary ref={this.state.errorBoundaryComponent}>
        <Stringify value={this.state.objectToStringify} />
      </ErrorBoundary>
    );
    return errorBoundStringifyComponent;
  };

  tryJSONstringify = () => {
    try {
      if (
        this.state.errorBoundaryComponent &&
        this.state.errorBoundaryComponent.current &&
        !this.state.errorBoundaryComponent.current.isError()
      ) {
        console.log(
          "TRUTHY = this.state.errorBoundaryComponent.current.isError()",
          this.state.errorBoundaryComponent.current.isError()
        );
        console.log(`SUCCESS: Could <Stringify value={this.props.object} />`);
        // https://www.npmjs.com/package/react-stringify?activeTab=readme#examples
        return;
      } else {
        console.log("FALSE FALSY FALSY");
        console.log(
          "FALSY = this.state.errorBoundaryComponent",
          this.state.errorBoundaryComponent
        );
        console.log(
          "FALSY = this.state.errorBoundaryComponent.current",
          this.state.errorBoundaryComponent.current
        );
        console.log(
          "FALSY = this.state.errorBoundaryComponent.current.isError()",
          this.state.errorBoundaryComponent.current.isError()
        );
        throw new Error(
          "Skipping Strigify Component - doesn't work for this.props.children."
        );
      }
    } catch (error1) {
      console.warn(
        `FAILURE: Could NOT <Stringify value={this.props.object} />.\n\rError#1: ${error1}`
      );
      try {
        let stringifiedObject = JSON.stringify(this.state.objectToStringify);
        console.log("#2 object: ", this.state.objectToStringify);
        return (
          <span className={this.getPropsClassName()[2]}>
            {stringifiedObject}
          </span>
        );
      } catch (error2) {
        console.log("#3");
        return (
          <span className={this.getPropsClassName()[2]}>
            {`FAILURE: Could not JSON.stringify( object ).\n\rError#1: ${error1}\n\rError#2: ${error2}`}
          </span>
        );
      }
    }
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
