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
    
    // Modificar la data y formar un array a partir de él:
    for (let propiedad in data) {
        if ( !data[propiedad]["letras"] ) {
            const letras = data[propiedad].letra;
            data[propiedad]["letras"] = letras;

            // Letra individual:
            data[propiedad]["letra"] = propiedad;
        }
        
        teclas.push(data[propiedad]);
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

        if ( simbolo ) {
            contenedorSimbolo.innerHTML = `<div class="simbolo__item ${data[simbolo].className}">${data[simbolo].simbolo}</div>`;
            data[simbolo].audio.play();
        }
    });
}

export default pintarTeclado;