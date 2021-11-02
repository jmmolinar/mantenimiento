import AbstractView from "./AbstractView.js";
import TableLanguage from "./TableLanguage.js"

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Bodegas");
    }


    async getHtml() {

        let assetsWareHousesHTML = ``;

        let optionsAssetsWareHousesHTML = `<div id="optionsAssetsWareHousesHTML">
        <h1></h1>
        <a class="btn btn-primary" href="/bodegas/nuevo">Nuevo <i class="fa fa-plus-circle" aria-hidden="true"></i></a>
        <a class="btn btn-success" href="">Exportar <i class="fa fa-cloud-download"></i></a>
        </div>
        `;

        let assetsWareHousesContainerA = `<div id="assetsWareHousesContainer">
        <h1></h1>
        <table id="assetsWareHousesTable" class="display table table-striped table-bordered nowrap" width="100%">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Nombre</th>
                    <th>Región</th>
                    <th>Comuna</th>

                    <!--<th>Calle</th>
                    <th>Número</th>
                    <th>Latitud</th>
                    <th>Longitud</th>-->

                    <th>Activos asignados</th>
                    <th>Activos en bodega</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
        `;

        let assetsWareHousesContainerB = ` 
        </tbody>
        </table>
        </div>
        `;

        $.ajax({
            type: 'GET',
            url: 'http://192.168.1.114:8080/static/js/data/assetsWareHouses.JSON',
            dataType: 'json',
            success: function (data, status, jqXHR) {
                customTable();
                console.log(jqXHR)
                let fillAssetsWareHouses = ''
                for (const bodega of data) {
                    fillAssetsWareHouses += `
                    <tr>
                        <td>${bodega.id}</td>
                        <td>${bodega.nombre}</td>
                        <td>${bodega.region}</td>
                        <td>${bodega.comuna}</td>

                        <!--<td>${bodega.calle}</td>
                        <td>${bodega.num_calle}</td>
                        <td>${bodega.latitud}</td>
                        <td>${bodega.longitud}</td>-->

                        <td>${bodega.cantidad_activos}</td>
                        <td>${bodega.cantidad_activos}</td>
                        <td class="align-center">
                            <a id="editAssetsWareHouse_${bodega.id}" class="btn only-to-id-url" href="/bodegas/${bodega.id}"><i class="icon-pencil"></i></a>
                            <a id="deleteAssetWareHouse_${bodega.id}" class="btn" disabled><i class="icon-trash"></i></a>

                        </td>
                    </tr>`
                }

                assetsWareHousesHTML = optionsAssetsWareHousesHTML.concat(assetsWareHousesContainerA)
                assetsWareHousesHTML = assetsWareHousesHTML.concat(fillAssetsWareHouses)
                assetsWareHousesHTML = assetsWareHousesHTML.concat(assetsWareHousesContainerB)

                $('#pages').html(assetsWareHousesHTML)
                console.log(`AJAX assetsWareHousesTable -> Status: ${status}`)

            },
            error: function (jqXHR) {
                console.log(jqXHR)
            }
        })

        return assetsWareHousesHTML;
    }
}

const customTable = () => {

    $(document).ready(function () {
        $('div #pages table#assetsWareHousesTable').DataTable({
            "order": [[0, "desc"]],
            "language": TableLanguage,
            "scrollX": true // De la mano con el width="100%" en la etiqueta table
        });
    });

    /*Agrego en CustomTable para generar eventos con hipervinculos que están dentro*/
    $(document).ready(function () {
        $('div #pages table#assetsWareHousesTable').on('click', 'a.only-to-id-url', function () {
            console.log("Voy a la bodega: " + $(this).attr('href').slice(1).substring($(this).attr('href').slice(1).lastIndexOf('/') + 1))
        })
    });
}
