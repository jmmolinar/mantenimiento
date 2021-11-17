/** Funcionalidades para consultar y actualizar un taller de servicio */

import {
    regiones,
    loadSelectContent,
    loadSelectContentAndSelected,
    listSelect,
    listAllElement
} from "./Options.js"

let getIdTaller = 0;
let getRegion = ``;
let getComuna = ``;
let getCalle = ``;
let getNumero = ``;
let getComunasRegion = [];
let comunasRegionCambiada = [];
let getLatitud = ``;
let getLongitud = ``;

//Variable para controlar la creación de JSON de taller
let banderaTaller = false;

//VARIABLE PARA JSON
let tallerJSON = {
    "idTallerServicio": 0,
    "nombre": "",
    "region": "",
    "comuna": "",
    "calle": "",
    "numero": "",
    "latitud": null,
    "longitud": null,
    "idGeocercaCabecera": null
};

//Variable para asignar el identificador
let idUrl = 0;

//Clase para obtener el parámetro ID de la URL
class {
    constructor(params) {
        super(params);
        this.postId = params.id;
        this.setTitle(`Taller ${this.postId}`);
    }

    setTitle(title) {
        document.title = title;
    }

}

let identificador = this.postId;
idUrl = parseInt(identificador);

//LISTADO DE TALLERES
//OBTENCIÓN DE TODOS LOS TALLERES
let talleresJSON = 'http://192.168.0.13:8080/static/js/data/workshops.JSON';
let titleTalleresJSON = 'Talleres';
let getTalleres = [];
getTalleres = getJson(talleresJSON, titleTalleresJSON);

console.log(jqXHR)
let fillWorkshop = ''

//OBTENCIÓN DEL TALLER IDENTIFICADO EN LA URL
const taller = getTalleres.find((taller) => taller.idTallerServicio == identificador)

if (taller) {

    getIdTaller = taller.idTallerServicio
    getRegion = taller.region;
    getComuna = taller.comuna;
    getCalle = taller.calle;
    getNumero = taller.numero;
    getLatitud = taller.latitud;
    getLongitud = taller.longitud;
    console.log("Verificando postId: " + identificador)
    console.log("Vericando const taller: " + taller)


} else {
    alert(`No se logró obtener el taller ${identificador}`)
}

//SI EL TALLER EXISTE SE LLENAN SUS SELECT
taller ? fillOptions() : {};

//LLENADO DE OPTION PARA LOS SELECT DEL TALLER
const fillOptions = () => {

    console.log("Entré al fillOptions en AssetWareHouseView")
    $(document).ready(function () {

        //SELECT REGION - TRAIDO DESDE OPTIONS.JS
        const selectRegion = document.getElementById('workshopRegionOptions');
        const optionRegion = listSelect(regiones, "name"); // Paso la clave "name"
        loadSelectContentAndSelected(optionRegion, selectRegion, getRegion);
        console.log("Región taller seleccionada: " + getRegion);

        //SELECT COMUNA - OBTENIDO DE REGIONES
        const region = regiones.find((region) => region.name == getRegion);
        getComunasRegion = listAllElement(region.communes)
        const selectComuna = document.getElementById('workshopCommuneOptions');
        const optionComuna = listSelect(getComunasRegion, "name"); // Paso la clave "name"
        loadSelectContentAndSelected(optionComuna, selectComuna, getComuna);
        console.log("Comuna taller seleccionada: " + getComuna);

        //CAMBIO DE REGION Y COMUNA
        $('div #pages').on('change', 'select#workshopRegionOptions', e => {
            selectComuna.innerHTML = '<option value="">-</option>';
            const comunas = regiones.find(elem => elem.name == e.target.value); //Con filter no me completa el listAllElement
            comunasRegionCambiada = listAllElement(comunas.communes)
            const listaComunas = listSelect(comunasRegionCambiada, "name");
            loadSelectContent(listaComunas, selectComuna);

        })

    });

}

//FUNCIÓN PARA CREAR EL JSON QUE SERÁ PASADO A LA API
const guardarTallerJSON = () => {

    banderaTaller = false; //Control para creación del JSON

    tallerJSON.idTallerServicio = idUrl;

    let nombreTaller = document.getElementById(`workshopName_${idUrl}`);
    tallerJSON.nombre = nombreTaller.value;

    let selectRegion = document.getElementById('workshopRegionOptions');
    tallerJSON.region = selectRegion.options[selectRegion.selectedIndex].text;

    let selectComuna = document.getElementById('workshopCommuneOptions');
    tallerJSON.comuna = selectComuna.options[selectComuna.selectedIndex].text;

    let calleTaller = document.getElementById('streetWorkshop');
    tallerJSON.calle = calleTaller.value;

    let numeroTaller = document.getElementById('numStreetWorkshop')
    tallerJSON.numero = numeroTaller.value;

    let latitudTaller = document.getElementById('latitudeWorkshop');
    tallerJSON.latitud = latitudTaller.value;

    let longitudTaller = document.getElementById('longitudeWorkshop')
    tallerJSON.longitud = longitudTaller.value;

    //Por ahora valor de referencia
    //Debe tener valor de relación idGeocercaCabecera en BD de Plataforma
    tallerJSON.idGeocercaCabecera = 0;

    if (nombreTaller.value != ''
        && selectRegion.options[selectRegion.selectedIndex].text != ''
        && selectComuna.options[selectComuna.selectedIndex].text != ''
        && calleTaller.value != ''
        && numeroTaller.value != ''
        && latitudTaller.value != ''
        && longitudTaller.value != '') {

        banderaTaller = true;

    }

    //CREACIÓN DEL JSON PARA ACTUALIZAR EL TALLER
    if (banderaTaller == true) {
        sessionStorage.setItem(`ActualizacionTaller_${idUrl}`, JSON.stringify(tallerJSON));
    }

}

//ELIMINAR JSON DE SESSIÓN STORAGE
const removerVariableTallerStorageJSON = () => {

    if (sessionStorage.getItem(`ActualizacionTaller_${idUrl}`)) {
        sessionStorage.removeItem(`ActualizacionTaller_${idUrl}`);
    }

}

//MOSTRAR JSON EXISTENTE EN SESSION STORAGE
const mostrarTallerStorageJSON = () => {

    if (sessionStorage.getItem(`ActualizacionTaller_${idUrl}`)) {
        console.log(`\n\nActualizacionTaller_${idUrl}\n\n` + sessionStorage.getItem(`ActualizacionTaller_${idUrl}`));
        //alert(`\n\nActualizacionTaller_${idUrl}\n\n` + JSON.stringify(tallerJSON, undefined, 4));
        //sessionStorage.removeItem(`ActualizacionTaller_${idUrl}`);
    }
}

$(document).ready(function () {

    //EVENTO PARA GUARDAR
    $('div #pages').on('click', `button#saveWorkshop_${idUrl}`, function () {
        guardarTallerJSON();
        mostrarTallerStorageJSON();
    });

})