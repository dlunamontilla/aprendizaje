import { elementos } from "./elementos.js";
import { limpiarSVG } from "./limpiarSVG.js";

const imagenSVG = () => {
  const _elementos = elementos( "[data-src$='.svg']");

  _elementos.forEach( _elemento => {
    fetch ( _elemento.dataset.src )
      .then(function(respuesta) {
        return respuesta.text();
      })
      .then(function( datos ) {
        _elemento.innerHTML = limpiarSVG(datos);
        _elemento.removeAttribute("data-src");
      })
  });
}

export { imagenSVG };