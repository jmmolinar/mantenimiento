/* Cargar contenido en el select */
const loadSelectContent = (array, select) => {
    select.innerHTML = `<option></option>`;
    array.forEach(element => {
        //const option = document.createElement('option');
        let option = document.createElement('option');
        option.value = element;//.toUpperCase();
        option.textContent = element;
        //console.log("Elemento creado:  " + option.textContent)
        select.appendChild(option);
    })
}

/* Cargar contenido en el select y establecer selected */
const loadSelectContentAndSelected = (array, select, flag) => {
    //console.log("Este es el tipo del flag: " + typeof(flag))
    select.innerHTML = `<option></option>`;
    array.forEach(element => {
        let option = document.createElement('option');
        option.value = element;//.toUpperCase();
        option.textContent = element;
        if (option.textContent == flag) {
            //console.log("Option seleccionado: " + option.textContent)
            option.selected = 'selected';
        }
        select.appendChild(option);
    })
}

/* Cargar contenido en el DIV y crear Alert por cada Uno*/
const loadDivSelectedPlan = (div, multiple, key) => {
    
    //div.innerHTML = `<div></div>`;
    multiple.forEach(elem => {

        let divChild = document.createElement("div");
        divChild.className = "alert new-alert";

        let buttonChild = document.createElement("button");
        buttonChild.setAttribute("type", "button");
        buttonChild.setAttribute("class", "close");
        buttonChild.setAttribute("data-dismiss", "alert");
        buttonChild.textContent = `x`;

        let strongChild = document.createElement("strong");
        strongChild.setAttribute("class", "name-plan");
        strongChild.innerHTML = elem[key];

        divChild.appendChild(buttonChild);
        divChild.appendChild(strongChild);

        div.appendChild(divChild);

    })
}

/* Cargar contenido en el select y establecer selected de forma múltiple */
const loadSelectContentAndSelectedMultiple = (array, select, multiple, key) => {
    select.innerHTML = `<option></option>`;
    array.forEach(element => {
        let option = document.createElement('option');
        //option.type = "checkbox"
        option.value = element;//.toUpperCase();
        option.textContent = element;
        multiple.forEach(elem => {
            if (option.textContent == elem[key]) {
                console.log("Option seleccionado: " + option.textContent)
                option.selected = 'selected';
                //option.checked = 'checked';
            }
        })
        select.appendChild(option);
    })
}

/* Un arreglo de elementos key (la clave a buscar ej. "nombre") */
const listSelect = (array, key) => {
    let listado = [];
    array.forEach(elem => {
        //console.log(elem)
        if (!listado.includes(elem[key])) {
            listado.push(elem[key])
        }
    })
    return listado;//.sort();
}

/* Un arreglo de elementos */
const listAllElement = (array) => {
    let listado = [];
    array.forEach(elem => {
        if (!listado.includes(elem)) {
            listado.push(elem)
            //console.log("Agregando al arreglo: " + elem)
        }
    })
    return listado;
}

/* Cargar anios en el select */
const listAnioAndSelected = (select, flag) => {
    const max = new Date().getFullYear();
    const min = max - 20;
    for (let i = max; i > min; i--) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        if (option.textContent == flag) {
            option.selected = 'selected';
        }
        select.appendChild(option);
    }
}

const currentDate = () => {

    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1; //January is 0!
    let yyyy = today.getFullYear();

    let hh = today.getHours();
    let ms = today.getMinutes();
    let ss = today.getSeconds();

    if (dd < 10) {dd = '0' + dd;}
    if (mm < 10) {mm = '0' + mm;}

    if (hh < 10) {hh = '0' + hh;}
    if (ms < 10) {ms = '0' + ms;}
    if (ss < 10) {ss = '0' + ss;}

    //console.log("currentDate(): " + yyyy + '-' + mm + '-' + dd + 'T' + hh + ':' + ms + ':' + ss);
    return today = yyyy + '-' + mm + '-' + dd + 'T' + hh + ':' + ms + ':' + ss;

}

const olderDate = (dateA, dateB) => {

    const a = new Date(dateA);
    const b = new Date(dateB);
    
    if (a > b) {
        return dateA;
    } else {
        return dateB;
    }

}

const getJson = (urlJson, title) => {
    const result = [];
    //console.log("Entré al getJson");
    $.ajax({
        type: 'GET',
        url: urlJson,
        dataType: 'json',
        success: function (data, status, jqXHR){
            console.log(`Entré al AJAX de: ${title}`);
            console.log(jqXHR);
            for (const element of data){
                //arrayJson.push(element);
                result.push(element);
            }
            console.log(`AJAX: ${title} -> Status: ${status}`)
        },
        error: function (jqXHR) {
            console.log(`Error en AJAX de: ${title}`)
            console.log(jqXHR)
        }
    })
    //console.log(result);
    return result;
}

//Tipos de mantenimientos
let ordersTypeJSON = 'http://192.168.0.13:8080/static/js/data/ordersType.JSON';
let titleOrdersTypeJSON = "Tipos de mantenimientos";
let getTiposMantenimientos = [];
getTiposMantenimientos = getJson(ordersTypeJSON, titleOrdersTypeJSON);

//Estados
let stateJSON = 'http://192.168.0.13:8080/static/js/data/state.JSON';
let titleStateJSON = 'Estados';
let getEstados = [];
getEstados = getJson(stateJSON, titleStateJSON);

//Areas
let areasJSON = 'http://192.168.0.13:8080/static/js/data/areas.JSON';
let titleAreasJSON = "Áreas";
let getAreas = [];
getAreas = getJson(areasJSON, titleAreasJSON);

//Tipos de activos
let tiposActivosJSON = 'http://192.168.0.13:8080/static/js/data/assetsType.JSON';
let titleTiposActivosJSON = 'Tipos de activos';
let getTiposActivos = [];
getTiposActivos = getJson(tiposActivosJSON, titleTiposActivosJSON);

//Activos
let activosJSON = 'http://192.168.0.13:8080/static/js/data/assets.JSON';
let titleActivosJSON = 'Activos';
let getActivos = [];
getActivos = getJson(activosJSON, titleActivosJSON);

//Talleres
let talleresJSON = 'http://192.168.0.13:8080/static/js/data/workshops.JSON';
let titleTalleresJSON = 'Talleres';
let getTalleres = [];
getTalleres = getJson(talleresJSON, titleTalleresJSON);

//Bodegas
let bodegasJSON = 'http://192.168.0.13:8080/static/js/data/assetsWareHouses.JSON';
let titleBodegasJSON = 'Bodegas';
let getBodegas = [];
getBodegas = getJson(bodegasJSON, titleBodegasJSON);

//Categorías de servicio
let categoriasJSON = 'http://192.168.0.13:8080/static/js/data/serviceCategories.JSON';
let titleCategoriasJSON = 'Categorías';
let getCategorias = [];
getCategorias = getJson(categoriasJSON, titleCategoriasJSON);

//Planes de mantenimiento
let planesJSON = 'http://192.168.0.13:8080/static/js/data/planning.JSON';
let titlePlanesJSON = 'Planes';
let getPlanes = [];
getPlanes = getJson(planesJSON, titlePlanesJSON);

//Regiones
/*let regionesJSON = 'http://192.168.0.13:8080/static/js/data/regions.JSON';
let titleRegionesJSON = 'Regiones';
let getRegiones = [];
getRegiones = getJson(regionesJSON, titleRegionesJSON);*/

let estados = [
    {
        "id_estado": 1,
        "nombre": "Por planificar",
        "alias": "PC",
        "asignado_por": "Sistema",
        "id_padre": []
    },
    {
        "id_estado": 2,
        "nombre": "Planificado",
        "alias": "P",
        "asignado_por": "Usuario",
        "id_padre": [1]
    },
    {
        "id_estado": 3,
        "nombre": "Retrasado",
        "alias": "R",
        "asignado_por": "Sistema",
        "id_padre": [1]
    },
    {
        "id_estado": 4,
        "nombre": "Planificado con retraso",
        "alias": "PCR",
        "asignado_por": ["Usuario","Sistema"],
        "id_padre": [2,3]
    },
    {
        "id_estado": 5,
        "nombre": "En taller",
        "alias": "ET",
        "asignado_por": "Sistema",
        "id_padre": [2,4]
    },
    {
        "id_estado": 6,
        "nombre": "Retraso en taller",
        "alias": "RT",
        "asignado_por": "Sistema",
        "id_padre": [5]
    },
    {
        "id_estado": 7,
        "nombre": "Salida de taller",
        "alias": "ST",
        "asignado_por": "Sistema",
        "id_padre": [5,6]
    },
    {
        "id_estado": 8,
        "nombre": "Completado",
        "alias": "C",
        "asignado_por": "Usuario",
        "id_padre": [7]
    },
    {
        "id_estado": 9,
        "nombre": "Completado con retraso",
        "alias": "CR",
        "asignado_por": "Usuario",
        "id_padre": [7]
    },
    {
        "id_estado": 10,
        "nombre": "No realizado",
        "alias": "NR",
        "asignado_por": "Usuario",
        "id_padre": [1,2,3,4]
    }

]

let tiposMantenimiento = [
    {
        "id_tipo_mantenimiento": "1",
        "nombre": "Preventivo"
    },
    {
        "id_tipo_mantenimiento": "2",
        "nombre": "Correctivo"
    }
]

let tiposActivos = [
    {
        "id_activo": "3",
        "nombre": "Herramienta"
    },
    {
        "id_activo": "2",
        "nombre": "Máquina"
    },
    {
        "id_activo": "1",
        "nombre": "Vehículo"
    }
]

let frecuenciaPeriodo = [
    {
        "id_frecuencia": "1",
        "nombre": "Días"
    },
    {
        "id_frecuencia": "2",
        "nombre": "Semanas"
    },
    {
        "id_frecuencia": "3",
        "nombre": "Meses"
    },
    {
        "id_frecuencia": "4",
        "nombre": "Años"
    }
]

let areas = [
    {
        "id_area": "1",
        "nombre": "Área 11"
    },
    {
        "id_area": "2",
        "nombre": "Área 21"
    },
    {
        "id_area": "3",
        "nombre": "Área 31"
    },
    {
        "id_area": "4",
        "nombre": "Área 41"
    },
    {
        "id_area": "5",
        "nombre": "Área 51"
    },
    {
        "id_area": "6",
        "nombre": "Área 61"
    },
    {
        "id_area": "7",
        "nombre": "Área 71"
    },
    {
        "id_area": "8",
        "nombre": "Área 81"
    },
    {
        "id_area": "9",
        "nombre": "Área 91"
    },
    {
        "id_area": "10",
        "nombre": "Área 101"
    }
]

let marcas = [
    {
        "id_marca": "1",
        "nombre": "Caterpillar"
    },
    {
        "id_marca": "2",
        "nombre": "Komatsu"
    },
    {
        "id_marca": "3",
        "nombre": "John Deere"
    },
    {
        "id_marca": "4",
        "nombre": "Iveco"
    },
    {
        "id_marca": "5",
        "nombre": "Mazda"
    },
    {
        "id_marca": "6",
        "nombre": "Toyota"
    },
    {
        "id_marca": "7",
        "nombre": "Ford"
    },
    {
        "id_marca": "8",
        "nombre": "Fiat"
    },
    {
        "id_marca": "9",
        "nombre": "Chevrolet"
    }
]

let planes = [
    {
        "id": "11",
        "nombre": "Plan GENERAL"
    },
    {
        "id": "10",
        "nombre": "Plan JOHN DEERE"
    },
    {
        "id": "9",
        "nombre": "Plan KOMATSU"
    },
    {
        "id": "8",
        "nombre": "Plan CHEVROLET"
    },
    {
        "id": "7",
        "nombre": "Plan FIAT"
    },
    {
        "id": "6",
        "nombre": "Plan FORD"
    },
    {
        "id": "5",
        "nombre": "Plan TOYOTA"
    },
    {
        "id": "4",
        "nombre": "Plan ESTÁNDAR"
    },
    {
        "id": "3",
        "nombre": "Plan MAZDA"
    },
    {
        "id": "2",
        "nombre": "Plan CATERPILLAR"
    },
    {
        "id": "1",
        "nombre": "Plan IVECO"
    }
]

let bodegas = [
    {
        "id": "5",
        "nombre": "Sede Oeste",
        "comuna": "Viña del Mar",
        "region": "Valparaíso",
        "calle": "Agua Santa",
        "num_calle": "311",
        "latitud": "-33.0466072",
        "longitud": "-71.5654153",
        "cantidad_activos": "50"
    },
    {
        "id": "4",
        "nombre": "Sede Sur A",
        "comuna": "Villarrica",
        "region": "Araucanía",
        "calle": "San Martín",
        "num_calle": "460",
        "latitud": "-39.2771416",
        "longitud": "-72.2271881",
        "cantidad_activos": "4"
    },
    {
        "id": "3",
        "nombre": "Sede Sur B",
        "comuna": "Valdivia",
        "region": "Los Ríos",
        "calle": "Las Encinas",
        "num_calle": "51",
        "latitud": "-39.8100413",
        "longitud": "-73.2529351",
        "cantidad_activos": "8"
    },
    {
        "id": "2",
        "nombre": "Sede Norte",
        "comuna": "Iquique",
        "region": "Tarapacá",
        "calle": "Serrano",
        "num_calle": "132",
        "latitud": "-20.213486",
        "longitud": "-70.1541984",
        "cantidad_activos": "110"
    },
    {
        "id": "1",
        "nombre": "Sede Central",
        "comuna": "Ñuñoa",
        "region": "Metropolitana de Santiago",
        "calle": "Irarrázaval",
        "num_calle": "1220",
        "latitud": "-33.4530769",
        "longitud": "-70.6188521",
        "cantidad_activos": "120"
    }
]

let talleres = [
    {
        "id": "5",
        "nombre": "Taller EEE",
        "comuna": "Viña del Mar",
        "region": "Valparaíso",
        "calle": "Agua Santa",
        "num_calle": "311",
        "latitud": "-33.0466072",
        "longitud": "-71.5654153"
    },
    {
        "id": "4",
        "nombre": "Taller DDD",
        "comuna": "Villarrica",
        "region": "Araucanía",
        "calle": "San Martín",
        "num_calle": "460",
        "latitud": "-39.2771416",
        "longitud": "-72.2271881"
    },
    {
        "id": "3",
        "nombre": "Taller CCC",
        "comuna": "Valdivia",
        "region": "Los Ríos",
        "calle": "Las Encinas",
        "num_calle": "51",
        "latitud": "-39.8100413",
        "longitud": "-73.2529351"
    },
    {
        "id": "2",
        "nombre": "Taller BBB",
        "comuna": "Iquique",
        "region": "Tarapacá",
        "calle": "Serrano",
        "num_calle": "132",
        "latitud": "-20.213486",
        "longitud": "-70.1541984"
    },
    {
        "id": "1",
        "nombre": "Taller AAA",
        "comuna": "Ñuñoa",
        "region": "Metropolitana de Santiago",
        "calle": "Irarrázaval",
        "num_calle": "1220",
        "latitud": "-33.4530769",
        "longitud": "-70.6188521"
    }
]

let regiones = [
    {
        "name": "Arica y Parinacota",
        "romanNumber": "XV",
        "number": "15",
        "abbreviation": "AP",
        "communes": [
            { "name": "Arica" },
            { "name": "Camarones" },
            { "name": "General Lagos" },
            { "name": "Putre" }
        ]
    },
    {
        "name": "Tarapacá",
        "romanNumber": "I",
        "number": "1",
        "abbreviation": "TA",
        "communes": [
            { "name": "Alto Hospicio" },
            { "name": "Camiña" },
            { "name": "Colchane" },
            { "name": "Huara" },
            { "name": "Iquique" },
            { "name": "Pica" },
            { "name": "Pozo Almonte" }
        ]
    },
    {
        "name": "Antofagasta",
        "romanNumber": "II",
        "number": "2",
        "abbreviation": "AN",
        "communes": [
            { "name": "Antofagasta" },
            { "name": "Calama" },
            { "name": "María Elena" },
            { "name": "Mejillones" },
            { "name": "Ollagüe" },
            { "name": "San Pedro de Atacama" },
            { "name": "Sierra Gorda" },
            { "name": "Taltal" },
            { "name": "Tocopilla" }
        ]
    },
    {
        "name": "Atacama",
        "romanNumber": "III",
        "number": "3",
        "abbreviation": "AT",
        "communes": [
            { "name": "Alto del Carmen" },
            { "name": "Caldera" },
            { "name": "Chañaral" },
            { "name": "Copiapó" },
            { "name": "Diego de Almagro" },
            { "name": "Freirina" },
            { "name": "Huasco" },
            { "name": "Tierra Amarilla" },
            { "name": "Vallenar" }
        ]
    },
    {
        "name": "Coquimbo",
        "romanNumber": "IV",
        "number": "4",
        "abbreviation": "CO",
        "communes": [
            { "name": "Andacollo" },
            { "name": "Canela" },
            { "name": "Combarbalá" },
            { "name": "Coquimbo" },
            { "name": "Illapel" },
            { "name": "La Higuera" },
            { "name": "La Serena" },
            { "name": "Los Vilos" },
            { "name": "Monte Patria" },
            { "name": "Ovalle" },
            { "name": "Paiguano" },
            { "name": "Punitaqui" },
            { "name": "Río Hurtado" },
            { "name": "Salamanca" },
            { "name": "Vicuña" }
        ]
    },
    {
        "name": "Valparaíso",
        "romanNumber": "V",
        "number": "5",
        "abbreviation": "VA",
        "communes": [
            { "name": "Algarrobo" },
            { "name": "Cabildo" },
            { "name": "Calera" },
            { "name": "Calle Larga" },
            { "name": "Cartagena" },
            { "name": "Casablanca" },
            { "name": "Catemu" },
            { "name": "Concón" },
            { "name": "El Quisco" },
            { "name": "El Tabo" },
            { "name": "Hijuelas" },
            { "name": "Isla de Pascua" },
            { "name": "Juan Fernández" },
            { "name": "La Cruz" },
            { "name": "La Ligua" },
            { "name": "Limache" },
            { "name": "Llaillay" },
            { "name": "Los Andes" },
            { "name": "Nogales" },
            { "name": "Olmué" },
            { "name": "Panquehue" },
            { "name": "Papudo" },
            { "name": "Petorca" },
            { "name": "Puchuncaví" },
            { "name": "Putaendo" },
            { "name": "Quillota" },
            { "name": "Quilpué" },
            { "name": "Quintero" },
            { "name": "Rinconada" },
            { "name": "San Antonio" },
            { "name": "San Esteban" },
            { "name": "San Felipe" },
            { "name": "Santa María" },
            { "name": "Santo Domingo" },
            { "name": "Valparaíso" },
            { "name": "Villa Alemana" },
            { "name": "Viña del Mar" },
            { "name": "Zapallar" }
        ]
    },
    {
        "name": "Metropolitana de Santiago",
        "romanNumber": "XIII",
        "number": "13",
        "abbreviation": "RM",
        "communes": [
            { "name": "Alhué" },
            { "name": "Buin" },
            { "name": "Calera de Tango" },
            { "name": "Cerrillos" },
            { "name": "Cerro Navia" },
            { "name": "Colina" },
            { "name": "Conchalí" },
            { "name": "Curacaví" },
            { "name": "El Bosque" },
            { "name": "El Monte" },
            { "name": "Estación Central" },
            { "name": "Huechuraba" },
            { "name": "Independencia" },
            { "name": "Isla de Maipo" },
            { "name": "La Cisterna" },
            { "name": "La Florida" },
            { "name": "La Granja" },
            { "name": "La Pintana" },
            { "name": "La Reina" },
            { "name": "Lampa" },
            { "name": "Las Condes" },
            { "name": "Lo Barnechea" },
            { "name": "Lo Espejo" },
            { "name": "Lo Prado" },
            { "name": "Macul" },
            { "name": "Maipú" },
            { "name": "María Pinto" },
            { "name": "Melipilla" },
            { "name": "Ñuñoa" },
            { "name": "Padre Hurtado" },
            { "name": "Paine" },
            { "name": "Pedro Aguirre Cerda" },
            { "name": "Peñaflor" },
            { "name": "Peñalolén" },
            { "name": "Pirque" },
            { "name": "Providencia" },
            { "name": "Pudahuel" },
            { "name": "Puente Alto" },
            { "name": "Quilicura" },
            { "name": "Quinta Normal" },
            { "name": "Recoleta" },
            { "name": "Renca" },
            { "name": "San Bernardo" },
            { "name": "San Joaquín" },
            { "name": "San José de Maipo" },
            { "name": "San Miguel" },
            { "name": "San Pedro" },
            { "name": "San Ramón" },
            { "name": "Santiago" },
            { "name": "Talagante" },
            { "name": "Tiltil" },
            { "name": "Vitacura" }
        ]
    },
    {
        "name": "Libertador Gral. Bernardo O’Higgins",
        "romanNumber": "VI",
        "number": "6",
        "abbreviation": "LI",
        "communes": [
            { "name": "Chimbarongo" },
            { "name": "Chépica" },
            { "name": "Codegua" },
            { "name": "Coinco" },
            { "name": "Coltauco" },
            { "name": "Doñihue" },
            { "name": "Graneros" },
            { "name": "La Estrella" },
            { "name": "Las Cabras" },
            { "name": "Litueche" },
            { "name": "Lolol" },
            { "name": "Machalí" },
            { "name": "Malloa" },
            { "name": "Marchihue" },
            { "name": "Nancagua" },
            { "name": "Navidad" },
            { "name": "Olivar" },
            { "name": "Palmilla" },
            { "name": "Paredones" },
            { "name": "Peralillo" },
            { "name": "Peumo" },
            { "name": "Pichidegua" },
            { "name": "Pichilemu" },
            { "name": "Placilla" },
            { "name": "Pumanque" },
            { "name": "Quinta de Tilcoco" },
            { "name": "Rancagua" },
            { "name": "Rengo" },
            { "name": "Requínoa" },
            { "name": "San Fernando" },
            { "name": "San Francisco de Mostazal" },
            { "name": "San Vicente de Tagua Tagua" },
            { "name": "Santa Cruz" }
        ]
    },
    {
        "name": "Maule",
        "romanNumber": "VII",
        "number": "7",
        "abbreviation": "ML",
        "communes": [
            { "name": "Cauquenes" },
            { "name": "Chanco" },
            { "name": "Colbún" },
            { "name": "Constitución" },
            { "name": "Curepto" },
            { "name": "Curicó" },
            { "name": "Empedrado" },
            { "name": "Hualañé" },
            { "name": "Licantén" },
            { "name": "Linares" },
            { "name": "Longaví" },
            { "name": "Maule" },
            { "name": "Molina" },
            { "name": "Parral" },
            { "name": "Pelarco" },
            { "name": "Pelluhue" },
            { "name": "Pencahue" },
            { "name": "Rauco" },
            { "name": "Retiro" },
            { "name": "Romeral" },
            { "name": "Río Claro" },
            { "name": "Sagrada Familia" },
            { "name": "San Clemente" },
            { "name": "San Javier de Loncomilla" },
            { "name": "San Rafael" },
            { "name": "Talca" },
            { "name": "Teno" },
            { "name": "Vichuquén" },
            { "name": "Villa Alegre" },
            { "name": "Yerbas Buenas" }
        ]
    },
    {
        "name": "Ñuble",
        "romanNumber": "XVI",
        "number": "16",
        "abbreviation": "NB",
        "communes": [
            { "name": "Bulnes" },
            { "name": "Chillán Viejo" },
            { "name": "Chillán" },
            { "name": "Cobquecura" },
            { "name": "Coelemu" },
            { "name": "Coihueco" },
            { "name": "El Carmen" },
            { "name": "Ninhue" },
            { "name": "Ñiquén" },
            { "name": "Pemuco" },
            { "name": "Pinto" },
            { "name": "Portezuelo" },
            { "name": "Quillón" },
            { "name": "Quirihue" },
            { "name": "Ránquil" },
            { "name": "San Carlos" },
            { "name": "San Fabián" },
            { "name": "San Ignacio" },
            { "name": "San Nicolás" },
            { "name": "Treguaco" },
            { "name": "Yungay" }
        ]
    },
    {
        "name": "Biobío",
        "romanNumber": "VIII",
        "number": "8",
        "abbreviation": "BI",
        "communes": [
            { "name": "Alto Biobío" },
            { "name": "Antuco" },
            { "name": "Arauco" },
            { "name": "Cabrero" },
            { "name": "Cañete" },
            { "name": "Chiguayante" },
            { "name": "Concepción" },
            { "name": "Contulmo" },
            { "name": "Coronel" },
            { "name": "Curanilahue" },
            { "name": "Florida" },
            { "name": "Hualpén" },
            { "name": "Hualqui" },
            { "name": "Laja" },
            { "name": "Lebu" },
            { "name": "Los Álamos" },
            { "name": "Los Ángeles" },
            { "name": "Lota" },
            { "name": "Mulchén" },
            { "name": "Nacimiento" },
            { "name": "Negrete" },
            { "name": "Penco" },
            { "name": "Quilaco" },
            { "name": "Quilleco" },
            { "name": "San Pedro de la Paz" },
            { "name": "San Rosendo" },
            { "name": "Santa Bárbara" },
            { "name": "Santa Juana" },
            { "name": "Talcahuano" },
            { "name": "Tirúa" },
            { "name": "Tomé" },
            { "name": "Tucapel" },
            { "name": "Yumbel" }
        ]
    },
    {
        "name": "Araucanía",
        "romanNumber": "IX",
        "number": "9",
        "abbreviation": "AR",
        "communes": [
            { "name": "Angol" },
            { "name": "Carahue" },
            { "name": "Cholchol" },
            { "name": "Collipulli" },
            { "name": "Cunco" },
            { "name": "Curacautín" },
            { "name": "Curarrehue" },
            { "name": "Ercilla" },
            { "name": "Freire" },
            { "name": "Galvarino" },
            { "name": "Gorbea" },
            { "name": "Lautaro" },
            { "name": "Loncoche" },
            { "name": "Lonquimay" },
            { "name": "Los Sauces" },
            { "name": "Lumaco" },
            { "name": "Melipeuco" },
            { "name": "Nueva Imperial" },
            { "name": "Padre las Casas" },
            { "name": "Perquenco" },
            { "name": "Pitrufquén" },
            { "name": "Pucón" },
            { "name": "Purén" },
            { "name": "Renaico" },
            { "name": "Saavedra" },
            { "name": "Temuco" },
            { "name": "Teodoro Schmidt" },
            { "name": "Toltén" },
            { "name": "Traiguén" },
            { "name": "Victoria" },
            { "name": "Vilcún" },
            { "name": "Villarrica" }
        ]
    },
    {
        "name": "Los Ríos",
        "romanNumber": "XIV",
        "number": "14",
        "abbreviation": "LR",
        "communes": [
            { "name": "Corral" },
            { "name": "Futrono" },
            { "name": "La Unión" },
            { "name": "Lago Ranco" },
            { "name": "Lanco" },
            { "name": "Los Lagos" },
            { "name": "Mariquina" },
            { "name": "Máfil" },
            { "name": "Paillaco" },
            { "name": "Panguipulli" },
            { "name": "Río Bueno" },
            { "name": "Valdivia" }
        ]
    },
    {
        "name": "Los Lagos",
        "romanNumber": "X",
        "number": "10",
        "abbreviation": "LL",
        "communes": [
            { "name": "Ancud" },
            { "name": "Calbuco" },
            { "name": "Castro" },
            { "name": "Chaitén" },
            { "name": "Chonchi" },
            { "name": "Cochamó" },
            { "name": "Curaco de Vélez" },
            { "name": "Dalcahue" },
            { "name": "Fresia" },
            { "name": "Frutillar" },
            { "name": "Futaleufú" },
            { "name": "Hualaihué" },
            { "name": "Llanquihue" },
            { "name": "Los Muermos" },
            { "name": "Maullín" },
            { "name": "Osorno" },
            { "name": "Palena" },
            { "name": "Puerto Montt" },
            { "name": "Puerto Octay" },
            { "name": "Puerto Varas" },
            { "name": "Puqueldón" },
            { "name": "Purranque" },
            { "name": "Puyehue" },
            { "name": "Queilén" },
            { "name": "Quellón" },
            { "name": "Quemchi" },
            { "name": "Quinchao" },
            { "name": "Río Negro" },
            { "name": "San Juan de la Costa" },
            { "name": "San Pablo" }
        ]
    },
    {
        "name": "Aisén del Gral. Carlos Ibáñez del Campo",
        "romanNumber": "XI",
        "number": "11",
        "abbreviation": "AI",
        "communes": [
            { "name": "Aisén" },
            { "name": "Chile Chico" },
            { "name": "Cisnes" },
            { "name": "Cochrane" },
            { "name": "Coyhaique" },
            { "name": "Guaitecas" },
            { "name": "Lago Verde" },
            { "name": "O’Higgins" },
            { "name": "Río Ibáñez" },
            { "name": "Tortel" }
        ]
    },
    {
        "name": "Magallanes y de la Antártica Chilena",
        "romanNumber": "XII",
        "number": "12",
        "abbreviation": "MA",
        "communes": [
            { "name": "Antártica" },
            { "name": "Cabo de Hornos (Ex Navarino)" },
            { "name": "Laguna Blanca" },
            { "name": "Natales" },
            { "name": "Porvenir" },
            { "name": "Primavera" },
            { "name": "Punta Arenas" },
            { "name": "Río Verde" },
            { "name": "San Gregorio" },
            { "name": "Timaukel" },
            { "name": "Torres del Paine" }
        ]
    }
]

/*let anios = [
    {
        "id_anio": 1,
        "anio": "2021"
    },
    {
        "id_anio": 2,
        "anio": "2020"
    },
    {
        "id_anio": 3,
        "anio": "2019"
    },
    {
        "id_anio": 4,
        "anio": "2018"
    },
    {
        "id_anio": 5,
        "anio": "2017"
    },
    {
        "id_anio": 6,
        "anio": "2016"
    },
    {
        "id_anio": 7,
        "anio": "2015"
    },
    {
        "id_anio": 8,
        "anio": "2014"
    },
    {
        "id_anio": 9,
        "anio": "2013"
    }
]*/

export {
    estados,
    tiposMantenimiento,
    tiposActivos,
    frecuenciaPeriodo,
    areas,
    bodegas,
    marcas,
    planes,
    talleres,
    regiones,
    getTiposMantenimientos,
    getEstados,
    getAreas,
    getTiposActivos,
    getActivos,
    getTalleres,
    getBodegas,
    getCategorias,
    getPlanes,
    //getRegiones,
    loadSelectContent,
    loadDivSelectedPlan,
    loadSelectContentAndSelected,
    loadSelectContentAndSelectedMultiple,
    listSelect,
    listAllElement,
    listAnioAndSelected,
    getJson,
    currentDate,
    olderDate
};

