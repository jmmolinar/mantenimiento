import AbstractView from "./AbstractView.js";
import TableLanguage from "./TableLanguage.js"
import {
    getAreas, getTiposActivos
} from "./Options.js"

let getArea = ``;
let getTipoActivo = ``;

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Activos");
    }

    async getHtml() {

        let assetsHTML = ``;

        let optionsAssetsHTML = `<div id="optionsAssetsHTML">
        <h1></h1>
        <a class="btn btn-primary" href="/activos/nuevo">Nuevo <i class="fa fa-plus-circle" aria-hidden="true"></i></a>
        <a class="btn btn-success" href="">Exportar <i class="fa fa-cloud-download"></i></a>
        </div>
        `;

        let assetsContainerA = `<div id="assetsContainer">
        <h1></h1>
        <table id="assetsTable" class="display table table-striped table-bordered nowrap" width="100%">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Activo</th>
                    <th>Tipo</th>
                    <th>GPS</th>
                    <th>Área</th>
                    <th>Km/Horas (uso)</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
        `;

        let assetsContainerB = ` 
        </tbody>
        </table>
        </div>
        `;

        $.ajax({
            type: 'GET',
            url: 'http://192.168.1.114:8080/static/js/data/assets.JSON',
            dataType: 'json',
            success: function (data, status, jqXHR) {
                customTable();
                console.log(jqXHR)
                let fillAssets = ''
                let kmHora = ''
                for (const activo of data) {

                    //Finalmente se debe sincronizar con las áreas de la
                    //base de datos de Blackgps
                    const area = getAreas.find((area) => area.idArea == activo.areaIdArea);
                    if (area) {
                        getArea = area.nombre;
                    }

                    const tipoActivo = getTiposActivos.find((tipoActivo) => tipoActivo.idTipoActivo == activo.tipoActivoIdTipoActivo);
                    if (tipoActivo) {
                        getTipoActivo = tipoActivo.nombre;
                    }

                    if (activo.km == null) {
                        kmHora = activo.horas // Temporal - se debe traer idVehiculo y de allí obtener sus horas
                    } else {
                        kmHora = activo.km // Temporal - se debe traer idVehiculo y de allí obtener sus km
                    }

                    fillAssets += `
                    <tr>
                        <td>${activo.idActivo}</td>
                        <td>${activo.activo}</td> <!--Modificar para leer el idVehículo y de allí traer la patente -->
                        <td>${getTipoActivo}</td>
                        <td>${activo.gps_imei}</td> <!-- Temporal porque se debe traer mediante idVehiculo -->
                        <td>${getArea}</td>
                        <td>${kmHora}</td>
                        <td class="align-center">
                            <a id="editAsset_${activo.idActivo}" class="btn only-to-id-url" href="/activos/${activo.idActivo}"><i class="icon-pencil"></i></a>
                            <a id="deleteAsset_${activo.idActivo}" class="btn" disabled><i class="icon-trash"></i></a>
                        </td>
                    </tr>`
                }

                assetsHTML = optionsAssetsHTML.concat(assetsContainerA)
                assetsHTML = assetsHTML.concat(fillAssets)
                assetsHTML = assetsHTML.concat(assetsContainerB)

                $('#pages').html(assetsHTML)
                console.log(`AJAX assetsTable -> Status: ${status}`)

            },
            error: function (jqXHR) {
                console.log(jqXHR)
            }
        })

        return assetsHTML;

    }

}

const customTable = () => {

    $(document).ready(function () {
        $('div #pages table#assetsTable').DataTable({
            "order": [[0, "desc"]],
            "language": TableLanguage,
            "scrollX": true // De la mano con el width="100%" en la etiqueta table
        });
    });

    /*Agrego en CustomTable para generar eventos con hipervinculos que están dentro*/
    $(document).ready(function () {
        $('div #pages table#assetsTable').on('click', 'a.only-to-id-url', function () {
            console.log("Voy al activo: " + $(this).attr('href').slice(1).substring($(this).attr('href').slice(1).lastIndexOf('/') + 1))
        })
    });
}
