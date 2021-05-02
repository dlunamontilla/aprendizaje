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

export { isObject, isFunction, isString, isNodeList };