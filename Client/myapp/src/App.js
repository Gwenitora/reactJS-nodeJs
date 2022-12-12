import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';
import Home from './pages/home';
import {PokemonSearch, PokadexSearch} from "./api/commandes";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/pokaball">
          <PokemonSearch />
        </Route>
        <Route path="/pokadex">
          <PokadexSearch />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
