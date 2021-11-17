/** Funcionalidades para crear un Nueva Orden */

import {
    getJson,
    loadSelectContent,
    listSelect,
    currentDate,
} from "./Options.js"

//ARREGLOS GLOBALES DE OBJETOS PARA LOS DATOS QUE SE OBTIENEN DE LOS JSON
let getTiposMantenimientos = [];
let getAreas = [];
let getTiposActivos = [];
let getActivos = [];
let getTalleres = [];
let getCategorias = [];
let getVehiculos = [];

//VARIABLE PARA VALIDAR QUE AL MENOS SE TENGA UNA CATEGORÍA SELECCIONADA
let banderaSeleccionCategoria = false;

//VARIABLE PARA VALIDAR QUE AL MENOS SE TENGA UN ACTIVO SELECCIONADO
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

//Clase para asignar título a la pestaña del navegador
class {
    constructor(params) {
        super(params);
        this.setTitle(`Nueva Orden`);
    }

    setTitle(title) {
        document.title = title;
    }

}

//LLAMADO A FUNCIÓN DE LLENADO DE SELECT Y OPTION PARA CREAR NUEVA ORDEN
fillOrderOptions();

//LLAMADO A FUNCIÓN DE LLENADO DE CATEGORÍAS PARA CREAR NUEVA ORDEN
fillOrderCategories();

//FUNCIÓN DE LLENADO DE SELECT Y OPTION PARA CREAR NUEVA ORDEN
const fillOrderOptions = () => {

    console.log("Dentro del fillOrderOptions en NewOrder")

    $(window).on("load", function () {

        $(document).ready(function () {

            //SELECT TIPO DE MANTENIMIENTO
            //OBTENCIÓN DE LOS TIPOS DE MANTENIMIENTOS
            let ordersTypeJSON = 'http://192.168.0.13:8080/static/js/data/ordersType.JSON';
            let titleOrdersTypeJSON = "Tipos de mantenimientos";
            getTiposMantenimientos = getJson(ordersTypeJSON, titleOrdersTypeJSON);
            const selectTipoMantenimiento = document.getElementById('orderType_new');
            const optionTipoMantenimiento = listSelect(getTiposMantenimientos, "nombre"); // Paso la clave "nombre"
            loadSelectContent(optionTipoMantenimiento, selectTipoMantenimiento);

            //SELECT AREA
            //OBTENCIÓN DE LAS ÁREAS
            let areasJSON = 'http://192.168.0.13:8080/static/js/data/areas.JSON';
            let titleAreasJSON = "Áreas";
            getAreas = getJson(areasJSON, titleAreasJSON);
            const selectArea = document.getElementById('orderAreasOptions_new');
            const optionArea = listSelect(getAreas, "nombreArea"); // Paso la clave "nombre"
            loadSelectContent(optionArea, selectArea);

            //SELECT TIPO DE ACTIVO
            //OBTENCIÓN DE LOS TIPOS DE ACTIVOS
            let tiposActivosJSON = 'http://192.168.0.13:8080/static/js/data/assetsType.JSON';
            let titleTiposActivosJSON = 'Tipos de activos';
            getTiposActivos = getJson(tiposActivosJSON, titleTiposActivosJSON);
            const selectTipoActivo = document.getElementById('orderAssetType_new');
            const optionTipoActivo = listSelect(getTiposActivos, "nombre"); // Paso la clave "nombre"
            loadSelectContent(optionTipoActivo, selectTipoActivo);

            //SELECT TALLER
            //OBTENCIÓN DE LOS TALLERES
            let talleresJSON = 'http://192.168.0.13:8080/static/js/data/workshops.JSON';
            let titleTalleresJSON = 'Talleres';
            getTalleres = getJson(talleresJSON, titleTalleresJSON);
            const selectTaller = document.getElementById('orderProvider_new');
            const optionTaller = listSelect(getTalleres, "nombre"); // Paso la clave "nombre"
            loadSelectContent(optionTaller, selectTaller)

        });

    });
}

//FUNCIÓN DE LLENADO DE CATEGORÍAS PARA CREAR NUEVA ORDEN
const fillOrderCategories = () => {

    console.log("Dentro del fillOrderServiceCategories en NewOrder")

    let fillOrderCategories = ''

    //OBTENCIÓN DE CATEGORÍAS
    let categoriasJSON = 'http://192.168.0.13:8080/static/js/data/serviceCategories.JSON';
    let titleCategoriasJSON = 'Categorías';
    getCategorias = getJson(categoriasJSON, titleCategoriasJSON);

    let cont = 0;

    //RECORRIDO DE CADA CATEGORIA
    for (const category of getCategorias) {

        cont++; // Se utiliza para cada for, name, id, de los labels e input number

        let getIdCategoriaServicio = category.idCategoriaServicio;
        let getNombreCategoriaServicio = category.nombre;
        let getCodigoCategoriaServicio = category.codigo;
        let checkboxSeleccionado = ''
        let requerido = '';
        let deshabilitado = "disabled"
        let costo = '';

    }
}

//FUNCIÓN PARA CREAR EL JSON QUE SERÁ PASADO A LA API
const guardarOrdenParaJSON = () => {

    banderaSeleccionCategoria = false; // Reinicio a false para verificar de nuevo la selección de categorías
    banderaSeleccionActivo = false; // Reinicio a false para verificar de nuevo la selección de activos

    let contadorOrdenes = 0;
    const activosSeleccionados = document.getElementsByClassName('ms-elem-selection ms-selected');

    //SE CREAN TANTAS ORDENES COMO ACTIVOS HAYAN SIDO SELECCIONADOS
    for (const element of activosSeleccionados) {

        //VERIFICACIÓN DE QUE SE TENGAN ACTIVOS SELECCIONADOS
        banderaSeleccionActivo = true;

        console.log("Entré al for de activosSeleccionados")

        contadorOrdenes++;

        nuevaOrdenJSON.ordenEstados = []; // reinicio el estado por cada activo
        nuevaOrdenJSON.ordenCategorias = []; // reinicio las categorías por cada activo

        nuevaOrdenJSON.fechaCreacion = currentDate();
        nuevaOrdenJSON.fechaInicial = document.getElementById('newRangeStartDate').value;
        nuevaOrdenJSON.fechaFinal = document.getElementById('newRangeEndDate').value;
        nuevaOrdenJSON.observaciones = document.getElementById('orderNotes_new').value;

        // LAS SIGUIENTES 4 VARIABLES SE UTILIZAN PARA EL FULLCALENDAR Y NO ESTÁN EN BASE DE DATOS
        //nuevaOrdenJSON.title = 
        nuevaOrdenJSON.start = nuevaOrdenJSON.fechaInicial;
        nuevaOrdenJSON.end = nuevaOrdenJSON.fechaFinal;
        nuevaOrdenJSON.allDay = false

        //ASIGNAR ID ACTIVOS DESDE PATENTES LEIDAS POR VEHICULO
        //OBTENCIÓN DE VEHÍCULOS
        let vehiculosJSON = 'http://192.168.0.13:8080/static/js/data/vehicle.JSON';
        let titleVehiculosJSON = 'Vehículos BLACKGPS';
        getVehiculos = getJson(vehiculosJSON, titleVehiculosJSON);
        const vehiculo = getVehiculos.find((vehiculo) => vehiculo.ppuVehiculo.trim() == element.textContent.trim());
        if (vehiculo) {

            //ASIGNACIÓN DE ID DE ACTIVO
            //OBTENCIÓN DE ACTIVOS
            let activosJSON = 'http://192.168.0.13:8080/static/js/data/assets.JSON';
            let titleActivosJSON = 'Activos';
            getActivos = getJson(activosJSON, titleActivosJSON);
            const activo = getActivos.find((activo) => activo.vehiculoIdVehiculo == vehiculo.idVehiculo);
            if (activo) {
                nuevaOrdenJSON.activoIdActivo = activo.idActivo;
            }
        }

        //TIPOS DE ORDENES
        //OBTENCIÓN DE TIPOS DE ÓRDENES
        let ordersTypeJSON = 'http://192.168.0.13:8080/static/js/data/ordersType.JSON';
        let titleOrdersTypeJSON = "Tipos de mantenimientos";
        getTiposMantenimientos = getJson(ordersTypeJSON, titleOrdersTypeJSON);
        const tipoOrden = getTiposMantenimientos.find((tipoOrden) => tipoOrden.nombre == document.getElementById('orderType_new').value);
        if (tipoOrden) {
            nuevaOrdenJSON.tipoOrdenIdTipoOrden = tipoOrden.idTipoOrden;
        }

        //TALLERES DE SERVICIO
        //OBTENCIÓN DE TALLERES
        let talleresJSON = 'http://192.168.0.13:8080/static/js/data/workshops.JSON';
        let titleTalleresJSON = 'Talleres';
        getTalleres = getJson(talleresJSON, titleTalleresJSON);
        const taller = getTalleres.find((taller) => taller.nombre == document.getElementById('orderProvider_new').value);
        if (taller) {
            nuevaOrdenJSON.tallerServicioIdTallerServicio = taller.idTallerServicio;
        }

        //ASIGNACIÓN DEL PRIMER ESTADO POSIBLE AL CREAR UNA ÓRDEN DE FORMA MANUAL
        let estadoNuevaOrdenJSON = {
            //"ordenIdOrden": 
            "estadoIdEstado": 2, // 2 es el Estado Planificado
            "idUsuario": 1, //1 temporalmente hasta implementar sincronización con usuario conectado
            "fechaAsignado": nuevaOrdenJSON.fechaCreacion
        }

        //SE AGREGA AL ARREGLO DE ESTADOS DE LA ÓRDEN
        nuevaOrdenJSON.ordenEstados.push(estadoNuevaOrdenJSON);


        let costoRequerido = false; //VARIABLE DE CONTROL PARA REQUERIR COSTO SEGÚN SELECCIÓN

        //CATEGORÍAS SELECCIONADAS EN LA ÓRDEN
        const categoriasSeleccionadas = document.getElementById('categoriesContainer_new').getElementsByClassName('row-fluid');
        let contCategory = 0; // UTIL PARA CADA FOR, NAME, ID DE LABEL E INPUT NUMBER DE CADA CATEGORÍA

        //RECORRIENDO CADA CATEGORÍA SELECCIONADA
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

                banderaSeleccionCategoria = true; // CONTROL PARA CREACIÓN DE JSON

                //Si está requerido el costo es porque su input checkbox está checked
                if (appendedPrependedInput.required
                    && appendedPrependedInput.value <= 0) {

                    costoRequerido = true;
                }

                if (appendedPrependedInput.value > 0) {

                    //Encontrar la categoría ---> Ojo es combinación de las claves del json "codigo" y "nombre"
                    //getCategorias YA SE OBTUVO y se utiliza a continuación
                    const category = getCategorias.find((c) => (c.codigo + ' - ' + c.nombre) == labelCategoryCheckbox.textContent.trim());
                    if (category) {

                        //OBJETOS CON LOS DATOS DE LA CATEGORÍA SELECCIONADA
                        let categoriasNuevaOrdenJSON = {
                            //"ordenIdOrden": 
                            "categoriaServicioIdCategoriaServicio": category.idCategoriaServicio,
                            "costo": parseFloat(appendedPrependedInput.value),
                            "fechaCategoriaAsignada": nuevaOrdenJSON.fechaCreacion,
                            "observacionCategoria": ""
                        }

                        //SE AGREGA LA CATEGORÍA SELECCIONADA CON SUS DATOS EN CADA ITERACIÓN
                        nuevaOrdenJSON.ordenCategorias.push(categoriasNuevaOrdenJSON);
                    }
                }
            }

        }

        //CREACIÓN DEL JSON DE LA NUEVA ÓRDEN
        if (banderaSeleccionActivo == true) {
            if (banderaSeleccionCategoria == true && costoRequerido == false) {
                //alert("cambió el valor de banderaSeleccionCategoria a TRUE y costoRequerido a FALSE")
                sessionStorage.setItem(`NuevaOrden_${contadorOrdenes}`, JSON.stringify(nuevaOrdenJSON));
            }
        }
    }

}

//ELIMINAR JSON DE SESSIÓN STORAGE
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

//MOSTRAR JSON EXISTENTE EN SESSION STORAGE
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

    //EVENTOS DE GUARDADO
    $('div #pages').on('click', 'button#saveOrder_new', function (e) {

        guardarOrdenParaJSON();

        if ($('#orderType_new').val().length != ''
            && $('#orderAreasOptions_new').val().length != ''
            && $('#orderProvider_new').val().length != ''
            && $('#orderAssetType_new').val().length != ''
            && $('#newRangeStartDate').val().length != ''
            && $('#newRangeEndDate').val().length != '') {

            if (banderaSeleccionActivo == false) {

                alert('Escoja un "Área" y "Tipo de activo"' +
                    '\npara filtrar los activos que puede seleccionar');

                $('html, body').animate({
                    scrollTop: $(`#orderAreasOptions_new`).offset().top - 50
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

    //BOTÓN ACTUALIZAR COSTO TOTAL DENTRO DE LA ÓRDEN
    $('div #pages').on('click', 'a#botonActualizarNuevoTotal', function (e) {

        //TODAS LAS CATEGORÍAS SELECCIONADAS
        const costosCategorias = document.getElementById('categoriesContainer_new').getElementsByClassName('input-prepend input-append');
        let contCostos = 0;
        let sumCostos = 0;
        let totalActualizado = "";

        //RECORRIENDO TODAS LAS CATEGORÍAS SELECCIONADAS PARA SUMAR SUS COSTOS
        for (const elem of costosCategorias) {
            contCostos++;//Importante por cada for,name,id de cada input number de costos
            //Label de categoría
            let appendedPrependedInput = document.getElementById(`appendedPrependedInput_${contCostos}`);
            if (!appendedPrependedInput.disabled) {
                sumCostos = (parseFloat(appendedPrependedInput.value) + parseFloat(sumCostos)).toFixed(2);
            }
        }

        if (isNaN(sumCostos)) {
            totalActualizado = "";
        } else {
            totalActualizado = "$ " + sumCostos.toString().replace(".", ",");
        }

        //ASIGNO LA SUMATORIA AL FINAL AL TOTAL EN EL HTML
        $('#valorTotalNuevaOrden').text(totalActualizado);
        e.preventDefault();
    });



    //CREANDO EL MULTISELECT DE ACTIVOS AL HACER CLIC EN SELECCIONAR ACTIVOS
    //NO SE UTILIZA ACTUALMENTE PORQUE SE EJECUTA ESTA FUNCIONALIDAD MEDIANTE
    //LOS SIGUIENTES PAR DE CHANGE
    /*$('div #pages').on('click', 'label[id=labelOrderAsset]', function () {

        if (!$('#orderAsset').is(':disabled')) {
            $('#orderAsset').multiSelect();
        }

        //$('#orderAsset').multiSelect();
    });*/

    //SOLO ACTIVOS (PATENTES) DE UN AREA Y TIPO DE ACTIVO ESPECÍFICO
    //TRABAJA EN CONJUNTO CON EL SIGUIENTE CHANGE
    $('div #pages').on('change', 'select#orderAreasOptions_new', e => {

        $(`#orderAssetType_new`).val("");
        $(`#orderAssetType_new`).attr("disabled", "disabled");
        $('#orderAsset option').remove();
        $(`#orderAsset`).val("");
        $(`#orderAsset`).attr("disabled", "disabled");
        $('.ms-container').empty(); // CONTENEDOS DEL MULTISELECT

        if ($('#orderAreasOptions_new').val() != "") {
            $('#orderAssetType_new').removeAttr("disabled");
        }
    })

    //SOLO PATENTES (ACTIVOS) DE UN TIPO DE ACTIVO Y AREA ESPECÍFICA
    //TRABAJA EN CONJUNTO CON EL CHANGE ANTERIOR PARA HABILITAR LOS "ACTIVOS"
    $('div #pages').on('change', 'select#orderAssetType_new', f => {

        if ($('#orderAssetType_new').val() != "") {

            //ARREGLO PARA LLENAR EL SELECT DE PATENTES
            //SE TRATA DEL SELECT QUE LEE LA BIBLIOTECA MULTISELECT PARA CREAR
            //LOS DOS DIV DE AGREGADO O QUITADO DE PATENTES DE ACTIVOS DE FORMA MÁS COMODA VISUALMENTE
            let vehiculosAreaOrden = [];

            //OBTENCIÓN DE LAS ÁREAS
            let areasJSON = 'http://192.168.0.13:8080/static/js/data/areas.JSON';
            let titleAreasJSON = "Áreas";
            getAreas = getJson(areasJSON, titleAreasJSON);
            const areaOrdenSeleccionada = getAreas.find((area) => area.nombreArea == $('#orderAreasOptions_new').val());
            console.log("Area seleccionada: " + areaOrdenSeleccionada.nombreArea)

            //OBTENCIÓN DE LOS TIPOS DE ACTIVOS
            let tiposActivosJSON = 'http://192.168.0.13:8080/static/js/data/assetsType.JSON';
            let titleTiposActivosJSON = 'Tipos de activos';
            getTiposActivos = getJson(tiposActivosJSON, titleTiposActivosJSON);
            const tipoActivoOrdenSeleccionado = getTiposActivos.find((tipo) => tipo.nombre == f.target.value);
            console.log("Tipo activo seleccionado: " + tipoActivoOrdenSeleccionado.nombre)

            //VERIFICACIÓN PARA OBTENER ACTIVOS SOLO DE AREA Y TIPO DE ACTIVO SELECCIONADO
            if (areaOrdenSeleccionada && tipoActivoOrdenSeleccionado) {

                console.log("Entré a: areaOrdenSeleccionada && tipoActivoOrdenSeleccionado")

                //OBTENCIÓN DE ACTIVOS
                let activosJSON = 'http://192.168.0.13:8080/static/js/data/assets.JSON';
                let titleActivosJSON = 'Activos';
                getActivos = getJson(activosJSON, titleActivosJSON);

                //OBTENGO SOLO LOS ACTIVOS DEL AREA Y TIPO DE ACTIVO SELECCIONADOS
                const activosOrden = getActivos.filter((activo) => ((activo.areaIdArea == areaOrdenSeleccionada.idArea) && (activo.tipoActivoIdTipoActivo == tipoActivoOrdenSeleccionado.idTipoActivo)));

                if (activosOrden) {

                    console.log("activosOrden")

                    //OBTENCIÓN DE LOS VEHÍCULOS PARA UTILIZAR EN FOR A CONTINUACIÓN
                    let vehiculosJSON = 'http://192.168.0.13:8080/static/js/data/vehicle.JSON';
                    let titleVehiculosJSON = 'Vehículos BLACKGPS';
                    getVehiculos = getJson(vehiculosJSON, titleVehiculosJSON);

                    for (const elem of activosOrden) {
                        console.log(elem.idActivo + " " + elem.vehiculoIdVehiculo + " " + elem.areaIdArea + " " + elem.tipoActivoIdTipoActivo)
                        const patenteOrden = getVehiculos.find((vehiculo) => vehiculo.idVehiculo == elem.vehiculoIdVehiculo);
                        if (patenteOrden) {

                            //AGREGO AL ARREGLO SOLO LAS PATENTES SELECCIONADAS
                            vehiculosAreaOrden.push(patenteOrden);
                        }
                    }

                    console.log("Longitud vehiculosAreaOrden: " + vehiculosAreaOrden.length)

                    //TENIENDO EL SELECT SOLO CON LAS PATENTES FILTRADAS POR AREA Y TIPO
                    //PUEDO CREAR EL MULTISELECT PARA SELECCIONAR ACTIVOS
                    if (vehiculosAreaOrden.length) {

                        console.log("Entré a: vehiculosAreaOrden.length")

                        console.log(vehiculosAreaOrden);
                        const selectPatenteOrden = document.getElementById('orderAsset');
                        const optionPatenteOrden = listSelect(vehiculosAreaOrden, "ppuVehiculo"); // Paso la clave "ppuVehiculo"
                        loadSelectContent(optionPatenteOrden, selectPatenteOrden);

                        $('select#orderAsset').removeAttr("disabled");
                        $('#orderAsset').multiSelect('refresh'); //Creación de los DIV del MULTISELECT

                    } else {
                        $('#orderAsset option').remove();
                        $(`#orderAsset`).val("");
                        $(`#orderAsset`).attr("disabled", "disabled");
                        $('.ms-container').empty();
                    }
                }
            } else {
                $('#orderAsset option').remove();
                $(`#orderAsset`).val("");
                $(`#orderAsset`).attr("disabled", "disabled");
                $('.ms-container').empty();
            }

        } else {
            $('#orderAsset option').remove();
            $(`#orderAsset`).val("");
            $(`#orderAsset`).attr("disabled", "disabled");
            $('.ms-container').empty();
        }
    })

    //Sólo Activos (patentes) FILTRANDO SOLO POR ÁREA
    /*$('div #pages').on('change', 'select#orderAreasOptions_new', e => {
        let vehiculosAreaOrden = [];
        const areaOrdenSeleccionada = getAreas.find((area) => area.nombreArea == e.target.value);
        if (areaOrdenSeleccionada) {
            const patentesOrden = getVehiculos.filter((vehiculo) => vehiculo.areaIdArea == areaOrdenSeleccionada.idArea);
            if (patentesOrden) {
                vehiculosAreaOrden = listAllElement(patentesOrden);
                if (vehiculosAreaOrden.length) {
                    console.log(vehiculosAreaOrden);
                    const selectPatenteOrden = document.getElementById('orderAsset');
                    const optionPatenteOrden = listSelect(vehiculosAreaOrden, "ppuVehiculo"); // Paso la clave "ppuVehiculo"
                    loadSelectContent(optionPatenteOrden, selectPatenteOrden);

                    $('select#orderAsset').removeAttr("disabled");
                    $('#orderAsset').multiSelect('refresh');

                } else {
                    $('#orderAsset option').remove();
                    $(`#orderAsset`).val("");
                    $(`#orderAsset`).attr("disabled", "disabled");
                    $('.ms-container').empty();
                }
            }

        } else {
            $('#orderAsset option').remove();
            $(`#orderAsset`).val("");
            $(`#orderAsset`).attr("disabled", "disabled");
            $('.ms-container').empty();
        }
    })*/

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

});