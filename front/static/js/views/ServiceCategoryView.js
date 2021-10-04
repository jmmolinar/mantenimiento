import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.postId = params.id;
        this.setTitle(`Categoría ${this.postId}`);
    }

    async getHtml() {

        let identificador = this.postId;
        let categoryHTML = ``;

        $.ajax({
            type: 'GET',
            url: 'http://192.168.0.15:8080/static/js/data/serviceCategories.JSON',
            dataType: 'json',
            success: function (data, status, jqXHR) {

                console.log(jqXHR)
                let fillCategory = ''
                const categoria = data.find((categoria) => categoria.id == identificador)

                if (categoria) {

                    console.log("Verificando postId: " + identificador)
                    console.log("Vericando const categoria: " + categoria)

                    fillCategory = `<h1></h1>
                    <form id="categoryFormQuery_${categoria.id}">
                        <!--IDENTIFICADOR DE LA CATEGORÍA-->
                        <div id="categoryId_${categoria.id}" class="control-group order-identity border-transparent-1px">
                            <h1>Categoría ${categoria.id}</h1>
                            <h3>${categoria.nombre}</h3>
                        </div>
                        <!--Datos de la categoría-->
                        <div id="categoryData_${categoria.id}" class="control-group border-transparent-1px">
                            <!--NOMBRE DE CATEGORÍA-->
                            <div class="control-group">
                                <label class="span2" for="categoryName_${categoria.id}">
                                    <h5>Nombre</h5>
                                </label>
                                <div class="controls">
                                    <input class="span12" id="categoryName_${categoria.id}" type="text" min="3" maxlength="100"
                                        value="${categoria.nombre}" required>
                                </div>
                            </div>
                            <!--CÓDIGO DE CATEGORÍA-->
                            <div class="control-group">
                                <label class="span2" for="categoryCode_${categoria.id}">
                                    <h5>Código</h5>
                                </label>
                                <div class="controls">
                                    <input class="span12" id="categoryCode_${categoria.id}" type="text" min="3" maxlength="10"
                                        value="${categoria.cod}" required>
                                </div>
                            </div>
                        </div>

                        <!--GUARDAR / CANCELAR-->
                        <div id="categoryActionButtons_${categoria.id}" class="control-group">
                            <div class="span12 text-right border-transparent-1px">
                                <a id="saveCategory_${categoria.id}" class="btn btn-primary" href="/categorias">Guardar</a>
                                <a id="dontSaveCategory_${categoria.id}" class="btn btn-primary" href="/categorias">Cancelar</a>
                            </div>
                        </div>
                    </form>`;
                } else {
                    fillCategory = `<h1>=(</h1>
                    <p>-- No se logró obtener la categoría ${identificador}</p>`
                }

                categoryHTML = categoryHTML.concat(fillCategory)

                $('#pages').html(categoryHTML)
                console.log(`AJAX categoryQuery -> Status: ${status}`)

            },
            error: function (jqXHR) {
                console.log(jqXHR)
            }
        })

        return categoryHTML;
    }
}