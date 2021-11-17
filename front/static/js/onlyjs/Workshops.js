/** Funcionalidades para listar talleres de servicio */

import TableLanguage from "./TableLanguage.js";
import { getJson } from "./Options.js"

let getIdTaller = 0;
let getNombreTaller = ``;
let getRegionTaller = ``
let getComunaTaller = ``;
let getNumeroTaller = ``;
let getLatitudTaller = ``;
let getLongitudTaller = ``;

//Clase para asignar nombre a pestaña navegador
class {
    constructor(params) {
        super(params);
        this.setTitle(`Talleres`);
    }

    setTitle(title) {
        document.title = title;
    }

}

//LISTADO DE TALLERES
//OBTENCIÓN DE TODOS LOS TALLERES
let talleresJSON = 'http://192.168.0.13:8080/static/js/data/workshops.JSON';
let titleTalleresJSON = 'Talleres';
let getTalleres = [];
getTalleres = getJson(talleresJSON, titleTalleresJSON);

//CREACIÓN DE FORMATO DATATABLE PARA EL LISTADO DE BODEGAS DE ACTIVOS
customTable();


for (const taller of getTalleres) {

    getIdTaller = taller.idTallerServicio;
    getNombreTaller = taller.nombre;
    getRegionTaller = taller.region;
    getComunaTaller = taller.comuna;
    getNumeroTaller = taller.numero;
    getLatitudTaller = taller.latitud;
    getLongitudTaller = taller.longitud;


    //CANTIDAD DE ORDENES ASIGNADAS A CADA TALLER
    //OBTENCIÓN DE TODAS LAS ORDENES
    let ordenesJSON = 'http://192.168.0.13:8080/static/js/data/orders.JSON';
    let titleOrdenesJSON = "Órdenes";
    let getOrdenes = [];
    getOrdenes = getJson(ordenesJSON, titleOrdenesJSON);

    const ordenesAsignadas = getOrdenes.filter((orden) => orden.tallerServicioIdTallerServicio == taller.idTallerServicio);
    let contAsignadosTaller = 0;
    if (ordenesAsignadas) {
        ordenesAsignadas.forEach(element => {
            contAsignadosTaller++;
        });
    }

}

//FORMATO A TABLA CON DATATABLE
const customTable = () => {

    $(document).ready(function () {
        $('div #pages table#workshopsTable').DataTable({
            "order": [[0, "desc"]],
            "language": TableLanguage,
            "scrollX": true // De la mano con el width="100%" en la etiqueta table
        });
    });

    /*Agrego en CustomTable para generar eventos con hipervinculos que están dentro*/
    $(document).ready(function () {
        $('div #pages table#workshopsTable').on('click', 'a.only-to-id-url', function () {
            console.log("Voy al taller: " + $(this).attr('href').slice(1).substring($(this).attr('href').slice(1).lastIndexOf('/') + 1))
        })
    });
}
