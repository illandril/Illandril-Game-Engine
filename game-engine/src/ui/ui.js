goog.provide('illandril.game.ui.ui');

illandril.game.ui.ui._images = {};
illandril.game.ui.ui._imagesWaiting = 0;

illandril.game.ui.ui.preloadImage = function(url) {
    if(illandril.game.ui.ui._images[url] == null) {
        illandril.game.ui.ui._imagesWaiting++;
        illandril.game.ui.ui._images[url] = new Image();
        illandril.game.ui.ui._images[url].onload = illandril.game.ui.ui.imageLoaded;
        illandril.game.ui.ui._images[url].src = url;
    }
};

illandril.game.ui.ui.imageLoaded = function(url) {
    illandril.game.ui.ui._imagesWaiting--;
};

illandril.game.ui.ui.imagesLoading = function() {
    return illandril.game.ui.ui._imagesWaiting > 0;
};

illandril.game.ui.ui.getDOMStyleCache = function(domObject) {
    if (domObject.savedStyle === undefined || domObject.savedStyle === null) {
        domObject.savedStyle = {};
    }
    return domObject.savedStyle;
};
