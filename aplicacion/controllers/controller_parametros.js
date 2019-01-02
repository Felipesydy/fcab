const yaml = require('js-yaml');
const fs = require('fs');
const parametros = require('../models/parametros');
const gyml = yaml.safeLoad(fs.readFileSync('./config.yml', 'utf8'));

//################################ Mantenedores <parametros> #####################################

const listar_parametros = (async (req, res) => {
  console.log("Next: " + req.body.start);
  console.log("Limite: " + req.body.length);
  let search = req.body["search[value]"];
  let contador;
  let datos_tabla;
  if (search != "") {

  } else {
    const listar = await parametros.find();
    contador = listar.length
    datos_tabla = { data: [], recordsTotal: 10, recordsFiltered: parseInt(contador) };
    /*
         let data_salida;
        await format_table(listar).then(function (result) {
          data_salida = (result);
        });
    
    
        console.log("Data salida Listar");
    console.log(data_salida.data);
    */
    let nombre_parametro;
    const tipoparametro = require('../models/tipo_parametro');
    const resultado = await tipoparametro.find();

    listar.forEach(element => {
      resultado.forEach(element2 => {
        if (element2.codigo == element.parametro) {
          nombre_parametro = element2.nombre;
        }
      })

      datos_tabla.data.push(new Array(
        nombre_parametro,
        element.valor,
        element.descripcion,
        "<a class='_success' onclick='editar(/" + element._id + "/)' title='Editar' name='ver_detalle' id='ver_detalle'><i class='fas fa-edit'></i></a> | <a title='Eliminar' class='_success' onclick='eliminar(/" + element._id + "/)' name='ver_detalle' id='ver_detalle'><i class='fas fa-close'></i></a>"
      ))
    });
    res.json(datos_tabla);
  }
});
/*
const format_table = (async (datos) => {
  let datos_tabla = { data: [] };

  datos.forEach(async element => {
    let tipo_parametro;

    const tipoparametro = require('../models/tipo_parametro');
    const resultado = await tipoparametro.find({ 'codigo': element.parametro });
    console.log(resultado[0].nombre);
    tipo_parametro = resultado[0].nombre;
    datos_tabla.data.push(new Array(
      tipo_parametro,
      element.valor,
      element.descripcion,
      "<a class='_success' onclick='editar(/" + element._id + "/)' title='Editar' name='ver_detalle' id='ver_detalle'><i class='fas fa-edit'></i></a> | <a title='Eliminar' class='_success' onclick='eliminar(/" + element._id + "/)' name='ver_detalle' id='ver_detalle'><i class='fas fa-close'></i></a>"
    ))
  });

  return datos_tabla;

})
*/
const obtener_por_id_tipoparametro = (async (req, res) => { // Devolver al formulario los datos
  const tipoparametro = require('../models/tipo_parametro');
  const listar = await tipoparametro.find();
  const user = await tipoparametro.find({ '_id': req.body.id });

  res.json(user[0]);
});

const insertar_parametros = (async (req, res) => {
  console.log("########## Insertar parametros #################");
  let data, mensaje;
  await validar(req.body).then(function (result) {
    data = (result);
  });

  if (data.status) {
    const user = new parametros(req.body);
    let salida = await user.save();
    mensaje = {
      status: true,
    }
    res.json(mensaje);
  } else {
    res.json(data);// Salida con errores
  }

});
const obtener_por_id_parametros = (async (req, res) => { // Devolver al formulario los datos
  console.log("======= Obtener por ID ===========");
  const listar = await parametros.find();
  contador = listar.length
  const user = await parametros.find({ '_id': req.body.id });
  console.log(user);
  res.json(user[0]);
});
const actualizar_parametros = (async (req, res) => {
  let data, mensaje;

  await validar(req.body).then(function (result) {
    data = (result);
  });
  if (data.status) {
    let data_actualizar = {
      "parametros": req.body.parametros,
      "valor": req.body.valor,
      "descripcion": req.body.descripcion

    }
    let salida = await parametros.update({ _id: req.body.id }, data_actualizar);
    console.log(salida);
    mensaje = {
      status: true,
    }
    res.json(mensaje);
  } else {
    res.json(data);// Salida con errores
  }
});

const eliminar_parametros = (async (req, res) => {
  let { id } = req.params;
  console.log(req.params);
  let salida = await parametros.remove({ _id: id });
  console.log(salida);
  mensaje = {
    status: true,
  }
  res.json(mensaje);

});

function validar(body) {
  console.log("Entro al validar");
  try {
    return new Promise(resolve => {
      let data;
      data = { error_string: [], inputerror: [], status: true };

      if (body.parametro == '0') {
        data.inputerror.push((('parametro')));
        data.error_string.push((('Debes indicar un parametro')));
        data.status = false;
      }
      if (body.valor == '') {
        data.inputerror.push((('valor')));
        data.error_string.push((('Debes indicar un valor')));
        data.status = false;
      }
      if (body.descripcion == '') {
        data.inputerror.push((('descripcion')));
        data.error_string.push((('Debes indicar una descripcion')));
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

  insertar_parametros,
  listar_parametros,
  obtener_por_id_parametros,
  actualizar_parametros,
  eliminar_parametros

}