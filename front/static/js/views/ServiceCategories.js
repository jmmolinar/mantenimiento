import AbstractView from "./AbstractView.js";
import TableLanguage from "./TableLanguage.js"

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Categorias de servicio");
    }

    async getHtml() {

        let serviceCategoriesHTML = ``;

        let optionsServiceCategoriesHTML = `<h1></h1>
        <div class="control-group order-identity border-transparent-1px">
            <h1>Categorías de servicio</h1>
        </div>
        <div id="optionsServiceCategoriesHTML">
            <h1></h1>
            <a class="btn btn-primary" href="/categorias/nuevo">Nuevo <i class="fa fa-plus-circle" aria-hidden="true"></i></a>
            <a class="btn btn-success" href="">Exportar <i class="fa fa-cloud-download"></i></a>
        </div>
        `;
        
        let serviceCategoriesContainerA = `<div id="serviceCategoriesContainer">
        <h1></h1>
        <table id="serviceCategoriesTable" class="display table table-striped table-bordered nowrap" width="100%">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Nombre</th>
                    <th>Código</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
        `;
        
        let serviceCategoriesContainerB =` 
        </tbody>
        </table>
        </div>
        `;

        $.ajax({
            type: 'GET',
            url: 'http://192.168.0.13:8080/static/js/data/serviceCategories.JSON',
            dataType: 'json',
            success: function (data, status, jqXHR) {
                customTable();
                console.log(jqXHR)
                let fillServiceCategories = ''
                for (const categoria of data) {
                    fillServiceCategories += `
                    <tr>
                        <td>${categoria.idCategoriaServicio}</td>
                        <td>${categoria.nombre}</td>
                        <td>${categoria.codigo}</td>
                        <td class="align-center">
                            <a id="editServiceCategory_${categoria.idCategoriaServicio}" class="btn only-to-id-url" href="/categorias/${categoria.idCategoriaServicio}"><i class="icon-pencil"></i></a>
                            <a id="deleteServiceCategory_${categoria.idCategoriaServicio}" class="btn" disabled><i class="icon-trash"></i></a>
                        </td>
                    </tr>`
                }

                serviceCategoriesHTML = optionsServiceCategoriesHTML.concat(serviceCategoriesContainerA)
                serviceCategoriesHTML = serviceCategoriesHTML.concat(fillServiceCategories)
                serviceCategoriesHTML = serviceCategoriesHTML.concat(serviceCategoriesContainerB)

                $('#pages').html(serviceCategoriesHTML)
                console.log(`AJAX serviceCategoriesTable -> Status: ${status}`)

            },
            error: function (jqXHR) {
                console.log(jqXHR)
            }
        })

        return serviceCategoriesHTML;

    }

}

const customTable = () => {

    $(document).ready(function () {
        $('div #pages table#serviceCategoriesTable').DataTable({
            "order": [[0, "desc"]],
            "language": TableLanguage,
            "scrollX": true // De la mano con el width="100%" en la etiqueta table
        });
    });

    /*Agrego en CustomTable para generar eventos con hipervinculos que están dentro*/
    $(document).ready(function () {
        $('div #pages table#serviceCategoriesTable').on('click', 'a.only-to-id-url', function () {
            console.log("Voy a la categoría: " + $(this).attr('href').slice(1).substring($(this).attr('href').slice(1).lastIndexOf('/') + 1))
        })
    });
}
