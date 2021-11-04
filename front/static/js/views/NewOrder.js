import AbstractView from "./AbstractView.js";
import {
    tiposMantenimiento, estados, tiposActivos, areas, talleres,
    frecuenciaPeriodo, getTiposMantenimientos, getEstados, getAreas,
    getTiposActivos, getActivos, getTalleres, getCategorias,
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

//Variable para validar que al menos se tenga una categoría seleccionada
let banderaSeleccionCategoria = false;

//Variable para validar que al menos se tenga un activo seleccionado
let banderaSeleccionActivo = false;

//VARIABLE PARA JSON
let nuevaOrdenJSON = {
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
        let requeridoPorRango = 'required' //''
        let requeridoPorPeriodo = ''
        let requeridoAdjuntoCompletado = ''
        let tiempoTaller = '';
        let ocultoPeriodo = "hidden border-transparent-1px"
        let ocultoRango = "hidden border-transparent-1px"
        let ocultoAdjuntoCompletado = "hidden controls new-div-file-upload";
        let classFocusState = "";

        let formatGetEstadosOrdenItem = ``;
        let getEstadosOrden = [];

        fillOrder = `<h1></h1>
            <form id="orderFormQuery_new" action="/ordenes" >

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
                        <!--<div class="control-group">
                            <label class="span4" for="orderStatus">
                                <h5>Estado</h5>
                            </label>
                            <div class="controls">
                                <select id="orderStatus" required>
                                </select>
                            </div>
                        </div>-->

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
                            <!--<select multiple="multiple" id="orderAsset" name="orderAsset[]" required class="${ocultoActivos}">-->
                            <select multiple="multiple" id="orderAsset" class="${ocultoActivos}">
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
                                <input class="span4" id="newRangeStartDate" type="datetime-local" value="" ${requeridoPorRango}
                                    min="${currentDate().slice(0, 16)}">
                            </div>
                        </div>
                        <div class="control-group">
                            <div class="row-fluid">
                                <label class="span4">
                                    Fecha límite
                                </label>
                            </div>
                            <div class="row-fluid">
                                <input class="span4" id="newRangeEndDate" type="datetime-local" value="" ${requeridoPorRango} disabled>
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
                        <!--<a id="saveOrder_new" class="btn btn-primary" href="/ordenes">Guardar</a>
                        <a id="dontSaveOrder_new" class="btn btn-primary" href="/ordenes">Cancelar</a>-->
                        <button id="saveOrder_new" class="btn btn-primary" type="submit">Guardar</button>
                        <button id="dontSaveOrder_new" class="btn btn-primary" type="button" onclick="window.history.back();">Cancelar</button>
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

    //window.onload = function () {

    $(window).on("load", function () {

        $(document).ready(function () {

            // Select tipo de mantenimiento -- emplea los datos obtenidos en getJson();
            const selectTipoMantenimiento = document.getElementById('orderType');
            const optionTipoMantenimiento = listSelect(getTiposMantenimientos, "nombre"); // Paso la clave "nombre"
            loadSelectContent(optionTipoMantenimiento, selectTipoMantenimiento);

            // Select estado -- emplea los datos obtenidos en getJson();
            /*const selectEstado = document.getElementById('orderStatus');
            const optionEstado = listSelect(getEstados, "nombre"); // Paso la clave "nombre"
            loadSelectContent(optionEstado, selectEstado);*/

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

        });

    });
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
                let deshabilitado = "disabled"
                let costo = '';

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
                                <input id="appendedPrependedInput_${cont}" type="number" step="0.01" min="1"
                                    maxlength="10" value="${costo}" placeholder="e.g. 1.78" ${requerido} ${deshabilitado} name="categoryCost_${cont}">
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

const guardarOrdenParaJSON = () => {

    banderaSeleccionCategoria = false; // Reinicio a false para verificar de nuevo la selección de categorías
    banderaSeleccionActivo = false; // Reinicio a false para verificar de nuevo la selección de activos

    let contadorOrdenes = 0;
    const activosSeleccionados = document.getElementsByClassName('ms-elem-selection ms-selected');

    //Se crean tantas órdenes como activos hayan sido seleccionados
    for (const element of activosSeleccionados) {

        //Verificación de que se tengan activos seleccionados
        banderaSeleccionActivo = true;

        console.log("Entré al for de activosSeleccionados")

        contadorOrdenes++;

        nuevaOrdenJSON.ordenEstados = []; // reinicio el estado por cada activo
        nuevaOrdenJSON.ordenCategorias = []; // reinicio las categorías por cada activo

        nuevaOrdenJSON.fechaCreacion = currentDate();
        nuevaOrdenJSON.fechaInicial = document.getElementById('newRangeStartDate').value;
        nuevaOrdenJSON.start = nuevaOrdenJSON.fechaInicial;
        nuevaOrdenJSON.fechaFinal = document.getElementById('newRangeEndDate').value;
        nuevaOrdenJSON.end = nuevaOrdenJSON.fechaFinal;
        nuevaOrdenJSON.observaciones = document.getElementById('orderNotes').value;
        //nuevaOrdenJSON.title = 
        nuevaOrdenJSON.allDay = false

        const activo = getActivos.find((activo) => activo.activo == element.textContent);
        if (activo) {
            nuevaOrdenJSON.activoIdActivo = activo.id;
        }

        const tipoOrden = getTiposMantenimientos.find((tipoOrden) => tipoOrden.nombre == document.getElementById('orderType').value);
        if (tipoOrden) {
            nuevaOrdenJSON.tipoOrdenIdTipoOrden = tipoOrden.idTipoOrden;
        }

        const taller = getTalleres.find((taller) => taller.nombre == document.getElementById('orderProvider').value);
        if (taller) {
            nuevaOrdenJSON.tallerServicioIdTallerServicio = taller.idTallerServicio;
        }

        let estadoNuevaOrdenJSON = {
            //"ordenIdOrden": 
            "estadoIdEstado": 2, // 2 es el Estado Planificado
            "idUsuario": 1, //1 temporalmente hasta implementar sincronización con usuario conectado
            "fechaAsignado": nuevaOrdenJSON.fechaCreacion
        }
        nuevaOrdenJSON.ordenEstados.push(estadoNuevaOrdenJSON);


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

                    //alert("Texto: " + labelCategoryCheckbox.textContent.trim() + " - Costo: " + appendedPrependedInput.value)
                    const category = getCategorias.find((c) => (c.codigo + ' - ' + c.nombre) == labelCategoryCheckbox.textContent.trim());
                    if (category) {

                        let categoriasNuevaOrdenJSON = {
                            //"ordenIdOrden": 
                            "categoriaServicioIdCategoriaServicio": category.idCategoriaServicio,
                            "costo": parseFloat(appendedPrependedInput.value),
                            "fechaCategoriaAsignada": nuevaOrdenJSON.fechaCreacion,
                            "observacionCategoria": ""
                        }

                        nuevaOrdenJSON.ordenCategorias.push(categoriasNuevaOrdenJSON);
                    }
                }
            }

        }

        //Creación del JSON
        if (banderaSeleccionActivo == true) {
            if (banderaSeleccionCategoria == true && costoRequerido == false) {
                //alert("cambió el valor de banderaSeleccionCategoria a TRUE y costoRequerido a FALSE")
                sessionStorage.setItem(`NuevaOrden_${contadorOrdenes}`, JSON.stringify(nuevaOrdenJSON));
            }
        }
    }

}

const removerVariablesStorageJSON = () => {

    let contadorOrdenes = 0;
    const activosSeleccionados = document.getElementsByClassName('ms-elem-selection ms-selected');
    for (const element of activosSeleccionados) {
        contadorOrdenes++;
        if (sessionStorage.getItem(`NuevaOrden_${contadorOrdenes}`)) {
            sessionStorage.removeItem(`NuevaOrden_${contadorOrdenes}`);
        }
    }

}

const mostrarStorageJSON = () => {

    let contadorOrdenes = 0;
    const activosSeleccionados = document.getElementsByClassName('ms-elem-selection ms-selected');
    for (const element of activosSeleccionados) {
        contadorOrdenes++;
        if (sessionStorage.getItem(`NuevaOrden_${contadorOrdenes}`)) {
            console.log(`\n\nNuevaOrden_${contadorOrdenes}\n\n` + sessionStorage.getItem(`NuevaOrden_${contadorOrdenes}`));
            //sessionStorage.removeItem(`NuevaOrden_${contadorOrdenes}`);
        }
    }
}

$(document).ready(function () {

    $('div #pages').on('click', 'button#saveOrder_new', function (e) {

        guardarOrdenParaJSON();

        if ($('#orderType').val().length != ''
            && $('#orderAreasOptions').val().length != ''
            && $('#orderProvider').val().length != ''
            && $('#orderAssetType').val().length != ''
            && $('#newRangeStartDate').val().length != ''
            && $('#newRangeEndDate').val().length != '') {

            if (banderaSeleccionActivo == false) {

                alert('Debe Seleccionar al menos un activo');

                $('#orderAsset').multiSelect();

                $('html, body').animate({
                    scrollTop: $(`#ms-orderAsset`).offset().top - 50
                }, 1000)


                e.preventDefault();

            } else {

                if (banderaSeleccionCategoria == false) {

                    alert('Debe completar los datos de "Categorías de servicio"');
                    e.preventDefault();
                    $('#categoriesContainer').css("background-color", 'beige')

                }
            }

        }

        mostrarStorageJSON();

    });

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
            $(`input[name=${propForInputLabel}]`).removeAttr("disabled");

        } else {

            $(`input[name=${propForInputLabel}]`).removeAttr("required");
            $(`input[name=${propForInputLabel}]`).val('');
            $(`input[name=${propForInputLabel}]`).attr("disabled", "disabled");
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
    $('div #pages').on('change', 'input#newRangeEndDate', l => {
        if (l.target.value) {
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