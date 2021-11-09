import AbstractView from "./AbstractView.js";
import {
    getTiposMantenimientos, getEstados, getAreas, getTiposActivos,
    getActivos, getTalleres, getCategorias, olderDate,
    getVehiculos,
    loadSelectContent,
    loadSelectContentAndSelected,
    listSelect,
    listAllElement,
    currentDate
} from "./Options.js"

let getTipoMantenimiento = ``;
let getPatenteActivo = ``;
let getKmGpsActivo = ``;
let getHorometroActivo = ``;
let getUsoActivo = ``;
let getEstado = ``;
let getDocumentoCompletado = ``;
let getArea = ``;
let getTipoActivo = ``;
let getTaller = ``;
let getRutaAdjuntoCompletado = ``;
let getFechaRutaAdjuntoCompletado = ``;
let getFechaCreacion = ``;
let getFrecuenciaPeriodo = ``;
let getCategoriasOrden = [];
let getEstadosOrden = [];
let identificadorGlobal = '';

//Variable para validar que al menos se tenga una categoría seleccionada
let banderaSeleccionCategoria = false;

//Variable para validar que se tenga el adjunto para crear el JSON si estado
// es completado o compleatado con retraso
let banderaFaltaAdjunto = false;

//VARIABLE PARA JSON
let ordenJSON = {
    "idOrden": 0,
    "fechaCreacion": "",
    "fechaInicial": "",
    "fechaFinal": "",
    "tipoOrdenIdTipoOrden": null,
    "activoIdActivo": null,
    "tallerServicioIdTallerServicio": null,
    "observaciones": "",
    "rutaAdjuntoCompletado": "",
    "fechaRutaCompletado": "",
    "ordenEstados": [],
    "ordenCategorias": [],
    "title": "",
    "start": "",
    "end": "",
    "allDay": false
};

//Variable para asignar el identificador
let idUrl = 0;

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.postId = params.id;
        this.setTitle(`Orden ${this.postId}`);
    }

    async getHtml() {

        let identificador = this.postId;
        let orderHTML = ``;
        identificadorGlobal = this.postId; // lo utilizo fuera de la clase
        idUrl = parseInt(identificador);


        $.ajax({
            type: 'GET',
            url: 'http://192.168.1.114:8080/static/js/data/orders.JSON',
            dataType: 'json',
            success: function (data, status, jqXHR) {

                console.log(jqXHR)
                let fillOrder = ''
                //let uso = ''
                let radioSeleccionadoPeriodo = ''
                let radioSeleccionadoRango = ''
                let requeridoPorRango = ''
                let requeridoPorPeriodo = ''
                let requeridoAdjuntoCompletado = ''
                let tiempoTaller = '';
                let ocultoPeriodo = "hidden border-transparent-1px"
                let ocultoRango = "hidden border-transparent-1px"
                let ocultoAdjuntoCompletado = "hidden controls new-div-file-upload";
                let classFocusState = "";
                let guardarDeshabilitado = "";
                let estadoDeshabilitado = "";
                let formatGetEstadosOrdenItem = ``;
                let fechaDeshabilitado = "";
                let minFechaInicio = "";
                //let getEstadosOrden = [];
                radioSeleccionadoRango = "checked"
                requeridoPorRango = "required"
                ocultoRango = "border-transparent-1px"
                ocultoPeriodo = "hidden border-transparent-1px"

                const order = data.find((order) => order.idOrden == identificador)

                if (order) {

                    getCategoriasOrden = [];
                    getCategoriasOrden = listAllElement(order.ordenCategorias)
                    console.log("Lista Objetos de Categorías de la Orden: " + getCategoriasOrden)
                    let costoOrden = 0;
                    let totalOrden = ``;
                    getCategoriasOrden.forEach(elem => {
                        if (elem["costo"] != "") {
                            costoOrden = (parseFloat(elem["costo"]) + parseFloat(costoOrden)).toFixed(2);
                        }

                    })
                    if(isNaN(costoOrden)){
                        totalOrden = "";
                    } else {
                        totalOrden = "$ " + costoOrden.toString().replace(".", ",");
                    }

                    const tipoMantenimiento = getTiposMantenimientos.find((tipoOrden) => tipoOrden.idTipoOrden == order.tipoOrdenIdTipoOrden);
                    if (tipoMantenimiento) {
                        getTipoMantenimiento = tipoMantenimiento.nombre;
                        //getTipoMantenimiento = order.tipo_orden;
                    }

                    const activo = getActivos.find((activo) => activo.idActivo == order.activoIdActivo);
                    if (activo) {

                        const vehiculo = getVehiculos.find((vehiculo) => vehiculo.idVehiculo == activo.vehiculoIdVehiculo);
                        if (vehiculo) {
                            getPatenteActivo = vehiculo.ppuVehiculo;
                            getKmGpsActivo = parseFloat(vehiculo.kmGps).toFixed(2);
                            getHorometroActivo = parseFloat(vehiculo.horometro).toFixed(2);
                            //getUsoActivo = getKmGpsActivo.toString().concat(`<input class="btn" type="button" value="Km " disabled>`, getHorometroActivo.toString(), `<input class="btn" type="button" value=" Horas" disabled> `)

                        }

                        const area = getAreas.find((area) => area.idArea == activo.areaIdArea);
                        if (area) {
                            getArea = area.nombreArea;
                            //getArea = order.area_vehiculo;
                        }

                        const tipoActivo = getTiposActivos.find((tipoActivo) => tipoActivo.idTipoActivo == activo.tipoActivoIdTipoActivo);
                        if (tipoActivo) {
                            getTipoActivo = tipoActivo.nombre;
                            //getTipoActivo = order.tipo_activo;
                        }

                    }

                    const taller = getTalleres.find((taller) => taller.idTallerServicio == order.tallerServicioIdTallerServicio);
                    if (taller) {
                        getTaller = taller.nombre;
                        //getTaller = order.taller_orden;
                    }

                    getRutaAdjuntoCompletado = order.rutaAdjuntoCompletado;
                    getFechaRutaAdjuntoCompletado = order.fechaRutaCompletado;
                    getFechaCreacion = order.fechaCreacion;

                    if (order.fechaInicial == "") {
                        minFechaInicio = `${currentDate().slice(0, 16)}`;
                        fechaDeshabilitado = "disabled";
                    } else {
                        minFechaInicio = order.fechaInicial
                        fechaDeshabilitado = "";
                    }

                    //getFrecuenciaPeriodo = order.periodo_frecuencia_cada;
                    console.log("Verificando postId: " + identificador)
                    console.log("Vericando id de order: " + order.idOrden)

                    /*if (order.km_recorridos == null) {
                        uso = order.horas_uso // Temporal - Esto debe obtenerse mediante activo y su idVehiculo
                    } else {
                        uso = order.km_recorridos // Temporal - Esto debe obtenerse mediante activo y su idVehiculo
                    }*/

                    // OJO: Validar posteriormente obteniendo de la base de datos el tiempo en la geocerca del taller
                    if (getEstado == "En taller") {
                        tiempoTaller = Math.abs(new Date(order.fechaFinal) - new Date(order.fechaInicial)) / (1000 * 3600 * 24)
                    }

                    /*radioSeleccionadoRango = "checked"
                    requeridoPorRango = "required"
                    ocultoRango = "border-transparent-1px"
                    ocultoPeriodo = "hidden border-transparent-1px"*/

                    getEstadosOrden = listAllElement(order.ordenEstados);
                    let getEstadosOrdenItem = [];

                    //Comparador para obtener la fecha máxima de un estado
                    //y poder asignarlo como el actual
                    let fechaUltimoEstado = "1900-01-01T00:00";

                    getEstadosOrden.forEach(elem => {

                        if (new Date(elem["fechaAsignado"]) > new Date(fechaUltimoEstado)) {

                            const estado = getEstados.find((estado) => estado.idEstado == elem["estadoIdEstado"]);
                            if (estado) {
                                getEstado = estado.nombre;
                                //getEstado = order.estado_orden;
                            }

                            //getEstado = elem["nombre_estado"];
                            fechaUltimoEstado = elem["fechaAsignado"];

                            if (getEstado == "Completado"
                                || getEstado == "Completado con retraso"
                                || getEstado == "No realizado") {
                                guardarDeshabilitado = "disabled";
                                estadoDeshabilitado = "disabled"
                            } else {
                                //Para poder guardar hay que pasar de Por planificar
                                if (getEstado == "Por planificar" || getEstado == "Retrasado") {
                                    guardarDeshabilitado = "disabled";
                                    //estadoDeshabilitado = "";
                                } else {
                                    guardarDeshabilitado = "";
                                }
                            }


                        }

                        if (getEstado == "Completado" || getEstado == "Completado con retraso") {
                            //getDocumentoCompletado = elem["documento_completado"];
                            ocultoAdjuntoCompletado = "controls new-div-file-upload";
                            requeridoAdjuntoCompletado = "required";
                            classFocusState = "text-success";
                        } else {
                            //getDocumentoCompletado = "";
                            ocultoAdjuntoCompletado = "hidden controls new-div-file-upload";
                            requeridoAdjuntoCompletado = "";
                        }

                        getEstadosOrdenItem.push(`<li><strong class="${classFocusState}">${getEstado}</strong>
                                                    <ul>
                                                        <li>${elem["fechaAsignado"]}</li>
                                                        <li><u>Por</u>: ${elem["idUsuario"]}</li>
                                                    </ul>
                                                </li>`)
                    });

                    if (getEstadosOrdenItem.length) {
                        formatGetEstadosOrdenItem = getEstadosOrdenItem.join('');
                    } else {
                        formatGetEstadosOrdenItem = ``;
                    }


                    fillOrder = `<h1></h1>
                    <form id="orderFormQuery_${order.idOrden}" action="/ordenes">

                        <!--IDENTIFICADOR DE LA ORDEN-->
                        <div id="orderId_${order.idOrden}" class="control-group order-identity border-transparent-1px">
                            <h1>Orden ${order.idOrden}</h1>
                            <!--<h3>Patente: ${getPatenteActivo}</h3>-->
                            <h3 style="display:inline;">Patente: </h3>
                            <h3 id="valorPatente" style="display:inline;">${getPatenteActivo}</h3>
                            <!--<h3>${getUsoActivo}</h3>-->
                            <h5>Km: ${getKmGpsActivo.toString().replace(".", ",")}</h5>
                            <h5>Horas: ${getHorometroActivo.toString().replace(".", ",")}</h5>
                            <a id="downloadOrder_${order.idOrden}" class="btn btn-success" href=""> Orden ${order.idOrden}  <i class="fa fa-cloud-download" ></i></a>
                        </div>

                        <!--PRIMEROS DATOS DEL ACTIVO-->
                        <div id="orderData_${order.idOrden}" class="row-fluid control-group border-transparent-1px">

                            <div class="span6">
                        
                                <!--TIPO DE MANTENIMIENTO DE LA ORDEN-->
                                <div class="control-group">
                                    <label class="span4" for="orderType">
                                        <h5>Mantenimiento</h5>
                                    </label>
                                    <div class="controls">
                                        <select id="orderType" required>
                                        </select>
                                    </div>
                                </div>

                                <!--ESTADO DE LA ORDEN-->
                                <div class="control-group">
                                    <label class="span4" for="orderStatus">
                                        <h5>Estado</h5>
                                    </label>
                                    <div class="controls">
                                        <select id="orderStatus" required ${estadoDeshabilitado}>
                                        </select>
                                    </div>

                                    <!--SE HABILITA CON ESTADOS COMPLETADO Ó COMPLETADO CON RETRASO-->
                                    <div id="divSelectedFile" class="${ocultoAdjuntoCompletado}">
		                                <label id="clickFileCompletado" class='btn btn-primary' href='javascript:;' for="fileCompletado">
                                            <i class="fa fa-cloud-upload" aria-hidden="true"></i>
                                            <input id="fileCompletado" type="file" class="new-input-file"
                                                name="fileCompletado" size="40" 
                                                ${requeridoAdjuntoCompletado} ${guardarDeshabilitado}>
		                                </label>
                                        <a href="/static/img/Prueba.pdf" download>
                                            <p class='label label-info' id="fileInfoCompletado" style="margin-bottom: 5px;">${getRutaAdjuntoCompletado}</p>
                                        </a>
                                    </div>
                                </div>

                                <!--PROVEEDOR DE SERVICIO - TALLER-->
                                <div id="serviceProvider" class="control-group">
                                    <label class="span4" for="orderProvider">
                                        <h5>Taller de servicio</h5>
                                    </label>
                                    <div class="controls">
                                        <select id="orderProvider" required>
                                        </select>
                                    </div>
                                </div>

                                <!--TIEMPO EN TALLER-->
                                <div class="control-group">
                                    <label class="span4" for="timeProvider">
                                        <h5>Días en taller</h5>
                                    </label>
                                    <div class="controls">
                                        <input id="timeProvider" type="text" min="3" maxlength="15" 
                                            value="${tiempoTaller}" disabled required>
                                    </div>
                                </div>

                                <!--ÁREA DEL ACTIVO-->
                                <div class="control-group">
                                    <label class="span4" for="orderAreasOptions">
                                        <h5>Área</h5>
                                    </label>
                                    <div class="controls">
                                        <select id="orderAreasOptions" required disabled>
                                        </select>
                                    </div>
                                </div>

                                <!--TIPO DE ACTIVO-->
                                <div class="control-group">
                                    <label class="span4" for="orderAssetType">
                                        <h5>Tipo de activo</h5>
                                    </label>
                                    <div class="controls">
                                        <select id="orderAssetType" required disabled>
                                        </select>
                                    </div>
                                </div>

                                <!--RANGO DE FECHAS-->
                                <div id="datesRange" class="control-group">
                                    <div class="row-fluid">
                                        <label class="span4" for="orderProvider">
                                            <h5>Rango de fechas</h5>
                                        </label>
                                    </div>
                                    <div id="range">
                                        <div class="control-group">
                                            <div class="row-fluid">
                                                <label class="span4">
                                                    Fecha inicial
                                                </label>
                                            </div>
                                            <div class="row-fluid">
                                                <input class="span4" id="rangeStartDate" type="datetime-local" value="${order.fechaInicial}" ${requeridoPorRango}
                                                    min="${minFechaInicio}" ${fechaDeshabilitado}>
                                                    <!--min="${currentDate().slice(0, 16)}">-->
                                            </div>
                                        </div>
                                        <div class="control-group">
                                            <div class="row-fluid">
                                                <label class="span4">
                                                    Fecha límite
                                                </label>
                                            </div>
                                            <div class="row-fluid">
                                                <input class="span4" id="rangeEndDate" type="datetime-local" value="${order.fechaFinal}" ${requeridoPorRango}
                                                    min="${order.fechaInicial}" ${fechaDeshabilitado}>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <!--HISTORIAL DE ESTADOS-->
                            <div id="orderStatusHistory_${order.idOrden}" class="span3 control-group contenedor-arbol border-table-status-order-transparent-1px">
                                <table class="table table-bordered table-striped">
                                    <tr>
                                        <th>Historial de Estados</th>
                                    </tr>
                                    <tr>
                                        <td>
                                            <ul>${formatGetEstadosOrdenItem}</ul>
                                        </td>
                                    </tr>
                                </table>
                            </div>

                        </div>

                        <!--CATEGORÍA DE SERVICIO-->
                        <div id="orderServiceCategories_${identificadorGlobal}" class="control-group border-transparent-1px"></div>

                        <div id="updateTotal" class="control-group border-transparent-1px">
                            <div class="control-group">
                                <div class="row-fluid">
                                    <a id="botonActualizarTotal" class="btn btn-success" href=""> Calcular total  <i class="fa fa-calculator" ></i></a>
                                </div>
                            </div>
                        </div>

                        <!--Observaciones-->
                        <div id="notes" class="control-group border-transparent-1px">
                            <label class="span2" for="orderNotes">
                                <h5>Observaciones</h5>
                            </label>
                            <div class="controls">
                                <textarea class="span12" cols="10" id="orderNotes" maxlength="1000">${order.observaciones}</textarea>
                            </div>
                        </div>

                        <!--TOTAL EN COSTOS DE LA ORDEN-->
                        <div id="totalCost" class="control-group">
                            <label class="span12 text-right order-identity border-transparent-1px">
                                <!--<h3>Total: ${totalOrden}</h3>-->
                                <h3 style="display:inline;">Total: </h3>
                                <h3 id="valorTotalOrden" style="display:inline;">${totalOrden}</h3>
                            </label>
                        </div>

                        <!--GUARDAR / CANCELAR-->
                        <div id="orderActionButtons_${order.idOrden}" class="control-group">
                            <div class="span12 text-right border-transparent-1px">
                                <!--<a id="saveOrder_${order.idOrden}" class="btn btn-primary" href="/ordenes">Guardar</a>
                                <a id="dontSaveOrder_${order.idOrden}" class="btn btn-primary" href="/ordenes">Cancelar</a>-->
                                <button id="saveOrder_${order.idOrden}" ${guardarDeshabilitado} class="btn btn-primary" type="submit">Guardar</button>
                                <button id="dontSaveOrder_${order.idOrden}" class="btn btn-primary" type="button" onclick="window.history.back();">Cancelar</button>
                            </div>
                        </div>
                    </form>`;
                } else {
                    fillOrder = `<h1>=(</h1>
                    <p>-- No se logró obtener la Orden ${identificador}</p>`
                }

                orderHTML = orderHTML.concat(fillOrder)

                $('#pages').html(orderHTML)
                console.log(`AJAX orderFormQuery -> Status: ${status}`)

                order ? fillOrderOptions() : {};
                order ? fillOrderCategories() : {};

            },
            error: function (jqXHR) {
                console.log(jqXHR)
            }
        })

        return orderHTML;
    }

}

const fillOrderOptions = () => {

    console.log("Entré al fillOptions en OrderView")

    //$(window).on("load", function () {

    $(document).ready(function () {

        // Select tipo de mantenimiento
        const selectTipoMantenimiento = document.getElementById('orderType');
        //const optionTipoMantenimiento = listSelect(tiposMantenimiento, "nombre"); // Paso la clave "nombre"
        const optionTipoMantenimiento = listSelect(getTiposMantenimientos, "nombre"); // Paso la clave "nombre"
        loadSelectContentAndSelected(optionTipoMantenimiento, selectTipoMantenimiento, getTipoMantenimiento);
        console.log("Tipo mantenimiento seleccionado: " + getTipoMantenimiento);

        // Select estado
        const selectEstado = document.getElementById('orderStatus');
        //const optionEstado = listSelect(estados, "nombre"); // Paso la clave "nombre"
        const optionEstado = listSelect(getEstados, "nombre"); // Paso la clave "nombre"
        loadSelectContentAndSelected(optionEstado, selectEstado, getEstado);
        console.log("Estado seleccionado: " + getEstado);

        // Select area
        const selectArea = document.getElementById('orderAreasOptions');
        //const optionArea = listSelect(areas, "nombre"); // Paso la clave "nombre"
        const optionArea = listSelect(getAreas, "nombreArea"); // Paso la clave "nombreArea"
        loadSelectContentAndSelected(optionArea, selectArea, getArea);
        console.log("Área seleccionada: " + getArea);

        // Select tipo de activo
        const selectTipoActivo = document.getElementById('orderAssetType');
        //const optionTipoActivo = listSelect(tiposActivos, "nombre"); // Paso la clave "nombre"
        const optionTipoActivo = listSelect(getTiposActivos, "nombre"); // Paso la clave "nombre"
        loadSelectContentAndSelected(optionTipoActivo, selectTipoActivo, getTipoActivo);
        console.log("Tipo de activo seleccionado: " + getTipoActivo);

        // Select taller
        const selectTaller = document.getElementById('orderProvider');
        //const optionTaller = listSelect(talleres, "nombre"); // Paso la clave "nombre"
        const optionTaller = listSelect(getTalleres, "nombre"); // Paso la clave "nombre"
        loadSelectContentAndSelected(optionTaller, selectTaller, getTaller);
        console.log("Taller seleccionado: " + getTaller);

        // Select Frecuencia del Período
        // Ya no se utilizará en esta instancia
        /*
        const selectFrecuenciaPeriodo = document.getElementById('frequencyType');
        const optionFrecuenciaPeriodo = listSelect(frecuenciaPeriodo, "nombre"); // Paso la clave "nombre"
        loadSelectContentAndSelected(optionFrecuenciaPeriodo, selectFrecuenciaPeriodo, getFrecuenciaPeriodo);
        console.log("Frecuencia Periodo seleccionada: " + getFrecuenciaPeriodo);
        */

    });
    //});

}

const fillOrderCategories = () => {
    console.log("Entré al fillOrderServiceCategories en OrderView")

    let orderCategoriesHTML = ``;

    let orderCategoriesContainerA = `
    <div class="row-fluid">
        <label class="span4" for="categoriesContainer">
            <h5>Categorías de servicio</h5>
        </label>
    </div>

    <div class="control-group">
        <div class="row-fluid">
            <div class="search span5">
                <input type="text" id="busquedaCategoriasOrden" placeholder="Buscar ...">
                <i id="iconBusquedaCategoriasOrden" class="fa fa-search"></i>
            </div>
            <div class="controls span5">
                <button id="seleccionadosCategoriasOrden" class="btn">Seleccionados</button>
                <button id="todasCategoriasOrden" class="btn">Todos</button>
            </div>
        </div>
    </div>

    <div id="categoriesContainer" class="categories-container-scroll">`;

    let orderCategoriesContainerB = `</div>`;

    $.ajax({
        type: 'GET',
        url: 'http://192.168.1.114:8080/static/js/data/serviceCategories.JSON',
        dataType: 'json',
        success: function (data, status, jqXHR) {

            console.log("Entré al AJAX de Categorías de la Orden")
            console.log(jqXHR)
            let fillOrderCategories = ''
            //let currentLabel = ''
            //let currentInput = ''
            let cont = 0;

            for (const category of data) {

                cont++;
                let checkboxSeleccionado = ''
                let requerido = '';
                let deshabilitado = 'disabled';
                //let costo = '';
                let costo = 0;
                //costoTotal += costo; 

                getCategoriasOrden.forEach(element => {

                    if (category.idCategoriaServicio == element.categoriaServicioIdCategoriaServicio) {
                        console.log(`idCategoría: ${element.categoriaServicioIdCategoriaServicio} - Categoría: ${category.nombre} - Costo: ${element.costo} - Orden: ${identificadorGlobal}`)
                        checkboxSeleccionado = 'checked';
                        requerido = 'required';
                        deshabilitado = '';
                        costo = element.costo;
                    }

                    /*if (category.nombre == element.nombre) {
                        console.log(`idCategoría: ${element.categoriaServicioIdCategoriaServicio} - Categoría: ${element.nombre} - Costo: ${element.costo} - Orden: ${identificadorGlobal}`)
                        checkboxSeleccionado = 'checked';
                        requerido = 'required';
                        deshabilitado = '';
                        costo = element.costo;
                    }*/
                })

                fillOrderCategories += `
                <div class="control-group">
                    <div id="labelTextAndLabelCost_${cont}" name="textAndCost" class="row-fluid">
                        <div id="labelText_${cont}" class="span5">
                            <label id="labelCategoryCheckbox_${cont}" class="checkbox" name="${category.nombre}">
                                <!--<b>${category.idCategoriaServicio}</b> - --><b>${category.codigo}</b> - ${category.nombre}
                                <input type="checkbox" id="categoryCheckbox_${cont}" value="option_${cont}"
                                ${checkboxSeleccionado} for="categoryCost_${cont}">
                            </label>
                        </div>
                        <div id="labelCost_${cont}" class="controls">
                            <div class="input-prepend input-append">
                                <span class="add-on">$</span>
                                <input id="appendedPrependedInput_${cont}" type="number" step="0.01" min="0"
                                    maxlength="10" value="${costo}" placeholder="e.g. 1.78" 
                                    ${requerido} ${deshabilitado} name="categoryCost_${cont}">
                            </div>
                        </div>
                    </div>
                </div>`;
            }

            orderCategoriesHTML = orderCategoriesHTML.concat(orderCategoriesContainerA)
            orderCategoriesHTML = orderCategoriesHTML.concat(fillOrderCategories)
            orderCategoriesHTML = orderCategoriesHTML.concat(orderCategoriesContainerB)

            $(`#orderServiceCategories_${identificadorGlobal}`).html(orderCategoriesHTML)
            console.log(`AJAX orderServiceCategories -> Status: ${status}`)

        },
        error: function (jqXHR) {
            console.log("Error en ajax")
            console.log(jqXHR)
        }
    })
}


const guardarOrdenParaJSON = () => {

    banderaSeleccionCategoria = false; // Reinicio a false para verificar de nuevo la selección de categorías
    banderaFaltaAdjunto = false; // Reinicio

    console.log("Entré a la función")

    ordenJSON.ordenEstados = []; // reinicio el estado por cada activo
    ordenJSON.ordenCategorias = []; // reinicio las categorías por cada activo

    ordenJSON.idOrden = idUrl;
    //ordenJSON.fechaCreacion = currentDate();
    ordenJSON.fechaCreacion = getFechaCreacion;
    ordenJSON.fechaInicial = document.getElementById('rangeStartDate').value;
    ordenJSON.start = ordenJSON.fechaInicial;
    ordenJSON.fechaFinal = document.getElementById('rangeEndDate').value;
    ordenJSON.end = ordenJSON.fechaFinal;
    ordenJSON.observaciones = document.getElementById('orderNotes').value;
    //ordenJSON.title = 
    ordenJSON.allDay = false

    let valorPatente = document.getElementById('valorPatente');
    //Temporal - el valor de la patente debe obtenerse mediante idVehiculo
    const activo = getActivos.find((activo) => activo.activo == valorPatente.textContent.trim());
    if (activo) {
        ordenJSON.activoIdActivo = activo.idActivo;
    }

    const tipoOrden = getTiposMantenimientos.find((tipoOrden) => tipoOrden.nombre == document.getElementById('orderType').value);
    if (tipoOrden) {
        ordenJSON.tipoOrdenIdTipoOrden = tipoOrden.idTipoOrden;
    }

    const taller = getTalleres.find((taller) => taller.nombre == document.getElementById('orderProvider').value);
    if (taller) {
        ordenJSON.tallerServicioIdTallerServicio = taller.idTallerServicio;
    }

    const estado = document.getElementById('orderStatus');
    let fileInfoCompletado = document.getElementById('fileInfoCompletado');
    let fileCompletado = document.getElementById('fileCompletado');
    if (estado.options[estado.selectedIndex].text == "Completado"
        || estado.options[estado.selectedIndex].text == "Completado con retraso") {

        //fileInfoCompletado.required = true;
        fileCompletado.required = true

        if (fileInfoCompletado.textContent.trim() == "") {

            //fileInfoCompletado.required = true;
            //fileCompletado.required = true
            banderaFaltaAdjunto = true;

        } else {

            //fileCompletado.required = false
            ordenJSON.rutaAdjuntoCompletado = "/path/" + fileInfoCompletado.textContent.trim();
            ordenJSON.fechaRutaCompletado = currentDate();

            banderaFaltaAdjunto = false;

        }


    }

    //Recorrer getEstadosOrden, asignar cada elemento a estadoOrdenJSON y push a ordenEstados
    //Despues de eso Agregar el éstado actualmente seleccionado (Hacer las restricciones para
    // que no se seleccione cualquier estado)
    // Bloquear el cambio de estado y el botón GUARDAR si el estado actual al entrar es
    // completado o completado con retraso

    //Asignado el historial de estados de la orden a ordenJSON.ordenEstados
    for (const elem of getEstadosOrden) {
        /*let usuario = 0;
        if (elem["idUsuario"] == "Sistema") {
            usuario = 2;
        } else {
            if (elem["idUsuario"] == "Usuario") {
                usuario = 1;
            }
        }*/

        let estadoOrdenJSON = {
            "ordenIdOrden": idUrl,
            "estadoIdEstado": elem["estadoIdEstado"],
            //"idUsuario": usuario, //temporalmente hasta implementar sincronización con usuario conectado
            "idUsuario": elem["idUsuario"], //temporalmente hasta implementar sincronización con usuario conectado
            "fechaAsignado": elem["fechaAsignado"]
        }

        ordenJSON.ordenEstados.push(estadoOrdenJSON);
    }


    //Agregando el estado actual seleccionado a ordenJSON.ordenEstados
    const estadoSeleccionado = getEstados.find((e) => (e.nombre) == document.getElementById('orderStatus').value);
    if (estadoSeleccionado) {

        /*let usuarioActual = 0;
        if (e["asignado_por"] == "Sistema") {
            usuarioActual = 2;
        } else {
            if (e["asignado_por"] == "Usuario") {
                usuarioActual = 1;
            }
        }*/

        let estadoOrdenActualJSON = {
            "ordenIdOrden": idUrl,
            "estadoIdEstado": estadoSeleccionado.idEstado,
            //tomar en cuenta que según el estado puede ser el sistema quien haga el cambio
            //Entonces se tendría que hacer un IF para asignar el idUsuario correctamente
            "idUsuario": 1, //temporalmente hasta implementar sincronización con usuario conectado
            "fechaAsignado": currentDate()
        }
        ordenJSON.ordenEstados.push(estadoOrdenActualJSON);

    }


    let costoRequerido = false;
    const categoriasSeleccionadas = document.getElementById('categoriesContainer').getElementsByClassName('row-fluid');
    let contCategory = 0;
    for (const cat of categoriasSeleccionadas) {
        contCategory++;
        //Label de categoría
        let labelCategoryCheckbox = document.getElementById(`labelCategoryCheckbox_${contCategory}`);
        //Input type checkbox de categoría
        let categoryCheckbox = document.getElementById(`categoryCheckbox_${contCategory}`);
        //Input type number del costo de la categoría
        let appendedPrependedInput = document.getElementById(`appendedPrependedInput_${contCategory}`);

        if (categoryCheckbox.checked) {

            console.log("Entré al checked")

            banderaSeleccionCategoria = true;

            //Si está requerido el costo es porque su input checkbox está checked
            if (appendedPrependedInput.required
                && appendedPrependedInput.value <= 0) {

                costoRequerido = true;
            }

            if (appendedPrependedInput.value > 0) {

                const category = getCategorias.find((c) => (c.codigo + ' - ' + c.nombre) == labelCategoryCheckbox.textContent.trim());
                if (category) {

                    let categoriasordenJSON = {
                        "ordenIdOrden": idUrl,
                        "categoriaServicioIdCategoriaServicio": category.idCategoriaServicio,
                        "costo": parseFloat(appendedPrependedInput.value),
                        "fechaCategoriaAsignada": ordenJSON.fechaCreacion,
                        "observacionCategoria": ""
                    }

                    ordenJSON.ordenCategorias.push(categoriasordenJSON);
                }
            }
        }

    }

    /*if (estado.options[estado.selectedIndex].text == "No realizado") {
        let contCategory = 0;
        for (const cat of categoriasSeleccionadas) {
            contCategory++;
            document.getElementById(`appendedPrependedInput_${contCategory}`).required = false;
        }
        banderaSeleccionCategoria = true;
        costoRequerido = false;
        banderaFaltaAdjunto = false;
    }*/

    //Creación del JSON
    if (banderaSeleccionCategoria == true
        && costoRequerido == false
        && banderaFaltaAdjunto == false) {
        //alert("cambió el valor de banderaSeleccionCategoria a TRUE y costoRequerido a FALSE")
        sessionStorage.setItem(`ActualizacionOrden_${idUrl}`, JSON.stringify(ordenJSON));
    }

}

const mostrarStorageJSON = () => {


    if (sessionStorage.getItem(`ActualizacionOrden_${idUrl}`)) {
        console.log(`\n\nActualizacionOrden_${idUrl}\n\n` + sessionStorage.getItem(`ActualizacionOrden_${idUrl}`));
        //sessionStorage.removeItem(`NuevaOrden_${contadorOrdenes}`);
    }

}

const removerVariablesStorageJSON = () => {


    if (sessionStorage.getItem(`ActualizacionOrden_${idUrl}`)) {
        sessionStorage.removeItem(`ActualizacionOrden_${idUrl}`);
    }


}

$(document).ready(function () {

    $('div #pages').on('click', `button#saveOrder_${idUrl}`, function (e) {

        guardarOrdenParaJSON();

        if ($('#orderType').val().length != ''
            && $('#orderAreasOptions').val().length != ''
            && $('#orderProvider').val().length != ''
            && $('#orderAssetType').val().length != ''
            && $('#rangeStartDate').val().length != ''
            && $('#rangeEndDate').val().length != '') {

            if (banderaSeleccionCategoria == false) {

                alert('Debe completar los datos de "Categorías de servicio"');
                e.preventDefault();
                $('#categoriesContainer').css("background-color", 'beige')

            }


        }

        mostrarStorageJSON();

    });


    //ACTUALIZAR COSTO TOTAL DENTRO DE LA ÓRDEN
    $('div #pages').on('click', 'a#botonActualizarTotal', function (e) {

        const costosCategorias = document.getElementById('categoriesContainer').getElementsByClassName('input-prepend input-append');
        let contCostos = 0;
        let sumCostos = 0;
        let totalActualizado = "";
        for (const elem of costosCategorias) {
            contCostos++;
            //Label de categoría
            let appendedPrependedInput = document.getElementById(`appendedPrependedInput_${contCostos}`);
            if(!appendedPrependedInput.disabled){
                sumCostos = (parseFloat(appendedPrependedInput.value) + parseFloat(sumCostos)).toFixed(2);
            }
        }

        if(isNaN(sumCostos)){
            totalActualizado = "";
        } else {
            totalActualizado = "$ " + sumCostos.toString().replace(".", ",");
        }

        $('#valorTotalOrden').text(totalActualizado);
        e.preventDefault();
    });


    //FILTRO DE CATEGORÍAS CON SUS COSTOS
    $('div #pages').on('click', 'input[id=busquedaCategoriasOrden]', function () {
        let busqueda = $('input[id=busquedaCategoriasOrden]');
        let titulo = $('div[name*="textAndCost"]'); // Asi tomamos el label y su costo // Sólo label => 'label[class*="checkbox"]'
        //console.log("ID DE ELEMENTO BÚSQUEDA: " + busqueda.attr("id"));

        $(titulo).each(function () {
            let etiquetaConCosto = $(this);
            //console.log("ID DE DIV CON LABEL Y COSTO: " + etiquetaConCosto.attr("id"))
            $(busqueda).keyup(function () { //si presionamos la tecla
                this.value = this.value.toLowerCase(); //cambiamos a minusculas
                let clase = $('.search i');
                if ($(busqueda).val() != '') {
                    $(clase).attr('class', 'fa fa-times');
                } else {
                    $(clase).attr('class', 'fa fa-search');
                }
                if ($(clase).hasClass('fa fa-times')) {
                    $(clase).click(function () {
                        $(busqueda).val(''); //borramos el contenido del input
                        $(etiquetaConCosto).parent().show(); //mostramos todos los div de label y costo
                        $(clase).attr('class', 'fa fa-search'); //volvemos a añadir la clase para mostrar la lupa
                    });
                }

                $(etiquetaConCosto).parent().hide(); //ocultamos todos los div de label y costo
                let txt = $(this).val(); //valor del texto encontrado dentro del div con id="textAndCost"
                //Si hay coincidencias en la búsqueda cambiando a minusculas
                if ($(etiquetaConCosto).text().toLowerCase().indexOf(txt) > -1) {
                    $(etiquetaConCosto).parent().show(); //mostramos el div con su label y costo
                }
            });
        });

    });

    //SELECCIONADOS DE CATEGORÍAS
    //Prevenir la recarga de la página
    $('div #pages').on('click', 'button#seleccionadosCategoriasOrden', function (e) {
        e.preventDefault();
    });

    // Sólo los seleccionados de categorías
    $('div #pages').on('click', 'button#seleccionadosCategoriasOrden', function () {
        let busqueda = $('input[id=busquedaCategoriasOrden]');
        let clase = $('i[id=iconBusquedaCategoriasOrden]');
        let categoria = $('div[name*="textAndCost"]');
        $(categoria).each(function () {
            let cadaCategoria = $(this);
            $(cadaCategoria).parent().hide();
            let checked = $(this).find('input[type*="checkbox"]');
            $(checked).each(function () {
                if ($(checked).is(':checked')) {
                    //console.log("Opción de categoría seleccionada: " + $(this).val());
                    $(cadaCategoria).parent().show();
                }
            });
        });

        $(busqueda).val(''); //Asignamos vacío al buscador
        $(clase).attr('class', 'fa fa-search'); //Colocamos la lupa al buscador
    });


    //TODOS LAS CATEGORÍAS
    //Prevenir la recarga de la página
    $('div #pages').on('click', 'button#todasCategoriasOrden', function (e) {
        e.preventDefault();
    });

    // Todas las categorías
    $('div #pages').on('click', 'button#todasCategoriasOrden', function () {
        let busqueda = $('input[id=busquedaCategoriasOrden]');
        let clase = $('i[id=iconBusquedaCategoriasOrden]');
        let categoria = $('div[name*="textAndCost"]');
        $(categoria).each(function () {
            let cadaCategoria = $(this);
            $(cadaCategoria).parent().show();
        });

        $(busqueda).val(''); //Asignamos vacío al buscador
        $(clase).attr('class', 'fa fa-search'); //Colocamos la lupa al buscador

    });


    // Agregar o Quitar REQUIRED a INPUT NUMBER de CATEGORÍA en CHECKED
    $('div #pages').on('change', 'input[type="checkbox"]', function () {

        let propForInputLabel = $(this).attr('for');

        if ($(this).is(':checked')) {

            $(`input[name=${propForInputLabel}]`).attr("required", "required");

        } else {

            $(`input[name=${propForInputLabel}]`).removeAttr("required");
        }

    })

    //Habilitar Fecha Límite luego de Asignar Fecha Inicial
    //Asignar como mínimo de fecha límite, la fecha inicial
    $('div #pages').on('change', 'input#rangeStartDate', e => {

        if (e.target.value) {
            console.log("Fecha inicial: " + e.target.value)
            $("#rangeEndDate").removeAttr("disabled");
            $("#rangeEndDate").attr("min", e.target.value);
        } else {
            $("#rangeEndDate").attr("disabled", "true");
            $("#rangeEndDate").val("");
        }
    })
    $('div #pages').on('change', 'input#rangeEndDate', l => {
        if (l.target.value) {
            console.log("Fecha límite: " + l.target.value)
        }
    })


    //Agregar o quitar la opción de adjuntar archivo al colocar en estados COMPLETADO ó COMPLETADO CON RETRASO
    $('div #pages').on('change', 'select#orderStatus', e => {

        if (e.target.value == "Completado" || e.target.value == "Completado con retraso") {
            console.log("Este es mi e.target.value: " + e.target.value);

            $('#divSelectedFile').removeClass("hidden controls new-div-file-upload")
            $("#divSelectedFile").addClass("controls new-div-file-upload");

            $("#fileCompletado").attr("required", "required");
            $("#fileCompletado").removeAttr("disabled");

            /*if($('#fileInfoCompletado').val() !=''){
                $("#fileCompletado").attr("required", "required");
            } else {
                $("#fileCompletado").removeAttr("required");
            }*/

            //$("#fileCompletado").attr("required", "required");

            $("#fileCompletado").on('change', function () {
                var filename = $(this).val().replace(/C:\\fakepath\\/i, '')
                console.log("Mi filename: " + filename);
                $('#fileInfoCompletado').html(filename);

            });
        } else {
            console.log("Este es mi e.target.value: " + e.target.value);
            $("#divSelectedFile").removeClass("controls new-div-file-upload");
            $("#divSelectedFile").addClass("hidden controls new-div-file-upload");
            $("#fileCompletado").removeAttr("required");
            //$('#fileInfoCompletado').removeAttr("required");
            //$("div #pages").on('change', "input#fileCompletado", function () {
            $("#fileCompletado").on('change', function () {
                $('#fileInfoCompletado').html("");
            });
        }


        //En caso de que select de estado esté habilitado
        // y las fechas estén deshabilitadas
        // se habilita la colocación de fechas al seleccionar estado, asi como el botón de guardar
        if (e.target.value != getEstado && e.target.value != "No realizado") {

            $("#rangeStartDate").removeAttr("disabled");
            $(`#saveOrder_${idUrl}`).removeAttr("disabled");

        } else {

            if (e.target.value == "No realizado") {

                $("#orderNotes").attr("required", "required");
                $(`#saveOrder_${idUrl}`).removeAttr("disabled");

            }
        }


    });


    /*$("div #pages").on('change', "input#fileCompletado", function () {
        var filename = $(this).val().replace(/C:\\fakepath\\/i, '')
        console.log(filename);
        //$('#fileInfoSeguro').val(filename); //para input
        $('#fileInfoCompletado').html(filename); //para input
    });*/

    // Mostrando datos al seleccionar POR PERÍODO
    // Ya no será utilizado
    /*
    $('div #pages').on('click', 'input#datesRadios1', function () {

        $('#frequency').show(1000, function () {
            console.log('Mostrando datos por período');
            $("#frequency").removeClass("hidden");
            $('html, body').animate({
                scrollTop: $("#datesKindA").offset().top
            }, 1000)
        });
        
        $("#frequencyStartDate").attr("required", "required");
        $("#frequencyCount").attr("required", "required");
        $("#frequencyType").attr("required", "required");
        $("#rangeStartDate").removeAttr("required");
        $("#rangeEndDate").removeAttr("required");

        $('#range').hide();

    });
    */

    // Mostrando datos al seleccionar POR RANGO DE FECHAS
    // Ya no será utilizado
    /*
    $('div #pages').on('click', 'input#datesRadios2', function () {

        $('#range').show(1000, function () {
            console.log('Mostrando datos por rango de fecha');
            $("#range").removeClass("hidden");
            $('html, body').animate({
                scrollTop: $("#datesKindA").offset().top
            }, 1000)
        });
        
        $("#rangeStartDate").attr("required", "required");
        $("#rangeEndDate").attr("required", "required");
        $("#frequencyStartDate").removeAttr("required");
        $("#frequencyCount").removeAttr("required");
        $("#frequencyType").removeAttr("required");

        $('#frequency').hide();
    });
    */

});