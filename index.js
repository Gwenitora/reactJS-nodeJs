const express = require("express");
const dbo = require("./db/db");
const app = express();
const port = 4444;
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

const jsonParser = bodyParser.json();
dbo.connectToServer();

app.get("/pokemon/list", function (req, res) {
  const dbConnect = dbo.getDb();
  const collPokemon = dbConnect.collection("pokemons");
  collPokemon.find({})
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send("Error fetching pokemons!");
      } else {
        res.json(result);
      }
    });
    
});

app.post('/pokemon/insert', jsonParser, (req, res) => {
  const body = req.body;
  console.log('Got body:', body);
  res.json(body);
  const dbConnect = dbo.getDb();
  const collPokemon = dbConnect.collection("pokemons");
  collPokemon.insert(body);
});

app.listen(port, function () {
  console.log(`App listening on port ${port}!`);
});