import AbstractView from "./AbstractView.js";
import {
    tiposMantenimiento, estados, tiposActivos, areas, talleres,
    frecuenciaPeriodo, getTiposMantenimientos, getEstados, getAreas,
    getTiposActivos, getActivos, getTalleres,
    loadSelectContent,
    loadSelectContentAndSelected,
    listSelect,
    currentDate,
    getJson,
    listAllElement
} from "./Options.js"

let getTipoMantenimiento = ``;
let getEstado = ``;
let getDocumentoCompletado = ``;
let getArea = ``;
let getTipoActivo = ``;
let getTaller = ``;
let getFrecuenciaPeriodo = ``;
let getCategoriasOrden = [];
let identificadorGlobal = '';

//let getTiposMantenimientos = [];
//let getEstados = [];
//let getAreas = [];
//let getTiposActivos = [];
//let getActivos = [];
//let getTalleres = [];
/*let ordersTypeJSON = 'http://192.168.0.15:8080/static/js/data/ordersType.JSON';
let titleOrdersTypeJSON = "Tipos de mantenimientos";
let stateJSON = 'http://192.168.0.15:8080/static/js/data/state.JSON';
let titleStateJSON = 'Estados';*/

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle(`Nueva orden`);
    }

    async getHtml() {

        let orderHTML = ``;
        let ocultoActivos = "hidden border-transparent-1px";
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


        //getCategoriasOrden = listAllElement(order.servicios_orden)
        //console.log("Lista Objetos de Categorías de la Orden: " + getCategoriasOrden)
        //getTipoMantenimiento = order.tipo_orden;
        //getEstado = order.estado_orden;
        //getArea = order.area_vehiculo;
        //getTipoActivo = order.tipo_activo;
        //getTaller = order.taller_orden;
        //getFrecuenciaPeriodo = order.periodo_frecuencia_cada;
        //console.log("Verificando postId: " + identificador)
        //console.log("Vericando id de order: " + order.id_orden)

        //if (order.km_recorridos == null) {
        //    uso = order.horas_uso
        //} else {
        //    uso = order.km_recorridos
        //}

        // OJO: Validar posteriormente obteniendo de la base de datos el tiempo en la geocerca del taller
        //if (getEstado == "En taller") {
        //    tiempoTaller = Math.abs(new Date(order.fecha_limite) - new Date(order.fecha_inicio)) / (1000 * 3600 * 24)
        //}

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
        //    radioSeleccionadoRango = "checked"
        //    requeridoPorRango = "required"
        //    ocultoRango = "border-transparent-1px"
        //    ocultoPeriodo = "hidden border-transparent-1px"
        //}



        //getEstadosOrden = listAllElement(order.historial_estados);
        //let getEstadosOrdenItem = [];

        //getEstadosOrden.forEach(elem => {
        //    if (elem["estado_actual"] == true) {
        //        getEstado = elem["nombre_estado"];
        //        classFocusState = "text-success";
        //    }
        //    if (elem["nombre_estado"] == "Completado" || elem["nombre_estado"] == "Completado con retraso") {
        //        getDocumentoCompletado = elem["documento_completado"];
        //        ocultoAdjuntoCompletado = "controls new-div-file-upload";
        //        requeridoAdjuntoCompletado = "required";
        //    } else {
        //        getDocumentoCompletado = "";
        //        ocultoAdjuntoCompletado = "hidden controls new-div-file-upload";
        //        requeridoAdjuntoCompletado = "";
        //    }

        //    getEstadosOrdenItem.push(`<li><strong class="${classFocusState}">${elem["nombre_estado"]}</strong>
        //                                            <ul>
        //                                                <li>${elem["fecha_estado"]}</li>
        //                                                <li><u>Por</u>: ${elem["estado_asignado_por"]}</li>
        //                                            </ul>
        //                                        </li>`)
        //});

        //if (getEstadosOrdenItem.length) {
        //    formatGetEstadosOrdenItem = getEstadosOrdenItem.join('');
        //} else {
        //    formatGetEstadosOrdenItem = ``;
        //}


        fillOrder = `<h1></h1>
                    <form id="orderFormQuery_new">

                        <!--IDENTIFICADOR DE LA ORDEN-->
                        <div id="orderId_new" class="control-group order-identity border-transparent-1px">
                            <h1>Nueva orden</h1>
                        </div>

                        <!--PRIMEROS DATOS DEL ACTIVO-->
                        <div id="orderData_new" class="row-fluid control-group border-transparent-1px">

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
                                </div>

                                <!--ÁREA DEL ACTIVO-->
                                <div class="control-group">
                                    <label class="span4" for="orderAreasOptions">
                                        <h5>Área</h5>
                                    </label>
                                    <div class="controls">
                                        <select id="orderAreasOptions" required>
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

                                <!--TIPO DE ACTIVO-->
                                <div class="control-group">
                                    <label class="span4" for="orderAssetType">
                                        <h5>Tipo de activo</h5>
                                    </label>
                                    <div class="controls">
                                        <select id="orderAssetType" required>
                                        </select>
                                    </div>
                                </div>

                            </div>

                        </div>

                        <!--SELECCION DE ACTIVO-->
                        <div class="control-group border-transparent-1px">
                            <div class="row-fluid">
                                <label id="labelOrderAsset" class="span4" for="orderAsset">
                                    <h5>Seleccionar activos <i class="fa fa-plus-circle" aria-hidden="true"></i></h5>
                                </label>
                            </div>
                            <div class="control-group">
                                <div class="control">
                                    <select multiple="multiple" id="orderAsset" name="orderAsset[]" required class="${ocultoActivos}">
                                    </select>
                                </div>
                            </div>
                        </div>
                                



                        <!--RANGO DE FECHAS-->
                        <div id="datesRange" class="control-group border-transparent-1px">
                            <div class="row-fluid">
                                <label class="span4">
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
                                        <input class="span3" id="newRangeStartDate" type="date" value="" ${requeridoPorRango}
                                            min="${currentDate()}">
                                    </div>
                                </div>
                                <div class="control-group">
                                    <div class="row-fluid">
                                        <label class="span4">
                                            Fecha límite
                                        </label>
                                    </div>
                                    <div class="row-fluid">
                                        <input class="span3" id="newRangeEndDate" type="date" value="" ${requeridoPorRango} disabled>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!--CATEGORÍA DE SERVICIO-->
                        <div id="orderServiceCategories_new" class="control-group border-transparent-1px"></div>

                        <!--Observaciones-->
                        <div id="notes" class="control-group border-transparent-1px">
                            <label class="span2" for="orderNotes">
                                <h5>Observaciones</h5>
                            </label>
                            <div class="controls">
                                <textarea class="span12" cols="10" id="orderNotes" maxlength="1000"></textarea>
                            </div>
                        </div>

                        <!--TOTAL EN COSTOS DE LA ORDEN-->
                        <div id="totalCost" class="control-group">
                            <label class="span12 text-right order-identity border-transparent-1px">
                                <h3>Total: <span class="add-on">$ </span></h3>
                            </label>
                        </div>

                        <!--GUARDAR / CANCELAR-->
                        <div id="orderActionButtons_new" class="control-group">
                            <div class="span12 text-right border-transparent-1px">
                                <a id="saveOrder_new" class="btn btn-primary" href="/ordenes">Guardar</a>
                                <a id="dontSaveOrder_new" class="btn btn-primary" href="/ordenes">Cancelar</a>
                            </div>
                        </div>
                    </form>`;

        orderHTML = orderHTML.concat(fillOrder)

        $('#pages').html(orderHTML)

        fillOrderOptions();
        fillOrderCategories();

        return orderHTML;
    }

}

const fillOrderOptions = () => {

    console.log("Dentro del fillOrderOptions en NewOrder")

    window.onload = function () {

        // Select tipo de mantenimiento -- emplea los datos obtenidos en getJson();
        const selectTipoMantenimiento = document.getElementById('orderType');
        const optionTipoMantenimiento = listSelect(getTiposMantenimientos, "nombre"); // Paso la clave "nombre"
        loadSelectContent(optionTipoMantenimiento, selectTipoMantenimiento);

        // Select estado -- emplea los datos obtenidos en getJson();
        const selectEstado = document.getElementById('orderStatus');
        const optionEstado = listSelect(getEstados, "nombre"); // Paso la clave "nombre"
        loadSelectContent(optionEstado, selectEstado);

        // Select area -- emplea los datos obtenidos en getJson();
        const selectArea = document.getElementById('orderAreasOptions');
        const optionArea = listSelect(getAreas, "nombre"); // Paso la clave "nombre"
        loadSelectContent(optionArea, selectArea);

        // Select tipo de activo -- emplea los datos obtenidos en getJson();
        const selectTipoActivo = document.getElementById('orderAssetType');
        const optionTipoActivo = listSelect(getTiposActivos, "nombre"); // Paso la clave "nombre"
        loadSelectContent(optionTipoActivo, selectTipoActivo);

        // Select activo -- emplea los datos obtenidos en getJson();

        const selectActivo = document.getElementById('orderAsset');
        const optionActivo = listSelect(getActivos, "activo"); // Paso la clave "activo"
        loadSelectContent(optionActivo, selectActivo);

        // Select taller -- emplea los datos obtenidos en getJson();
        const selectTaller = document.getElementById('orderProvider');
        const optionTaller = listSelect(getTalleres, "nombre"); // Paso la clave "nombre"
        loadSelectContent(optionTaller, selectTaller)

    };
}

const fillOrderCategories = () => {

    console.log("Dentro del fillOrderServiceCategories en NewOrder")

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
        url: 'http://192.168.0.15:8080/static/js/data/serviceCategories.JSON',
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
                let costo = '';
                //costoTotal += costo; 

                //getCategoriasOrden.forEach(element => {
                //    if (category.nombre == element.nombre) {
                //        console.log(`Categoría: ${element.nombre} - Costo: ${element.costo} - Orden: ${identificadorGlobal}`)
                //        checkboxSeleccionado = 'checked';
                //        requerido = 'required';
                //        costo = element.costo;
                //    }
                //})

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
                                    maxlength="10" value="${costo}" placeholder="e.g. 1.78" ${requerido} name="categoryCost_${cont}">
                            </div>
                        </div>
                    </div>
                </div>`;
            }

            orderCategoriesHTML = orderCategoriesHTML.concat(orderCategoriesContainerA)
            orderCategoriesHTML = orderCategoriesHTML.concat(fillOrderCategories)
            orderCategoriesHTML = orderCategoriesHTML.concat(orderCategoriesContainerB)

            $(`#orderServiceCategories_new`).html(orderCategoriesHTML)
            console.log(`AJAX orderServiceCategories -> Status: ${status}`)

        },
        error: function (jqXHR) {
            console.log("Error en ajax")
            console.log(jqXHR)
        }
    })
}


$(document).ready(function () {

    $('div #pages').on('click', 'label[id=labelOrderAsset]', function () {
        $('#orderAsset').multiSelect();
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
    $('div #pages').on('change', 'input#newRangeStartDate', e => {

        if (e.target.value) {
            console.log("Fecha inicial: " + e.target.value)
            $("#newRangeEndDate").removeAttr("disabled");
            $("#newRangeEndDate").attr("min", e.target.value);
        } else {
            $("#newRangeEndDate").attr("disabled", "true");
            $("#newRangeEndDate").val("");
        }
    })
    $('div #pages').on('change', 'input#newRangeEndDate', l =>{
        if(l.target.value){
            console.log("Fecha límite: " + l.target.value)
        }
    })

    //Agregar o quitar la opción de adjuntar archivo al colocar en estados COMPLETADO ó COMPLETADO CON RETRASO
    /*$('div #pages').on('change', 'select#orderStatus', e => {

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
    });*/

});