import { isNull } from "./evaluar.js";

/**
 * 
 * @param {object} parametros 
 * @returns
 */
const pintarTeclado = (parametros) => {
    const {
        data,
        selector,
        tipo,
        selectorSimbolo = "#letra"
    } = parametros;

    // Data:
    const teclas = [];

    // Contenedor principal del teclado:
    const target = document.querySelector(selector);

    // Contenedor donde se presentarán las letras:
    const contenedorSimbolo = document.querySelector(selectorSimbolo);

    const tipoVoz = localStorage.getItem("voz");
    if (isNull(tipoVoz)) {
        tipoVoz = "M";
    }

    // Modificar la data y formar un array a partir de él:
    const datos = data[tipoVoz];

    // Modificar la data y formar un array a partir de él:
    for (let propiedad in datos) {
        if (!datos[propiedad]["letras"]) {
            const letras = datos[propiedad].letra;
            datos[propiedad]["letras"] = letras;

            // Letra individual:
            datos[propiedad]["letra"] = propiedad;
        }

        teclas.push(datos[propiedad]);
    }

    if (!(Array.isArray(teclas) || target))
        return;


    // Construir elementos
    const contenedorTecla = document.createElement("div");
    contenedorTecla.classList.add("teclas");

    target.textContent = "";
    contenedorTecla.innerHTML = "";

    teclas.forEach(tecla => {
        if (tecla.tipo == tipo)
            contenedorTecla.innerHTML += `<button class="teclas__item ${tecla.className}" data-simbolo="${tecla.letra}"><span>${tecla.letra}</span></button>`;
    });

    target.appendChild(contenedorTecla);

    contenedorTecla.addEventListener("click", (e) => {
        const { simbolo } = e.target.dataset;

        if (simbolo) {
            contenedorSimbolo.innerHTML = `<div class="simbolo__item ${datos[simbolo].className}">${datos[simbolo].simbolo}</div>`;
            datos[simbolo].audio.play();
        }
    });
}

export default pintarTeclado;