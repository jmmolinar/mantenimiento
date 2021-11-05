import AbstractView from "./AbstractView.js";
import TableLanguage from "./TableLanguage.js";
import { 
    listAllElement,
    getEstados,
    getTalleres,
    getTiposMantenimientos,
    getActivos,
    getAreas,
    getVehiculos,
} from "./Options.js";

// Variables para filtrar fechas en la tabla
// va de la mano con la función de filtrado personalizado
let minDate = "";
let maxDate = "";

let getEstado = ``;
let getEstadoActual = ``;
let getTaller = ``;
let getTipoOrden = ``;
let getActivo = ``;
let getAreaActivo = ``;
let getPatenteActivo = ``;

let totalOrdenes = [];

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Historial");
    }

    async getHtml() {

        let ordersStatusHistoryHTML = ``;

        let optionsOrdersStatusHistoryHTML = `<div id="optionsOrdersStatusHistoryHTML">
        <h1></h1>
        <a class="btn btn-success" href="">Exportar <i class="fa fa-cloud-download"></i></a>
        </div>
        <div class="new-div-range-date-table">
            <div class="input-prepend input-append">
                <span class="add-on">Desde</span>
                <input type="text" id="min" name="min" style="border-radius:3px;">
            </div>

            <div class="input-prepend input-append">
                <span class="add-on">Hasta</span>
                <input type="text" id="max" name="max" style="border-radius:3px;">
            </div>

            <!--<div class="input-prepend input-append">
                <button id="borrarFiltro" class="btn">Borrar</button>
            </div>-->

        </div>
        `;

        let ordersStatusHistoryContainerA = `<div id="ordersStatusHistoryContainer">
        <h1></h1>
        <table id="ordersStatusHistoryTable" class="display table table-striped table-bordered nowrap" width="100%">
        <thead>
            <tr>
                <th>#</th>
                <th>Activo</th>
                <!--<th>Estado actual</th>-->
                <th>Tipo</th>
                <th>Área</th>
                <!--<th>Creación</th>-->
                <th>Fecha inicio</th>
                <th>Taller</th>
                <th>Estados</th>
                <th>Fecha estado</th>
                <th>Asignado por</th>
                <!--<th>Total</th>-->
                <th>Ver</th>
            </tr>
        </thead>
        <tbody>
        `;

        let ordersStatusHistoryContainerB = ` 
        </tbody>
        </table>
        </div>
        `;

        $.ajax({
            type: 'GET',
            url: 'http://192.168.1.114:8080/static/js/data/orders.JSON',
            dataType: 'json',
            success: function (data, status, jqXHR) {

                console.log("Entré al AJAX")
                customOrdersStatusHistoryTable();
                console.log(jqXHR)
                let fillOrdersStatusHistory = ''
                let classTr = ""
                let stringContainer = ""
                let formatGetEstadosOrdenNombre = ``;
                let formatGetEstadosOrdenFecha = ``;
                let formatGetEstadosOrdenPor = ``;
                let getEstadosOrden = [];
                let cont = 0;

                for (const orden of data) {

                    totalOrdenes.push(orden);
                    cont++

                    getTaller = ``;
                    const taller = getTalleres.find((taller) => taller.idTallerServicio == orden.tallerServicioIdTallerServicio);
                    if (taller) {
                        getTaller = taller.nombre;
                    }

                    const tipoOrden = getTiposMantenimientos.find((tipoOrden) => tipoOrden.idTipoOrden == orden.tipoOrdenIdTipoOrden);
                    if (tipoOrden) {
                        getTipoOrden = tipoOrden.nombre;
                    }

                    const activo = getActivos.find((activo) => activo.idActivo == orden.activoIdActivo);
                    if(activo){
                        
                        const vehiculo = getVehiculos.find((vehiculo) => vehiculo.idVehiculo == activo.vehiculoIdVehiculo);
                        if (vehiculo) {
                            getPatenteActivo = vehiculo.ppuVehiculo;
                        }
                        
                        const area = getAreas.find((area) => area.idArea == activo.areaIdArea);
                        if(area){
                            getAreaActivo = area.nombreArea;
                        }
                    }

                    getEstadosOrden = listAllElement(orden.ordenEstados);
                    let fechaUltimoEstado = "1900-01-01T00:00"; // Inicio de fecha a comparar
                    let getEstadosOrdenNombre = [];
                    let getEstadosOrdenFecha = [];
                    let getEstadosOrdenPor = [];

                    //Obtengo el último estado comparando las fechas para darle estilo en el historial
                    getEstadosOrden.forEach(elem => {

                        if (new Date(elem["fechaAsignado"]) > new Date(fechaUltimoEstado)) {

                            const estadoActual = getEstados.find((estado) => estado.idEstado == elem["estadoIdEstado"]);
                            if (estadoActual) {
                                getEstadoActual = estadoActual.nombre;
                            }

                            fechaUltimoEstado = elem["fechaAsignado"];
                        } 

                    })

                    //Recorro de nuevo para dar estilo al último estado en el historial
                    getEstadosOrden.forEach(elem => {
                            
                        const styleEstadoActual = getEstados.find((estado) => estado.idEstado == elem["estadoIdEstado"]);
                        if (styleEstadoActual) {
                            //Estilo al estado actual
                            if(getEstadoActual == styleEstadoActual.nombre){
                                getEstadosOrdenNombre.push(`<div class="alert alert-success no-margin new-padding-top-bottom"><strong>${getEstadoActual}</strong></div>`)
                                getEstadosOrdenFecha.push(`<div class="alert alert-success no-margin new-padding-top-bottom"><strong>${elem["fechaAsignado"]}</strong></div>`)
                                getEstadosOrdenPor.push(`<div class="alert alert-success no-margin new-padding-top-bottom"><strong>${elem["idUsuario"]}</strong></div>`)
                            } else { //Estilo a los estados anteriores
                                getEstadosOrdenNombre.push(`<div class="alert alert-info no-margin new-padding-top-bottom"><strong>${styleEstadoActual.nombre}</strong></div>`)
                                getEstadosOrdenFecha.push(`<div class="alert alert-info no-margin new-padding-top-bottom"><strong>${elem["fechaAsignado"]}</strong></div>`)
                                getEstadosOrdenPor.push(`<div class="alert alert-info no-margin new-padding-top-bottom"><strong>${elem["idUsuario"]}</strong></div>`)
                            }
                        }
                    })

                    if (getEstadosOrdenNombre.length) {
                        formatGetEstadosOrdenNombre = getEstadosOrdenNombre.join('');
                        formatGetEstadosOrdenFecha = getEstadosOrdenFecha.join('');
                        formatGetEstadosOrdenPor = getEstadosOrdenPor.join('');
                    } else {
                        formatGetEstadosOrdenNombre = ``;
                        formatGetEstadosOrdenFecha = ``;
                        formatGetEstadosOrdenPor = ``;
                    }


                    /*console.log(`Estados de la orden ${orden.idOrden}`)
                    getEstadosOrden.forEach(element => {
                        console.log(`Estado: ${element.nombre_estado} - ID: ${element.id_estado} - Asignación: ${element.fecha_estado} - Por: ${element.estado_asignado_por}`)
                    })*/

                    fillOrdersStatusHistory += `
                        <tr class=${classTr}>
                            <td>${orden.idOrden}</td>
                            <td>${getPatenteActivo}</td>
                            <td>${getTipoOrden}</td>
                            <td>${getAreaActivo}</td>
                            <!--<td>${orden.fechaCreacion.slice(0,10)}</td>-->
                            <td>${orden.fechaInicial.slice(0,10)}</td>
                            <td>${getTaller}</td>
                            <td>${formatGetEstadosOrdenNombre}</td>
                            <td>${formatGetEstadosOrdenFecha}</td>
                            <td>${formatGetEstadosOrdenPor}</td>
                            <!--<td>${orden.total}</td>-->
                            <td class="align-center">
                                <a id="editOrder_${orden.idOrden}" class="btn only-to-id-url" href="/ordenes/${orden.idOrden}"><i class="icon-pencil"></i></a>
                                <!--<a id="deleteOrder_${orden.idOrden}" class="btn" disabled><i class="icon-trash"></i></a>-->
                            </td>
                        </tr>`
                }

                ordersStatusHistoryHTML = optionsOrdersStatusHistoryHTML.concat(ordersStatusHistoryContainerA)
                ordersStatusHistoryHTML = ordersStatusHistoryHTML.concat(fillOrdersStatusHistory)
                ordersStatusHistoryHTML = ordersStatusHistoryHTML.concat(ordersStatusHistoryContainerB)

                $('#pages').html(ordersStatusHistoryHTML)
                console.log(`AJAX ordersStatusHistoryTable -> Status: ${status}`)

            },
            error: function (jqXHR) {
                console.log("Error en ajax")
                console.log(jqXHR)
            }
        })

        return ordersStatusHistoryHTML;
    }

}

const customOrdersStatusHistoryTable = () => {

    $(document).ready(function () {

        // Agregando inputs para filtro de fechas a la tabla
        minDate = new DateTime($('div #pages input#min'), {
            format: 'YYYY-MM-DD',
            buttons: {
                clear: true
            },
            i18n: {
                clear: "Borrar",
                months: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
                weekdays: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']
            }
        });

        maxDate = new DateTime($('div #pages input#max'), {
            format: 'YYYY-MM-DD',
            buttons: {
                clear: true
            },
            i18n: {
                clear: "Borrar",
                months: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
                weekdays: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']
            }
        });

        // Tabla
        let table = $('div #pages table#ordersStatusHistoryTable').DataTable({
            "order": [[0, "desc"]],
            // Especifico las columnas a continuación para poder dar formato numérico al render de "Total"
            // Si no lo hiciera no sería necesario agregar "columns"
            "columns": [
                {
                    data: 'idOrden'
                },
                {
                    data: 'getPatenteActivo'
                },
                /*{
                    data: "estado_orden"
                },*/
                {
                    data: "getTipoOrden"
                },
                {
                    data: "getAreaActivo"
                },
                /*{
                    data: "fechaCreacion"
                },*/
                {
                    data: "fechaInicial",
                    render: filtrarFechasStatusHistory() //Ejecutar la función de filtrado de fechas
                },
                {
                    data: "getTaller"
                },
                {
                    data: "formatGetEstadosOrdenNombre"
                },
                {
                    data: "formatGetEstadosOrdenFecha"
                },
                {
                    data: "formatGetEstadosOrdenPor"
                },
                /*{
                    data: "total",
                    render: $.fn.dataTable.render.number('', ',', 2, 'CLP ')
                },*/
                {
                    data: "Ver"  /* No está dentro del JSON pero debe definirse para trabajar de la mano con la columna donde agrega el botón Ver */
                }
            ],

            "language": TableLanguage,
            "scrollX": true // De la mano con el width="100%" en la etiqueta table
        });

        // Refilter the table
        $('div #pages input#min, div #pages input#max').on('change', function () {
            table.draw();
        });

        //filtrarFechas(); //Filtro de fechas

    });
}

// Función de filtrado personalizado que buscará datos en la columna 5 entre dos valores
const filtrarFechasStatusHistory = () => {

    $.fn.dataTable.ext.search.push(
        function (settings, data, datosIndex) {

            //Sólo filtro la tabla de órdenes del historial de estados
            if (settings.nTable == document.getElementById('ordersStatusHistoryTable')) {

                let min = minDate.val();
                let max = maxDate.val();
                let date = new Date(data[4]); //Filtrando por fecha_inicio

                if (
                    (min === null && max === null) ||
                    (min === null && date <= max) ||
                    (min <= date && max === null) ||
                    (min <= date && date <= max)
                ) {
                    return true;
                }
                return false; //Para la tabla ordersTable
            } else {
                return true;
            }

        }


    );
}

$(document).ready(function () {

    $('[data-toggle="tooltip"]').tooltip({ animation: true });

});