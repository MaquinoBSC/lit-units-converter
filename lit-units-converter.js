import { LitElement, html } from "lit";
import '@material/mwc-button/mwc-button';
import '@material/mwc-list/mwc-list';
import '@material/mwc-list/mwc-list-item';
import '@material/mwc-textfield/mwc-textfield';
import '@material/mwc-select/mwc-select';


class LitUnitsConverter extends LitElement {
    static get properties() {
        return {
            fromUnits: { type: Array },
            selectedFromUnit: { type: Object },
            toUnits: { type: Array },
            selectedToUnit: { type: Object },
            history: { type: Array },
            isToSelectDisabled: { type: Boolean }
        }
    }

    constructor() {
        super();
        this.fromUnits = [
            { name: 'Selecciona una opción', value: '' },
            { name: 'Milimetros', value: 'mm' },
            { name: 'Centimetros', value: 'cm' },
            { name: 'Pulgadas', value: 'in' },
            { name: 'Pies', value: 'ft' },
        ];
        this.selectedFromUnit = {};
        this.toUnits = [this.fromUnits[0]];
        this.selectedToUnit = {};
        this.isToSelectDisabled = true;
    }

    _selectedUnit({ detail }, type) {
        if(detail.index !== 0) {
            if(type === 'from') {
                this.selectedFromUnit = this.fromUnits[detail.index];
                this.toUnits = this.fromUnits.filter((unit) => unit.name !== this.selectedFromUnit.name);
                this.isToSelectDisabled = false;
            }
            if(type === 'to') this.selectedToUnit = this.toUnits[detail.index];
        }

        console.log(this.selectedFromUnit);
        console.log(this.selectedToUnit);
    }

    render() {
        return html`
            <div>
                <h1>Convertirdor de unidades</h1>
                <div>
                    <mwc-textfield label="Ingresa longitud"></mwc-textfield>
                    <span>De: </span>
                    <mwc-select @selected=${ (e) => this._selectedUnit(e, 'from') }>
                        ${
                            this.fromUnits.map(({ name, value}) => html`
                                <mwc-list-item value=${ value }> ${ name } </mwc-list-item>
                            `)
                        }
                    </mwc-select>
                    <span>A: </span>
                    <mwc-select @selected=${ (e) => this._selectedUnit(e, 'to') } ?disabled=${ this.isToSelectDisabled }>
                        ${
                            this.toUnits.map(({ name, value}) => html`
                                <mwc-list-item value=${ value }> ${ name } </mwc-list-item>
                            `)
                        }
                    </mwc-select>
                </div>
            </div>
        `;
    }
}

customElements.define('lit-units-converter', LitUnitsConverter);
