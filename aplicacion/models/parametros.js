
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const datos = Schema({
  parametro: String,
  valor: String,
  descripcion: String
});

module.exports = mongoose.model('Parametros', datos);