var Pared = function(game, sprite, x, y){
    if (y === undefined) y = 0;
    
    var pared;

    pared = game.add.sprite(x, y, sprite);

    game.physics.arcade.enable(pared);

    //  This stops it from falling away when you jump on it
    pared.body.immovable = true;
    
    return pared;
};