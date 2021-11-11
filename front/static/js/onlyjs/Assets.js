/** Funcionalidades para listar órdenes de mantenimiento */

import TableLanguage from "./TableLanguage.js"
import { getJson } from "./Options.js"

let getIdActivo = 0;
let getArea = ``;
let getTipoActivo = ``;
let getVehiculoPatente = ``;
let getVehiculoKmGps = ``;
let getVehiculoHorometro = ``;
let getGPSImei = ``;

//LISTADO DE ÓRDENES
//OBTENCIÓN DE TODAS LAS ÓRDENES
let ordenesJSON = 'http://192.168.1.114:8000/static/js/data/orders.JSON';
let titleOrdenesJSON = "Órdenes";
let getOrdenes = [];
getOrdenes = getJson(ordenesJSON, titleOrdenesJSON);

//CREACIÓN DE FORMATO DATATABLE PARA EL LISTADO DE LAS ÓRDENES
customTable();

//RECORRIDO DE CADA ACTIVO
for (const activo of getOrdenes) {

    //VARIABLE USO PARA ASIGNAR KM Y HORÓMETRO
    let getUsoActivo = ``;

    //IDENTIFICADOR DEL ACTIVO
    getIdActivo = activo.idActivo;

    //ÁREA DEL ACTIVO
    //OBTENCIÓN DE LAS ÁREAS
    let areasJSON = 'http://192.168.1.114:8000/static/js/data/areas.JSON';
    let titleAreasJSON = "Áreas";
    let getAreas = [];
    getAreas = getJson(areasJSON, titleAreasJSON);
    const area = getAreas.find((area) => area.idArea == activo.areaIdArea);
    if (area) {

        getArea = area.nombreArea;

    }

    //TIPO DE ACTIVO DEL ACTIVO
    //OBTENCIÓN DE LOS TIPOS DE ACTIVOS
    let tiposActivosJSON = 'http://192.168.1.114:8000/static/js/data/assetsType.JSON';
    let titleTiposActivosJSON = 'Tipos de activos';
    let getTiposActivos = [];
    getTiposActivos = getJson(tiposActivosJSON, titleTiposActivosJSON);
    const tipoActivo = getTiposActivos.find((tipoActivo) => tipoActivo.idTipoActivo == activo.tipoActivoIdTipoActivo);
    if (tipoActivo) {

        getTipoActivo = tipoActivo.nombre;

    }

    //PATENTE, KILOMETROS, HORÓMETRO, USO, IMEIGPS DEL ACTIVO
    //OBTENCIÓN DE LOS VEHÍCULOS
    let vehiculosJSON = 'http://192.168.1.114:8000/static/js/data/vehicle.JSON';
    let titleVehiculosJSON = 'Vehículos BLACKGPS';
    let getVehiculos = [];
    getVehiculos = getJson(vehiculosJSON, titleVehiculosJSON);

    //PATENTE, KILOMETROS, HORÓMETRO, USO DEL ACTIVO
    const vehiculo = getVehiculos.find((vehiculo) => vehiculo.idVehiculo == activo.vehiculoIdVehiculo);
    if (vehiculo) {

        getVehiculoPatente = vehiculo.ppuVehiculo;
        getVehiculoKmGps = parseFloat(vehiculo.kmGps).toFixed(2);
        getVehiculoHorometro = parseFloat(vehiculo.horometro).toFixed(2);
        getUsoActivo = getVehiculoKmGps.toString().concat(" Km  -  ", getVehiculoHorometro.toString(), " Horas")

        //OBTENCIÓN DE LOS GPS
        let gpsJSON = 'http://192.168.1.114:8000/static/js/data/gps.JSON';
        let titleGpsJSON = 'GPS BLACKGPS';
        let getGPS = [];
        getGPS = getJson(gpsJSON, titleGpsJSON);

        //IMEIGPS DEL ACTIVO
        const gps = getGPS.find((gps) => gps.idGps == vehiculo.gpsIdGps);
        if (gps) {

            getGPSImei = gps.imeiGps;

        }
    }

}

//FORMATO A TABLA CON DATATABLE
const customTable = () => {

    $(document).ready(function () {
        $('div #pages table#assetsTable').DataTable({
            "order": [[0, "desc"]],
            "language": TableLanguage,
            "scrollX": true // De la mano con el width="100%" en la etiqueta table
        });
    });

    /*Agrego en customTable para generar eventos con hipervinculos que están dentro*/
    $(document).ready(function () {
        $('div #pages table#assetsTable').on('click', 'a.only-to-id-url', function () {
            console.log("Voy al activo: " + $(this).attr('href').slice(1).substring($(this).attr('href').slice(1).lastIndexOf('/') + 1))
        })
    });
}
