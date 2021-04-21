const limpiarSVG = ( texto ) => {
    let expresion = /((\<script\D?)+[^\<]*(\<\/script?\D|\>?)*)/gim;
    return texto.replace( expresion, "" );
}

export { limpiarSVG };