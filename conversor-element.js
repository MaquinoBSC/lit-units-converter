import { LitElement, html } from "lit";
import '@material/mwc-select/mwc-select';
import '@material/mwc-textfield/mwc-textfield';


class ConversorElement extends LitElement {
    static get properties() {
        return {
            options: { type: Array },
            data: { type: Object },
            disabled: { type: Boolean }
        }
    }

    constructor() {
        super();
        this.options = [
            { name: 'Selecciona una opción', value: '' },
            { name: 'Milimetros', value: 'mm' },
            { name: 'Centimetros', value: 'cm' },
            { name: 'Pulgadas', value: 'in' },
            { name: 'Pies', value: 'ft' },
        ];
        this.data = {};
        this.disabled = false;
    }

    _changeLength(e) {
        if(isNaN(e.target.value)) {
            alert('Ingresa una longitud válida')
            this._lengthInput.value = '';
            return
        }

        const distance = parseFloat(e.target.value);
        this.data = { ...this.data, 'length': distance };
        this._dispatcherEvent('updated-data', { data: this.data });
    }

    _selectedUnit({ detail }) {
        const unit = this.options[detail.index];
        this.data = { ...this.data, 'unit': unit.value };
        this._dispatcherEvent('updated-data', { data: this.data });
    }

    get _lengthInput() { return this.shadowRoot.getElementById('length-input') }

    _dispatcherEvent(event, data) {
        this.dispatchEvent(new CustomEvent(event, {
            bubbles: true,
            composed: true,
            detail: data
        }));
    }

    render() {
        return html`
            <div>
                <mwc-textfield 
                    id="length-input" 
                    .value=${ this.data.length } 
                    @input=${ (e) => this._changeLength(e) }
                    ?disabled=${ this.disabled }
                ></mwc-textfield>
                <mwc-select .value=${ this.data.unit } @selected=${ (e) => this._selectedUnit(e) }>
                    ${
                        this.options.map(({ name, value}) => html`
                            <mwc-list-item value=${ value }> ${ name } </mwc-list-item>
                        `)
                    }
                </mwc-select>
            </div>
        `;
    }
}

customElements.define('conversor-element', ConversorElement);
