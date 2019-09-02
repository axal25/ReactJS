import React, { Component } from "react";

class ThirdComponent extends Component {
  state = {
    count: 0,
    tags: [
      // { key: "0", value: "tag1" },
      // { key: "1", value: "tag2" },
      // { key: "2", value: "tag3" }
    ]
  };

  renderTags() {
    if (this.state.tags.length === 0) return <p>There are no tags!</p>;
    else {
      return (
        <ul>
          {this.state.tags.map(tag => (
            <li key={tag.key}> {tag.value} </li>
          ))}
        </ul>
      );
    }
  }

  render() {
    return (
      <React.Fragment>
        <h1> Third Component </h1>
        <div
          style={{
            textAlign: "center",
            borderStyle: "solid",
            borderWidth: "2px",
            borderCollapse: "collapse",
            borderRadius: "20px",
            backgroundColor: "deepskyblue"
          }}
        >
          <h3> JavaScript property </h3>
          <strong> 'Hello' (not empty) ==> Truthy </strong> <br />
          <strong> '' (empty) ==> Falsy </strong> <br />
          <strong> 1 (not zero) ==> Truthy </strong> <br />
          <strong> 0 (zero) ==> Falsy </strong> <br />
          <p>
            true && "Hello": "{true && "Hello"}" <br />
            false && "Hello": "{false && "Hello"}" <br />
            true && "": "{true && ""}" <br />
            false && "": "{false && ""}" <br />
            true && 0: "{true && 0}" <br />
            false && 0: "{false && 0}" <br />
            true && 1245: "{true && 1245}" <br />
            false && -1245: "{false && -1245}" <br />
          </p>
        </div>
        <div
          style={{
            textAlign: "center",
            borderStyle: "solid",
            borderWidth: "2px",
            borderCollapse: "collapse",
            borderRadius: "20px",
            backgroundColor: "deepskyblue"
          }}
        >
          {this.state.tags.length === 0 && <p>Please create a new tag.</p>}
          {this.renderTags()}
        </div>
      </React.Fragment>
    );
  }
}

export default ThirdComponent;
