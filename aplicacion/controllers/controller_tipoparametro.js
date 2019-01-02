 
const tipoparametro = require('../models/tipo_parametro');
 

 //################################ Mantenedores <tipoparametro> #####################################

const listar_tipoparametro = (async (req, res) => {
  console.log("Next: " + req.body.start);
  console.log("Limite: " + req.body.length);
  let search = req.body["search[value]"];
  let contador;
  let datos_tabla;
  if (search != "") {

  } else {
    const listar = await tipoparametro.find();
    contador = listar.length
    datos_tabla = { data: [], recordsTotal: 10, recordsFiltered: parseInt(contador) };

    listar.forEach(element => {
      datos_tabla.data.push(new Array(
        element.nombre,
        element.codigo,
        "<a class='_success' onclick='editar(/" + element._id + "/)' title='Editar' name='ver_detalle' id='ver_detalle'><i class='fas fa-edit'></i></a> | <a title='Eliminar' class='_success' onclick='eliminar(/" + element._id + "/)' name='ver_detalle' id='ver_detalle'><i class='fas fa-close'></i></a>"
      ))
    });
    res.json(datos_tabla);
  }
});
 
const insertar_tipoparametro = (async (req, res) => {
  console.log("########## Insertar tipoparametro #################");
  let data, mensaje;
  await validar(req.body).then(function (result) {
    data = (result);
  });

  if (data.status) {
    const user = new tipoparametro(req.body);
    let salida = await user.save();
    mensaje = {
      status: true,
    }
    res.json(mensaje);
  } else {
    res.json(data);// Salida con errores
  }

});
const obtener_por_id_tipoparametro = (async (req, res) => { // Devolver al formulario los datos
  console.log("======= Obtener por ID ===========");
  const listar = await tipoparametro.find();
  contador = listar.length
  const user = await tipoparametro.find({ '_id': req.body.id });
  console.log(user);
  res.json(user[0]);
});
const actualizar_tipoparametro = (async (req, res) => {
  let data, mensaje;

  await validar(req.body).then(function (result) {
    data = (result);
  });
  if (data.status) {
    let data_actualizar = {
      "nombre": req.body.nombre,
      "codigo": req.body.codigo    
    }
    let salida = await tipoparametro.update({ _id: req.body.id }, data_actualizar);
    console.log(salida);
    mensaje = {
      status: true,
    }
    res.json(mensaje);
  } else {
    res.json(data);// Salida con errores
  }
});

const eliminar_tipoparametro = (async (req, res) => {
  let { id } = req.params;
  console.log(req.params);
  let salida = await tipoparametro.remove({ _id: id });
  console.log(salida);
  mensaje = {
    status: true,
  }
  res.json(mensaje);

});

const obtener_todo_tipoparametro = (async (req, res) => { 
  console.log("======= Obtener por todo Tipo Parametros ===========");
  const listar = await tipoparametro.find();

  console.log(listar);
  res.json(listar);
});

function validar(body) {
  console.log("Entro al validar");
  try {
    return new Promise(resolve => {
      let data;
      data = { error_string: [], inputerror: [], status: true };
 
      if (body.nombre == '') {
        data.inputerror.push((('nombre')));
        data.error_string.push((('Debes indicar un nombre')));
        data.status = false;
      }
      if (body.codigo == '') {
        data.inputerror.push((('codigo')));
        data.error_string.push((('Debes indicar una codigo')));
        data.status = false;
      }
     
     
      if (data.status === false) {
        console.log(data);
        resolve(data);
      } else {
        resolve(data);
      }
    });
  } catch (err) {
    throw new Error('Error al validar formulario ' + err);
  }


}


module.exports = {

  insertar_tipoparametro,
  listar_tipoparametro,
  obtener_por_id_tipoparametro,
  actualizar_tipoparametro,
  eliminar_tipoparametro,
  obtener_todo_tipoparametro

}