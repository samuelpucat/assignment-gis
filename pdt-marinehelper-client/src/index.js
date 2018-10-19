import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import { Root } from "./app/components/Root";

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Root />
      </BrowserRouter>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
