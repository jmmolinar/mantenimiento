/** Funcionalidades para listar órdenes */

import TableLanguage from "./TableLanguage.js";
import {
    listAllElement, getJson
} from "./Options.js";

// Variables para filtrar fechas en la tabla
// va de la mano con la función de filtrado personalizado
let minDate = "";
let maxDate = "";
let getEstado = ``;
let getTaller = ``;
let getTipoOrden = ``;
let getAreaActivo = ``;
let getPatenteActivo = ``;
let getIdOrden = 0;
let totalOrdenes = [];


//Clase para asignar nombre a pestaña navegador
class {
    constructor(params) {
        super(params);
        this.setTitle(`Órdenes`);
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


//CREACIÓN DE FORMATO DATATABLE PARA EL LISTADO DE LAS ÓRDENES
customOrdersTable();

let classTr = ""
let stringContainer = ""
let formatGetCategoriasOrdenNombre = ``;
let formatGetCategoriasOrdenCosto = ``;
let getCategoriasOrden = [];
let getEstadosOrden = [];

//RECORRIDO DE CADA ORDEN
for (const orden of getOrdenes) {

    getIdOrden = orden.idOrden;

    totalOrdenes.push(orden);

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
    let fechaUltimoEstado = "1900-01-01T00:00"; /** Comparador para obtener la fecha del último estado */

    //OBTENCIÓN DE LOS ESTADOS
    let stateJSON = 'http://192.168.0.13:8080/static/js/data/state.JSON';
    let titleStateJSON = 'Estados';
    let getEstados = [];
    getEstados = getJson(stateJSON, titleStateJSON);

    getEstadosOrden.forEach(elem => {

        if (new Date(elem["fechaAsignado"]) > new Date(fechaUltimoEstado)) {

            const estado = getEstados.find((estado) => estado.idEstado == elem["estadoIdEstado"]);
            if (estado) {
                getEstado = estado.nombre;
            }

            fechaUltimoEstado = elem["fechaAsignado"];
        }

        switch (elem["estadoIdEstado"]) {
            case 1:
                classTr = "warning"
                stringContainer = 'Se requiere completar datos'
                break;
            case 10:
                classTr = "muted"
                stringContainer = 'La órden de mantenimiento no fue ejecutada'
                break;
            case 3:
                classTr = "error"
                stringContainer = 'La orden no ha sigo planificada'
                break;
            case 6:
                classTr = "error"
                stringContainer = 'El servicio en taller excede el tiempo planificado'
                break;
            case 2:
                classTr = ""
                stringContainer = 'El próximo paso es la realización del servicio en Taller'
                break;
            case 4:
                classTr = ""
                stringContainer = 'La órden fue planificada con retraso'
                break;
            case 5:
                classTr = "info"
                stringContainer = 'Se están realizando los servicios de mantenimiento'
                break;
            case 8:
                classTr = "success"
                stringContainer = 'La orden ha sido completada'
                break;
            case 9:
                classTr = "success"
                stringContainer = 'La orden ha sido completada con retraso'
                break;
            default:
                classTr = ""
                stringContainer = ''
                console.log('Estado de la orden desconocido');
        }

    })

    getCategoriasOrden = listAllElement(orden.ordenCategorias);
    let getCategoriasOrdenNombre = [];
    let getCategoriasOrdenCosto = [];
    let costoOrden = 0;
    let totalOrden = ``;
    getCategoriasOrden.forEach(elem => {
        getCategoriasOrdenNombre.push(`<div class="alert alert-info no-margin new-padding-top-bottom"><strong>${elem["nombre"]}</strong></div>`)
        if (elem["costo"] != "") {
            costoOrden = (parseFloat(elem["costo"]) + parseFloat(costoOrden)).toFixed(2);
            getCategoriasOrdenCosto.push(`<div class="alert new-alert-use no-margin new-padding-top-bottom">CLP <strong>${(parseFloat(elem["costo"]) + 0.00).toFixed(2).toString().replace(".", ",")}</strong></div>`)
        }

    })
    if (isNaN(costoOrden)) {
        totalOrden = "";
    } else {
        totalOrden = "$ " + costoOrden.toString().replace(".", ",");
    }

    if (getCategoriasOrdenNombre.length) {
        formatGetCategoriasOrdenNombre = getCategoriasOrdenNombre.join('');
        formatGetCategoriasOrdenCosto = getCategoriasOrdenCosto.join('');
    } else {
        formatGetCategoriasOrdenNombre = ``;
        formatGetCategoriasOrdenCosto = ``;
    }

}


//FORMATO A TABLA CON DATATABLE
const customOrdersTable = () => {

    $(document).ready(function () {

        //Verificación en caso de seleccionar fecha en el Calendario
        //Tomo la fecha y la llevo por sessionStorage a las variables del filtro
        //de fechas de las Órdenes
        if (sessionStorage.getItem('fechaFiltro')) {
            minDate = $('#min').val(sessionStorage.getItem('fechaFiltro').toString());
            maxDate = $('#max').val(sessionStorage.getItem('fechaFiltro').toString());
            sessionStorage.removeItem('fechaFiltro')
        }
        if (sessionStorage.getItem('fechaFiltroInicio') && sessionStorage.getItem('fechaFiltroFin')) { // Con selección de fechas
            minDate = $('#min').val(sessionStorage.getItem('fechaFiltroInicio').toString());
            maxDate = $('#max').val(sessionStorage.getItem('fechaFiltroFin').toString());
            sessionStorage.removeItem('fechaFiltroInicio')
            sessionStorage.removeItem('fechaFiltroFin')
        }

        //AGREGANDO INPUTS PARA FILTRO DE FECHAS A LA TABLA
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
        let table = $('div #pages table#ordersTable').DataTable({
            "order": [[0, "desc"]],
            // Especifico las columnas a continuación para poder utilizar en render el filtrarFechas()
            // Si no lo hiciera no sería necesario agregar "columns"
            "columns": [
                {
                    data: 'idOrden'
                },
                {
                    data: 'getPatenteActivo'
                },
                {
                    data: "getTipoOrden"
                },
                {
                    data: "getEstado"
                },
                {
                    data: "getAreaActivo"
                },
                {
                    data: "fechaCreacion"
                },
                {
                    data: "fechaInicial",
                    render: filtrarFechas() //Ejecutar la función de filtrado de fechas
                },
                {
                    data: "getTaller"
                },
                /*{
                    data: "ordenCategorias.nombre"
                },
                {
                    data: "ordenCategorias.costo"
                },*/
                {
                    data: "total"
                },
                {
                    data: "Acciones"  /* No está dentro del JSON pero debe definirse para trabajar de la mano con la columna donde agrega botones de EDITAR y ELIMINAR */
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
const filtrarFechas = () => {

    $.fn.dataTable.ext.search.push(
        function (settings, data, datosIndex) {

            //Sólo filtro la tabla de órdenes
            if (settings.nTable == document.getElementById('ordersTable')) {

                let min = minDate.val();
                let max = maxDate.val();
                //let date = new Date(data[5]); //Filtrando por fechaCreacion
                let date = new Date(data[6]); //Filtrando por fechaInicial

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

    //INFORMACIÓN AL LADO DE CADA ESTADO
    $('[data-toggle="tooltip"]').tooltip({ animation: true });

});