import Escuchar from "./EscucharAudio.js";
import pestannas from "./pestannas.js";
import modal from "./modal.js";

/**
 * 
 * @param {object} parametros 
 * @returns 
 */
const jugar = (parametros) => {
    const {selectorJuego, selectorModal, path} = parametros;

    // Captura de elementos del juego:
    const ventanaModal = document.querySelector(selectorModal);
    const juegos = document.querySelector(selectorJuego);

    if (!(juegos || path || ventanaModal)) return;

    juegos.addEventListener("click", (e) => {
        const { juego } = e.target.dataset;
        if (!juego) return;

        e.preventDefault();
        const enlace = e.target;

        localStorage.setItem("origen", "home");

        // Instanciamos la clase, pero aún no la usamos:
        const escucharAudio = new Escuchar(path);

        escucharAudio.init("#loading", data => {
            // Pronunciar con voz la etiqueta de la pestaña:
            pestannas("#pestannas", function (pintarTeclado, teclado) {
                location.href = enlace.href;
                // Abrir ventana modal:
                ventanaModal.classList.add("presentar--show");
                
                modal({
                    ventanaModal,
                    salir: "#salir"
                });

                pintarTeclado({
                    data,
                    selector: "#teclado",
                    tipo: teclado
                });
            });
        });
    });
}

export default jugar;