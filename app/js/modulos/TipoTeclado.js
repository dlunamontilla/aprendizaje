import { isNull, isString } from "./evaluar.js";

class TipoTeclado {
    constructor() {}

    /**
     * @returns {string}
     * @see
     * Esta función devolverá una cadena indicando el 
     * tipo de teclado que se desea obtener.
     */
    obtener() {
        let tipo = localStorage.getItem("tipo");
        if ( isNull(tipo) ) {
            tipo = "numero";
        }

        return tipo;
    }

    /**
     * @param {string} tipo
     * 
     * No devolverá ningún valor, pero permitirá establecer
     * el tipo de teclado. Además, lo almacena en localStorge
     */
    establecer(tipo) {
        localStorage.setItem("tipo", isString(tipo) ? tipo : null);
    }
}

const tipoTeclado = new TipoTeclado;
export default tipoTeclado;