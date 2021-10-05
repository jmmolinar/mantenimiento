import AbstractView from "./AbstractView.js";
import TableLanguage from "./TableLanguage.js";
import { listAllElement } from "./Options.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Inicio");
    }


    async getHtml() {

        let assetsHTML = ``;

        let optionsAssetsHTML = `<div id="optionsAssetsHTML">
        <h1></h1>
        <a class="btn btn-primary" href="/ordenes/nuevo">Órden <i class="fa fa-plus-circle" aria-hidden="true"></i></a>
        <a class="btn btn-primary" href="/activos/nuevo">Activo <i class="fa fa-plus-circle" aria-hidden="true"></i></a>
        <a class="btn btn-primary" href="/bodegas/nuevo">Bodega <i class="fa fa-plus-circle" aria-hidden="true"></i></a>
        <a class="btn btn-primary" href="/planes/nuevo">Plan <i class="fa fa-plus-circle" aria-hidden="true"></i></a>
        <a class="btn btn-primary" href="/talleres/nuevo">Taller <i class="fa fa-plus-circle" aria-hidden="true"></i></a>
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
                    <th>Planes</th>
                    <th>Km/Horas (uso)</th>
                    <th>Mantención</th>
                    <th>Realizadas</th>
                    <th>Área</th>
                    <th>Bodega</th>
                    <th>Consultar</th>
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
            url: 'http://192.168.0.15:8080/static/js/data/assets.JSON',
            dataType: 'json',
            success: function (data, status, jqXHR) {
                customTable();
                console.log(jqXHR)
                let fillAssets = ''
                let km_hora = ''
                let mantenimiento_en = ''
                let formatGetPlanesActivoNombre = ``
                let formatRealizadas = ``
                let getPlanesActivo = [];

                for (const activo of data) {

                    getPlanesActivo = listAllElement(activo.planes_activo);
                    let getPlanesActivoNombre = [];
                    getPlanesActivo.forEach(elem => {
                        getPlanesActivoNombre.push(`<div class="alert alert-info no-margin new-padding-top-bottom"><strong>${elem["nombre"]}</strong></div>`)
                    })

                    if (getPlanesActivoNombre.length) {
                        formatGetPlanesActivoNombre = getPlanesActivoNombre.join('');
                        //formatGetPlanesActivoNombre = `<div class="alert alert-success no-margin new-padding-top-bottom"><strong>${getPlanesActivoNombre.join(' - ')}</strong></div>`
                    } else {
                        formatGetPlanesActivoNombre = ``;
                    }

                    /*if (activo.mant_realizadas){
                        formatRealizadas = `<div class="alert alert-success no-margin new-padding-top-bottom"><strong>${activo.mant_realizadas}</strong></div>`
                    } else {
                        formatRealizas = activo.mant_realizadas
                    }*/

                    formatRealizadas = `<div class="alert alert-success no-margin new-padding-top-bottom new-color-alert"><strong>${activo.mant_realizadas}</strong></div>`

                    if (activo.km == null) {
                        km_hora = `<div class="alert new-alert-use no-margin new-padding-top-bottom"><strong>${activo.horas}</strong></div>`
                    } else {
                        km_hora = `<div class="alert new-alert-use no-margin new-padding-top-bottom"><strong>${activo.km}</strong></div>`
                    }

                    if (activo.mant_en_km == null && activo.mant_en_horas == null) {
                        mantenimiento_en = ''
                    } else {
                        if (activo.mant_en_km != null && activo.mant_en_horas == null) {
                            mantenimiento_en = `<div class="alert alert-block no-margin new-padding-top-bottom new-color-alert"><strong>En: ${activo.mant_en_km}</strong></div>`
                        } else {
                            if (activo.mant_en_km == null && activo.mant_en_horas != null) {
                                mantenimiento_en = `<div class="alert alert-block no-margin new-padding-top-bottom new-color-alert"><strong>En: ${activo.mant_en_horas}</strong></div>`
                            } else {
                                if (activo.mant_en_km != null && activo.mant_en_horas != null) {
                                    mantenimiento_en = `<div class="alert alert-block no-margin new-padding-top-bottom new-color-alert"><strong>En: ${activo.mant_en_km} | En: ${activo.mant_en_horas}</strong></div>`
                                }
                            }
                        }

                    }

                    fillAssets += `
                    <tr>
                        <td>${activo.id}</td>
                        <td><strong>${activo.activo}</strong></td>
                        <td>${activo.tipo}</td>
                        <td><div class="new-flex">${formatGetPlanesActivoNombre}</div></td>
                        <td>${km_hora}</td>
                        <td>${mantenimiento_en}</td>
                        <td>${formatRealizadas}</td>
                        <td>${activo.area}</td>
                        <td>${activo.bodega}</td>
                        <td class="align-center">
                            <a id="editAsset_${activo.id}" class="btn only-to-id-url" href="/activos/${activo.id}"><i class="icon-pencil"></i></a>
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
