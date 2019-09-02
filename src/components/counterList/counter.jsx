import React, { Component } from "react";
import TryJSONstringify from "./tryJSONstringify";
import { stringify } from "flatted/esm";
// import { parse } from "flatted/esm";
import ResizableTextarea from "./resizableTextarea";

class Counter extends Component {
  state = {
    count: this.props.count ? this.props.count : 0,
    doCreateTryJSONstringify: false,
    resizeableTextAreaRef: undefined,
    maxRows: 20,
    inputRef: undefined
  };

  constructor(props) {
    super(props);
    this.state.resizeableTextAreaRef = React.createRef();
    this.state.inputRef = React.createRef();
  }

  render() {
    return (
      <React.Fragment>
        <div style={this.getDivStyle()}>
          <p style={this.getCounterParagraphStyle()}>
            <span className={this.getCountClassName()}>
              count: {this.formatCount()}
            </span>
            <button
              className={this.getButtonClassName()}
              onClick={this.incrementCount}
            >
              Increment
            </button>
          </p>
          {this.props.children ? (
            <div style={this.getCounterParagraphStyle()}>
              <span>this.props.children === truthy</span>
              {this.props.children}
            </div>
          ) : (
            ""
          )}
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
        {this.createTryJSONstringyfyComponentSection()}
        {this.createPropsWithoutChildrenSection()}
        {this.createWholePropsSection()}
      </React.Fragment>
    );
  };

  createTryJSONstringyfyComponentSection = () => {
    return (
      <div style={this.getCounterParagraphStyle()}>
        <span className={this.getPropsClassName()[0]}>{"Props:"} </span>
        {this.createButtonToCreateTryJSONstringifyOrCreateTryJSONstringify()}
      </div>
    );
  };

  createButtonToCreateTryJSONstringifyOrCreateTryJSONstringify = () => {
    if (this.state.doCreateTryJSONstringify)
      return this.createTryJSONstringify();
    else return this.createButtonToCreateTryJSONstringify();
  };

  createTryJSONstringify = () => {
    return (
      <React.Fragment>
        <span className={this.getPropsClassName()[1]}>
          {"<TryJSONstringify object={this.props} />:"}
        </span>
        <TryJSONstringify object={this.props} />
        <br />
      </React.Fragment>
    );
  };

  createButtonToCreateTryJSONstringify = () => {
    return (
      <React.Fragment>
        {this.props.children ? this.createWarningMessage() : ``}
        <button
          className={this.getButtonClassName()}
          onClick={this.setFlagToCreateTryJSONstringify}
        >
          Create TryJSONstringify Component
        </button>
        <br />
      </React.Fragment>
    );
  };

  createWarningMessage = () => {
    return (
      <React.Fragment>
        <br />
        <span className={this.getPropsClassName()[0]}>[WARNING]</span>
        <span className={this.getPropsClassName()[0]}>
          THIS COUNTER HAS CHILDREN - pushing this button will crash component
          Stringify
        </span>
        <br />
      </React.Fragment>
    );
  };

  setFlagToCreateTryJSONstringify = () => {
    this.setState(
      ({ doCreateTryJSONstringify: doCreateTryJSONstringifyValue }) => ({
        doCreateTryJSONstringify: true
      })
    );
  };

  createPropsWithoutChildrenSection = () => {
    return (
      <div style={this.getCounterParagraphStyle()}>
        <span className={this.getPropsClassName()[0]}>
          {"Props without children:"}
        </span>
        <span className={this.getPropsClassName()[1]}>
          {"JSON.stringify(this.getPropsWithoutChildren())"}
        </span>
        <span className={this.getPropsClassName()[2]}>
          {JSON.stringify(this.getPropsWithoutChildren())}
        </span>
      </div>
    );
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

  handleChangeTextareaSize = event => {
    if (
      this.state.resizeableTextAreaRef &&
      this.state.resizeableTextAreaRef.current
    ) {
      this.state.resizeableTextAreaRef.current.setState(
        ({ maxRows: maxRowsValue }) => ({ maxRows: this.state.maxRows })
      );
      this.state.resizeableTextAreaRef.current.prepareModelForChange(event);
    }
  };

  createWholePropsSection = () => {
    return (
      <div style={this.getCounterParagraphStyle()}>
        <span className={this.getPropsClassName()[0]}> {"Props:"} </span>
        <span className={this.getPropsClassName()[1]}>{"getJsonProps()"}</span>
        <ResizableTextarea
          ref={this.state.resizeableTextAreaRef}
          style={this.getTextAreaStyle()}
          className={this.getPropsClassName()}
          value={`${this.getJsonProps()}`}
          rows={5}
          maxRows={this.state.maxRows}
        />
        <br />
        <button
          className={this.getButtonClassName()}
          onClick={this.handleChangeTextareaSize}
        >
          {`Fit text area size to its value (Max number of rows = ${this.state.maxRows})`}
        </button>
        <br />
        <input
          style={{
            padding: "5px 5px 5px 5px",
            margin: "5px 5px 5px 5px",
            float: "center",
            display: "inline-block",
            verticalAlign: "middle"
          }}
          type={"text"}
          placeholder={"Your max number of rows"}
          ref={this.state.inputRef}
        />
        <button
          className={this.getButtonClassName()}
          onClick={this.handleSubmitMaxRows}
        >
          Submit
        </button>
      </div>
    );
  };

  handleSubmitMaxRows = event => {
    if (this.state.inputRef) {
      if (isNaN(parseInt(this.state.inputRef.current.value))) {
        let copyOfInputRef = Object.assign({}, this.state.inputRef);
        copyOfInputRef.current.value = "This must be an integer.";
        this.setState(({ inputRef: inputRefValue }) => ({
          inputRef: copyOfInputRef
        }));
      } else {
        this.setState(({ maxRows: maxRowsValue }) => ({
          maxRows: parseInt(this.state.inputRef.current.value)
        }));
      }
    }
  };

  getJsonProps = () => {
    return Object.keys(this.props).map(
      (propKey, i) =>
        ` ${i}. { ${propKey}: ${this.tryStringify(this.props[propKey])} }`
    );
  };

  tryStringify = object => {
    try {
      let stringifiedObject = JSON.stringify(object, null, "    ");
      return stringifiedObject;
    } catch (e1) {
      let eMsg1 = `Could not JSON.stringify(object).\n\re1: ${e1}`;
      console.warn(eMsg1);
      try {
        let stringifiedObject = stringify(object, null, "    ");
        return stringifiedObject;
      } catch (e2) {
        let eMsg2 = `Could not flatted.stringify(object).\n\re2: ${e2}`;
        console.warn(eMsg2);
        return `${eMsg1}\n\r${eMsg2}`;
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

  getDivStyle = () => {
    return {
      padding: "5px",
      textAlign: "center",
      borderStyle: "hidden",
      borderRadius: "20px",
      borderCollapse: "collapse",
      margin: "5px",
      backgroundColor: "royalBlue"
    };
  };

  getCounterParagraphStyle = () => {
    return {
      textAlign: "center",
      borderStyle: "solid",
      borderRadius: "20px",
      borderCollapse: "collapse",
      margin: "5px",
      backgroundColor: "deepSkyBlue",
      borderColor: "lightSkyBlue"
    };
  };

  getButtonClassName = () => {
    return "btn btn-light";
  };

  getTextAreaStyle = () => {
    return {
      resize: "vertical",
      minHeight: "12px",
      maxHeight: "200px",
      height: "auto",
      width: "calc(100% - 250px)",
      float: "center",
      display: "inline-block",
      verticalAlign: "middle",
      overflow: "hidden"
    };
  };

  doNothing = () => {};
}

export default Counter;
