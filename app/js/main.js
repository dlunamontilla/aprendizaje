// Módulos:
import Datos from "./modulos/Datos.js";
import escucharSonido from "./modulos/EscucharSonido.js";
import { imagenSVG } from "./modulos/imagenSVG.js";

const datos = new Datos;
datos.render(() => {
    return {
        letra: "A",
        autor: "David E Luna M",
        title: "Aprendiendo",
        indicaciones: "Escuchando lecciones",
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


// Esto es temporal:
const enlaces = document.querySelectorAll("[href$='#']");

// Desactivar los enlces que terminen en almoadilla
enlaces.forEach(enlace => {
    enlace.addEventListener("click", (e) => {
        e.preventDefault();
    })
});

escucharSonido.init("recursos/api/simbolos.json");