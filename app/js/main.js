// Módulos:
import Datos from "./modulos/Datos.js";
import { imagenSVG } from "./modulos/imagenSVG.js";
import modal from "./modulos/modal.js";
import jugar from "./modulos/jugar.js";
import audios from "./modulos/audios.js";

const datos = new Datos;
datos.render(() => {
    return {
        letra: "A",
        autor: "David E Luna M",
        title: "Aprendiendo",
        indicaciones: "Seleccione un juego de aprendizaje",
        musica: "multimedia/audio/music/JoshWoodward-TheWake-NoVox-04-CrazyGlue.mp3",
        teclado: "multimedia/icons/teclado.svg",
        logo: "multimedia/icons/logo.svg",
        "marca-de-agua": "multimedia/logos/favicon-variante.svg"
    };
});

// letras("#letra");

imagenSVG();

// Desactivado por si algo sale mal:
// jugar(".juegos", "recursos/api/letras.json");

// Modificaciones que pasa a un objeto como parametro:
jugar({
    selectorJuego: ".juegos",
    selectorModal: "#presentar-simbolos",
    path: "recursos/api/letras.json"
});

// Detener el botón del historial:
addEventListener("popstate", function (e) {
    const origen = localStorage.getItem("origen");

    // Si el usuario se sale de ventana modal
    // se debe quitar la barra de desplazamiento:
    if (origen && origen === "modal") {
        document.body.removeAttribute("style");

        if (audios["music"]) {
            audios["music"].pause();
        }

        // Actualizar estado:
        // history.pushState({
        //     ubicacion: "home"
        // }, "Page 1", "#home");
    }

    // Cada vez que cambie el estado se actualizan los datos
    // para ayudar determinar cuándo dejar o no la barra
    // de desplazamiento:
    localStorage.setItem("origen", "modal");
});