import React, { Component } from "react";

class LastLessonDone extends Component {
  state = {
    tutorialVideoTime: { hours: 1, minutes: 32, seconds: 50 }
  };

  render() {
    return (
      <div style={this.getDivStyle()}>
        <span>
          {"Last lesson done: "}
          <a
            href={`https://www.youtube.com/watch?v=Ke90Tje7VS0&t=${(this.state
              .tutorialVideoTime.hours *
              60 +
              this.state.tutorialVideoTime.minutes) *
              60 +
              this.state.tutorialVideoTime.seconds}`}
            style={{ color: "Crimson" }}
          >
            {"React Tutorial - Learn React - React Crash Course [2019] @ "}
            {`${this.state.tutorialVideoTime.hours}:${this.state.tutorialVideoTime.minutes}:${this.state.tutorialVideoTime.seconds}`}
          </a>
        </span>
      </div>
    );
  }

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
}

export default LastLessonDone;
