import AbstractView from "./AbstractView.js";

//Variable para controlar la creación de JSON de tipo de activo
let banderaTipoActivo = false;

//VARIABLE PARA JSON
let nuevoTipoActivoJSON = {
    "nombre": ""
};

export default class extends AbstractView {
    constructor(params) {
        super(params);
        //this.postId = params.id;
        this.setTitle(`Nuevo tipo de activo`);
    }

    async getHtml() {

        //let identificador = this.postId;
        let assetTypeHTML = ``;

        //$.ajax({
        //type: 'GET',
        //url: 'http://192.168.1.114:8080/static/js/data/assetsType.JSON',
        //dataType: 'json',
        //success: function (data, status, jqXHR) {

        //console.log(jqXHR)
        let fillAssetType = ''
        //const assetType = data.find((assetType) => assetType.id == identificador)

        //if (assetType) {

        //    console.log("Verificando postId: " + identificador)
        //    console.log("Vericando const assetType: " + assetType)

        fillAssetType = `<h1></h1>
                    <form id="assetTypeFormQuery_new" action="/tipos">
                        <!--IDENTIFICADOR DEL TIPO DE ACTIVO-->
                        <div id="assetTypeId_new" class="control-group order-identity border-transparent-1px">
                            <h1>Nuevo tipo de activo</h1>
                        </div>
                        <!--Datos del tipo de activo-->
                        <div id="assetTypeData_new" class="control-group border-transparent-1px">
                            <!--NOMBRE DE TIPO DE ACTIVO-->
                            <div class="control-group">
                                <label class="span1" for="assetTypeName_new">
                                    <h5>Nombre</h5>
                                </label>
                                <div class="controls">
                                    <input class="span12" id="assetTypeName_new" type="text" min="3" maxlength="100"
                                        value="" required>
                                </div>
                            </div>
                        </div>

                        <!--GUARDAR / CANCELAR-->
                        <div id="assetTypeActionButtons_new" class="control-group">
                            <div class="span12 text-right border-transparent-1px">
                                <!--<a id="saveAssetType_new" class="btn btn-primary" href="/tipos">Guardar</a>
                                <a id="dontSaveAssetType_new" class="btn btn-primary" href="/tipos">Cancelar</a>-->
                                <button id="saveAssetType_new" class="btn btn-primary" type="submit">Guardar</button>
                                <button id="dontSaveAssetType_new" class="btn btn-primary" type="submit">Cancelar</button>
                            </div>
                        </div>
                    </form>`;
        //} else {
        //    fillAssetType = `<h1>=(</h1>
        //    <p>-- No se logró obtener el tipo de activo ${identificador}</p>`
        //}

        assetTypeHTML = assetTypeHTML.concat(fillAssetType)

        $('#pages').html(assetTypeHTML)
        //console.log(`AJAX assetTypeQuery -> Status: ${status}`)

        //},
        //error: function (jqXHR) {
        //    console.log(jqXHR)
        //}
        //})

        return assetTypeHTML;
    }
}

const guardarTipoActivoJSON = () => {

    let nombreTipoActivo = document.getElementById('assetTypeName_new');
    nuevoTipoActivoJSON.nombre = nombreTipoActivo.value;

    if (nombreTipoActivo.value != '') {
        banderaTipoActivo = true;
    }

    //Creación del JSON
    if (banderaTipoActivo == true) {
        sessionStorage.setItem(`NuevoTipoActivo`, JSON.stringify(nuevoTipoActivoJSON));
    }
}

const removerVariableTipoActivoStorageJSON = () => {

    if (sessionStorage.getItem(`NuevoTipoActivo`)) {
        sessionStorage.removeItem(`NuevoTipoActivo`);
    }

}

const mostrarTipoActivoStorageJSON = () => {

    if (sessionStorage.getItem(`NuevoTipoActivo`)) {
        console.log(`\n\nNuevoTipoActivo\n\n` + sessionStorage.getItem(`NuevoTipoActivo`));
        alert(`\n\nNuevoTipoActivo\n\n` + JSON.stringify(nuevoTipoActivoJSON, undefined, 4));
        //sessionStorage.removeItem(`NuevoTipoActivo`);
    }
}

$(document).ready(function () {

    $('div #pages').on('click', 'button#saveAssetType_new', function () {
        guardarTipoActivoJSON();
        mostrarTipoActivoStorageJSON();
    });

});