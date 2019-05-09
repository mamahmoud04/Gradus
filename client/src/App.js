import React from "react";
import {
  BrowserRouter as Router,
  Route,
  // Switch,
  Redirect
} from "react-router-dom";
// Nick Component
// import Graph from "./components/graphs";
// // Sarah Component
// import Piano from "./components/virtualPiano/virtualPiano";

import Exercise from "./pages/Exercise/index";
// import ExCard from "./components/Exercise-Card/ExCard";

//Mahfouz components
import Navbar from "./components/Navbar/Navbar";
import Register from "./components/Register";
import Home from "./pages/Home/Home";
import Login from "./components/LogIn/Login";
import { Provider } from "react-redux";
import store from "./components/actions/store";
import jwt_decode from "jwt-decode";
import setAuthToken from "./components/actions/setAuthToken";
import {
  setCurrentUser,
  logoutUser
} from "./components/actions/authentication";

//Michael components
// import Midi from "./components/Midi/MidiTest";
// import Abcjs from "react-abcjs";

//Ky components
import Landing from "./pages/Landing/index";
import "./index.css";
// import Graphs from "./components/graphs";
// import Toggle from "./components/Toggle/index";
import Footer from "./components/Footer/index";

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = "/login";
  }
}
export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      localStorage.getItem("jwtToken") ? (
        <Component {...props} />
      ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
    }
  />
);

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="main-container">
          <Navbar />
          <Route exact path="/" component={Landing} />
          {/* use for production */}
          {/* <PrivateRoute exact path="/home" component={Home} /> */}
          {/* use for localhost */}
          <Route exact path="/home" component={Home} />

          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          {/* <Route exact path='/exercise/:id' component={thepage} */}

          {/* use for production */}
          {/* <PrivateRoute exact path="/pick-exercise" component={Exercise} /> */}
          {/* use for localhost */}
          <Route exact path='/exercise/:id' component={Exercise} />
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
