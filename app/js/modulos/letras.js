import crearAudio from "./crearAudio.js";

const letras = (selector) => {
    const _letras = fetch("recursos/api/letras.json");
    const audios = [];

    _letras.then(response => response.json())
        .then(data => {
            const _letras = {};

            const letra = document.querySelector(selector);
            const audio = document.querySelector("#audio");
            
            const teclas = [
                "ENTER", "BACKSPACE"
            ];

            if (!letra) return;

            for (let letra in data) {
                const src = data[letra].src;
                _letras[letra] = crearAudio(src);
            }

            // Se podrá pausar o reproducir el audio de fondo alternativamente
            // utilizando las teclas «teclas» que serán las responsables de 
            // que se ejecute esa acción:
            const toggleAudio = (tecla, teclas) => {
                if ( !Array.isArray(teclas))
                    return false;

                for (let key of teclas) {
                    if (tecla == key && !audio.paused) {
                        audio.pause();
                        return true;
                    }
                }

                if ( audio.paused ) audio.play();
                return false;
            }

            addEventListener("keydown", (e) => {
                const tecla = e.key.toUpperCase();
                e.preventDefault();
                
                toggleAudio(tecla, teclas);

                escuchar(tecla, _letras, {
                    elemento: letra,
                    data: data
                });
                
            });

            const claves = Object.keys(data);
            let num = 0;
            addEventListener("click", () => {
                escuchar(claves[num], _letras, {
                    elemento: letra,
                    data: data
                });

                num++;

                if (num >= claves.length) num = 0;

                if ( audio && audio.paused ) audio.play();
            });

            addEventListener("dblclick", function() {
                if ( audio && audio.paused ) audio.play();
            })
        })

    const escuchar = (caracter, alfabeto, parametros) => {
        const { elemento, data } = parametros;

        if ( caracter == "ENTER" || caracter == "BACKSPACE" && elemento ) {
            elemento.textContent = "";
        }

            
        if (!alfabeto[caracter])
            return;

        alfabeto[caracter].play();
        if (elemento)
            elemento.innerHTML = `<span class="${data[caracter].class}">${data[caracter].letra}</span>`;
    }
}

export default letras;