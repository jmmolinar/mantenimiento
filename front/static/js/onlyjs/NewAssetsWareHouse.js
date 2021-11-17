/** Funcionalidades para crear una Nueva Bodega */

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


//Variable para controlar la creación de JSON de bodega
let banderaBodega = false;

//VARIABLE PARA JSON
let nuevaBodegaJSON = {
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
        this.setTitle(`Nueva Bodega`);
    }

    setTitle(title) {
        document.title = title;
    }

}

//LLAMADO A FUNCIÓN DE LLENADO DE SELECT Y OPTION PARA CREAR NUEVA BODEGA
fillOptions()

//FUNCIÓN DE LLENADO DE OPTION PARA LOS SELECT DE LA NUEVA BODEGA
const fillOptions = () => {

    console.log("Entré al fillOptions en NewAssetsWareHouseView")
    $(document).ready(function () {

        //SELECT REGION - desde arreglo ubicado en Options.js
        const selectRegion = document.getElementById('wareHouseRegionOptions');
        const optionRegion = listSelect(regiones, "name"); // Paso la clave "name"
        loadSelectContentAndSelected(optionRegion, selectRegion, getRegion);
        console.log("Región seleccionada: " + getRegion);

        //SELECT COMUNA desdes REGION
        const region = regiones.find((region) => region.name == getRegion);
        getComunasRegion = listAllElement(region.communes)
        const selectComuna = document.getElementById('wareHouseCommuneOptions');
        const optionComuna = listSelect(getComunasRegion, "name"); // Paso la clave "name"
        loadSelectContentAndSelected(optionComuna, selectComuna, getComuna);
        console.log("Comuna seleccionada: " + getComuna);

        //CAMBIO DE REGION Y COMUNA
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

    banderaBodega = false; // Control para creación de JSON

    let nombreBodega = document.getElementById('wareHouseName_new')
    nuevaBodegaJSON.nombre = nombreBodega.value;

    let selectRegion = document.getElementById('wareHouseRegionOptions');
    nuevaBodegaJSON.region = selectRegion.options[selectRegion.selectedIndex].text;

    let selectComuna = document.getElementById('wareHouseCommuneOptions');
    nuevaBodegaJSON.comuna = selectComuna.options[selectComuna.selectedIndex].text;

    let calleBodega = document.getElementById('streetWareHouse');
    nuevaBodegaJSON.calle = calleBodega.value;

    let numeroBodega = document.getElementById('numStreetWareHouse');
    nuevaBodegaJSON.numero = numeroBodega.value;

    let latitudBodega = document.getElementById('latitudeWareHouse');
    nuevaBodegaJSON.latitud = latitudBodega.value;

    let longitudBodega = document.getElementById('longitudeWareHouse');
    nuevaBodegaJSON.longitud = longitudBodega.value;

    //Por ahora valor de referencia
    //Debe tener valor de relación idGeocercaCabecera en BD de Plataforma
    nuevaBodegaJSON.idGeocercaCabecera = 0;

    //Control para creación del JSON
    if (nombreBodega.value != ''
        && selectRegion.options[selectRegion.selectedIndex].text != ''
        && selectComuna.options[selectComuna.selectedIndex].text != ''
        && calleBodega.value != ''
        && numeroBodega.value != ''
        && latitudBodega.value != ''
        && longitudBodega.value != '') {

        banderaBodega = true;

    }

    //CREACIÓN DEL JSON DE LA NUEVA BODEGA
    if (banderaBodega == true) {
        sessionStorage.setItem(`NuevaBodega`, JSON.stringify(nuevaBodegaJSON));
    }

}

//ELIMINAR JSON DE SESSIÓN STORAGE
const removerVariableBodegaStorageJSON = () => {

    if (sessionStorage.getItem(`NuevaBodega`)) {
        sessionStorage.removeItem(`NuevaBodega`);
    }

}

//MOSTRAR JSON EXISTENTE EN SESSION STORAGE
const mostrarBodegaStorageJSON = () => {

    if (sessionStorage.getItem(`NuevaBodega`)) {
        console.log(`\n\nNuevaBodega\n\n` + sessionStorage.getItem(`NuevaBodega`));
        //alert(`\n\nNuevaBodega\n\n` + JSON.stringify(nuevaBodegaJSON, undefined, 4));
        //sessionStorage.removeItem(`NuevoActivo`);
    }
}

$(document).ready(function () {

    //EVENTO PARA GUARDAR
    $('div #pages').on('click', 'button#saveWareHouse_new', function () {
        guardarBodegaJSON();
        mostrarBodegaStorageJSON();
    });

})