import AbstractView from "./AbstractView.js";
import TableLanguage from "./TableLanguage.js"

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Planes");
    }

    async getHtml() {

        let planningHTML = ``;

        let optionsPlanningHTML = `<div id="optionsPlanningHTML">
        <h1></h1>
        <a class="btn btn-primary" href="/planes/nuevo">Nuevo <i class="fa fa-plus-circle" aria-hidden="true"></i></a>
        <a class="btn btn-success" href="">Exportar <i class="fa fa-cloud-download"></i></a>
        </div>
        `;

        let planningContainerA = `<div id="planningContainer">
        <h1></h1>
        <table id="planningTable" class="display table table-striped table-bordered nowrap" width="100%">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Nombre</th>
                    <th>Ejecución</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
        `;

        let planningContainerB = ` 
        </tbody>
        </table>
        </div>
        `;

        $.ajax({
            type: 'GET',
            url: 'http://192.168.1.114:8080/static/js/data/planning.JSON',
            dataType: 'json',
            success: function (data, status, jqXHR) {
                customTable();
                console.log(jqXHR)
                let fillPlanning = ''
                let km_hora_periodo = ''
                for (const plan of data) {
                    if (plan.por_periodo == true) {
                        km_hora_periodo = 'Por período'
                    }
                    if (plan.por_km == true) {
                        km_hora_periodo = 'Por kilómetros'
                    }
                    if (plan.por_hora == true) {
                        km_hora_periodo = 'Por horas'
                    }

                    fillPlanning += `
                    <tr>
                        <td>${plan.id}</td>
                        <td>${plan.nombre}</td>
                        <td>${km_hora_periodo}</td>
                        <td class="align-center">
                            <a id="editPlan_${plan.id}" class="btn only-to-id-url" href="/planes/${plan.id}"><i class="icon-pencil"></i></a>
                            <a id="deletePlan_${plan.id}" class="btn" disabled><i class="icon-trash"></i></a>
                        </td>
                    </tr>`
                }

                let planningHTML = optionsPlanningHTML.concat(planningContainerA)
                planningHTML = planningHTML.concat(fillPlanning)
                planningHTML = planningHTML.concat(planningContainerB)

                $('#pages').html(planningHTML)
                console.log(`AJAX plannningTable -> Status: ${status}`)

            },
            error: function (jqXHR) {
                console.log(jqXHR)
            }
        })

        return planningHTML;

    }

}

const customTable = () => {

    $(document).ready(function () {
        $('div #pages table#planningTable').DataTable({
            "order": [[0, "desc"]],
            "language": TableLanguage,
            "scrollX": true // De la mano con el width="100%" en la etiqueta table
        });
    });

    /*Agrego en CustomTable para generar eventos con hipervinculos que están dentro*/
    $(document).ready(function () {
        $('div #pages table#planningTable').on('click', 'a.only-to-id-url', function () {
            console.log("Voy al plan: " + $(this).attr('href').slice(1).substring($(this).attr('href').slice(1).lastIndexOf('/') + 1))
        })
    });
}
