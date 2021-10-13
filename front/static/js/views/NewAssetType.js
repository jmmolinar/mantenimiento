import AbstractView from "./AbstractView.js";

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
        //url: 'http://192.168.0.12:8080/static/js/data/assetsType.JSON',
        //dataType: 'json',
        //success: function (data, status, jqXHR) {

        //console.log(jqXHR)
        let fillAssetType = ''
        //const assetType = data.find((assetType) => assetType.id == identificador)

        //if (assetType) {

        //    console.log("Verificando postId: " + identificador)
        //    console.log("Vericando const assetType: " + assetType)

        fillAssetType = `<h1></h1>
                    <form id="assetTypeFormQuery_new">
                        <!--IDENTIFICADOR DEL TIPO DE ACTIVO-->
                        <div id="assetTypeId_new" class="control-group order-identity border-transparent-1px">
                            <h1>Nuevo tipo de activo</h1>
                        </div>
                        <!--Datos del tipo de activo-->
                        <div id="assetTypeData_new" class="control-group border-transparent-1px">
                            <!--NOMBRE DE CATEGORÍA-->
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
                                <a id="saveAssetType_new" class="btn btn-primary" href="/tipos">Guardar</a>
                                <a id="dontSaveAssetType_new" class="btn btn-primary" href="/tipos">Cancelar</a>
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