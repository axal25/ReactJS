import React from "react";
import logo from "./logo.svg";
import "./App.css";
import FirstComponent from "./components/firstComponent";
import AnotherComponent from "./components/anotherComponent";
import CompComplexLevelThree from "./components/compComplexLevelThree";
import FourthComponent from "./components/fourthComponent";
import CounterList from "./components/counterList";
import ErrorBoundary from "./components/errorBoundary";
import CrushingComponent from "./components/crushingComponent";

function App() {
  return (
    <React.Fragment>
      <div className="App">
        This is inside div className = "App" \/\/\/
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        <FirstComponent />
        This is inside div className = "App" /\/\/\
      </div>
      This is ouside of div className = "App" \/\/\/ <br />
      It's inside React.Fragment \/\/\/
      <AnotherComponent />
      <CompComplexLevelThree />
      <FourthComponent />
      <CounterList />
      <ErrorBoundary>
        <CrushingComponent />
      </ErrorBoundary>
      This is ouside of div className = "App" /\/\/\ <br />
      It's inside React.Fragment /\/\/\
    </React.Fragment>
  );
}

export default App;
