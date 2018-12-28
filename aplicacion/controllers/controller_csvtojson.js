const yaml = require('js-yaml');
const fs = require('fs');
const csvjson=require('csvjson')


const gyml = yaml.safeLoad(fs.readFileSync('./config.yml', 'utf8'));

const apiName = gyml.app.name;

const csvtojson = (req, res) => {

    console.log(req.body)
    var options = {
        delimiter : '\t', // optional
        quote     : '"' // optional
    };
    var file_data = fs.readFileSync(req.body.ruta, { encoding : 'utf8'});

    var result = csvjson.toObject(file_data, options);
    console.log(result); //Converted json object from csv data

    res.json({"status":"200","message":"Succefull", "payload":result})  

}

module.exports = { csvtojson }
