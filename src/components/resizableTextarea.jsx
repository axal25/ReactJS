import React from "react";

class ResizableTextarea extends React.PureComponent {
  state = {
    value: "",
    rows: 1,
    minRows: 1,
    maxRows: Number.MAX_SAFE_INTEGER,
    textareaLineHeight: undefined,
    textareaRef: undefined,
    didRowsChangeTo1: false
  };

  constructor(props) {
    super(props);
    if (this.props) {
      Object.keys(this.props).map((propKey, index) => {
        return (this.state[propKey] = this.props[propKey]);
      });
    }
    this.state.textareaRef = React.createRef();
  }

  render() {
    return (
      <textarea
        rows={this.state.rows}
        value={this.state.value}
        placeholder={"Enter your text here..."}
        className={
          this.state["className"] ? this.state["className"] : "textarea"
        }
        style={this.state["style"] ? this.state["style"] : {}}
        onChange={this.prepareModelForChange}
        ref={this.state.textareaRef}
      />
    );
  }

  prepareModelForChange = event => {
    this.updateValueIfTextareaRef();
    this.setState(({ rows: rowsValue }) => ({ rows: 1 }));
    if (this.state.didRowsChangeTo1 === false)
      this.setState(({ didRowsChangeTo1: didRowsChangeTo1Value }) => ({
        didRowsChangeTo1: true
      }));
  };

  updateValueIfTextareaRef = () => {
    if (this.state.textareaRef) {
      this.setState({ value: this.state.textareaRef.current.value });
    }
  };

  componentDidMount() {
    this.onRender();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.onRender();
  }

  onRender = () => {
    this.ifTextareaRef();
    this.ifModelReady();
  };

  ifTextareaRef = () => {
    if (this.state.textareaRef) {
      this.ifComputedStyleTextareaRefCurrentLineHeight();
      this.ifTextareaLineHeight();
    } else {
      throw new Error(
        `this.state.textareaRef = ${this.state.textareaRef}\n\rThis should NOT happen.`
      );
    }
  };

  ifComputedStyleTextareaRefCurrentLineHeight = () => {
    if (window.getComputedStyle(this.state.textareaRef.current).lineHeight) {
      this.updateTextareaLineHeight();
    } else {
      throw new Error(
        `window.getComputedStyle(this.state.textareaRef.current).lineHeight = ${
          window.getComputedStyle(this.state.textareaRef.current).lineHeight
        }\n\rThis should NOT happen.`
      );
    }
  };

  updateTextareaLineHeight = () => {
    this.setState(({ textareaLineHeight: textareaLineHeightValue }) => ({
      textareaLineHeight: this.getStylePropertyWithoutPx(
        window.getComputedStyle(this.state.textareaRef.current).lineHeight
      )
    }));
  };

  ifTextareaLineHeight = () => {
    if (this.state.textareaLineHeight) {
      this.updateMinHeightAndMaxHeight();
    }
  };

  didMinOrMaxHeightChange = () => {
    return (
      this.state.style.minHeight !== this.calculateMinHeightBasedOnMinRows() ||
      this.state.style.maxHeight !== this.calculateMaxHeightBasedOnMaxRows()
    );
  };

  updateMinHeightAndMaxHeight = () => {
    if (this.didMinOrMaxHeightChange()) {
      let copyOfStyle = Object.assign({}, this.state.style);
      copyOfStyle.minHeight = this.calculateMinHeightBasedOnMinRows();
      copyOfStyle.maxHeight = this.calculateMaxHeightBasedOnMaxRows();
      this.setState(({ style: stateValue }) => ({
        style: copyOfStyle
      }));
    }
  };

  calculateMinHeightBasedOnMinRows = () => {
    let padding = this.getPaddingTopAndBottomSize();
    return (
      this.state.minRows *
        this.getStylePropertyWithoutPx(this.state.textareaLineHeight) +
      padding["paddingTop"] +
      padding["paddingBottom"] +
      "px"
    );
  };

  calculateMaxHeightBasedOnMaxRows = () => {
    let padding = this.getPaddingTopAndBottomSize();
    return (
      this.state.maxRows *
        this.getStylePropertyWithoutPx(this.state.textareaLineHeight) +
      padding["paddingTop"] +
      padding["paddingBottom"] +
      "px"
    );
  };

  isModelReadyForTextareaHeightChange = () => {
    if (
      this.state.didRowsChangeTo1 &&
      this.state.rows === 1 &&
      !this.state.textareaLineHeight
    ) {
      throw new Error(
        `this.state.didRowsChangeTo1 = ${this.state.didRowsChangeTo1}\n\r` +
          `this.state.rows = ${this.state.rows}\n\r` +
          `this.state.textareaRef = ${this.state.textareaRef}\n\r` +
          `This should NOT happen.`
      );
    }
    return (
      this.state.didRowsChangeTo1 &&
      this.state.rows === 1 &&
      this.state.textareaLineHeight
    );
  };

  ifModelReady = () => {
    if (this.isModelReadyForTextareaHeightChange()) {
      this.changeTextareaHeight();
    }
  };

  changeTextareaHeight = () => {
    let newRowsValue = this.calculateNewNumberOfRows();
    if (newRowsValue > this.state.maxRows) {
      newRowsValue = this.state.maxRows;
    }
    this.setState(({ rows: rowsValue }) => ({ rows: newRowsValue }));
    this.setState(({ didRowsChangeTo1: didRowsChangeTo1Value }) => ({
      didRowsChangeTo1: false
    }));
  };

  calculateNewNumberOfRows = () => {
    let newNumberOfRows = Math.round(
      this.getContentHeight() / this.state.textareaLineHeight
    );
    return newNumberOfRows;
  };

  getContentHeight = () => {
    if (this.state.textareaRef) {
      let padding = this.getPaddingTopAndBottomSize();
      let contentHeight =
        this.state.textareaRef.current.scrollHeight -
        (padding["paddingTop"] + padding["paddingBottom"]);
      return contentHeight;
    } else {
      throw new Error(
        `this.state.textareaRef = ${this.state.textareaRef} (falsy).\n\rThis should NOT happen.`
      );
    }
  };

  getPaddingTopAndBottomSize = () => {
    let paddingTopValue = this.getStylePropertyWithoutPx(
      window.getComputedStyle(this.state.textareaRef.current).paddingTop
    );
    let paddingBottomValue = this.getStylePropertyWithoutPx(
      window.getComputedStyle(this.state.textareaRef.current).paddingBottom
    );
    return { paddingTop: paddingTopValue, paddingBottom: paddingBottomValue };
  };

  getStylePropertyWithoutPx = propertyString => {
    if (this.isString(propertyString)) {
      let parsedValue = parseInt(propertyString.replace(/px/g, ""));
      if (isNaN(parsedValue)) {
        throw new Error(
          `Could NOT parse to int property = "${propertyString}"`
        );
      } else {
        return parsedValue;
      }
    } else return propertyString;
  };

  isString = myVar => {
    if (typeof myVar === "string" || myVar instanceof String) return true;
    else return false;
  };
}

export default ResizableTextarea;
