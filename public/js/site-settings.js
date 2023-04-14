const Site = {
    vhhack: function() {
        /**
         * 100VH hack
         */
        // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
        var vh = window.innerHeight * 0.01;
        // Then we set the value in the --vh custom property to the root of the document
        document.documentElement.style.setProperty('--vh', vh+'px');
    },

    init: function() {
        Site.vhhack();
    }
}

Site.init();