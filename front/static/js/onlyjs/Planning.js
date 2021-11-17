/** Funcionalidades para listar PLANES DE MANTENIMIENTO */

import TableLanguage from "./TableLanguage.js"

//Clase para asignar nombre a pestaña navegador
class {
    constructor(params) {
        super(params);
        this.setTitle(`Planes`);
    }

    setTitle(title) {
        document.title = title;
    }

}

//LISTADO DE PLANES
//OBTENCIÓN DE PLANES DE MANTENIMIENTO
let planesJSON = 'http://192.168.0.13:8080/static/js/data/planning.JSON';
let titlePlanesJSON = 'Planes';
let getPlanes = [];
getPlanes = getJson(planesJSON, titlePlanesJSON);

//CREACIÓN DE FORMATO DATATABLE PARA EL LISTADO DE LOS PLANES
customTable();

let kmHoraPeriodo = ''
let getIdPlanMantenimiento = 0;
let getNombrePlanMantenimiento = ``;

//RECORRIDO DE TODOS LOS PLANES
for (const plan of getPlanes) {

    getIdPlanMantenimiento = plan.idPlanMantenimiento;
    getNombrePlanMantenimiento = plan.nombre;

    if (plan.porPeriodo == true) {
        kmHoraPeriodo = 'Por período'
    }
    if (plan.porKm == true) {
        kmHoraPeriodo = 'Por kilómetros'
    }
    if (plan.porHora == true) {
        kmHoraPeriodo = 'Por horas'
    }

}

//FORMATO A TABLA CON DATATABLE
const customTable = () => {

    $(document).ready(function () {
        $('div #pages table#planningTable').DataTable({
            "order": [[0, "desc"]],
            "language": TableLanguage,
            "scrollX": true // De la mano con el width="100%" en la etiqueta table
        });
    });

    /*Agrego en CustomTable para generar eventos con hipervinculos que están dentro*/
    $(document).ready(function () {
        $('div #pages table#planningTable').on('click', 'a.only-to-id-url', function () {
            console.log("Voy al plan: " + $(this).attr('href').slice(1).substring($(this).attr('href').slice(1).lastIndexOf('/') + 1))
        })
    });
}
