/** Funcionalidades para listar bodegas de activos */

import TableLanguage from "./TableLanguage.js"
import { getJson } from "./Options.js"

let getIdBodegaActivos = 0;
let getNombreBodegaActivos = ``;
let getRegionBodegaActivos = ``
let getComunaBodegaActivos = ``;
let getNumeroBodegaActivos = ``;
let getLatitudBodegaActivos = ``;
let getLongitudBodegaActivos = ``;

//Clase para asignar nombre a pestaña navegador
class {
    constructor(params) {
        super(params);
        this.setTitle(`Bodegas`);
    }

    setTitle(title) {
        document.title = title;
    }

}

//LISTADO DE BODEGAS
//OBTENCIÓN DE TODAS LAS BODEGAS
let bodegasJSON = 'http://192.168.0.13:8080/static/js/data/assetsWareHouses.JSON';
let titleBodegasJSON = 'Bodegas';
let getBodegas = [];
getBodegas = getJson(bodegasJSON, titleBodegasJSON);

//CREACIÓN DE FORMATO DATATABLE PARA EL LISTADO DE BODEGAS DE ACTIVOS
customTable();

//RECORRIDO DE CADA BODEGA
for (const bodega of getBodegas) {

    getIdBodegaActivos = bodega.idBodegaActivos;
    getNombreBodegaActivos = bodega.nombre;
    getRegionBodegaActivos = bodega.region;
    getComunaBodegaActivos = bodega.comuna;
    getNumeroBodegaActivos = bodega.numero;
    getLatitudBodegaActivos = bodega.latitud;
    getLongitudBodegaActivos = bodega.longitud;

    //CANTIDAD DE ACTIVOS ASIGNADOS A CADA BODEGA
    //OBTENCIÓN DE TODAS LOS ACTIVOS
    let activosJSON = 'http://192.168.0.13:8080/static/js/data/assets.JSON';
    let titleActivosJSON = 'Activos';
    let getActivos = [];
    getActivos = getJson(activosJSON, titleActivosJSON);

    const activosAsignados = getActivos.filter((activo) => activo.bodegaActivosIdBodegaActivos == bodega.idBodegaActivos);
    let contAsignados = 0;
    if (activosAsignados) {
        activosAsignados.forEach(element => {
            contAsignados++; // Se debe asignar a cada registro para ver la cantidad de activos asignados a la bodega
        });
    }
}

//FORMATO A TABLA CON DATATABLE
const customTable = () => {

    $(document).ready(function () {
        $('div #pages table#assetsWareHousesTable').DataTable({
            "order": [[0, "desc"]],
            "language": TableLanguage,
            "scrollX": true // De la mano con el width="100%" en la etiqueta table
        });
    });

    /*Agrego en customTable para generar eventos con hipervinculos que están dentro*/
    $(document).ready(function () {
        $('div #pages table#assetsWareHousesTable').on('click', 'a.only-to-id-url', function () {
            console.log("Voy a la bodega: " + $(this).attr('href').slice(1).substring($(this).attr('href').slice(1).lastIndexOf('/') + 1))
        })
    });
}
