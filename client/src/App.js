import logo from './logo.svg';
import Landing from './pages/Landing';
import Recipes from './pages/Recipes';
import Nav from './components/Nav';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


function App() {
  return (
    <Router>
      <div className="App">
        <img src={logo} style={{ maxWidth: '10%', margin: '0.1rem' }} alt="logo" />
        <Nav />
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/recipes" component={Recipes} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
