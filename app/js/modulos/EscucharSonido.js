import { isAudio, isFunction, isNull, isObject, isString, isButton } from "./evaluar.js";
import navBar from "./navBar.js";
import preferenciaVoz from "./PreferenciaVoz.js";
import tipoTeclado from "./TipoTeclado.js";

/**
 * @description 
 * Carga todas las voces y permite elegir su género
 */
class EscucharSonido {
    /**
     * 
     * @param {string} path 
     */
    constructor() {

        // Datos procesados:
        this.datos = [];
        this.simbolos = {};
        this.controls = [];

        this.audio = document.createElement("audio");
        /**
         * 
         * @param {object} datos 
         * @param {object} simbolos
         * @returns 
         * @description Pintar el teclado a partir de los datos cargados en la memoria
         */
        this.pintarTeclado = (datos, simbolos) => {
            if (!(isObject(datos) || isObject(simbolos))) {
                return;
            }

            const letra = document.querySelector("#letra");
            if (isNull(letra)) {
                return;
            }

            /**
             * 
             * @param {string} simbolo 
             * @returns string
             */
            const insertarSimbolo = (className, simbolo) => {
                return `<div class="simbolo__item ${className}">${simbolo}</div>`;
            }

            /**
             * 
             * @param {object} params
             * @return string
             */
            const button = (params) => {
                return `<button class="teclas__item ${params.className}" data-simbolo="${params.letra}"><span>${params.letra}</span></button>`;
            };


            const teclado = document.querySelector("#teclado");
            if (isNull(teclado)) {
                return;
            }

            const teclas = document.createElement("div");
            teclas.classList.add("teclas");

            teclado.textContent = "";
            teclado.append(teclas);

            const tipoTeclas = tipoTeclado.obtener();
            
            teclas.innerHTML = "";
            datos.forEach(value => {
                if ( tipoTeclas === value.tipo ) {
                    teclas.innerHTML += button(value);
                }
            });

            // Cargar en el control el tipo de voz:
            

            teclas.addEventListener("click", (e) => {
                const button = e.target;
                const preferencia = preferenciaVoz.obtener();

                if (!isButton(button)) return;

                const { simbolo } = button.dataset;
                const simbolos = this.simbolos;
                const audio = simbolos[simbolo].audio[preferencia];

                // Valida si «audio» es un elemento «audio» para continuar:
                if (!isAudio(audio)) return;

                audio.play();

                const svg = simbolos[simbolo].simbolo;
                const className = simbolos[simbolo].className;
                letra.innerHTML = insertarSimbolo(className, svg);
            });
        }

        /**
         * Ejecutar la barra el script que interactuará con la
         * barra de navegación de la ventana modal de juegos.
         */
        this.nav = () => {
            navBar("#navigation-modal");
        }
    }

    /**
     * 
     * @param {string} path 
     * @param {function} fn 
     */
    async init(path, fn) {
        if (!isString(path)) {
            return;
        }

        const promesa = await fetch(path);
        const datos = await promesa.json();
        const promesas = [];

        for (let propiedad in datos) {
            // Se toma el objeto audio y se transforman sus
            // propiedades en elementos html de audio con voces
            // femeninas y masculinas:
            const sound = datos[propiedad].audio;

            if (isObject(sound)) {
                for (let genero in sound) {
                    const audio = this.audio.cloneNode(false);
                    audio.setAttribute("src", sound[genero]);

                    sound[genero] = audio;
                }
            }

            const objeto = datos[propiedad];

            fetch(objeto.simbolo)
                .then(respuesta => respuesta.text())
                .then(data => {
                    objeto["simbolo"] = data;
                });

            promesas.push(objeto.simbolo);

            const letras = datos[propiedad];
            letras["letras"] = letras.letra;
            letras["letra"] = propiedad;

            this.datos.push(datos[propiedad]);
        }

        Promise.all(promesas).then(() => {
            promesas.length = 0;
            
            // Se cargan los datos reproducir el audio:
            this.simbolos = datos;
            
            this.pintarTeclado(this.datos, this.simbolos);
            if (isFunction(fn)) {
                fn(this.pintarTeclado);
            }

            this.nav();
        });
    }
}

const escucharSonido = new EscucharSonido;
export default escucharSonido;