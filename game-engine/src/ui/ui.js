goog.provide('game.ui.ui');

game.ui.ui._images = {};
game.ui.ui._imagesWaiting = 0;

game.ui.ui.preloadImage = function(url) {
    if(game.ui.ui._images[url] == null) {
        game.ui.ui._imagesWaiting++;
        game.ui.ui._images[url] = new Image();
        game.ui.ui._images[url].onload = game.ui.ui.imageLoaded;
        game.ui.ui._images[url].src = url;
    }
};

game.ui.ui.imageLoaded = function(url) {
    game.ui.ui._imagesWaiting--;
};

game.ui.ui.imagesLoading = function() {
    return game.ui.ui._imagesWaiting > 0;
};

game.ui.ui.getDOMStyleCache = function(domObject) {
    if (domObject.savedStyle === undefined || domObject.savedStyle === null) {
        domObject.savedStyle = {};
    }
    return domObject.savedStyle;
};
