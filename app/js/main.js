import Datos from "./modulos/Datos.js";
import letras from "./modulos/letras.js";
import { imagenSVG } from "./modulos/imagenSVG.js";


const datos = new Datos;
datos.render(() => {
    return {
        letra: "A",
        autor: "David E Luna M",
        title: "Escuchando las letras",
        indicaciones: "Presione una tecla o toque la pantalla",
        musica: "multimedia/audio/music/JoshWoodward-SSotS-NoVox-06-Snooter.mp3",
        teclado: "multimedia/icons/teclado.svg"
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