/** Funcionalidades para listar órdenes con todos sus estados*/

import TableLanguage from "./TableLanguage.js";
import {
    listAllElement, getJson
} from "./Options.js";

// Variables para filtrar fechas en la tabla
// va de la mano con la función de filtrado personalizado
let minDate = "";
let maxDate = "";

let getEstado = ``;
let getEstadoActual = ``;
let getTaller = ``;
let getTipoOrden = ``;
let getActivo = ``;
let getAreaActivo = ``;
let getPatenteActivo = ``;
let getIdOrden = 0;
let totalOrdenes = [];

//Clase para asignar nombre a pestaña navegador
class {
    constructor(params) {
        super(params);
        this.setTitle(`Historial de estados`);
    }

    setTitle(title) {
        document.title = title;
    }

}

//LISTADO DE ÓRDENES
//OBTENCIÓN DE TODAS LAS ÓRDENES
let ordenesJSON = 'http://192.168.0.13:8080/static/js/data/orders.JSON';
let titleOrdenesJSON = "Órdenes";
let getOrdenes = [];
getOrdenes = getJson(ordenesJSON, titleOrdenesJSON);

//CREACIÓN DE FORMATO DATATABLE PARA EL HISTORIAL DE ESTADOS DE ÓRDENES
customOrdersStatusHistoryTable();

let fillOrdersStatusHistory = ''
let classTr = ""
let stringContainer = ""
let formatGetEstadosOrdenNombre = ``;
let formatGetEstadosOrdenFecha = ``;
let formatGetEstadosOrdenPor = ``;
let getEstadosOrden = [];
let cont = 0;

//RECORRIDO DE CADA ORDEN
for (const orden of getOrdenes) {

    totalOrdenes.push(orden);
    cont++

    getIdOrden = orden.idOrden;

    //TALLER DE LA ORDEN
    //OBTENCIÓN DE LOS TALLERES
    let talleresJSON = 'http://192.168.0.13:8080/static/js/data/workshops.JSON';
    let titleTalleresJSON = 'Talleres';
    let getTalleres = [];
    getTalleres = getJson(talleresJSON, titleTalleresJSON);
    getTaller = ``;
    const taller = getTalleres.find((taller) => taller.idTallerServicio == orden.tallerServicioIdTallerServicio);
    if (taller) {
        getTaller = taller.nombre;
    }

    //TIPO DE ORDEN
    //OBTENCIÓN DE LOS TIPOS DE MANTENIEMIENTOS O TIPO DE ÓRDENES
    let ordersTypeJSON = 'http://192.168.0.13:8080/static/js/data/ordersType.JSON';
    let titleOrdersTypeJSON = "Tipos de mantenimientos";
    let getTiposMantenimientos = [];
    getTiposMantenimientos = getJson(ordersTypeJSON, titleOrdersTypeJSON);
    const tipoOrden = getTiposMantenimientos.find((tipoOrden) => tipoOrden.idTipoOrden == orden.tipoOrdenIdTipoOrden);
    if (tipoOrden) {
        getTipoOrden = tipoOrden.nombre;
    }

    //OBTENCIÓN DE TODAS LOS ACTIVOS
    let activosJSON = 'http://192.168.0.13:8080/static/js/data/assets.JSON';
    let titleActivosJSON = 'Activos';
    let getActivos = [];
    getActivos = getJson(activosJSON, titleActivosJSON);
    const activo = getActivos.find((activo) => activo.idActivo == orden.activoIdActivo);
    if (activo) {

        //PATENTE DE LA ÓRDEN
        //OBTENCIÓN DE LOS VEHÍCULOS
        let vehiculosJSON = 'http://192.168.0.13:8080/static/js/data/vehicle.JSON';
        let titleVehiculosJSON = 'Vehículos BLACKGPS';
        let getVehiculos = [];
        getVehiculos = getJson(vehiculosJSON, titleVehiculosJSON);
        const vehiculo = getVehiculos.find((vehiculo) => vehiculo.idVehiculo == activo.vehiculoIdVehiculo);
        if (vehiculo) {
            getPatenteActivo = vehiculo.ppuVehiculo;
        }

        //ÁREA DE LA ÓRDEN
        //OBTENCIÓN DE LAS ÁREAS
        let areasJSON = 'http://192.168.0.13:8080/static/js/data/areas.JSON';
        let titleAreasJSON = "Áreas";
        let getAreas = [];
        getAreas = getJson(areasJSON, titleAreasJSON);
        const area = getAreas.find((area) => area.idArea == activo.areaIdArea);
        if (area) {
            getAreaActivo = area.nombreArea;
        }
    }

    getEstadosOrden = listAllElement(orden.ordenEstados);
    let fechaUltimoEstado = "1900-01-01T00:00"; // Inicio de fecha a comparar
    let getEstadosOrdenNombre = [];
    let getEstadosOrdenFecha = [];
    let getEstadosOrdenPor = [];

    //OBTENCIÓN DE LOS ESTADOS
    let stateJSON = 'http://192.168.0.13:8080/static/js/data/state.JSON';
    let titleStateJSON = 'Estados';
    let getEstados = [];
    getEstados = getJson(stateJSON, titleStateJSON);

    //Obtengo el último estado comparando las fechas para darle estilo en el historial
    getEstadosOrden.forEach(elem => {

        if (new Date(elem["fechaAsignado"]) > new Date(fechaUltimoEstado)) {

            const estadoActual = getEstados.find((estado) => estado.idEstado == elem["estadoIdEstado"]);
            if (estadoActual) {
                getEstadoActual = estadoActual.nombre;
            }

            fechaUltimoEstado = elem["fechaAsignado"];
        }

    })

    //Recorro de nuevo para dar estilo al último estado en el historial
    getEstadosOrden.forEach(elem => {

        //getEstados YA SE OBTUVO y se utiliza a continuación
        const styleEstadoActual = getEstados.find((estado) => estado.idEstado == elem["estadoIdEstado"]);
        if (styleEstadoActual) {
            //Estilo al estado actual
            if (getEstadoActual == styleEstadoActual.nombre) {
                getEstadosOrdenNombre.push(`<div class="alert alert-success no-margin new-padding-top-bottom"><strong>${getEstadoActual}</strong></div>`)
                getEstadosOrdenFecha.push(`<div class="alert alert-success no-margin new-padding-top-bottom"><strong>${elem["fechaAsignado"]}</strong></div>`)
                getEstadosOrdenPor.push(`<div class="alert alert-success no-margin new-padding-top-bottom"><strong>${elem["idUsuario"]}</strong></div>`)
            } else { //Estilo a los estados anteriores
                getEstadosOrdenNombre.push(`<div class="alert alert-info no-margin new-padding-top-bottom"><strong>${styleEstadoActual.nombre}</strong></div>`)
                getEstadosOrdenFecha.push(`<div class="alert alert-info no-margin new-padding-top-bottom"><strong>${elem["fechaAsignado"]}</strong></div>`)
                getEstadosOrdenPor.push(`<div class="alert alert-info no-margin new-padding-top-bottom"><strong>${elem["idUsuario"]}</strong></div>`)
            }
        }
    })

    if (getEstadosOrdenNombre.length) {
        formatGetEstadosOrdenNombre = getEstadosOrdenNombre.join('');
        formatGetEstadosOrdenFecha = getEstadosOrdenFecha.join('');
        formatGetEstadosOrdenPor = getEstadosOrdenPor.join('');
    } else {
        formatGetEstadosOrdenNombre = ``;
        formatGetEstadosOrdenFecha = ``;
        formatGetEstadosOrdenPor = ``;
    }

}


//FORMATO A TABLA CON DATATABLE
const customOrdersStatusHistoryTable = () => {

    $(document).ready(function () {

        // Agregando inputs para filtro de fechas a la tabla
        minDate = new DateTime($('div #pages input#min'), {
            format: 'YYYY-MM-DD',
            buttons: {
                clear: true
            },
            i18n: {
                clear: "Borrar",
                months: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
                weekdays: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']
            }
        });

        maxDate = new DateTime($('div #pages input#max'), {
            format: 'YYYY-MM-DD',
            buttons: {
                clear: true
            },
            i18n: {
                clear: "Borrar",
                months: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
                weekdays: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']
            }
        });

        // Tabla
        let table = $('div #pages table#ordersStatusHistoryTable').DataTable({
            "order": [[0, "desc"]],
            // Especifico las columnas a continuación para poder dar formato numérico al render de "Total"
            // Si no lo hiciera no sería necesario agregar "columns"
            "columns": [
                {
                    data: 'idOrden'
                },
                {
                    data: 'getPatenteActivo'
                },
                /*{
                    data: "estado_orden"
                },*/
                {
                    data: "getTipoOrden"
                },
                {
                    data: "getAreaActivo"
                },
                /*{
                    data: "fechaCreacion"
                },*/
                {
                    data: "fechaInicial",
                    render: filtrarFechasStatusHistory() //Ejecutar la función de filtrado de fechas
                },
                {
                    data: "getTaller"
                },
                {
                    data: "formatGetEstadosOrdenNombre"
                },
                {
                    data: "formatGetEstadosOrdenFecha"
                },
                {
                    data: "formatGetEstadosOrdenPor"
                },
                /*{
                    data: "total",
                    render: $.fn.dataTable.render.number('', ',', 2, 'CLP ')
                },*/
                {
                    data: "Ver"  /* No está dentro del JSON pero debe definirse para trabajar de la mano con la columna donde agrega el botón Ver */
                }
            ],

            "language": TableLanguage,
            "scrollX": true // De la mano con el width="100%" en la etiqueta table
        });

        // Refilter the table
        $('div #pages input#min, div #pages input#max').on('change', function () {
            table.draw();
        });

    });
}

//FUNCION DE FILTRADO PERSONALIZADO QUE BUSCARÁ DATOS
//EN LA COLUMNA 5 ENTRE DOS VALORES
const filtrarFechasStatusHistory = () => {

    $.fn.dataTable.ext.search.push(
        function (settings, data, datosIndex) {

            //Sólo filtro la tabla de órdenes del historial de estados
            if (settings.nTable == document.getElementById('ordersStatusHistoryTable')) {

                let min = minDate.val();
                let max = maxDate.val();
                let date = new Date(data[4]); //Filtrando por fecha_inicio

                if (
                    (min === null && max === null) ||
                    (min === null && date <= max) ||
                    (min <= date && max === null) ||
                    (min <= date && date <= max)
                ) {
                    return true;
                }
                return false; //Para la tabla ordersTable
            } else {
                return true;
            }

        }


    );
}

$(document).ready(function () {

    $('[data-toggle="tooltip"]').tooltip({ animation: true });

});