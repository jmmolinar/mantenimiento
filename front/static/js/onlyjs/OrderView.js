/** Funcionalidades para consultar y actualizar una orden */

import {
    getJson, olderDate,
    loadSelectContent,
    loadSelectContentAndSelected,
    listSelect,
    listAllElement,
    currentDate
} from "./Options.js"

let getIdOrden = 0;
let getTipoMantenimiento = ``;
let getPatenteActivo = ``;
let getKmGpsActivo = ``;
let getHorometroActivo = ``;
let getUsoActivo = ``;
let getEstado = ``;
let getArea = ``;
let getTipoActivo = ``;
let getTaller = ``;
let getRutaAdjuntoCompletado = ``;
let getFechaRutaAdjuntoCompletado = ``;
let getFechaCreacion = ``;
let getCategoriasOrden = [];
let getEstadosOrden = [];
let identificadorGlobal = '';

//ARREGLOS GLOBALES DE OBJETOS PARA LOS DATOS QUE SE OBTIENEN DE LOS JSON
let getOrdenes = [];
let getActivos = [];
let getAreas = [];
let getEstados = [];
let getBodegas = [];
let getTiposActivos = [];
let getVehiculos = [];
let getModelos = [];
let getMarcas = [];
let getGPS = [];
let getPlanes = [];
let getTalleres = [];
let getTiposMantenimientos = [];
let getCategorias = [];

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

//Clase para obtener el parámetro ID de la URL
class {
    constructor(params) {
        super(params);
        this.postId = params.id;
        this.setTitle(`Orden ${this.postId}`);
    }

    setTitle(title) {
        document.title = title;
    }

}

let identificador = this.postId;
idUrl = parseInt(identificador);

//OBTENCIÓN DE TODAS LAS ÓRDENES
let ordenesJSON = 'http://192.168.0.13:8080/static/js/data/orders.JSON';
let titleOrdenesJSON = "Órdenes";
getOrdenes = getJson(ordenesJSON, titleOrdenesJSON);

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
radioSeleccionadoRango = "checked"
requeridoPorRango = "required"
ocultoRango = "border-transparent-1px"
ocultoPeriodo = "hidden border-transparent-1px"

//OBTENCIÓN DE LA ORDEN IDENTIFICADA EN LA URL
const order = getOrdenes.find((order) => order.idOrden == identificador)

if (order) {

    //IDENTIFICADOR DE LA ORDEN
    getIdOrden = order.idOrden;

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
    if (isNaN(costoOrden)) {
        totalOrden = "";
    } else {
        totalOrden = "$ " + costoOrden.toString().replace(".", ",");
    }

    //TIPO DE ORDEN
    //OBTENCIÓN DE LOS TIPOS DE MANTENIEMIENTOS O TIPO DE ÓRDENES
    let ordersTypeJSON = 'http://192.168.0.13:8080/static/js/data/ordersType.JSON';
    let titleOrdersTypeJSON = "Tipos de mantenimientos";
    getTiposMantenimientos = getJson(ordersTypeJSON, titleOrdersTypeJSON);
    const tipoMantenimiento = getTiposMantenimientos.find((tipoOrden) => tipoOrden.idTipoOrden == order.tipoOrdenIdTipoOrden);
    if (tipoMantenimiento) {
        getTipoMantenimiento = tipoMantenimiento.nombre;
    }

    //ACTIVO DE LA ORDEN
    //OBTENCIÓN DE TODAS LOS ACTIVOS
    let activosJSON = 'http://192.168.0.13:8080/static/js/data/assets.JSON';
    let titleActivosJSON = 'Activos';
    getActivos = getJson(activosJSON, titleActivosJSON);
    const activo = getActivos.find((activo) => activo.idActivo == order.activoIdActivo);
    if (activo) {

        //PATENTE, KM, HOROMETRO, DEL ACTIVO DE LA ÓRDEN
        //OBTENCIÓN DE LOS VEHÍCULOS
        let vehiculosJSON = 'http://192.168.0.13:8080/static/js/data/vehicle.JSON';
        let titleVehiculosJSON = 'Vehículos BLACKGPS';
        getVehiculos = getJson(vehiculosJSON, titleVehiculosJSON);
        const vehiculo = getVehiculos.find((vehiculo) => vehiculo.idVehiculo == activo.vehiculoIdVehiculo);
        if (vehiculo) {
            getPatenteActivo = vehiculo.ppuVehiculo;
            getKmGpsActivo = parseFloat(vehiculo.kmGps).toFixed(2);
            getHorometroActivo = parseFloat(vehiculo.horometro).toFixed(2);
        }

        //ÁREA DE LA ÓRDEN
        //OBTENCIÓN DE LAS ÁREAS
        let areasJSON = 'http://192.168.0.13:8080/static/js/data/areas.JSON';
        let titleAreasJSON = "Áreas";
        getAreas = getJson(areasJSON, titleAreasJSON);
        const area = getAreas.find((area) => area.idArea == activo.areaIdArea);
        if (area) {
            getArea = area.nombreArea;
            //getArea = order.area_vehiculo;
        }

        //TIPO DE ACTIVO DEL ACTIVO DE LA ORDEN
        //OBTENCIÓN DE LOS TIPOS DE ACTIVOS
        let tiposActivosJSON = 'http://192.168.0.13:8080/static/js/data/assetsType.JSON';
        let titleTiposActivosJSON = 'Tipos de activos';
        getTiposActivos = getJson(tiposActivosJSON, titleTiposActivosJSON);
        const tipoActivo = getTiposActivos.find((tipoActivo) => tipoActivo.idTipoActivo == activo.tipoActivoIdTipoActivo);
        if (tipoActivo) {
            getTipoActivo = tipoActivo.nombre;
        }

    }

    //TALLER DE LA ORDEN
    //OBTENCIÓN DE LOS TALLERES
    let talleresJSON = 'http://192.168.0.13:8080/static/js/data/workshops.JSON';
    let titleTalleresJSON = 'Talleres';
    getTalleres = getJson(talleresJSON, titleTalleresJSON);
    const taller = getTalleres.find((taller) => taller.idTallerServicio == order.tallerServicioIdTallerServicio);
    if (taller) {
        getTaller = taller.nombre;
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

    console.log("Verificando postId: " + identificador)
    console.log("Vericando id de order: " + order.idOrden)

    // OJO: Validar posteriormente obteniendo de la base de datos el tiempo en la geocerca del taller
    if (getEstado == "En taller") {
        tiempoTaller = Math.abs(new Date(order.fechaFinal) - new Date(order.fechaInicial)) / (1000 * 3600 * 24)
    }

    getEstadosOrden = listAllElement(order.ordenEstados);
    let getEstadosOrdenItem = [];

    //OBTENCIÓN DE LOS ESTADOS
    let stateJSON = 'http://192.168.0.13:8080/static/js/data/state.JSON';
    let titleStateJSON = 'Estados';
    getEstados = getJson(stateJSON, titleStateJSON);

    //Comparador para obtener la fecha máxima de un estado
    //y poder asignarlo como el actual
    let fechaUltimoEstado = "1900-01-01T00:00";

    getEstadosOrden.forEach(elem => {

        if (new Date(elem["fechaAsignado"]) > new Date(fechaUltimoEstado)) {

            const estado = getEstados.find((estado) => estado.idEstado == elem["estadoIdEstado"]);
            if (estado) {
                getEstado = estado.nombre;
            }

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
            ocultoAdjuntoCompletado = "controls new-div-file-upload";
            requeridoAdjuntoCompletado = "required";
            classFocusState = "text-success";
        } else {
            ocultoAdjuntoCompletado = "hidden controls new-div-file-upload";
            requeridoAdjuntoCompletado = "";
        }

        //PARA DAR FORMATO A LA LISTA DE ESTADOS DENTRO DE LA ORDEN
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



} else {
    alert(`No se logró obtener la orden ${identificador}`);
}

//LLAMADO A FUNCIÓN PARA LLENAR LOS SELECT Y OPTION DE LA ORDEN
order ? fillOrderOptions() : {};

//LLAMADO A FUNCIÓN PARA OBTENER LAS CATEGORIAS DE LA ÓRDEN
order ? fillOrderCategories() : {};



//FUNCIÓN PARA LLENAR LOS SELECT Y OPTION DE LA ORDEN
const fillOrderOptions = () => {

    console.log("Entré al fillOptions en OrderView")

    //$(window).on("load", function () {

    $(document).ready(function () {

        //SELECT TIPO MANTENIMIENTO
        const selectTipoMantenimiento = document.getElementById('orderType');
        //getTiposMantenimientos YA SE OBTUVO y se utiliza a continuación
        const optionTipoMantenimiento = listSelect(getTiposMantenimientos, "nombre"); // Paso la clave "nombre"
        loadSelectContentAndSelected(optionTipoMantenimiento, selectTipoMantenimiento, getTipoMantenimiento);
        console.log("Tipo mantenimiento seleccionado: " + getTipoMantenimiento);

        //SELECT ESTADO
        const selectEstado = document.getElementById('orderStatus');
        //getEstados YA SE OBTUVO y se utiliza a continuación
        const optionEstado = listSelect(getEstados, "nombre"); // Paso la clave "nombre"
        loadSelectContentAndSelected(optionEstado, selectEstado, getEstado);
        console.log("Estado seleccionado: " + getEstado);

        //SELECT AREA
        const selectArea = document.getElementById('orderAreasOptions');
        //getAreas YA SE OBTUVO y se utiliza a continuación
        const optionArea = listSelect(getAreas, "nombreArea"); // Paso la clave "nombreArea"
        loadSelectContentAndSelected(optionArea, selectArea, getArea);
        console.log("Área seleccionada: " + getArea);

        //SELECT TIPOS DE ACTIVOS
        const selectTipoActivo = document.getElementById('orderAssetType');
        //getTiposActivos YA SE OBTUVO y se utiliza a continuación
        const optionTipoActivo = listSelect(getTiposActivos, "nombre"); // Paso la clave "nombre"
        loadSelectContentAndSelected(optionTipoActivo, selectTipoActivo, getTipoActivo);
        console.log("Tipo de activo seleccionado: " + getTipoActivo);

        //SELECT TALLER
        const selectTaller = document.getElementById('orderProvider');
        //getTalleres YA SE OBTUVO y se utiliza a continuación
        const optionTaller = listSelect(getTalleres, "nombre"); // Paso la clave "nombre"
        loadSelectContentAndSelected(optionTaller, selectTaller, getTaller);
        console.log("Taller seleccionado: " + getTaller);

    });
    //});

}

//FUNCIÓN PARA OBTENER LAS CATEGORIAS DE LA ÓRDEN
const fillOrderCategories = () => {

    console.log("Entré al fillOrderServiceCategories en OrderView")

    //OBTENCIÓN DE LAS CATEGORÍAS DE SERVICIO
    let categoriasJSON = 'http://192.168.0.13:8080/static/js/data/serviceCategories.JSON';
    let titleCategoriasJSON = 'Categorías';
    getCategorias = getJson(categoriasJSON, titleCategoriasJSON);

    let cont = 0;

    //RECORRIDO DE TODAS LAS CATEGORIAS
    for (const category of getCategorias) {

        cont++; // util para for,name,id de cada categoría
        let checkboxSeleccionado = ''
        let requerido = '';
        let deshabilitado = 'disabled';
        let costo = 0;

        //El getCategoriasOrden fue llenada al consultar la órden arriba
        getCategoriasOrden.forEach(element => {

            if (category.idCategoriaServicio == element.categoriaServicioIdCategoriaServicio) {
                console.log(`idCategoría: ${element.categoriaServicioIdCategoriaServicio} - Categoría: ${category.nombre} - Costo: ${element.costo} - Orden: ${identificadorGlobal}`)
                checkboxSeleccionado = 'checked';
                requerido = 'required';
                deshabilitado = '';
                costo = element.costo;
            }

        })


    }
}


//FUNCIÓN PARA CREAR EL JSON QUE SERÁ PASADO A LA API
const guardarOrdenParaJSON = () => {

    banderaSeleccionCategoria = false; // Reinicio a false para verificar de nuevo la selección de categorías
    banderaFaltaAdjunto = false; // Reinicio

    console.log("Entré a la función")

    ordenJSON.ordenEstados = []; // reinicio el estado por cada activo
    ordenJSON.ordenCategorias = []; // reinicio las categorías por cada activo

    ordenJSON.idOrden = idUrl;
    ordenJSON.fechaCreacion = getFechaCreacion;
    ordenJSON.fechaInicial = document.getElementById('rangeStartDate').value;
    ordenJSON.fechaFinal = document.getElementById('rangeEndDate').value;
    ordenJSON.observaciones = document.getElementById('orderNotes').value;

    /** Necesarias para el Calendario porque las utiliza la biblioteca Fullcalendar */
    // Pero no se almacenan en Base de Datos
    //ordenJSON.title = ""
    ordenJSON.start = ordenJSON.fechaInicial;
    ordenJSON.end = ordenJSON.fechaFinal;
    ordenJSON.allDay = false
    /** */

    let valorPatente = document.getElementById('valorPatente');
    //getVehiculos YA SE OBTUVO y se utiliza a continuación
    const vehiculo = getVehiculos.find((vehiculo) => vehiculo.ppuVehiculo == valorPatente.textContent.trim());
    if (vehiculo) {
        //getActivos YA SE OBTUVO y se utiliza a continuación
        const activo = getActivos.find((activo) => activo.vehiculoIdVehiculo == vehiculo.idVehiculo);
        if (activo) {
            ordenJSON.activoIdActivo = activo.idActivo;
        }
    }

    //getTiposMantenimientos YA SE OBTUVO y se utiliza a continuación
    const tipoOrden = getTiposMantenimientos.find((tipoOrden) => tipoOrden.nombre == document.getElementById('orderType').value);
    if (tipoOrden) {
        ordenJSON.tipoOrdenIdTipoOrden = tipoOrden.idTipoOrden;
    }

    //getTalleres YA SE OBTUVO y se utiliza a continuación
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
            banderaFaltaAdjunto = true; // Control para creación del JSON

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


    let costoRequerido = false; //Control para creación del JSON
    //LAS CATEGORIAS SELECCIONADAS EN LA ORDEN
    const categoriasSeleccionadas = document.getElementById('categoriesContainer').getElementsByClassName('row-fluid');
    let contCategory = 0;

    //RECORRO LAS CATEGORÍAS SELECCIONADAS
    for (const cat of categoriasSeleccionadas) {
        contCategory++; // UTIL para for,name,id de las categorías en el html
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

                //getCategorias YA SE OBTUVO y se utiliza a continuación
                const category = getCategorias.find((c) => (c.codigo + ' - ' + c.nombre) == labelCategoryCheckbox.textContent.trim());
                if (category) {

                    //OBJETO CON LOS DATOS DE LA CATEGORIA
                    let categoriasOrdenJSON = {
                        "ordenIdOrden": idUrl,
                        "categoriaServicioIdCategoriaServicio": category.idCategoriaServicio,
                        "costo": parseFloat(appendedPrependedInput.value),
                        "fechaCategoriaAsignada": ordenJSON.fechaCreacion,
                        "observacionCategoria": ""
                    }

                    //AGREGO EL OBJETO AL ARREGLO DE CATEGORIAS DE LA ORDEN
                    ordenJSON.ordenCategorias.push(categoriasOrdenJSON);
                }
            }
        }

    }


    //CREACIÓN DEL JSON DE LA ORDEN CONSULTADA
    if (banderaSeleccionCategoria == true
        && costoRequerido == false
        && banderaFaltaAdjunto == false) {
        //alert("cambió el valor de banderaSeleccionCategoria a TRUE y costoRequerido a FALSE")
        sessionStorage.setItem(`ActualizacionOrden_${idUrl}`, JSON.stringify(ordenJSON));
    }

}

//MOSTRAR JSON EXISTENTE EN SESSION STORAGE
const mostrarStorageJSON = () => {

    if (sessionStorage.getItem(`ActualizacionOrden_${idUrl}`)) {
        console.log(`\n\nActualizacionOrden_${idUrl}\n\n` + sessionStorage.getItem(`ActualizacionOrden_${idUrl}`));
        //sessionStorage.removeItem(`NuevaOrden_${contadorOrdenes}`);
    }

}

//ELIMINAR JSON DE SESSIÓN STORAGE
const removerVariablesStorageJSON = () => {

    if (sessionStorage.getItem(`ActualizacionOrden_${idUrl}`)) {
        sessionStorage.removeItem(`ActualizacionOrden_${idUrl}`);
    }

}

$(document).ready(function () {

    //EJECUCIÓN DE GUARDADO
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
            if (!appendedPrependedInput.disabled) {
                sumCostos = (parseFloat(appendedPrependedInput.value) + parseFloat(sumCostos)).toFixed(2);
            }
        }

        if (isNaN(sumCostos)) {
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

});