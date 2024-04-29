import { LitElement, html } from "lit";

import './conversor-element.js';

class LitUnitsConverter extends LitElement {
    static get properties() {
        return {
            firstData: { type: Object },
            secondData: { type: Object },
            history: { type: Array },
        }
    }

    constructor() {
        super();
        this.firstData = { length: '' };
        this.secondData = { length: '' };
        this.history = [];
    }

    _converter() {
        const lengthInput = parseFloat(this._lengthInput.value);
        if(this.selectedFromUnit.value === 'mm') {
            if(this.selectedToUnit.value === 'cm') {
                this.result = lengthInput / 10;
            }
        }
    }

    _fireCalculus({ detail }, element) {
        if(element === 'first') this.firstData = { ...detail.data };
        if(element === 'second') this.secondData = { ...detail.data };

        if(this.firstData?.unit && this.firstData?.length && this.secondData?.unit) {
            if(this.firstData.unit === 'mm') {
                if(this.secondData.unit === 'mm') this.secondData = this.firstData;
                if(this.secondData.unit === 'cm') this.secondData = { ...this.secondData, length: (this.firstData.length / 10).toFixed(4) };
                if(this.secondData.unit === 'in') this.secondData = { ...this.secondData, length: (this.firstData.length / 25.4).toFixed(4) };
                if(this.secondData.unit === 'ft') this.secondData = { ...this.secondData, length: (this.firstData.length / 304.8).toFixed(4) };
            }
            if(this.firstData.unit === 'cm') {
                if(this.secondData.unit === 'mm') this.secondData = { ...this.secondData, length: (this.firstData.length * 10).toFixed(4)};
                if(this.secondData.unit === 'cm') this.secondData = this.firstData;
                if(this.secondData.unit === 'in') this.secondData = { ...this.secondData, length: (this.firstData.length / 2.54).toFixed(4) };
                if(this.secondData.unit === 'ft') this.secondData = { ...this.secondData, length: (this.firstData.length / 30.48).toFixed(4) };
            }
            if(this.firstData.unit === 'in') {
                if(this.secondData.unit === 'mm') this.secondData = { ...this.secondData, length: (this.firstData.length * 25.4).toFixed(4)};
                if(this.secondData.unit === 'cm') this.secondData = { ...this.secondData, length: (this.firstData.length * 2.54).toFixed(4)};
                if(this.secondData.unit === 'in') this.secondData = this.firstData;
                if(this.secondData.unit === 'ft') this.secondData = { ...this.secondData, length: (this.firstData.length / 12).toFixed(4) };
            }
            if(this.firstData.unit === 'ft') {
                if(this.secondData.unit === 'mm') this.secondData = { ...this.secondData, length: (this.firstData.length * 304.8).toFixed(4)};
                if(this.secondData.unit === 'cm') this.secondData = { ...this.secondData, length: (this.firstData.length * 30.48).toFixed(4)};
                if(this.secondData.unit === 'in') this.secondData = { ...this.secondData, length: (this.firstData.length * 12).toFixed(4)};
                if(this.secondData.unit === 'ft') this.secondData = this.firstData;
            }
        }
    }

    render() {
        return html`
            <div>
                <h1>Convertirdor de unidades</h1>
                <div>
                    <conversor-element 
                        .data=${ this.firstData }
                        @updated-data=${ (e) => this._fireCalculus(e, 'first') }
                    ></conversor-element>
                    <p>=</p>
                    <conversor-element
                        .data=${ this.secondData }
                        @updated-data=${ (e) => this._fireCalculus(e, 'second') }
                        disabled
                    ></conversor-element>
                </div>
            </div>
        `;
    }
}

customElements.define('lit-units-converter', LitUnitsConverter);
