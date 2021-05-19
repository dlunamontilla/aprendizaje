import { isButton, isDefined, isNodeList, isNull, isString } from "./evaluar.js";
import audios from "./audios.js";


class Pestannas {
    constructor(selector) {
        this.selector = selector;
        this.pestanna = document.querySelector(selector);
        if (isNull(this.pestanna)) return;

        this.buttons = this.pestanna.querySelectorAll("button");

        /**
         * 
         * @param {number} menosEste 
         * 
         * Deselecciona todas las pestañas mientras selecciona otra.
         */
        this.deseleccionar = () => {
            this.buttons.forEach((node) => {
                node.classList.remove("pestannas__button--seleccionado");
            });
        }


        /**
         * 
         * @returns {string}
         */
        this.preferencia = () => {
            let preferencia = localStorage.getItem("tipo");

            if (isNull(preferencia)) {
                preferencia = "numero";
            }

            return preferencia
        };

        this.seleccionado = () => {
            const preferencia = this.preferencia();

            this.buttons.forEach(nodo => {
                const { tipo } = nodo.dataset;

                if (isDefined(tipo) && tipo === preferencia) {
                    nodo.classList.add("pestannas__button--seleccionado");
                }
            });
        }

        this.seleccionado();
    }

    seleccionar() {
        const pestannas = document.querySelector(this.selector);
        const buttons = document.querySelectorAll(this.selector + " button");

        if (isNull(pestannas)) return;

        /**
         * Remover una clase CSS de los botones
         * que forman la pestaña
         */
        const deseleccionar = () => {
            buttons.forEach(button => {
                button.classList.remove("pestannas__button--seleccionado");
            });
        };

        pestannas.addEventListener("click", (e) => {
            const control = e.target;

            if (isButton(control)) {
                const { sonido, tipo } = control.dataset;

                if (!(isDefined(sonido) && isDefined(tipo))) {
                    console.log("Debes definir data-sonido y data-tipo en los botones de la pestaña");
                    return;
                }

                /**
                 * Se almacenan las preferencias de usuario
                 */
                localStorage.setItem("tipo", tipo);
                deseleccionar();

                // Indicar al usuario qué eligió:
                control.classList.add("pestannas__button--seleccionado");
            }
        }, false);
    }
}

const pestanna = new Pestannas(".pestannas");
export default pestanna;