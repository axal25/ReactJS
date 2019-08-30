import React, { Component } from "react";
import TryJSONstringify from "./tryJSONstringify";

class Counter extends Component {
  state = {
    count: this.props.count
  };
  render() {
    return (
      <React.Fragment>
        <div style={this.getDivStyle()}>
          <p style={this.getCounterParagraphStyle()}>
            <span className={this.getCountClassName()}>
              count: {this.formatCount()}
            </span>
            <button onClick={this.incrementCount}>Increment</button>
          </p>
          {this.createProps()}
        </div>
      </React.Fragment>
    );
  }

  incrementCount = () => {
    this.setState({ count: this.state.count + 1 });
  };

  getCountClassName() {
    let classes = "badge m-2";
    classes += " ";
    classes += this.state.count === 0 ? "badge-warning" : "badge-primary";
    return classes;
  }

  formatCount() {
    const { count } = this.state;
    return count === 0 ? <strong>Zero</strong> : count;
  }

  createProps = () => {
    return (
      <React.Fragment>
        <span className={this.getPropsClassName()[0]}>{"Props:"} </span>
        <span className={this.getPropsClassName()[1]}>
          {"this.tryJSONstringify( this.props ):"}
        </span>
        {/*<TryJSONstringify object={this.props} />*/}
        <br />
        <span className={this.getPropsClassName()[0]}>
          {"Props without children:"}
        </span>
        <span className={this.getPropsClassName()[1]}>
          {"JSON.stringify(this.getPropsWithoutChildren())"}
        </span>
        <span className={this.getPropsClassName()[2]}>
          {JSON.stringify(this.getPropsWithoutChildren())}
        </span>
        <br />
        <span className={this.getPropsClassName()[0]}> {"Props:"} </span>
        <span className={this.getPropsClassName()[1]}>
          {"{Object.keys(this.props).map(\n" +
            "            (propKey, i) => ` ${i}. { ${propKey}: ${this.props[propKey]} },`\n" +
            "          )}:"}
        </span>
        <span className={this.getPropsClassName()[2]}>
          {Object.keys(this.props).map(
            (propKey, i) => ` ${i}. { ${propKey}: ${this.props[propKey]} },`
          )}
        </span>
      </React.Fragment>
    );
  };

  getPropsClassName() {
    return [
      this.badgeM2(" badge-warning"),
      this.badgeM2(" badge-primary"),
      this.badgeM2(" badge-secondary")
    ];
  }

  badgeM2 = stringToAppendBy => `badge m-2${stringToAppendBy}`;

  getDivStyle = () => {
    return {
      textAlign: "center",
      borderStyle: "hidden",
      borderRadius: "20px",
      margin: "2px",
      backgroundColor: "deepSkyBlue"
    };
  };

  getCounterParagraphStyle = () => {
    return {
      borderStyle: "hidden",
      borderRadius: "20px",
      margin: "0px",
      backgroundColor: "royalBlue"
    };
  };

  getPropsWithoutChildren = () => {
    if (this.props) {
      let propsWithoutChildren = {};
      Object.keys(this.props).map((propKey, i) => {
        if (propKey !== "children") {
          propsWithoutChildren[propKey] = this.props[propKey];
        }
        return propsWithoutChildren;
      });
      return propsWithoutChildren;
    } else console.warn("!this.props");
    return;
  };
}

export default Counter;
