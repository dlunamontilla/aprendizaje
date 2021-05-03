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

    // loading:
    const loading = document.querySelector("#loading");

    // Captura de elementos del juego:
    const ventanaModal = document.querySelector(selectorModal);
    const juegos = document.querySelector(selectorJuego);

    if (!(juegos || path || ventanaModal)) return;

    juegos.addEventListener("click", (e) => {
        const { juego } = e.target.dataset;

        if (!juego) return;

        e.preventDefault();

        localStorage.setItem("origen", "home");

        // Iniciar la animación de carga:
        if (loading) {
            loading.classList.remove("none");
        }

        // Instanciamos la clase, pero aún no la usamos:
        const escucharAudio = new Escuchar(path);

        escucharAudio.init("#loading", data => {
            // Pronunciar con voz la etiqueta de la pestaña:
            pestannas("#pestannas", function (pintarTeclado, teclado) {
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