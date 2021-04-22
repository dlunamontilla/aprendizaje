import teclado from "./teclado.js";

const menu = (selector) => {
    const menus = document.querySelectorAll( selector );

    menus.forEach(menu => {
        menu.addEventListener("click", (e) => {
            e.preventDefault();
            const href = menu.getAttribute("href");
            teclado(href);
        }, false);
    });
}

export default menu;