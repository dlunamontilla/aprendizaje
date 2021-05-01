const pestannas = (selector = "#pestannas") => {
    const menu = document.querySelector(selector);
    if (!menu) return;

    const audio = document.createElement("audio");

    menu.addEventListener("mouseover", (e) => {
        const { sonido } = e.target.dataset;
        if ( !sonido ) return;

        audio.setAttribute("src", sonido);
        audio.play();
    });
}

export default pestannas;