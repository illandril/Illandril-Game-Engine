goog.provide('game.ui');

game.ui._images = {};
game.ui._imagesWaiting = 0;

game.ui.preloadImage = function(url) {
    if(game.ui._images[url] == null) {
        game.ui._imagesWaiting++;
        game.ui._images[url] = new Image();
        game.ui._images[url].onload = game.ui.imageLoaded;
        game.ui._images[url].src = url;
    }
};

game.ui.imageLoaded = function(url) {
    game.ui._imagesWaiting--;
};

game.ui.imagesLoading = function() {
    return game.ui._imagesWaiting > 0;
};

game.ui.getDOMStyleCache = function(domObject) {
    if (domObject.savedStyle === undefined || domObject.savedStyle === null) {
        domObject.savedStyle = {};
    }
    return domObject.savedStyle;
};
