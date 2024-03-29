import AbstractView from "./AbstractView.js";
import TableLanguage from "./TableLanguage.js";
import {
    getOrdenes
} from "./Options.js"

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Talleres");
    }

    async getHtml() {

        let workshopsHTML = ``;

        let optionsWorkshopsHTML = `<h1></h1>
        <div class="control-group order-identity border-transparent-1px">
            <h1>Talleres de servicio</h1>
        </div>
        <div id="optionsWorkshopsHTML">
            <h1></h1>
            <a class="btn btn-primary" href="/talleres/nuevo">Nuevo <i class="fa fa-plus-circle" aria-hidden="true"></i></a>
            <a class="btn btn-success" href="">Exportar <i class="fa fa-cloud-download"></i></a>
        </div>
        `;

        let workshopsContainerA = `<div id="workshopsContainer">
        <h1></h1>
        <table id="workshopsTable" class="display table table-striped table-bordered nowrap" width="100%">
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

                    <th>Órdenes asignadas</th>
                    <th>Activos en taller</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
        `;

        let workshopsContainerB = ` 
        </tbody>
        </table>
        </div>
        `;

        $.ajax({
            type: 'GET',
            url: 'http://192.168.0.14:8080/static/js/data/workshops.JSON',
            dataType: 'json',
            success: function (data, status, jqXHR) {
                customTable();
                console.log(jqXHR)
                let fillWorkshops = ''
                for (const taller of data) {

                    const ordenesAsignadas = getOrdenes.filter((orden) => orden.tallerServicioIdTallerServicio == taller.idTallerServicio);
                    let contAsignadosTaller = 0;
                    if (ordenesAsignadas) {
                        ordenesAsignadas.forEach(element => {
                            contAsignadosTaller++;
                        });
                    }

                    fillWorkshops += `
                    <tr>
                        <td>${taller.idTallerServicio}</td>
                        <td>${taller.nombre}</td>
                        <td>${taller.region}</td>
                        <td>${taller.comuna}</td>

                        <!--<td>${taller.calle}</td>
                        <td>${taller.numero}</td>
                        <td>${taller.latitud}</td>
                        <td>${taller.longitud}</td>-->

                        <td>${contAsignadosTaller}</td>
                        <td>Desde Backend</td>
                        <td class="align-center">
                            <a id="editWorkShop_${taller.idTallerServicio}" class="btn only-to-id-url" href="/talleres/${taller.idTallerServicio}"><i class="icon-pencil"></i></a>
                            <a id="deleteWorkShop_${taller.idTallerServicio}" class="btn" disabled><i class="icon-trash"></i></a>
                        </td>
                    </tr>`
                }

                let workshopsHTML = optionsWorkshopsHTML.concat(workshopsContainerA)
                workshopsHTML = workshopsHTML.concat(fillWorkshops)
                workshopsHTML = workshopsHTML.concat(workshopsContainerB)

                $('#pages').html(workshopsHTML)
                console.log(`AJAX workshopsTable -> Status: ${status}`)

            },
            error: function (jqXHR) {
                console.log(jqXHR)
            }
        })

        return workshopsHTML;

    }

}

const customTable = () => {

    $(document).ready(function () {
        $('div #pages table#workshopsTable').DataTable({
            "order": [[0, "desc"]],
            "language": TableLanguage,
            "scrollX": true // De la mano con el width="100%" en la etiqueta table
        });
    });

    /*Agrego en CustomTable para generar eventos con hipervinculos que están dentro*/
    $(document).ready(function () {
        $('div #pages table#workshopsTable').on('click', 'a.only-to-id-url', function () {
            console.log("Voy al taller: " + $(this).attr('href').slice(1).substring($(this).attr('href').slice(1).lastIndexOf('/') + 1))
        })
    });
}
