import Home from "./views/Home.js";
import Test from "./views/Test.js";
import Error from "./views/Error.js";
import Orders from "./views/Orders.js";
import NewOrder from "./views/NewOrder.js";
import OrderView from "./views/OrderView.js";
import Assets from "./views/Assets.js";
import NewAsset from "./views/NewAsset.js";
import AssetView from "./views/AssetView.js";
import AssetsWareHouses from "./views/AssetsWareHouses.js";
import NewAssetsWareHouse from "./views/NewAssetsWareHouse.js";
import AssetsWareHouseView from "./views/AssetsWareHouseView.js";
import AssetsType from "./views/AssetsType.js";
import NewAssetType from "./views/NewAssetType.js";
import AssetTypeView from "./views/AssetTypeView.js";
import ServiceCategories from "./views/ServiceCategories.js";
import NewServiceCategory from "./views/NewServiceCategory.js";
import ServiceCategoryView from "./views/ServiceCategoryView.js";
import Planning from "./views/Planning.js";
import NewPlan from "./views/NewPlan.js";
import PlanView from "./views/PlanView.js";
import Workshops from "./views/Workshops.js";
import NewWorkshop from "./views/NewWorkshop.js";
import Workshopview from "./views/WorkshopView.js";
import Calendar from "./views/Calendar.js";
import Reportes from "./views/Reports.js";
import Logs from "./views/Logs.js";
import OrdersStatusHistory from "./views/OrdersStatusHistory.js"

console.log("JS is loaded");

const pathToRegex = path => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

const getParams = match => {
    const values = match.result.slice(1);
    const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result => result[1]);

    return Object.fromEntries(keys.map((key, i) => {
        console.log("key: " + key + " --- " + "values[i]: " + values[i])
        return [key, values[i]];
    }));
};

const navigateTo = url => {
    history.pushState(null, null, url);
    router();
};

const router = async () => {

    const routes = [
        { path: '/ordenes', view: Orders },
        { path: '/ordenes/nuevo', view: NewOrder },
        { path: '/ordenes/:id', view: OrderView },
        { path: '/activos', view: Assets },
        { path: '/activos/nuevo', view: NewAsset },
        { path: '/activos/:id', view: AssetView },
        { path: '/bodegas', view: AssetsWareHouses },
        { path: '/bodegas/nuevo', view: NewAssetsWareHouse },
        { path: '/bodegas/:id', view: AssetsWareHouseView },
        { path: '/tipos', view: AssetsType },
        { path: '/tipos/nuevo', view: NewAssetType },
        { path: '/tipos/:id', view: AssetTypeView },
        { path: '/categorias', view: ServiceCategories },
        { path: '/categorias/nuevo', view: NewServiceCategory },
        { path: '/categorias/:id', view: ServiceCategoryView },
        { path: '/planes', view: Planning },
        { path: '/planes/nuevo', view: NewPlan },
        { path: '/planes/:id', view: PlanView },
        { path: '/talleres', view: Workshops },
        { path: '/talleres/nuevo', view: NewWorkshop },
        { path: '/talleres/:id', view: Workshopview },
        { path: '/calendario', view: Calendar},
        { path: '/reportes', view: Reportes},
        { path: '/historial', view: OrdersStatusHistory},
        { path: '/', view: Home}
    ]

    // Test each route for potential match
    const potentialMatches = routes.map(route => {
        return {
            route: route,
            result: location.pathname.match(pathToRegex(route.path))
        };
    });

    let match = potentialMatches.find(potentialMatch => potentialMatch.result !== null);

    if (!match) {
        match = {
            route: routes[0],
            result: [location.pathname]
        };
    }

    const view = new match.route.view(getParams(match));

    document.querySelector("#pages").innerHTML = await view.getHtml();
};

window.addEventListener("popstate", router);

document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", e => {
        if (e.target.matches("[data-link]")) {
            e.preventDefault();
            navigateTo(e.target.href);
        }
    });

    router();
});

$(document).ready(function () {
    $('div #pages').on('click', 'p#homeMessage', function () {
        alert("Mensaje inicio");
    });

});

export {
    router
};