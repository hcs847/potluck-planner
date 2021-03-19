import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';

// import { GlobalProvider } from './utils/GlobalState';
import Landing from './pages/Landing';
import Home from './pages/Home';
import PlanEvent from './pages/PlanEvent';
import Event from './pages/Event';
import Recipes from './pages/Recipes';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Header from './components/Header';
import Footer from './components/Footer';

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
        <div className="page-image">
          <div className="page-container">
            <Header />
            <div className="main-container">
              <Switch>
                <Route exact path="/" component={Landing} />
                <Route exact path="/home" component={Home} />
                {/* enabling an option user params for event id */}
                <Route exact path="/potluck/:eventId?" component={PlanEvent} />
                <Route exact path="/event/:eventId" component={Event} />
                <Route exact path="/recipes" component={Recipes} />
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/login" component={Login} />
              </Switch>
            </div>
            <Footer />
          </div>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;

