const teclado = (selector) => {
    const caracterContainer = document.querySelector(selector);

    console.clear();
    console.log( caracterContainer);

    console.log( "Datos =>", selector );
    if ( caracterContainer )
        caracterContainer.classList.toggle("caracter--show");
};

export default teclado;