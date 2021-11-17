/** Funcionalidades para crear una Nuevo Tipo de Activo */

//VARIABLE PARA CONTROLAR LA CREACIÓN DE JSON DE TIPO DE ACTIVO
let banderaTipoActivo = false;

//VARIABLE PARA JSON
let nuevoTipoActivoJSON = {
    "nombre": ""
};

//Clase para asignar título a la pestaña del navegador
class {
    constructor(params) {
        super(params);
        this.setTitle(`Nueva tipo de activo`);
    }

    setTitle(title) {
        document.title = title;
    }

}

//FUNCIÓN PARA CREAR EL JSON QUE SERÁ PASADO A LA API
const guardarTipoActivoJSON = () => {

    let nombreTipoActivo = document.getElementById('assetTypeName_new');
    nuevoTipoActivoJSON.nombre = nombreTipoActivo.value;

    if (nombreTipoActivo.value != '') {
        banderaTipoActivo = true;
    }

    //CREACIÓN DEL JSON PARA NUEVO TIPO DE ACTIVO
    if (banderaTipoActivo == true) {
        sessionStorage.setItem(`NuevoTipoActivo`, JSON.stringify(nuevoTipoActivoJSON));
    }
}

//ELIMINAR JSON DE SESSIÓN STORAGE
const removerVariableTipoActivoStorageJSON = () => {

    if (sessionStorage.getItem(`NuevoTipoActivo`)) {
        sessionStorage.removeItem(`NuevoTipoActivo`);
    }

}

//MOSTRAR JSON EXISTENTE EN SESSION STORAGE
const mostrarTipoActivoStorageJSON = () => {

    if (sessionStorage.getItem(`NuevoTipoActivo`)) {
        console.log(`\n\nNuevoTipoActivo\n\n` + sessionStorage.getItem(`NuevoTipoActivo`));
        //alert(`\n\nNuevoTipoActivo\n\n` + JSON.stringify(nuevoTipoActivoJSON, undefined, 4));
        //sessionStorage.removeItem(`NuevoTipoActivo`);
    }
}

$(document).ready(function () {

    //EVENTOS DE GUARDADO
    $('div #pages').on('click', 'button#saveAssetType_new', function () {
        guardarTipoActivoJSON();
        mostrarTipoActivoStorageJSON();
    });

});