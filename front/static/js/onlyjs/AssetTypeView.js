/** Funcionalidades para consultar y actualizar un tipo de activo */

import { getJson } from "./Options.js"

let getIdTipoActivo = 0;
let getNombreTipoActivo = ``;
let identificador = 0;

//VARIABLE PARA CONTROLAR LA CREACIÓN DEL JSON DEL TIPO DE ACTIVO
let banderaTipoActivo = false;

//VARIABLE PARA JSON DEL TIPO DE ACTIVO
let tipoActivoJSON = {
    "idTipoActivo": 0,
    "nombre": ""
};

//VARIABLE PARA ASIGNAR EL IDENTIFICADOR
let idUrl = 0;

//Clase para obtener el parámetro ID de la URL
class {
    constructor(params) {
        super(params);
        this.postId = params.id;
        this.setTitle(`Tipo de activo ${this.postId}`);
    }

    setTitle(title) {
        document.title = title;
    }

}

identificador = this.postId;
idUrl = parseInt(identificador);

//LISTADO DE TIPOS DE ACTIVOS
//OBTENCIÓN DE TODAS LOS TIPOS DE ACTIVOS
let tiposActivosJSON = 'http://192.168.0.13:8080/static/js/data/assetsType.JSON';
let titleTiposActivosJSON = 'Tipos de activos';
let getTiposActivos = [];
getTiposActivos = getJson(tiposActivosJSON, titleTiposActivosJSON);

//OBTENCIÓN DEL TIPO DE ACTIVO IDENTIFICADO EN LA URL
const assetType = getTiposActivos.find((assetType) => assetType.idTipoActivo == identificador)

if (assetType) {

    getIdTipoActivo = assetType.idTipoActivo;
    getNombreTipoActivo = assetType.nombre;
    console.log("Verificando postId: " + identificador)
    console.log("Vericando const assetType: " + assetType)


} else {
    alert(`=( No se logró obtener el tipo de activo ${identificador}`);
}

//FUNCIÓN PARA CREAR EL JSON QUE SERÁ PASADO A LA API
const guardarTipoActivoJSON = () => {

    tipoActivoJSON.idTipoActivo = idUrl;

    let nombreTipoActivo = document.getElementById(`assetTypeName_${idUrl}`);
    tipoActivoJSON.nombre = nombreTipoActivo.value;

    if (nombreTipoActivo.value != '') {
        banderaTipoActivo = true;
    }

    //Creación del JSON
    if (banderaTipoActivo == true) {
        sessionStorage.setItem(`ActualizacionTipoActivo_${idUrl}`, JSON.stringify(tipoActivoJSON));
    }
}

//ELIMINAR LA VARIABLE DEL JSON EN SESSION STORAGE
const removerVariableTipoActivoStorageJSON = () => {

    if (sessionStorage.getItem(`ActualizacionTipoActivo_${idUrl}`)) {
        sessionStorage.removeItem(`ActualizacionTipoActivo_${idUrl}`);
    }

}

//MOSTRAR EL CONTENIDO DE LA VARIABLE DEL SESSION STORAGE
const mostrarTipoActivoStorageJSON = () => {

    if (sessionStorage.getItem(`ActualizacionTipoActivo_${idUrl}`)) {
        console.log(`\n\nActualizacionTipoActivo_${idUrl}\n\n` + sessionStorage.getItem(`ActualizacionTipoActivo_${idUrl}`));
        //alert(`\n\nActualizacionTipoActivo_${idUrl}\n\n` + JSON.stringify(tipoActivoJSON, undefined, 4));
        //sessionStorage.removeItem(`ActualizacionTipoActivo_${idUrl}`);
    }
}

$(document).ready(function () {

    $('div #pages').on('click', `button#saveAssetType_${idUrl}`, function () {
        guardarTipoActivoJSON();
        mostrarTipoActivoStorageJSON();
    });

});