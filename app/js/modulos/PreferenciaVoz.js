import { isNull } from "./evaluar.js";

class PreferenciaVoz {
    /**
     * 
     * @returns
     */
    constructor() {
        const nav = document.querySelector("#navigation-modal");
        if ( isNull(nav) )return;

        const vozFemenina = nav.querySelector(".voz [type='checkbox']");
        if (isNull(vozFemenina)) return;

        const preferencia = this.obtener();

        if ( preferencia === "F" ) {
            vozFemenina.setAttribute("checked", "true");
        }
    }

    /**
     * 
     * @returns {string}
     */
    obtener() {
        let voz = localStorage.getItem("voz");

        if (isNull(voz)) {
            voz = "M"
        }

        return voz;
    }

    /**
     * 
     * @param {string} voz 
     * Establecer las preferencias de voz (masulino/femenino) 
     * y almacenarlo en localStorage.
     */
    establecer(voz) {
        localStorage.setItem("voz", voz);
    }

    /**
     * 
     * @param {string} voz 
     * @returns {string}
     * 
     * Establecer el tipo de voz, a la vez, que la obtiene.
     */
    establecerObtener(voz) {
        this.establecer(voz);
        return this.obtener();
    }
}

const preferenciaVoz = new PreferenciaVoz;
export default preferenciaVoz;