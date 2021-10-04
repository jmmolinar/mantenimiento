import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Prueba");
    }

    async getHtml() {
        return `
            <h1>Prueba</h1>
            <p>You are viewing the test!</p>
        `;
    }
}