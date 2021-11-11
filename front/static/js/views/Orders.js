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
let getTaller = ``;
let getTipoOrden = ``;
let getAreaActivo = ``;
let getPatenteActivo = ``;

let totalOrdenes = [];
//let table;

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Ordenes");
    }

    async getHtml() {

        let ordersHTML = ``;

        let optionsOrdersHTML = `<h1></h1>
        <div class="control-group order-identity border-transparent-1px">
            <h1>Órdenes</h1>
        </div>
        <div id="optionsOrdersHTML">
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
            url: 'http://192.168.1.114:8080/static/js/data/orders.JSON',
            dataType: 'json',
            success: function (data, status, jqXHR) {

                console.log("Entré al AJAX")
                customOrdersTable(); /* Aqui renderizo con DataTable */
                console.log(jqXHR)
                let fillOrders = ''
                let classTr = ""
                let stringContainer = ""
                let formatGetCategoriasOrdenNombre = ``;
                let formatGetCategoriasOrdenCosto = ``;
                let getCategoriasOrden = [];
                let getEstadosOrden = [];

                for (const orden of data) {

                    totalOrdenes.push(orden);

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
                    let fechaUltimoEstado = "1900-01-01T00:00"; /** Comparador para obtener la fecha del último estado */
                    
                    getEstadosOrden.forEach(elem => {

                        if (new Date(elem["fechaAsignado"]) > new Date(fechaUltimoEstado)) {

                            const estado = getEstados.find((estado) => estado.idEstado == elem["estadoIdEstado"]);
                            if (estado) {
                                getEstado = estado.nombre;
                            }

                            fechaUltimoEstado = elem["fechaAsignado"];
                        }

                        switch (elem["estadoIdEstado"]) {
                            case 1:
                                classTr = "warning"
                                stringContainer = 'Se requiere completar datos'
                                break;
                            case 10:
                                classTr = "muted"
                                stringContainer = 'La órden de mantenimiento no fue ejecutada'
                                break;
                            case 3:
                                classTr = "error"
                                stringContainer = 'La orden no ha sigo planificada'
                                break;
                            case 6:
                                classTr = "error"
                                stringContainer = 'El servicio en taller excede el tiempo planificado'
                                break;
                            case 2:
                                classTr = ""
                                stringContainer = 'El próximo paso es la realización del servicio en Taller'
                                break;
                            case 4:
                                classTr = ""
                                stringContainer = 'La órden fue planificada con retraso'
                                break;
                            case 5:
                                classTr = "info"
                                stringContainer = 'Se están realizando los servicios de mantenimiento'
                                break;
                            case 8:
                                classTr = "success"
                                stringContainer = 'La orden ha sido completada'
                                break;
                            case 9:
                                classTr = "success"
                                stringContainer = 'La orden ha sido completada con retraso'
                                break;
                            default:
                                classTr = ""
                                stringContainer = ''
                                console.log('Estado de la orden desconocido');
                        }

                    })

                    getCategoriasOrden = listAllElement(orden.ordenCategorias);
                    let getCategoriasOrdenNombre = [];
                    let getCategoriasOrdenCosto = [];
                    let costoOrden = 0;
                    let totalOrden = ``;
                    getCategoriasOrden.forEach(elem => {
                        getCategoriasOrdenNombre.push(`<div class="alert alert-info no-margin new-padding-top-bottom"><strong>${elem["nombre"]}</strong></div>`)
                        if (elem["costo"] != "") {
                            costoOrden = (parseFloat(elem["costo"]) + parseFloat(costoOrden)).toFixed(2);
                            getCategoriasOrdenCosto.push(`<div class="alert new-alert-use no-margin new-padding-top-bottom">CLP <strong>${(parseFloat(elem["costo"]) + 0.00).toFixed(2).toString().replace(".", ",")}</strong></div>`)
                        }

                    })
                    if(isNaN(costoOrden)){
                        totalOrden = "";
                    } else {
                        totalOrden = "$ " + costoOrden.toString().replace(".", ",");
                    }

                    if (getCategoriasOrdenNombre.length) {
                        formatGetCategoriasOrdenNombre = getCategoriasOrdenNombre.join('');
                        formatGetCategoriasOrdenCosto = getCategoriasOrdenCosto.join('');
                    } else {
                        formatGetCategoriasOrdenNombre = ``;
                        formatGetCategoriasOrdenCosto = ``;
                    }

                    fillOrders += `
                        <tr class=${classTr}>
                            <td>${orden.idOrden}</td>
                            <td>${getPatenteActivo}</td> <!--Recordar modificar para traer desde idVehiculo -->
                            <td>${getTipoOrden}</td>
                            <td>${getEstado} <a data-toggle="tooltip" title="${stringContainer}"><i class="fa fa-info-circle" aria-hidden="true"></i></a></td>
                            <td>${getAreaActivo}</td>
                            <td>${orden.fechaCreacion.slice(0,10)}</td>
                            <td>${orden.fechaInicial.slice(0,10)}</td>
                            <td>${getTaller}</td>
                            <!--<td>${formatGetCategoriasOrdenNombre}</td>-->
                            <!--<td>${formatGetCategoriasOrdenCosto}</td>-->
                            <td>${totalOrden}</td>
                            <td class="align-center">
                                <a id="editOrder_${orden.idOrden}" class="btn only-to-id-url" href="/ordenes/${orden.idOrden}"><i class="icon-pencil"></i></a>
                                <a id="deleteOrder_${orden.idOrden}" class="btn" disabled><i class="icon-trash"></i></a>
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
            // Especifico las columnas a continuación para poder utilizar en render el filtrarFechas()
            // Si no lo hiciera no sería necesario agregar "columns"
            "columns": [
                {
                    data: 'idOrden'
                },
                {
                    data: 'getPatenteActivo'
                },
                {
                    data: "getTipoOrden"
                },
                {
                    data: "getEstado"
                },
                {
                    data: "getAreaActivo"
                },
                {
                    data: "fechaCreacion"
                },
                {
                    data: "fechaInicial",
                    render: filtrarFechas() //Ejecutar la función de filtrado de fechas
                },
                {
                    data: "getTaller"
                },
                /*{
                    data: "ordenCategorias.nombre"
                },
                {
                    data: "ordenCategorias.costo"
                },*/
                {
                    data: "total"
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

}

// Función de filtrado personalizado que buscará datos en la columna 5 entre dos valores
const filtrarFechas = () => {

    $.fn.dataTable.ext.search.push(
        function (settings, data, datosIndex) {

            //Sólo filtro la tabla de órdenes
            if (settings.nTable == document.getElementById('ordersTable')) {

                let min = minDate.val();
                let max = maxDate.val();
                //let date = new Date(data[5]); //Filtrando por fechaCreacion
                let date = new Date(data[6]); //Filtrando por fechaInicial

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