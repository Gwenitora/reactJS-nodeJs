const express = require("express");
const dbo = require("./db/db");
const app = express();
const port = 4444;
const bodyParser = require('body-parser');
const { ObjectId } = require("mongodb");
app.use(bodyParser.urlencoded({ extended: true }));

const jsonParser = bodyParser.json();
dbo.connectToServer();

const body = function(req){
  const body = req.body;
  if (body._id) {
    body._id = ObjectId(body._id);
  }
  return body;
}
const listBDD = function(collection, body, res){
  const dbConnect = dbo.getDb();
  const collPokemon = dbConnect.collection(collection);
  collPokemon.find(body)
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send("Error fetching pokemons!");
      } else {
        res.json(result);
      }
    });
};
const insertBDD = function(collection, body, res){
  res.json(body);
  console.log('Insert ', collection, ':', body);
  const dbConnect = dbo.getDb();
  const collPokemon = dbConnect.collection(collection);
  collPokemon.insert(body);
};
const deleteBDD = function(collection, body, res){
  res.json(body);
  console.log('Delete ', collection, ':', body);
  const dbConnect = dbo.getDb();
  const collPokemon = dbConnect.collection(collection);
  collPokemon.deleteOne(body);
};
const updateBDD = function(collection, body, res){
  res.json(body);
  console.log('Update ', collection, ':', body);
  const dbConnect = dbo.getDb();
  const collPokemon = dbConnect.collection(collection);
  collPokemon.updateOne(body.before, {$set: body.after});
};

// Pokémons list
app.post("/type/list",jsonParser, function (req, res) {
  listBDD("types", body(req), res);
});
app.post('/type/insert', jsonParser, (req, res) => {
  insertBDD("types", body(req), res);
});
app.delete('/type/delete', jsonParser, (req, res) => {
  deleteBDD("types", body(req), res);
});
app.post('/type/update', jsonParser, (req, res) => {
  updateBDD("types", body(req), res);
});
// Pokémons list
app.post("/pokemon/list",jsonParser, function (req, res) {
  listBDD("pokemons", body(req), res);
});
app.post('/pokemon/insert', jsonParser, (req, res) => {
  insertBDD("pokemons", body(req), res);
});
app.delete('/pokemon/delete', jsonParser, (req, res) => {
  deleteBDD("pokemons", body(req), res);
});
app.post('/pokemon/update', jsonParser, (req, res) => {
  updateBDD("pokemons", body(req), res);
});
// Pokadex
app.post("/pokadex/list",jsonParser, function (req, res) {
  listBDD("pokadex", body(req), res);
});
app.post('/pokadex/insert', jsonParser, (req, res) => {
  insertBDD("pokadex", listBDD("pokemons", body(req, res), res), res);
});
app.delete('/pokadex/delete', jsonParser, (req, res) => {
  deleteBDD("pokadex", body(req), res);
});

app.listen(port, function () {
  console.log(`App listening on port ${port}!`);
});