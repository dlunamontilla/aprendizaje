import { isAudio, isFunction, isNull, isObject, isString, isButton, isDefined, isHTML } from "./evaluar.js";
import navBar from "./navBar.js";
import preferenciaVoz from "./PreferenciaVoz.js";
import tipoTeclado from "./TipoTeclado.js";
import audios from "./audios.js";

var num = 0;

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

        // Esto no se debe hacer. Se corregirá en el futuro:
        this.audio = document.createElement("audio");
        this.soundTab = document.createElement("audio");

        /**
         * 
         * @param {object} datos 
         * @param {object} simbolos
         * @returns 
         * @description Pintar el teclado a partir de los datos cargados en la memoria
         */
        this.pintarTeclado = () => {
            const { datos, simbolos } = audios;

            if (!(isObject(datos) || isObject(simbolos))) {
                return;
            }


            // Cargar los archivos de audio:
            const { menu } = simbolos;

            // Obtener el contenedor de las pestañas del teclado. Esta
            // opción es termporal mientras se reescribe el código:
            const pestanna = document.querySelector("#pestannas");

            const letra = document.querySelector("#letra");
            if (isNull(letra)) {
                return;
            }

            /**
             * 
             * @param {string} className 
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

            const obtenerTeclado = () => {
                const tipoTeclas = tipoTeclado.obtener();

                let html = "";
                datos.forEach(value => {
                    if (tipoTeclas === value.tipo) {
                        html += button(value);
                    }
                });

                return html;
            };

            if (!isDefined(audios["menuAudio"]) && isObject(menu)) {

                audios["menuAudio"] = menu;

                const { menuAudio } = audios;

                for (let tipo in menuAudio) {
                    const nombre = menuAudio[tipo];

                    if (isObject(nombre)) {
                        for (let genero in nombre) {
                            const path = nombre[genero];
                            const soundTab = this.soundTab.cloneNode(false);
                            soundTab.setAttribute("src", path);
                            nombre[genero] = soundTab;
                        }
                    }
                }
            }


            // Preparar el teclado:
            const teclas = document.createElement("div");
            teclas.classList.add("teclas");

            teclado.textContent = "";
            teclado.append(teclas);

            teclas.innerHTML = obtenerTeclado();

            // Cargar el teclado con cada click del usuario.
            if (!isNull(pestanna)) {
                pestanna.addEventListener("click", (e) => {
                    const control = e.target;
                    if (!isButton(control)) return;

                    const { tipo } = control.dataset;

                    if (isDefined(tipo)) {
                        teclas.innerHTML = obtenerTeclado();

                        // Reproducir el audio del menú de navegación:
                        const genero = menu[tipo];
                        if (!isDefined(genero)) return;

                        const preferencia = preferenciaVoz.obtener();
                        if (!isAudio(genero[preferencia])) return;

                        genero[preferencia].play();
                    }
                }, false);
            }

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
            const selectores = {
                nav: "#navigation-modal",
                ventanaModal: "#presentar-simbolos"
            };

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

        if ( isDefined(audios["datos"] && isDefined(audios["simbolos"])) ) {
            this.pintarTeclado();

            if (isFunction(fn)) {
                fn();
                this.nav();
            }

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

            if (!isDefined(objeto.simbolo)) continue;

            fetch(objeto.simbolo)
                .then(respuesta => respuesta.text())
                .then(data => {
                    objeto["simbolo"] = data;
                });

            promesas.push(objeto.simbolo);

            const letras = datos[propiedad];

            if (isDefined(letras.letra)) {
                letras["letras"] = letras.letra;
                letras["letra"] = propiedad;
            }

            this.datos.push(datos[propiedad]);
        }


        const loading = document.querySelector("#loading");

        if (isHTML(loading)) {
            loading.classList.remove("none");
        }

        Promise.all(promesas).then(() => {
            promesas.length = 0;

            // Se cargan los datos reproducir el audio:
            this.simbolos = datos;
            
            audios["datos"] = this.datos;
            audios["simbolos"] = this.simbolos;

            
            if (isFunction(fn)) {
                setTimeout(() => {
                    this.pintarTeclado();
                    fn();

                    if ( isHTML(loading) ) {
                        loading.classList.add("none");
                    }
                }, 500);
            }

            this.nav();
        });
    }
}

const escucharSonido = new EscucharSonido;
export default escucharSonido;