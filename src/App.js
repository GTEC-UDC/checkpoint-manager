import './App.css';

import React, { useState } from "react";

import LoginPage from './pages/LoginPage';
import RoutePage from './pages/RoutePage';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";



function App() {
  const [userEmail, setUserEmail] = useState("");
  const [isLogged, setIsLogged] = useState(false);
 
  return (
    <Router>
        <Switch>
          <Route exact path="/">
            <LoginPage 
            userEmail={userEmail} 
            setUserEmail={setUserEmail} 
            isLogged={isLogged}
            setIsLogged={setIsLogged}
            />
          </Route>
          <Route path="/route">
            <RoutePage 
            isLogged={isLogged}
            setIsLogged={setIsLogged}
            />
          </Route>
        </Switch>
    </Router>
  );
}

export default App;
