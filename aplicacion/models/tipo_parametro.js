
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const datos = Schema({
  nombre: String,
  codigo: String,
  status: Boolean
  });

module.exports = mongoose.model('tipo_parametros', datos);