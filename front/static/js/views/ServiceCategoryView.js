import AbstractView from "./AbstractView.js";

//Variable para controlar la creación de JSON de categoría
let banderaCategoria = false;

//VARIABLE PARA JSON
let categoriaJSON = {
    "idCategoriaServicio": 0,
    "nombre": "",
    "codigo": ""
};

//Variable para asignar el identificador
let idUrl = 0;

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.postId = params.id;
        this.setTitle(`Categoría ${this.postId}`);
    }

    async getHtml() {

        let identificador = this.postId;
        let categoryHTML = ``;
        idUrl = parseInt(identificador);

        $.ajax({
            type: 'GET',
            url: 'http://192.168.0.14:8080/static/js/data/serviceCategories.JSON',
            dataType: 'json',
            success: function (data, status, jqXHR) {

                console.log(jqXHR)
                let fillCategory = ''
                const categoria = data.find((categoria) => categoria.idCategoriaServicio == identificador)

                if (categoria) {

                    console.log("Verificando postId: " + identificador)
                    console.log("Vericando const categoria: " + categoria)

                    fillCategory = `<h1></h1>
                    <form id="categoryFormQuery_${categoria.idCategoriaServicio}" action="/categorias">
                        <!--IDENTIFICADOR DE LA CATEGORÍA-->
                        <div id="categoryId_${categoria.idCategoriaServicio}" class="control-group order-identity border-transparent-1px">
                            <h1>Categoría ${categoria.idCategoriaServicio}</h1>
                            <h3>${categoria.nombre}</h3>
                        </div>
                        <!--Datos de la categoría-->
                        <div id="categoryData_${categoria.idCategoriaServicio}" class="control-group border-transparent-1px">
                            <!--NOMBRE DE CATEGORÍA-->
                            <div class="control-group">
                                <label class="span2" for="categoryName_${categoria.idCategoriaServicio}">
                                    <h5>Nombre</h5>
                                </label>
                                <div class="controls">
                                    <input class="span12" id="categoryName_${categoria.idCategoriaServicio}" type="text" min="3" maxlength="100"
                                        value="${categoria.nombre}" required>
                                </div>
                            </div>
                            <!--CÓDIGO DE CATEGORÍA-->
                            <div class="control-group">
                                <label class="span2" for="categoryCode_${categoria.idCategoriaServicio}">
                                    <h5>Código</h5>
                                </label>
                                <div class="controls">
                                    <input class="span12" id="categoryCode_${categoria.idCategoriaServicio}" type="text" min="3" maxlength="10"
                                        value="${categoria.codigo}" required>
                                </div>
                            </div>
                        </div>

                        <!--GUARDAR / CANCELAR-->
                        <div id="categoryActionButtons_${categoria.idCategoriaServicio}" class="control-group">
                            <div class="span12 text-right border-transparent-1px">
                                <!--<a id="saveCategory_${categoria.idCategoriaServicio}" class="btn btn-primary" href="/categorias">Guardar</a>
                                <a id="dontSaveCategory_${categoria.idCategoriaServicio}" class="btn btn-primary" href="/categorias">Cancelar</a>-->
                                <button id="saveCategory_${categoria.idCategoriaServicio}" class="btn btn-primary" type="submit">Guardar</button>
                                <button id="dontSaveCategory_${categoria.idCategoriaServicio}" class="btn btn-primary" type="button" onclick="window.history.back();">Cancelar</button>
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

const guardarCategoriaJSON = () => {

    categoriaJSON.idCategoriaServicio = idUrl;

    let nombreCategoria = document.getElementById(`categoryName_${idUrl}`);
    categoriaJSON.nombre = nombreCategoria.value;

    let codigoCategoria = document.getElementById(`categoryCode_${idUrl}`);
    categoriaJSON.codigo = codigoCategoria.value;

    if (nombreCategoria.value != ''
        && codigoCategoria.value != '') {

        banderaCategoria = true;

    }

    //Creación del JSON
    if (banderaCategoria == true) {
        sessionStorage.setItem(`ActualizacionCategoria_${idUrl}`, JSON.stringify(categoriaJSON));
    }
}

const removerVariableCategoriaStorageJSON = () => {

    if (sessionStorage.getItem(`ActualizacionCategoria_${idUrl}`)) {
        sessionStorage.removeItem(`ActualizacionCategoria_${idUrl}`);
    }

}

const mostrarCategoriaStorageJSON = () => {

    if (sessionStorage.getItem(`ActualizacionCategoria_${idUrl}`)) {
        console.log(`\n\nActualizacionCategoria_${idUrl}\n\n` + sessionStorage.getItem(`ActualizacionCategoria_${idUrl}`));
        //alert(`\n\nActualizacionCategoria_${idUrl}\n\n` + JSON.stringify(categoriaJSON, undefined, 4));
        //sessionStorage.removeItem(`NuevoActivo`);
    }
}

$(document).ready(function () {

    $('div #pages').on('click', `button#saveCategory_${idUrl}`, function () {
        guardarCategoriaJSON();
        mostrarCategoriaStorageJSON();
    });

});