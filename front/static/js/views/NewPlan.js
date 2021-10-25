import AbstractView from "./AbstractView.js";
import {
    frecuenciaPeriodo,
    listAllElement,
    loadSelectContent,
    loadSelectContentAndSelected,
    listSelect
} from "./Options.js";

let getCategoriasPlan = [];
let getCategorias = [];
let getFrecuenciaPeriodo = '';
let getNombrePlan = '';
let identificadorGlobal = '';
let modalidad = '';

export default class extends AbstractView {
    constructor(params) {
        super(params);
        //this.postId = params.id;
        this.setTitle(`Nuevo plan`);
    }

    async getHtml() {

        //let identificador = this.postId;
        let planHTML = ``;
        //identificadorGlobal = this.postId;

        //$.ajax({
        //    type: 'GET',
        //    url: 'http://192.168.1.114:8080/static/js/data/planning.JSON',
        //    dataType: 'json',
        //    success: function (data, status, jqXHR) {

        //        console.log(jqXHR)
        let fillPlan = ''
        let radioSeleccionadoPorPeriodo = 'checked'
        let radioSeleccionadoPorKm = ''
        let radioSeleccionadoPorHora = ''
        let ocultoPeriodo = "border-transparent-1px"
        let ocultoKmHoras = "hidden border-transparent-1px"


        //const plan = data.find((plan) => plan.id == identificador)

        //if (plan) {

        //getNombrePlan = plan.nombre;
        //getCategoriasPlan = listAllElement(plan.servicios_plan)
        //console.log("Verificando postId: " + identificador)
        //console.log("Vericando id del plan: " + plan.id)

        fillPlan = `<h1></h1>
                    <form id="planFormQuery_new">

                        <!--IDENTIFICADOR DEL PLAN-->
                        <div id="planId_new" class="control-group order-identity border-transparent-1px">
                            <h1>Nuevo plan de mantenimiento</h1>
                        </div>

                        <!--PRIMEROS DATOS DEL PLAN-->
                        <div id="planData_new" class="control-group border-transparent-1px">
                            <!--NOMBRE DE CATEGORÍA-->
                            <div class="control-group">
                                <label class="span1" for="planName_new">
                                    <h5>Nombre</h5>
                                </label>
                                <div class="controls">
                                    <input class="span12" id="planName_new" type="text" min="3" maxlength="100"
                                        value="" required>
                                </div>
                            </div>
                        </div>
                       
                        <!--PLAN POR PERÍODO-->
                        <div id="planPeriodo" class="control-group border-transparent-1px">
                            <div class="row-fluid">
                                <div class="span4">
                                    <label class="radio" for="groupPeriodoCategories">
                                        <b>Por período</b>
                                        <input type="radio" name="plansRadios" id="plansRadios1" value="option1"
                                            ${radioSeleccionadoPorPeriodo}>
                                    </label>
                                </div>
                            </div>
                        </div>
                                
                        <!--PLAN POR KM-->
                        <div id="planKm" class="control-group border-transparent-1px">
                            <div class="row-fluid">
                                <div class="span4">
                                    <label class="radio" for="groupKmCategories">
                                        <b>Por kilómetros</b>
                                        <input type="radio" name="plansRadios" id="plansRadios2" value="option2"
                                            ${radioSeleccionadoPorKm}>
                                    </label>
                                </div>
                            </div>
                        </div>

                        <!--PLAN POR HORAS-->
                        <div id="planHours" class="control-group border-transparent-1px">
                            <div class="row-fluid">
                                <div class="span4">
                                    <label class="radio" for="groupHoursCategories">
                                        <b>Por horas</b>
                                        <input type="radio" name="plansRadios" id="plansRadios3" value="option3"
                                            ${radioSeleccionadoPorHora}>
                                    </label>
                                </div>
                            </div>
                        </div>


                        <!--CATEGORÍA DE SERVICIO-->
                        <div id="planServiceCategories_new" class="${ocultoKmHoras} control-group">
                        </div

                        <!--CATEGORÍA DE SERVICIO POR PERIODO-->
                        <div id="planPeriodoServiceCategories_new" class="${ocultoPeriodo} control-group">
                        </div>

                        <!--GUARDAR / CANCELAR-->
                        <div id="planActionButtons_new" class="control-group">
                            <div class="span12 text-right border-transparent-1px">
                                <a id="savePlan_new" class="btn btn-primary" href="/planes">Guardar</a>
                                <a id="dontSavePlan_new" class="btn btn-primary" href="/planes">Cancelar</a>
                            </div>
                        </div>
                    </form>`;
        //} else {
        //    fillPlan = `<h1>=(</h1>
        //    <p>-- No se logró obtener el Plan ${identificador}</p>`
        //}

        planHTML = planHTML.concat(fillPlan)

        $('#pages').html(planHTML)
        //console.log(`AJAX planFormQuery -> Status: ${status}`)

        fillPlanServiceCategories();

        //},
        //error: function (jqXHR) {
        //    console.log(jqXHR)
        //}
        //})

        return planHTML;

    }

}

const fillPlanServiceCategories = () => {

    console.log("Entré al fillPlanServiceCategories en PlanView")

    // COMPONENTES DE "POR KILÓMETOS" ó "POR HORAS"
    let groupCategoriesHTML = ``;

    let groupCategoriesContainerA = `
    <div id="groupCategories" class="control-group">
    <div class="row-fluid">
        <label class="span4" for="planCategories">
            <h5>Categorías de servicio<!--por ${modalidad}--></h5>
        </label>
    </div>

    <div class="control-group">
        <div class="row-fluid">
            <div class="search span5">
                <input type="text" id="busqueda" placeholder="Buscar ...">
                <i id="iconBusqueda" class="fa fa-search"></i>
            </div>
            <div class="controls span5">
                <button id="seleccionados" class="btn">Seleccionados</button>
                <button id="todasCategorias" class="btn">Todos</button>
            </div>
        </div>
    </div>
    
    <div id="planCategories" class="categories-container-scroll">`;

    let groupCategoriesContainerB = `
    </div>
    </div>
    `;

    // COMPONENTES DE "POR PERÍODO"
    let groupPeriodoCategoriesHTML = ``;

    let groupPeriodoCategoriesContainerA = `
    <div id="groupPeriodoCategories" class="control-group">
    <div class="row-fluid">
        <label class="span4" for="planPeriodoCategories">
            <h5>Categorías de servicio</h5>
        </label>
    </div>

    <div class="control-group">
        <div class="row-fluid">
            <div class="search span5">
                <input type="text" id="busquedaPorPeriodo" placeholder="Buscar ...">
                <i id="iconBusquedaPorPeriodo" class="fa fa-search"></i>
            </div>
            <div class="controls span5">
                <button id="seleccionadosPorPeriodo" class="btn">Seleccionados</button>
                <button id="todasCategoriasPorPeriodo" class="btn">Todos</button>
            </div>
        </div>
    </div>
    

    <div id="planPeriodoCategories" class="categories-container-scroll">`;

    let groupPeriodoCategoriesContainerB = `
    </div>
    </div>
    `;
    /////////////////////////////

    $.ajax({
        type: 'GET',
        url: 'http://192.168.1.114:8080/static/js/data/serviceCategories.JSON',
        dataType: 'json',
        success: function (data, status, jqXHR) {

            console.log("Entré al AJAX de Categorías del Plan")
            console.log(jqXHR)
            let fillPlanCategories = ''
            let fillPlanPeriodoCategories = ''
            let cont = 0;
            for (const category of data) {

                cont++;
                let checkboxSeleccionado = '';
                let requerido = '';
                let requeridoPorPeriodo = '';
                let limite = '';
                let inicio = '';
                let cada = '';
                getCategorias.push(category)

                /*getCategoriasPlan.forEach(element => {
                    // POR HORAS
                    if ((category.nombre == element.nombre) && (element.limite_hora != '')) {
                        console.log(`Categoría: ${element.nombre} - Limite Hora: ${element.limite_hora} Plan: ${identificadorGlobal}`)
                        checkboxSeleccionado = 'checked';
                        requerido = 'required';
                        limite = element.limite_hora;
                    } else {
                        // POR KILÓMETROS
                        if ((category.nombre == element.nombre) && (element.limite_km != '')) {
                            console.log(`Categoría: ${element.nombre} - Limite Km: ${element.limite_km} Plan: ${identificadorGlobal}`)
                            checkboxSeleccionado = 'checked';
                            requerido = 'required';
                            limite = element.limite_km;

                        } else {
                            // POR PERÍODO
                            if ((category.nombre == element.nombre) && (element.periodo_inicio != '')) {
                                console.log(`Categoría: ${element.nombre} - Inicio: ${element.periodo_inicio} Plan: ${identificadorGlobal}`)
                                checkboxSeleccionado = 'checked';
                                requeridoPorPeriodo = 'required';
                                inicio = element.periodo_inicio;
                                cada = element.periodo_cada;
                                //getFrecuenciaPeriodo = element.periodo_frecuencia_cada;
                            }
                        }
                        //////////////
                    }
                })*/

                // COMPONENTES DE "POR KILÓMETROS" ó "POR HORAS"
                fillPlanCategories += `
                <div class="control-group">
                    <div id="labelTextAndlabelLimit_${cont}" name="textAndLimit" class="row-fluid">
                        <div id="labelText_${cont}" class="span5">
                            <label id="labelCategoryCheckbox_${cont}" class="checkbox" name="${category.nombre}">
                                <b>${category.id}</b> - <b>${category.cod}</b> - ${category.nombre}
                                <input type="checkbox" id="categoryCheckbox_${cont}" value="option_${cont}"
                                ${checkboxSeleccionado} for="categoryLimit_${cont}">
                            </label>
                        </div>
                        <div id="labelLimit_${cont}" class="controls">
                            <div class="input-prepend input-append">
                                <span name="medida" class="add-on">${modalidad}</span>
                                <input id="appendedPrependedInput_${cont}" type="number" step="1" min="0"
                                    maxlength="10" value="${limite}" placeholder="e.g. 100" 
                                    ${requerido} name="categoryLimit_${cont}">
                            </div>
                        </div>
                    </div>
                </div>`;


                //COMPONENTES DE "POR PERIODO" PARA INICIO, CADA Y FRECUENCIA DE PERIODO
                fillPlanPeriodoCategories += `
                <div id="labelTextStartFrecuency_${cont}" name="textStartFrecuency" class="control-group">
                    <div id="labelTextPeriodo_${cont}" class="span10">
                        <label id="labelPeriodoCategoryCheckbox_${cont}" class="checkbox" name="${category.nombre}">
                            <b>${category.id}</b> - <b>${category.cod}</b> - ${category.nombre}
                            <input type="checkbox" id="categoryPeriodoCheckbox_${cont}" value="option_${cont}"
                                ${checkboxSeleccionado} for="categoryPeriodo_${cont}">
                        </label>
                    </div>
                    <div id="labelStartPeriodo_${cont}" class="row-fluid" name="startPeriodo">
                        <div class="span5">
                            <span name="fechaInicio" class="add-on">Inicio</span>
                            <input class="span5" id="frequencyStartDate_${cont}" type="date" value="${inicio}" 
                                name="categoryPeriodo_${cont}" ${requeridoPorPeriodo}>
                        </div>
                    </div>
                    <div id="labelFrecuencyPeriodo_${cont}" class="row-fluid" name="frecuencyPeriodo">
                        <div class="span5">
                            <span name="fechaCada" class="add-on">Cada</span>
                            <input class="span2" id="frequencyCount_${cont}" type="number" 
                                value="${cada}" placeholder="" 
                                name="categoryPeriodo_${cont}" ${requeridoPorPeriodo} 
                                min="1">
                            <select class="span3" id="frequencyType_${cont}" 
                                ${requeridoPorPeriodo}
                                name="categoryPeriodo_${cont}">
                                <!--<option placeholder="-"></option>--><!--Esta linea se debe mantener-->
                            </select>
                        </div>
                    </div>
                </div>`;
                /////////////////////////////

            }

            //COMPONENTES DE "POR KILÓMETROS" ó "POR HORAS"
            groupCategoriesHTML = groupCategoriesHTML.concat(groupCategoriesContainerA)
            groupCategoriesHTML = groupCategoriesHTML.concat(fillPlanCategories)
            groupCategoriesHTML = groupCategoriesHTML.concat(groupCategoriesContainerB)

            $(`#planServiceCategories_new`).html(groupCategoriesHTML)
            console.log(`AJAX planServiceCategories -> Status: ${status}`)

            //COMPONENTES DE "POR PERIODO"
            groupPeriodoCategoriesHTML = groupPeriodoCategoriesHTML.concat(groupPeriodoCategoriesContainerA)
            groupPeriodoCategoriesHTML = groupPeriodoCategoriesHTML.concat(fillPlanPeriodoCategories)
            groupPeriodoCategoriesHTML = groupPeriodoCategoriesHTML.concat(groupPeriodoCategoriesContainerB)

            $(`#planPeriodoServiceCategories_new`).html(groupPeriodoCategoriesHTML)
            console.log(`AJAX planPeriodoServiceCategories -> Status: ${status}`)
            console.log("Todas las categorias: ")
            console.log(getCategorias)
            fillFrecuencyOptions(); // Llenado de los options con frecuencias en los select

        },
        error: function (jqXHR) {
            console.log("Error en ajax")
            console.log(jqXHR)
        }
    })
}

const fillFrecuencyOptions = () => {

    console.log("Entré al fillFrecuencyOptions en PlanView")
    let cont = 0;
    let selectFrecuenciaPeriodo = '';
    const optionFrecuenciaPeriodo = listSelect(frecuenciaPeriodo, "nombre")

    $(document).ready(function () {

        for (const category of getCategorias) {

            cont++;
            selectFrecuenciaPeriodo = document.getElementById(`frequencyType_${cont}`);
            console.log("Select Id: " + selectFrecuenciaPeriodo.id)
            // Creando los options de frecuencia en cada categoría
            loadSelectContent(optionFrecuenciaPeriodo, selectFrecuenciaPeriodo);

            // Para eliminar los options generales y crearlos de nuevo
            // en las categorías PERTENECIENTES AL PLAN SELECCIONANDO LA FRECUENCIA
            getCategoriasPlan.forEach(element => {
                if ((category.nombre == element.nombre) && (element.periodo_inicio != '')) {
                    console.log(`Categoría con Frecuencia: ${element.nombre} - Inicio: ${element.periodo_inicio} - Cada: ${element.periodo_cada} - Frecuencia: ${element.periodo_frecuencia_cada}`)
                    getFrecuenciaPeriodo = element.periodo_frecuencia_cada;
                    console.log(`Este es un select del Plan: ${selectFrecuenciaPeriodo.id}`)
                    //selectFrecuenciaPeriodo.innerHTML = '';
                    selectFrecuenciaPeriodo.querySelectorAll('*').forEach(n => n.remove());
                    loadSelectContentAndSelected(optionFrecuenciaPeriodo, selectFrecuenciaPeriodo, getFrecuenciaPeriodo);
                }
            })
        }

    });

}


$(document).ready(function () {

    //FILTRO DE CATEGORÍAS POR KILÓMETROS Y POR HORAS
    $('div #pages').on('click', 'input[id=busqueda]', function () {
        let busqueda = $('input[id=busqueda]');
        let titulo = $('div[name*="textAndLimit"]'); // Asi tomamos el label y su costo // Sólo label => 'label[class*="checkbox"]'
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
                let txt = $(this).val(); //valor del texto encontrado dentro del div con id="textAndLimit"
                //Si hay coincidencias en la búsqueda cambiando a minusculas
                if ($(etiquetaConCosto).text().toLowerCase().indexOf(txt) > -1) {
                    $(etiquetaConCosto).parent().show(); //mostramos el div con su label y costo
                }
            });
        });

    });

    //FILTRO DE CATEGORÍAS POR PERIODO
    $('div #pages').on('click', 'input[id=busquedaPorPeriodo]', function () {
        let busqueda = $('input[id=busquedaPorPeriodo]');
        let titulo = $('div[name*="textStartFrecuency"]'); // Asi tomamos el label, y div de inicio y frecuencia
        //console.log("ID DE ELEMENTO BÚSQUEDA: " + busqueda.attr("id"));

        $(titulo).each(function () {
            let etiquetaInicioFrecuencia = $(this);
            let etiqueta = $(this).find('label[class*="checkbox"]'); // variable para filtrar solo por la etiqueta
            //console.log("ID DEL LABEL: " + etiqueta.attr("id"))
            //console.log("TEXTO DEL LABEL: " + etiqueta.text())
            let inicio = $(this).find('div[name*="startPeriodo"]');
            let frecuencia = $(this).find('div[name*="frecuencyPeriodo"]');
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
                        $(etiqueta).parent().show(); //mostramos todos los label
                        $(inicio).parent().show(); //mostramos todas sus inicios
                        $(frecuencia).parent().show(); //mostramos todas sus frecuencias
                        $(clase).attr('class', 'fa fa-search'); //volvemos a añadir la clase para mostrar la lupa
                    });
                }

                $(etiqueta).parent().hide(); //ocultamos toda la lista
                $(inicio).parent().hide(); //ocultamos todos sus inicios
                $(frecuencia).parent().hide(); //ocultamos todas sus frecuencias
                let txt = $(this).val(); //valor del label
                //Si hay coincidencias en la búsqueda cambiando a minusculas
                if ($(etiqueta).text().toLowerCase().indexOf(txt) > -1) {
                    $(etiqueta).parent().show(); //mostramos los label que coincidan
                    $(inicio).parent().show(); //mostramos sus inicios
                    $(frecuencia).parent().show(); //mostramos sus frecuencias
                }
            });
        });

    });

    //SELECCIONADOS POR KILÓMETROS y POR HORAS
    //Prevenir la recarga de la página
    $('div #pages').on('click', 'button#seleccionados', function (e) {
        e.preventDefault();
    });

    // Sólo los seleccionados en POR KILÓMETROS y POR HORAS
    $('div #pages').on('click', 'button#seleccionados', function () {
        let busqueda = $('input[id=busqueda]');
        let clase = $('i[id=iconBusqueda]');
        let categoria = $('div[name*="textAndLimit"]');
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

        /*$("div #planCategories input:checkbox:checked").each(function () {
            alert($(this).val());
            $(this).parent().show();
        });*/
    });

    //SELECCIONADOS POR PERÍODO
    //Prevenir la recarga de la página
    $('div #pages').on('click', 'button#seleccionadosPorPeriodo', function (e) {
        e.preventDefault();
    });

    // Sólo los seleccionados en POR PERÍODO
    $('div #pages').on('click', 'button#seleccionadosPorPeriodo', function () {
        let busqueda = $('input[id=busquedaPorPeriodo]');
        let clase = $('i[id=iconBusquedaPorPeriodo]');
        let categoria = $('div[name*="textStartFrecuency"]');
        $(categoria).each(function () {
            let cadaCategoria = $(this);
            let etiqueta = $(this).find('label[class*="checkbox"]');
            let checked = $(this).find('input[type*="checkbox"]');
            let inicio = $(this).find('div[name*="startPeriodo"]');
            let frecuencia = $(this).find('div[name*="frecuencyPeriodo"]');
            //$(cadaCategoria).parent().hide();
            $(etiqueta).parent().hide();
            $(inicio).parent().hide();
            $(frecuencia).parent().hide();

            $(checked).each(function () {
                if ($(checked).is(':checked')) {
                    //console.log("Opción de categoría seleccionada: " + $(this).val());
                    //$(cadaCategoria).parent().show();
                    $(etiqueta).parent().show();
                    $(inicio).parent().show();
                    $(frecuencia).parent().show();
                }
            });
        });

        $(busqueda).val(''); //Asignamos vacío al buscador
        $(clase).attr('class', 'fa fa-search'); //Colocamos la lupa al buscador

    });

    //TODOS LAS CATEGORÍAS POR KILÓMETROS y POR HORAS
    //Prevenir la recarga de la página
    $('div #pages').on('click', 'button#todasCategorias', function (e) {
        e.preventDefault();
    });

    // Todas las categorías en POR KILÓMETROS y POR HORAS
    $('div #pages').on('click', 'button#todasCategorias', function () {
        let busqueda = $('input[id=busqueda]');
        let clase = $('i[id=iconBusqueda]');
        let categoria = $('div[name*="textAndLimit"]');
        $(categoria).each(function () {
            let cadaCategoria = $(this);
            $(cadaCategoria).parent().show();
        });

        $(busqueda).val(''); //Asignamos vacío al buscador
        $(clase).attr('class', 'fa fa-search'); //Colocamos la lupa al buscador

    });

    //TODAS LAS CATEGORÍAS POR PERIODO
    //Prevenir la recarga de la página
    $('div #pages').on('click', 'button#todasCategoriasPorPeriodo', function (e) {
        e.preventDefault();
    });

    // Todas las categorías en POR PERIODO
    $('div #pages').on('click', 'button#todasCategoriasPorPeriodo', function () {
        let busqueda = $('input[id=busquedaPorPeriodo]');
        let clase = $('i[id=iconBusquedaPorPeriodo]');
        let categoria = $('div[name*="textStartFrecuency"]');
        $(categoria).each(function () {
            //let cadaCategoria = $(this);
            let etiqueta = $(this).find('label[class*="checkbox"]');
            let inicio = $(this).find('div[name*="startPeriodo"]');
            let frecuencia = $(this).find('div[name*="frecuencyPeriodo"]');
            //$(cadaCategoria).parent().show();
            $(etiqueta).parent().show();
            $(inicio).parent().show();
            $(frecuencia).parent().show();
        });

        $(busqueda).val(''); //Asignamos vacío al buscador
        $(clase).attr('class', 'fa fa-search'); //Colocamos la lupa al buscador

    });

    // CAMBIO DE VALOR DE SPAN ENTRE KILÓMETROS Y HORAS
    $('div #pages').on('change', 'input#plansRadios2', function () {

        if ($(this).is(':checked')) {
            $(`span[name=medida]`).text("Km")
        }
    });

    $('div #pages').on('change', 'input#plansRadios3', function () {

        if ($(this).is(':checked')) {
            $(`span[name=medida]`).text("Horas")
        }
    });


    //AGREGAR O QUITAR REQUIRED a INPUT NUMBER de CATEGORÍA en CHECKED
    //También con agregar o quitar REQUIRED a SELECT si es CATEGORÍAS POR PERÍODO
    $('div #pages').on('change', 'input[type="checkbox"]', function () {

        let propForInputLabel = $(this).attr('for');

        if ($(this).is(':checked')) {

            $(`input[name=${propForInputLabel}]`).attr("required", "required");
            // Si las categorías por período no están ocultas
            if (!$(`#planPeriodoServiceCategories_new`).is(":hidden")) {
                $(`select[name=${propForInputLabel}]`).attr("required", "required"); //Para Frecuencia en Periodo
            }

        } else {

            $(`input[name=${propForInputLabel}]`).removeAttr("required");
            // Si las categorías por período no están ocultas
            if (!$(`#planPeriodoServiceCategories_new`).is(":hidden")) {
                $(`select[name = ${propForInputLabel}]`).removeAttr("required"); //Para Frecuencia en Periodo
            }
        }

    });

    // AL SELECCIONAR POR PERÍODO
    $('div #pages').on('click', 'input#plansRadios1', function () {

        $(`#planPeriodoServiceCategories_new`).show(1000, function () {
            console.log('Mostrando datos por Kilómetro');
            $(`#planPeriodoServiceCategories_new`).removeClass("hidden");
            $('html, body').animate({
                scrollTop: $(`#planPeriodoServiceCategories_new`).offset().top
            }, 1000)
        });

        let cont = 0;
        let labelCategory = '';

        for (const category of getCategorias) {

            cont++;
            labelCategory = document.getElementById(`categoryCheckbox_${cont}`);
            console.log("Label Category Id: " + labelCategory.id)

            getCategoriasPlan.forEach(element => {
                if (category.nombre == element.nombre) {
                    //console.log(`Label check: ${element.nombre}`)
                    //console.log(`Este es un label check: ${labelCategory.id}`)
                    $(`#frequencyStartDate_${cont}`).attr("required", "required");
                    $(`#frequencyCount_${cont}`).attr("required", "required");
                    $(`#frequencyType_${cont}`).attr("required", "required");
                }
            })
            //$(`#appendedPrependedInput_${cont}`).removeAttr("required");
        }

        $(`#planServiceCategories_new`).hide();

    });

    // AL SELECCIONAR POR KILÓMETROS
    $('div #pages').on('click', 'input#plansRadios2', function () {

        $(`#planServiceCategories_new`).show(1000, function () {
            console.log('Mostrando datos por Kilómetro');
            $(`#planServiceCategories_new`).removeClass("hidden");
            $('html, body').animate({
                scrollTop: $(`#planServiceCategories_new`).offset().top
            }, 1000)
        });

        let cont = 0;
        let labelCategory = '';

        for (const category of getCategorias) {

            cont++;
            labelCategory = document.getElementById(`categoryCheckbox_${cont}`);
            console.log("Label Category Id: " + labelCategory.id)

            getCategoriasPlan.forEach(element => {
                if (category.nombre == element.nombre) {
                    //console.log(`Label check: ${element.nombre}`)
                    //console.log(`Este es un label check: ${labelCategory.id}`)
                    $(`#appendedPrependedInput_${cont}`).attr("required", "required");
                }
            })
            //$(`#frequencyStartDate_${cont}`).attr("required", "required");
            //$(`#frequencyCount_${cont}`).attr("required", "required");
            //$(`#frequencyType_${cont}`).attr("required", "required");
        }

        $(`#planPeriodoServiceCategories_new`).hide();

    });

    // AL SELECCIONAR POR HORAS - 
    $('div #pages').on('click', 'input#plansRadios3', function () {

        $(`#planServiceCategories_new`).show(1000, function () {
            console.log('Mostrando datos por Horas');
            $(`#planServiceCategories_new`).removeClass("hidden");
            $('html, body').animate({
                scrollTop: $(`#planServiceCategories_new`).offset().top
            }, 1000)
        });

        let cont = 0;
        let labelCategory = '';

        for (const category of getCategorias) {

            cont++;
            labelCategory = document.getElementById(`categoryCheckbox_${cont}`);
            console.log("Label Category Id: " + labelCategory.id)

            getCategoriasPlan.forEach(element => {
                if (category.nombre == element.nombre) {
                    //console.log(`Label check: ${element.nombre}`)
                    //console.log(`Este es un label check: ${labelCategory.id}`)
                    $(`#appendedPrependedInput_${cont}`).attr("required", "required");
                }
            })
            //$(`#frequencyStartDate_${cont}`).attr("required", "required");
            //$(`#frequencyCount_${cont}`).attr("required", "required");
            //$(`#frequencyType_${cont}`).attr("required", "required");
        }

        $(`#planPeriodoServiceCategories_new`).hide();

    });

});