/** Funcionalidades para crear un Nueva Categoría */

//Variable para controlar la creación de JSON de categoría
let banderaCategoria = false;

//VARIABLE PARA JSON
let nuevaCategoriaJSON = {
    "nombre": "",
    "codigo": ""
};

//Clase para asignar título a la pestaña del navegador
class {
    constructor(params) {
        super(params);
        this.setTitle(`Nueva categoría`);
    }

    setTitle(title) {
        document.title = title;
    }

}


//FUNCIÓN PARA CREAR EL JSON QUE SERÁ PASADO A LA API
const guardarCategoriaJSON = () => {

    let nombreCategoria = document.getElementById('categoryName_new');
    nuevaCategoriaJSON.nombre = nombreCategoria.value;

    let codigoCategoria = document.getElementById('categoryCode_new');
    nuevaCategoriaJSON.codigo = codigoCategoria.value;

    if (nombreCategoria.value != ''
        && codigoCategoria.value != '') {

        banderaCategoria = true;

    }

    //CREACIÓN DEL JSON DE NUEVA CATEGORÍA
    if (banderaCategoria == true) {
        sessionStorage.setItem(`NuevaCategoria`, JSON.stringify(nuevaCategoriaJSON));
    }
}

//ELIMINAR JSON DE SESSIÓN STORAGE
const removerVariableCategoriaStorageJSON = () => {

    if (sessionStorage.getItem(`NuevaCategoria`)) {
        sessionStorage.removeItem(`NuevaCategoria`);
    }

}

//MOSTRAR JSON EXISTENTE EN SESSION STORAGE
const mostrarCategoriaStorageJSON = () => {

    if (sessionStorage.getItem(`NuevaCategoria`)) {
        console.log(`\n\nNuevaCategoria\n\n` + sessionStorage.getItem(`NuevaCategoria`));
        //alert(`\n\nNuevaCategoria\n\n` + JSON.stringify(nuevaCategoriaJSON, undefined, 4));
        //sessionStorage.removeItem(`NuevoActivo`);
    }
}

$(document).ready(function () {

    $('div #pages').on('click', 'button#saveCategory_new', function () {
        guardarCategoriaJSON();
        mostrarCategoriaStorageJSON();
    });

});