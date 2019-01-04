'use strict'

var express = require('express');
var api_prueba = require('../controllers/controller_api');

var api = express.Router();


var itinerarios = require('../controllers/controller_insertItinerario');
var csvtojson = require('../controllers/controller_csvtojson');
var csvtojson_zona = require('../controllers/controller_csvtojson_zona');
var csvtojson_timedist = require('../controllers/controller_csvtojson_timedist');
var tiempoDistancia = require('../controllers/controller_tiempoDistancia');
var zonas = require('../controllers/controller_zonas');

api.post('/insertItinerarios', itinerarios.insertItinerario);
api.post('/csvtojson', csvtojson.csvtojson);
api.post('/csvtojson_zona', csvtojson_zona.csvtojson_zona);
api.post('/csvtojson_timedist', csvtojson_timedist.csvtojson_timedist);
api.post('/tiempoDistancia', tiempoDistancia.tiempoDistancia);
api.post('/zonas', zonas.zonas);


api.post('/insertar', api_prueba.test_api);

api.post('/subir_itinerario', api_prueba.subir_itinerario);
api.post('/subir_tiempodistancia', api_prueba.subir_tiempodistancia);
api.post('/subir_zonas', api_prueba.subir_zonas);

var usuarios = require('../controllers/controller_usuarios');

api.post('/login', usuarios.login);
api.post('/validar_session', usuarios.validar_session);
api.post('/listar_usuarios', usuarios.listar_usuarios);
api.post('/insertar_usuarios', usuarios.insertar_usuarios);
api.post('/obtener_por_id_usuarios', usuarios.obtener_por_id_usuarios);
api.post('/actualizar_usuarios', usuarios.actualizar_usuarios);
api.post('/eliminar_usuarios/:id', usuarios.eliminar_usuarios);
api.post('/enviar_pass', usuarios.enviar_pass);



var parametros = require('../controllers/controller_parametros');


api.post('/listar_parametros', parametros.listar_parametros);
api.post('/insertar_parametros', parametros.insertar_parametros);
api.post('/obtener_por_id_parametros', parametros.obtener_por_id_parametros);
api.post('/actualizar_parametros', parametros.actualizar_parametros);
api.post('/eliminar_parametros/:id', parametros.eliminar_parametros);

var tipoparametro = require('../controllers/controller_tipoparametro');


api.post('/listar_tipoparametro', tipoparametro.listar_tipoparametro);
api.post('/insertar_tipoparametro', tipoparametro.insertar_tipoparametro);
api.post('/obtener_por_id_tipoparametro', tipoparametro.obtener_por_id_tipoparametro);
api.post('/actualizar_tipoparametro', tipoparametro.actualizar_tipoparametro);
api.post('/eliminar_tipoparametro/:id', tipoparametro.eliminar_tipoparametro);
api.post('/obtener_todo_tipoparametro', tipoparametro.obtener_todo_tipoparametro);



// Vistas

api.get('/', function (req, res) {
    let session = req.session.nombre_usuario;

    switch (req.session.tipo_usuario) {
        case "Super":
            res.type('text/html');
            res.render('usuarios', {
                nombre_usuario: session,
                perfil: req.session.tipo_usuario
            }, function (err, html) {
                if (err) throw err;
                res.send(html);
            });
            break;

        case "Master":

            res.type('text/html');
            res.render('usuarios', {
                nombre_usuario: session,
                perfil: req.session.tipo_usuario
            }, function (err, html) {
                if (err) throw err;
                res.send(html);
            });
            break;

        case "Optimiza":
            res.type('text/html');
            res.render('miscasos', {
                nombre_usuario: session,
                perfil: req.session.tipo_usuario
            }, function (err, html) {
                if (err) throw err;
                res.send(html);
            });
            break;


        default:
            res.type('text/html');
            res.render('index', {
            }, function (err, html) {
                if (err) throw err;
                res.send(html);
            });
            break;

    }


});

api.get('/usuarios', function (req, res) {
    let session = req.session.nombre_usuario;
    switch (req.session.tipo_usuario) {
        case "Super":
            res.type('text/html');
            res.render('usuarios', {
                nombre_usuario: session,
                perfil: req.session.tipo_usuario
            }, function (err, html) {
                if (err) throw err;
                res.send(html);
            });
            break;

        case "Master":

            res.type('text/html');
            res.render('usuarios', {
                nombre_usuario: session,
                perfil: req.session.tipo_usuario
            }, function (err, html) {
                if (err) throw err;
                res.send(html);
            });
            break;

        case "Optimiza":
            res.type('text/html');
            res.render('miscasos', {
                nombre_usuario: session,
                perfil: req.session.tipo_usuario
            }, function (err, html) {
                if (err) throw err;
                res.send(html);
            });
            break;


        default:
            res.type('text/html');
            res.render('index', {
            }, function (err, html) {
                if (err) throw err;
                res.send(html);
            });
            break;

    }


});

api.get('/parametros', function (req, res) {
    let session = req.session.nombre_usuario;
    switch (req.session.tipo_usuario) {
        case "Super":
            res.type('text/html');
            res.render('parametros', {
                nombre_usuario: session,
                perfil: req.session.tipo_usuario
            }, function (err, html) {
                if (err) throw err;
                res.send(html);
            });
            break;

        case "Master":
            res.type('text/html');
            res.render('parametros', {
                nombre_usuario: session,
                perfil: req.session.tipo_usuario
            }, function (err, html) {
                if (err) throw err;
                res.send(html);
            });
            break;
        case "Optimiza":
            res.type('text/html');
            res.render('miscasos', {
                nombre_usuario: session,
                perfil: req.session.tipo_usuario
            }, function (err, html) {
                if (err) throw err;
                res.send(html);
            });
            break;
        default:
            res.type('text/html');
            res.render('index', {
            }, function (err, html) {
                if (err) throw err;
                res.send(html);
            });
            break;
    }

});

 

api.get('/itinerarios', function (req, res) {
    
    let session = req.session.nombre_usuario;
    switch (req.session.tipo_usuario) {
        case "Super":
            res.type('text/html');
            res.render('itinerarios', {
                nombre_usuario: session,
                perfil: req.session.tipo_usuario
            }, function (err, html) {
                if (err) throw err;
                res.send(html);
            });
            break;

        case "Master":
            res.type('text/html');
            res.render('itinerarios', {
                nombre_usuario: session,
                perfil: req.session.tipo_usuario
            }, function (err, html) {
                if (err) throw err;
                res.send(html);
            });
            break;
        case "Optimiza":
            res.type('text/html');
            res.render('miscasos', {
                nombre_usuario: session,
                perfil: req.session.tipo_usuario
            }, function (err, html) {
                if (err) throw err;
                res.send(html);
            });
            break;
        default:
            res.type('text/html');
            res.render('index', {
            }, function (err, html) {
                if (err) throw err;
                res.send(html);
            });
            break;
    }

});

api.get('/tipoparametro', function (req, res) {
    let session = req.session.nombre_usuario;
    switch (req.session.tipo_usuario) {
        case "Super":
            res.type('text/html');
            res.render('tipoparametro', {
                nombre_usuario: session,
                perfil: req.session.tipo_usuario
            }, function (err, html) {
                if (err) throw err;
                res.send(html);
            });
            break;

        case "Master":
            res.type('text/html');
            res.render('tipoparametro', {
                nombre_usuario: session,
                perfil: req.session.tipo_usuario
            }, function (err, html) {
                if (err) throw err;
                res.send(html);
            });
            break;
        case "Optimiza":
            res.type('text/html');
            res.render('miscasos', {
                nombre_usuario: session,
                perfil: req.session.tipo_usuario
            }, function (err, html) {
                if (err) throw err;
                res.send(html);
            });
            break;
        default:
            res.type('text/html');
            res.render('index', {
            }, function (err, html) {
                if (err) throw err;
                res.send(html);
            });
            break;
    }
});

api.get('/tiempodistancia', function (req, res) {
    let session = req.session.nombre_usuario;
    switch (req.session.tipo_usuario) {
        case "Super":
            res.type('text/html');
            res.render('tiempodistancia', {
                nombre_usuario: session,
                perfil: req.session.tipo_usuario
            }, function (err, html) {
                if (err) throw err;
                res.send(html);
            });
            break;

        case "Master":
            res.type('text/html');
            res.render('tiempodistancia', {
                nombre_usuario: session,
                perfil: req.session.tipo_usuario
            }, function (err, html) {
                if (err) throw err;
                res.send(html);
            });
            break;
        case "Optimiza":
            res.type('text/html');
            res.render('miscasos', {
                nombre_usuario: session,
                perfil: req.session.tipo_usuario
            }, function (err, html) {
                if (err) throw err;
                res.send(html);
            });
            break;
        default:
            res.type('text/html');
            res.render('index', {
            }, function (err, html) {
                if (err) throw err;
                res.send(html);
            });
            break;
    }
});

api.get('/zonas', function (req, res) {
    let session = req.session.nombre_usuario;
    switch (req.session.tipo_usuario) {
        case "Super":
            res.type('text/html');
            res.render('zonas', {
                nombre_usuario: session,
                perfil: req.session.tipo_usuario
            }, function (err, html) {
                if (err) throw err;
                res.send(html);
            });
            break;

        case "Master":
            res.type('text/html');
            res.render('zonas', {
                nombre_usuario: session,
                perfil: req.session.tipo_usuario
            }, function (err, html) {
                if (err) throw err;
                res.send(html);
            });
            break;
        case "Optimiza":
            res.type('text/html');
            res.render('miscasos', {
                nombre_usuario: session,
                perfil: req.session.tipo_usuario
            }, function (err, html) {
                if (err) throw err;
                res.send(html);
            });
            break;
        default:
            res.type('text/html');
            res.render('index', {
            }, function (err, html) {
                if (err) throw err;
                res.send(html);
            });
            break;
    }


});

api.get('/miscasos', function (req, res) {
    let session = req.session.nombre_usuario;
    switch (req.session.tipo_usuario) {
        case "Super":
            res.type('text/html');
            res.render('miscasos', {
                nombre_usuario: session,
                perfil: req.session.tipo_usuario
            }, function (err, html) {
                if (err) throw err;
                res.send(html);
            });
            break;

        case "Master":
            res.type('text/html');
            res.render('usuarios', {
                nombre_usuario: session,
                perfil: req.session.tipo_usuario
            }, function (err, html) {
                if (err) throw err;
                res.send(html);
            });
            break;
        case "Optimiza":
            res.type('text/html');
            res.render('miscasos', {
                nombre_usuario: session,
                perfil: req.session.tipo_usuario
            }, function (err, html) {
                if (err) throw err;
                res.send(html);
            });
            break;
        default:
            res.type('text/html');
            res.render('index', {
            }, function (err, html) {
                if (err) throw err;
                res.send(html);
            });
            break;
    }

});
api.get('/otroscasos', function (req, res) {
    let session = req.session.nombre_usuario;
    switch (req.session.tipo_usuario) {
        case "Super":
            res.type('text/html');
            res.render('otroscasos', {
                nombre_usuario: session,
                perfil: req.session.tipo_usuario
            }, function (err, html) {
                if (err) throw err;
                res.send(html);
            });
            break;

        case "Master":
            res.type('text/html');
            res.render('usuarios', {
                nombre_usuario: session,
                perfil: req.session.tipo_usuario
            }, function (err, html) {
                if (err) throw err;
                res.send(html);
            });
            break;
        case "Optimiza":
            res.type('text/html');
            res.render('otroscasos', {
                nombre_usuario: session,
                perfil: req.session.tipo_usuario
            }, function (err, html) {
                if (err) throw err;
                res.send(html);
            });
            break;
        default:
            res.type('text/html');
            res.render('index', {
            }, function (err, html) {
                if (err) throw err;
                res.send(html);
            });
            break;
    }

});

api.get('/salir', (req, res) => {
    req.session.destroy();

    res.type('text/html');
    res.render("index", {}, function (err, html) {
        if (err) throw err;
        res.send(html);
    });

});



module.exports = api;