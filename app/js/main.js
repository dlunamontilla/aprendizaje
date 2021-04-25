// Módulos:
import Datos from "./modulos/Datos.js";
import letras from "./modulos/letras.js";
import { imagenSVG } from "./modulos/imagenSVG.js";
import menu from "./modulos/menu.js";
import obtenerDatos from "./modulos/obtenerDatos.js";
import { elemento } from "./modulos/elementos.js";

const datos = new Datos;
datos.render(() => {
    return {
        letra: "A",
        autor: "David E Luna M",
        title: "Aprendiendo",
        indicaciones: "Presione una tecla o toque la pantalla",
        musica: "multimedia/audio/music/JoshWoodward-TheWake-NoVox-04-CrazyGlue.mp3",
        teclado: "multimedia/icons/teclado.svg",
        logo: "multimedia/logos/favicon-variante.svg",
        "marca-de-agua": "multimedia/logos/favicon-variante.svg"
    };
});

letras("#letra");

imagenSVG();

const audio = document.querySelector("#audio");
if (audio) {
    audio.addEventListener("play", function () {
        audio.volume = 0.3;
    })
}

menu("#header-menu, #footer-menu");

// Cargar teclado predeterminado:
obtenerDatos({
    url: "recursos/api/letras.json",
    selector: "#teclado",
    tipo: "numero"
});


// Preparación de las pestañas:
const tabButton = elemento("#pestannas");

if (tabButton) {
    tabButton.onclick = (e) => {
        const {tipo} = e.target.dataset;

        if ( tipo ) {
            obtenerDatos({
                url: "recursos/api/letras.json",
                selector: "#teclado",
                tipo
            });
        }
    }

}