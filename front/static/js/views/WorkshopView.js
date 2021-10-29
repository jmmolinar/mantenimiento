import AbstractView from "./AbstractView.js";
import {
    regiones,
    loadSelectContent,
    loadSelectContentAndSelected,
    listSelect,
    listAllElement
} from "./Options.js"

let getRegion = ``;
let getComuna = ``;
let getComunasRegion = [];
let comunasRegionCambiada = [];
let getLatitud = ``;
let getLongitud = ``;

//Variable para controlar la creación de JSON de taller
let banderaTaller = false;

//VARIABLE PARA JSON
let tallerJSON = {
    "idTallerServicio": 0,
    "nombre": "",
    "region": "",
    "comuna": "",
    "calle": "",
    "numero": "",
    "latitud": null,
    "longitud": null,
    "idGeocercaCabecera": null
};

//Variable para asignar el identificador
let idUrl = 0;

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.postId = params.id;
        this.setTitle(`Taller ${this.postId}`);
    }

    async getHtml() {

        let identificador = this.postId;
        let workshopHTML = ``;

        $.ajax({
            type: 'GET',
            url: 'http://192.168.1.114:8080/static/js/data/workshops.JSON',
            dataType: 'json',
            success: function (data, status, jqXHR) {

                console.log(jqXHR)
                let fillWorkshop = ''
                const taller = data.find((taller) => taller.id == identificador)

                if (taller) {

                    getRegion = taller.region;
                    getComuna = taller.comuna;
                    getLatitud = taller.latitud;
                    console.log(`Latitud taller: ${getLatitud}`);
                    getLongitud = taller.longitud;
                    console.log(`Longitud taller: ${getLongitud}`);
                    console.log("Verificando postId: " + identificador)
                    console.log("Vericando const taller: " + taller)

                    fillWorkshop = `<h1></h1>
                    <form id="workshopFormQuery_${taller.id}" action="/talleres">
                        <!--IDENTIFICADOR DEL TALLER-->
                        <div id="workshopId_${taller.id}" class="control-group order-identity border-transparent-1px">
                            <h1>Taller ${taller.id}</h1>
                            <h3>${taller.nombre}</h3>
                        </div>
                        <!--DATOS DEL TALLER-->
                        <div id="workshopData_${taller.id}" class="control-group border-transparent-1px">
                            
                            <!--NOMBRE DEL TALLER-->
                            <div class="control-group">
                                <label class="span2" for="workshopName_${taller.id}">
                                    <h5>Nombre</h5>
                                </label>
                                <div class="controls">
                                    <input id="workshopName_${taller.id}" type="text" min="3" maxlength="30"
                                        value="${taller.nombre}" required>
                                </div>
                            </div>

                            <!--REGIÓN DEL TALLER-->
                            <div class="control-group">
                                <label class="span2" for="workshopRegionOptions">
                                    <h5>Región</h5>
                                </label>
                                <div class="controls">
                                    <select id="workshopRegionOptions" required>
                                        <option>-</option>
                                    </select>
                                </div>
                            </div>

                            <!--COMUNA DEL TALLER-->
                            <div class="control-group">
                                <label class="span2" for="workshopCommuneOptions">
                                     <h5>Comuna</h5>
                                </label>
                                <div class="controls">
                                    <select id="workshopCommuneOptions" required>
                                        <option>-</option>
                                    </select>
                                </div>
                            </div>

                            <!--CALLE DEL TALLER-->
                            <div class="control-group">
                                <label class="span2" for="streetWorkshop">
                                    <h5>Calle</h5>
                                </label>
                                <div class="controls">
                                    <input id="streetWorkshop" type="text" min="3" maxlength="30"
                                        value="${taller.calle}" required>
                                </div>
                            </div>

                            <!--NÚMERO DE CALLE DEL TALLER-->
                            <div class="control-group">
                                <label class="span2" for="numStreetWorkshop">
                                    <h5>Número</h5>
                                </label>
                                <div class="controls">
                                    <input id="numStreetWorkshop" type="text" type="number" step="1" min="0"
                                        maxlength="10" value="${taller.num_calle}" placeholder="e.g. 41" required>
                                </div>
                            </div>

                            <!--LATITUDE DE TALLER-->
                            <div class="control-group">
                                <label class="span2" for="latitudeWorkshop">
                                    <h5>Latitud</h5>
                                </label>
                                <div class="controls">
                                    <input id="latitudeWorkshop" type="number" maxlength="30" step="0.01"
                                        value="${getLatitud}" required>
                                </div>
                            </div>

                            <!--LONGITUDE DE TALLER-->
                            <div class="control-group">
                                <label class="span2" for="longitudeWorkshop">
                                    <h5>Longitud</h5>
                                </label>
                                <div class="controls">
                                    <input id="longitudeWorkshop" type="number" maxlength="30" step="0.01"
                                        value="${getLongitud}" required>
                                </div>
                            </div>
                        </div>

                        <!-- UBICACIÓN EN MAPA -->
                        <div id="locationWorkshop" class="control-group border-transparent-1px">
                            <div class="row-fluid">
                                <label class="span2" for="mapWorkshopContainer">
                                    <h5>Mapa de ubicación</h5>
                                </label>
                            </div>
                            <div id="mapWorkshopContainer" class="border-dashed-1px">
                                <iframe id="iframeMapWorkshop"
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3328.9716318467913!2d${getLongitud}!3d${getLatitud}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzPCsDI3JzAwLjIiUyA3MMKwMzYnMzUuMiJX!5e0!3m2!1ses-419!2scl!4v1623787161454!5m2!1ses-419!2scl"
                                    width="100%" height="450" style="border:0;" allowfullscreen=""
                                    loading="lazy"></iframe>
                            </div>
                        </div>

                        <!--GUARDAR / CANCELAR-->
                        <div id="workshopActionButtons_${taller.id}" class="control-group">
                            <div class="span12 text-right border-transparent-1px">
                                <!--<a id="saveWorkshop_${taller.id}" class="btn btn-primary" href="/talleres">Guardar</a>
                                <a id="dontSaveWorkshop_${taller.id}" class="btn btn-primary" href="/talleres">Cancelar</a>-->
                                <button id="saveWorkshop_${taller.id}" class="btn btn-primary" type="submit">Guardar</button>
                                <button id="dontSaveWorkshop_${taller.id}" class="btn btn-primary" type="button" onclick="window.history.back();">Cancelar</button>
                            </div>
                        </div>
                    </form>`;
                } else {
                    fillWorkshop = `<h1>=(</h1>
                    <p>-- No se logró obtener el taller ${identificador}</p>`
                }

                workshopHTML = workshopHTML.concat(fillWorkshop)

                $('#pages').html(workshopHTML)
                console.log(`AJAX workshopFormQuery_ -> Status: ${status}`)
                
                taller ? fillOptions(): {};

            },
            error: function (jqXHR) {
                console.log(jqXHR)
            }
        })

        return workshopHTML;
    }
}

const fillOptions = () => {

    console.log("Entré al fillOptions en AssetWareHouseView")
    $(document).ready(function () {

        // Select Región
        const selectRegion = document.getElementById('workshopRegionOptions');
        const optionRegion = listSelect(regiones, "name"); // Paso la clave "name"
        loadSelectContentAndSelected(optionRegion, selectRegion, getRegion);
        console.log("Región taller seleccionada: " + getRegion);

        // Select Comuna
        const region = regiones.find((region) => region.name == getRegion);
        getComunasRegion = listAllElement(region.communes)
        const selectComuna = document.getElementById('workshopCommuneOptions');
        const optionComuna = listSelect(getComunasRegion, "name"); // Paso la clave "name"
        loadSelectContentAndSelected(optionComuna, selectComuna, getComuna);
        console.log("Comuna taller seleccionada: " + getComuna);

        // Cambio de Región y comuna
        $('div #pages').on('change', 'select#workshopRegionOptions', e => {
            selectComuna.innerHTML = '<option value="">-</option>';
            const comunas = regiones.find(elem => elem.name == e.target.value); //Con filter no me completa el listAllElement
            comunasRegionCambiada = listAllElement(comunas.communes)
            const listaComunas = listSelect(comunasRegionCambiada, "name");
            loadSelectContent(listaComunas, selectComuna);

        })

    });

}

const guardarTallerJSON = () => {

    banderaTaller = false;

    tallerJSON.idTallerServicio = idUrl;

    let nombreTaller = document.getElementById(`workshopName_${idUrl}`);
    tallerJSON.nombre = nombreTaller.value;

    let selectRegion = document.getElementById('workshopRegionOptions');
    tallerJSON.region = selectRegion.options[selectRegion.selectedIndex].text;

    let selectComuna = document.getElementById('workshopCommuneOptions');
    tallerJSON.comuna = selectComuna.options[selectComuna.selectedIndex].text;

    let calleTaller = document.getElementById('streetWorkshop');
    tallerJSON.calle = calleTaller.value;

    let numeroTaller = document.getElementById('numStreetWorkshop')
    tallerJSON.numero = numeroTaller.value;

    let latitudTaller = document.getElementById('latitudeWorkshop');
    tallerJSON.latitud = latitudTaller.value;

    let longitudTaller = document.getElementById('longitudeWorkshop')
    tallerJSON.longitud = longitudTaller.value;

    //Por ahora valor de referencia
    //Debe tener valor de relación idGeocercaCabecera en BD de Plataforma
    tallerJSON.idGeocercaCabecera = 0;

    if (nombreTaller.value != ''
        && selectRegion.options[selectRegion.selectedIndex].text != ''
        && selectComuna.options[selectComuna.selectedIndex].text != ''
        && calleTaller.value != ''
        && numeroTaller.value != ''
        && latitudTaller.value != ''
        && longitudTaller.value != '') {

        banderaTaller = true;

    }

    //Creación del JSON
    if (banderaTaller == true) {
        sessionStorage.setItem(`ActualizacionTaller_${idUrl}`, JSON.stringify(tallerJSON));
    }

}

const removerVariableTallerStorageJSON = () => {

    if (sessionStorage.getItem(`ActualizacionTaller_${idUrl}`)) {
        sessionStorage.removeItem(`ActualizacionTaller_${idUrl}`);
    }

}

const mostrarTallerStorageJSON = () => {

    if (sessionStorage.getItem(`ActualizacionTaller_${idUrl}`)) {
        console.log(`\n\nActualizacionTaller_${idUrl}\n\n` + sessionStorage.getItem(`ActualizacionTaller_${idUrl}`));
        alert(`\n\nActualizacionTaller_${idUrl}\n\n` + JSON.stringify(tallerJSON, undefined, 4));
        //sessionStorage.removeItem(`ActualizacionTaller_${idUrl}`);
    }
}

$(document).ready(function () {

    $('div #pages').on('click', `button#saveWorkshop_${idUrl}`, function () {
        guardarTallerJSON();
        mostrarTallerStorageJSON();
    });

})