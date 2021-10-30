import AbstractView from "./AbstractView.js";
import TableLanguage from "./TableLanguage.js";
import {
    areas, bodegas, tiposActivos, marcas, planes,
    getAreas, getBodegas, getTiposActivos, getActivos, getPlanes,
    listAllElement,
    loadSelectContent,
    loadSelectContentAndSelected,
    loadDivSelected,
    loadSelectContentAndSelectedMultiple,
    listSelect,
    listAnioAndSelected,
    currentDate
} from "./Options.js"

let getArea = ``;
let getBodega = ``;
let getTipoActivo = ``;
let getMarca = ``;
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
    "idVehiculo": null,
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

        //let identificador = this.postId;
        let assetHTML = ``;

        //$.ajax({
        //    type: 'GET',
        //    url: 'http://192.168.0.13:8080/static/js/data/assets.JSON',
        //    dataType: 'json',
        //    success: function (data, status, jqXHR) {

        //        console.log(jqXHR)
        let fillAsset = ''
        let km_hora = ''
        //const asset = data.find((asset) => asset.id == identificador)

        //if (asset) {

        //getArea = asset.area;
        //getBodega = asset.bodega;
        //getTipoActivo = asset.tipo;
        //getMarca = asset.marca;
        //getAnio = asset.anio;
        //getPlan = asset.plan;
        //getPlanesActivo = listAllElement(asset.planes_activo)
        //compActivoPatente = asset.activo;
        //console.log("Verificando postId: " + identificador)
        //console.log("Vericando id de asset: " + asset.id)

        /*if (asset.km == null) {
            km_hora = asset.horas
        } else {
            km_hora = asset.km
        }*/

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
                                <label class="span2" for="assetAreasOptions">
                                    <h5>Área</h5>
                                </label>
                                <div class="controls">
                                    <select id="assetAreasOptions" required>
                                    </select>
                                </div>
                            </div>

                            <!--TIPO DE ACTIVO-->
                            <div class="control-group">
                                <label class="span2" for="assetType">
                                    <h5>Tipo</h5>
                                </label>
                                <div class="controls">
                                    <select id="assetType" required>
                                    </select>
                                </div>
                            </div>

                            <!--PATENTE-->
                            <div class="control-group">
                                <label class="span2" for="assetPatent">
                                    <h5>Patente</h5>
                                </label>
                                <div class="controls">
                                    <select id="assetPatent" required>
                                    </select>
                                </div>
                            </div>

                            <!--MARCA DEL ACTIVO-->
                            <div class="control-group">
                                <label class="span2" for="assetBrand">
                                    <h5>Marca</h5>
                                </label>
                                <div class="controls">
                                    <select id="assetBrand" required>
                                    </select>
                                </div>
                            </div>

                            <!--MODELO DEL ACTIVO-->
                            <div class="control-group">
                                <label class="span2" for="assetModel">
                                    <h5>Modelo</h5>
                                </label>
                                <div class="controls">
                                    <input id="assetModel" type="text" min="3" maxlength="15"
                                        value="" required>
                                </div>
                            </div>

                            <!--AÑO DEL ACTIVO-->
                            <div class="control-group">
                                <label class="span2" for="assetYear">
                                    <h5>Año</h5>
                                </label>
                                <div class="controls">
                                    <select id="assetYear" required>
                                    </select>
                                </div>
                            </div>

                            <!--HORAS Ó KM DE USO DEL ACTIVO-->
                            <div class="control-group">
                                <label class="span2" for="assetUse">
                                    <h5>Uso</h5>
                                </label>
                                <div class="controls">
                                    <input id="assetUse" type="text" min="3" maxlength="15" 
                                        value="" required>
                                </div>
                            </div>

                            <!--GPS DEL ACTIVO-->
                            <div class="control-group">
                                <label class="span2" for="assetGPS">
                                    <h5>GPS</h5>
                                </label>
                                <div class="controls">
                                    <input id="assetGPS" type="text" min="3" maxlength="15" 
                                        value="0000000000000000" disabled>
                                </div>
                            </div>

                            <!--BODEGA DEL ACTIVO-->
                            <div class="control-group">
                                <label class="span2" for="assetWareHousesOptions">
                                    <h5>Bodega</h5>
                                </label>
                                <div class="controls">
                                    <select id="assetWareHousesOptions" required>
                                    </select>
                                </div>
                            </div>

                            <!--PLANES DE MANTENIMIENTO DEL ACTIVO-->
                            <div class="control-group">
                                <label class="span2" for="assetPlan">
                                    <h5>Planes</h5>
                                </label>
                                <div class="controls">
                                    <!--<select id="assetPlan" multiple required size="10">-->
                                    <select id="assetPlan">
                                    </select>
                                </div>
                                <div class="controls">
                                    <div class="controls btn-group" id="buttonsSelectedPlan"></div>
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
		                            <label id="clickFileSeguro" class='btn btn-primary' href='javascript:;' for="fileSeguro">
                                        <i class="fa fa-cloud-upload" aria-hidden="true"></i>
                                        <input id="fileSeguro" type="file" class="new-input-file"
                                            name="fileSeguro" size="40">
		                            </label>
                                    <a href="/static/img/Prueba.pdf" download>
                                        <span class='label label-info' id="fileInfoSeguro" required style="margin-bottom: 5px;"></span>
                                    </a>
                                </div>
	                                    
                                <div class="controls">
                                    <div class="input-prepend input-append">
                                        <span class="add-on">Vence</span>
                                        <input id="expireSeguro" type="date" name="expireSeguro" 
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
		                            <label class='btn btn-primary' href='javascript:;' for="filePadron">
                                        <i class="fa fa-cloud-upload" aria-hidden="true"></i>
			                            <input id="filePadron" type="file" class="new-input-file"
                                            name="filePadron" size="40">
		                            </label>
                                    <a href="/static/img/Prueba.pdf" download>
                                        <span class='label label-info' id="fileInfoPadron" required style="margin-bottom: 5px;"></span>
                                    </a>
	                            </div>
                                <div class="controls">
                                    <div class="input-prepend input-append">
                                        <span class="add-on">Vence</span>
                                        <input id="expirePadron" type="date" name="expirePadron" 
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
		                            <label class='btn btn-primary' href='javascript:;' for="fileCirculacion">
                                        <i class="fa fa-cloud-upload" aria-hidden="true"></i>
			                            <input id="fileCirculacion" type="file" class="new-input-file"
                                            name="fileCirculacion" size="40">
		                            </label>
                                    <a href="/static/img/Prueba.pdf" download>
                                        <span class='label label-info' id="fileInfoCirculacion" required style="margin-bottom: 5px;"></span>
                                    </a>
	                            </div>
                                <div class="controls">
                                    <div class="input-prepend input-append">
                                        <span class="add-on">Vence</span>
                                        <input id="expireCirculacion" type="date" name="expireCirculacion" 
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
		                            <label class='btn btn-primary' href='javascript:;' for="fileRevision">
                                        <i class="fa fa-cloud-upload" aria-hidden="true"></i>
			                            <input id="fileRevision" type="file" class="new-input-file"
                                            name="fileRevision" size="40">
		                            </label>
                                    <a href="/static/img/Prueba.pdf" download>
                                        <span class='label label-info' id="fileInfoRevision" required style="margin-bottom: 5px;"></span>
                                    </a>	                                    
	                            </div>
                                <div class="controls">
                                    <div class="input-prepend input-append">
                                        <span class="add-on">Vence</span>
                                        <input id="expireRevision" type="date" name="expireRevision" 
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
                                <input type="checkbox" id="downAssetOption" value="optionDown">
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
        //} 

        /*else {
            fillAsset = `<h1>=(</h1>
            <p>-- No se logró obtener el Activo ${identificador}</p>`
        }*/

        assetHTML = assetHTML.concat(fillAsset)

        $('#pages').html(assetHTML)
        //console.log(`AJAX assetFormQuery Nuevo -> Status: ${status}`)

        fillOptions()

        /*asset ? fillOptions() : {};
        asset ? fillAssetLogOrders() : {};*/

        //},
        //error: function (jqXHR) {
        //    console.log(jqXHR)
        //}
        //})

        return assetHTML;
    }
}


const fillOptions = () => {

    console.log("Entré al fillOptions en NewAsset")

    $(window).on("load", function () {

        $(document).ready(function () {

            // Select area -- emplea los datos obtenidos en getJson();
            const selectArea = document.getElementById('assetAreasOptions');
            const optionArea = listSelect(getAreas, "nombre"); // Paso la clave "nombre"
            loadSelectContent(optionArea, selectArea);

            // Select bodega -- emplea los datos obtenidos en getJson();
            const selectBodega = document.getElementById('assetWareHousesOptions');
            const optionBodega = listSelect(getBodegas, "nombre"); // Paso la clave "nombre"
            loadSelectContent(optionBodega, selectBodega)

            // Select tipo de activo -- emplea los datos obtenidos en getJson();
            const selectTipoActivo = document.getElementById('assetType');
            const optionTipoActivo = listSelect(getTiposActivos, "nombre"); // Paso la clave "nombre"
            loadSelectContent(optionTipoActivo, selectTipoActivo);

            // Select activo -- emplea los datos obtenidos en getJson();
            // Se debe hacer una verificación para mostrar solo los activos que no han sido creados en el módulo de mantenimiento
            const selectActivo = document.getElementById('assetPatent');
            const optionActivo = listSelect(getActivos, "activo"); // Paso la clave "activo"
            loadSelectContent(optionActivo, selectActivo);

            // Select Marca desde Options.js
            const selectMarca = document.getElementById('assetBrand');
            const optionMarca = listSelect(marcas, "nombre"); // Paso la clave "nombre"
            loadSelectContentAndSelected(optionMarca, selectMarca, getMarca);
            //console.log("Marca seleccionada: " + getMarca);

            // Select Anio desde Options.js
            const selectAnio = document.getElementById('assetYear');
            listAnioAndSelected(selectAnio, getAnio);

            // Solo listado de Planes para agregar
            // Select planes -- emplea los datos obtenidos en getJson();
            const selectPlan = document.getElementById('assetPlan');
            const optionPlan = listSelect(getPlanes, "nombre"); // Paso la clave "nombre"
            loadSelectContent(optionPlan, selectPlan);

            // Div con Planes del Activo
            const divPlanes = document.getElementById('buttonsSelectedPlan');
            loadDivSelected(divPlanes, getPlanesActivo, "nombre"); // Paso la clave "nombre"

        });

    });

}

const guardarActivoJSON = () => {

    banderaActivo = false;
    banderaPlanes = false;
    nuevoActivoJSON.activoPlanes = []; // reinicio planes
    nuevoActivoJSON.documentos = []; // reinicio documentos

    let selectAnio = document.getElementById('assetYear');
    nuevoActivoJSON.anio = selectAnio.options[selectAnio.selectedIndex].text;
    nuevoActivoJSON.dadoDeBaja = false;

    //Por ahora leo el id de activos, pero en realidad debo traer las patentes
    //de aquellos idVehiculo que aún no han sido creados como activo
    let selectPatente = document.getElementById('assetPatent');
    const activo = getActivos.find((activo) => activo.activo == selectPatente.value);
    if (activo) {
        nuevoActivoJSON.idVehiculo = activo.id; // En realidad debo traer el idVehiculo
    }

    let selectArea = document.getElementById('assetAreasOptions');
    const area = getAreas.find((area) => area.nombre == selectArea.value);
    if (area) {
        nuevoActivoJSON.areaIdArea = area.id_area;
    }

    let selectBodega = document.getElementById('assetWareHousesOptions');
    const bodega = getBodegas.find((bodega) => bodega.nombre == selectBodega.value);
    if (bodega) {
        nuevoActivoJSON.bodegaActivosIdBodegaActivos = bodega.id;
    }

    let selectTipoActivo = document.getElementById('assetType');
    const tipoActivo = getTiposActivos.find((tipoActivo) => tipoActivo.nombre == selectTipoActivo.value);
    if (tipoActivo) {
        nuevoActivoJSON.tipoActivoIdTipoActivo = tipoActivo.id;
    }

    let selectMarca = document.getElementById('assetBrand');
    let modeloActivo = document.getElementById('assetModel');
    let usoActivo = document.getElementById('assetUse');

    let fileInfoSeguro = document.getElementById('fileInfoSeguro');
    let expireSeguro = document.getElementById('expireSeguro');
    let docSeguroObligatorio = {
        //"activoIdActivo: "
        "rutaAdjunto": `/path/${fileInfoSeguro.textContent.trim()}`,
        "fechaAdjunto": currentDate(),
        "fechaVencimiento": expireSeguro.value,
        "tipoDocumentoIdTipoDocumento": 1
    }

    let fileInfoPadron = document.getElementById('fileInfoPadron');
    let expirePadron = document.getElementById('expirePadron');
    let docPadronVehicular = {
        //"activoIdActivo: "
        "rutaAdjunto": `/path/${fileInfoPadron.textContent.trim()}`,
        "fechaAdjunto": currentDate(),
        "fechaVencimiento": expirePadron.value,
        "tipoDocumentoIdTipoDocumento": 2
    }

    let fileInfoCirculacion = document.getElementById('fileInfoCirculacion');
    let expireCirculacion = document.getElementById('expireCirculacion');
    let docPermisoCirculacion = {
        //"activoIdActivo: "
        "rutaAdjunto": `/path/${fileInfoCirculacion.textContent.trim()}`,
        "fechaAdjunto": currentDate(),
        "fechaVencimiento": expireCirculacion.value,
        "tipoDocumentoIdTipoDocumento": 3
    }

    let fileInfoRevision = document.getElementById('fileInfoRevision');
    let expireRevision = document.getElementById('expireRevision');
    let docRevisionTecnica = {
        //"activoIdActivo: "
        "rutaAdjunto": `/path/${fileInfoRevision.textContent.trim()}`,
        "fechaAdjunto": currentDate(),
        "fechaVencimiento": expireRevision.value,
        "tipoDocumentoIdTipoDocumento": 4
    }

    nuevoActivoJSON.documentos.push(docSeguroObligatorio);
    nuevoActivoJSON.documentos.push(docPadronVehicular);
    nuevoActivoJSON.documentos.push(docPermisoCirculacion);
    nuevoActivoJSON.documentos.push(docRevisionTecnica);

    const planesSeleccionados = document.getElementById('buttonsSelectedPlan').getElementsByClassName('name-plan');
    let contPlans = 0; //sin uso
    for (const element of planesSeleccionados) {

        banderaPlanes = true;

        contPlans++; //sin uso

        const plan = getPlanes.find((plan) => plan.nombre == element.textContent);
        if (plan) {


            let planesNuevoActivoJSON = {
                //"ActivoIdActivo: "
                "planMantenimientoIdPlanMantenimiento": plan.id
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
        && modeloActivo.value != ''
        && usoActivo.value != ''
        && fileInfoSeguro.textContent.trim() != ''
        && fileInfoPadron.textContent.trim() != ''
        && fileInfoCirculacion.textContent.trim() != ''
        && fileInfoRevision.textContent.trim() != ''
        && expireSeguro.value != ''
        && expirePadron.value != ''
        && expireCirculacion.value != ''
        && expireRevision.value != '') {

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

        if ($('#assetYear').val().length != ''
            && $('#assetPatent').val().length != ''
            && $('#assetAreasOptions').val().length != ''
            && $('#assetWareHousesOptions').val().length != ''
            && $('#assetType').val().length != ''
            && $('#assetBrand').val().length != ''
            && $('#assetModel').val().length != ''
            && $('#assetUse').val().length != '') {

            if (banderaPlanes == false) {
                alert('Debe Seleccionar al menos un plan');
                $('html, body').animate({
                    scrollTop: $(`#assetPlan`).offset().top - 50
                }, 1000)

                e.preventDefault();

            } else {

                $('#tabDatos').removeClass("active");
                $('#tabDocumentos').addClass("active");
                $('#tab1').removeClass("active");
                $('#tab2').addClass("active");

                if ($.trim($('#fileInfoSeguro').text()) == '') {
                    alert('Debe adjuntar el "Seguro obligatorio"');
                    e.preventDefault();
                } else {
                    if ($.trim($('#fileInfoPadron').text()) == '') {
                        alert('Debe adjuntar el "Padrón vehicular"');
                        e.preventDefault();
                    } else {
                        if ($.trim($('#fileInfoCirculacion').text()) == '') {
                            alert('Debe adjuntar el "Permiso de circulación"')
                            e.preventDefault();
                        } else {
                            if ($.trim($('#fileInfoRevision').text()) == '') {
                                alert('Debe adjuntar la "Revisión técnica"')
                                e.preventDefault();
                            }
                        }
                    }
                }
            }
        }

        mostrarActivoStorageJSON();

    });

    //Agregar Alert Button al seleccionar Plan de Mantenimiento en el activo
    $('div #pages').on('change', 'select#assetPlan', e => {

        let divAgregados = document.getElementById('buttonsSelectedPlan');
        let texto = e.target.value;

        if ($(`#buttonsSelectedPlan:contains(${texto})`).length <= 0) {

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


    $("div #pages").on('change', "input#fileSeguro", function () {
        var filename = $(this).val().replace(/C:\\fakepath\\/i, '')
        console.log(filename);
        //$('#fileInfoSeguro').val(filename); //para input
        $('#fileInfoSeguro').html(filename); //para input
    });

    $("div #pages").on('change', "input#filePadron", function () {
        var filename = $(this).val().replace(/C:\\fakepath\\/i, '')
        console.log(filename);
        $('#fileInfoPadron').html(filename);
    });

    $("div #pages").on('change', "input#fileCirculacion", function () {
        var filename = $(this).val().replace(/C:\\fakepath\\/i, '')
        console.log(filename);
        $('#fileInfoCirculacion').html(filename);
    });

    $("div #pages").on('change', "input#fileRevision", function () {
        var filename = $(this).val().replace(/C:\\fakepath\\/i, '')
        console.log(filename);
        $('#fileInfoRevision').html(filename);
    });

});