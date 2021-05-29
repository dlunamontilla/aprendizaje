/**
 * @param {string} _selector
 * @returms NodeList
 */
const elementos = ( _selector ) => {
  return document.querySelectorAll( _selector );
};

/**
 * @param {string} _selector
 * @return HTMLElement
 */
const elemento = ( _selector ) => {
  return document.querySelector( _selector );
};

export { elemento, elementos };