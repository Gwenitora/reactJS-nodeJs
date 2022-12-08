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
  let body = req.body;
  if (body._id) {
    body._id = ObjectId(body._id);
  }
  return body;
}
const listBDD = async (collection, body) => {
  return await new Promise(res => {
    dbo.getDb().collection(collection).find(body).toArray((err,result) => {
      res(result);
    });
  });
};
const insertBDD = function(collection, body){
  console.log('Insert ', collection, ':', body);
  const dbConnect = dbo.getDb();
  const collPokemon = dbConnect.collection(collection);
  collPokemon.insert(body);
};
const deleteBDD = function(collection, body){
  console.log('Delete ', collection, ':', body);
  const dbConnect = dbo.getDb();
  const collPokemon = dbConnect.collection(collection);
  collPokemon.deleteOne(body);
};
const updateBDD = function(collection, body){
  console.log('Update ', collection, ':', body);
  const dbConnect = dbo.getDb();
  const collPokemon = dbConnect.collection(collection);
  collPokemon.updateOne(body.before, {$set: body.after});
};
const getID = function(array){
  ids = []
  array.forEach(element => 
    ids.push(element._id)
  );
};

// Types
app.post("/type/list",jsonParser, async function (req, res) {
  const result = await listBDD("types", body(req, res), res);
  res.json(result);
});
app.post('/type/insert', jsonParser, (req, res) => {
  insertBDD("types", body(req, res));
});
app.delete('/type/delete', jsonParser, (req, res) => {
  deleteBDD("types", body(req, res));
});
app.post('/type/update', jsonParser, (req, res) => {
  updateBDD("types", body(req, res));
});
// Pokémons 
app.post("/pokemon/list",jsonParser, async (req, res) => {
  const result = await listBDD("pokemons", body(req, res), res).then((hh)=>hh);
  await res.json(result);
});
app.post('/pokemon/insert', jsonParser, async (req, res) => {
  insertBDD("pokemons", body(req, res));
  var type = await listBDD("types", body(req, res));
  type = getID(type)
  var insertType = [body(req, res), type];
  updateBDD("pokemons", insertType);
});
app.delete('/pokemon/delete', jsonParser, (req, res) => {
  deleteBDD("pokemons", body(req, res));
});
app.post('/pokemon/update', jsonParser, (req, res) => {
  updateBDD("pokemons", body(req, res));
});
// Pokadex
app.post("/pokadex/list",jsonParser, async function (req, res) {
  const result = await listBDD("pokadex", body(req, res));
  res.json(result)
});
app.post('/pokadex/insert', jsonParser, async (req, res) => {
  var pokemon = await listBDD("pokemons", body(req, res));
  pokemon = getID(pokemon)
  insertBDD("pokadex", pokemon);
});
app.delete('/pokadex/delete', jsonParser, (req, res) => {
  deleteBDD("pokadex", body(req, res));
});

app.listen(port, function () {
  console.log(`App listening on port ${port}!`);
});