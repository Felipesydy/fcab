const yaml = require('js-yaml');
const fs = require('fs');
const usuarios = require('../models/usuarios');
const gyml = yaml.safeLoad(fs.readFileSync('./config.yml', 'utf8'));

const login = (async (req, res) => {
  console.log("=========== Entro al Login ============");
  let mensaje;

  console.log(req.body);
  if (!req.body.usuario || !req.body.clave) {
    console.log("Error en Parametros de Entrada");
    mensaje = {
      status: false,
      message: "Error en Parametros de Entrada"
    }
    res.json(mensaje);
  } else {
    const User = require('../models/usuarios');
    const user = await User.find({ 'usuario': req.body.usuario });

    if (user.length != 0) {
      console.log(user);
      console.log(user[0].clave);
      if (user[0].clave == req.body.clave) {

        req.session.nombre_usuario = user[0].nombre;
        req.session.tipo_usuario = user[0].tipo;
        mensaje = {
          status: true,
          message: "Usuario Conectado"
        }
        res.json(mensaje);
      } else {
        console.log("La Clave no corresponde al Usuario");
        mensaje = {
          status: false,
          message: "La Clave no corresponde al Usuario"
        }
        res.json(mensaje);

      }
    } else {
      console.log("No existe el usuario");
      mensaje = {
        status: false,
        message: "No existe el usuario"
      }
      res.json(mensaje);
    }
  }
});

const listar_usuarios = (async (req, res) => {
  console.log("Next: " + req.body.start);
  console.log("Limite: " + req.body.length);
  let search = req.body["search[value]"];
  let contador;

  let datos_tabla;
  if (search != "") {

  } else {
    const listar = await usuarios.find();
    contador = listar.length
    datos_tabla = { data: [], recordsTotal: 10, recordsFiltered: parseInt(contador) };

    listar.forEach(element => {
      datos_tabla.data.push(new Array(
        element.nombre,
        element.email,
        element.usuario,
        //element.clave,
        "********",
        element.tipo,
        "<a class='_success' onclick='editar(/" + element._id + "/)' title='Editar' name='ver_detalle' id='ver_detalle'><i class='fas fa-edit'></i></a> | <a title='Eliminar' class='_success' onclick='eliminar(/" + element._id + "/)' name='ver_detalle' id='ver_detalle'><i class='fas fa-close'></i></a>"
      ))

    });
    res.json(datos_tabla);

  }

});


const validar_session = ((req, res) => {
  let session = req.session.nombre_usuario;

  console.log(req.session.nombre_usuario);

  if (typeof session === 'undefined') {

    console.log("Session no Valida");
    res.json({
      validar: false,
      status: false
    })


  } else {
    console.log("Session Valida");
    res.json({
      validar: true,
      status: true
    })
  }
});


//################################ Mantenedores <usuarios> #####################################

const insertar_usuarios = (async (req, res) => {
  console.log("########## Insertar Usuarios #################");
  let data, mensaje;
  await validar(req.body).then(function (result) {
    data = (result);
  });

  if (data.status) {
    const user = new usuarios(req.body);
    let salida = await user.save();
    mensaje = {
      status: true,
    }
    res.json(mensaje);
  } else {
    res.json(data);// Salida con errores
  }

});
const obtener_por_id_usuarios = (async (req, res) => { // Devolver al formulario los datos
  console.log("======= Obtener por ID ===========");
  const listar = await usuarios.find();
  contador = listar.length
  const user = await usuarios.find({ '_id': req.body.id });
  console.log(user);
  res.json(user[0]);
});
const actualizar_usuarios = (async (req, res) => {
  let data, mensaje;

  await validar(req.body).then(function (result) {
    data = (result);
  });
  if (data.status) {
    let data_actualizar = {
      "nombre": req.body.nombre,
      "email": req.body.email,
      "usuario": req.body.usuario,
      "clave": req.body.clave,
      "tipo": req.body.tipo,
    }
    let salida = await usuarios.update({ _id: req.body.id }, data_actualizar);
    console.log(salida);
    mensaje = {
      status: true,
    }
    res.json(mensaje);
  } else {
    res.json(data);// Salida con errores
  }
});

const eliminar_usuarios = (async (req, res) => {
  let { id } = req.params;
  console.log(req.params);
  let salida = await usuarios.remove({ _id: id });
  console.log(salida);
  mensaje = {
    status: true,
  }
  res.json(mensaje);

});



function validar(body) {
  const User = require('../models/usuarios');
  console.log("Entro al validar");
  try {
    return new Promise(async resolve => {
      let data;
      data = { error_string: [], inputerror: [], status: true };

      if (body.nombre == '') {
        data.inputerror.push((('nombre')));
        data.error_string.push((('Debes indicar un nombre')));
        data.status = false;
      }
      if (body.email == '') {
        data.inputerror.push((('email')));
        data.error_string.push((('Debes indicar un email')));
        data.status = false;
      }
      if (body.usuario == '') {
        data.inputerror.push((('usuario')));
        data.error_string.push((('Debes indicar un usuario')));
        data.status = false;
      }
      if (body.clave == '') {
        data.inputerror.push((('clave')));
        data.error_string.push((('Debes indicar una clave')));
        data.status = false;
      }
      if (body.clave2 == '') {
        data.inputerror.push((('clave2')));
        data.error_string.push((('Debes reingresar una clave')));
        data.status = false;
      }
      if (body.clave2 != body.clave) {
        data.inputerror.push((('clave2')));
        data.error_string.push((('Las claves no coinciden')));
        data.status = false;
      }
      /* */
      if (body.tipo == '0') {
        data.inputerror.push((('tipo')));
        data.error_string.push((('Debes seleccionar un tipo de usuario')));
        data.status = false;
      }

      
      const user = await User.find({ 'usuario': body.usuario });
  
      if(user.length!=0){
        data.inputerror.push((('usuario')));
        data.error_string.push((('Ya se encuentra registrado el usuario')));
        data.status = false;
      }


      const mail = await User.find({ 'email': body.email });
  
      if(mail.length!=0){
        data.inputerror.push((('email')));
        data.error_string.push((('Correo electronico en uso! - Intente con otro')));
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

  insertar_usuarios,
  login,
  validar_session,
  listar_usuarios,
  obtener_por_id_usuarios,
  actualizar_usuarios,
  eliminar_usuarios

}