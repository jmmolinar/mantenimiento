import AbstractView from "./AbstractView.js";
import TableLanguage from "./TableLanguage.js";
import { listAllElement } from "./Options.js";

// Variables para filtrar fechas en la tabla
// va de la mano con la función de filtrado personalizado
let minDate = "";
let maxDate = "";
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
                <!--<th>Taller</th>-->
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
                    /*switch (orden.estado_orden) {
                        case 'Por planificar':
                            classTr = "warning"
                            stringContainer = 'Se requiere completar datos'
                            break;
                        case 'No realizado':
                            classTr = "muted"
                            stringContainer = 'La órden de mantenimiento no fue ejecutada'
                            break;
                        case 'Retrasado':
                            classTr = "error"
                            stringContainer = 'La orden no ha sigo planificada'
                            break;
                        case 'Retrasado en taller':
                            classTr = "error"
                            stringContainer = 'El servicio en taller excede el tiempo planificado'
                            break;
                        case 'Planificado':
                            classTr = ""
                            stringContainer = 'El próximo paso es la realización del servicio en Taller'
                            break;
                        case 'Planificado con retraso':
                            classTr = ""
                            stringContainer = 'La órden fue planificada con retraso'
                            break;
                        case 'En taller':
                            classTr = "info"
                            stringContainer = 'Se están realizando los servicios de mantenimiento'
                            break;
                        case 'Completado':
                            classTr = "success"
                            stringContainer = 'La orden ha sido completada'
                            break;
                        case 'Completado con retraso':
                            classTr = "success"
                            stringContainer = 'La orden ha sido completada con retraso'
                            break;
                        default:
                            classTr = ""
                            stringContainer = ''
                            console.log('Estado de la orden desconocido');
                    }*/
                    //console.log("Estado de la orden: " + orden.estado_orden + " - Estilo asignado: " + classTr)



                    getEstadosOrden = listAllElement(orden.historial_estados);
                    let getEstadosOrdenNombre = [];
                    let getEstadosOrdenFecha = [];
                    let getEstadosOrdenPor = [];

                    getEstadosOrden.forEach(elem => {
                        if (elem["estado_actual"]) {
                            getEstadosOrdenNombre.push(`<div class="alert alert-success no-margin new-padding-top-bottom"><strong>${elem["nombre_estado"]}</strong></div>`)
                            getEstadosOrdenFecha.push(`<div class="alert alert-success no-margin new-padding-top-bottom"><strong>${elem["fecha_estado"]}</strong></div>`)
                            getEstadosOrdenPor.push(`<div class="alert alert-success no-margin new-padding-top-bottom"><strong>${elem["estado_asignado_por"]}</strong></div>`)
                        } else {
                            getEstadosOrdenNombre.push(`<div class="alert alert-info no-margin new-padding-top-bottom"><strong>${elem["nombre_estado"]}</strong></div>`)
                            getEstadosOrdenFecha.push(`<div class="alert alert-info no-margin new-padding-top-bottom"><strong>${elem["fecha_estado"]}</strong></div>`)
                            getEstadosOrdenPor.push(`<div class="alert alert-info no-margin new-padding-top-bottom"><strong>${elem["estado_asignado_por"]}</strong></div>`)
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


                    /*console.log(`Estados de la orden ${orden.id_orden}`)
                    getEstadosOrden.forEach(element => {
                        console.log(`Estado: ${element.nombre_estado} - ID: ${element.id_estado} - Asignación: ${element.fecha_estado} - Por: ${element.estado_asignado_por}`)
                    })*/

                    fillOrdersStatusHistory += `
                        <tr class=${classTr}>
                            <td>${orden.id_orden}</td>
                            <td>${orden.patente_activo}</td>
                            <!--<td>${orden.estado_orden} <a data-toggle="tooltip" title="${stringContainer}"><i class="fa fa-info-circle" aria-hidden="true"></i></a></td>-->
                            <!--<td>${orden.estado_orden} <a href="" data-toggle="popover" title="${orden.estado_orden}" data-content="${stringContainer}"><i class="fa fa-info-circle" aria-hidden="true"></i></a></td>-->
                            <td>${orden.tipo_orden}</td>
                            <td>${orden.area_vehiculo}</td>
                            <!--<td>${orden.fecha_creacion}</td>-->
                            <td>${orden.fecha_inicio}</td>
                            <!--<td>${orden.taller_orden}</td>-->
                            <td>${formatGetEstadosOrdenNombre}</td>
                            <td>${formatGetEstadosOrdenFecha}</td>
                            <td>${formatGetEstadosOrdenPor}</td>
                            <!--<td>${orden.total}</td>-->
                            <td class="align-center">
                                <a id="editOrder_${orden.id_orden}" class="btn only-to-id-url" href="/ordenes/${orden.id_orden}"><i class="icon-pencil"></i></a>
                                <!--<a id="deleteOrder_${orden.id_orden}" class="btn" disabled><i class="icon-trash"></i></a>-->
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
                    data: 'id_orden'
                },
                {
                    data: 'patente_activo'
                },
                /*{
                    data: "estado_orden"
                },*/
                {
                    data: "tipo_orden"
                },
                {
                    data: "area_vehiculo"
                },
                /*{
                    data: "fecha_creacion"
                },*/
                {
                    data: "fecha_inicio",
                    render: filtrarFechasStatusHistory() //Ejecutar la función de filtrado de fechas
                },
                /*{
                    data: "taller_orden"
                },*/
                {
                    data: "historial_estados.nombre_estado"
                },
                {
                    data: "historial_estados.fecha_estado"
                },
                {
                    data: "historial_estados.estado_asignado_por"
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