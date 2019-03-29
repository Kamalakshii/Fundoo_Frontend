
import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./screens/login";
import registration from "../src/screens/register";
import forgotPassword from "../src/screens/forgot";
import resetPassword from "../src/screens/reset";
import dashBoard from "../src/screens/dashBoard";
 class App extends React.Component {
  render() {
    return (
      <div>
        <Router>
          <div>
            <Route path="/" exact component={Login}></Route>
            <Route path="/Login" component={Login}></Route>
            <Route path="/registration" component={registration}></Route>
            <Route path="/forgotPassword" component={forgotPassword}></Route>
            <Route path="/resetPassword" component={resetPassword}></Route> 
            <Route path="/dashBoard" component={dashBoard}></Route>
          </div>
        </Router>
      </div>  
    );
  }
}
export default App;
