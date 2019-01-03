const yaml = require('js-yaml');
const fs = require('fs');
const csvjson = require('csvjson');
var detect = require('detect-csv');

const gyml = yaml.safeLoad(fs.readFileSync('./config.yml', 'utf8'));

const csvtojson = (req, res) => {

    console.log(req.body)
    var options = {
        delimiter : '\t', // optional
        quote     : '"' // optional
    };
    var file_data = fs.readFileSync(req.body.ruta, { encoding : 'utf8'});
    var csv = detect(file_data);
    try{
    if(csv.delimiter != '|' && csv.delimiter != ',' && csv.delimiter != ';'){
        var result = csvjson.toObject(file_data, options);
        //console.log(result); //Converted json object from csv data
    
        res.json({"status":"200","message":"Succefull", "payload":result})
    } else {
        res.json({"status":"500","message":"Error", "payload":'CSV debe tener delimitador de tabulación'})
    }
}catch(err){
    res.json({"status":"500","message":"Error", "payload":'CSV debe tener delimitador de tabulación'})
}
  

}

module.exports = { csvtojson }
