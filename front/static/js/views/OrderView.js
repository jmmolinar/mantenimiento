import AbstractView from "./AbstractView.js";
import {
    tiposMantenimiento, estados, tiposActivos, areas, talleres,
    getTiposMantenimientos, getEstados, getAreas, getTiposActivos,
    getActivos, getTalleres, getCategorias, olderDate,
    frecuenciaPeriodo,
    loadSelectContent,
    loadSelectContentAndSelected,
    listSelect,
    listAllElement,
    currentDate
} from "./Options.js"

let getTipoMantenimiento = ``;
let getEstado = ``;
let getDocumentoCompletado = ``;
let getArea = ``;
let getTipoActivo = ``;
let getTaller = ``;
let getRutaAdjuntoCompletado = ``;
let getFechaRutaAdjuntoCompletado = ``;
let getFrecuenciaPeriodo = ``;
let getCategoriasOrden = [];
let identificadorGlobal = '';

//Variable para validar que al menos se tenga una categoría seleccionada
let banderaSeleccionCategoria = false;

//VARIABLE PARA JSON
let ordenJSON = {
    "idOrden": 0,
    "fechaCreacion": "",
    "fechaInicial": "",
    "fechaFinal": "",
    "tipoOrdenidTipoOrden": null,
    "activoIdActivo": null,
    "tallerServicioIdTallerServicio": null,
    "observaciones": "",
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
                let uso = ''
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

                let formatGetEstadosOrdenItem = ``;
                let getEstadosOrden = [];

                const order = data.find((order) => order.id_orden == identificador)

                if (order) {

                    getCategoriasOrden = listAllElement(order.servicios_orden)
                    console.log("Lista Objetos de Categorías de la Orden: " + getCategoriasOrden)
                    getTipoMantenimiento = order.tipo_orden;
                    //getEstado = order.estado_orden;
                    getArea = order.area_vehiculo;
                    getTipoActivo = order.tipo_activo;
                    getTaller = order.taller_orden;
                    getRutaAdjuntoCompletado = order.rutaAdjuntoCompletado;
                    getFechaRutaAdjuntoCompletado = order.fechaRutaCompletado;
                    //getFrecuenciaPeriodo = order.periodo_frecuencia_cada;
                    console.log("Verificando postId: " + identificador)
                    console.log("Vericando id de order: " + order.id_orden)

                    if (order.km_recorridos == null) {
                        uso = order.horas_uso
                    } else {
                        uso = order.km_recorridos
                    }

                    // OJO: Validar posteriormente obteniendo de la base de datos el tiempo en la geocerca del taller
                    if (getEstado == "En taller") {
                        tiempoTaller = Math.abs(new Date(order.fecha_limite) - new Date(order.fecha_inicio)) / (1000 * 3600 * 24)
                    }

                    /*if (order.periodo_orden == true) {
                        radioSeleccionadoPeriodo = "checked"
                        requeridoPorPeriodo = "required"
                        ocultoPeriodo = "border-transparent-1px"
                        ocultoRango = "hidden border-transparent-1px"
                    } else {
                        radioSeleccionadoRango = "checked"
                        requeridoPorRango = "required"
                        ocultoRango = "border-transparent-1px"
                        ocultoPeriodo = "hidden border-transparent-1px"
                    }*/

                    //if (order.rango_fecha_orden == true) {
                    radioSeleccionadoRango = "checked"
                    requeridoPorRango = "required"
                    ocultoRango = "border-transparent-1px"
                    ocultoPeriodo = "hidden border-transparent-1px"
                    //}

                    getEstadosOrden = listAllElement(order.historial_estados);
                    let getEstadosOrdenItem = [];

                    let fechaUltimoEstado = "1900-01-01T00:00";

                    getEstadosOrden.forEach(elem => {

                        if (new Date(elem["fecha_estado"]) > new Date(fechaUltimoEstado)) {
                            
                            //alert("Comparando fechas")
                            getEstado = elem["nombre_estado"];
                            fechaUltimoEstado = elem["fecha_estado"];
                        }

                        /*if (elem["estado_actual"] == true) {
                            getEstado = elem["nombre_estado"];
                            classFocusState = "text-success";
                        }*/

                        if (elem["nombre_estado"] == "Completado" || elem["nombre_estado"] == "Completado con retraso") {
                            getDocumentoCompletado = elem["documento_completado"];
                            ocultoAdjuntoCompletado = "controls new-div-file-upload";
                            requeridoAdjuntoCompletado = "required";
                            classFocusState = "text-success";
                        } else {
                            getDocumentoCompletado = "";
                            ocultoAdjuntoCompletado = "hidden controls new-div-file-upload";
                            requeridoAdjuntoCompletado = "";
                        }

                        getEstadosOrdenItem.push(`<li><strong class="${classFocusState}">${elem["nombre_estado"]}</strong>
                                                    <ul>
                                                        <li>${elem["fecha_estado"]}</li>
                                                        <li><u>Por</u>: ${elem["estado_asignado_por"]}</li>
                                                    </ul>
                                                </li>`)
                    });

                    if (getEstadosOrdenItem.length) {
                        formatGetEstadosOrdenItem = getEstadosOrdenItem.join('');
                    } else {
                        formatGetEstadosOrdenItem = ``;
                    }


                    fillOrder = `<h1></h1>
                    <form id="orderFormQuery_${order.id_orden}" action="/ordenes">

                        <!--IDENTIFICADOR DE LA ORDEN-->
                        <div id="orderId_${order.id_orden}" class="control-group order-identity border-transparent-1px">
                            <h1>Orden ${order.id_orden}</h1>
                            <!--<h3>Patente: ${order.patente_activo}</h3>-->
                            <h3 style="display:inline;">Patente: </h3>
                            <h3 id="valorPatente" style="display:inline;">${order.patente_activo}</h3>
                            <h3>${uso}</h3>
                            <a id="downloadOrder_${order.id_orden}" class="btn btn-success" href=""> Orden ${order.id_orden}  <i class="fa fa-cloud-download" ></i></a>
                        </div>

                        <!--PRIMEROS DATOS DEL ACTIVO-->
                        <div id="orderData_${order.id_orden}" class="row-fluid control-group border-transparent-1px">

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
                                        <select id="orderStatus" required>
                                        </select>
                                    </div>

                                    <!--SE HABILITA CON ESTADOS COMPLETADO Ó COMPLETADO CON RETRASO-->
                                    <div id="divSelectedFile" class="${ocultoAdjuntoCompletado}">
		                                <label id="clickFileCompletado" class='btn btn-primary' href='javascript:;' for="fileCompletado">
                                            <i class="fa fa-cloud-upload" aria-hidden="true"></i>
                                            <input id="fileCompletado" type="file" class="new-input-file"
                                                name="fileCompletado" size="40" ${requeridoAdjuntoCompletado}>
		                                </label>
                                        <a href="/static/img/Prueba.pdf" download>
                                            <p class='label label-info' id="fileInfoCompletado" required style="margin-bottom: 5px;">${getDocumentoCompletado}</p>
                                        </a>
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
                                                <input class="span4" id="rangeStartDate" type="datetime-local" value="${order.fecha_inicio}" ${requeridoPorRango}
                                                    min="${order.fecha_inicio}">
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
                                                <input class="span4" id="rangeEndDate" type="datetime-local" value="${order.fecha_limite}" ${requeridoPorRango}
                                                    min="${order.fecha_inicio}">
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <!--HISTORIAL DE ESTADOS-->
                            <div id="orderStatusHistory_${order.id_orden}" class="span3 control-group contenedor-arbol border-table-status-order-transparent-1px">
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
                        <div id="orderServiceCategories_${this.postId}" class="control-group border-transparent-1px"></div>

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
                                <!--<h3>Total: <span class="add-on">$ </span>${order.total == "" ? parseFloat(0).toFixed(2) : parseFloat(order.total).toFixed(2)}</h3>-->
                                <h3>Total: <span class="add-on">$ </span>${order.total == "" ? parseFloat(0).toFixed(2) : new Intl.NumberFormat("es-ES").format(order.total)}</h3>
                            </label>
                        </div>

                        <!--GUARDAR / CANCELAR-->
                        <div id="orderActionButtons_${order.id_orden}" class="control-group">
                            <div class="span12 text-right border-transparent-1px">
                                <!--<a id="saveOrder_${order.id_orden}" class="btn btn-primary" href="/ordenes">Guardar</a>
                                <a id="dontSaveOrder_${order.id_orden}" class="btn btn-primary" href="/ordenes">Cancelar</a>-->
                                <button id="saveOrder_${order.id_orden}" class="btn btn-primary" type="submit">Guardar</button>
                                <button id="dontSaveOrder_${order.id_orden}" class="btn btn-primary" type="button" onclick="window.history.back();">Cancelar</button>
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
        const optionArea = listSelect(getAreas, "nombre"); // Paso la clave "nombre"
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
                let costo = '';
                //costoTotal += costo; 

                getCategoriasOrden.forEach(element => {
                    if (category.nombre == element.nombre) {
                        console.log(`Categoría: ${element.nombre} - Costo: ${element.costo} - Orden: ${identificadorGlobal}`)
                        checkboxSeleccionado = 'checked';
                        requerido = 'required';
                        deshabilitado = '';
                        costo = element.costo;
                    }
                })

                fillOrderCategories += `
                <div class="control-group">
                    <div id="labelTextAndLabelCost_${cont}" name="textAndCost" class="row-fluid">
                        <div id="labelText_${cont}" class="span5">
                            <label id="labelCategoryCheckbox_${cont}" class="checkbox" name="${category.nombre}">
                                <!--<b>${category.id}</b> - --><b>${category.cod}</b> - ${category.nombre}
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

            $(`#orderServiceCategories_${this.postId}`).html(orderCategoriesHTML)
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

    console.log("Entré a la función")

    console.log("Entré al for de activosSeleccionados")

    ordenJSON.ordenEstados = []; // reinicio el estado por cada activo
    ordenJSON.ordenCategorias = []; // reinicio las categorías por cada activo

    ordenJSON.fechaCreacion = currentDate();
    ordenJSON.fechaInicial = document.getElementById('newRangeStartDate').value;
    ordenJSON.start = ordenJSON.fechaInicial;
    ordenJSON.fechaFinal = document.getElementById('newRangeEndDate').value;
    ordenJSON.end = ordenJSON.fechaFinal;
    ordenJSON.observaciones = document.getElementById('orderNotes').value;
    //ordenJSON.title = 
    ordenJSON.allDay = false

    let valorPatente = document.getElementById('valorPatente').value;
    const activo = getActivos.find((activo) => activo.activo == valorPatente.trim());
    if (activo) {
        ordenJSON.activoIdActivo = activo.id;
    }

    const tipoOrden = getTiposMantenimientos.find((tipoOrden) => tipoOrden.nombre == document.getElementById('orderType').value);
    if (tipoOrden) {
        ordenJSON.tipoOrdenidTipoOrden = tipoOrden.id_tipo_mantenimiento;
    }

    const taller = getTalleres.find((taller) => taller.nombre == document.getElementById('orderProvider').value);
    if (taller) {
        ordenJSON.tallerServicioIdTallerServicio = taller.id;
    }

    let estadoordenJSON = {
        //"ordenIdOrden: "
        "estadoIdEstado": 2,
        "idUsuario": 1, //1 temporalmente hasta implementar sincronización con usuario conectado
        "fechaAsignado": ordenJSON.fechaCreacion
    }
    ordenJSON.ordenEstados.push(estadoordenJSON);


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

                //alert(`Verifique el costo en: ${labelCategoryCheckbox.textContent.trim()}`);
                costoRequerido = true;
            }

            if (appendedPrependedInput.value > 0) {

                //alert("Texto: " + labelCategoryCheckbox.textContent.trim() + " - Costo: " + appendedPrependedInput.value)
                const category = getCategorias.find((c) => (c.cod + ' - ' + c.nombre) == labelCategoryCheckbox.textContent.trim());
                if (category) {

                    let categoriasordenJSON = {
                        //"ordenIdOrden": 
                        "categoriaServicioIdCategoriaServicio": category.id,
                        "costo": appendedPrependedInput.value,
                        "fechaCategoriaAsignada": ordenJSON.fechaCreacion,
                        "observacionCategoria": ""
                    }

                    ordenJSON.ordenCategorias.push(categoriasordenJSON);
                }
            }
        }

    }

    //Creación del JSON
    if (banderaSeleccionCategoria == true && costoRequerido == false) {
        //alert("cambió el valor de banderaSeleccionCategoria a TRUE y costoRequerido a FALSE")
        sessionStorage.setItem(`ActualizacionOrden_${idUrl}`, JSON.stringify(ordenJSON));
    }

}


$(document).ready(function () {

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
            //$("div #pages").on('change', "input#fileCompletado", function () {
            $("#fileCompletado").on('change', function () {
                $('#fileInfoCompletado').html("");
            });
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