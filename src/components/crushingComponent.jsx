import React, { Component } from "react";

class CrushingComponent extends Component {
  state = {
    count: 0,
    jsError: undefined
  };

  crushCount = () => {
    return 3;
  };

  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  handleClick = event => {
    try {
      this.setState(({ count }) => ({ count: count + 1 }));
    } catch (e) {
      for (let i = 0; i < 20; i++) {
        console.warn(
          `Caught error at CrushingComponent class >>> handleClick() >>> this.setState(...).\n\rerror:${e}`
        );
        this.setState(({ jsError: jsErrorValue }) => ({ jsError: e }));
      }
    }
  };

  getButtonClassName = () => {
    return "btn btn-danger";
  };

  getButtonStyle = () => {
    return {
      display: "block",
      margin: "0 auto"
    };
  };

  render() {
    if (this.state.jsError) return <h1>Something went wrong.</h1>;
    else {
      if (this.state.count >= this.crushCount()) {
        throw new Error(
          `Button crushed at this.state.count = ${this.state.count}`
        );
      }
      return (
        <React.Fragment>
          <button
            onClick={this.handleClick}
            className={this.getButtonClassName()}
            style={this.getButtonStyle()}
          >{`This button crushes at count = ${this.crushCount()}. Current count = ${
            this.state.count
          }`}</button>
          <br />
        </React.Fragment>
      );
    }
  }
}

export default CrushingComponent;
