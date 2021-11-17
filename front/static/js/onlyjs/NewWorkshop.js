/** Funcionalidades para crear una Nuevo Taller */

import AbstractView from "./AbstractView.js";
import {
    regiones,
    getJson,
    loadSelectContent,
    loadSelectContentAndSelected,
    listSelect,
    listAllElement
} from "./Options.js"

let getRegion = `Metropolitana de Santiago`;
let getComuna = ``;
let getComunasRegion = [];
let comunasRegionCambiada = [];
let getLatitud = ``;
let getLongitud = ``;

//Variable para controlar la creación de JSON de taller
let banderaTaller = false;

//VARIABLE PARA JSON
let nuevoTallerJSON = {
    "nombre": "",
    "region": "",
    "comuna": "",
    "calle": "",
    "numero": "",
    "latitud": null,
    "longitud": null,
    "idGeocercaCabecera": null
};

//Clase para asignar título a la pestaña del navegador
class {
    constructor(params) {
        super(params);
        this.setTitle(`Nuevo Taller`);
    }

    setTitle(title) {
        document.title = title;
    }

}

//LLAMADO A FUNCIÓN DE LLENADO DE SELECT Y OPTION PARA CREAR NUEVO TALLER
fillOptions();

//FUNCIÓN DE LLENADO DE OPTION PARA LOS SELECT DEL NUEVO TALLER
const fillOptions = () => {

    console.log("Entré al fillOptions en AssetWareHouseView")
    $(document).ready(function () {

        //SELECT REGION - desde arreglo ubicado en Options.js
        const selectRegion = document.getElementById('workshopRegionOptions');
        const optionRegion = listSelect(regiones, "name"); // Paso la clave "name"
        loadSelectContentAndSelected(optionRegion, selectRegion, getRegion);
        console.log("Región taller seleccionada: " + getRegion);

        //SELECT COMUNA desdes REGION
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

    banderaTaller = false; // Control para creación de JSON

    let nombreTaller = document.getElementById('workshopName_new')
    nuevoTallerJSON.nombre = document.getElementById('workshopName_new').value;

    let selectRegion = document.getElementById('workshopRegionOptions');
    nuevoTallerJSON.region = selectRegion.options[selectRegion.selectedIndex].text;

    let selectComuna = document.getElementById('workshopCommuneOptions');
    nuevoTallerJSON.comuna = selectComuna.options[selectComuna.selectedIndex].text;

    let calleTaller = document.getElementById('streetWorkshop');
    nuevoTallerJSON.calle = calleTaller.value;

    let numeroTaller = document.getElementById('numStreetWorkshop')
    nuevoTallerJSON.numero = numeroTaller.value;

    let latitudTaller = document.getElementById('latitudeWorkshop');
    nuevoTallerJSON.latitud = latitudTaller.value;

    let longitudTaller = document.getElementById('longitudeWorkshop')
    nuevoTallerJSON.longitud = longitudTaller.value;

    //Por ahora valor de referencia
    //Debe tener valor de relación idGeocercaCabecera en BD de Plataforma
    nuevoTallerJSON.idGeocercaCabecera = 0;

    if (nombreTaller.value != ''
        && selectRegion.options[selectRegion.selectedIndex].text != ''
        && selectComuna.options[selectComuna.selectedIndex].text != ''
        && calleTaller.value != ''
        && numeroTaller.value != ''
        && latitudTaller.value != ''
        && longitudTaller.value != '') {

        banderaTaller = true;

    }

    //CREACIÓN DEL JSON DE LA NUEVO TALLER
    if (banderaTaller == true) {
        sessionStorage.setItem(`NuevoTaller`, JSON.stringify(nuevoTallerJSON));
    }

}

//ELIMINAR JSON DE SESSIÓN STORAGE
const removerVariableTallerStorageJSON = () => {

    if (sessionStorage.getItem(`NuevoTaller`)) {
        sessionStorage.removeItem(`NuevoTaller`);
    }

}

//MOSTRAR JSON EXISTENTE EN SESSION STORAGE
const mostrarTallerStorageJSON = () => {

    if (sessionStorage.getItem(`NuevoTaller`)) { // Si hay una variable antigua con el mismo nombre, entrará a éste IF
        console.log(`\n\nNuevoTaller\n\n` + sessionStorage.getItem(`NuevoTaller`));
        //alert(`\n\nNuevoTaller\n\n` + JSON.stringify(nuevoTallerJSON, undefined, 4));
        //sessionStorage.removeItem(`NuevoTaller`);
    }
}

$(document).ready(function () {

    //EVENTO PARA GUARDAR
    $('div #pages').on('click', 'button#saveWorkshop_new', function () {
        guardarTallerJSON();
        mostrarTallerStorageJSON();
    });

})