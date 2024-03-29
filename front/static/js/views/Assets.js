import AbstractView from "./AbstractView.js";
import TableLanguage from "./TableLanguage.js"
import {
    getAreas, getTiposActivos, getVehiculos, getGPS
} from "./Options.js"

let getArea = ``;
let getTipoActivo = ``;
let getGPSImei = ``;
let getVehiculoPatente = ``;
let getVehiculoKmGps = ``;
let getVehiculoHorometro = ``;

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Activos");
    }

    async getHtml() {

        let assetsHTML = ``;

        let optionsAssetsHTML = `<h1></h1>
        <div class="control-group order-identity border-transparent-1px">
            <h1>Activos</h1>
        </div>
        <div id="optionsAssetsHTML">
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
                    <th>Uso</th>
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
            url: 'http://192.168.0.14:8080/static/js/data/assets.JSON',
            dataType: 'json',
            success: function (data, status, jqXHR) {
                customTable();
                console.log(jqXHR)
                let fillAssets = ''
                //let kmHora = ''
                let uso = ``;
                for (const activo of data) {

                    const area = getAreas.find((area) => area.idArea == activo.areaIdArea);
                    if (area) {
                        getArea = area.nombreArea;
                    }

                    const tipoActivo = getTiposActivos.find((tipoActivo) => tipoActivo.idTipoActivo == activo.tipoActivoIdTipoActivo);
                    if (tipoActivo) {
                        getTipoActivo = tipoActivo.nombre;
                    }

                    const vehiculo = getVehiculos.find((vehiculo) => vehiculo.idVehiculo == activo.vehiculoIdVehiculo);
                    if(vehiculo){
                        getVehiculoPatente = vehiculo.ppuVehiculo;
                        getVehiculoKmGps = parseFloat(vehiculo.kmGps).toFixed(2);
                        getVehiculoHorometro = parseFloat(vehiculo.horometro).toFixed(2);
                        uso = getVehiculoKmGps.toString().concat(" Km  -  ", getVehiculoHorometro.toString(), " Horas")
                        const gps = getGPS.find((gps) => gps.idGps == vehiculo.gpsIdGps);
                        if(gps){
                            getGPSImei = gps.imeiGps;
                        }
                    }

                    /*if (activo.km == null) {
                        kmHora = activo.horas // Temporal - se debe traer idVehiculo y de allí obtener sus horas
                    } else {
                        kmHora = activo.km // Temporal - se debe traer idVehiculo y de allí obtener sus km
                    }*/

                    fillAssets += `
                    <tr>
                        <td>${activo.idActivo}</td>
                        <td>${getVehiculoPatente}</td>
                        <td>${getTipoActivo}</td>
                        <td>${getGPSImei}</td> <!-- Temporal porque se debe traer mediante idVehiculo -->
                        <td>${getArea}</td>
                        <td>${uso}</td>
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
