import AbstractView from "./AbstractView.js";
import TableLanguage from "./TableLanguage.js"

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Tipos de activos");
    }


    async getHtml() {

        let assetsTypeHTML = ``;

        let optionsAssetsTypeHTML = `<div id="optionsAssetsTypeHTML">
        <h1></h1>
        <a class="btn btn-primary" href="/tipos/nuevo">Nuevo <i class="fa fa-plus-circle" aria-hidden="true"></i></a>
        <a class="btn btn-success" href="">Exportar <i class="fa fa-cloud-download"></i></a>
        </div>

        `;

        let assetsTypeContainerA = `<div id="assetsTypeContainer">
        <h1></h1>
        <table id="assetsTypeTable" class="display table table-striped table-bordered nowrap" width="100%">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Nombre</th>
                    <!--<th>Cantidad de activos</th>-->
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
        `;

        let assetsTypeContainerB = ` 
        </tbody>
        </table>
        </div>
        `;

        $.ajax({
            type: 'GET',
            url: 'http://192.168.0.15:8080/static/js/data/assetsType.JSON',
            dataType: 'json',
            success: function (data, status, jqXHR) {
                customTable();
                console.log(jqXHR)
                let fillAssetsType = ''
                for (const tipo of data) {
                    fillAssetsType += `
                    <tr>
                        <td>${tipo.id}</td>
                        <td>${tipo.nombre}</td>
                        <!--<td>${tipo.cantidad_activos}</td>-->
                        <td class="align-center">
                            <a id="editAssetType_${tipo.id}" class="btn only-to-id-url" href="/tipos/${tipo.id}"><i class="icon-pencil"></i></a>
                            <a id="deleteAssetType_${tipo.id}" class="btn" disabled><i class="icon-trash"></i></a>
                        </td>
                    </tr>`
                }

                assetsTypeHTML = optionsAssetsTypeHTML.concat(assetsTypeContainerA)
                assetsTypeHTML = assetsTypeHTML.concat(fillAssetsType)
                assetsTypeHTML = assetsTypeHTML.concat(assetsTypeContainerB)

                $('#pages').html(assetsTypeHTML)
                console.log(`AJAX assetsTypeTable -> Status: ${status}`)

            },
            error: function (jqXHR) {
                console.log(jqXHR)
            }
        })

        return assetsTypeHTML;

    }

}

const customTable = () => {

    $(document).ready(function () {
        $('div #pages table#assetsTypeTable').DataTable({
            "order": [[0, "desc"]],
            "language": TableLanguage,
            "scrollX": true // De la mano con el width="100%" en la etiqueta table
        });
    });

    /*Agrego en CustomTable para generar eventos con hipervinculos que están dentro*/
    $(document).ready(function () {
        $('div #pages table#assetsTypeTable').on('click', 'a.only-to-id-url', function () {
            console.log("Voy al tipo de activo: " + $(this).attr('href').slice(1).substring($(this).attr('href').slice(1).lastIndexOf('/') + 1))
        })
    });
}
