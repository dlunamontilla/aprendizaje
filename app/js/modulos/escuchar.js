const escuchar = (caracter, alfabeto, parametros) => {
    const { elemento, data } = parametros;

    if (caracter == "ENTER" || caracter == "BACKSPACE" && elemento) {
        elemento.textContent = "";
    }


    if (!alfabeto[caracter])
        return;

    alfabeto[caracter].play();

    if (elemento) {
        elemento.innerHTML = `<span class="${data[caracter].className}">${data[caracter].letra}</span>`;
    }
}

export default escuchar;