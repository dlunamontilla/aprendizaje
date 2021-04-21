# Conozaca las letras

Este es un juego destinado a niños pequeños para que se conozcan las letras del alfabeto en español. En la medida que la aplicación vaya envejeciendo irá madurando, a la vez, que tendrá nuevas funciones.

Esta aplicación utiliza una herramienta denominada Datos para `renderizar` contenido y su utilización es básica.

Si desea seleccionar un elemento HTML diferente al que selecciona por defecto (`#app`):

```js
const datos = new Datos("#selector");
datos.render(() => {
  return {
    variable: "Valor de una variable",
  };
});
```

Para ser utilizado en:

``` html
<div id="selector">
    <h1>{{ variable }}</h1>
</div>
```
Que terminaría renderizado así:

``` html
<div id="selector">
    <h1>Valor de una variable</h1>
</div>
```

De lo contrario lo podrías definir así:

```js
const datos = new Datos;
datos.render(() => {
  return {
    variable: "Valor de una variable",
  };
});
```

Para ser utilizado en:

``` html
<div id="app">
    <h1>{{ variable }}</h1>
</div>
```

Que terminaría renderizado así:

``` html
<div id="app">
    <h1>Valor de una variable</h1>
</div>
```

Tome en cuenta que todo lo que esté dentro del elemento seleccionado por `Datos` será renderizado.