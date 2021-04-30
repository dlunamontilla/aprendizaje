if ('serviceWorker' in navigator) {
    function awaitDataLayer(callback) {
        if (window.dataLayer) return callback();
        var interval = setInterval(function () {
            if (window.dataLayer) {
                clearInterval(interval);
                return callback();
            }

            return null;
        }, 100);
    }

    window.addEventListener('appinstalled', function () {
        awaitDataLayer(function () {
            dataLayer.push({
                'event': 'homescreen-pwa-installed',
                'eventCategory': 'Home screen PWA',
                'eventAction': 'Installed',
                'eventLabel': location.href
            });
        });
    });
    
    if (location.href.indexOf('?./') > -1) {
        awaitDataLayer(function () {
            dataLayer.push({
                'event': 'homescreen-pwa-open',
                'eventCategory': 'Home screen PWA',
                'eventAction': 'Open',
                'eventLabel': location.href
            });
        });
    }
}