/** Funcionalidades para consultar y actualizar una bodega de activos */

import {
    regiones,
    loadSelectContent,
    loadSelectContentAndSelected,
    listSelect,
    listAllElement,
    getJson
} from "./Options.js"

let getIdBodega = 0;
let getRegion = ``;
let getComuna = ``;
let getComunasRegion = [];
let comunasRegionCambiada = [];
let getLatitud = ``;
let getLongitud = ``;
let identificador = 0;

//VARIABLE PARA CONTROLAR LA CREACIÓN DE JSON DE BODEGA
let banderaBodega = false;

//VARIABLE PARA JSON
let bodegaJSON = {
    "idBodegaActivos": 0,
    "nombre": "",
    "region": "",
    "comuna": "",
    "calle": "",
    "numero": "",
    "latitud": null,
    "longitud": null,
    "idGeocercaCabecera": null
};

//VARIABLE PARA ASIGNAR EL IDENTIFICADOR
let idUrl = 0;

//Clase para obtener el parámetro ID de la URL
class {
    constructor(params) {
        super(params);
        this.postId = params.id;
        this.setTitle(`Bodega ${this.postId}`);
    }

    setTitle(title) {
        document.title = title;
    }

}

identificador = this.postId;
idUrl = parseInt(identificador);

//LISTADO DE BODEGAS
//OBTENCIÓN DE TODAS LAS BODEGAS
let bodegasJSON = 'http://192.168.1.114:8080/static/js/data/assetsWareHouses.JSON';
let titleBodegasJSON = 'Bodegas';
let getBodegas = [];
getBodegas = getJson(bodegasJSON, titleBodegasJSON);

//OBTENCIÓN DE LA BODEGA IDENTIFICADA EN LA URL
const bodega = getBodegas.find((bodega) => bodega.idBodegaActivos == identificador)

if (bodega) {

    getIdBodega = bodega.idBodegaActivos;
    getRegion = bodega.region;
    getComuna = bodega.comuna;
    getLatitud = bodega.latitud;
    getLongitud = bodega.longitud;
    console.log("Verificando postId: " + identificador)
    console.log("Vericando const bodega: " + bodega)

} else {
    alert(`=( No se logró obtener la bodega ${identificador}`);
}

//SI LA BODEGA EXISTE SE LLENAN SUS SELECT
bodega ? fillOptions() : {};

//LLENADO DE OPTION PARA LOS SELECT DE LA BODEGA
const fillOptions = () => {

    console.log("Entré al fillOptions en AssetsWareHouseView")
    $(document).ready(function () {

        // Select Región
        const selectRegion = document.getElementById('wareHouseRegionOptions');
        const optionRegion = listSelect(regiones, "name"); // Paso la clave "name"
        loadSelectContentAndSelected(optionRegion, selectRegion, getRegion);
        console.log("Región seleccionada: " + getRegion);

        // Select Comuna
        const region = regiones.find((region) => region.name == getRegion);
        getComunasRegion = listAllElement(region.communes)
        const selectComuna = document.getElementById('wareHouseCommuneOptions');
        const optionComuna = listSelect(getComunasRegion, "name"); // Paso la clave "name"
        loadSelectContentAndSelected(optionComuna, selectComuna, getComuna);
        console.log("Comuna seleccionada: " + getComuna);

        // Cambio de Región y comuna
        $('div #pages').on('change', 'select#wareHouseRegionOptions', e => {
            selectComuna.innerHTML = '<option value="">-</option>';
            const comunas = regiones.find(elem => elem.name == e.target.value); //Con filter no me completa el listAllElement
            comunasRegionCambiada = listAllElement(comunas.communes)
            const listaComunas = listSelect(comunasRegionCambiada, "name");
            loadSelectContent(listaComunas, selectComuna);

        })

    });

}

//FUNCIÓN PARA CREAR EL JSON QUE SERÁ PASADO A LA API
const guardarBodegaJSON = () => {

    banderaBodega = false;

    bodegaJSON.idBodegaActivos = idUrl;

    let nombreBodega = document.getElementById(`wareHouseName_${idUrl}`)
    bodegaJSON.nombre = nombreBodega.value;

    // La variable de ASIGNADOS no se toma en cuenta para el JSON
    // Se tomará ese dato para mostrarlo mediante consultas

    let selectRegion = document.getElementById('wareHouseRegionOptions');
    bodegaJSON.region = selectRegion.options[selectRegion.selectedIndex].text;

    let selectComuna = document.getElementById('wareHouseCommuneOptions');
    bodegaJSON.comuna = selectComuna.options[selectComuna.selectedIndex].text;

    let calleBodega = document.getElementById('streetWareHouse');
    bodegaJSON.calle = calleBodega.value;

    let numeroBodega = document.getElementById('numStreetWareHouse');
    bodegaJSON.numero = numeroBodega.value;

    let latitudBodega = document.getElementById('latitudeWareHouse');
    bodegaJSON.latitud = latitudBodega.value;

    let longitudBodega = document.getElementById('longitudeWareHouse');
    bodegaJSON.longitud = longitudBodega.value;

    //Por ahora valor de referencia
    //Debe tener valor de relación idGeocercaCabecera en BD de Plataforma
    bodegaJSON.idGeocercaCabecera = 0;


    if (nombreBodega.value != ''
        && selectRegion.options[selectRegion.selectedIndex].text != ''
        && selectComuna.options[selectComuna.selectedIndex].text != ''
        && calleBodega.value != ''
        && numeroBodega.value != ''
        && latitudBodega.value != ''
        && longitudBodega.value != '') {

        banderaBodega = true;

    }

    //Creación del JSON
    if (banderaBodega == true) {
        sessionStorage.setItem(`ActualizacionBodega_${idUrl}`, JSON.stringify(bodegaJSON));
    }

}

const removerVariableBodegaStorageJSON = () => {

    if (sessionStorage.getItem(`ActualizacionBodega_${idUrl}`)) {
        sessionStorage.removeItem(`ActualizacionBodega_${idUrl}`);
    }

}

const mostrarBodegaStorageJSON = () => {

    if (sessionStorage.getItem(`ActualizacionBodega_${idUrl}`)) {
        console.log(`\n\nActualizacionBodega_${idUrl}\n\n` + sessionStorage.getItem(`ActualizacionBodega_${idUrl}`));
        //alert(`\n\nActualizacionBodega_${idUrl}\n\n` + JSON.stringify(bodegaJSON, undefined, 4));
        //sessionStorage.removeItem(`NuevoActivo`);
    }
}

$(document).ready(function () {

    $('div #pages').on('click', `button#saveWareHouse_${idUrl}`, function () {
        guardarBodegaJSON();
        mostrarBodegaStorageJSON();
    });

})