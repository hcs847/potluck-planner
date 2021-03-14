import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';

import { GlobalProvider } from './utils/GlobalState';
import logo from './logo.svg';
import Landing from './pages/Landing';
import Home from './pages/Home';
import PlanEvent from './pages/PlanEvent';
import Event from './pages/Event';
import Recipes from './pages/Recipes';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Nav from './components/Nav';

const client = new ApolloClient({
  request: (operation) => {
    const token = localStorage.getItem('id_token')
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    })
  },
  uri: '/graphql',
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="App">
          <img src={logo} style={{ maxWidth: '10%', margin: '0.1rem' }} alt="logo" />
          <GlobalProvider>
            <Nav />
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route exact path="/home" component={Home} />
              <Route exact path="/potluck" component={PlanEvent} />
              <Route exact path="/event/:_id" component={Event} />
              <Route exact path="/recipes" component={Recipes} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/login" component={Login} />
            </Switch>
          </GlobalProvider>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;

