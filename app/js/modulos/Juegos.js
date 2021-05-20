import escucharSonido from "./EscucharSonido.js";
import { isDefined, isHTML, isNull } from "./evaluar.js";

class Juegos {

    /**
     * 
     * @param {object} selectores 
     */
    constructor(selectores) {
        const { selectGame, selectWindow } = selectores;

        this.selectGame = selectGame;
        this.selectWindow = selectWindow;

        this.estado = () => {
            this.ventana.classList.remove("presentar--show", "fadeOut");
            document.body.removeAttribute("style");
        }
    }

    /**
     * 
     * @returns 
     * 
     * Abre la ventana modal de los juegos de caracteres
     */
    abrir() {
        const juegos = document.querySelector(this.selectGame);
        const ventana = document.querySelector(this.selectWindow);
        if ((isNull(juegos) || isNull(ventana))) return;

        juegos.addEventListener("click", (e) => {
            const control = e.target;
            const { juego, href } = control.dataset;
            const aviso = document.querySelector("#aviso");

            this.ventana = ventana;
            ventana.removeEventListener("animationend", this.estado);
            if (isDefined(juego) && isDefined(href)) {
                if (isHTML(aviso)) {
                    aviso.textContent = `${juego}`;
                }

                escucharSonido.init(href, function() {
                    ventana.classList.add("presentar--show");
                });

                document.body.setAttribute("style", "overflow: hidden");
            }
        });
    }

    /**
     * 
     * @returns {void}
     * 
     * Cierra la ventana modal de los juegos
     */
    salir() {
        const ventana = document.querySelector(this.selectWindow);
        if (isNull(ventana)) return;

        this.ventana = ventana;

        ventana.classList.add("fadeOut");
        ventana.addEventListener("animationend", this.estado);

        return;
    }


    establecer(url) {
        this.path = url;
    }
}

const juegos = new Juegos({
    selectGame: ".juegos",
    selectWindow: "#presentar-simbolos"
});

export default juegos;