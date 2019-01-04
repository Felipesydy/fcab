const yaml = require('js-yaml');
const fs = require('fs');
const csvjson = require('csvjson');
var detect = require('detect-csv');

const gyml = yaml.safeLoad(fs.readFileSync('./config.yml', 'utf8'));

const csvtojson_timedist = (req, res) => {

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
        let keys = "";       
        for(var key in result[0]){ keys = keys+key;}
        console.log(keys);
        if ("origen" == keys.slice(0,6) && "base" == keys.slice(6,10) && "tiempo" == keys.slice(10,16) && "distancia" == keys.slice(16,25)){

            res.json({"status":"200","message":"Succefull", "payload":result})
        }else{

            res.json({"status":"500","message":"Error", "payload":'Error en los nombres de columnas (name_pto - ubic)'})
        }
        
    } else {
        
        res.json({"status":"500","message":"Error", "payload":'CSV debe tener delimitador de tabulación'})
    }
}catch(err){
    console.log(err);
    res.json({"status":"500","message":"Error", "payload":'CSV debe tener delimitador de tabulación'})
}
  

}

module.exports = { csvtojson_timedist }
