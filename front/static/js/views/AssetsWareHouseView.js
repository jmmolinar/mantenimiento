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

//Variable para controlar la creación de JSON de bodega
let banderaBodega = false;

//VARIABLE PARA JSON
let bodegaJSON = {
    "idBodegaActivos": 0,
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
        this.setTitle(`Bodega ${this.postId}`);
    }

    async getHtml() {

        let identificador = this.postId;
        let wareHouseHTML = ``;
        idUrl = parseInt(identificador);

        $.ajax({
            type: 'GET',
            url: 'http://192.168.0.14:8080/static/js/data/assetsWareHouses.JSON',
            dataType: 'json',
            success: function (data, status, jqXHR) {

                console.log(jqXHR)
                let fillWareHouse = ''
                const bodega = data.find((bodega) => bodega.idBodegaActivos == identificador)

                if (bodega) {

                    getRegion = bodega.region;
                    getComuna = bodega.comuna;
                    getLatitud = bodega.latitud;
                    console.log(`Latitud: ${getLatitud}`);
                    getLongitud = bodega.longitud;
                    console.log(`Longitud: ${getLongitud}`);
                    console.log("Verificando postId: " + identificador)
                    console.log("Vericando const bodega: " + bodega)

                    fillWareHouse = `<h1></h1>
                    <form id="wareHouseFormQuery_${bodega.idBodegaActivos}" action="/bodegas">
                        <!--IDENTIFICADOR DE LA BODEGA-->
                        <div id="wareHouseId_${bodega.idBodegaActivos}" class="control-group order-identity border-transparent-1px">
                            <h1>Bodega ${bodega.idBodegaActivos}</h1>
                            <h3>${bodega.nombre}</h3>
                        </div>
                        <!--DATOS DE LA BODEGA-->
                        <div id="wareHouseData_${bodega.idBodegaActivos}" class="control-group border-transparent-1px">
                            
                            <!--NOMBRE DE BODEGA-->
                            <div class="control-group">
                                <label class="span2" for="wareHouseName_${bodega.idBodegaActivos}">
                                    <h5>Nombre</h5>
                                </label>
                                <div class="controls">
                                    <input id="wareHouseName_${bodega.idBodegaActivos}" type="text" min="3" maxlength="30"
                                        value="${bodega.nombre}" required>
                                </div>
                            </div>

                            <!--CANTIDAD ACTIVOS EN BODEGA-->
                            <div class="control-group">
                                <label class="span2" for="wareHouseAssetsCount_${bodega.idBodegaActivos}">
                                    <h5>Asignados</h5>
                                </label>
                                <div class="controls">
                                    <input id="wareHouseAssetsCount_${bodega.idBodegaActivos}" type="number" maxlength="30"
                                        value="${bodega.cantidad_activos}" disabled required>
                                </div>
                            </div>

                            <!--REGIÓN DE BODEGA-->
                            <div class="control-group">
                                <label class="span2" for="wareHouseRegionOptions">
                                    <h5>Región</h5>
                                </label>
                                <div class="controls">
                                    <select id="wareHouseRegionOptions" required>
                                        <option>-</option>
                                    </select>
                                </div>
                            </div>

                            <!--COMUNA DE BODEGA-->
                            <div class="control-group">
                                <label class="span2" for="wareHouseCommuneOptions">
                                     <h5>Comuna</h5>
                                </label>
                                <div class="controls">
                                    <select id="wareHouseCommuneOptions" required>
                                        <option>-</option>
                                    </select>
                                </div>
                            </div>

                            <!--CALLE DE BODEGA-->
                            <div class="control-group">
                                <label class="span2" for="streetWareHouse">
                                    <h5>Calle</h5>
                                </label>
                                <div class="controls">
                                    <input id="streetWareHouse" type="text" min="3" maxlength="30"
                                        value="${bodega.calle}" required>
                                </div>
                            </div>

                            <!--NÚMERO DE CALLE DE BODEGA-->
                            <div class="control-group">
                                <label class="span2" for="numStreetWareHouse">
                                    <h5>Número</h5>
                                </label>
                                <div class="controls">
                                    <input id="numStreetWareHouse" type="text" type="number" step="1" min="0"
                                        maxlength="10" value="${bodega.numero}" placeholder="e.g. 41" required>
                                </div>
                            </div>

                            <!--LATITUDE DE BODEGA-->
                            <div class="control-group">
                                <label class="span2" for="latitudeWareHouse">
                                    <h5>Latitud</h5>
                                </label>
                                <div class="controls">
                                    <input id="latitudeWareHouse" type="number" maxlength="30" step="0.01"
                                        value="${getLatitud}" required>
                                </div>
                            </div>

                            <!--LONGITUDE DE BODEGA-->
                            <div class="control-group">
                                <label class="span2" for="longitudeWareHouse">
                                    <h5>Longitud</h5>
                                </label>
                                <div class="controls">
                                    <input id="longitudeWareHouse" type="number" maxlength="30" step="0.01"
                                        value="${getLongitud}" required>
                                </div>
                            </div>
                        </div>

                        <!-- UBICACIÓN EN MAPA -->
                        <div id="locationWareHouse" class="control-group border-transparent-1px">
                            <div class="row-fluid">
                                <label class="span2" for="mapWareHouseContainer">
                                    <h5>Mapa de ubicación</h5>
                                </label>
                            </div>
                            <div id="mapWareHouseContainer" class="border-dashed-1px">
                                <iframe id="iframeMapWareHouse"
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3328.9716318467913!2d${getLongitud}!3d${getLatitud}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzPCsDI3JzAwLjIiUyA3MMKwMzYnMzUuMiJX!5e0!3m2!1ses-419!2scl!4v1623787161454!5m2!1ses-419!2scl"
                                    width="100%" height="450" style="border:0;" allowfullscreen=""
                                    loading="lazy"></iframe>
                            </div>
                        </div>

                        <!--GUARDAR / CANCELAR-->
                        <div id="wareHouseActionButtons_${bodega.idBodegaActivos}" class="control-group">
                            <div class="span12 text-right border-transparent-1px">
                                <!--<a id="saveWareHouse_${bodega.idBodegaActivos}" class="btn btn-primary" href="/bodegas">Guardar</a>
                                <a id="dontSaveWareHouse_${bodega.idBodegaActivos}" class="btn btn-primary" href="/bodegas">Cancelar</a>-->
                                <button id="saveWareHouse_${bodega.idBodegaActivos}" class="btn btn-primary" type="submit">Guardar</button>
                                <button id="dontSaveWareHouse_${bodega.idBodegaActivos}" class="btn btn-primary" type="button" onclick="window.history.back();">Cancelar</button>
                            </div>
                        </div>
                    </form>`;
                } else {
                    fillWareHouse = `<h1>=(</h1>
                    <p>-- No se logró obtener la bodega ${identificador}</p>`
                }

                wareHouseHTML = wareHouseHTML.concat(fillWareHouse)

                $('#pages').html(wareHouseHTML)
                console.log(`AJAX wareHouseFormQuery -> Status: ${status}`)
                
                bodega ? fillOptions(): {};

            },
            error: function (jqXHR) {
                console.log(jqXHR)
            }
        })

        return wareHouseHTML;
    }
}

const fillOptions = () => {

    console.log("Entré al fillOptions en AssetsWareHouseView")
    $(document).ready(function () {

        // Select Región
        const selectRegion = document.getElementById('wareHouseRegionOptions');
        const optionRegion = listSelect(regiones, "name"); // Paso la clave "name"
        loadSelectContentAndSelected(optionRegion, selectRegion, getRegion);
        console.log("Región seleccionada: " + getRegion);

        // Select Comuna
        const region = regiones.find((region) => region.name == getRegion);
        getComunasRegion = listAllElement(region.communes)
        const selectComuna = document.getElementById('wareHouseCommuneOptions');
        const optionComuna = listSelect(getComunasRegion, "name"); // Paso la clave "name"
        loadSelectContentAndSelected(optionComuna, selectComuna, getComuna);
        console.log("Comuna seleccionada: " + getComuna);

        // Cambio de Región y comuna
        $('div #pages').on('change', 'select#wareHouseRegionOptions', e => {
            selectComuna.innerHTML = '<option value="">-</option>';
            const comunas = regiones.find(elem => elem.name == e.target.value); //Con filter no me completa el listAllElement
            comunasRegionCambiada = listAllElement(comunas.communes)
            const listaComunas = listSelect(comunasRegionCambiada, "name");
            loadSelectContent(listaComunas, selectComuna);

        })

    });

}

const guardarBodegaJSON = () => {

    banderaBodega = false;

    bodegaJSON.idBodegaActivos = idUrl;

    let nombreBodega = document.getElementById(`wareHouseName_${idUrl}`)
    bodegaJSON.nombre = nombreBodega.value;

    // La variable de ASIGNADOS no se toma en cuenta para el JSON
    // Se tomará ese dato para mostrarlo mediante consultas

    let selectRegion = document.getElementById('wareHouseRegionOptions');
    bodegaJSON.region = selectRegion.options[selectRegion.selectedIndex].text;

    let selectComuna = document.getElementById('wareHouseCommuneOptions');
    bodegaJSON.comuna = selectComuna.options[selectComuna.selectedIndex].text;

    let calleBodega = document.getElementById('streetWareHouse');
    bodegaJSON.calle = calleBodega.value;

    let numeroBodega = document.getElementById('numStreetWareHouse');
    bodegaJSON.numero = numeroBodega.value;

    let latitudBodega = document.getElementById('latitudeWareHouse');
    bodegaJSON.latitud = latitudBodega.value;

    let longitudBodega = document.getElementById('longitudeWareHouse');
    bodegaJSON.longitud = longitudBodega.value;

    //Por ahora valor de referencia
    //Debe tener valor de relación idGeocercaCabecera en BD de Plataforma
    bodegaJSON.idGeocercaCabecera = 0;


    if (nombreBodega.value != ''
        && selectRegion.options[selectRegion.selectedIndex].text != ''
        && selectComuna.options[selectComuna.selectedIndex].text != ''
        && calleBodega.value != ''
        && numeroBodega.value != ''
        && latitudBodega.value != ''
        && longitudBodega.value != '') {

        banderaBodega = true;

    }

    //Creación del JSON
    if (banderaBodega == true) {
        sessionStorage.setItem(`ActualizacionBodega_${idUrl}`, JSON.stringify(bodegaJSON));
    }

}

const removerVariableBodegaStorageJSON = () => {

    if (sessionStorage.getItem(`ActualizacionBodega_${idUrl}`)) {
        sessionStorage.removeItem(`ActualizacionBodega_${idUrl}`);
    }

}

const mostrarBodegaStorageJSON = () => {

    if (sessionStorage.getItem(`ActualizacionBodega_${idUrl}`)) {
        console.log(`\n\nActualizacionBodega_${idUrl}\n\n` + sessionStorage.getItem(`ActualizacionBodega_${idUrl}`));
        //alert(`\n\nActualizacionBodega_${idUrl}\n\n` + JSON.stringify(bodegaJSON, undefined, 4));
        //sessionStorage.removeItem(`NuevoActivo`);
    }
}

$(document).ready(function () {

    $('div #pages').on('click', `button#saveWareHouse_${idUrl}`, function () {
        guardarBodegaJSON();
        mostrarBodegaStorageJSON();
    });

})