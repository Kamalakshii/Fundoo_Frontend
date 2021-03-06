/******************************************************************************
 *  @Purpose        : to import all the pages by using specific path.
 *  @file           : App.js        
 *  @author         : KAMALAKSHI C SWAMY
 *  @since          : 15-03-2019
 ******************************************************************************/ 

 import React from 'react';
import { BrowserRouter as Router, Route,Redirect } from "react-router-dom";
import Login from "./screens/login";
import registration from "../src/screens/register";
import forgotPassword from "../src/screens/forgot";
import resetPassword from "../src/screens/reset";
import dashBoard from "../src/screens/dashBoard";
import * as firebase from 'firebase';
import { initializeFirebase } from './pushNotification';
 // Initialize Firebase
 var config = {
  apiKey: "AIzaSyCY0VlAWKLGyhrMN7XO5tBg4rM4CHuV7vQ",
  authDomain: "fundoo-f7774.firebaseapp.com",
  databaseURL: "https://fundoo-f7774.firebaseio.com",
  projectId: "fundoo-f7774",
  storageBucket: "fundoo-f7774.appspot.com",
  messagingSenderId: "598886060118"
};
initializeFirebase();
//firebase.initializeApp(config);
const messaging = firebase.messaging();
messaging.requestPermission()
.then(function() {
  console.log('Notification permission granted.');
   return messaging.getToken()
})
.then(function(token) {
  console.log('token is ',token);
})
.catch(function(err) {
  console.log('Unable to get permission to notify.', err);
});


const PrivateRoute =({ component : Component, ...rest})=>(
<Route {...rest} render={props => (
localStorage.getItem('token') ? (
<Component {...props}/>
) : (
//If the user is not logged in then we can redirect to a login page.
<Redirect to={{
pathname: '/login',
state: { from: props.location }
}}/>
)
)}/>
)
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
            <PrivateRoute path="/dashBoard" component={dashBoard}></PrivateRoute>
          </div>
        </Router>
      </div>  
    );
  }
}
export default App;
