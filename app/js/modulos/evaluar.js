const evaluar = (objeto) => {
    return Object.prototype.toString.call(objeto);
}

const isObject = (objeto) => {
    return evaluar(objeto) === "[object Object]";
}

const isFunction = (objeto) => {
    return typeof objeto === "function";
}

const isString = (object) => {
    return typeof object === "string";
}

export { isObject, isFunction, isString };