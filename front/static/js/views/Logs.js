import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Historial");
    }

    async getHtml() {
        return `
            <h1>Historial</h1>
            <p>--</p>
        `;
    }
}