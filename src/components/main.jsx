import React, { Component } from "react";
import SecondComponent from "./standaloneComponents/secondComponent";
import ThirdComponent from "./standaloneComponents/thirdComponent";
import FourthComponent from "./standaloneComponents/fourthComponent";
import CounterList from "./counterList/counterList";
import ErrorBoundary from "./errorBoundary/errorBoundary";
import CrushingComponent from "./errorBoundary/crushingComponent";
import Home from "./home/home";
import LastLessonDone from "./standaloneComponents/lastLessonDone";
class Main extends Component {
  render() {
    return (
      <React.Fragment>
        <Home />
        This is ouside of div className = "App" \/\/\/ <br />
        It's inside React.Fragment \/\/\/
        <SecondComponent />
        <ThirdComponent />
        <FourthComponent />
        <ErrorBoundary>
          <CrushingComponent />
        </ErrorBoundary>
        <CounterList />
        <LastLessonDone />
        This is ouside of div className = "App" /\/\/\ <br />
        It's inside React.Fragment /\/\/\
      </React.Fragment>
    );
  }
}

export default Main;
