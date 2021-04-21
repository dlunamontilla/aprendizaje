const crearAudio = (url) => {
    const audio = document.createElement("audio");
    if (!url) return audio;
    const mp3 = /(\.mp3)$/gi

    
    if (!mp3.test(url)) return audio;
    audio.setAttribute("src", url);
    audio.setAttribute("preload", "");
    audio.volume = 1;
    return audio;
}

export default crearAudio;