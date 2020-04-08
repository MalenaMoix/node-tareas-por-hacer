const argv = require('./config/yargs').argv;
const colors = require('colors');
const tareasPorHacer = require('./tareas-por-hacer/tareas');

let comando = argv._[0];

switch (comando) {
    case 'crear':
        let tarea = tareasPorHacer.crear(argv.descripcion);
        console.log(tarea);
        break;

    case 'listar':
        let listadoTareas = tareasPorHacer.getListadoTareas();
        for (let tarea of listadoTareas) {
            console.log('========= Tarea ========='.green);
            console.log(tarea.descripcion);
            console.log('-------------------------');
            console.log(`Completado: ${tarea.completado}`);
            console.log('========================='.green);
        }
        break;

    case 'actualizar':
        let actualizar = tareasPorHacer.actualizar(argv.descripcion, argv.completado);
        break;

    case 'borrar':
        let borrado = tareasPorHacer.borrar(argv.descripcion);
        console.log(borrado);
        break;

    default:
        console.log('Comando no reconocido');
        break;
}