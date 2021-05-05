/**
 * 
 * @param {any} objeto 
 * @returns any
 */

const evaluar = (objeto) => {
    return Object.prototype.toString.call(objeto);
}

/**
 * 
 * @param {*} objeto 
 * @returns boolean
 */
const isObject = (objeto) => {
    return evaluar(objeto) === "[object Object]";
}

/**
 * 
 * @param {*} objeto 
 * @returns boolean
 */
const isFunction = (objeto) => {
    return typeof objeto === "function";
}

/**
 * 
 * @param {*} object 
 * @returns boolean
 */
const isString = (object) => {
    return typeof object === "string";
}

/**
 * 
 * @param {*} object 
 * @returns boolean
 */
const isNodeList = (object) => {
    return evaluar(object) === "[object NodeList]";
}

/**
 * 
 * @param {any} objeto 
 * @returns boolean
 */
const isHTML = (objeto) => {
    const expresion = /(HTML|Element)/g;
    const texto = evaluar(objeto);
    const encontrado = texto.match(expresion);

    let tipo = "";
    if ( encontrado ) {
        tipo = encontrado.join("");
    }

    return tipo === "HTMLElement";
}

const isNull = (object) => {
    return evaluar(object) === "[object Null]";
}

export {
    isObject,
    isFunction,
    isString,
    isNodeList,
    isHTML,
    isNull
};