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
        element.usuario,
        element.clave,
        element.tipo,
        "<a class='_success' onclick='editar(/" + element._id + "/)' title='ver detalle' name='ver_detalle' id='ver_detalle'><i class='fas fa-edit'></i></a> | <a title='ver transporte' class='_success' onclick='eliminar(/" + element._id + "/)' name='ver_detalle' id='ver_detalle'><i class='fas fa-close'></i></a>"
      ))

    });
    res.json(datos_tabla);



  }

  /*
    let tracking = new modelo_tracking.modelo_tracking();
    tracking.contar_datos();
  
    let datos_tabla;
    let folio;
    let search = req.body["search[value]"];
    let sap;
  
    if (search != "") {
        console.log("Buscando por IdVtex: " + search);
        datos_tabla = { data: [], recordsTotal: 10, recordsFiltered: parseInt(await tracking.contar_datos_busqueda_idVtex(search.toString())) };
  
        await tracking.obtener_tabla_busqueda(search.toString(), parseInt(req.body.length), parseInt(req.body.start)).then(function(result) {
            data = (result);
        });
        data.forEach(element => {
  
            let orders = JSON.parse(element.json_orders);
            let datos_envio = orders.shipping;
  
            datos_tabla.data.push(new Array(
                (element.order_number),
                (element.name_client),
                (element.status),
                datos_envio[0].address.street + " N°" + datos_envio[0].address.number,
                datos_envio[0].address.state,
                datos_envio[0].address.city,
                moment(element.picking_estimated).format('DD/MM/YYYY'),
                //     element.time_interval,
                moment(element.shipping_date).format('DD/MM/YYYY'),
                moment(element.date).format('DD/MM/YYYY'),
                "<a class='_success' onclick='buscar(" + element.id + ")' title='ver detalle' name='ver_detalle' id='ver_detalle'><i class='fas fa-info-circle'></i></a> | <a title='ver transporte' class='_success' onclick='ver_transporte(" + element.id + ")' name='ver_detalle' id='ver_detalle'><i class='fas fa-truck'></i></a>"
            ))
  
  
  
  
  
        });
  
    } else {
  
        datos_tabla = { data: [], recordsTotal: 10, recordsFiltered: parseInt(await tracking.contar_datos()) };
  
        await tracking.obtener_tabla(parseInt(req.body.length), parseInt(req.body.start)).then(function(result) {
            data = (result);
  
        });
        data.forEach(element => {
  
            let orders = JSON.parse(element.json_orders);
            let datos_envio = orders.shipping;
  
            datos_tabla.data.push(new Array(
                (element.order_number),
                (element.name_client),
                (element.status),
                datos_envio[0].address.street + " N°" + datos_envio[0].address.number,
                datos_envio[0].address.state,
                datos_envio[0].address.city,
                moment(element.picking_estimated).format('DD/MM/YYYY'),
                //     element.time_interval,
                moment(element.shipping_date).format('DD/MM/YYYY'),
                moment(element.date).format('DD/MM/YYYY'),
                "<a class='_success' onclick='buscar(" + element.id + ")' title='ver detalle' name='ver_detalle' id='ver_detalle'><i class='fas fa-info-circle'></i></a> | <a title='ver transporte' class='_success' onclick='ver_transporte(" + element.id + ")' name='ver_detalle' id='ver_detalle'><i class='fas fa-truck'></i></a>"
            ))
  
  
  
  
        });
    }
    res.json(datos_tabla);
  */
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
  console.log("Datos a Insertar");
  console.log(req.body);
  const User = require('../models/usuarios');
  const usuarios = new User(req.body);
  let salida = await usuarios.save();
  console.log(salida);
  mensaje = {
    status: true,
  }
  res.json(mensaje);

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
  console.log("Datos a Actualizar");
  console.log(req.body);

  let data_actualizar = {
    "nombre": req.body.nombre,
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

 




module.exports = {

  insertar_usuarios,
  login,
  validar_session,
  listar_usuarios,
  obtener_por_id_usuarios,
  actualizar_usuarios,
  eliminar_usuarios

}