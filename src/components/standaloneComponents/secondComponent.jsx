import React, { Component } from "react";
class SecondComponent extends Component {
  state = {
    count: 0,
    address: {
      country: "unsetCountry",
      city: "unsetCity",
      streetName: "unsetStreetName",
      streetNumber: null,
      flatNumber: null
    }
  };

  styles = {
    fontSize: 24,
    fontWeight: "bold"
  };

  render() {
    return (
      <React.Fragment>
        <h2>Second Component</h2>
        <p>SecondComponent has static style with 2 ways to assigning style</p>
        <span style={this.styles} className="badge badge-primary m-2">
          count: {this.formatCount()}
        </span>
        <button style={{ fontSize: 38 }} className="btn btn-secondary btn-sm">
          Second Increment
        </button>
        <br />
      </React.Fragment>
    );
  }

  formatCount() {
    const { count } = this.state;
    return count === 0 ? <strong>Zero</strong> : count;
  }
}

export default SecondComponent;
