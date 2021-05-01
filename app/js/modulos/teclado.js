import Escuchar from "./EscucharAudio.js";

const teclado = (parametros) => {

    const {
        selector, data
    } = parametros;

    const tecladoContenedor = document.querySelector(selector);

    if ( tecladoContenedor )
        tecladoContenedor.classList.toggle("caracter--show");

    tecladoContenedor.addEventListener("click", e => {
        const {simbolo} = e.target.dataset;
        const {audio = null} = data[simbolo];

        if ( data[simbolo] ) {
            audio.play();
        }
    });
};

export default teclado;