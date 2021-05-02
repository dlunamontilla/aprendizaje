import audios from "./audios.js";

/**
 * 
 * @param {object} parametros 
 */
const modal = (parametros) => {
    const {ventanaModal, salir = "#salir"} = parametros;

    document.body.setAttribute("style", "overflow: hidden");

    const cerrar = document.querySelector(salir);

    if ( !(cerrar || ventanaModal) ) return;

    console.log( audios );

    cerrar.onclick = (e) => {
        e.preventDefault();

        document.body.removeAttribute("style");
        ventanaModal.classList.remove("presentar--show");

        if ( audios["music"] ) {
            audios["music"].pause();
        }
    }
}

export default modal;