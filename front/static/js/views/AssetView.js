import AbstractView from "./AbstractView.js";
import TableLanguage from "./TableLanguage.js";
import {
    areas, bodegas, tiposActivos, marcas, planes,
    getAreas, getBodegas, getTiposActivos, getActivos, getPlanes,
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
let getGPS = ``;
let getAnio = ``;
let getEstado = ``;
let getPlanesActivo = [];
let getActivoPatente = ``;

//Variable para controlar la creación de JSON de activo
let banderaActivo = false;
let banderaPlanes = false;

//VARIABLE PARA JSON
let activoJSON = {
    "idActivo": 0,
    "anio": null,
    "dadoDeBaja": false,
    "idVehiculo": null,
    "areaIdArea": null,
    "bodegaActivosIdBodegaActivos": null,
    "tipoActivoIdTipoActivo": null,
    "activoPlanes": [],
    "documentos": []
};

//Variable para asignar el identificador
let idUrl = 0;

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.postId = params.id;
        this.setTitle(`Activo ${this.postId}`);
    }

    async getHtml() {

        let identificador = this.postId;
        let assetHTML = ``;
        idUrl = parseInt(identificador);

        $.ajax({
            type: 'GET',
            url: 'http://192.168.1.114:8080/static/js/data/assets.JSON',
            dataType: 'json',
            success: function (data, status, jqXHR) {

                console.log(jqXHR)
                let fillAsset = ''
                let kmHora = ''
                const asset = data.find((asset) => asset.idActivo == identificador)

                if (asset) {

                    //Finalmente se debe sincronizar con las áreas de la
                    //base de datos de Blackgps
                    //getArea = asset.area;
                    const area = getAreas.find((area) => area.idArea == asset.areaIdArea);
                    if (area) {
                        getArea = area.nombre;
                    }
                
                    //getBodega = asset.bodega;
                    const bodega = getBodegas.find((bodega) => bodega.idBodegaActivos == asset.bodegaActivosIdBodegaActivos);
                    if (bodega) {
                        getBodega = bodega.nombre;
                    }
                
                    //getTipoActivo = asset.tipo;
                    const tipoActivo = getTiposActivos.find((tipoActivo) => tipoActivo.idTipoActivo == asset.tipoActivoIdTipoActivo);
                    if (tipoActivo) {
                        getTipoActivo = tipoActivo.nombre;
                    }

                    getMarca = asset.marca; // Temporal - traer de idVehiculo y de allí obtener la marca
                    getModelo = asset.modelo; // Temporal - traer de idVehiculo y de allí obtener el modelo
                    getAnio = asset.anio;
                    getGPS = asset.gps_imei; // Temporal - traer de idVehiculo y de allí obtener el gps
                    getActivoPatente = asset.activo; // temporal - traer de idVehiculo y de allí obtener la patente
                    getPlanesActivo = listAllElement(asset.activoPlanes)
                    //console.log("Verificando postId: " + identificador)
                    //console.log("Vericando id de asset: " + asset.idActivo)


                    //REPARAR TAMBIÉN LA OBTENCIÓN DE LO DOCUMENTOS AL MODIFICAR
                    //JSON assets.json

                    if (asset.km == null) {
                        kmHora = asset.horas // Temporal - se debe traer idVehiculo y de allí obtener sus horas
                    } else {
                        kmHora = asset.km // Temporal - se debe traer idVehiculo y de allí obtener sus km
                    }

                    fillAsset = `<h1></h1>
                    <form id="assetFormQuery_${asset.idActivo}" action="/activos">

                        <!--IDENTIFICADOR DEL ACTIVO-->
                        <div id="assetsId_${asset.idActivo}" class="control-group order-identity border-transparent-1px">
                            <h1>Activo ${asset.idActivo}</h1>
                            <!--<h3>Patente: ${getActivoPatente}</h3>-->
                            <h3 style="display:inline;">Patente: </h3>
                            <h3 id="valorPatente" style="display:inline;">${getActivoPatente}</h3>
                            <h3>${kmHora}</h3>
                            <a id="downloadAsset_${asset.idActivo}" class="btn btn-success" href=""> ${getActivoPatente}  <i class="fa fa-cloud-download"></i></a>
                        </div>


                        <!-- SECCIONES -->
                        <div id="assetSections" class="tabbable">
                            <ul class="nav nav-tabs">
                                <li id="tabDatos" class="active"><a href="#tab1" data-toggle="tab">Datos</a></li>
                                <li id="tabDocumentos"><a href="#tab2" data-toggle="tab">Documentos</a></li>
                                <li id="tabMantenimientos"><a href="#tab3" data-toggle="tab">Mantenimientos</a></li>
                            </ul>
                            <div class="tab-content">
                            <div class="tab-pane active" id="tab1">
                                <!--<p>I'm in Section 1.</p>-->

                                <!--DATOS DEL ACTIVO-->
                                <div id="assetData_${asset.idActivo}" class="control-group border-transparent-1px">

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
                                                value="${getModelo}" required>
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
                                                value="${kmHora}" required>
                                        </div>
                                    </div>

                                    <!--GPS DEL ACTIVO-->
                                    <div class="control-group">
                                        <label class="span2" for="assetGPS">
                                            <h5>GPS</h5>
                                        </label>
                                        <div class="controls">
                                            <input id="assetGPS" type="text" min="3" maxlength="15" 
                                                value="${getGPS}" disabled>
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
                                <!--<p>Oh, I'm in Section 2.</p>-->

                                <!--DOCUMENTOS DEL ACTIVO-->
                                <div id="assetDocuments_${asset.idActivo}" class="new-div-documents control-group border-transparent-1px">
                                
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
                                                <span class='label label-info' id="fileInfoSeguro" required style="margin-bottom: 5px;">${asset.seguro_obligatorio}</span>
                                            </a>
                                        </div>
	                                    
                                        <div class="controls">
                                            <div class="input-prepend input-append">
                                                <span class="add-on">Vence</span>
                                                <input id="expireSeguro" type="date" name="expireSeguro" 
                                                    value="${asset.vencimiento_seguro_obligatorio}" 
                                                    required style="border-radius:3px;"
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
                                                <span class='label label-info' id="fileInfoPadron" required style="margin-bottom: 5px;">${asset.padron_vehicular}</span>
                                            </a>
	                                    </div>
                                        <div class="controls">
                                            <div class="input-prepend input-append">
                                                <span class="add-on">Vence</span>
                                                <input id="expirePadron" type="date" name="expirePadron" 
                                                    value="${asset.vencimiento_padron_vehicular}" 
                                                    required style="border-radius:3px;"
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
                                                <span class='label label-info' id="fileInfoCirculacion" required style="margin-bottom: 5px;">${asset.permiso_circulacion}</span>
                                            </a>
	                                    </div>
                                        <div class="controls">
                                            <div class="input-prepend input-append">
                                                <span class="add-on">Vence</span>
                                                <input id="expireCirculacion" type="date" name="expireCirculacion" 
                                                    value="${asset.vencimiento_permiso_circulacion}" 
                                                    required style="border-radius:3px;"
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
                                                <span class='label label-info' id="fileInfoRevision" required style="margin-bottom: 5px;">${asset.revision_tecnica}</span>
                                            </a>	                                    
	                                    </div>
                                        <div class="controls">
                                            <div class="input-prepend input-append">
                                                <span class="add-on">Vence</span>
                                                <input id="expireRevision" type="date" name="expireRevision" 
                                                    value="${asset.vencimiento_revision_tecnica}" 
                                                    required style="border-radius:3px;"
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
                            <div class="tab-pane" id="tab3">
                                <!--<p>Hey, I'm in Section 3.</p>-->
                                <!--HISTORIAL DE MANTENIMIENTOS DEL ACTIVO-->
                                <div id="ordersLog_${this.postId}" class="control-group border-transparent-1px"></div>
                            </div>
                        </div>
                    

                        <!--DAR DE BAJA-->
                        <div id="downAsset_${asset.idActivo}" class="control-group border-transparent-1px order-identity">
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
                        <div id="assetActionButtons_${asset.idActivo}" class="control-group">
                            <div class="span12 text-right border-transparent-1px">
                                <!--<a id="saveAsset_${asset.idActivo}" class="btn btn-primary" href="/activos">Guardar</a>
                                <a id="dontSaveAsset_${asset.idActivo}" class="btn btn-primary" href="/activos">Cancelar</a>-->
                                <button id="saveAsset_${asset.idActivo}" class="btn btn-primary" type="submit">Guardar</button>
                                <button id="dontSaveAsset_${asset.idActivo}" class="btn btn-primary" type="button" onclick="window.history.back();">Cancelar</button>
                            </div>
                        </div>
                    </form>`;
                } else {
                    fillAsset = `<h1>=(</h1>
                    <p>-- No se logró obtener el Activo ${identificador}</p>`
                }

                assetHTML = assetHTML.concat(fillAsset)

                $('#pages').html(assetHTML)
                console.log(`AJAX assetFormQuery -> Status: ${status}`)

                asset ? fillOptions() : {};
                asset ? fillAssetLogOrders() : {};

            },
            error: function (jqXHR) {
                console.log(jqXHR)
            }
        })

        return assetHTML;
    }
}


const fillOptions = () => {

    console.log("Entré al fillOptions en AssetView")

    //$(window).on("load", function () {

    $(document).ready(function () {

        // Select area -- emplea los datos obtenidos en getJson();
        const selectArea = document.getElementById('assetAreasOptions');
        //console.log("Id del select: " + selectArea.id);
        //const optionArea = listSelect(areas, "nombre"); // Paso la clave "nombre"
        const optionArea = listSelect(getAreas, "nombre"); // Paso la clave "nombre"
        loadSelectContentAndSelected(optionArea, selectArea, getArea);
        console.log("Área seleccionada: " + getArea);

        // Select bodega -- emplea los datos obtenidos en getJson();
        const selectBodega = document.getElementById('assetWareHousesOptions');
        //const optionBodega = listSelect(bodegas, "nombre"); // Paso la clave "nombre"
        const optionBodega = listSelect(getBodegas, "nombre"); // Paso la clave "nombre"
        loadSelectContentAndSelected(optionBodega, selectBodega, getBodega);
        console.log("Bodega seleccionada: " + getBodega);

        // Select tipo de activo -- emplea los datos obtenidos en getJson();
        const selectTipoActivo = document.getElementById('assetType');
        //const optionTipoActivo = listSelect(tiposActivos, "nombre"); // Paso la clave "nombre"
        const optionTipoActivo = listSelect(getTiposActivos, "nombre"); // Paso la clave "nombre"
        loadSelectContentAndSelected(optionTipoActivo, selectTipoActivo, getTipoActivo);
        console.log("Tipo de activo seleccionado: " + getTipoActivo);

        // Select Marca desde Options.js
        const selectMarca = document.getElementById('assetBrand');
        const optionMarca = listSelect(marcas, "nombre"); // Paso la clave "nombre"
        loadSelectContentAndSelected(optionMarca, selectMarca, getMarca);
        console.log("Marca seleccionada: " + getMarca);

        // Select Anio desde Options.js
        const selectAnio = document.getElementById('assetYear');
        listAnioAndSelected(selectAnio, getAnio);
        /*const optionAnio = listSelect(anios, "anio");
        loadSelectContentAndSelected(optionAnio, selectAnio, getAnio);
        console.log("Anio seleccionado: " + getAnio);*/

        // Solo listado de Planes para agregar
        // Select planes -- emplea los datos obtenidos en getJson();
        const selectPlan = document.getElementById('assetPlan');
        //const optionPlan = listSelect(planes, "nombre"); // Paso la clave "nombre"
        const optionPlan = listSelect(getPlanes, "nombre"); // Paso la clave "nombre"
        loadSelectContent(optionPlan, selectPlan);

        // Div con Planes del Activo
        const divPlanes = document.getElementById('buttonsSelectedPlan');
        // Cambiarlo para obtener por planMantenimientoIdPlanMantenimiento y no por Nombre
        loadDivSelectedPlan(divPlanes, getPlanesActivo, "nombre"); // Paso la clave "nombre"

        // Select Plan - Antes Individual
        /*const selectPlan = document.getElementById('assetPlan');
        const optionPlan = listSelect(planes, "nombre"); // Paso la clave "nombre"
        loadSelectContentAndSelected(optionPlan, selectPlan, getPlan);
        console.log("Plan seleccionado: " + getPlan);*/

        // Select Planes con Select Multiple
        /*const selectPlanes = document.getElementById('assetPlan');
        const optionPlanes = listSelect(planes, "nombre"); // Paso la clave "nombre"
        loadSelectContentAndSelectedMultiple(optionPlanes, selectPlanes, getPlanesActivo, "nombre");*/

    });

    //});

}

const fillAssetLogOrders = () => {

    console.log("Entré al fillAssetLogOrders en AssetView")

    let assetOrdersLogsHTML = ``;

    let assetOrdersLogsContainerA = `<div class="row-fluid">
        <label class="span5" for="assetOrdersLogContainer">
            <h5>Historial de mantenimientos</h5>
        </label>
    </div>
    <div id="assetOrdersLogContainer">
        <table id="assetOrdersLogTable" class="display table table-striped table-bordered nowrap" width="100%">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Tipo</th>
                    <th>Estado</th>
                    <th>Creación</th>
                    <th>Inicio</th>
                    <th>Taller</th>
                    <th>Total</th>
                    <th class="span1 align-center">Ver</th>
                </tr>
            </thead>
            <tbody>`;

    let assetOrdersLogsContainerB = `
    </tbody>
    </table>
    </div>
    `;

    $.ajax({
        type: 'GET',
        url: 'http://192.168.1.114:8080/static/js/data/orders.JSON',
        dataType: 'json',
        success: function (data, status, jqXHR) {

            console.log("Entré al AJAX del LOG")
            customAssetLogOrders(); /* Aqui renderizo con DataTable y doy formato a la columna costo*/
            console.log(jqXHR)
            let fillAssetOrders = ''
            let classTr = ''
            let stringContainer = ""
            let getEstadosOrdenActivo = [];
            //let fecha_log = ''
            const onlyCurrentAssetOrders = data.filter((orden) => orden.patente_activo == getActivoPatente)

            for (const orden of onlyCurrentAssetOrders) {

                if (orden.patente_activo == getActivoPatente) {

                    let total = 'CLP '

                    if (orden.total != "") {
                        total = total.concat((parseFloat(orden.total) + 0.00).toFixed(2).toString().replace(".", ","))
                    } else {
                        total = '';
                    }

                    getEstadosOrdenActivo = listAllElement(orden.ordenEstados);
                    let fechaUltimoEstado = "1900-01-01T00:00";

                    getEstadosOrdenActivo.forEach(elem => {

                        if (new Date(elem["fecha_estado"]) > new Date(fechaUltimoEstado)) {

                            getEstado = elem["nombre_estado"]; // MOdificar para traer el idEstado y de allí el nombre
                            fechaUltimoEstado = elem["fecha_estado"];
                        }

                        switch (elem["id_estado"]) {
                            case 1:
                                classTr = "warning"
                                stringContainer = 'Se requiere completar datos'
                                break;
                            case 10:
                                classTr = "muted"
                                stringContainer = 'La órden de mantenimiento no fue ejecutada'
                                break;
                            case 3:
                                classTr = "error"
                                stringContainer = 'La orden no ha sigo planificada'
                                break;
                            case 6:
                                classTr = "error"
                                stringContainer = 'El servicio en taller excede el tiempo planificado'
                                break;
                            case 2:
                                classTr = ""
                                stringContainer = 'El próximo paso es la realización del servicio en Taller'
                                break;
                            case 4:
                                classTr = ""
                                stringContainer = 'La órden fue planificada con retraso'
                                break;
                            case 5:
                                classTr = "info"
                                stringContainer = 'Se están realizando los servicios de mantenimiento'
                                break;
                            case 8:
                                classTr = "success"
                                stringContainer = 'La orden ha sido completada'
                                break;
                            case 9:
                                classTr = "success"
                                stringContainer = 'La orden ha sido completada con retraso'
                                break;
                            default:
                                classTr = ""
                                stringContainer = ''
                                console.log('Estado de la orden desconocido');
                        }

                    })


                    /*switch (orden.estado_orden) {
                        case 'Por planificar':
                            classTr = "warning"
                            stringContainer = 'Se requiere completar datos'
                            break;
                        case 'No realizado':
                            classTr = "muted"
                            stringContainer = 'La órden de mantenimiento no fue ejecutada'
                            break;
                        case 'Retrasado':
                            classTr = "error"
                            stringContainer = 'La orden no ha sigo planificada'
                            break;
                        case 'Retrasado en taller':
                            classTr = "error"
                            stringContainer = 'El servicio en taller excede el tiempo planificado'
                            break;
                        case 'Planificado':
                            classTr = ""
                            stringContainer = 'El próximo paso es la realización del servicio en Taller'
                            break;
                        case 'Planificado con retraso':
                            classTr = ""
                            stringContainer = 'La órden fue planificada con retraso'
                            break;
                        case 'En taller':
                            classTr = "info"
                            stringContainer = 'Se están realizando los servicios de mantenimiento'
                            break;
                        case 'Completado':
                            classTr = "success"
                            stringContainer = 'La orden ha sido completada'
                            break;
                        case 'Completado con retraso':
                            classTr = "success"
                            stringContainer = 'La orden ha sido completada con retraso'
                            break;
                        default:
                            classTr = ""
                            stringContainer = ''
                            console.log('Estado de la orden desconocido');
                    }*/

                    fillAssetOrders += `
                        <tr class=${classTr}>
                            <td>${orden.id_orden}</td>
                            <td>${orden.tipo_orden}</td>
                            <!--<td>${orden.estado_orden} <a data-toggle="tooltip" title="${stringContainer}"><i class="fa fa-info-circle" aria-hidden="true"></i></a></td>-->
                            <td>${getEstado} <a data-toggle="tooltip" title="${stringContainer}"><i class="fa fa-info-circle" aria-hidden="true"></i></a></td>
                            <td>${orden.fecha_creacion}</td>
                            <td>${orden.fecha_inicio}</td>
                            <td>${orden.taller_orden}</td>
                            <td>${total}</td>
                            <td class="align-center">
                                <a id="editOrder_${orden.id_orden}" class="btn" href="/ordenes/${orden.id_orden}"><i class="icon-pencil"></i></a>
                            </td>
                        </tr>`
                }
            }


            assetOrdersLogsHTML = assetOrdersLogsHTML.concat(assetOrdersLogsContainerA)
            assetOrdersLogsHTML = assetOrdersLogsHTML.concat(fillAssetOrders)
            assetOrdersLogsHTML = assetOrdersLogsHTML.concat(assetOrdersLogsContainerB)

            $(`#ordersLog_${this.postId}`).html(assetOrdersLogsHTML)
            console.log(`AJAX ordersLog_${this.postId} -> Status: ${status}`)

        },
        error: function (jqXHR) {
            console.log("Error en ajax")
            console.log(jqXHR)
        }
    })
}

const customAssetLogOrders = () => {

    $(document).ready(function () {
        $('div #pages table#assetOrdersLogTable').DataTable({
            "order": [[0, "desc"]],
            "language": TableLanguage,
            "scrollX": true // De la mano con el width="100%" en la etiqueta table
        });

    });

}

const guardarActivoJSON = () => {

    banderaActivo = false;
    banderaPlanes = false;
    activoJSON.activoPlanes = []; // reinicio planes
    activoJSON.documentos = []; // reinicio documentos

    activoJSON.idActivo = idUrl;

    let selectAnio = document.getElementById('assetYear');
    activoJSON.anio = selectAnio.options[selectAnio.selectedIndex].text;

    let checkDadoDeBaja = document.getElementById('downAssetOption');
    if (checkDadoDeBaja.checked) {
        activoJSON.dadoDeBaja = true;
    } else {
        activoJSON.dadoDeBaja = false;
    }

    //Por ahora asigno el id de activos, pero en realidad debo traer el idVehiculo
    //que contiene a la patente - Esto se resuelve al hacer el Fk a la 
    //base de datos de BlackGPS
    let valorPatente = document.getElementById('valorPatente');
    const activo = getActivos.find((activo) => activo.activo == valorPatente.textContent.trim());
    if (activo) {
        activoJSON.idVehiculo = activo.id; // Finalmente debe ser el idVehiculo
    }

    let selectArea = document.getElementById('assetAreasOptions');
    const area = getAreas.find((area) => area.nombre == selectArea.value);
    if (area) {
        activoJSON.areaIdArea = area.idArea;
    }

    let selectBodega = document.getElementById('assetWareHousesOptions');
    const bodega = getBodegas.find((bodega) => bodega.nombre == selectBodega.value);
    if (bodega) {
        activoJSON.bodegaActivosIdBodegaActivos = bodega.idBodegaActivos;
    }

    let selectTipoActivo = document.getElementById('assetType');
    const tipoActivo = getTiposActivos.find((tipoActivo) => tipoActivo.nombre == selectTipoActivo.value);
    if (tipoActivo) {
        activoJSON.tipoActivoIdTipoActivo = tipoActivo.idTipoActivo;
    }

    let selectMarca = document.getElementById('assetBrand');
    let modeloActivo = document.getElementById('assetModel');
    let usoActivo = document.getElementById('assetUse');

    //OJO
    //Agregar Bloque para recorrer los documentos anteriores y agregarlos
    //Luego si agregar los nuevos seleccionados
    //Validar que solo se muestren los documentos más nuevos
    //Comparando el tipo del documento y su fecha de adjuntado
    //No es necesario asignar el idDocumento al json


    let fileInfoSeguro = document.getElementById('fileInfoSeguro');
    let expireSeguro = document.getElementById('expireSeguro');
    let docSeguroObligatorio = {
        "activoIdActivo": idUrl,
        "rutaAdjunto": `/path/${fileInfoSeguro.textContent.trim()}`,
        "fechaAdjunto": currentDate(),
        "fechaVencimiento": expireSeguro.value,
        "tipoDocumentoIdTipoDocumento": 1
    }

    let fileInfoPadron = document.getElementById('fileInfoPadron');
    let expirePadron = document.getElementById('expirePadron');
    let docPadronVehicular = {
        "activoIdActivo": idUrl,
        "rutaAdjunto": `/path/${fileInfoPadron.textContent.trim()}`,
        "fechaAdjunto": currentDate(),
        "fechaVencimiento": expirePadron.value,
        "tipoDocumentoIdTipoDocumento": 2
    }

    let fileInfoCirculacion = document.getElementById('fileInfoCirculacion');
    let expireCirculacion = document.getElementById('expireCirculacion');
    let docPermisoCirculacion = {
        "activoIdActivo": idUrl,
        "rutaAdjunto": `/path/${fileInfoCirculacion.textContent.trim()}`,
        "fechaAdjunto": currentDate(),
        "fechaVencimiento": expireCirculacion.value,
        "tipoDocumentoIdTipoDocumento": 3
    }

    let fileInfoRevision = document.getElementById('fileInfoRevision');
    let expireRevision = document.getElementById('expireRevision');
    let docRevisionTecnica = {
        "activoIdActivo": idUrl,
        "rutaAdjunto": `/path/${fileInfoRevision.textContent.trim()}`,
        "fechaAdjunto": currentDate(),
        "fechaVencimiento": expireRevision.value,
        "tipoDocumentoIdTipoDocumento": 4
    }

    activoJSON.documentos.push(docSeguroObligatorio);
    activoJSON.documentos.push(docPadronVehicular);
    activoJSON.documentos.push(docPermisoCirculacion);
    activoJSON.documentos.push(docRevisionTecnica);

    const planesSeleccionados = document.getElementById('buttonsSelectedPlan').getElementsByClassName('name-plan');
    //let contPlans = 0; //sin uso
    for (const element of planesSeleccionados) {

        banderaPlanes = true;

        //contPlans++; //sin uso

        const plan = getPlanes.find((plan) => plan.nombre == element.textContent);
        if (plan) {

            let planesactivoJSON = {
                "activoIdActivo": idUrl,
                "planMantenimientoIdPlanMantenimiento": plan.idPlanMantenimiento
            }

            activoJSON.activoPlanes.push(planesactivoJSON);
        }

    }

    if (selectAnio.options[selectAnio.selectedIndex].text != ''
        && valorPatente.textContent.trim() != ''
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
        sessionStorage.setItem(`ActualizacionActivo_${idUrl}`, JSON.stringify(activoJSON));
    }

}

const removerVariableActivoStorageJSON = () => {

    if (sessionStorage.getItem(`ActualizacionActivo_${idUrl}`)) {
        sessionStorage.removeItem(`ActualizacionActivo_${idUrl}`);
    }

}

const mostrarActivoStorageJSON = () => {

    if (sessionStorage.getItem(`ActualizacionActivo_${idUrl}`)) {
        console.log(`\n\nActualizacionActivo_${idUrl}\n\n` + sessionStorage.getItem(`ActualizacionActivo_${idUrl}`));
        //alert(`\n\nActualizacionActivo_${idUrl}\n\n` + JSON.stringify(activoJSON, undefined, 4));
        //sessionStorage.removeItem(`ActualizacionActivo_${idUrl}`);
    }

}

$(document).ready(function () {


    $('div #pages').on('click', `button#saveAsset_${idUrl}`, function (e) {

        guardarActivoJSON();

        if ($('#assetYear').val().length != ''
            && $.trim($('#valorPatente').text()) != ''
            && $('#assetAreasOptions').val().length != ''
            && $('#assetWareHousesOptions').val().length != ''
            && $('#assetType').val().length != ''
            && $('#assetBrand').val().length != ''
            && $('#assetModel').val().length != ''
            && $('#assetUse').val().length != '') {

            if (banderaPlanes == false) {

                alert('Debe Seleccionar al menos un plan');

                $('#tabMantenimientos').removeClass("active");
                $('#tabDocumentos').removeClass("active");
                $('#tabDatos').addClass("active");
                $('#tab3').removeClass("active");
                $('#tab2').removeClass("active");
                $('#tab1').addClass("active");

                $('html, body').animate({
                    scrollTop: $(`#assetPlan`).offset().top - 50
                }, 1000)

                e.preventDefault();

            } else {

                $('#tabDatos').removeClass("active");
                $('#tabMantenimientos').removeClass("active");
                $('#tabDocumentos').addClass("active");
                $('#tab1').removeClass("active");
                $('#tab3').removeClass("active");
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
        } else {
            $('#tabDatos').addClass("active");
            $('#tabDocumentos').removeClass("active");
            $('#tabMantenimientos').removeClass("active");
            $('#tab1').addClass("active");
            $('#tab2').removeClass("active");
            $('#tab3').removeClass("active");
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