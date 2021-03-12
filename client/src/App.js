import { GlobalProvider } from './utils/GlobalState';
import logo from './logo.svg';
import Landing from './pages/Landing';
import Home from './pages/Home';
import PlanEvent from './pages/PlanEvent';
import Event from './pages/Event';
import Recipes from './pages/Recipes';
import Signup from './pages/Signup';
import Login from './pages/Login';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Nav from './components/Nav';



function App() {
  return (
    <Router>
      <div className="App">
        <img src={logo} style={{ maxWidth: '10%', margin: '0.1rem' }} alt="logo" />
        <GlobalProvider>
          <Nav />
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/potluck" component={PlanEvent} />
            <Route exact path="/event/:eventId" component={Event} />
            <Route exact path="/recipes" component={Recipes} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </GlobalProvider>
      </div>
    </Router>
  );
}

export default App;
