import React from "react";
import Homepage from "./components/Homepage";
import { Route } from "react-router-dom";
import Form from "./components/Form";
const App = () => {
  return (
    <>
      <Route exact path="/">
        <Homepage />
      </Route>
      <Route path="/pizza" component={Form} />
    </>
  );
};
export default App;
