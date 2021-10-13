import AbstractView from "./AbstractView.js";
import TableLanguage from "./TableLanguage.js";
import {
    areas, bodegas, tiposActivos, marcas, planes,
    listAllElement,
    loadSelectContent,
    loadSelectContentAndSelected,
    loadDivSelected,
    loadSelectContentAndSelectedMultiple,
    listSelect,
    listAnioAndSelected
} from "./Options.js"

let getArea = ``;
let getBodega = ``;
let getTipoActivo = ``;
let getMarca = ``;
let getAnio = ``;
let getPlan = ``;
let getPlanesActivo = [];
let compActivoPatente = ``;

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
        //    url: 'http://192.168.0.12:8080/static/js/data/assets.JSON',
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
                    <form id="assetFormQuery_new">

                        <!--IDENTIFICADOR DEL ACTIVO-->
                        <div id="assetsId_new" class="control-group order-identity border-transparent-1px">
                            <h1>Nuevo activo</h1>
                        </div>


                        <!-- SECCIONES -->
                        <div id="assetSections" class="tabbable">
                            <ul class="nav nav-tabs">
                                <li class="active"><a href="#tab1" data-toggle="tab">Datos</a></li>
                                <li><a href="#tab2" data-toggle="tab">Documentos</a></li>
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
                                                    value="" required style="border-radius:3px;">
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
                                                    value="" required style="border-radius:3px;">
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
                                                    value="" required style="border-radius:3px;">
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
                                                    value="" required style="border-radius:3px;">
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
                                <!--<button id="saveAsset_new" class="btn btn-primary" type="submit">Guardar</button>
                                <button id="dontSaveAsset_new" class="btn btn-primary" type="submit" disabled>Cancelar</button>-->
                                <a id="saveAsset_new" class="btn btn-primary" href="/activos">Guardar</a>
                                <a id="dontSaveAsset_new" class="btn btn-primary" href="/activos">Cancelar</a>
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
    $(document).ready(function () {

        // Select area
        const selectArea = document.getElementById('assetAreasOptions');
        //console.log("Id del select: " + selectArea.id);
        const optionArea = listSelect(areas, "nombre"); // Paso la clave "nombre"
        loadSelectContentAndSelected(optionArea, selectArea, getArea);
        console.log("Área seleccionada: " + getArea);

        // Select bodega
        const selectBodega = document.getElementById('assetWareHousesOptions');
        const optionBodega = listSelect(bodegas, "nombre"); // Paso la clave "nombre"
        loadSelectContentAndSelected(optionBodega, selectBodega, getBodega);
        console.log("Bodega seleccionada: " + getBodega);

        // Select tipo de activo
        const selectTipoActivo = document.getElementById('assetType');
        const optionTipoActivo = listSelect(tiposActivos, "nombre"); // Paso la clave "nombre"
        loadSelectContentAndSelected(optionTipoActivo, selectTipoActivo, getTipoActivo);
        console.log("Tipo de activo seleccionado: " + getTipoActivo);

        // Select Marca
        const selectMarca = document.getElementById('assetBrand');
        const optionMarca = listSelect(marcas, "nombre"); // Paso la clave "nombre"
        loadSelectContentAndSelected(optionMarca, selectMarca, getMarca);
        console.log("Marca seleccionada: " + getMarca);

        // Select Anio
        const selectAnio = document.getElementById('assetYear');
        listAnioAndSelected(selectAnio, getAnio);

        // Solo listado de Planes para agregar
        const selectPlan = document.getElementById('assetPlan');
        const optionPlan = listSelect(planes, "nombre"); // Paso la clave "nombre"
        loadSelectContent(optionPlan, selectPlan);

        // Div con Planes del Activo
        const divPlanes = document.getElementById('buttonsSelectedPlan');
        loadDivSelected(divPlanes, getPlanesActivo, "nombre"); // Paso la clave "nombre"

    });

}


$(document).ready(function () {

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