import AbstractView from "./AbstractView.js";
import { router } from "../index.js"

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Calendario");
    }

    async getHtml() {
        loadCalendar(); //Completo los elementos del calandario que formarán parte del div myCalendar
        return `<h1></h1>
        <div class="control-group order-identity border-transparent-1px">
            <h1>Calendario de órdenes</h1>
        </div>
        <div id='myCalendar'></div>
        <h1></h1>
        `;
    }
}

const loadCalendar = () => {

    $(document).ready(function () {

        let calendarEl = $('div #pages div#myCalendar')[0];
        let calendar = new FullCalendar.Calendar(calendarEl, {

            height: "auto",

            buttonText: {
                today: 'Hoy',
                month: 'Mes',
                week: 'Semana',
                day: 'Día',
                list: 'Agenda'
            },

            initialView: 'dayGridMonth',
            selectable: true, //Para seleccionar varios días gráficamente
            locale: 'es',

            headerToolbar: {
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek'
            },

            views: {
                dayGridMonth: { // name of view
                    titleFormat: { year: 'numeric', month: 'long' }
                    // other view-specific options here
                }
            },

            //editable: true, //para mover el evento de día gráficamente
            events: 'http://192.168.1.114:8080/static/js/data/orders.JSON',
            /*events: [
                {
                    "title": 'event3',
                    "start": '2021-08-10',
                    "allDay": true // will make the time show
                },
                {
                    start: '2021-07-13T10:00:00',
                    end: '2021-07-13T16:00:00',
                    display: 'background',
                    color: '#ff9f89'
                }
            ],*/


            /*dateClick: function (info) {
                sessionStorage.setItem('fechaFiltro', `${info.dateStr}`)
                //console.log("El sessionStorage: " + sessionStorage.getItem('fechaFiltro'))
                $(location).attr('href', '/ordenes');
                //alert('Resource ID: ' + info.resource.id);
            },*/

            select: function (info) {
                //alert('selected ' + info.startStr + ' to ' + info.endStr);
                sessionStorage.setItem('fechaFiltroInicio', `${info.startStr}`)
                sessionStorage.setItem('fechaFiltroFin', `${info.endStr}`)
                $(location).attr('href', '/ordenes');
            }

        });
        calendar.render();
        //calendar.setOption('locale', 'es');
    });

}