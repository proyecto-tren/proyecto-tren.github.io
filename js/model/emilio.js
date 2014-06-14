Emilio = function(game, sprite, x ,y){
    if(x === undefined) x = 100;
    if(y === undefined) y = 200;
    // The player and its settings
    var emilio = game.add.sprite(x, y, sprite);
    emilio.dialog = new Dialog(game, emilio);
    //  We need to enable physics on the player
    game.physics.arcade.enable(emilio);

    emilio.body.gravity.y = 500;
    emilio.body.collideWorldBounds = false;
    
    emilio.jump = function(){
        emilio.body.velocity.y = -250;
    };
    
    emilio.moveLeft = function(){
        emilio.body.velocity.x = -400;
    };
    
    emilio.moveRight = function(){
        emilio.body.velocity.x = 400;
    };
    
    emilio.stand = function(){
        emilio.body.velocity.x = 0;
    };
    
    emilio.say = function(contentKey){
        emilio.dialog.say(contentKey);
    };
    
    emilio.shutUp = function(contentKey){
        emilio.dialog.shutUp()
    }
    
    emilio.isTalking = function(){
        return emilio.dialog.isTalking()
    }
    
    return emilio;
};