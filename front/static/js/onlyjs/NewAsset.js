/** Funcionalidades para crear un Nuevo Activo */

import { getJson,
    listAllElement,
    loadSelectContent,
    listSelect,
    listAnioAndSelected,
    currentDate
} from "./Options.js"

let getArea = ``;
let getBodega = ``;
let getTipoActivo = ``;
let getMarca = ``;
let getModelo = ``;
let getGPSImei = ``;
let getActivoKmGps = ``;
let getActivoHorometro = ``;
let getUsoActivo = ``;
let getAnio = ``;
let getPlan = ``;
let getPlanesActivo = [];
let compActivoPatente = ``;

//ARREGLOS GLOBALES DE OBJETOS PARA LOS DATOS QUE SE OBTIENEN DE LOS JSON
let getAreas = [];
let getBodegas = [];
let getTiposActivos = [];
let getVehiculos = [];
let getMarcas = [];
let getModelos = [];
let getPlanes = [];
let getGPS = [];

//VARIABLES PARA CONTROLAR LA CREACIÓN DEL JSON DE NUEVO ACTIVO
let banderaActivo = false;
let banderaPlanes = false;

//VARIABLE PARA JSON
let nuevoActivoJSON = {
    "anio": null,
    "dadoDeBaja": false,
    "vehiculoIdVehiculo": null,
    "areaIdArea": null,
    "bodegaActivosIdBodegaActivos": null,
    "tipoActivoIdTipoActivo": null,
    "activoPlanes": [],
    "documentos": []
};

//Clase para asignar título a la pestaña del navegador
class {
    constructor(params) {
        super(params);
        this.setTitle(`Nuevo activo`);
    }

    setTitle(title) {
        document.title = title;
    }

}

//LLAMADO A FUNCIÓN DE LLENADO DE SELECT Y OPTION PARA CREAR NUEVO ACTIVO
fillOptions()

//FUNCIÓN DE LLENADO DE OPTION PARA LOS SELECT DEL NUEVO ACTIVO
const fillOptions = () => {

    console.log("Entré al fillOptions en NewAsset")

    $(window).on("load", function () {

        $(document).ready(function () {

            //SELECT ÁREA
            //OBTENCIÓN DE LAS ÁREAS
            let areasJSON = 'http://192.168.0.13:8080/static/js/data/areas.JSON';
            let titleAreasJSON = "Áreas";
            getAreas = getJson(areasJSON, titleAreasJSON);
            const selectArea = document.getElementById('assetAreasOptions_new');
            const optionArea = listSelect(getAreas, "nombreArea"); // Paso la clave "nombre"
            loadSelectContent(optionArea, selectArea);

            //SELECT BODEGA
            //OBTENCIÓN DE LAS BODEGAS
            let bodegasJSON = 'http://192.168.0.13:8080/static/js/data/assetsWareHouses.JSON';
            let titleBodegasJSON = 'Bodegas';
            getBodegas = getJson(bodegasJSON, titleBodegasJSON);
            const selectBodega = document.getElementById('assetWareHousesOptions_new');
            const optionBodega = listSelect(getBodegas, "nombre"); // Paso la clave "nombre"
            loadSelectContent(optionBodega, selectBodega)

            //SELECT TIPO DE ACTIVO
            //OBTENCIÓN DE LOS TIPOS DE ACTIVOS
            let tiposActivosJSON = 'http://192.168.0.13:8080/static/js/data/assetsType.JSON';
            let titleTiposActivosJSON = 'Tipos de activos';
            getTiposActivos = getJson(tiposActivosJSON, titleTiposActivosJSON);
            const selectTipoActivo = document.getElementById('assetType_new');
            const optionTipoActivo = listSelect(getTiposActivos, "nombre"); // Paso la clave "nombre"
            loadSelectContent(optionTipoActivo, selectTipoActivo);

            //SELECT VEHICULO
            //OBTENCIÓN DE LOS VEHÍCULOS
            let vehiculosJSON = 'http://192.168.0.13:8080/static/js/data/vehicle.JSON';
            let titleVehiculosJSON = 'Vehículos BLACKGPS';
            getVehiculos = getJson(vehiculosJSON, titleVehiculosJSON);
            const selectVehiculo = document.getElementById('assetPatent_new');
            const optionVehiculo = listSelect(getVehiculos, "ppuVehiculo"); // Paso la clave "ppuVehiculo"
            loadSelectContent(optionVehiculo, selectVehiculo);

            //SELECT MARCA
            //OBTENCIÓN DE LAS MARCAS
            let marcasJSON = 'http://192.168.0.13:8080/static/js/data/brand.JSON';
            let titleMarcasJSON = 'Marcas BLACKGPS';
            getMarcas = getJson(marcasJSON, titleMarcasJSON);
            const selectMarca = document.getElementById('assetBrand_new');
            const optionMarca = listSelect(getMarcas, "nombreMarcaVehiculo"); // Paso la clave "nombreMarcaVehiculo"
            loadSelectContent(optionMarca, selectMarca);

            //SELECT MODELO
            //OBTENCIÓN DE LOS MODELOS
            let modelosJSON = 'http://192.168.0.13:8080/static/js/data/model.JSON';
            let titleModelosJSON = 'Modelos BLACKGPS';
            getModelos = getJson(modelosJSON, titleModelosJSON);
            const selectModelo = document.getElementById('assetModel_new');
            const optionModelo = listSelect(getModelos, "nombreModeloVehiculo") // Paso la clave "nombreModeloVehiculo"
            loadSelectContent(optionModelo, selectModelo);

            // Select Anio desde listAnioAndSelected en Options.js
            const selectAnio = document.getElementById('assetYear_new');
            listAnioAndSelected(selectAnio, getAnio);

            //LISTADO DE PLANES PARA AGREGAR HACIENDO CLICK SOBRE CADA UNO
            //SELECT PLANES
            //OBTENCIÓN DE LOS PLANES
            let planesJSON = 'http://192.168.0.13:8080/static/js/data/planning.JSON';
            let titlePlanesJSON = 'Planes';
            getPlanes = getJson(planesJSON, titlePlanesJSON);
            const selectPlan = document.getElementById('assetPlan_new');
            const optionPlan = listSelect(getPlanes, "nombre"); // Paso la clave "nombre"
            loadSelectContent(optionPlan, selectPlan);

            //OBTENCIÓN DE LOS GPS - Se emplearán en los eventos
            let gpsJSON = 'http://192.168.0.13:8080/static/js/data/gps.JSON';
            let titleGpsJSON = 'GPS BLACKGPS';
            getGPS = getJson(gpsJSON, titleGpsJSON);

        });

    });

}

//FUNCIÓN PARA CREAR EL JSON QUE SERÁ PASADO A LA API
const guardarActivoJSON = () => {

    banderaActivo = false; // Control para creación del JSON
    banderaPlanes = false; // Control para creación del JSON
    nuevoActivoJSON.activoPlanes = []; // reinicio planes
    nuevoActivoJSON.documentos = []; // reinicio documentos

    let selectAnio = document.getElementById('assetYear_new');
    nuevoActivoJSON.anio = selectAnio.options[selectAnio.selectedIndex].text;
    nuevoActivoJSON.dadoDeBaja = false;

    let selectPatente = document.getElementById('assetPatent_new');
    //getVehiculos YA SE OBTUVO y se utiliza a continuación
    const vehiculo = getVehiculos.find((vehiculo) => vehiculo.ppuVehiculo.trim() == selectPatente.value.trim());
    if (vehiculo) {
        nuevoActivoJSON.vehiculoIdVehiculo = vehiculo.idVehiculo;
    }

    let selectArea = document.getElementById('assetAreasOptions_new');
    //getAreas YA SE OBTUVO y se utiliza a continuación
    const area = getAreas.find((area) => area.nombreArea == selectArea.value);
    if (area) {
        nuevoActivoJSON.areaIdArea = area.idArea;
    }

    let selectBodega = document.getElementById('assetWareHousesOptions_new');
    //getBodegas YA SE OBTUVO y se utiliza a continuación
    const bodega = getBodegas.find((bodega) => bodega.nombre == selectBodega.value);
    if (bodega) {
        nuevoActivoJSON.bodegaActivosIdBodegaActivos = bodega.idBodegaActivos;
    }

    let selectTipoActivo = document.getElementById('assetType_new');
    //getTiposActivos YA SE OBTUVO y se utiliza a continuación
    const tipoActivo = getTiposActivos.find((tipoActivo) => tipoActivo.nombre == selectTipoActivo.value);
    if (tipoActivo) {
        nuevoActivoJSON.tipoActivoIdTipoActivo = tipoActivo.idTipoActivo;
    }

    let selectMarca = document.getElementById('assetBrand_new');
    let selectModelo = document.getElementById('assetModel_new');
    let usoActivo = document.getElementById('assetUse_new');

    //OBJETO PARA AGREGAR DOCUMENTO TIPO 1 A DOCUMENTOS DEL ACTIVO
    let fileInfoSeguro_new = document.getElementById('fileInfoSeguro_new');
    let expireSeguro_new = document.getElementById('expireSeguro_new');
    let docSeguroObligatorio = {
        //"activoIdActivo: "
        "rutaAdjunto": `/path/${fileInfoSeguro_new.textContent.trim()}`,
        "fechaAdjunto": currentDate(),
        "fechaVencimiento": expireSeguro_new.value,
        "tipoDocumentoIdTipoDocumento": 1
    }

    //OBJETO PARA AGREGAR DOCUMENTO TIPO 2 A DOCUMENTOS DEL ACTIVO
    let fileInfoPadron_new = document.getElementById('fileInfoPadron_new');
    let expirePadron_new = document.getElementById('expirePadron_new');
    let docPadronVehicular = {
        //"activoIdActivo: "
        "rutaAdjunto": `/path/${fileInfoPadron_new.textContent.trim()}`,
        "fechaAdjunto": currentDate(),
        "fechaVencimiento": expirePadron_new.value,
        "tipoDocumentoIdTipoDocumento": 2
    }

    //OBJETO PARA AGREGAR DOCUMENTO TIPO 3 A DOCUMENTOS DEL ACTIVO
    let fileInfoCirculacion_new = document.getElementById('fileInfoCirculacion_new');
    let expireCirculacion_new = document.getElementById('expireCirculacion_new');
    let docPermisoCirculacion = {
        //"activoIdActivo: "
        "rutaAdjunto": `/path/${fileInfoCirculacion_new.textContent.trim()}`,
        "fechaAdjunto": currentDate(),
        "fechaVencimiento": expireCirculacion_new.value,
        "tipoDocumentoIdTipoDocumento": 3
    }

    //OBJETO PARA AGREGAR DOCUMENTO TIPO 4 A DOCUMENTOS DEL ACTIVO
    let fileInfoRevision_new = document.getElementById('fileInfoRevision_new');
    let expireRevision_new = document.getElementById('expireRevision_new');
    let docRevisionTecnica = {
        //"activoIdActivo: "
        "rutaAdjunto": `/path/${fileInfoRevision_new.textContent.trim()}`,
        "fechaAdjunto": currentDate(),
        "fechaVencimiento": expireRevision_new.value,
        "tipoDocumentoIdTipoDocumento": 4
    }

    //AGREGADO DE OBJETOS AL ARREGLO DE DOCUMENTOS DEL ACTIVOS
    nuevoActivoJSON.documentos.push(docSeguroObligatorio);
    nuevoActivoJSON.documentos.push(docPadronVehicular);
    nuevoActivoJSON.documentos.push(docPermisoCirculacion);
    nuevoActivoJSON.documentos.push(docRevisionTecnica);

    //OBTENCIÓN DE LOS PLANES SELECCIONADOS PARA EL ACTIVO
    const planesSeleccionados = document.getElementById('buttonsSelectedPlan_new').getElementsByClassName('name-plan');

    //RECORRIDO DE LOS PLANES SELECCIONADOS
    for (const element of planesSeleccionados) {

        banderaPlanes = true; // Control para la creación del JSON

        //getPlanes YA SE OBTUVO y se utiliza a continuación
        const plan = getPlanes.find((plan) => plan.nombre == element.textContent);
        if (plan) {

            //OBJETO QUE CONTIENE PLAN SELECCIONADO
            let planesNuevoActivoJSON = {
                //"activoIdActivo": // No es necesario indicarlo cuando se está creando nuevo - La API guardará el ID del nuevo activo
                "planMantenimientoIdPlanMantenimiento": plan.idPlanMantenimiento
            }

            //AGREGANDO PLAN AL ARREGLO DE PLANES DEL ACTIVO
            nuevoActivoJSON.activoPlanes.push(planesNuevoActivoJSON);
        }

    }

    //Control para creación del JSON
    if (selectAnio.options[selectAnio.selectedIndex].text != ''
        && selectPatente.options[selectPatente.selectedIndex].text != ''
        && selectArea.options[selectArea.selectedIndex].text != ''
        && selectBodega.options[selectBodega.selectedIndex].text != ''
        && selectTipoActivo.options[selectTipoActivo.selectedIndex].text != ''
        && selectMarca.options[selectMarca.selectedIndex].text != ''
        && selectModelo.options[selectModelo.selectedIndex].text != ''
        && fileInfoSeguro_new.textContent.trim() != ''
        && fileInfoPadron_new.textContent.trim() != ''
        && fileInfoCirculacion_new.textContent.trim() != ''
        && fileInfoRevision_new.textContent.trim() != ''
        && expireSeguro_new.value != ''
        && expirePadron_new.value != ''
        && expireCirculacion_new.value != ''
        && expireRevision_new.value != '') {

        banderaActivo = true;

    }

    //CREACIÓN DEL JSON DEL NUEVO ACTIVO
    if (banderaActivo == true && banderaPlanes == true) {
        sessionStorage.setItem(`NuevoActivo`, JSON.stringify(nuevoActivoJSON));
    }

}

//ELIMINAR JSON DE SESSIÓN STORAGE
const removerVariableActivoStorageJSON = () => {

    if (sessionStorage.getItem(`NuevoActivo`)) {
        sessionStorage.removeItem(`NuevoActivo`);
    }

}

//MOSTRAR JSON EXISTENTE EN SESSION STORAGE
const mostrarActivoStorageJSON = () => {

    if (sessionStorage.getItem(`NuevoActivo`)) {
        console.log(`\n\nNuevoActivo\n\n` + sessionStorage.getItem(`NuevoActivo`));
        //alert(`\n\nNuevoActivo\n\n` + JSON.stringify(nuevoActivoJSON, undefined, 4));
        //sessionStorage.removeItem(`NuevoActivo`);
    }

}


$(document).ready(function () {

    //EVENTOS PARA GUARDAR
    $('div #pages').on('click', 'button#saveAsset_new', function (e) {

        guardarActivoJSON();

        if ($('#assetPatent_new').is(':disabled')) {
            alert('Escoja un área que contenga activos y seleccione la patente que necesite');
            $('html, body').animate({
                scrollTop: $(`#assetAreasOptions_new`).offset().top - 50
            }, 1000)
            e.preventDefault();
        } else {

            if ($('#assetPatent_new').val().length == '') {
                alert('Seleccione la patente del activo');
                $('html, body').animate({
                    scrollTop: $(`#assetPatent_new`).offset().top - 50
                }, 1000)
                e.preventDefault();
            }

        }

        if ($('#assetYear_new').val().length != ''
            && $('#assetPatent_new').val().length != ''
            && $('#assetAreasOptions_new').val().length != ''
            && $('#assetWareHousesOptions_new').val().length != ''
            && $('#assetType_new').val().length != ''
            && $('#assetBrand_new').val().length != ''
            && $('#assetModel_new').val().length != ''
            && $('#assetUse_new').val().length != '') {

            if (banderaPlanes == false) {
                alert('Debe Seleccionar al menos un plan');

                $('#tabDocumentos').removeClass("active");
                $('#tabDatos').addClass("active");
                $('#tab2').removeClass("active");
                $('#tab1').addClass("active");

                $('html, body').animate({
                    scrollTop: $(`#assetPlan_new`).offset().top - 50
                }, 1000)

                e.preventDefault();

            } else {

                $('#tabDatos').removeClass("active");
                $('#tabDocumentos').addClass("active");
                $('#tab1').removeClass("active");
                $('#tab2').addClass("active");

                if ($.trim($('#fileInfoSeguro_new').text()) == '') {
                    alert('Debe adjuntar el "Seguro obligatorio"');
                    e.preventDefault();
                } else {
                    if ($.trim($('#fileInfoPadron_new').text()) == '') {
                        alert('Debe adjuntar el "Padrón vehicular"');
                        e.preventDefault();
                    } else {
                        if ($.trim($('#fileInfoCirculacion_new').text()) == '') {
                            alert('Debe adjuntar el "Permiso de circulación"')
                            e.preventDefault();
                        } else {
                            if ($.trim($('#fileInfoRevision_new').text()) == '') {
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
            $('#tab1').addClass("active");
            $('#tab2').removeClass("active");
        }

        mostrarActivoStorageJSON();

    });


    //Sólo Activos (patentes) de un área
    $('div #pages').on('change', 'select#assetAreasOptions_new', e => {

        let vehiculosArea = [];
        //getAreas YA SE OBTUVO y se utiliza a continuación
        const areaSeleccionada = getAreas.find((area) => area.nombreArea == e.target.value);
        if (areaSeleccionada) {

            //getVehiculos YA SE OBTUVO y se utiliza a continuación
            const patentes = getVehiculos.filter((vehiculo) => vehiculo.areaIdArea == areaSeleccionada.idArea);

            if (patentes) {

                vehiculosArea = listAllElement(patentes);

                if (vehiculosArea.length) {

                    $('select#assetPatent_new').removeAttr("disabled");
                    $(`#assetBrand_new`).val("");
                    $(`#assetModel_new`).val("");
                    $(`input#assetUse_new`).val("");
                    $(`input#assetGPS_new`).val("");

                    console.log(vehiculosArea);
                    const selectPatente = document.getElementById('assetPatent_new');
                    const optionPatente = listSelect(vehiculosArea, "ppuVehiculo"); // Paso la clave "ppuVehiculo"
                    loadSelectContent(optionPatente, selectPatente);

                } else {

                    $(`#assetPatent_new`).val("");
                    $(`#assetPatent_new`).attr("disabled", "disabled");
                    $(`#assetBrand_new`).val("");
                    $(`#assetModel_new`).val("");
                    $(`input#assetUse_new`).val("");
                    $(`input#assetGPS_new`).val("");
                }

            }

        } else {

            $(`#assetPatent_new`).val("");
            $(`#assetPatent_new`).attr("disabled", "disabled");
            $(`#assetBrand_new`).val("");
            $(`#assetModel_new`).val("");
            $(`input#assetUse_new`).val("");
            $(`input#assetGPS_new`).val("");
        }

    })

    //Mostrar datos ligados a la patente (activo) seleccionada
    $('div #pages').on('change', 'select#assetPatent_new', e => {

        //getVehiculos YA SE OBTUVO y se utiliza a continuación
        const patenteSeleccionada = getVehiculos.find((vehiculo) => vehiculo.ppuVehiculo == e.target.value);
        getUsoActivo = '';
        if (patenteSeleccionada) {
            console.log("Patente: " + patenteSeleccionada.ppuVehiculo)

            getActivoKmGps = parseFloat(patenteSeleccionada.kmGps).toFixed(2);
            getActivoHorometro = parseFloat(patenteSeleccionada.horometro).toFixed(2);
            getUsoActivo = getActivoKmGps.toString().concat(" Km - ", getActivoHorometro.toString(), " Horas");
            console.log("Uso: " + getUsoActivo);

            //getGPS YA SE OBTUVO y se utiliza a continuación
            const gpsImeiSeleccionado = getGPS.find((gps) => gps.idGps == patenteSeleccionada.gpsIdGps);
            getGPSImei = '';
            if (gpsImeiSeleccionado) {
                getGPSImei = gpsImeiSeleccionado.imeiGps;
                console.log("GPS: " + getGPSImei)
            }

            //getModelos YA SE OBTUVO y se utiliza a continuación
            const modeloSeleccionado = getModelos.find((modelo) => modelo.idModeloVehiculo == patenteSeleccionada.modeloVehiculoIdModeloVehiculo);
            getModelo = '';
            if (modeloSeleccionado) {
                getModelo = modeloSeleccionado.nombreModeloVehiculo;
                console.log("Modelo: " + getModelo)

                //getMarcas YA SE OBTUVO y se utiliza a continuación
                const marcaSeleccionada = getMarcas.find((marca) => marca.idMarcaVehiculo == modeloSeleccionado.marcaVehiculoIdMarcaVehiculo);
                getMarca = '';
                if (marcaSeleccionada) {
                    getMarca = marcaSeleccionada.nombreMarcaVehiculo;
                    console.log("Marca: " + getMarca)
                }
            }

            //$(`#assetBrand_new option[value=${getMarca}]`).attr('selected','selected');
            //$(`#assetModel_new option[value=${getModelo}]`).attr('selected','selected');
            $(`#assetBrand_new`).val(getMarca);
            $(`#assetModel_new`).val(getModelo);
            $(`input#assetUse_new`).val(getUsoActivo);
            $(`input#assetGPS_new`).val(getGPSImei);

        } else {

            $(`#assetBrand_new`).val("");
            $(`#assetModel_new`).val("");
            $(`input#assetUse_new`).val("");
            $(`input#assetGPS_new`).val("");
        }

    })


    //Agregar Alert Button al seleccionar Plan de Mantenimiento en el activo
    $('div #pages').on('change', 'select#assetPlan_new', e => {

        let divAgregados = document.getElementById('buttonsSelectedPlan_new');
        let texto = e.target.value;

        if ($(`#buttonsSelectedPlan_new:contains(${texto})`).length <= 0) {

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


    $("div #pages").on('change', "input#fileSeguro_new", function () {
        var filename = $(this).val().replace(/C:\\fakepath\\/i, '')
        console.log(filename);
        //$('#fileInfoSeguro_new').val(filename); //para input
        $('#fileInfoSeguro_new').html(filename); //para input
    });

    $("div #pages").on('change', "input#filePadron_new", function () {
        var filename = $(this).val().replace(/C:\\fakepath\\/i, '')
        console.log(filename);
        $('#fileInfoPadron_new').html(filename);
    });

    $("div #pages").on('change', "input#fileCirculacion_new", function () {
        var filename = $(this).val().replace(/C:\\fakepath\\/i, '')
        console.log(filename);
        $('#fileInfoCirculacion_new').html(filename);
    });

    $("div #pages").on('change', "input#fileRevision_new", function () {
        var filename = $(this).val().replace(/C:\\fakepath\\/i, '')
        console.log(filename);
        $('#fileInfoRevision_new').html(filename);
    });

});