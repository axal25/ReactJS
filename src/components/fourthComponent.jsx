import React, { Component } from "react";

class FourthComponent extends Component {
  state = {
    count: 0,
    tags: [
      // { key: "0", value: "tag1" },
      // { key: "1", value: "tag2" },
      // { key: "2", value: "tag3" }
    ]
  };

  constructor() {
    super();
    console.log("Constructor >>> this = ", this); // undefined without bind()
    this.incrementCount = this.incrementCount.bind(this);
  }

  messageCollection(option, args) {
    console.log(
      {
        location: `${args[0]} >>> ${args[1]}: ${args[2]}`
      }[option]
    );
  }

  printLocationAndMessage(className, functionName, message, object) {
    if (object || object !== 0 || object !== "")
      console.log(`${className} >>> ${functionName}: ${message}`, object);
    else console.log(`${className} >>> ${functionName}: ${message}`);
  }

  incrementCount() {
    console.log("fourthComponent >>> incrementCount(): Increment clicked");
    console.log("fourthComponent >>> incrementCount(): this = ", this); // not undefined
    console.log(
      "fourthComponent >>> incrementCount(): #1 this.state.count = ",
      this.state.count
    ); // error without bind()
    this.setState({ count: this.state.count + 1 }); // error without bind()
    console.log(
      `fourthComponent >>> incrementCount(): #2 this.state.count = ${this.state.count}`
    ); // error without bind()
    this.messageCollection("location", [
      "fourthComponent",
      "incrementCount()",
      "#3 this.state.count = " + this.state.count
    ]);
  }

  incrementCountArrowFunction = () => {
    this.printLocationAndMessage(
      "fourthComponent",
      "incrementCountArrowFunction()",
      "Increment clicked!"
    );
    this.printLocationAndMessage(
      "fourthComponent",
      "incrementCountArrowFunction()",
      "this = ",
      this
    );
    // NOT undefined
    // it's arrow function so it doesn't need bind
    this.printLocationAndMessage(
      "fourthComponent",
      "incrementCountArrowFunction()",
      "#1 this.state.count = ",
      this.state.count
    );
    // NOT undefined
    // it's arrow function so it doesn't need bind
    this.setState({ count: this.state.count + 1 });
    // NOT undefined
    // it's arrow function so it doesn't need bind
    this.printLocationAndMessage(
      "fourthComponent",
      "incrementCountArrowFunction()",
      "#2 this.state.count = ",
      this.state.count
    );
    // NO error
    // it's arrow function so it doesn't need bind
  };

  doIncrement = eventObj => {
    this.printLocationAndMessage(
      "fourthComponent",
      "doIncrement()",
      "eventObj = ",
      eventObj
    );
  };

  callDoIncrement = () => {
    this.doIncrement({ id: 1 });
  };

  render() {
    return (
      <React.Fragment>
        <h2>Fourth Component</h2>
        <div style={this.getDivStyle()}>
          <span className={this.getCountClassName()}>
            {this.getFormattedCount()}
          </span>
          <button
            onClick={this.incrementCount}
            className={this.getButtonIncrementClassName()}
          >
            Increment - bind() this to function in constructor
          </button>
          <button
            onClick={this.incrementCountArrowFunction}
            className={this.getButtonIncrementClassName()}
          >
            Increment - arrow Function
          </button>
          <br />
          <button
            onClick={this.callDoIncrement}
            className={this.getButtonIncrementClassName()}
          >
            Increment - arrow Function - passing argument - def function inside
            a function
          </button>
          <button
            onClick={() => {
              this.doIncrement({ id: 1 });
            }}
            className={this.getButtonIncrementClassName()}
          >
            Increment - arrow Function - passing argument - inline function
            inside a function
          </button>
          <br />
          <span>
            Last lesson done:
            <a href={"https://www.youtube.com/watch?v=Ke90Tje7VS0&t=4567"}>
              1:16:07
            </a>
          </span>
        </div>
      </React.Fragment>
    );
  }

  getDivStyle() {
    return {
      textAlign: "center",
      borderStyle: "solid",
      borderWidth: "2px",
      borderCollapse: "collapse",
      borderRadius: "20px",
      backgroundColor: "deepskyblue"
    };
  }

  getCountClassName() {
    let classes = "badge m-2";
    classes += " ";
    classes += this.state.count === 0 ? "badge-warning" : "badge-primary";
    return classes;
  }

  getButtonIncrementClassName() {
    return "btn btn-secondary btn-sm m-2";
  }

  getFormattedCount() {
    const { count } = this.state;
    return count === 0 ? <strong>Zero</strong> : count;
  }
}

export default FourthComponent;
