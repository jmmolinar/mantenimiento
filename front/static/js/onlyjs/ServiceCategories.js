/** Funcionalidades para listar las categorías */

import TableLanguage from "./TableLanguage.js"

//Clase para obtener el parámetro ID de la URL
class {
    constructor(params) {
        super(params);
        this.setTitle(`Categorías`);
    }

    setTitle(title) {
        document.title = title;
    }

}

let getIdCategoriaServicio = 0;
let getNombreCategoria = ``;
let getCodigoCategoria = ``;

//LISTADO DE CATEGORÍAS DE SERVICIO
//OBTENCIÓN DE LAS CATEGORÍAS DE SERVICIO
let categoriasJSON = 'http://192.168.0.13:8080/static/js/data/serviceCategories.JSON';
let titleCategoriasJSON = 'Categorías';
let getCategorias = [];
getCategorias = getJson(categoriasJSON, titleCategoriasJSON);

//CREACIÓN DE FORMATO DATATABLE PARA EL LISTADO DE CATEGORIAS
customTable();

//RECORRO TODAS LAS CATEGORIAS

for (const categoria of getCategorias) {

    getIdCategoriaServicio = categoria.idCategoriaServicio;
    getNombreCategoria = categoria.nombre;
    getCodigoCategoria = categoria.codigo;

}

//FORMATO A TABLA CON DATATABLE
const customTable = () => {

    $(document).ready(function () {
        $('div #pages table#serviceCategoriesTable').DataTable({
            "order": [[0, "desc"]],
            "language": TableLanguage,
            "scrollX": true // De la mano con el width="100%" en la etiqueta table
        });
    });

    /*Agrego en CustomTable para generar eventos con hipervinculos que están dentro*/
    $(document).ready(function () {
        $('div #pages table#serviceCategoriesTable').on('click', 'a.only-to-id-url', function () {
            console.log("Voy a la categoría: " + $(this).attr('href').slice(1).substring($(this).attr('href').slice(1).lastIndexOf('/') + 1))
        })
    });
}
