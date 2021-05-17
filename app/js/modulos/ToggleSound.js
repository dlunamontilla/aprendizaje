import { isHTML, isNull } from "./evaluar.js";

const path = "multimedia/audio/music/JoshWoodward-TheWake-NoVox-04-CrazyGlue.mp3";

class ToggleSound {

    /**
     * 
     * @param {string} path 
     */
    constructor(path) {
        // Cargar valores iniciales:
        this.audio = document.createElement("audio");
        this.audio.setAttribute("src", path);
        this.audio.setAttribute("loop", "-1");
        this.audio.volume = 0.25;

        this.obtenerPreferencia = () => {
            let preferencia = localStorage.getItem("reproducir");

            if (isNull(preferencia)) {
                preferencia = "reproducir";
            }

            return preferencia;
        }

        /**
         * 
         * @param {HTMLElement} elementoHTML 
         * @returns 
         */
        this.reproducir = (elementoHTML) => {
            if (!isHTML(elementoHTML))
                return;
    
            this.audio.play();
            elementoHTML.classList.add("audio--active");
        }

        /**
         * 
         * @param {HTMLElement} elementoHTML 
         * @returns 
         */
        this.pausar = (elementoHTML) => {
            if (!isHTML(elementoHTML))
                return;
    
            this.audio.pause();
            elementoHTML.classList.remove("audio--active");
        }
    }

    /**
     * @param {HTMLElement} nav 
     * 
     * Reproducir el audio al momento de cargar la ventana 
     * modal, siempre que el usuario no haya establecido como
     * preferencia no reproducir.
     */
    inicializar(nav) {
        let escuchar = this.obtenerPreferencia();

        if (escuchar === "reproducir") {
            this.audio.play();
        }

        if ( !isHTML(nav))
            return;

        const toggleMusic = nav.querySelector("[data-toggle-music]");

        if ( toggleMusic ) {
            const parent = toggleMusic.parentNode;
            
            (escuchar === "reproducir")
                ? this.reproducir(parent) : this.pausar(parent);
        }
    }

    /**
     * 
     * @param {HTMLElement} elementoHTML
     * @returns
     * 
     * Reproducir alternativamente o no el sonido de fondo.
     */
    toggle(elementoHTML) {
        if (!isHTML(elementoHTML))
            return;

        const container = elementoHTML.parentNode;
        let preferencia = this.obtenerPreferencia();

        preferencia = (preferencia === "reproducir") ? "no-reproducir" : "reproducir";
        localStorage.setItem("reproducir", preferencia);

        (preferencia === "reproducir")
            ? this.reproducir(container) : this.pausar(container);
    }
}

const toggleSound = new ToggleSound(path);

export default toggleSound;