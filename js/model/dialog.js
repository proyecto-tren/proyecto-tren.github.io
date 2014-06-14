Dialog = function(game, sprite){
    this.game = game;
    this.sprite = sprite;
    this.dialog = null;
    this.content = null;
};

Dialog.prototype = {
    isTalinkg: function(){
        return (this.dialog !== null);
    },
    
    say: function (contentKey, isText) {
        this.x = this.sprite.x;
        this.y = this.sprite.y - 100;
        if (this.dialog === null){
            this.dialog = this.game.add.sprite(this.x, this.y, 'dialog');
        }
        if (this.content) this.content.destroy();
        if ((isText === undefined) || (isText === false)){
            this.content = this.game.add.sprite(this.x +40, this.y +30, contentKey);    
        }else{
            this.content = this.game.add.text(this.x +40, this.y +30, contentKey);
            this.content.fontSize = 20;
        }
        

    },
    
    shutUp: function(){
        if (this.dialog !== null){
            this.dialog.destroy();
            this.dialog = null;
        }
        if (this.content !== null){
            this.content.destroy();
            this.content = null;
        }
        
    }
    
};
