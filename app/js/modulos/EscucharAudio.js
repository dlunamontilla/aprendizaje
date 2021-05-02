import {
    isFunction,
    isObject,
    isString
} from "./evaluar.js";

class Escuchar {
    constructor(path) {
        // Apuntar al archivo JSON que contiene todos los símbolos:
        this.path = path;

        this.simbolo = (datos, simbolo) => {
            const predeterminado = {
                audio: "multimedia/audio/letras/0.mp3",
                letra: 0,
                simbolo: "multimedia/vector/simbolos/0.svg",
                className: "resaltar resaltar--turquesa",
                tipo: "numero"
            }

            if (!(isString(simbolo) || !isObject(datos)))
                return predeterminado;

            return datos[simbolo] ? datos[simbolo] : predeterminado;
        }

        // Cargar los audios:
        this.audios = (datos) => {
            if (!isObject(datos)) return;

            const audio = document.createElement("audio");
            const promesas = [];

            for (let simbolo in datos) {
                const promesaAudio = new Promise(async (resuelta, rechazada) => {
                    const _audio = audio.cloneNode(true);
                    _audio.setAttribute("src", datos[simbolo].audio);

                    // Reemplaza la ruta del archivo de audio por
                    // el elemento audio con su ruta:
                    datos[simbolo].audio = _audio;

                    const svg = await fetch(datos[simbolo].simbolo);
                    datos[simbolo]["simbolo"] = await svg.text();

                    return resuelta(_audio)
                });

                promesas.push(promesaAudio);
            }

            return promesas;
        }

        // Avisar que se están cargando los audios:
        this.avisar = (parametros) => {

            const {datos, selector = "#loading"} = parametros;

            if (!isObject(datos))
                return;

            // Animación de carga:
            const audios = this.audios(datos);
            const loading = document.querySelector(selector);

            if (!loading) return;

            loading.classList.remove("none");

            // Cuando se carguen todos los audio quitará
            // la animación de carga:
            Promise.all(audios).then(() => {
                if (loading) {
                    loading.classList.add("none");
                }
            });
        }
    }

    init(selector, fn) {

        if (!isString(selector)) {
            return;
        }

        fetch(this.path)
            .then(respuesta => respuesta.json())
            .then(datos => {
                this.avisar({
                    datos,
                    selector
                });

                if (isFunction(fn)) {
                    fn(datos);
                }
            });
    }
}

export default Escuchar;