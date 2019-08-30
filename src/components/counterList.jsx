import React, { Component } from "react";
import Counter from "./counter";

class ComponentList extends Component {
  state = {
    id: "ComponentList",
    counters: [
      { id: 1, count: 5 },
      { id: 2, count: 4 },
      { id: 3, count: 3 },
      { id: 4, count: 2 },
      { id: 5, count: 1 },
      { id: 6, count: 0 }
    ]
  };

  getId = () => {
    return this.state.id;
  };

  getDivStyle = () => {
    return {
      textAlign: "center",
      borderStyle: "solid",
      borderWidth: "2px",
      borderCollapse: "collapse",
      borderRadius: "20px",
      backgroundColor: "dodgerBlue"
    };
  };

  render() {
    return (
      <div id={this.getId()} style={this.getDivStyle()}>
        {this.createCounters()}
        <Counter count={10} selected={false} id={10}>
          <h1>This counter is statically added to counter list</h1>
          <h2>It isn't self-closed</h2>
          <h3>It has something between opening and closing tag of element</h3>
          <h4>This should modified this.props.children</h4>
        </Counter>
      </div>
    );
  }

  createCounters = () => {
    return this.state.counters.map(counter => (
      <Counter
        key={counter.id}
        count={counter.count}
        selected={true}
        id={counter.id}
      />
    ));
  };
}
export default ComponentList;
