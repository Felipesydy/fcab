'use strict';

var express = require('express');
var bodyParser = require('body-parser');

var yaml = require('js-yaml');
var fs = require('fs');

var gyml = yaml.safeLoad(fs.readFileSync('config.yml', 'utf8'));

var servicePort = gyml.app.port;

var port = process.env.PORT || servicePort;

var app = express();


app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
  res.header('Content-Type', 'text/plain');
  res.header('Allow', 'GET,POST,PUT,DELETE');
  next();
});
var session = require("express-session");

app.use(session({
  secret: "fcab",
  cookie: { maxAge: 1000 * 3 * 50000 },
  resave: true,
  saveUninitialized: true

}));

app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
    app.use(bodyParser.json({limit: '50mb', extended: true}));

const mongoose = require('mongoose');

mongoose.connect('mongodb://mongoadmin:M0nG0DB18@146.83.7.46:20017/admin/datamaster')
  .then(db => console.log('MongoDB Conectado'))
  .catch(err => console.log(err));

// Configuracion views EJS
app.set('views', './aplicacion/views');
app.set('view engine', 'ejs');


const path = require('path')
var publicPath = path.resolve(__dirname, 'static');  
app.use(express.static(publicPath));

var sample_routes = require('./routes/routes');

app.use('/', sample_routes);

app.listen(port, function () {
  console.log('Servidor Corriendo en http://127.0.0.1:' + port + '/');
});

module.exports = app;