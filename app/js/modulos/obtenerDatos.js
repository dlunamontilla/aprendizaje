const obtenerDatos = (parametros) => {
    const {url, selector, tipo = "vocal"} = parametros;

    const datos = fetch(url);

    datos
        .then(respuesta => respuesta.json())
        .then(data => {
            const elementos = [];

            for (let letra in data) {
                elementos.push({
                    letra,
                    audio: data[letra].audio,
                    letras: data[letra].letra,
                    clase: data[letra].className,
                    tipo: data[letra].tipo
                });
            }

            if (typeof selector === "undefined")
                return;

            const target = document.querySelector(selector);

            pintarTeclado({
                teclas: elementos,
                target,
                tipo
            })
        });
}

const pintarTeclado = (objeto) => {
    const { teclas, target, tipo } = objeto;

    // Seleccionar el tipo de elementos con el que se
    // formará el teclado.

    if (!(Array.isArray(teclas) || target))
        return;


    // Construir elementos
    const contenedorTecla = document.createElement("div");
    contenedorTecla.classList.add("teclas");

    target.textContent = "";
    
    teclas.forEach(tecla => {
        if (tecla.tipo == tipo)
            contenedorTecla.innerHTML += `<button class="teclas__item ${tecla.clase}" data-simbolo="${tecla.letra}"><span>${tecla.letra}</span></button>`;
    });

    target.appendChild(contenedorTecla);
    console.log( target );
}

export default obtenerDatos;