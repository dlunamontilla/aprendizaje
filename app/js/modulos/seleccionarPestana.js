import { isNodeList } from "./evaluar.js";

/**
 * 
 * @param {NodeList} elementos 
 * @param {string} tipo 
 * @returns void
 */

const seleccionarPestanna = (elementos, tipo) => {

    if (!isNodeList(elementos) || typeof tipo !== "string")
        return;

    elementos.forEach(button => {
        button.classList.remove("pestannas__button--seleccionado");

        const dataset = button.dataset;
        if (dataset.tipo && dataset.tipo == tipo) {
            button.classList.add("pestannas__button--seleccionado");
        }
    });
};

export default seleccionarPestanna;