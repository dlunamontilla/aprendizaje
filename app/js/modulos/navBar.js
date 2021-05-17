import { isCheckbox, isDefined, isNull } from "./evaluar.js";
import preferenciaVoz from "./PreferenciaVoz.js";
import audios from "./audios.js";
import toggleSound from "./ToggleSound.js";

// Establecer la música de fondo:
const audio = document.createElement("audio");

if (!audios["music"]) {
    audios["music"] = audio.cloneNode();
    audios.music.setAttribute("src", "multimedia/audio/music/JoshWoodward-TheWake-NoVox-04-CrazyGlue.mp3");
    audios.music.volume = 0.25;

    // Provocar que se repita:
    audios.music.setAttribute("loop", "-1");
}


/**
 * 
 * @param {string} selector 
 * @returns 
 * 
 * El objetivo es seleccionar la barra de navegación e interactuar
 * con los elementos contenidos en él.
 */
const navBar = (selector) => {
    const nav = document.querySelector(selector);

    if (isNull(nav)) return;

    // Inicializar la reproducción de audio:
    toggleSound.inicializar(nav);

    nav.addEventListener("click", (e) => {
        const control = e.target;
        const { toggleMusic, salir } = control.dataset;

        if (isCheckbox(control)) {
            const voz = control.checked ? "F" : "M";

            preferenciaVoz.establecer(voz);
        }

        if (isDefined(salir)) {
            document.body.removeAttribute("style");
            // ventanaModal.classList.remove("presentar--show");

            // Pausar la música si existe
            if (audios["music"]) {
                audios["music"].pause();
            }
        }

        // Controlar la música de fondo de la aplicación:
        if (isDefined(toggleMusic)) {
            toggleSound.toggle(control);
        }

    }, false);
}

export default navBar;