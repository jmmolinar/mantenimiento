import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Reportes");
    }

    async getHtml() {
        return `<div id="optionsDashboardHTML">
            <h1></h1>
                <a class="btn btn-success" href="">Exportar <i class="fa fa-cloud-download"></i></a>
            </div>

            </br>
            <table class="table table-bordered table-striped">
                <tr>
                    <th>Frecuencia de servicios</th>
                    <th>Costos por servicios</th>
                </tr>
                <tr>
                    <td><img src="/static/img/analytic/frecuencia_de_servicios.png" alt=""></td>
                    <td><img src="/static/img/analytic/costos_por_servicios.png" alt=""></td>
                </tr>
            </table>

            </br>
            <table class="table table-bordered table-striped">
                <tr>
                    <th>Órdenes por área empresarial</th>
                    <th>Costos por área empresarial</th>
                </tr>
                <tr>
                    <td><img src="/static/img/analytic/ordenes_por_area.png" alt=""></td>
                    <td><img src="/static/img/analytic/costos_por_area.png" alt=""></td>
                </tr>
            </table>

            </br>
            <table class="table table-bordered table-striped">
                <tr>
                    <th>Servicios por taller</th>
                    <th>Costos por taller</th>
                </tr>
                <tr>
                    <td><img src="/static/img/analytic/servicios_por_taller.png" alt=""></td>
                    <td><img src="/static/img/analytic/costos_por_taller.png" alt=""></td>
                </tr>
            </table>

            </br>
            <table class="table table-bordered table-striped">
                <tr>
                    <th>Costos de servicios por taller</th>
                    <th>Costos de servicios por activo</th>
                </tr>
                <tr>
                    <td><img src="/static/img/analytic/costos_servicios_taller.png" alt=""></td>
                    <td><img src="/static/img/analytic/costos_servicios_activos.png" alt=""></td>
                </tr>
            </table>

            </br></br></br>
        `;
    }
}