import TableLanguage from "./TableLanguage.js"
import { getJson } from "./Options.js"

let getIdTipoActivo = 0;
let getNombreTipoActivo = ``;

//LISTADO DE TIPOS DE ACTIVOS
//OBTENCIÓN DE TODAS LOS TIPOS DE ACTIVOS
let tiposActivosJSON = 'http://192.168.1.114:8000/static/js/data/assetsType.JSON';
let titleTiposActivosJSON = 'Tipos de activos';
let getTiposActivos = [];
getTiposActivos = getJson(tiposActivosJSON, titleTiposActivosJSON);

//CREACIÓN DE FORMATO DATATABLE PARA EL LISTADO DE TIPOS DE ACTIVOS
customTable();

for (const tipo of getTiposActivos) {

    //IDENTIFICADOR DEL TIPO DE ACTIVO
    getIdTipoActivo = tipo.idTipoActivo;

    //NOMBRE DEL TIPO DE ACTIVO
    getNombreTipoActivo = tipo.nombre;

}



const customTable = () => {

    $(document).ready(function () {
        $('div #pages table#assetsTypeTable').DataTable({
            "order": [[0, "desc"]],
            "language": TableLanguage,
            "scrollX": true // De la mano con el width="100%" en la etiqueta table
        });
    });

    /*Agrego en CustomTable para generar eventos con hipervinculos que están dentro*/
    $(document).ready(function () {
        $('div #pages table#assetsTypeTable').on('click', 'a.only-to-id-url', function () {
            console.log("Voy al tipo de activo: " + $(this).attr('href').slice(1).substring($(this).attr('href').slice(1).lastIndexOf('/') + 1))
        })
    });
}
