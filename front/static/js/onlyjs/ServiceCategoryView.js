import AbstractView from "./AbstractView.js";
import { getJson } from "./Options.js";

//Variable para controlar la creación de JSON de categoría
let banderaCategoria = false;

//VARIABLE PARA JSON
let categoriaJSON = {
    "idCategoriaServicio": 0,
    "nombre": "",
    "codigo": ""
};

//Variable para asignar el identificador
let idUrl = 0;

//Clase para obtener el parámetro ID de la URL
class {
    constructor(params) {
        super(params);
        this.postId = params.id;
        this.setTitle(`Categoría ${this.postId}`);
    }

    setTitle(title) {
        document.title = title;
    }

}

let identificadorGlobal = this.postId;
idUrl = parseInt(identificador);

//OBTENCIÓN DE LAS CATEGORÍAS DE SERVICIO
let categoriasJSON = 'http://192.168.0.13:8080/static/js/data/serviceCategories.JSON';
let titleCategoriasJSON = 'Categorías';
let getCategorias = [];
getCategorias = getJson(categoriasJSON, titleCategoriasJSON);


//OBTENGO LA CATEGORÍA ACTUAL
const categoria = getCategorias.find((categoria) => categoria.idCategoriaServicio == identificador)

if (categoria) {

    console.log("Verificando postId: " + identificador)
    console.log("Vericando const categoria: " + categoria)

    fillCategory = ``;
} else {
    alert(`No se logró obtener la categoría ${identificador}</p>`)
}

//FUNCIÓN PARA CREAR EL JSON QUE SERÁ PASADO A LA API
const guardarCategoriaJSON = () => {

    categoriaJSON.idCategoriaServicio = idUrl;

    let nombreCategoria = document.getElementById(`categoryName_${idUrl}`);
    categoriaJSON.nombre = nombreCategoria.value;

    let codigoCategoria = document.getElementById(`categoryCode_${idUrl}`);
    categoriaJSON.codigo = codigoCategoria.value;

    if (nombreCategoria.value != ''
        && codigoCategoria.value != '') {

        banderaCategoria = true;

    }

    //CREACION DEL JSON PARA ACTUALIZAR LA CATEGORIA
    if (banderaCategoria == true) {
        sessionStorage.setItem(`ActualizacionCategoria_${idUrl}`, JSON.stringify(categoriaJSON));
    }
}

//ELIMINAR LA VARIABLE DEL JSON EN SESSION STORAGE
const removerVariableCategoriaStorageJSON = () => {

    if (sessionStorage.getItem(`ActualizacionCategoria_${idUrl}`)) {
        sessionStorage.removeItem(`ActualizacionCategoria_${idUrl}`);
    }

}

//MOSTRAR EL CONTENIDO DE LA VARIABLE DEL SESSION STORAGE
const mostrarCategoriaStorageJSON = () => {

    if (sessionStorage.getItem(`ActualizacionCategoria_${idUrl}`)) {
        console.log(`\n\nActualizacionCategoria_${idUrl}\n\n` + sessionStorage.getItem(`ActualizacionCategoria_${idUrl}`));
        //alert(`\n\nActualizacionCategoria_${idUrl}\n\n` + JSON.stringify(categoriaJSON, undefined, 4));
        //sessionStorage.removeItem(`NuevoActivo`);
    }
}

$(document).ready(function () {

    //EJECUCIÓN DE GUARDADO
    $('div #pages').on('click', `button#saveCategory_${idUrl}`, function () {
        guardarCategoriaJSON();
        mostrarCategoriaStorageJSON();
    });

});