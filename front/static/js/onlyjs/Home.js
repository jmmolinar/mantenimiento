<<<<<<< HEAD
/** Funcionalidades para listar los activos del Home */

import TableLanguage from "./TableLanguage.js";
import { getJson, listAllElement } from "./Options.js";

let getArea = ``;
let getBodega = ``;
let getTipoActivo = ``;
let getGPSImei = ``;
let getVehiculoPatente = ``;
let getVehiculoKmGps = ``;
let getVehiculoHorometro = ``;

//Clase para asignar nombre a pestaña navegador
class {
    constructor(params) {
        super(params);
        this.setTitle(`Inicio`);
    }

    setTitle(title) {
        document.title = title;
    }

}


//LISTADO DE ACTIVOS
//OBTENCIÓN DE TODAS LOS ACTIVOS
let activosJSON = 'http://192.168.0.13:8080/static/js/data/assets.JSON';
let titleActivosJSON = 'Activos';
let getActivos = [];
getActivos = getJson(activosJSON, titleActivosJSON);


//CREACIÓN DE FORMATO DATATABLE PARA EL LISTADO DE LOS ACTIVOS DEL HOME
customTable();

let formatUso = ``;
let mantenimiento_en = ''
let formatGetPlanesActivoNombre = ``
let formatRealizadas = ``
let getPlanesActivo = [];

//RECORRIDO DE CADA ACTIVO DEL HOME
for (const activo of getActivos) {

    //ÁREA DEL ACTIVO DEL HOME
    //OBTENCIÓN DE LAS ÁREAS
    let areasJSON = 'http://192.168.0.13:8080/static/js/data/areas.JSON';
    let titleAreasJSON = "Áreas";
    let getAreas = [];
    getAreas = getJson(areasJSON, titleAreasJSON);
    const area = getAreas.find((area) => area.idArea == activo.areaIdArea);
    if (area) {
        getArea = area.nombreArea;
    }

    //TIPO DE ACTIVO DEL ACTIVO DEL HOME
    //OBTENCIÓN DE LOS TIPOS DE ACTIVOS
    let tiposActivosJSON = 'http://192.168.0.13:8080/static/js/data/assetsType.JSON';
    let titleTiposActivosJSON = 'Tipos de activos';
    let getTiposActivos = [];
    getTiposActivos = getJson(tiposActivosJSON, titleTiposActivosJSON);
    const tipoActivo = getTiposActivos.find((tipoActivo) => tipoActivo.idTipoActivo == activo.tipoActivoIdTipoActivo);
    if (tipoActivo) {
        getTipoActivo = tipoActivo.nombre;
    }

    //BODEGA DEL ACTIVO DEL HOME
    //OBTENCIÓN DE LAS BODEGAS
    let bodegasJSON = 'http://192.168.0.13:8080/static/js/data/assetsWareHouses.JSON';
    let titleBodegasJSON = 'Bodegas';
    let getBodegas = [];
    getBodegas = getJson(bodegasJSON, titleBodegasJSON);
    const bodega = getBodegas.find((bodega) => bodega.idBodegaActivos == activo.bodegaActivosIdBodegaActivos);
    if (bodega) {
        getBodega = bodega.nombre;
    }

    //PATENTE, KILOMETROS, HORÓMETRO, USO, IMEIGPS DEL ACTIVO DEL HOME
    //OBTENCIÓN DE LOS VEHÍCULOS
    let vehiculosJSON = 'http://192.168.0.13:8080/static/js/data/vehicle.JSON';
    let titleVehiculosJSON = 'Vehículos BLACKGPS';
    let getVehiculos = [];
    getVehiculos = getJson(vehiculosJSON, titleVehiculosJSON);
    const vehiculo = getVehiculos.find((vehiculo) => vehiculo.idVehiculo == activo.vehiculoIdVehiculo);
    if (vehiculo) {
        let uso = [];
        getVehiculoPatente = vehiculo.ppuVehiculo;
        getVehiculoKmGps = parseFloat(vehiculo.kmGps).toFixed(2);
        getVehiculoHorometro = parseFloat(vehiculo.horometro).toFixed(2);
        uso.push(`<div class="alert new-alert-use no-margin new-padding-top-bottom"><strong>${getVehiculoKmGps} <input class="btn" type="button" value="Km" disabled></strong></div>`);
        uso.push(`<div class="alert new-alert-use no-margin new-padding-top-bottom"><strong>${getVehiculoHorometro} <input class="btn" type="button" value="Horas" disabled></strong></div>`);
        formatUso = uso.join('');

        //OBTENCIÓN DE LOS GPS
        let gpsJSON = 'http://192.168.0.13:8080/static/js/data/gps.JSON';
        let titleGpsJSON = 'GPS BLACKGPS';
        let getGPS = [];
        getGPS = getJson(gpsJSON, titleGpsJSON);
        const gps = getGPS.find((gps) => gps.idGps == vehiculo.gpsIdGps);
        if (gps) {
            getGPSImei = gps.imeiGps;
        }
    }

    //ARREGLO CON LOS PLANES DEL ACTIVO EN EL REGISTRO DEL HOME
    getPlanesActivo = listAllElement(activo.activoPlanes);

    //PLANES DEL ACTIVO DEL HOME
    //OBTENCIÓN DE LOS PLANES
    let planesJSON = 'http://192.168.0.13:8080/static/js/data/planning.JSON';
    let titlePlanesJSON = 'Planes';
    let getPlanes = [];
    getPlanes = getJson(planesJSON, titlePlanesJSON);

    //ARREGLO PARA ALMACENAR EL FORMATO DE LOS PLANES
    let getPlanesActivoNombre = [];

    //RECORRO EL ARREGLO Y SI EL PLAN ES ENCONTRADO LE ASIGNO LAS ETIQUETAS HTML Y CLASES CSS
    //ESTO PARA RESALTARLOS EN LA TABLA DEL HOME
    getPlanesActivo.forEach(elem => {
        const plan = getPlanes.find((plan) => plan.idPlanMantenimiento == elem.planMantenimientoIdPlanMantenimiento);
        if (plan) {
            getPlanesActivoNombre.push(`<div class="alert alert-info no-margin new-padding-top-bottom"><strong>${plan.nombre}</strong></div>`)
        }

    })

    if (getPlanesActivoNombre.length) {
        formatGetPlanesActivoNombre = getPlanesActivoNombre.join('');
    } else {
        formatGetPlanesActivoNombre = ``;
    }


    //ESTO DEBE OBTENERSE MEDIANTE VEHICULOIDVEHICULO
    formatRealizadas = `<div class="alert alert-success no-margin new-padding-top-bottom new-color-alert"><strong>${activo.mant_realizadas}</strong></div>`

    //Esto debe optimizarse mediante vehiculoIdVehiculo
    if (activo.mant_en_km == null && activo.mant_en_horas == null) {
        mantenimiento_en = ''
    } else {
        if (activo.mant_en_km != null && activo.mant_en_horas == null) {
            mantenimiento_en = `<div class="alert alert-block no-margin new-padding-top-bottom new-color-alert"><strong>En: ${activo.mant_en_km}</strong></div>`
        } else {
            if (activo.mant_en_km == null && activo.mant_en_horas != null) {
                mantenimiento_en = `<div class="alert alert-block no-margin new-padding-top-bottom new-color-alert"><strong>En: ${activo.mant_en_horas}</strong></div>`
            } else {
                if (activo.mant_en_km != null && activo.mant_en_horas != null) {
                    mantenimiento_en = `<div class="alert alert-block no-margin new-padding-top-bottom new-color-alert"><strong>En: ${activo.mant_en_km} | En: ${activo.mant_en_horas}</strong></div>`
                }
            }
        }

    }


}


//FORMATO A TABLA CON DATATABLE
const customTable = () => {

    $(window).on("load", function () {

        $(document).ready(function () {
            $('div #pages table#assetsTable').DataTable({
                "order": [[0, "desc"]],
                "language": TableLanguage,
                "scrollX": true // De la mano con el width="100%" en la etiqueta table
            });
        });

        /*Agrego en CustomTable para generar eventos con hipervinculos que están dentro*/
        $(document).ready(function () {
            $('div #pages table#assetsTable').on('click', 'a.only-to-id-url', function () {
                console.log("Voy al activo: " + $(this).attr('href').slice(1).substring($(this).attr('href').slice(1).lastIndexOf('/') + 1))
            })
        });

    });
}
=======
/** Funcionalidades para listar los activos del Home */

import TableLanguage from "./TableLanguage.js";
import { getJson, listAllElement } from "./Options.js";

let getArea = ``;
let getBodega = ``;
let getTipoActivo = ``;
let getGPSImei = ``;
let getVehiculoPatente = ``;
let getVehiculoKmGps = ``;
let getVehiculoHorometro = ``;

//Clase para asignar nombre a pestaña navegador
class {
    constructor(params) {
        super(params);
        this.setTitle(`Inicio`);
    }

    setTitle(title) {
        document.title = title;
    }

}


//LISTADO DE ACTIVOS
//OBTENCIÓN DE TODAS LOS ACTIVOS
let activosJSON = 'http://192.168.1.114:8080/static/js/data/assets.JSON';
let titleActivosJSON = 'Activos';
let getActivos = [];
getActivos = getJson(activosJSON, titleActivosJSON);


//CREACIÓN DE FORMATO DATATABLE PARA EL LISTADO DE LOS ACTIVOS DEL HOME
customTable();

let formatUso = ``;
let mantenimiento_en = ''
let formatGetPlanesActivoNombre = ``
let formatRealizadas = ``
let getPlanesActivo = [];

//RECORRIDO DE CADA ACTIVO DEL HOME
for (const activo of getActivos) {

    //ÁREA DEL ACTIVO DEL HOME
    //OBTENCIÓN DE LAS ÁREAS
    let areasJSON = 'http://192.168.1.114:8080/static/js/data/areas.JSON';
    let titleAreasJSON = "Áreas";
    let getAreas = [];
    getAreas = getJson(areasJSON, titleAreasJSON);
    const area = getAreas.find((area) => area.idArea == activo.areaIdArea);
    if (area) {
        getArea = area.nombreArea;
    }

    //TIPO DE ACTIVO DEL ACTIVO DEL HOME
    //OBTENCIÓN DE LOS TIPOS DE ACTIVOS
    let tiposActivosJSON = 'http://192.168.1.114:8080/static/js/data/assetsType.JSON';
    let titleTiposActivosJSON = 'Tipos de activos';
    let getTiposActivos = [];
    getTiposActivos = getJson(tiposActivosJSON, titleTiposActivosJSON);
    const tipoActivo = getTiposActivos.find((tipoActivo) => tipoActivo.idTipoActivo == activo.tipoActivoIdTipoActivo);
    if (tipoActivo) {
        getTipoActivo = tipoActivo.nombre;
    }

    //BODEGA DEL ACTIVO DEL HOME
    //OBTENCIÓN DE LAS BODEGAS
    let bodegasJSON = 'http://192.168.1.114:8080/static/js/data/assetsWareHouses.JSON';
    let titleBodegasJSON = 'Bodegas';
    let getBodegas = [];
    getBodegas = getJson(bodegasJSON, titleBodegasJSON);
    const bodega = getBodegas.find((bodega) => bodega.idBodegaActivos == activo.bodegaActivosIdBodegaActivos);
    if (bodega) {
        getBodega = bodega.nombre;
    }

    //PATENTE, KILOMETROS, HORÓMETRO, USO, IMEIGPS DEL ACTIVO DEL HOME
    //OBTENCIÓN DE LOS VEHÍCULOS
    let vehiculosJSON = 'http://192.168.1.114:8080/static/js/data/vehicle.JSON';
    let titleVehiculosJSON = 'Vehículos BLACKGPS';
    let getVehiculos = [];
    getVehiculos = getJson(vehiculosJSON, titleVehiculosJSON);
    const vehiculo = getVehiculos.find((vehiculo) => vehiculo.idVehiculo == activo.vehiculoIdVehiculo);
    if (vehiculo) {
        let uso = [];
        getVehiculoPatente = vehiculo.ppuVehiculo;
        getVehiculoKmGps = parseFloat(vehiculo.kmGps).toFixed(2);
        getVehiculoHorometro = parseFloat(vehiculo.horometro).toFixed(2);
        uso.push(`<div class="alert new-alert-use no-margin new-padding-top-bottom"><strong>${getVehiculoKmGps} <input class="btn" type="button" value="Km" disabled></strong></div>`);
        uso.push(`<div class="alert new-alert-use no-margin new-padding-top-bottom"><strong>${getVehiculoHorometro} <input class="btn" type="button" value="Horas" disabled></strong></div>`);
        formatUso = uso.join('');

        //OBTENCIÓN DE LOS GPS
        let gpsJSON = 'http://192.168.1.114:8080/static/js/data/gps.JSON';
        let titleGpsJSON = 'GPS BLACKGPS';
        let getGPS = [];
        getGPS = getJson(gpsJSON, titleGpsJSON);
        const gps = getGPS.find((gps) => gps.idGps == vehiculo.gpsIdGps);
        if (gps) {
            getGPSImei = gps.imeiGps;
        }
    }

    //ARREGLO CON LOS PLANES DEL ACTIVO EN EL REGISTRO DEL HOME
    getPlanesActivo = listAllElement(activo.activoPlanes);

    //PLANES DEL ACTIVO DEL HOME
    //OBTENCIÓN DE LOS PLANES
    let planesJSON = 'http://192.168.1.114:8080/static/js/data/planning.JSON';
    let titlePlanesJSON = 'Planes';
    let getPlanes = [];
    getPlanes = getJson(planesJSON, titlePlanesJSON);

    //ARREGLO PARA ALMACENAR EL FORMATO DE LOS PLANES
    let getPlanesActivoNombre = [];

    //RECORRO EL ARREGLO Y SI EL PLAN ES ENCONTRADO LE ASIGNO LAS ETIQUETAS HTML Y CLASES CSS
    //ESTO PARA RESALTARLOS EN LA TABLA DEL HOME
    getPlanesActivo.forEach(elem => {
        const plan = getPlanes.find((plan) => plan.idPlanMantenimiento == elem.planMantenimientoIdPlanMantenimiento);
        if (plan) {
            getPlanesActivoNombre.push(`<div class="alert alert-info no-margin new-padding-top-bottom"><strong>${plan.nombre}</strong></div>`)
        }

    })

    if (getPlanesActivoNombre.length) {
        formatGetPlanesActivoNombre = getPlanesActivoNombre.join('');
    } else {
        formatGetPlanesActivoNombre = ``;
    }


    //ESTO DEBE OBTENERSE MEDIANTE VEHICULOIDVEHICULO
    formatRealizadas = `<div class="alert alert-success no-margin new-padding-top-bottom new-color-alert"><strong>${activo.mant_realizadas}</strong></div>`

    //Esto debe optimizarse mediante vehiculoIdVehiculo
    if (activo.mant_en_km == null && activo.mant_en_horas == null) {
        mantenimiento_en = ''
    } else {
        if (activo.mant_en_km != null && activo.mant_en_horas == null) {
            mantenimiento_en = `<div class="alert alert-block no-margin new-padding-top-bottom new-color-alert"><strong>En: ${activo.mant_en_km}</strong></div>`
        } else {
            if (activo.mant_en_km == null && activo.mant_en_horas != null) {
                mantenimiento_en = `<div class="alert alert-block no-margin new-padding-top-bottom new-color-alert"><strong>En: ${activo.mant_en_horas}</strong></div>`
            } else {
                if (activo.mant_en_km != null && activo.mant_en_horas != null) {
                    mantenimiento_en = `<div class="alert alert-block no-margin new-padding-top-bottom new-color-alert"><strong>En: ${activo.mant_en_km} | En: ${activo.mant_en_horas}</strong></div>`
                }
            }
        }

    }


}


//FORMATO A TABLA CON DATATABLE
const customTable = () => {

    $(window).on("load", function () {

        $(document).ready(function () {
            $('div #pages table#assetsTable').DataTable({
                "order": [[0, "desc"]],
                "language": TableLanguage,
                "scrollX": true // De la mano con el width="100%" en la etiqueta table
            });
        });

        /*Agrego en CustomTable para generar eventos con hipervinculos que están dentro*/
        $(document).ready(function () {
            $('div #pages table#assetsTable').on('click', 'a.only-to-id-url', function () {
                console.log("Voy al activo: " + $(this).attr('href').slice(1).substring($(this).attr('href').slice(1).lastIndexOf('/') + 1))
            })
        });

    });
}
>>>>>>> c4d991099d7ecc12d7df75dddecd695004927df3
