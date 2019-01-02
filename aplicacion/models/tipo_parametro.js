
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const datos = Schema({
  nombre: String,
  codigo: String
  });

module.exports = mongoose.model('tipo_parametro', datos);