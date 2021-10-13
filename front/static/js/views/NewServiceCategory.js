import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        //this.postId = params.id;
        this.setTitle(`Nueva categoría`);
    }

    async getHtml() {

        //let identificador = this.postId;
        let categoryHTML = ``;

        //$.ajax({
        //type: 'GET',
        //url: 'http://192.168.0.12:8080/static/js/data/serviceCategories.JSON',
        //dataType: 'json',
        //success: function (data, status, jqXHR) {

        //console.log(jqXHR)
        let fillCategory = ''
        //const categoria = data.find((categoria) => categoria.id == identificador)

        //if (categoria) {

        //    console.log("Verificando postId: " + identificador)
        //    console.log("Vericando const categoria: " + categoria)

        fillCategory = `<h1></h1>
                    <form id="categoryFormQuery_new">
                        <!--IDENTIFICADOR DE LA CATEGORÍA-->
                        <div id="categoryId_new" class="control-group order-identity border-transparent-1px">
                            <h1>Nueva categoría</h1>
                        </div>
                        <!--Datos de la categoría-->
                        <div id="categoryData_new" class="control-group border-transparent-1px">
                            <!--NOMBRE DE CATEGORÍA-->
                            <div class="control-group">
                                <label class="span2" for="categoryName_new">
                                    <h5>Nombre</h5>
                                </label>
                                <div class="controls">
                                    <input class="span12" id="categoryName_new" type="text" min="3" maxlength="100"
                                        value="" required>
                                </div>
                            </div>
                            <!--CÓDIGO DE CATEGORÍA-->
                            <div class="control-group">
                                <label class="span2" for="categoryCode_new">
                                    <h5>Código</h5>
                                </label>
                                <div class="controls">
                                    <input class="span12" id="categoryCode_new" type="text" min="3" maxlength="10"
                                        value="" required>
                                </div>
                            </div>
                        </div>

                        <!--GUARDAR / CANCELAR-->
                        <div id="categoryActionButtons_new" class="control-group">
                            <div class="span12 text-right border-transparent-1px">
                                <a id="saveCategory_new" class="btn btn-primary" href="/categorias">Guardar</a>
                                <a id="dontSaveCategory_new" class="btn btn-primary" href="/categorias">Cancelar</a>
                            </div>
                        </div>
                    </form>`;
        //} else {
        //    fillCategory = `<h1>=(</h1>
        //    <p>-- No se logró obtener la categoría ${identificador}</p>`
        //}

        categoryHTML = categoryHTML.concat(fillCategory)

        $('#pages').html(categoryHTML)
        //console.log(`AJAX categoryQuery -> Status: ${status}`)

        //},
        //error: function (jqXHR) {
        //    console.log(jqXHR)
        //}
        //})

        return categoryHTML;
    }
}