import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';
import Home from './pages/home';
import Pokaball from './components/pokaball';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/pokaball">
          <Pokaball />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
