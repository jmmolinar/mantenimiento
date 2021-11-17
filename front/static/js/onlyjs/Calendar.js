/** Funcionalidades para crear el Calendario */

//Clase para asignar nombre a pestaña navegador
class {
    constructor(params) {
        super(params);
        this.setTitle(`Calendario`);
    }

    setTitle(title) {
        document.title = title;
    }

}

//RENDERIZACIÓN DEL CALENDARIO
loadCalendar(); //Completo los elementos del calandario que formarán parte del div myCalendar

//FUNCIÓN PARA CREACIÓN DEL CALENDARIO
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
            events: 'http://192.168.0.13:8080/static/js/data/orders.JSON',

            select: function (info) {
                //VARIABLES DE SESSIÓN QUE SE EMPLEAN PARA FILTRAR LAS ÓRDENES
                //AL SELECCIONAR FECHAS EN EL CALENDARIO, SE GENERAN LOS FILTROS DE FECHAS
                //SE REDIRIGE A LA PÁGINA DE LAS ÓRDENES CON DICHO FILTRO EN CADA INPUT DE LAS FECHAS
                //UNA VEZ QUE ESTÁ EN "/ordenes" SE ELIMINAN LAS VARIABLES DE SESSION STORAGE
                //PERO QUE LAS ÓRDENES FILTRADAS
                sessionStorage.setItem('fechaFiltroInicio', `${info.startStr}`)
                sessionStorage.setItem('fechaFiltroFin', `${info.endStr}`)
                $(location).attr('href', '/ordenes');
            }

        });
        calendar.render();
    });

}