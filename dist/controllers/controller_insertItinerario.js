const yaml = require('js-yaml');
const fs = require('fs');
var MongoClient = require('mongodb').MongoClient;

const gyml = yaml.safeLoad(fs.readFileSync('./config.yml', 'utf8'));

const apiName = gyml.app.name;

const insertItinerario = async (req, res) => {
  let event = req.body;
  let resulrepo = {};
  console.log(req);
  await promiseMongo(event).then(function (result) {
    resulrepo = result;
    res.json(resulrepo);
  });
};

const promiseMongo = event => {
  try {
    return new Promise(resolve => {
      var url = gyml.mongo.url;
      MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db(gyml.mongo.bd);
        dbo.collection("mantenedorItinerario").drop(function (err, delOK) {
          if (err) {
            resolve({ "status": "500", "message": "Drop Collection Error" });
          }
          if (delOK) console.log("Collection deleted");
          dbo.createCollection("mantenedorItinerario", function (err, res) {
            if (err) {
              resolve({ "status": "500", "message": "Create Collection Error" });
            }
            console.log("Collection created!");
            let data = event;

            dbo.collection("mantenedorItinerario").insertMany(event, function (err, res) {
              if (err) {
                resolve({ "status": "500", "message": "Insert Document Error" });
              }
            });
            db.close();
            console.log("Insert all documents");
            resolve({ "status": "200", "message": "Succefull" });
          });
        });
      });
    });
  } catch (err) {
    console.log({ 'status': 500, 'message': "Error al ejecutar proceso de Itinerarios" });
    resolve({ 'status': 500, 'message': "Error al ejecutar proceso de Itinerarios" });
  }
};

module.exports = { insertItinerario };