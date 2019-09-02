import React, { Component } from "react";

export default class FirstComponent extends Component {
  state = {
    count: 0,
    imageUrl: "https://picsum.photos/200", // random image 200x200 px
    tags: [
      { key: "0", value: "tag1" },
      { key: "1", value: "tag2" },
      { key: "2", value: "tag3" }
    ]
  };
  render() {
    return (
      <div style={{ backgroundColor: "deepskyblue" }}>
        <h1>Counter</h1>
        <p>
          Counter's count field changes color and prints 'Zero' instead of '0'
        </p>
        <p>Also Counter uses className="..." property</p>
        <ul>
          {this.state.tags.map(tag => (
            <li key={tag.key}> {tag.value} </li>
          ))}
        </ul>
        <img src={this.state.imageUrl} alt="" /> <br />
        <span className={this.getCountClassName()}>
          count: {this.formatCount()}
        </span>
        <button onClick={this.incrementCount}>Increment</button>
      </div>
    );
  }

  incrementCount = () => {
    console.log("#1 Incremented count. this.state.count = " + this.state.count);
    this.setState({ count: this.state.count + 1 });
    console.log("#2 Incremented count. this.state.count = " + this.state.count);
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
}
