const express = require("express");
const dbo = require("./db/db");
const app = express();
const port = 4444;
const bodyParser = require('body-parser');
const { ObjectId } = require("mongodb");
app.use(bodyParser.urlencoded({ extended: true }));

const jsonParser = bodyParser.json();
dbo.connectToServer();

const body = async function(req){
  let body = await req.body;
  if (body._id) {
    body._id = await ObjectId(body._id);
  }
  return await new Promise(res => {res(body)});
}
const listBDD = async (collection, body) => {
  console.log('Search ', collection, ':', body)
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
const getID = async function(collection, array){
  return await new Promise(async res => {
    ids = await [];
    for (const element of array) {
      var take = await listBDD(collection, element);
      ids.push(take[0]._id);
    };
    res(ids)
  });
};

// Types
app.post("/type/list",jsonParser, async function (req, res) {
  console.log(" ");
  const bod = await body(req, res);
  const result = await listBDD("types", bod);
  res.json(result);
});
app.post('/type/insert', jsonParser, async (req, res) => {
  console.log(" ");
  const bod = await body(req, res);
  insertBDD("types", bod);
  await res.json({"message": "Your request is sent with sucess"});
});
app.delete('/type/delete', jsonParser, async (req, res) => {
  console.log(" ");
  const bod = await body(req, res);
  await deleteBDD("types", bod);
  await res.json({"message": "Your request is sent with sucess"});
});
app.post('/type/update', jsonParser, async (req, res) => {
  console.log(" ");
  const bod = await body(req, res);
  await updateBDD("types", bod);
  await res.json({"message": "Your request is sent with sucess"});
});
// Pokémons 
app.post("/pokemon/list",jsonParser, async (req, res) => {
  console.log(" ");
  const bod = await body(req, res);
  const result = await listBDD("pokemons", bod);
  await res.json(result);
});
app.post('/pokemon/insert', jsonParser, async (req, res) => {
  console.log(" ");
  const bod = await body(req, res);
  insertBDD("pokemons", bod);
  if (bod.type) {
    var type = await getID("types", bod.type)
    var insertType = {before: bod.name, after: {type: type}};
    updateBDD("pokemons", insertType);
  }
  await res.json({"message": "Your request is sent with sucess"});
});
app.delete('/pokemon/delete', jsonParser, async (req, res) => {
  console.log(" ");
  const bod = await body(req, res);
  await deleteBDD("pokemons", bod);
  await res.json({"message": "Your request is sent with sucess"});
});
app.post('/pokemon/update', jsonParser, async (req, res) => {
  console.log(" ");
  const bod = await body(req, res);
  await updateBDD("pokemons", bod);
  if (bod.after.type) {
    var type = await getID("types", bod.after.type)
    var insertType = {before: bod.before, after: {type: type}};
    updateBDD("pokemons", insertType);
  }
  await res.json({"message": "Your request is sent with sucess"});
});
// Pokadex
app.post("/pokadex/list",jsonParser, async function (req, res) {
  console.log(" ");
  const bod = await body(req, res);
  const result = await listBDD("pokadex", bod);
  res.json(result)
});
app.post('/pokadex/insert', jsonParser, async (req, res) => {
  console.log(" ");
  const bod = await body(req, res);
  var pokemons = await getID("pokemons", bod)
  pokemons.forEach(pokemon => {
    insertBDD("pokadex", {pokaID: pokemon})
  });
  await res.json({"message": "Your request is sent with sucess"});
});
app.delete('/pokadex/delete', jsonParser, async (req, res) => {
  console.log(" ");
  const bod = await body(req, res);
  await deleteBDD("pokadex", bod);
  await res.json({"message": "Your request is sent with sucess"});
});

// Listen
app.listen(port, function () {
  console.log(`App listening on port ${port}!`);
});