import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Inicio");
    }

    async getHtml() {
        return `
            <h1>Inicio</h1>
            <p id="homeMessage">You are viewing the home!</p>
        `;
    }
}