import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';
import {Home} from './pages/home';
import {Header} from "./components/header";
import {Footer} from "./components/footer";
import {PokemonSearch, PokadexSearch, PokemonDescription, PokemonEdit} from "./api/commandes";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/home">
          <Header pos="left" />
          <Home />
          <Footer pos="left" />
        </Route>
        <Route path="/pokemon/edit/:id"
          children={
            <>
              <Header pos="left" />
              <PokemonEdit />
              <Footer pos="left" />
            </>
          }
        />
        <Route path="/pokemon/:id"
          children={
            <>
              <Header pos="right" />
              <PokemonDescription />
              <Footer pos="right" />
            </>
          }
        />
        <Route path="/pokaball">
          <Header pos="" />
          <PokemonSearch />
          <Footer pos="" />
        </Route>
        <Route path="/pokadex">
          <Header pos="right" />
          <PokadexSearch />
          <Footer pos="right" />
        </Route>
        <Route path="/">
          <Header pos="left" />
          <Home />
          <Footer pos="left" />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
