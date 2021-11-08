import AbstractView from "./AbstractView.js";
import TableLanguage from "./TableLanguage.js";
import {
    getAreas, getBodegas, getTiposActivos, getActivos, getPlanes,
    getVehiculos, getGPS, getMarcas, getModelos,
    listAllElement,
    loadSelectContent,
    loadSelectContentAndSelected,
    loadDivSelectedPlan,
    loadSelectContentAndSelectedMultiple,
    listSelect,
    listAnioAndSelected,
    currentDate
} from "./Options.js"

let getArea = ``;
let getBodega = ``;
let getTipoActivo = ``;
let getMarca = ``;
let getModelo = ``;
let getGPSImei = ``;
let getActivoKmGps = ``;
let getActivoHorometro = ``;
let getUsoActivo = ``;
let getAnio = ``;
let getPlan = ``;
let getPlanesActivo = [];
let compActivoPatente = ``;

//Variable para controlar la creación de JSON de activo
let banderaActivo = false;
let banderaPlanes = false;

//VARIABLE PARA JSON
let nuevoActivoJSON = {
    "anio": null,
    "dadoDeBaja": false,
    "vehiculoIdVehiculo": null,
    "areaIdArea": null,
    "bodegaActivosIdBodegaActivos": null,
    "tipoActivoIdTipoActivo": null,
    "activoPlanes": [],
    "documentos": []
};

export default class extends AbstractView {
    constructor(params) {
        super(params);
        //this.postId = params.id;
        this.setTitle(`Nuevo activo`);
    }

    async getHtml() {

        let assetHTML = ``;
        let fillAsset = ''
        let km_hora = ''
        let getActivoUso = ``;

        fillAsset = `<h1></h1>
            <form id="assetFormQuery_new" action="/activos">

                <!--IDENTIFICADOR DEL ACTIVO-->
                <div id="assetsId_new" class="control-group order-identity border-transparent-1px">
                    <h1>Nuevo activo</h1>
                </div>


                <!-- SECCIONES -->
                <div id="assetSections" class="tabbable">
                    <ul class="nav nav-tabs">
                        <li id="tabDatos" class="active"><a href="#tab1" data-toggle="tab">Datos</a></li>
                        <li id="tabDocumentos"><a href="#tab2" data-toggle="tab">Documentos</a></li>
                    </ul>
                    <div class="tab-content">
                    <div class="tab-pane active" id="tab1">

                        <!--DATOS DEL ACTIVO-->
                        <div id="assetData_new" class="control-group border-transparent-1px">

                            <!--ÁREA DEL ACTIVO-->
                            <div class="control-group">
                                <label class="span2" for="assetAreasOptions_new">
                                    <h5>Área</h5>
                                </label>
                                <div class="controls">
                                    <select id="assetAreasOptions_new" required>
                                    </select>
                                </div>
                            </div>

                            <!--TIPO DE ACTIVO-->
                            <div class="control-group">
                                <label class="span2" for="assetType_new">
                                    <h5>Tipo</h5>
                                </label>
                                <div class="controls">
                                    <select id="assetType_new" required>
                                    </select>
                                </div>
                            </div>

                            <!--PATENTE-->
                            <div class="control-group">
                                <label class="span2" for="assetPatent_new">
                                    <h5>Patente</h5>
                                </label>
                                <div class="controls">
                                    <select id="assetPatent_new" required disabled>
                                    </select>
                                </div>
                            </div>

                            <!--MARCA DEL ACTIVO-->
                            <div class="control-group">
                                <label class="span2" for="assetBrand_new">
                                    <h5>Marca</h5>
                                </label>
                                <div class="controls">
                                    <select id="assetBrand_new" required disabled>
                                    </select>
                                </div>
                            </div>

                            <!--MODELO DEL ACTIVO-->
                            <div class="control-group">
                                <label class="span2" for="assetModel_new">
                                    <h5>Modelo</h5>
                                </label>
                                <div class="controls">
                                    <!--<input id="assetModel_new" type="text" min="3" maxlength="15"
                                        value="" required>-->
                                    <select id="assetModel_new" required disabled>
                                    </select>
                                </div>
                            </div>

                            <!--AÑO DEL ACTIVO-->
                            <div class="control-group">
                                <label class="span2" for="assetYear_new">
                                    <h5>Año</h5>
                                </label>
                                <div class="controls">
                                    <select id="assetYear_new" required>
                                    </select>
                                </div>
                            </div>

                            <!--HORAS Ó KM DE USO DEL ACTIVO-->
                            <div class="control-group">
                                <label class="span2" for="assetUse_new">
                                    <h5>Uso</h5>
                                </label>
                                <div class="controls">
                                    <input id="assetUse_new" type="text" min="3" maxlength="15" 
                                        value="" required disabled>
                                </div>
                            </div>

                            <!--GPS DEL ACTIVO-->
                            <div class="control-group">
                                <label class="span2" for="assetGPS_new">
                                    <h5>GPS</h5>
                                </label>
                                <div class="controls">
                                    <input id="assetGPS_new" type="text" min="3" maxlength="15" 
                                        value="" disabled>
                                </div>
                            </div>

                            <!--BODEGA DEL ACTIVO-->
                            <div class="control-group">
                                <label class="span2" for="assetWareHousesOptions_new">
                                    <h5>Bodega</h5>
                                </label>
                                <div class="controls">
                                    <select id="assetWareHousesOptions_new" required>
                                    </select>
                                </div>
                            </div>

                            <!--PLANES DE MANTENIMIENTO DEL ACTIVO-->
                            <div class="control-group">
                                <label class="span2" for="assetPlan_new">
                                    <h5>Planes</h5>
                                </label>
                                <div class="controls">
                                    <!--<select id="assetPlan_new" multiple required size="10">-->
                                    <select id="assetPlan_new">
                                    </select>
                                </div>
                                <div class="controls">
                                    <div class="controls btn-group" id="buttonsSelectedPlan_new"></div>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div class="tab-pane" id="tab2">

                        <!--DOCUMENTOS DEL ACTIVO-->
                        <div id="assetDocuments_new" class="new-div-documents control-group border-transparent-1px">
                                
                            <!--SEGURO CIVIL-->
                            <div class="control-group">
                                <label class="span3">
                                    <h5>Seguro obligatorio</h5>
                                </label>
                                <div class="controls new-div-file-upload">
		                            <label id="clickFileSeguro_new" class='btn btn-primary' href='javascript:;' for="fileSeguro_new">
                                        <i class="fa fa-cloud-upload" aria-hidden="true"></i>
                                        <input id="fileSeguro_new" type="file" class="new-input-file"
                                            name="fileSeguro_new" size="40" accept="application/pdf">
		                            </label>
                                    <a href="/static/img/Prueba.pdf" download>
                                        <span class='label label-info' id="fileInfoSeguro_new" required style="margin-bottom: 5px;"></span>
                                    </a>
                                </div>     
                                <div class="controls">
                                    <div class="input-prepend input-append">
                                        <span class="add-on">Vence</span>
                                        <input id="expireSeguro_new" type="date" name="expireSeguro_new" 
                                            value="" required style="border-radius:3px;"
                                            min="${currentDate().slice(0, 10)}">
                                    </div>
                                </div>
                            </div>
        
                            <!--PADRÓN VEHICULAR-->
                            <div class="control-group">
                                <label class="span3">
                                    <h5>Padrón vehicular</h5>
                                </label>
                                <div class="controls new-div-file-upload">
		                            <label class='btn btn-primary' href='javascript:;' for="filePadron_new">
                                        <i class="fa fa-cloud-upload" aria-hidden="true"></i>
			                            <input id="filePadron_new" type="file" class="new-input-file"
                                            name="filePadron_new" size="40" accept="application/pdf">
		                            </label>
                                    <a href="/static/img/Prueba.pdf" download>
                                        <span class='label label-info' id="fileInfoPadron_new" required style="margin-bottom: 5px;"></span>
                                    </a>
	                            </div>
                                <div class="controls">
                                    <div class="input-prepend input-append">
                                        <span class="add-on">Vence</span>
                                        <input id="expirePadron_new" type="date" name="expirePadron_new" 
                                            value="" required style="border-radius:3px;"
                                            min="${currentDate().slice(0, 10)}">
                                    </div>
                                </div>
                            </div>
        
                            <!--PERMISO DE CIRCULACIÓN-->
                            <div class="control-group">
                                <label class="span3">
                                    <h5>Permiso de circulación</h5>
                                </label>
                                <div class="controls new-div-file-upload">
		                            <label class='btn btn-primary' href='javascript:;' for="fileCirculacion_new">
                                        <i class="fa fa-cloud-upload" aria-hidden="true"></i>
			                            <input id="fileCirculacion_new" type="file" class="new-input-file"
                                            name="fileCirculacion_new" size="40" accept="application/pdf">
		                            </label>
                                    <a href="/static/img/Prueba.pdf" download>
                                        <span class='label label-info' id="fileInfoCirculacion_new" required style="margin-bottom: 5px;"></span>
                                    </a>
	                            </div>
                                <div class="controls">
                                    <div class="input-prepend input-append">
                                        <span class="add-on">Vence</span>
                                        <input id="expireCirculacion_new" type="date" name="expireCirculacion_new" 
                                            value="" required style="border-radius:3px;"
                                            min="${currentDate().slice(0, 10)}">
                                    </div>
                                </div>
                            </div>

                            <!--REVISIÓN TÉCNICA-->
                            <div class="control-group">
                                <label class="span3">
                                    <h5>Revisión técnica</h5>
                                </label>
                                <div class="controls new-div-file-upload">
		                            <label class='btn btn-primary' href='javascript:;' for="fileRevision_new">
                                        <i class="fa fa-cloud-upload" aria-hidden="true"></i>
			                            <input id="fileRevision_new" type="file" class="new-input-file"
                                            name="fileRevision_new" size="40" accept="application/pdf">
		                            </label>
                                    <a href="/static/img/Prueba.pdf" download>
                                        <span class='label label-info' id="fileInfoRevision_new" required style="margin-bottom: 5px;"></span>
                                    </a>	                                    
	                            </div>
                                <div class="controls">
                                    <div class="input-prepend input-append">
                                        <span class="add-on">Vence</span>
                                        <input id="expireRevision_new" type="date" name="expireRevision_new" 
                                            value="" required style="border-radius:3px;"
                                            min="${currentDate().slice(0, 10)}">
                                    </div>
                                </div>
                            </div>


                            <!-- EJEMPLO - BORRADOR INICIAL - NO BORRAR -->
                            <!--<div class="control-group">
                                <label class="span3" for="assetRevision">
                                    <h5>Revisión técnica</h5>
                                </label>
                                <div class="controls">
                                    <input type="file" id="assetRevision" name="assetRevision" required>
                                </div>
                                <div class="controls">
                                    <div class="input-prepend input-append">
                                        <span class="add-on">Vence</span>
                                        <input type="date" id="min" name="min" style="border-radius:3px;">
                                    </div>
                                </div>
                            </div>-->


                        </div>
                    </div>
                </div>
                    

                <!--DAR DE BAJA-->
                <div id="downAsset_new" class="control-group border-transparent-1px order-identity">
                    <div class="row-fluid">
                        <div class="span4">
                            <label class="checkbox">
                                <b>Dar de baja</b>
                                <input type="checkbox" id="downAssetOption" disabled value="optionDown">
                            </label>
                        </div>
                    </div>
                </div>


                <!--GUARDAR / CANCELAR-->
                <div id="assetActionButtons_new" class="control-group">
                    <div class="span12 text-right border-transparent-1px">
                        <!--<a id="saveAsset_new" class="btn btn-primary" href="/activos">Guardar</a>
                        <a id="dontSaveAsset_new" class="btn btn-primary" href="/activos">Cancelar</a>-->
                        <button id="saveAsset_new" class="btn btn-primary" type="submit">Guardar</button>
                        <button id="dontSaveAsset_new" class="btn btn-primary" type="button" onclick="window.history.back();">Cancelar</button>
                    </div>
                </div>
            </form>`;

        assetHTML = assetHTML.concat(fillAsset)

        $('#pages').html(assetHTML)

        fillOptions()

        return assetHTML;
    }
}


const fillOptions = () => {

    console.log("Entré al fillOptions en NewAsset")

    $(window).on("load", function () {

        $(document).ready(function () {

            // Select area -- emplea los datos obtenidos en getJson();
            const selectArea = document.getElementById('assetAreasOptions_new');
            const optionArea = listSelect(getAreas, "nombreArea"); // Paso la clave "nombre"
            loadSelectContent(optionArea, selectArea);

            // Select bodega -- emplea los datos obtenidos en getJson();
            const selectBodega = document.getElementById('assetWareHousesOptions_new');
            const optionBodega = listSelect(getBodegas, "nombre"); // Paso la clave "nombre"
            loadSelectContent(optionBodega, selectBodega)

            // Select tipo de activo -- emplea los datos obtenidos en getJson();
            const selectTipoActivo = document.getElementById('assetType_new');
            const optionTipoActivo = listSelect(getTiposActivos, "nombre"); // Paso la clave "nombre"
            loadSelectContent(optionTipoActivo, selectTipoActivo);

            // Select activo -- emplea los datos obtenidos en getJson();
            // Se debe hacer una verificación para mostrar solo los activos que no han sido creados en el módulo de mantenimiento
            /*const selectActivo = document.getElementById('assetPatent_new');
            const optionActivo = listSelect(getActivos, "activo"); // Paso la clave "activo"
            loadSelectContent(optionActivo, selectActivo);*/

            const selectVehiculo = document.getElementById('assetPatent_new');
            const optionVehiculo = listSelect(getVehiculos, "ppuVehiculo"); // Paso la clave "ppuVehiculo"
            loadSelectContent(optionVehiculo, selectVehiculo);

            // Select Marca -- emplea los datos obtenidos en getJson();
            const selectMarca = document.getElementById('assetBrand_new');
            const optionMarca = listSelect(getMarcas, "nombreMarcaVehiculo"); // Paso la clave "nombreMarcaVehiculo"
            loadSelectContent(optionMarca, selectMarca);
            //loadSelectContentAndSelected(optionMarca, selectMarca, getMarca);
            //console.log("Marca seleccionada: " + getMarca);

            // Select Modelo -- emplea los datos obtenidos en getJson();
            const selectModelo = document.getElementById('assetModel_new');
            const optionModelo = listSelect(getModelos, "nombreModeloVehiculo") // Paso la clave "nombreModeloVehiculo"
            loadSelectContent(optionModelo, selectModelo);
            //loadSelectContentAndSelected(optionModelo, selectModelo, getModelo);
            //console.log("Modelo seleccionado: " + getModelo);

            // Select Anio desde Options.js
            const selectAnio = document.getElementById('assetYear_new');
            listAnioAndSelected(selectAnio, getAnio);

            // Solo listado de Planes para agregar
            // Select planes -- emplea los datos obtenidos en getJson();
            const selectPlan = document.getElementById('assetPlan_new');
            const optionPlan = listSelect(getPlanes, "nombre"); // Paso la clave "nombre"
            loadSelectContent(optionPlan, selectPlan);

            // Div con Planes del Activo
            //const divPlanes = document.getElementById('buttonsSelectedPlan_new');
            //loadDivSelectedPlan(divPlanes, getPlanesActivo, "nombre"); // Paso la clave "nombre"

        });

    });

}

const guardarActivoJSON = () => {

    banderaActivo = false;
    banderaPlanes = false;
    nuevoActivoJSON.activoPlanes = []; // reinicio planes
    nuevoActivoJSON.documentos = []; // reinicio documentos

    let selectAnio = document.getElementById('assetYear_new');
    nuevoActivoJSON.anio = selectAnio.options[selectAnio.selectedIndex].text;
    nuevoActivoJSON.dadoDeBaja = false;

    let selectPatente = document.getElementById('assetPatent_new');
    const vehiculo = getVehiculos.find((vehiculo) => vehiculo.ppuVehiculo.trim() == selectPatente.value.trim());
    if (vehiculo) {
        nuevoActivoJSON.vehiculoIdVehiculo = vehiculo.idVehiculo;
    }

    let selectArea = document.getElementById('assetAreasOptions_new');
    const area = getAreas.find((area) => area.nombreArea == selectArea.value);
    if (area) {
        nuevoActivoJSON.areaIdArea = area.idArea;
    }

    let selectBodega = document.getElementById('assetWareHousesOptions_new');
    const bodega = getBodegas.find((bodega) => bodega.nombre == selectBodega.value);
    if (bodega) {
        nuevoActivoJSON.bodegaActivosIdBodegaActivos = bodega.idBodegaActivos;
    }

    let selectTipoActivo = document.getElementById('assetType_new');
    const tipoActivo = getTiposActivos.find((tipoActivo) => tipoActivo.nombre == selectTipoActivo.value);
    if (tipoActivo) {
        nuevoActivoJSON.tipoActivoIdTipoActivo = tipoActivo.idTipoActivo;
    }

    let selectMarca = document.getElementById('assetBrand_new');
    let selectModelo = document.getElementById('assetModel_new');
    let usoActivo = document.getElementById('assetUse_new');

    let fileInfoSeguro_new = document.getElementById('fileInfoSeguro_new');
    let expireSeguro_new = document.getElementById('expireSeguro_new');
    let docSeguroObligatorio = {
        //"activoIdActivo: "
        "rutaAdjunto": `/path/${fileInfoSeguro_new.textContent.trim()}`,
        "fechaAdjunto": currentDate(),
        "fechaVencimiento": expireSeguro_new.value,
        "tipoDocumentoIdTipoDocumento": 1
    }

    let fileInfoPadron_new = document.getElementById('fileInfoPadron_new');
    let expirePadron_new = document.getElementById('expirePadron_new');
    let docPadronVehicular = {
        //"activoIdActivo: "
        "rutaAdjunto": `/path/${fileInfoPadron_new.textContent.trim()}`,
        "fechaAdjunto": currentDate(),
        "fechaVencimiento": expirePadron_new.value,
        "tipoDocumentoIdTipoDocumento": 2
    }

    let fileInfoCirculacion_new = document.getElementById('fileInfoCirculacion_new');
    let expireCirculacion_new = document.getElementById('expireCirculacion_new');
    let docPermisoCirculacion = {
        //"activoIdActivo: "
        "rutaAdjunto": `/path/${fileInfoCirculacion_new.textContent.trim()}`,
        "fechaAdjunto": currentDate(),
        "fechaVencimiento": expireCirculacion_new.value,
        "tipoDocumentoIdTipoDocumento": 3
    }

    let fileInfoRevision_new = document.getElementById('fileInfoRevision_new');
    let expireRevision_new = document.getElementById('expireRevision_new');
    let docRevisionTecnica = {
        //"activoIdActivo: "
        "rutaAdjunto": `/path/${fileInfoRevision_new.textContent.trim()}`,
        "fechaAdjunto": currentDate(),
        "fechaVencimiento": expireRevision_new.value,
        "tipoDocumentoIdTipoDocumento": 4
    }

    nuevoActivoJSON.documentos.push(docSeguroObligatorio);
    nuevoActivoJSON.documentos.push(docPadronVehicular);
    nuevoActivoJSON.documentos.push(docPermisoCirculacion);
    nuevoActivoJSON.documentos.push(docRevisionTecnica);

    const planesSeleccionados = document.getElementById('buttonsSelectedPlan_new').getElementsByClassName('name-plan');
    //let contPlans = 0;
    for (const element of planesSeleccionados) {

        banderaPlanes = true;
        //contPlans++;

        const plan = getPlanes.find((plan) => plan.nombre == element.textContent);
        if (plan) {

            let planesNuevoActivoJSON = {
                //"activoIdActivo": 
                "planMantenimientoIdPlanMantenimiento": plan.idPlanMantenimiento
            }

            nuevoActivoJSON.activoPlanes.push(planesNuevoActivoJSON);
        }

    }

    if (selectAnio.options[selectAnio.selectedIndex].text != ''
        && selectPatente.options[selectPatente.selectedIndex].text != ''
        && selectArea.options[selectArea.selectedIndex].text != ''
        && selectBodega.options[selectBodega.selectedIndex].text != ''
        && selectTipoActivo.options[selectTipoActivo.selectedIndex].text != ''
        && selectMarca.options[selectMarca.selectedIndex].text != ''
        && selectModelo.options[selectModelo.selectedIndex].text != ''
        //&& usoActivo.value != ''
        && fileInfoSeguro_new.textContent.trim() != ''
        && fileInfoPadron_new.textContent.trim() != ''
        && fileInfoCirculacion_new.textContent.trim() != ''
        && fileInfoRevision_new.textContent.trim() != ''
        && expireSeguro_new.value != ''
        && expirePadron_new.value != ''
        && expireCirculacion_new.value != ''
        && expireRevision_new.value != '') {

        banderaActivo = true;

    }

    //Creación del JSON
    if (banderaActivo == true && banderaPlanes == true) {
        sessionStorage.setItem(`NuevoActivo`, JSON.stringify(nuevoActivoJSON));
    }

}

const removerVariableActivoStorageJSON = () => {

    if (sessionStorage.getItem(`NuevoActivo`)) {
        sessionStorage.removeItem(`NuevoActivo`);
    }

}

const mostrarActivoStorageJSON = () => {

    if (sessionStorage.getItem(`NuevoActivo`)) {
        console.log(`\n\nNuevoActivo\n\n` + sessionStorage.getItem(`NuevoActivo`));
        //alert(`\n\nNuevoActivo\n\n` + JSON.stringify(nuevoActivoJSON, undefined, 4));
        //sessionStorage.removeItem(`NuevoActivo`);
    }

}


$(document).ready(function () {

    $('div #pages').on('click', 'button#saveAsset_new', function (e) {

        guardarActivoJSON();

        if ($('#assetPatent_new').val().length == '') {
            alert('Debe seleccionar una patente de alguna área');
            $('html, body').animate({
                scrollTop: $(`#assetAreasOptions_new`).offset().top - 50
            }, 1000)
            e.preventDefault();
        }

        if ($('#assetYear_new').val().length != ''
            && $('#assetPatent_new').val().length != ''
            && $('#assetAreasOptions_new').val().length != ''
            && $('#assetWareHousesOptions_new').val().length != ''
            && $('#assetType_new').val().length != ''
            && $('#assetBrand_new').val().length != ''
            && $('#assetModel_new').val().length != ''
            && $('#assetUse_new').val().length != '') {

            if (banderaPlanes == false) {
                alert('Debe Seleccionar al menos un plan');

                $('#tabDocumentos').removeClass("active");
                $('#tabDatos').addClass("active");
                $('#tab2').removeClass("active");
                $('#tab1').addClass("active");

                $('html, body').animate({
                    scrollTop: $(`#assetPlan_new`).offset().top - 50
                }, 1000)

                e.preventDefault();

            } else {

                $('#tabDatos').removeClass("active");
                $('#tabDocumentos').addClass("active");
                $('#tab1').removeClass("active");
                $('#tab2').addClass("active");

                if ($.trim($('#fileInfoSeguro_new').text()) == '') {
                    alert('Debe adjuntar el "Seguro obligatorio"');
                    e.preventDefault();
                } else {
                    if ($.trim($('#fileInfoPadron_new').text()) == '') {
                        alert('Debe adjuntar el "Padrón vehicular"');
                        e.preventDefault();
                    } else {
                        if ($.trim($('#fileInfoCirculacion_new').text()) == '') {
                            alert('Debe adjuntar el "Permiso de circulación"')
                            e.preventDefault();
                        } else {
                            if ($.trim($('#fileInfoRevision_new').text()) == '') {
                                alert('Debe adjuntar la "Revisión técnica"')
                                e.preventDefault();
                            }
                        }
                    }
                }
            }
        } else {
            $('#tabDatos').addClass("active");
            $('#tabDocumentos').removeClass("active");
            $('#tab1').addClass("active");
            $('#tab2').removeClass("active");
        }

        mostrarActivoStorageJSON();

    });


    //Sólo Activos (patentes) de un área
    $('div #pages').on('change', 'select#assetAreasOptions_new', e => {

        let vehiculosArea = [];
        const areaSeleccionada = getAreas.find((area) => area.nombreArea == e.target.value);
        if (areaSeleccionada) {

            const patentes = getVehiculos.filter((vehiculo) => vehiculo.areaIdArea == areaSeleccionada.idArea);

            if (patentes) {

                vehiculosArea = listAllElement(patentes);

                if (vehiculosArea.length) {

                    $('select#assetPatent_new').removeAttr("disabled");
                    $(`#assetBrand_new`).val("");
                    $(`#assetModel_new`).val("");
                    $(`input#assetUse_new`).val("");
                    $(`input#assetGPS_new`).val("");

                    console.log(vehiculosArea);
                    const selectPatente = document.getElementById('assetPatent_new');
                    const optionPatente = listSelect(vehiculosArea, "ppuVehiculo"); // Paso la clave "ppuVehiculo"
                    loadSelectContent(optionPatente, selectPatente);

                } else {

                    $(`#assetPatent_new`).val("");
                    $(`#assetPatent_new`).attr("disabled", "disabled");
                    $(`#assetBrand_new`).val("");
                    $(`#assetModel_new`).val("");
                    $(`input#assetUse_new`).val("");
                    $(`input#assetGPS_new`).val("");
                }

            }

        } else {

            $(`#assetPatent_new`).val("");
            $(`#assetPatent_new`).attr("disabled", "disabled");
            $(`#assetBrand_new`).val("");
            $(`#assetModel_new`).val("");
            $(`input#assetUse_new`).val("");
            $(`input#assetGPS_new`).val("");
        }

    })

    //Mostrar datos ligados a la patente (activo) seleccionada
    $('div #pages').on('change', 'select#assetPatent_new', e => {

        const patenteSeleccionada = getVehiculos.find((vehiculo) => vehiculo.ppuVehiculo == e.target.value);
        getUsoActivo = '';
        if (patenteSeleccionada) {
            console.log("Patente: " + patenteSeleccionada.ppuVehiculo)

            getActivoKmGps = parseFloat(patenteSeleccionada.kmGps).toFixed(2);
            getActivoHorometro = parseFloat(patenteSeleccionada.horometro).toFixed(2);
            getUsoActivo = getActivoKmGps.toString().concat(" Km - ", getActivoHorometro.toString(), " Horas");
            console.log("Uso: " + getUsoActivo);

            const gpsImeiSeleccionado = getGPS.find((gps) => gps.idGps == patenteSeleccionada.gpsIdGps);
            getGPSImei = '';
            if (gpsImeiSeleccionado) {
                getGPSImei = gpsImeiSeleccionado.imeiGps;
                console.log("GPS: " + getGPSImei)
            }

            const modeloSeleccionado = getModelos.find((modelo) => modelo.idModeloVehiculo == patenteSeleccionada.modeloVehiculoIdModeloVehiculo);
            getModelo = '';
            if (modeloSeleccionado) {
                getModelo = modeloSeleccionado.nombreModeloVehiculo;
                console.log("Modelo: " + getModelo)

                const marcaSeleccionada = getMarcas.find((marca) => marca.idMarcaVehiculo == modeloSeleccionado.marcaVehiculoIdMarcaVehiculo);
                getMarca = '';
                if (marcaSeleccionada) {
                    getMarca = marcaSeleccionada.nombreMarcaVehiculo;
                    console.log("Marca: " + getMarca)
                }
            }

            //$(`#assetBrand_new option[value=${getMarca}]`).attr('selected','selected');
            //$(`#assetModel_new option[value=${getModelo}]`).attr('selected','selected');
            $(`#assetBrand_new`).val(getMarca);
            $(`#assetModel_new`).val(getModelo);
            $(`input#assetUse_new`).val(getUsoActivo);
            $(`input#assetGPS_new`).val(getGPSImei);

        } else {

            $(`#assetBrand_new`).val("");
            $(`#assetModel_new`).val("");
            $(`input#assetUse_new`).val("");
            $(`input#assetGPS_new`).val("");
        }

    })


    //Agregar Alert Button al seleccionar Plan de Mantenimiento en el activo
    $('div #pages').on('change', 'select#assetPlan_new', e => {

        let divAgregados = document.getElementById('buttonsSelectedPlan_new');
        let texto = e.target.value;

        if ($(`#buttonsSelectedPlan_new:contains(${texto})`).length <= 0) {

            let divChild = document.createElement("div");
            divChild.className = "alert new-alert";
            let buttonChild = document.createElement("button");
            buttonChild.setAttribute("type", "button");
            buttonChild.setAttribute("class", "close new-close");
            buttonChild.setAttribute("data-dismiss", "alert");
            buttonChild.textContent = `x`;
            let strongChild = document.createElement("strong");
            strongChild.setAttribute("class", "name-plan");
            strongChild.innerHTML = `${e.target.value}`;

            divChild.appendChild(buttonChild);
            divChild.appendChild(strongChild);
            divAgregados.appendChild(divChild);

        }

    });


    $("div #pages").on('change', "input#fileSeguro_new", function () {
        var filename = $(this).val().replace(/C:\\fakepath\\/i, '')
        console.log(filename);
        //$('#fileInfoSeguro_new').val(filename); //para input
        $('#fileInfoSeguro_new').html(filename); //para input
    });

    $("div #pages").on('change', "input#filePadron_new", function () {
        var filename = $(this).val().replace(/C:\\fakepath\\/i, '')
        console.log(filename);
        $('#fileInfoPadron_new').html(filename);
    });

    $("div #pages").on('change', "input#fileCirculacion_new", function () {
        var filename = $(this).val().replace(/C:\\fakepath\\/i, '')
        console.log(filename);
        $('#fileInfoCirculacion_new').html(filename);
    });

    $("div #pages").on('change', "input#fileRevision_new", function () {
        var filename = $(this).val().replace(/C:\\fakepath\\/i, '')
        console.log(filename);
        $('#fileInfoRevision_new').html(filename);
    });

});