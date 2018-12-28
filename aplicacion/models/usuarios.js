
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = Schema({
  nombre: String,
  email: String,
  usuario: String,
  clave: String,
  tipo: String
});

module.exports = mongoose.model('Usuarios', TaskSchema);