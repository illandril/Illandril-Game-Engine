goog.provide('game.ui.spriteSheet');

goog.require('game.ui');

game.ui.spriteSheet = function(url, offset, sheetSize, tileSize) {
    game.ui.preloadImage(url);
    this.url = url;
    this.offset = offset || new Box2D.Common.Math.b2Vec2(0, 0);
    this.sheetSize = sheetSize || new Box2D.Common.Math.b2Vec2(1, 1);
    this.tileSize = tileSize || new Box2D.Common.Math.b2Vec2(1, 1);
    this.tile = new Box2D.Common.Math.b2Vec2(1, 1);
};

game.ui.spriteSheet.prototype.setTile = function(tile) {
    this.tile = new Box2D.Common.Math.b2Vec2(tile ? tile.x : 1, tile ? tile.y : 1);
    this.tile.x = this.tile.x % this.sheetSize.x;
    this.tile.y = this.tile.y % this.sheetSize.y;
    if (this.tile.x === 0) {
        this.tile.x = this.sheetSize.x;
    }
    if (this.tile.y === 0) {
        this.tile.y = this.sheetSize.y;
    }
};

game.ui.spriteSheet.prototype.updateDOM = function(domObject) {
    var tileChange = false;
    var savedStyle = game.ui.getDOMStyleCache(domObject);
    if (savedStyle.bg != this.url) {
        savedStyle.bg = this.url;
        domObject.style.backgroundImage = 'url(' + this.url + ')';
        domObject.style.backgroundColor = 'transparent';
        tileChange = true;
    } else {
        if (savedStyle.bgPosX != this.tile.x || savedStyle.bgPosY != this.tile.y) {
            tileChange = true;
        }
    }
    
    if (tileChange) {
        savedStyle.bgPosX = this.tile.x;
        savedStyle.bgPosY = this.tile.y;
        domObject.style.backgroundPosition = ((this.offset.x + (this.tile.x - 1) * this.tileSize.x) * -1) + 'px ' + ((this.offset.y + (this.tile.y - 1) * this.tileSize.y) * -1) + 'px';
    }
};