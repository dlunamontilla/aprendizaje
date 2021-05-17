/**
 * 
 * @param {any} objeto 
 * @returns any
 */

const evaluar = (objeto) => {
    return Object.prototype.toString.call(objeto);
};

/**
 * 
 * @param {*} objeto 
 * @returns boolean
 */
const isObject = (objeto) => {
    return evaluar(objeto) === "[object Object]";
};

/**
 * 
 * @param {*} objeto 
 * @returns boolean
 */
const isFunction = (objeto) => {
    return typeof objeto === "function";
};

/**
 * 
 * @param {*} object 
 * @returns boolean
 */
const isString = (object) => {
    return typeof object === "string";
};

/**
 * 
 * @param {*} object 
 * @returns boolean
 */
const isNodeList = (object) => {
    return evaluar(object) === "[object NodeList]";
};

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
    if (encontrado) {
        tipo = encontrado.join("");
    }

    return tipo === "HTMLElement";
};

/**
 * 
 * @param {any} any 
 * @returns boolean
 */
const isNull = (any) => {
    return evaluar(any) === "[object Null]";
};

/**
 * 
 * @param {any} any 
 * @returns boolean
 */
const isLabel = (any) => {
    return evaluar(any) === "[object HTMLLabelElement]";
};

/**
 * 
 * @param {any} any 
 * @returns boolean
 */
const isAudio = (any) => {
    return evaluar(any) === "[object HTMLAudioElement]";
};


/**
 * 
 * @param {any} any 
 * @returns boolean
 */
const isButton = (any) => {
    return evaluar(any) === "[object HTMLButtonElement]";
};

/**
 * 
 * @param {any} any 
 * @returns boolean
 */
const isInput = (any) => {
    return evaluar(any) === "[object HTMLInputElement]";
};


/**
 * 
 * @param {any} any 
 * @returns boolean
 */
const isCheckbox = (any) => {
    if (!isInput(any))
        return false;

    return any.getAttribute("type") === "checkbox";
};

/**
 * 
 * @param {any} any 
 * @returns boolean
 */
const isDefined = (any) => {
    return typeof any !== "undefined";
}

export {
    isObject,
    isFunction,
    isString,
    isNodeList,
    isHTML,
    isNull,
    isLabel,
    isAudio,
    isButton,
    isInput,
    isCheckbox,
    isDefined
};