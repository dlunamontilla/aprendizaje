import audios from "./audios.js";
import { isString, isHTML, isNull } from "./evaluar.js";


const audio = document.createElement("audio");

if (!audios["music"]) {
    audios["music"] = audio.cloneNode();
    audios.music.setAttribute("src", "multimedia/audio/music/JoshWoodward-TheWake-NoVox-04-CrazyGlue.mp3");
    audios.music.volume = 0.25;
}


/**
 * 
 * @param {object} parametros 
 */
const modal = (parametros) => {
    const { ventanaModal, selectorNav = "#salir" } = parametros;

    // Quitar la barra de desplazamiento del cuerpo mientras 
    // se carga la ventana modal:
    document.body.setAttribute("style", "overflow: hidden");

    // Barra de navegación de la ventana modal:
    const nav = document.querySelector(selectorNav);

    if (!(nav || ventanaModal)) return;

    // Obtener el botón audio de la barra de navegación:
    const buttonAudio = nav.querySelector(".audio");

    // Reproducir música:
    reproducir(buttonAudio);

    nav.onclick = (e) => {
        e.preventDefault();
        const control = e.target;
        const { toggleMusic, salir } = control.dataset;

        if (isString(salir)) {
            document.body.removeAttribute("style");
            ventanaModal.classList.remove("presentar--show");

            if (audios["music"]) {
                audios["music"].pause();
            }
        }

        if (isString(toggleMusic)) {
            const container = control.parentNode;
            toggleSound(container);
        }

    }
}

/**
 * 
 * @param {HTMLElement} botonAudio 
 * @returns 
 */
const reproducir = (botonAudio) => {
    let reproduce = localStorage.getItem("reproducir");

    // Se reproduce y termina por defecto si no hay ninguna
    // preferencia de usuario establecida:
    if (isNull(reproduce)) {
        audios.music.play();
        return;
    }

    // Reemplazar una cadena por un boleano:
    reproduce = reproduce === "false" ? false : true;

    if ( reproduce ) {
        audios.music.play();
        return;
    }

    if ( isHTML(botonAudio) ) {
        botonAudio.classList.remove("audio--active");
    }
}

/**
 * 
 * @param {HTMLElement} elementoHTML 
 */
const toggleSound = (elementoHTML) => {
    if (!isHTML(elementoHTML)) return;

    elementoHTML.classList.toggle("audio--active");
    const reproduce = !elementoHTML.classList.contains("audio--active");

    localStorage.setItem("reproducir", !reproduce);
    reproduce ? audios.music.pause() : audios.music.play();
}
export default modal;