/** Funcionalidades para consultar y actualizar un plan de mantenimiento */

import {
    getJson,
    frecuenciaPeriodo,
    listAllElement,
    loadSelectContent,
    loadSelectContentAndSelected,
    listSelect
} from "./Options.js";

let getCategoriasPlan = [];
let getCategorias = [];
let getPlanes = [];
let getFrecuenciaPeriodo = '';
let getIdPlan = 0;
let getNombrePlan = '';
let identificadorGlobal = '';
let modalidad = '';

//Variable para validar que al menos se tenga una categoría seleccionada
let banderaSeleccion = false;

//Variable para validar requeridos - en el proceso cambia a true
let inputAndSelectRequeridos = false;

// Se creará el JSON si las dos variables anteriores están en:
// banderaSeleccion = true y inputAndSelectRequeridos = false

//VARIABLE PARA JSON
let planJSON = {
    "idPlanMantenimiento": 0,
    "nombre": "",
    "porKm": false,
    "porHora": false,
    "porPeriodo": false,
    "planCategorias": []
};

//Variable para asignar el identificador
let idUrl = 0;

//Clase para obtener el parámetro ID de la URL
class {
    constructor(params) {
        super(params);
        this.postId = params.id;
        this.setTitle(`Plan ${this.postId}`);
    }

    setTitle(title) {
        document.title = title;
    }

}

let identificadorGlobal = this.postId;
idUrl = parseInt(identificador);


//OBTENCIÓN DE LOS PLANES DE MANTENIMIENTO
let planesJSON = 'http://192.168.0.13:8080/static/js/data/planning.JSON';
let titlePlanesJSON = 'Planes';
getPlanes = getJson(planesJSON, titlePlanesJSON);


let radioSeleccionadoPorPeriodo = ''
let radioSeleccionadoPorKm = ''
let radioSeleccionadoPorHora = ''
let ocultoPeriodo = "hidden border-transparent-1px"
let ocultoKmHoras = "hidden border-transparent-1px"

//OBTENGO EL PLAN ACTUAL
const plan = getPlanes.find((plan) => plan.idPlanMantenimiento == identificador)

if (plan) {

    getIdPlan = plan.idPlanMantenimiento;
    getNombrePlan = plan.nombre;
    //Obteniendo las categorías pertentecientes al plan
    getCategoriasPlan = listAllElement(plan.planCategorias)
    console.log("Verificando postId: " + identificador)
    console.log("Vericando id del plan: " + getIdPlan)

    if (plan.porKm == true) {
        radioSeleccionadoPorKm = "checked";
        modalidad = "Km";
        ocultoKmHoras = "border-transparent-1px"
        ocultoPeriodo = "hidden border-transparent-1px"
    }
    if (plan.porHora == true) {
        radioSeleccionadoPorHora = "checked";
        modalidad = "Horas";
        ocultoKmHoras = "border-transparent-1px"
        ocultoPeriodo = "hidden border-transparent-1px"
    }
    if (plan.porPeriodo == true) {
        radioSeleccionadoPorPeriodo = "checked";
        ocultoPeriodo = "border-transparent-1px"
        ocultoKmHoras = "hidden border-transparent-1px"
    }

} else {
    alert(`No se logró obtener el Plan ${identificador}`)
}


//LLAMADO A FUNCIÓN PARA OBTENER LAS CATEGORIAS DEL PLAN
plan ? fillPlanServiceCategories() : {};

//FUNCIÓN PARA OBTENER LAS CATEGORIAS DEL PLAN
const fillPlanServiceCategories = () => {

    console.log("Entré al fillPlanServiceCategories en PlanView")

    //OBTENCIÓN DE LAS CATEGORÍAS DE SERVICIO
    let categoriasJSON = 'http://192.168.0.13:8080/static/js/data/serviceCategories.JSON';
    let titleCategoriasJSON = 'Categorías';
    getCategorias = getJson(categoriasJSON, titleCategoriasJSON);

    // COMPONENTES DE "POR KILÓMETOS" ó "POR HORAS"

    // COMPONENTES DE "POR PERÍODO"



    let cont = 0;
    //RECORRIENDO TODAS LAS CATEGORIAS
    for (const category of getCategorias) {

        cont++;//UTIL PARA FOR, NAME, ID DE CADA CATEGORIA
        let checkboxSeleccionado = '';
        let checkboxSeleccionadoPeriodo = '';
        let requerido = '';
        let deshabilitado = 'disabled';
        let deshabilitadoPeriodo = 'disabled';
        let requeridoPorPeriodo = '';
        let limite = '';
        let inicio = '';
        let cada = '';

        //OBTENIENDO LAS CATEGORIAS DEL PLAN
        getCategoriasPlan.forEach(element => {
            // POR HORAS
            if ((category.nombre == element.nombre) && (element.rangoHora != '')) {
                console.log(`Categoría: ${element.nombre} - Limite Hora: ${element.rangoHora} - Plan: ${identificadorGlobal}`)
                checkboxSeleccionado = 'checked';
                requerido = 'required';
                deshabilitado = '';
                limite = element.rangoHora;
            } else {
                // POR KILÓMETROS
                if ((category.nombre == element.nombre) && (element.rangoKm != '')) {
                    console.log(`Categoría: ${element.nombre} - Limite Km: ${element.rangoKm} - Plan: ${identificadorGlobal}`)
                    checkboxSeleccionado = 'checked';
                    requerido = 'required';
                    deshabilitado = '';
                    limite = element.rangoKm;

                } else {
                    // POR PERÍODO
                    if ((category.nombre == element.nombre) && (element.periodoFecha != '')) {
                        console.log(`Categoría: ${element.nombre} - Inicio: ${element.periodoFecha} - Plan: ${identificadorGlobal}`)
                        checkboxSeleccionadoPeriodo = 'checked';
                        requeridoPorPeriodo = 'required';
                        inicio = element.periodoFecha;
                        cada = element.periodoCada;
                        deshabilitadoPeriodo = '';
                        // La frecuencia (Días, Semanas, ...) se llena con fillFrecuencyOptions()
                        //getFrecuenciaPeriodo = element.periodoFrecuencia; --> No
                    }
                }
                //////////////
            }
        })

        // COMPONENTES DE "POR KILÓMETROS" ó "POR HORAS"

        //COMPONENTES DE "POR PERIODO" PARA INICIO, CADA Y FRECUENCIA DE PERIODO

        /////////////////////////////

    }

    //COMPONENTES DE "POR KILÓMETROS" ó "POR HORAS"


    //COMPONENTES DE "POR PERIODO"

    //LLAMADO A FUNCIÓN DE SELECT DE FRECUENCIAS
    fillFrecuencyOptions(); // Llenado de los options con frecuencias en los select

}

//FUNCIÓN DE SELECT DE FRECUENCIAS (SEMANAS, MESES, AÑOS, DIAS)
const fillFrecuencyOptions = () => {

    console.log("Entré al fillFrecuencyOptions en PlanView")
    let cont = 0;
    let selectFrecuenciaPeriodo = '';
    const optionFrecuenciaPeriodo = listSelect(frecuenciaPeriodo, "nombre")

    $(document).ready(function () {

        //RECORRIENDO TODAS LAS CATEGORIAS
        for (const category of getCategorias) {

            cont++;
            selectFrecuenciaPeriodo = document.getElementById(`frequencyType_${cont}`);
            // Creando los options de frecuencia en cada categoría
            loadSelectContent(optionFrecuenciaPeriodo, selectFrecuenciaPeriodo);

            // Para eliminar los options generales y crearlos de nuevo
            // en las categorías PERTENECIENTES AL PLAN SELECCIONANDO LA FRECUENCIA
            getCategoriasPlan.forEach(element => {
                if ((category.nombre == element.nombre) && (element.periodoFecha != '')) {
                    console.log(`Categoría con Frecuencia: ${element.nombre} - Inicio: ${element.periodoFecha} - Cada: ${element.periodoCada} - Frecuencia: ${element.periodoFrecuencia}`)
                    getFrecuenciaPeriodo = element.periodoFrecuencia;
                    //console.log(`Este es un select del Plan: ${selectFrecuenciaPeriodo.id}`)
                    //selectFrecuenciaPeriodo.innerHTML = '';
                    selectFrecuenciaPeriodo.querySelectorAll('*').forEach(n => n.remove());
                    loadSelectContentAndSelected(optionFrecuenciaPeriodo, selectFrecuenciaPeriodo, getFrecuenciaPeriodo);
                }
            })
        }

    });

}

//FUNCIÓN PARA CREAR EL JSON QUE SERÁ PASADO A LA API
const guardarPlanParaJSON = () => {

    banderaSeleccion = false; // reinicio bandera a false
    inputAndSelectRequeridos = false; // reinicio bandera de requeridos

    planJSON.planCategorias = []; // reinicio las categorías

    planJSON.idPlanMantenimiento = idUrl;

    planJSON.nombre = document.getElementById(`planName_${idUrl}`).value;

    let plansRadios1 = document.getElementById(`plansRadios1`);
    let plansRadios2 = document.getElementById(`plansRadios2`);
    let plansRadios3 = document.getElementById(`plansRadios3`);

    //POR PERIODO
    if (plansRadios1.checked) {
        planJSON.porPeriodo = true;
        planJSON.porKm = false;
        planJSON.porHora = false;
    } else {
        //POR KILOMETROS
        if (plansRadios2.checked) {
            planJSON.porPeriodo = false;
            planJSON.porKm = true;
            planJSON.porHora = false;
        } else {
            //POR HORAS
            if (plansRadios3.checked) {
                planJSON.porPeriodo = false;
                planJSON.porKm = false;
                planJSON.porHora = true;
            }
        }
    }


    //POR PERIODO
    if (plansRadios1.checked) {

        //OBTENGO TODAS LAS CATEGORIAS SELECCIONADAS
        const categoriasPeriodoSeleccionadas = document.getElementById('planPeriodoCategories').getElementsByClassName('control-group');
        let contCategory = 0;

        //RECORRO TODAS LAS CATEGORIAS SELECCIONADAS
        for (const cat of categoriasPeriodoSeleccionadas) {
            contCategory++;//UTIL PARA FOR,NAME,ID DE CADA CATEGORIA EN EL HTML
            //Label de categoría
            let labelPeriodoCategoryCheckbox = document.getElementById(`labelPeriodoCategoryCheckbox_${contCategory}`);
            //Input type checkbox de categoría
            let categoryPeriodoCheckbox = document.getElementById(`categoryPeriodoCheckbox_${contCategory}`);
            //Input type date de fecha de inicio de la categoría
            let frequencyStartDate = document.getElementById(`frequencyStartDate_${contCategory}`);
            //Input type number del Cada de la categoría
            let frequencyCount = document.getElementById(`frequencyCount_${contCategory}`);
            //Select de la frecuencia de la categoría
            let frequencyType = document.getElementById(`frequencyType_${contCategory}`);

            if (categoryPeriodoCheckbox.checked) {

                banderaSeleccion = true;

                //Si FECHA DE INICIO es requerido es porque su input checkbox está checked
                if (frequencyStartDate.required
                    && frequencyStartDate.value == '') {

                    inputAndSelectRequeridos = true;

                }

                //Si el Cada requerido es porque su input checkbox está checked
                if (frequencyCount.required
                    && frequencyCount.value < 1) {

                    inputAndSelectRequeridos = true;

                }

                //Si la frecuencia es requerida es porque su input checkbox está checked
                if (frequencyType.required
                    && frequencyType.options[frequencyType.selectedIndex].text == '') {

                    inputAndSelectRequeridos = true;

                }

                if (frequencyStartDate.value != ''
                    && frequencyCount.value >= 1
                    && frequencyType.options[frequencyType.selectedIndex].text != '') {

                    //getCategorias YA SE OBTUVO y se utiliza a continuación
                    //OJO, EN EL HTML se muestra el texto de las claves código y nombre
                    const category = getCategorias.find((c) => (c.codigo + ' - ' + c.nombre) == labelPeriodoCategoryCheckbox.textContent.trim());
                    if (category) {

                        //OBJETO CON TODOS LOS DATOS DE LA CATEGORIA PARA EL PLAN
                        let categoriasPlanJSON = {
                            "planMantenimientoIdPlanMantenimiento": idUrl,
                            "categoriaServicioIdCategoriaServicio": category.idCategoriaServicio,
                            "rangoKm": null,
                            "rangoHoras": null,
                            "periodoFecha": frequencyStartDate.value,
                            "periodoCada": frequencyCount.value,
                            //"periodoFrecuencia": frequencyType.value
                            "periodoFrecuencia": frequencyType.options[frequencyType.selectedIndex].text
                        }

                        //AGREGANDO LA CATEGORIA AL ARREGLO DE CATEGORIAS DEL PLAN
                        planJSON.planCategorias.push(categoriasPlanJSON);

                    }
                }
            }

            //REMUEVO TODOS LOS CHECKED QUE SE HAYAN SELECCIONADO ESTANDO POR KM U HORA
            //Input type checkbox de categoría
            document.getElementById(`categoryCheckbox_${contCategory}`).checked = false;
            //Input type number del costo de la categoría
            document.getElementById(`appendedPrependedInput_${contCategory}`).value = '';
            document.getElementById(`appendedPrependedInput_${contCategory}`).required = false;
            document.getElementById(`appendedPrependedInput_${contCategory}`).disabled = true;

        }
    }

    //POR KILOMETROS O POR HORAS
    if (plansRadios2.checked || plansRadios3.checked) {

        //OBTENGO TODAS LAS CATEGORIAS SELECCIONADAS
        const categoriasSeleccionadas = document.getElementById('planCategories').getElementsByClassName('control-group');
        let contCategory = 0;
        //RECORRO TODAS LAS CATEGORIAS SELECIONADAS
        for (const cat of categoriasSeleccionadas) {
            contCategory++;//UTIL PARA FOR,NAME,ID DE CADA CATEGORÍA EN EL HTML
            //Label de categoría
            let labelCategoryCheckbox = document.getElementById(`labelCategoryCheckbox_${contCategory}`);
            //Input type checkbox de categoría
            let categoryCheckbox = document.getElementById(`categoryCheckbox_${contCategory}`);
            //Input type number del costo de la categoría
            let appendedPrependedInput = document.getElementById(`appendedPrependedInput_${contCategory}`);

            if (categoryCheckbox.checked) {

                banderaSeleccion = true;

                //Si está requerido el límite es porque su input checkbox está checked
                if (appendedPrependedInput.required
                    && appendedPrependedInput.value <= 0) {

                    inputAndSelectRequeridos = true;
                }

                if (appendedPrependedInput.value >= 1) {

                    let limiteKm = null;
                    let limiteHoras = null;
                    if (plansRadios2.checked) {
                        limiteKm = appendedPrependedInput.value
                    } else {
                        if (plansRadios3.checked) {
                            limiteHoras = appendedPrependedInput.value
                        }
                    }

                    //getCategorias YA SE OBTUVO y se utiliza a continuación
                    //OJO, EN EL HTML se muestra el texto de las claves código y nombre
                    const category = getCategorias.find((c) => (c.codigo + ' - ' + c.nombre) == labelCategoryCheckbox.textContent.trim());
                    if (category) {

                        //OBJETO CON LOS DATOS DE LA RELACIÓN DE CATEGORÍA AL PLAN
                        let categoriasPlanJSON = {
                            "planMantenimientoIdPlanMantenimiento": idUrl,
                            "categoriaServicioIdCategoriaServicio": category.idCategoriaServicio,
                            "rangoKm": limiteKm,
                            "rangoHoras": limiteHoras,
                            "periodoFecha": null,
                            "periodoCada": null,
                            "periodoFrecuencia": null
                        }

                        //AGREGO LA CATEGORIA AL ARREGLO DE CATEGORIAS DEL PLAN
                        planJSON.planCategorias.push(categoriasPlanJSON);

                    }

                }
            }

            //REMUEVO TODOS LOS CHECKED QUE SE HAYAN SELECCIONADO ESTANDO POR PERIODO
            //Input type checkbox de categoría
            document.getElementById(`categoryPeriodoCheckbox_${contCategory}`).checked = false;
            //Input type date de fecha de inicio de la categoría
            document.getElementById(`frequencyStartDate_${contCategory}`).value = '';
            document.getElementById(`frequencyStartDate_${contCategory}`).required = false;
            document.getElementById(`frequencyStartDate_${contCategory}`).disabled = true;
            //Input type number del Cada de la categoría
            document.getElementById(`frequencyCount_${contCategory}`).value = '';
            document.getElementById(`frequencyCount_${contCategory}`).required = false;
            document.getElementById(`frequencyCount_${contCategory}`).disabled = true;
            //Select de la frecuencia de la categoría
            document.getElementById(`frequencyType_${contCategory}`).selectedIndex = 0;
            document.getElementById(`frequencyType_${contCategory}`).required = false;
            document.getElementById(`frequencyType_${contCategory}`).disabled = true;

        }

    }

    //CREACION DEL JSON PARA ACTUALIZR EL PLAN
    if (banderaSeleccion == true && inputAndSelectRequeridos == false) {
        //alert("cambió el valor de banderaSeleccion a TRUE y inputAndSelectRequeridos a FALSE")
        sessionStorage.setItem(`ActualizacionPlan_${idUrl}`, JSON.stringify(planJSON));
    } else {
        alert("No entré a la creación")
    }

}

//ELIMINAR JSON DE SESSIÓN STORAGE
const removerVariablePlanStorageJSON = () => {

    if (sessionStorage.getItem(`ActualizacionPlan_${idUrl}`)) { // Si existe otra variable en el session con el mismo nombre, así no se haya ejecutado el guardar, entrará al IF
        sessionStorage.removeItem(`ActualizacionPlan_${idUrl}`);
    }

}

//MOSTRAR JSON EXISTENTE EN SESSION STORAGE
const mostrarPlanStorageJSON = () => {

    if (sessionStorage.getItem(`ActualizacionPlan_${idUrl}`)) { // Si existe otra variable en el session con el mismo nombre, así no se haya ejecutado el guardar, entrará al IF
        console.log(`\n\nActualizacionPlan_${idUrl}\n\n` + sessionStorage.getItem(`ActualizacionPlan_${idUrl}`));
        //alert(`\n\nActualizacionPlan_${idUrl}\n\n` + JSON.stringify(planJSON, undefined, 4));
        //sessionStorage.removeItem(`NuevoActivo`);
    }
}


$(document).ready(function () {

    //EJECUCIÓN DE GUARDADO
    // Guardado de JSON teniendo categorías seleccionadas y sus datos completos
    $('div #pages').on('click', `button#savePlan_${idUrl}`, function (e) {

        guardarPlanParaJSON();


        if ($(`#planName_${idUrl}`).val().length != '') {

            if (banderaSeleccion == false) {

                alert("Debe seleccionar al menos una categoría");
                e.preventDefault();

                if ($('#plansRadios1').is(':checked')) {
                    $('#planPeriodoCategories').css("background-color", 'beige')
                }
                if ($('#plansRadios2').is(':checked') || $('#plansRadios3').is(':checked')) {
                    $('#planCategories').css("background-color", 'beige')
                }

            }
        }

        mostrarPlanStorageJSON();

    });

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
            $(`input[name=${propForInputLabel}]`).removeAttr("disabled");
            // Si las categorías por período no están ocultas
            if (!$(`#planPeriodoServiceCategories_${identificadorGlobal}`).is(":hidden")) {
                $(`select[name=${propForInputLabel}]`).attr("required", "required"); //Para Frecuencia en Periodo
                $(`select[name=${propForInputLabel}]`).removeAttr("disabled"); //Para Frecuencia en Periodo
            }

        } else {

            $(`input[name=${propForInputLabel}]`).removeAttr("required");
            $(`input[name=${propForInputLabel}]`).val('');
            $(`input[name=${propForInputLabel}]`).attr("disabled", "disabled");
            // Si las categorías por período no están ocultas
            if (!$(`#planPeriodoServiceCategories_${identificadorGlobal}`).is(":hidden")) {
                $(`select[name = ${propForInputLabel}]`).removeAttr("required"); //Para Frecuencia en Periodo
                $(`select[name = ${propForInputLabel}]`).prop("selectedIndex", 0);
                $(`select[name = ${propForInputLabel}]`).attr("disabled", "disabled"); //Para Frecuencia en Periodo
            }
        }

    });

    // AL SELECCIONAR POR PERÍODO
    $('div #pages').on('click', 'input#plansRadios1', function () {

        $(`#planPeriodoServiceCategories_${identificadorGlobal}`).show(1000, function () {
            console.log('Mostrando datos por Período');
            $(`#planPeriodoServiceCategories_${identificadorGlobal}`).removeClass("hidden");
            $('html, body').animate({
                scrollTop: $(`#planPeriodoServiceCategories_${identificadorGlobal}`).offset().top
            }, 1000)
        });

        let cont = 0;
        let labelCategory = '';

        //getCategorias YA SE OBTUVO y se utiliza a continuación
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

        $(`#planServiceCategories_${identificadorGlobal}`).hide();

    });

    // AL SELECCIONAR POR KILÓMETROS
    $('div #pages').on('click', 'input#plansRadios2', function () {

        $(`#planServiceCategories_${identificadorGlobal}`).show(1000, function () {
            console.log('Mostrando datos por Kilómetro');
            $(`#planServiceCategories_${identificadorGlobal}`).removeClass("hidden");
            $('html, body').animate({
                scrollTop: $(`#planServiceCategories_${identificadorGlobal}`).offset().top
            }, 1000)
        });

        let cont = 0;
        let labelCategory = '';

        //getCategorias YA SE OBTUVO y se utiliza a continuación
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

        $(`#planPeriodoServiceCategories_${identificadorGlobal}`).hide();

    });

    // AL SELECCIONAR POR HORAS - 
    $('div #pages').on('click', 'input#plansRadios3', function () {

        $(`#planServiceCategories_${identificadorGlobal}`).show(1000, function () {
            console.log('Mostrando datos por Horas');
            $(`#planServiceCategories_${identificadorGlobal}`).removeClass("hidden");
            $('html, body').animate({
                scrollTop: $(`#planServiceCategories_${identificadorGlobal}`).offset().top
            }, 1000)
        });

        let cont = 0;
        let labelCategory = '';

        //getCategorias YA SE OBTUVO y se utiliza a continuación
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

        $(`#planPeriodoServiceCategories_${identificadorGlobal}`).hide();

    });

});