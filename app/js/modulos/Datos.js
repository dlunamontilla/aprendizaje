// const Datos = () => {
//     // {{([^}]*)}}
// }


class Datos {
    constructor( selector = "#app" ) {
        this.claves = /{{([^}]*)}}/g;

        this.eliminarLlaves = (content) => {
            return content.replace(/([\{\}])/g, "").trim();
        }

        this.app = document.querySelector(selector);

        // Contenido de prueba
        this.variables = {}

        this.tokens = [];

        this.content = this.app.innerHTML;

        // Extraer las variables establecidas entre llaves
        // en el código HTML:
        this.extraerDatos = () => {
            const datosExtraidos = this.content;

            if ( !datosExtraidos.length > 0 )
                return this.tokens;

            const expresiones = datosExtraidos.match(this.claves);
            if ( ! Array.isArray(expresiones) )
                return this.tokens;

            expresiones.forEach(expresion => {
                this.tokens.push({
                    expresion: expresion,
                    propiedad: this.eliminarLlaves( expresion )
                });
            });
        }

        this.procesarExpresiones = () => {
            this.tokens.forEach(token => {
                if ( typeof this.variables[token.propiedad] === "undefined" )
                    throw new TypeError("Debe definir " + "\"" + token.propiedad + "\""+ " para poder usarla")
    
                this.content = this.content.replace(token.expresion, this.variables[token.propiedad]);
            });
    
            this.app.innerHTML = this.content;
        }

        this.init = () => {
            // Al llamar este método extraerá los datos entre llaves del código
            // HTML para posteriormente reemplazarlos:
            this.extraerDatos();
            this.procesarExpresiones();
        }
    }

    render(fn) {
        if ( !typeof fn === "function" )
            return;

        this.variables = fn();
        this.init();
    }
}

export default Datos;