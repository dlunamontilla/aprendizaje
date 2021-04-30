const seleccionarPestanna = (elementos, tipo) => {
    const nodo = Object.prototype.toString.call(elementos);

    if ( typeof tipo !== "string" )
        return;

    console.log( nodo );

    elementos.forEach(button => {
        button.classList.remove("pestannas__button--seleccionado");
        
        const dataset = button.dataset;
        if (dataset.tipo && dataset.tipo == tipo) {
            button.classList.add("pestannas__button--seleccionado");
        }
    });
};

export default seleccionarPestanna;