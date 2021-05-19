import { isCheckbox, isDefined, isNull } from "./evaluar.js";
import preferenciaVoz from "./PreferenciaVoz.js";
import toggleSound from "./ToggleSound.js";
import juegos from "./Juegos.js";
/**
 * 
 * @param {string} selector 
 * @returns 
 * 
 * El objetivo es seleccionar la barra de navegación e interactuar
 * con los elementos contenidos en él.
 */
const navBar = (selectores) => {
    const {
        selectorNav = "#navigation-modal",
        selectorVentanaModal = "#presentar-simbolos"
    } = selectores;

    const ventanaModal = document.querySelector(selectorVentanaModal);
    if (isNull(ventanaModal)) return;

    const nav = ventanaModal.querySelector(selectorNav);
    if (isNull(nav)) return;

    // Inicializar la reproducción de audio:
    toggleSound.inicializar(nav);

    const eventHandler = (e) => {
        const control = e.target;
        const { toggleMusic, salir } = control.dataset;

        if (isCheckbox(control)) {
            const voz = control.checked ? "F" : "M";

            preferenciaVoz.establecer(voz);
        }

        if (isDefined(salir)) {
            document.body.removeAttribute("style");
            
            // Cerrar la ventana al terminar la animación:
            ventanaModal.classList.add("fadeOut");

            juegos.salir();

            toggleSound.pause(control);
        }

        // Controlar la música de fondo de la aplicación:
        if (isDefined(toggleMusic)) {
            toggleSound.toggle(control);
        }
    };

    nav.onclick = eventHandler;
}

export default navBar;