import seleccionarPestanna from "./seleccionarPestana.js";
import { isFunction } from "./evaluar.js";
import pintarTeclado from "./pintarTeclado.js";
import audios from "./audios.js";

const audio = document.createElement("audio");

/**
 * 
 * @param {string} selector
 * @param {function} fn 
 * @returns 
 */
const pestannas = (selector = "#pestannas", fn) => {
    const menu = document.querySelector(selector);
    const buttons = menu.querySelectorAll("button");

    buttons.forEach(button => {
        const { sonido, tipo } = button.dataset;
        if (!(sonido || tipo)) return;

        const _audio = audio.cloneNode();
        _audio.src = sonido;
        audios[tipo] = _audio;
    });

    if ( !audios["music"]) {
        audios["music"] = audio.cloneNode();
    }

    audios["music"].setAttribute("src", "multimedia/audio/music/JoshWoodward-TheWake-NoVox-04-CrazyGlue.mp3");
    audios["music"].volume = 0.1;
    audios["music"].setAttribute("loop", "-1");
    audios["music"].play();

    let teclado = "";

    if (!(menu || isFunction(fn))) return;

    // Seleccionar el tipo de teclado:
    const tipoTeclado = localStorage.getItem("tipo");

    teclado = tipoTeclado ? tipoTeclado : "numero";
    seleccionarPestanna(buttons, teclado);

    // Cargar opciones predeterminadas:
    fn(pintarTeclado, teclado);

    menu.addEventListener("click", (e) => {
        const { sonido, tipo } = e.target.dataset;
        if (!(sonido || tipo)) return;

        // Seleccionar el teclado:
        teclado = tipo;

        // Seleccionar pestañas:
        seleccionarPestanna(buttons, teclado);

        // Guardar el tipo de teclado seleccionado por el usuario:
        localStorage.setItem("tipo", teclado);

        if (audios[tipo]) {
            audios[tipo].play();
        }

        fn(pintarTeclado, teclado);
    });
}

export default pestannas;