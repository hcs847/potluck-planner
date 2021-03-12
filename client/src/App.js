import logo from './logo.svg';
import Landing from './pages/Landing';
import Recipes from './pages/Recipes';
import Signup from './pages/Signup';
import Login from './pages/Login';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Nav from './components/Nav';

// reactstrap?
import 'bootsrap/dist/css/bootstrap.min.css'
// import Button from 'react-bootstrap/Button';
import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'
// import {
//  Container, Col, Form,
//  FormGroup, Label, Input,
//  Button,} 
//  from 'reactstrap';
import './App.css';


function App() {
  return (
    <Router>
      <div className="App">
        <img src={logo} style={{ maxWidth: '10%', margin: '0.1rem' }} alt="logo" />
        <Nav />
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/recipes" component={Recipes} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

