/** Funcionalidades para consultar y actualizar un activo */

import TableLanguage from "./TableLanguage.js";
import {
    getJson,
    listAllElement,
    loadSelectContent,
    loadSelectContentAndSelected,
    loadDivSelectedPlan,
    listSelect,
    listAnioAndSelected,
    currentDate
} from "./Options.js"

let getIdActivo = 0;
let getArea = ``;
let getBodega = ``;
let getTipoActivo = ``;
let getMarca = ``;
let getModelo = ``;
let getGPSImei = ``;
let getAnio = ``;
let getEstado = ``;
let getPlanesActivo = [];
let getDocumentosActivo = [];
let getActivoIdVehiculo = ``;
let getActivoPatente = ``;
let getActivoKmGps = ``;
let getActivoHorometro = ``;
let getOrdenTipoOrden = ``;
let getOrdenTaller = ``;
let getOrdenFechaCreacion = ``;
let getOrdenFechaInicio = ``;
let getOrdenIdOrden = ``;
let getSeguroObligatorio = ``;
let getVencimientoSeguroObligatorio = ``;
let getPadronVehicular = ``;
let getVencimientoPadronVehicular = ``;
let getPermisoCirculacion = ``;
let getVencimientoPermisoCirculacion = ``;
let getRevisionTecnica = ``;
let getVencimientoRevisionTecnica = ``;

//ARREGLOS GLOBALES DE OBJETOS PARA LOS DATOS QUE SE OBTIENEN DE LOS JSON
let getActivos = [];
let getAreas = [];
let getEstados = [];
let getBodegas = [];
let getTiposActivos = [];
let getVehiculos = [];
let getModelos = [];
let getMarcas = [];
let getGPS = [];
let getPlanes = [];
let getTalleres = [];
let getTiposMantenimientos = [];

//Variable para controlar la creación de JSON de activo
let banderaActivo = false;
let banderaPlanes = false;

//VARIABLE PARA JSON
let activoJSON = {
    "idActivo": 0,
    "anio": null,
    "dadoDeBaja": false,
    "vehiculoIdVehiculo": null,
    "areaIdArea": null,
    "bodegaActivosIdBodegaActivos": null,
    "tipoActivoIdTipoActivo": null,
    "activoPlanes": [],
    "documentos": []
};

//Variable para asignar el identificador
let idUrl = 0;

//Clase para obtener el parámetro ID de la URL
class {
    constructor(params) {
        super(params);
        this.postId = params.id;
        this.setTitle(`Activo ${this.postId}`);
    }

    setTitle(title) {
        document.title = title;
    }

}

<<<<<<< HEAD
let identificador = this.postId;
=======
identificador = this.postId;
>>>>>>> c4d991099d7ecc12d7df75dddecd695004927df3
idUrl = parseInt(identificador);

//LISTADO DE ACTIVOS
//OBTENCIÓN DE TODAS LOS ACTIVOS
<<<<<<< HEAD
let activosJSON = 'http://192.168.0.13:8080/static/js/data/assets.JSON';
=======
let activosJSON = 'http://192.168.1.114:8080/static/js/data/assets.JSON';
>>>>>>> c4d991099d7ecc12d7df75dddecd695004927df3
let titleActivosJSON = 'Activos';
getActivos = getJson(activosJSON, titleActivosJSON);

//OBTENCIÓN DEL ACTIVO IDENTIFICADO EN LA URL
const asset = getActivos.find((asset) => asset.idActivo == identificador)

if (asset) {

    //VARIABLE USO PARA ASIGNAR KM Y HORÓMETRO
    let getActivoUso = ``;

    //IDENTIFICADOR DEL ACTIVO
    getIdActivo = asset.idActivo;

    //ÁREA DEL ACTIVO
    //OBTENCIÓN DE LAS ÁREAS
<<<<<<< HEAD
    let areasJSON = 'http://192.168.0.13:8080/static/js/data/areas.JSON';
=======
    let areasJSON = 'http://192.168.1.114:8080/static/js/data/areas.JSON';
>>>>>>> c4d991099d7ecc12d7df75dddecd695004927df3
    let titleAreasJSON = "Áreas";
    getAreas = getJson(areasJSON, titleAreasJSON);
    const area = getAreas.find((area) => area.idArea == asset.areaIdArea);
    if (area) {
        getArea = area.nombreArea;
    }

    //BODEGA DEL ACTIVO
    //OBTENCIÓN DE LAS BODEGAS
<<<<<<< HEAD
    let bodegasJSON = 'http://192.168.0.13:8080/static/js/data/assetsWareHouses.JSON';
=======
    let bodegasJSON = 'http://192.168.1.114:8080/static/js/data/assetsWareHouses.JSON';
>>>>>>> c4d991099d7ecc12d7df75dddecd695004927df3
    let titleBodegasJSON = 'Bodegas';
    getBodegas = getJson(bodegasJSON, titleBodegasJSON);
    const bodega = getBodegas.find((bodega) => bodega.idBodegaActivos == asset.bodegaActivosIdBodegaActivos);
    if (bodega) {
        getBodega = bodega.nombre;
    }

    //TIPO DE ACTIVO DEL ACTIVO
    //OBTENCIÓN DE LOS TIPOS DE ACTIVOS
<<<<<<< HEAD
    let tiposActivosJSON = 'http://192.168.0.13:8080/static/js/data/assetsType.JSON';
=======
    let tiposActivosJSON = 'http://192.168.1.114:8080/static/js/data/assetsType.JSON';
>>>>>>> c4d991099d7ecc12d7df75dddecd695004927df3
    let titleTiposActivosJSON = 'Tipos de activos';
    getTiposActivos = getJson(tiposActivosJSON, titleTiposActivosJSON);
    const tipoActivo = getTiposActivos.find((tipoActivo) => tipoActivo.idTipoActivo == asset.tipoActivoIdTipoActivo);
    if (tipoActivo) {
        getTipoActivo = tipoActivo.nombre;
    }

    //ANIO DEL ACTIVO
    getAnio = asset.anio;

    //VEHICULO, PATENTE, MARCA, MODELO, KILOMETROS, HORÓMETRO, USO, IMEIGPS DEL ACTIVO
    //OBTENCIÓN DE LOS VEHÍCULOS
<<<<<<< HEAD
    let vehiculosJSON = 'http://192.168.0.13:8080/static/js/data/vehicle.JSON';
=======
    let vehiculosJSON = 'http://192.168.1.114:8080/static/js/data/vehicle.JSON';
>>>>>>> c4d991099d7ecc12d7df75dddecd695004927df3
    let titleVehiculosJSON = 'Vehículos BLACKGPS';
    getVehiculos = getJson(vehiculosJSON, titleVehiculosJSON);
    const vehiculo = getVehiculos.find((vehiculo) => vehiculo.idVehiculo == asset.vehiculoIdVehiculo);
    if (vehiculo) {

        //OBTENCIÓN DE LOS MODELOS
<<<<<<< HEAD
        let modelosJSON = 'http://192.168.0.13:8080/static/js/data/model.JSON';
=======
        let modelosJSON = 'http://192.168.1.114:8080/static/js/data/model.JSON';
>>>>>>> c4d991099d7ecc12d7df75dddecd695004927df3
        let titleModelosJSON = 'Modelos BLACKGPS';
        getModelos = getJson(modelosJSON, titleModelosJSON);
        //MODELO DEL ACTIVO
        const modelo = getModelos.find((modelo) => modelo.idModeloVehiculo == vehiculo.modeloVehiculoIdModeloVehiculo);
        if (modelo) {
            getModelo = modelo.nombreModeloVehiculo;

            //OBTENCIÓN DE LOS MARCAS
<<<<<<< HEAD
            let marcasJSON = 'http://192.168.0.13:8080/static/js/data/brand.JSON';
=======
            let marcasJSON = 'http://192.168.1.114:8080/static/js/data/brand.JSON';
>>>>>>> c4d991099d7ecc12d7df75dddecd695004927df3
            let titleMarcasJSON = 'Marcas BLACKGPS';
            getMarcas = getJson(marcasJSON, titleMarcasJSON);
            //MARCA DEL ACTIVO
            const marca = getMarcas.find((marca) => marca.idMarcaVehiculo == modelo.marcaVehiculoIdMarcaVehiculo);
            if (marca) {
                getMarca = marca.nombreMarcaVehiculo;
            }
        }

        //OBTENCIÓN DE LOS GPS
<<<<<<< HEAD
        let gpsJSON = 'http://192.168.0.13:8080/static/js/data/gps.JSON';
=======
        let gpsJSON = 'http://192.168.1.114:8080/static/js/data/gps.JSON';
>>>>>>> c4d991099d7ecc12d7df75dddecd695004927df3
        let titleGpsJSON = 'GPS BLACKGPS';
        getGPS = getJson(gpsJSON, titleGpsJSON);
        //IMEIGPS DEL ACTIVO
        const gps = getGPS.find((gps) => gps.idGps == vehiculo.gpsIdGps);
        if (gps) {
            getGPSImei = gps.imeiGps;
        }

        //VEHICULO, PATENTE, KILOMETROS, HORÓMETRO, USO DEL ACTIVO
        getActivoIdVehiculo = vehiculo.idVehiculo;
        getActivoPatente = vehiculo.ppuVehiculo;
        getActivoKmGps = parseFloat(vehiculo.kmGps).toFixed(2);
        getActivoHorometro = parseFloat(vehiculo.horometro).toFixed(2);
        getActivoUso = getActivoKmGps.toString().concat(" Km - ", getActivoHorometro.toString(), " Horas")

    }

    //ARREGLO CON LOS PLANES DEL ACTIVO
    getPlanesActivo = listAllElement(asset.activoPlanes);

    //ARREGLO CON LOS DOCUMENTOS DEL ACTIVO
    getDocumentosActivo = listAllElement(asset.documentos);

    //TIPO DE DOCUMENTO 1
    const seguro = getDocumentosActivo.find((seguro) => seguro.tipoDocumentoIdTipoDocumento == 1);
    if (seguro) {
        getSeguroObligatorio = seguro.rutaAdjunto;
        getVencimientoSeguroObligatorio = seguro.fechaVencimiento;
    }

    //TIPO DE DOCUMENTO 2
    const padron = getDocumentosActivo.find((padron) => padron.tipoDocumentoIdTipoDocumento == 2);
    if (padron) {
        getPadronVehicular = padron.rutaAdjunto;
        getVencimientoPadronVehicular = padron.fechaVencimiento;
    }

    //TIPO DE DOCUMENTO 3
    const permiso = getDocumentosActivo.find((permiso) => permiso.tipoDocumentoIdTipoDocumento == 3);
    if (permiso) {
        getPermisoCirculacion = permiso.rutaAdjunto;
        getVencimientoPermisoCirculacion = permiso.fechaVencimiento;
    }

    //TIPO DE DOCUMENTO 4
    const revision = getDocumentosActivo.find((revision) => revision.tipoDocumentoIdTipoDocumento == 4);
    if (revision) {
        getRevisionTecnica = revision.rutaAdjunto;
        getVencimientoRevisionTecnica = revision.fechaVencimiento;
    }

} else {
    alert(`=( No se logró obtener el Activo ${identificador}`);
}

//SI EL ACTIVO EXISTE SE LLENAN SUS SELECT Y SUS MANTENIMIENTOS
asset ? fillOptions() : {};
asset ? fillAssetLogOrders() : {};


//LLENADO DE OPTION PARA LOS SELECT DEL ACTIVO
const fillOptions = () => {

    console.log("Entré al fillOptions en AssetView")

    //$(window).on("load", function () {

    $(document).ready(function () {

        // Select area -- emplea los datos obtenidos en getJson();
        const selectArea = document.getElementById('assetAreasOptions');
        //getAreas YA SE OBTUVO y se utiliza a continuación
        const optionArea = listSelect(getAreas, "nombreArea"); // Paso la clave "nombreArea"
        loadSelectContentAndSelected(optionArea, selectArea, getArea);
        console.log("Área seleccionada: " + getArea);

        // Select bodega -- emplea los datos obtenidos en getJson();
        const selectBodega = document.getElementById('assetWareHousesOptions');
        //getBodegas YA SE OBTUVO y se utiliza a continuación
        const optionBodega = listSelect(getBodegas, "nombre"); // Paso la clave "nombre"
        loadSelectContentAndSelected(optionBodega, selectBodega, getBodega);
        console.log("Bodega seleccionada: " + getBodega);

        // Select tipo de activo -- emplea los datos obtenidos en getJson();
        const selectTipoActivo = document.getElementById('assetType');
        //getTiposActivos YA SE OBTUVO y se utiliza a continuación
        const optionTipoActivo = listSelect(getTiposActivos, "nombre"); // Paso la clave "nombre"
        loadSelectContentAndSelected(optionTipoActivo, selectTipoActivo, getTipoActivo);
        console.log("Tipo de activo seleccionado: " + getTipoActivo);

        // Select Marca -- emplea los datos obtenidos en getJson();
        const selectMarca = document.getElementById('assetBrand');
        //getMarcas YA SE OBTUVO y se utiliza a continuación
        const optionMarca = listSelect(getMarcas, "nombreMarcaVehiculo"); // Paso la clave "nombreMarcaVehiculo"
        loadSelectContentAndSelected(optionMarca, selectMarca, getMarca);
        console.log("Marca seleccionada: " + getMarca);

        // Select Modelo -- emplea los datos obtenidos en getJson();
        const selectModelo = document.getElementById('assetModel');
        //getModelos YA SE OBTUVO y se utiliza a continuación
        const optionModelo = listSelect(getModelos, "nombreModeloVehiculo") // Paso la clave "nombreModeloVehiculo"
        loadSelectContentAndSelected(optionModelo, selectModelo, getModelo);
        console.log("Modelo seleccionado: " + getModelo);

        // Select Anio desde Options.js
        const selectAnio = document.getElementById('assetYear');
        listAnioAndSelected(selectAnio, getAnio);

        // Solo listado de Planes para agregar
        // Select planes -- emplea los datos obtenidos en getJson();
        const selectPlan = document.getElementById('assetPlan');
        //OBTENIENDO TODOS LOS PLANES
<<<<<<< HEAD
        let planesJSON = 'http://192.168.0.13:8080/static/js/data/planning.JSON';
=======
        let planesJSON = 'http://192.168.1.114:8080/static/js/data/planning.JSON';
>>>>>>> c4d991099d7ecc12d7df75dddecd695004927df3
        let titlePlanesJSON = 'Planes';
        getPlanes = getJson(planesJSON, titlePlanesJSON);
        const optionPlan = listSelect(getPlanes, "nombre"); // Paso la clave "nombre"
        loadSelectContent(optionPlan, selectPlan);

        // Div con Planes del Activo
        const divPlanes = document.getElementById('buttonsSelectedPlan');
        loadDivSelectedPlan(divPlanes, getPlanesActivo, "planMantenimientoIdPlanMantenimiento"); // Paso la clave "planMantenimientoIdPlanMantenimiento"
    });

    //});

}

//TABLA DE HISTORIAL DE MANTENIMIENTOS DEL ACTIVO
const fillAssetLogOrders = () => {

    console.log("Entré al fillAssetLogOrders en AssetView")

    //LISTADO DE ÓRDENES
    //OBTENCIÓN DE TODAS LAS ÓRDENES PARA FILTRAR LAS DEL ACTIVO
<<<<<<< HEAD
    let ordenesJSON = 'http://192.168.0.13:8080/static/js/data/orders.JSON';
=======
    let ordenesJSON = 'http://192.168.1.114:8080/static/js/data/orders.JSON';
>>>>>>> c4d991099d7ecc12d7df75dddecd695004927df3
    let titleOrdenesJSON = "Órdenes";
    let getOrdenes = [];
    getOrdenes = getJson(ordenesJSON, titleOrdenesJSON);

    //CREACIÓN DE FORMATO DATATABLE PARA EL LISTADO DE ÓRDENES DEL ACTIVO
    customAssetLogOrders();

    //ARREGLO DE ESTADOS DE LAS ÓRDENES DEL ACTIVO
    let getEstadosOrdenActivo = [];

    //ARREGLO DE LAS CATEGORÍAS DE LAS ÓRDENES DEL ACTIVO
    let getCategoriasOrdenActivoCosto = [];

    //FILTRADO DE LAS ÓRDENES ESPECÍFICAS DEL ACTIVO
    const onlyCurrentAssetOrders = getOrdenes.filter((orden) => orden.activoIdActivo == idUrl)

    //RECORRIDO DE LAS ÓRDENES ESPECÍFICAS DEL ACTIVO
    for (const orden of onlyCurrentAssetOrders) {

        if (orden.activoIdActivo == idUrl) {

            getOrdenIdOrden = orden.idOrden;
            getOrdenFechaCreacion = orden.fechaCreacion.slice(0, 10);
            getOrdenFechaInicio = ``;
            getOrdenFechaInicio = orden.fechaInicial.slice(0, 10);


            //TALLER DE LA ÓRDEN DEL ACTIVO
            //OBTENCIÓN DE TODOS LOS TALLERES
<<<<<<< HEAD
            let talleresJSON = 'http://192.168.0.13:8080/static/js/data/workshops.JSON';
=======
            let talleresJSON = 'http://192.168.1.114:8080/static/js/data/workshops.JSON';
>>>>>>> c4d991099d7ecc12d7df75dddecd695004927df3
            let titleTalleresJSON = 'Talleres';
            getTalleres = getJson(talleresJSON, titleTalleresJSON);
            getOrdenTaller = ``;
            const taller = getTalleres.find((taller) => taller.idTallerServicio == orden.tallerServicioIdTallerServicio);
            if (taller) {
                getOrdenTaller = taller.nombre;
            }

            //TIPO DE MANTENIMIENTO DE LA ÓRDEN DEL ACTIVO
            //OBTENCIÓN DE TODOS LOS TIPOS DE MANTENIMIENTOS
<<<<<<< HEAD
            let ordersTypeJSON = 'http://192.168.0.13:8080/static/js/data/ordersType.JSON';
=======
            let ordersTypeJSON = 'http://192.168.1.114:8080/static/js/data/ordersType.JSON';
>>>>>>> c4d991099d7ecc12d7df75dddecd695004927df3
            let titleOrdersTypeJSON = "Tipos de mantenimientos";
            getTiposMantenimientos = getJson(ordersTypeJSON, titleOrdersTypeJSON);
            getOrdenTipoOrden = ``;
            const tipoOrden = getTiposMantenimientos.find((tipoOrden) => tipoOrden.idTipoOrden == orden.tipoOrdenIdTipoOrden);
            if (tipoOrden) {
                getOrdenTipoOrden = tipoOrden.nombre;
            }

            //CATEGORÍAS DE LA ÓRDEN DEL ACTIVO PARA CALCULAR EL COSTO TOTAL
            getCategoriasOrdenActivoCosto = listAllElement(orden.ordenCategorias);
            let costoOrdenActivo = 0;
            let totalOrdenActivo = ``; // Para mostrar en el total del registro en la tabla de mantenciones del activo
            getCategoriasOrdenActivoCosto.forEach(elem => {
                if (elem.costo != "") {
                    costoOrdenActivo = (parseFloat(elem.costo) + parseFloat(costoOrdenActivo)).toFixed(2);
                }
            })
            if (isNaN(costoOrdenActivo)) {
                totalOrdenActivo = "";
            } else {
                totalOrdenActivo = "$ " + costoOrdenActivo.toString().replace(".", ",");
            }

            //ESTADOS DE LA ÓRDEN DEL ACTIVO PARA OBTENER EL STATUS ACTUAL Y MOSTRARLO EN EL REGISTRO DE LA TABLA
            getEstadosOrdenActivo = listAllElement(orden.ordenEstados);
            let fechaUltimoEstado = "1900-01-01T00:00"; //Fecha comparativa para llegar a la máxima y mostrar su estado
            
            //OBTENCIÓN DE TODOS LOS ESTADOS PARA PODER BUSCAR EL NOMBRE AL HACER EL FIND
<<<<<<< HEAD
            let stateJSON = 'http://192.168.0.13:8080/static/js/data/state.JSON';
=======
            let stateJSON = 'http://192.168.1.114:8080/static/js/data/state.JSON';
>>>>>>> c4d991099d7ecc12d7df75dddecd695004927df3
            let titleStateJSON = 'Estados';
            getEstados = getJson(stateJSON, titleStateJSON);
            
            getEstadosOrdenActivo.forEach(elem => {

                if (new Date(elem["fechaAsignado"]) > new Date(fechaUltimoEstado)) {

                    const estado = getEstados.find((estado) => estado.idEstado == elem["estadoIdEstado"]);
                    if (estado) {
                        getEstado = estado.nombre;
                    }

                    fechaUltimoEstado = elem["fechaAsignado"];
                }

                //SWITCH TEMPORAR PARA MOSTRAR INFORMACIÓN SOBRE CADA ESTADO EN LA TABLA DE MANTENCIONES DEL ACTIVO
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
        }
    }
}

//FORMATO A TABLA DE MANTENCIONES DEL ACTIVO CON DATATABLE
const customAssetLogOrders = () => {

    $(document).ready(function () {
        $('div #pages table#assetOrdersLogTable').DataTable({
            "order": [[0, "desc"]],
            "language": TableLanguage,
            "scrollX": true // De la mano con el width="100%" en la etiqueta table
        });

    });

}

//FUNCIÓN PARA CREAR EL JSON QUE SERÁ PASADO A LA API
const guardarActivoJSON = () => {

    banderaActivo = false; // Control para creación del JSON
    banderaPlanes = false; // Control para creación del JSON
    activoJSON.activoPlanes = []; // reinicio planes del activo
    activoJSON.documentos = []; // reinicio documentos del activo

    activoJSON.idActivo = idUrl;

    let selectAnio = document.getElementById('assetYear');
    activoJSON.anio = selectAnio.options[selectAnio.selectedIndex].text;

    let checkDadoDeBaja = document.getElementById('downAssetOption');
    if (checkDadoDeBaja.checked) {
        activoJSON.dadoDeBaja = true;
    } else {
        activoJSON.dadoDeBaja = false;
    }

    //VEHICULO ID DEL ACTIVO
    //getActivos YA SE OBTUVO y se utiliza a continuación
    const activo = getActivos.find((activo) => activo.idActivo == idUrl);
    if (activo) {
        //getVehiculos YA SE OBTUVO y se utiliza a continuación
        const vehiculo = getVehiculos.find((vehiculo) => vehiculo.idVehiculo == activo.vehiculoIdVehiculo);
        if (vehiculo) {
            activoJSON.vehiculoIdVehiculo = vehiculo.idVehiculo;
        }
    }

    //AREA ID DEL ACTIVO
    let selectArea = document.getElementById('assetAreasOptions');
    //getAreas YA SE OBTUVO y se utiliza a continuación
    const area = getAreas.find((area) => area.nombreArea == selectArea.value);
    if (area) {
        activoJSON.areaIdArea = area.idArea;
    }

    //BODEGA ID DEL ACTIVO
    let selectBodega = document.getElementById('assetWareHousesOptions');
    //getBodegas YA SE OBTUVO y se utiliza a continuación
    const bodega = getBodegas.find((bodega) => bodega.nombre == selectBodega.value);
    if (bodega) {
        activoJSON.bodegaActivosIdBodegaActivos = bodega.idBodegaActivos;
    }

    //TIPO ACTIVO ID DEL ACTIVO
    let selectTipoActivo = document.getElementById('assetType');
    //getTiposActivos YA SE OBTUVO y se utiliza a continuación
    const tipoActivo = getTiposActivos.find((tipoActivo) => tipoActivo.nombre == selectTipoActivo.value);
    if (tipoActivo) {
        activoJSON.tipoActivoIdTipoActivo = tipoActivo.idTipoActivo;
    }

    let selectMarca = document.getElementById('assetBrand');
    let selectModelo = document.getElementById('assetModel');
    let usoActivo = document.getElementById('assetUse');

    //OJO
    //Agregar Bloque para recorrer los documentos anteriores y agregarlos.
    //Luego si agregar los nuevos seleccionados
    //Validar que solo se muestren los documentos más nuevos
    //Comparando el tipo del documento y su fecha de adjuntado
    //No es necesario asignar el idDocumento al json ---> depende


    //OBJETO PARA AGREGAR DOCUMENTO TIPO 1 A DOCUMENTOS DEL ACTIVO
    let fileInfoSeguro = document.getElementById('fileInfoSeguro');
    let expireSeguro = document.getElementById('expireSeguro');
    let docSeguroObligatorio = {
        "activoIdActivo": idUrl,
        "rutaAdjunto": `/path/${fileInfoSeguro.textContent.trim()}`,
        "fechaAdjunto": currentDate(),
        "fechaVencimiento": expireSeguro.value,
        "tipoDocumentoIdTipoDocumento": 1
    }

    //OBJETO PARA AGREGAR DOCUMENTO TIPO 2 A DOCUMENTOS DEL ACTIVO
    let fileInfoPadron = document.getElementById('fileInfoPadron');
    let expirePadron = document.getElementById('expirePadron');
    let docPadronVehicular = {
        "activoIdActivo": idUrl,
        "rutaAdjunto": `/path/${fileInfoPadron.textContent.trim()}`,
        "fechaAdjunto": currentDate(),
        "fechaVencimiento": expirePadron.value,
        "tipoDocumentoIdTipoDocumento": 2
    }

    //OBJETO PARA AGREGAR DOCUMENTO TIPO 3 A DOCUMENTOS DEL ACTIVO
    let fileInfoCirculacion = document.getElementById('fileInfoCirculacion');
    let expireCirculacion = document.getElementById('expireCirculacion');
    let docPermisoCirculacion = {
        "activoIdActivo": idUrl,
        "rutaAdjunto": `/path/${fileInfoCirculacion.textContent.trim()}`,
        "fechaAdjunto": currentDate(),
        "fechaVencimiento": expireCirculacion.value,
        "tipoDocumentoIdTipoDocumento": 3
    }

    //OBJETO PARA AGREGAR DOCUMENTO TIPO 4 A DOCUMENTOS DEL ACTIVO
    let fileInfoRevision = document.getElementById('fileInfoRevision');
    let expireRevision = document.getElementById('expireRevision');
    let docRevisionTecnica = {
        "activoIdActivo": idUrl,
        "rutaAdjunto": `/path/${fileInfoRevision.textContent.trim()}`,
        "fechaAdjunto": currentDate(),
        "fechaVencimiento": expireRevision.value,
        "tipoDocumentoIdTipoDocumento": 4
    }

    //AGREGADO DE OBJETOS AL ARREGLO DE DOCUMENTOS DEL ACTIVOS
    activoJSON.documentos.push(docSeguroObligatorio);
    activoJSON.documentos.push(docPadronVehicular);
    activoJSON.documentos.push(docPermisoCirculacion);
    activoJSON.documentos.push(docRevisionTecnica);

    //OBTENCIÓN DE LOS PLANES SELECCIONADOS PARA EL ACTIVO
    const planesSeleccionados = document.getElementById('buttonsSelectedPlan').getElementsByClassName('name-plan');
    
    //RECORRIDO DE LOS PLANES SELECCIONADOS
    for (const element of planesSeleccionados) {

        banderaPlanes = true; // Control para la creación del JSON
        //getPlanes YA SE OBTUVO y se utiliza a continuación
        const plan = getPlanes.find((plan) => plan.nombre == element.textContent);
        if (plan) {

            //OBJETO QUE CONTIENE PLAN SELECCIONADO
<<<<<<< HEAD
            let planesActivoJSON = {
=======
            let planesactivoJSON = {
>>>>>>> c4d991099d7ecc12d7df75dddecd695004927df3
                "activoIdActivo": idUrl,
                "planMantenimientoIdPlanMantenimiento": plan.idPlanMantenimiento
            }

            //AGREGANDO PLAN AL ARREGLO DE PLANES DEL ACTIVO
<<<<<<< HEAD
            activoJSON.activoPlanes.push(planesActivoJSON);
=======
            activoJSON.activoPlanes.push(planesactivoJSON);
>>>>>>> c4d991099d7ecc12d7df75dddecd695004927df3
        }

    }

    //Control para creación del JSON
    if (selectAnio.options[selectAnio.selectedIndex].text != ''
        && valorPatente.textContent.trim() != ''
        && selectArea.options[selectArea.selectedIndex].text != ''
        && selectBodega.options[selectBodega.selectedIndex].text != ''
        && selectTipoActivo.options[selectTipoActivo.selectedIndex].text != ''
        && selectMarca.options[selectMarca.selectedIndex].text != ''
        && selectModelo.options[selectModelo.selectedIndex].text != ''
        && usoActivo.value != ''
        && fileInfoSeguro.textContent.trim() != ''
        && fileInfoPadron.textContent.trim() != ''
        && fileInfoCirculacion.textContent.trim() != ''
        && fileInfoRevision.textContent.trim() != ''
        && expireSeguro.value != ''
        && expirePadron.value != ''
        && expireCirculacion.value != ''
        && expireRevision.value != '') {

        banderaActivo = true;

    }

<<<<<<< HEAD
    //CREACIÓN DEL JSON PARA ACTUALIZAR EL ACTIVO
=======
    //Creación del JSON
>>>>>>> c4d991099d7ecc12d7df75dddecd695004927df3
    if (banderaActivo == true && banderaPlanes == true) {
        sessionStorage.setItem(`ActualizacionActivo_${idUrl}`, JSON.stringify(activoJSON));
    }

}

//ELIMINAR JSON DE SESSIÓN STORAGE
const removerVariableActivoStorageJSON = () => {

    if (sessionStorage.getItem(`ActualizacionActivo_${idUrl}`)) {
        sessionStorage.removeItem(`ActualizacionActivo_${idUrl}`);
    }

}

//MOSTRAR JSON EXISTENTE EN SESSION STORAGE
const mostrarActivoStorageJSON = () => {

    if (sessionStorage.getItem(`ActualizacionActivo_${idUrl}`)) {
        console.log(`\n\nActualizacionActivo_${idUrl}\n\n` + sessionStorage.getItem(`ActualizacionActivo_${idUrl}`));
        //alert(`\n\nActualizacionActivo_${idUrl}\n\n` + JSON.stringify(activoJSON, undefined, 4));
        //sessionStorage.removeItem(`ActualizacionActivo_${idUrl}`);
    }

}

$(document).ready(function () {

<<<<<<< HEAD
    //EVENTOS PARA GUARDAR
=======
>>>>>>> c4d991099d7ecc12d7df75dddecd695004927df3
    $('div #pages').on('click', `button#saveAsset_${idUrl}`, function (e) {

        guardarActivoJSON();

        if ($('#assetYear').val().length != ''
            && $.trim($('#valorPatente').text()) != ''
            && $('#assetAreasOptions').val().length != ''
            && $('#assetWareHousesOptions').val().length != ''
            && $('#assetType').val().length != ''
            && $('#assetBrand').val().length != ''
            && $('#assetModel').val().length != ''
            && $('#assetUse').val().length != '') {

            if (banderaPlanes == false) {

                alert('Debe Seleccionar al menos un plan');

                $('#tabMantenimientos').removeClass("active");
                $('#tabDocumentos').removeClass("active");
                $('#tabDatos').addClass("active");
                $('#tab3').removeClass("active");
                $('#tab2').removeClass("active");
                $('#tab1').addClass("active");

                $('html, body').animate({
                    scrollTop: $(`#assetPlan`).offset().top - 50
                }, 1000)

                e.preventDefault();

            } else {

                $('#tabDatos').removeClass("active");
                $('#tabMantenimientos').removeClass("active");
                $('#tabDocumentos').addClass("active");
                $('#tab1').removeClass("active");
                $('#tab3').removeClass("active");
                $('#tab2').addClass("active");

                if ($.trim($('#fileInfoSeguro').text()) == '') {
                    alert('Debe adjuntar el "Seguro obligatorio"');
                    e.preventDefault();
                } else {
                    if ($.trim($('#fileInfoPadron').text()) == '') {
                        alert('Debe adjuntar el "Padrón vehicular"');
                        e.preventDefault();
                    } else {
                        if ($.trim($('#fileInfoCirculacion').text()) == '') {
                            alert('Debe adjuntar el "Permiso de circulación"')
                            e.preventDefault();
                        } else {
                            if ($.trim($('#fileInfoRevision').text()) == '') {
                                alert('Debe adjuntar la "Revisión técnica"')
                                e.preventDefault();
                            }
                        }
                    }
                }
            }
        } else {
            $('#tabDatos').addClass("active");
            $('#tabDocumentos').removeClass("active");
            $('#tabMantenimientos').removeClass("active");
            $('#tab1').addClass("active");
            $('#tab2').removeClass("active");
            $('#tab3').removeClass("active");
        }

        mostrarActivoStorageJSON();

    });


    //Agregar Alert Button al seleccionar Plan de Mantenimiento en el activo
    $('div #pages').on('change', 'select#assetPlan', e => {

        let divAgregados = document.getElementById('buttonsSelectedPlan');
        let texto = e.target.value;

        if ($(`#buttonsSelectedPlan:contains(${texto})`).length <= 0) {

            let divChild = document.createElement("div");
            divChild.className = "alert new-alert";
            let buttonChild = document.createElement("button");
            buttonChild.setAttribute("type", "button");
            buttonChild.setAttribute("class", "close new-close");
            buttonChild.setAttribute("data-dismiss", "alert");
            buttonChild.textContent = `x`;
            let strongChild = document.createElement("strong");
            strongChild.setAttribute("class", "name-plan");
            strongChild.innerHTML = `${e.target.value}`;

            divChild.appendChild(buttonChild);
            divChild.appendChild(strongChild);
            divAgregados.appendChild(divChild);

        }

    });


    $("div #pages").on('change', "input#fileSeguro", function () {
        var filename = $(this).val().replace(/C:\\fakepath\\/i, '')
        console.log(filename);
        //$('#fileInfoSeguro').val(filename); //para input
        $('#fileInfoSeguro').html(filename); //para input
    });

    $("div #pages").on('change', "input#filePadron", function () {
        var filename = $(this).val().replace(/C:\\fakepath\\/i, '')
        console.log(filename);
        $('#fileInfoPadron').html(filename);
    });

    $("div #pages").on('change', "input#fileCirculacion", function () {
        var filename = $(this).val().replace(/C:\\fakepath\\/i, '')
        console.log(filename);
        $('#fileInfoCirculacion').html(filename);
    });

    $("div #pages").on('change', "input#fileRevision", function () {
        var filename = $(this).val().replace(/C:\\fakepath\\/i, '')
        console.log(filename);
        $('#fileInfoRevision').html(filename);
    });

});