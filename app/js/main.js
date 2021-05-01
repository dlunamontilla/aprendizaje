// Módulos:
import Datos from "./modulos/Datos.js";
import letras from "./modulos/letras.js";
import { imagenSVG } from "./modulos/imagenSVG.js";
import obtenerDatos from "./modulos/obtenerDatos.js";
import { elemento } from "./modulos/elementos.js";
import seleccionarPestanna from "./modulos/seleccionarPestana.js";
import Escuchar from "./modulos/EscucharAudio.js";
import teclado from "./modulos/teclado.js";
import pestannas from "./modulos/pestannas.js";


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

// Obtener el tipo de teclado en localStorage:
const tipoTeclado = localStorage.getItem("tipo");

// Parametros:
const parametros = {
    url: "recursos/api/letras.json",
    selector: "#teclado",
    tipo: tipoTeclado ? tipoTeclado : "numero"
};

// Cargar teclado predeterminado:
obtenerDatos(parametros);


// Preparación de las pestañas:
const tabButton = elemento("#pestannas");
const buttons = tabButton.querySelectorAll("button");

seleccionarPestanna(buttons, parametros.tipo);

if (tabButton) {
    tabButton.onclick = (e) => {
        const {tipo} = e.target.dataset;
        
        if ( tipo ) {
            parametros.tipo = tipo;
            obtenerDatos(parametros);
            localStorage.setItem("tipo", tipo);
        }
        
        seleccionarPestanna(buttons, parametros.tipo);
    }

}

// Instanciamos la clase, pero aún no la usamos:
const escucharAudio = new Escuchar("recursos/api/letras.json");

// Probar clase:

escucharAudio.init("#loading", data => {
    teclado({
        selector: "#teclado",
        data
    });
    
});


pestannas();