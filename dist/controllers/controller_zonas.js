const yaml = require('js-yaml');
const fs = require('fs');
var MongoClient = require('mongodb').MongoClient;

const gyml = yaml.safeLoad(fs.readFileSync('./config.yml', 'utf8'));

const apiName = gyml.app.name;

const zonas = async (req, res) => {
  let event = req.body;
  let resulrepo = {};
  console.log(req);
  await promiseMongo(event).then(function (result) {
    resulrepo = result;
    res.json(resulrepo);
  });
};

const promiseMongo = (event, cambio) => {
  try {
    return new Promise(resolve => {
      var url = gyml.mongo.url;
      MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db(gyml.mongo.bd);
        dbo.collection("zonas").drop(function (err, delOK) {
          if (err) {
            resolve({ "code": "500", "message": "Drop Collection Error" });
          }
          if (delOK) console.log("Collection deleted");
          dbo.createCollection("zonas", function (err, res) {
            if (err) {
              resolve({ "code": "500", "message": "Create Collection Error" });
            }
            console.log("Collection created!");
            let data = event;

            dbo.collection("zonas").insertMany(data, function (err, res) {
              if (err) {
                resolve({ "code": "500", "message": "Insert Document Error" });
              }
            });

            db.close();
            console.log("Insert all documents");
            resolve({ "code": "200", "message": "Succefull" });
          });
        });
      });
    });
  } catch (err) {
    console.log({ 'status': 500, 'message': "Error al ejecutar proceso de zonas" });
    resolve({ 'status': 500, 'message': "Error al ejecutar proceso de zonas" });
  }
};

module.exports = { zonas };