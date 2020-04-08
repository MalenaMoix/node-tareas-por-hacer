const fs = require('fs');

let listadoPorHacer = [];

const guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer);

    fs.writeFile('db/data.json', data, (err) => {
        if (err) throw new Error('La tarea no pudo ser guardada', err);
    });
}

const cargarDB = () => {

    //Tengo que hacer lo siguiente porque si el json esta completamente vacio no es un json valido
    //Entonces de esta manera si pasa algun error lo voy a trabajar como [] es decir como un json vacio pero valido

    try {
        listadoPorHacer = require('../db/data.json');
    } catch (error) {
        listadoPorHacer = [];
    }

}

const crear = (descripcion) => {

    cargarDB();

    let tarea = {
        descripcion,
        completado: false
    };

    listadoPorHacer.push(tarea);
    guardarDB();
    return tarea;
}

const getListadoTareas = () => {
    cargarDB();
    return listadoPorHacer;
}

const actualizar = (descripcion, completado = true) => {
    cargarDB();

    let index = listadoPorHacer.findIndex(tarea => {
        return tarea.descripcion === descripcion;
    })

    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }
}

const borrar = (descripcion) => {
    cargarDB();

    let nuevoListado = listadoPorHacer.filter(tarea => {
        return tarea.descripcion !== descripcion
    });


    if (listadoPorHacer.length === nuevoListado.length) {
        return false;
    } else {
        //Recordemos que guardarDB trabaja sobre listadoPorHacer entonces
        listadoPorHacer = nuevoListado;
        guardarDB();
        return true;
    }
}

module.exports = {
    crear,
    getListadoTareas,
    actualizar,
    borrar
}