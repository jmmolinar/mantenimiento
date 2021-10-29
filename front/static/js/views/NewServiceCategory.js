import AbstractView from "./AbstractView.js";

//Variable para controlar la creación de JSON de categoría
let banderaCategoria = false;

//VARIABLE PARA JSON
let nuevaCategoriaJSON = {
    "nombre": "",
    "codigo": ""
};

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
        //url: 'http://192.168.1.114:8080/static/js/data/serviceCategories.JSON',
        //dataType: 'json',
        //success: function (data, status, jqXHR) {

        //console.log(jqXHR)
        let fillCategory = ''
        //const categoria = data.find((categoria) => categoria.id == identificador)

        //if (categoria) {

        //    console.log("Verificando postId: " + identificador)
        //    console.log("Vericando const categoria: " + categoria)

        fillCategory = `<h1></h1>
                    <form id="categoryFormQuery_new" action="/categorias">
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
                                <!--<a id="saveCategory_new" class="btn btn-primary" href="/categorias">Guardar</a>
                                <a id="dontSaveCategory_new" class="btn btn-primary" href="/categorias">Cancelar</a>-->
                                <button id="saveCategory_new" class="btn btn-primary" type="submit">Guardar</button>
                                <button id="dontSaveCategory_new" class="btn btn-primary" type="button" onclick="window.history.back();">Cancelar</button>
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

const guardarCategoriaJSON = () => {

    let nombreCategoria = document.getElementById('categoryName_new');
    nuevaCategoriaJSON.nombre = nombreCategoria.value;

    let codigoCategoria = document.getElementById('categoryCode_new');
    nuevaCategoriaJSON.codigo = codigoCategoria.value;

    if (nombreCategoria.value != ''
        && codigoCategoria.value != '') {

        banderaCategoria = true;

    }

    //Creación del JSON
    if (banderaCategoria == true) {
        sessionStorage.setItem(`NuevaCategoria`, JSON.stringify(nuevaCategoriaJSON));
    }
}

const removerVariableCategoriaStorageJSON = () => {

    if (sessionStorage.getItem(`NuevaCategoria`)) {
        sessionStorage.removeItem(`NuevaCategoria`);
    }

}

const mostrarCategoriaStorageJSON = () => {

    if (sessionStorage.getItem(`NuevaCategoria`)) {
        console.log(`\n\nNuevaCategoria\n\n` + sessionStorage.getItem(`NuevaCategoria`));
        alert(`\n\nNuevaCategoria\n\n` + JSON.stringify(nuevaCategoriaJSON, undefined, 4));
        //sessionStorage.removeItem(`NuevoActivo`);
    }
}

$(document).ready(function () {

    $('div #pages').on('click', 'button#saveCategory_new', function () {
        guardarCategoriaJSON();
        mostrarCategoriaStorageJSON();
    });

});