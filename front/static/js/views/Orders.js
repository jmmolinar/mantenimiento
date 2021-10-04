import AbstractView from "./AbstractView.js";
import TableLanguage from "./TableLanguage.js";
import { listAllElement } from "./Options.js";

// Variables para filtrar fechas en la tabla
// va de la mano con la función de filtrado personalizado
let minDate = "";
let maxDate = "";

let totalOrdenes = [];
//let table;

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Ordenes");
    }

    async getHtml() {

        let ordersHTML = ``;

        let optionsOrdersHTML = `<div id="optionsOrdersHTML">
        <h1></h1>
        <a class="btn btn-primary" href="/ordenes/nuevo">Nuevo <i class="fa fa-plus-circle" aria-hidden="true"></i></a>
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

        let ordersContainerA = `<div id="ordersContainer">
        <h1></h1>
        <table id="ordersTable" class="display table table-striped table-bordered nowrap" width="100%">
        <thead>
            <tr>
                <th>#</th>
                <th>Activo</th>
                <th>Tipo</th>
                <th>Estado</th>
                <th>Área</th>
                <th>Creación</th>
                <th>Inicio</th>
                <th>Taller</th>
                <!--<th>Servicios</th>
                <th>Costo</th>-->
                <th>Total</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody>
        `;

        let ordersContainerB = ` 
        </tbody>
        </table>
        </div>
        `;

        $.ajax({
            type: 'GET',
            url: 'http://192.168.0.15:8080/static/js/data/orders.JSON',
            dataType: 'json',
            success: function (data, status, jqXHR) {

                console.log("Entré al AJAX")
                customOrdersTable(); /* Aqui renderizo con DataTable y doy formato a la columna costo*/
                console.log(jqXHR)
                let fillOrders = ''
                let classTr = ""
                let stringContainer = ""
                let formatGetCategoriasActivoNombre = ``;
                let formatGetCategoriasActivoCosto = ``;
                let getCategoriasActivo = [];
                let cont = 0;

                for (const orden of data) {
                    totalOrdenes.push(orden);
                    cont++
                    switch (orden.estado_orden) {
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
                        case 'Retraso en taller':
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
                    }
                    //console.log("Estado de la orden: " + orden.estado_orden + " - Estilo asignado: " + classTr)

                    getCategoriasActivo = listAllElement(orden.servicios_orden);
                    let getCategoriasActivoNombre = [];
                    let getCategoriasActivoCosto = [];
                    getCategoriasActivo.forEach(elem => {
                        getCategoriasActivoNombre.push(`<div class="alert alert-info no-margin new-padding-top-bottom"><strong>${elem["nombre"]}</strong></div>`)
                        if (elem["costo"] != "") {
                            getCategoriasActivoCosto.push(`<div class="alert new-alert-use no-margin new-padding-top-bottom">CLP <strong>${(parseFloat(elem["costo"]) + 0.00).toFixed(2).toString().replace(".", ",")}</strong></div>`)
                        }

                    })

                    if (getCategoriasActivoNombre.length) {
                        formatGetCategoriasActivoNombre = getCategoriasActivoNombre.join('');
                        formatGetCategoriasActivoCosto = getCategoriasActivoCosto.join('');
                    } else {
                        formatGetCategoriasActivoNombre = ``;
                        formatGetCategoriasActivoCosto = ``;
                    }

                    fillOrders += `
                        <tr class=${classTr}>
                            <td>${orden.id_orden}</td>
                            <td>${orden.patente_activo}</td>
                            <td>${orden.tipo_orden}</td>
                            <td>${orden.estado_orden} <a data-toggle="tooltip" title="${stringContainer}"><i class="fa fa-info-circle" aria-hidden="true"></i></a></td>
                            <!--<td>${orden.estado_orden} <a href="" data-toggle="popover" title="${orden.estado_orden}" data-content="${stringContainer}"><i class="fa fa-info-circle" aria-hidden="true"></i></a></td>-->  
                            <td>${orden.area_vehiculo}</td>
                            <td>${orden.fecha_creacion}</td>
                            <td>${orden.fecha_inicio}</td>
                            <td>${orden.taller_orden}</td>
                            <!--<td>${formatGetCategoriasActivoNombre}</td>
                            <td>${formatGetCategoriasActivoCosto}</td>-->
                            <td>${orden.total}</td>
                            <td class="align-center">
                                <a id="editOrder_${orden.id_orden}" class="btn only-to-id-url" href="/ordenes/${orden.id_orden}"><i class="icon-pencil"></i></a>
                                <a id="deleteOrder_${orden.id_orden}" class="btn" disabled><i class="icon-trash"></i></a>
                            </td>
                        </tr>`
                }

                ordersHTML = optionsOrdersHTML.concat(ordersContainerA)
                ordersHTML = ordersHTML.concat(fillOrders)
                ordersHTML = ordersHTML.concat(ordersContainerB)

                $('#pages').html(ordersHTML)
                console.log(`AJAX ordersTable -> Status: ${status}`)

            },
            error: function (jqXHR) {
                console.log("Error en ajax")
                console.log(jqXHR)
            }
        })

        return ordersHTML;
    }

}

const customOrdersTable = () => {

    $(document).ready(function () {

        //Verificación en caso de seleccionar fecha en el Calendario
        //Tomo la fecha y la llevo por sessionStorage a las variables del filtro
        //de fechas de las Órdenes
        if (sessionStorage.getItem('fechaFiltro')) {
            //console.log("SessioStorage en Orders: " + sessionStorage.getItem('fechaFiltro'))
            minDate = $('#min').val(sessionStorage.getItem('fechaFiltro').toString());
            maxDate = $('#max').val(sessionStorage.getItem('fechaFiltro').toString());
            sessionStorage.removeItem('fechaFiltro')
            //filtrarFechas();
        }
        if (sessionStorage.getItem('fechaFiltroInicio') && sessionStorage.getItem('fechaFiltroFin')) { // Con selección de fechas
            minDate = $('#min').val(sessionStorage.getItem('fechaFiltroInicio').toString());
            maxDate = $('#max').val(sessionStorage.getItem('fechaFiltroFin').toString());
            sessionStorage.removeItem('fechaFiltroInicio')
            sessionStorage.removeItem('fechaFiltroFin')
            //filtrarFechas();
        }
        /*else {
            minDate = "";
            maxDate = "";
        }*/



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
        let table = $('div #pages table#ordersTable').DataTable({
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
                {
                    data: "tipo_orden"
                },
                {
                    data: "estado_orden"
                },
            
                {
                    data: "area_vehiculo"
                },
                {
                    data: "fecha_creacion"
                },
                {
                    data: "fecha_inicio",
                    render: filtrarFechas() //Ejecutar la función de filtrado de fechas
                },
                {
                    data: "taller_orden"
                },
                /*{
                    data: "servicios_orden.nombre"
                },
                {
                    data: "servicios_orden.costo"
                },*/
                {
                    data: "total",
                    render: $.fn.dataTable.render.number('', ',', 2, 'CLP ')
                },
                {
                    data: "Acciones"  /* No está dentro del JSON pero debe definirse para trabajar de la mano con la columna donde agrega botones de EDITAR y ELIMINAR */
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

    /*Agrego en CustomOrderTable para generar eventos con hipervinculos que están dentro*/
    /*$(document).ready(function () {
        $('div #pages table#ordersTable').on('click', 'a.only-to-id-url', function () {
            console.log("Voy a la orden: " + $(this).attr('href').slice(1).substring($(this).attr('href').slice(1).lastIndexOf('/') + 1))
        })
    });*/
}

// Función de filtrado personalizado que buscará datos en la columna 5 entre dos valores
const filtrarFechas = () => {

    $.fn.dataTable.ext.search.push(
        function (settings, data, datosIndex) {

            //Sólo filtro la tabla de órdenes
            if (settings.nTable == document.getElementById('ordersTable')) {

                let min = minDate.val();
                let max = maxDate.val();
                //let date = new Date(data[5]); //Filtrando por fecha_creacion
                let date = new Date(data[6]); //Filtrando por fecha_inicio

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

    /*$('div #pages').on('click', 'button#borrarFiltro', function () {
        console.log("Entré al botón")
        $('#min').val("");
        $('#max').val("");
    });*/

    $('[data-toggle="tooltip"]').tooltip({ animation: true });
    /*$('[data-toggle="popover"]').on("click",function(e){
        e.preventDefault();
    });
    $('[data-toggle="popover"]').popover();*/
    //$('[data-toggle="popover"]').popover('show')

});