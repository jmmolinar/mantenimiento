import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("No encontrado");
    }

    async getHtml() {
        return `
            <h1>=(</h1>
            <p id="errorMessage">-- Contenido no encontrado</p>
        `;
    }
}