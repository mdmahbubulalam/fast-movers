import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Home from './components/Home/Home';
import { createContext, useEffect, useState } from 'react';
import transportData from './data/data.json'
import Login from './components/Login/Login';
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Nav, Navbar } from 'react-bootstrap';
import Destination from './components/Destination/Destination';
import PrivateRoute from './components/ProvateRoute/PrivateRoute';

export const UserContext = createContext();


function App() {
  const [loggedInUser,setLoggedInUser] = useState({});

  return (
    <div className="background-image">
      <div className="container">
        <p>name : {loggedInUser.name}</p>
        <Navbar>
          <Navbar.Brand className="mr-auto" href="/home">Fast Movers</Navbar.Brand>
            <Nav>
              <Nav.Link href="/home">Home</Nav.Link>
              <Nav.Link href="/destination">Destination</Nav.Link>
              <Nav.Link href="#pricing">Blog</Nav.Link>
              <Nav.Link href="/login">Contact</Nav.Link>
              <a role="button" className="btn btn-success" href="/login">Login</a>
            </Nav>          
        </Navbar>

        <UserContext.Provider value={[loggedInUser,setLoggedInUser]}>
        <Router>
            <Switch>
              <Route path="/home">
                <Home />
              </Route>
              <PrivateRoute path="/destination/:id">
                <Destination />
              </PrivateRoute>
              <Route path="/login">
                <Login />
              </Route>
              {/* <PrivateRoute path="/book/:bedType">
                <Book />
              </PrivateRoute> */}
              <Route exact path="/">
                <Home />
              </Route>
            </Switch>
        </Router>
      </UserContext.Provider>
    </div>
  </div>
  );
}

export default App;
