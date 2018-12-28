'use strict';

const yaml = require('js-yaml');
const fs = require('fs');
const request = require('request');
const Task = require('../models/usuarios');

const test_api = async (req, res) => {
    console.log("Datos a Insertar");
    console.log(req.body);
    const task = new Task(req.body);
    // Inserta
    const tasks = await Task.find();
    await task.save();
    // Lista
    console.log(tasks);

    const listar = await Task.find();
    console.log(listar);

    res.status(200).send("API Conectada");
};

const subir_itinerario = async (req, res) => {

    console.log("SUBIR ARCHIVO");
    let ruta;

    const formidable = require('formidable');
    const path = require('path');
    const uploadDir = path.join('./'); //i made this  before the function because i use it multiple times for deleting later

    console.log("Ruta Archivo");
    console.log(uploadDir);

    var form = new formidable.IncomingForm();
    form.multiples = true;
    form.keepExtensions = true;
    form.uploadDir = uploadDir;

    ruta = form.uploadDir;

    form.parse(req, async (err, fields, files) => {
        console.log("=================== Test =======================");
        console.log(fields);
        console.log("=========================================");
        let data = JSON.stringify(files['myfiles[]']);

        let datos = JSON.parse(data);
        console.log(datos.path);
        ruta = ruta + "" + datos.path;

        console.log("Ruta Documento");
        console.log(ruta);

        if (err) {
            return res.status(500).json({ error: err });
        } else {

            let json_ruta = {
                ruta: ruta
            };
            let salida;
            await csv_to_json(json_ruta).then(function (result) {
                salida = result;
            });
            console.log(salida.payload);
            let salida2;
            await insert_itinerarios(salida.payload).then(function (result) {
                salida2 = result;
            });

            res.status(200).json({ uploaded: true });
        }
    });
};

const insert_itinerarios = data => {
    console.log("=================================FELIPE ===============================");
    console.log(data);
    try {
        return new Promise(resolve => {
            request({
                url: "http://localhost/insertItinerarios",
                method: "POST",
                json: true,
                headers: {
                    'Content-Type': 'application/json'

                },
                body: data
            }, function (error, response, body) {

                if (body.status == 200) {
                    console.log(body.payload);
                    resolve({ 'status': true, 'reporte': body.payload });
                } else {
                    resolve({ 'status': false, 'reporte': "Sin Data" });
                }
            });
        });
    } catch (err) {
        throw new Error('Error Obtener Reporte ' + err);
    }
};

const csv_to_json = data => {

    try {
        return new Promise(resolve => {
            request({
                url: "http://localhost/csvtojson",
                method: "POST",
                json: true,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: data
            }, function (error, response, body) {
                console.log("================ Tranformar CSV ================");
                console.log(body);
                console.log(error);
                console.log(response);
                if (body.status == 200) {
                    console.log(body.payload);
                    resolve({ 'status': true, 'payload': body.payload });
                } else {
                    resolve({ 'status': false, 'payload': "Sin Data" });
                }
            });
        });
    } catch (err) {
        throw new Error('Error Obtener Reporte ' + err);
    }
};

/*=================ITINERARIOS==============*/

/*=================TIEMPODISTANCIA==============*/
const subir_tiempodistancia = async (req, res) => {

    console.log("SUBIR ARCHIVO");
    let ruta;

    const formidable = require('formidable');
    const path = require('path');
    const uploadDir = path.join('./'); //i made this  before the function because i use it multiple times for deleting later

    console.log("Ruta Archivo");
    console.log(uploadDir);

    var form = new formidable.IncomingForm();
    form.multiples = true;
    form.keepExtensions = true;
    form.uploadDir = uploadDir;

    ruta = form.uploadDir;

    form.parse(req, async (err, fields, files) => {
        console.log("=================== Test =======================");
        console.log(fields);
        console.log("=========================================");
        let data = JSON.stringify(files['myfiles[]']);

        let datos = JSON.parse(data);
        console.log(datos.path);
        ruta = ruta + "" + datos.path;

        console.log("Ruta Documento");
        console.log(ruta);

        if (err) {
            return res.status(500).json({ error: err });
        } else {

            let json_ruta = {
                ruta: ruta
            };
            let salida;
            await csv_to_json(json_ruta).then(function (result) {
                salida = result;
            });
            console.log(salida.payload);
            let salida2;
            await insert_tiempodistancia(salida.payload).then(function (result) {
                salida2 = result;
            });

            res.status(200).json({ uploaded: true });
        }
    });
};

const insert_tiempodistancia = data => {
    console.log("=================================FELIPE ===============================");
    console.log(data);
    try {
        return new Promise(resolve => {
            request({
                url: "http://localhost/tiempoDistancia",
                method: "POST",
                json: true,
                headers: {
                    'Content-Type': 'application/json'

                },
                body: data
            }, function (error, response, body) {

                if (body.status == 200) {
                    console.log(body.payload);
                    resolve({ 'status': true, 'reporte': body.payload });
                } else {
                    resolve({ 'status': false, 'reporte': "Sin Data" });
                }
            });
        });
    } catch (err) {
        throw new Error('Error Obtener Reporte ' + err);
    }
};
/*=================TIEMPODISTANCIA==============*/

/*======================ZONAS===================*/
const subir_zonas = async (req, res) => {

    console.log("SUBIR ARCHIVO");
    let ruta;

    const formidable = require('formidable');
    const path = require('path');
    const uploadDir = path.join('./'); //i made this  before the function because i use it multiple times for deleting later

    console.log("Ruta Archivo");
    console.log(uploadDir);

    var form = new formidable.IncomingForm();
    form.multiples = true;
    form.keepExtensions = true;
    form.uploadDir = uploadDir;

    ruta = form.uploadDir;

    form.parse(req, async (err, fields, files) => {
        console.log("=================== Test =======================");
        console.log(fields);
        console.log("=========================================");
        let data = JSON.stringify(files['myfiles[]']);

        let datos = JSON.parse(data);
        console.log(datos.path);
        ruta = ruta + "" + datos.path;

        console.log("Ruta Documento");
        console.log(ruta);

        if (err) {
            return res.status(500).json({ error: err });
        } else {

            let json_ruta = {
                ruta: ruta
            };
            let salida;
            await csv_to_json(json_ruta).then(function (result) {
                salida = result;
            });
            console.log(salida.payload);
            let salida2;
            await insert_zonas(salida.payload).then(function (result) {
                salida2 = result;
            });

            res.status(200).json({ uploaded: true });
        }
    });
};

const insert_zonas = data => {
    console.log("=================================FELIPE ===============================");
    console.log(data);
    try {
        return new Promise(resolve => {
            request({
                url: "http://localhost/zonas",
                method: "POST",
                json: true,
                headers: {
                    'Content-Type': 'application/json'

                },
                body: data
            }, function (error, response, body) {

                if (body.status == 200) {
                    console.log(body.payload);
                    resolve({ 'status': true, 'reporte': body.payload });
                } else {
                    resolve({ 'status': false, 'reporte': "Sin Data" });
                }
            });
        });
    } catch (err) {
        throw new Error('Error Obtener Reporte ' + err);
    }
};
/*======================ZONAS===================*/

module.exports = { test_api, subir_itinerario, subir_tiempodistancia, subir_zonas };