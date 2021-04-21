const elementos = ( _selector ) => {
  return document.querySelectorAll( _selector );
};

const elemento = ( _selector ) => {
  return document.querySelector( _selector );
};

export { elemento, elementos };