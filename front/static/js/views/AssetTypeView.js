import AbstractView from "./AbstractView.js";

//Variable para controlar la creación de JSON de tipo de activo
let banderaTipoActivo = false;

//VARIABLE PARA JSON
let tipoActivoJSON = {
    "idTipoActivo": 0,
    "nombre": ""
};

//Variable para asignar el identificador
let idUrl = 0;

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.postId = params.id;
        this.setTitle(`Tipo de activo ${this.postId}`);
    }

    async getHtml() {

        let identificador = this.postId;
        let assetTypeHTML = ``;
        idUrl = parseInt(identificador);

        $.ajax({
            type: 'GET',
            url: 'http://192.168.1.114:8080/static/js/data/assetsType.JSON',
            dataType: 'json',
            success: function (data, status, jqXHR) {

                console.log(jqXHR)
                let fillAssetType = ''
                const assetType = data.find((assetType) => assetType.idTipoActivo == identificador)

                if (assetType) {

                    console.log("Verificando postId: " + identificador)
                    console.log("Vericando const assetType: " + assetType)

                    fillAssetType = `<h1></h1>
                    <form id="assetTypeFormQuery_${assetType.id}" action="/tipos">
                        <!--IDENTIFICADOR DEL TIPO DE ACTIVO-->
                        <div id="assetTypeId_${assetType.idTipoActivo}" class="control-group order-identity border-transparent-1px">
                            <h1>Tipo de activo ${assetType.idTipoActivo}</h1>
                            <h3>${assetType.nombre}</h3>
                        </div>
                        <!--Datos del tipo de activo-->
                        <div id="assetTypeData_${assetType.idTipoActivo}" class="control-group border-transparent-1px">
                            <!--NOMBRE DE CATEGORÍA-->
                            <div class="control-group">
                                <label class="span1" for="assetTypeName_${assetType.idTipoActivo}">
                                    <h5>Nombre</h5>
                                </label>
                                <div class="controls">
                                    <input class="span12" id="assetTypeName_${assetType.idTipoActivo}" type="text" min="3" maxlength="100"
                                        value="${assetType.nombre}" required>
                                </div>
                            </div>
                        </div>

                        <!--GUARDAR / CANCELAR-->
                        <div id="assetTypeActionButtons_${assetType.idTipoActivo}" class="control-group">
                            <div class="span12 text-right border-transparent-1px">
                                <!--<a id="saveAssetType_${assetType.idTipoActivo}" class="btn btn-primary" href="/tipos">Guardar</a>
                                <a id="dontSaveAssetType_${assetType.idTipoActivo}" class="btn btn-primary" href="/tipos">Cancelar</a>-->
                                <button id="saveAssetType_${assetType.idTipoActivo}" class="btn btn-primary" type="submit">Guardar</button>
                                <button id="dontSaveAssetType_${assetType.idTipoActivo}" class="btn btn-primary" type="button" onclick="window.history.back();">Cancelar</button>
                            </div>
                        </div>
                    </form>`;
                } else {
                    fillAssetType = `<h1>=(</h1>
                    <p>-- No se logró obtener el tipo de activo ${identificador}</p>`
                }

                assetTypeHTML = assetTypeHTML.concat(fillAssetType)

                $('#pages').html(assetTypeHTML)
                console.log(`AJAX assetTypeQuery -> Status: ${status}`)

            },
            error: function (jqXHR) {
                console.log(jqXHR)
            }
        })

        return assetTypeHTML;
    }
}

const guardarTipoActivoJSON = () => {

    tipoActivoJSON.idTipoActivo = idUrl;

    let nombreTipoActivo = document.getElementById(`assetTypeName_${idUrl}`);
    tipoActivoJSON.nombre = nombreTipoActivo.value;

    if (nombreTipoActivo.value != '') {
        banderaTipoActivo = true;
    }

    //Creación del JSON
    if (banderaTipoActivo == true) {
        sessionStorage.setItem(`ActualizacionTipoActivo_${idUrl}`, JSON.stringify(tipoActivoJSON));
    }
}

const removerVariableTipoActivoStorageJSON = () => {

    if (sessionStorage.getItem(`ActualizacionTipoActivo_${idUrl}`)) {
        sessionStorage.removeItem(`ActualizacionTipoActivo_${idUrl}`);
    }

}

const mostrarTipoActivoStorageJSON = () => {

    if (sessionStorage.getItem(`ActualizacionTipoActivo_${idUrl}`)) {
        console.log(`\n\nActualizacionTipoActivo_${idUrl}\n\n` + sessionStorage.getItem(`ActualizacionTipoActivo_${idUrl}`));
        //alert(`\n\nActualizacionTipoActivo_${idUrl}\n\n` + JSON.stringify(tipoActivoJSON, undefined, 4));
        //sessionStorage.removeItem(`ActualizacionTipoActivo_${idUrl}`);
    }
}

$(document).ready(function () {

    $('div #pages').on('click', `button#saveAssetType_${idUrl}`, function () {
        guardarTipoActivoJSON();
        mostrarTipoActivoStorageJSON();
    });

});