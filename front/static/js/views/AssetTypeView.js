import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.postId = params.id;
        this.setTitle(`Tipo de activo ${this.postId}`);
    }

    async getHtml() {

        let identificador = this.postId;
        let assetTypeHTML = ``;

        $.ajax({
            type: 'GET',
            url: 'http://192.168.0.12:8080/static/js/data/assetsType.JSON',
            dataType: 'json',
            success: function (data, status, jqXHR) {

                console.log(jqXHR)
                let fillAssetType = ''
                const assetType = data.find((assetType) => assetType.id == identificador)

                if (assetType) {

                    console.log("Verificando postId: " + identificador)
                    console.log("Vericando const assetType: " + assetType)

                    fillAssetType = `<h1></h1>
                    <form id="assetTypeFormQuery_${assetType.id}">
                        <!--IDENTIFICADOR DEL TIPO DE ACTIVO-->
                        <div id="assetTypeId_${assetType.id}" class="control-group order-identity border-transparent-1px">
                            <h1>Tipo de activo ${assetType.id}</h1>
                            <h3>${assetType.nombre}</h3>
                        </div>
                        <!--Datos del tipo de activo-->
                        <div id="assetTypeData_${assetType.id}" class="control-group border-transparent-1px">
                            <!--NOMBRE DE CATEGORÍA-->
                            <div class="control-group">
                                <label class="span1" for="assetTypeName_${assetType.id}">
                                    <h5>Nombre</h5>
                                </label>
                                <div class="controls">
                                    <input class="span12" id="assetTypeName_${assetType.id}" type="text" min="3" maxlength="100"
                                        value="${assetType.nombre}" required>
                                </div>
                            </div>
                        </div>

                        <!--GUARDAR / CANCELAR-->
                        <div id="assetTypeActionButtons_${assetType.id}" class="control-group">
                            <div class="span12 text-right border-transparent-1px">
                                <a id="saveAssetType_${assetType.id}" class="btn btn-primary" href="/tipos">Guardar</a>
                                <a id="dontSaveAssetType_${assetType.id}" class="btn btn-primary" href="/tipos">Cancelar</a>
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