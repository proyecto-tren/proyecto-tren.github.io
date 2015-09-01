var MoscaVoladora = function(game, sprite){
	this.x = game.world.randomX;
	this.y = game.world.randomY;
	this.minSpeed = 100;
	this.maxSpeed = 200;
	this.vx = Math.random()*(this.maxSpeed - this.minSpeed+1)-this.minSpeed;
	this.vy = Math.random()*(this.maxSpeed - this.minSpeed+1)-this.minSpeed;
	
	this.moscaSprite = game.add.sprite(this.x,this.y,sprite);
	game.physics.arcade.enable(this.moscaSprite);
	this.moscaSprite.isAlive = true;
	this.moscaSprite.enableBody = true;
	this.moscaSprite.inputEnabled = true;
	
    this.moscaSprite.anchor.setTo(0.5, 1);
	this.moscaSprite.body.collideWorldBounds = true;
	this.moscaSprite.body.bounce.setTo(1, 1);
	this.moscaSprite.body.velocity.x = this.vx;
	this.moscaSprite.body.velocity.y = this.vy;
	this.moscaSprite.body.immovable = true;
	
	this.moscaSprite.events.onInputDown.add(function(mosca){
        if (mosca.isAlive){
            mosca.angle = 180;
            mosca.body.velocity.x = 0;
            mosca.body.velocity.y = 0;
            mosca.body.gravity.y = 2000;
            mosca.body.bounce.setTo(0, 0);
            setTimeout(function(){
                mosca.kill();
            },500);    
        }
		mosca.isAlive = false;
	},this);
	
	return this.moscaSprite;
};

var Mosquita = function(game, sprite){
	this.minSpeed = 0;
	this.maxSpeed = 300;
	this.vx = Math.random()*(this.maxSpeed - this.minSpeed+1)-this.minSpeed;
	this.vy = 0;

	this.moscaSprite = game.add.sprite(0,0,sprite);
	game.physics.arcade.enable(this.moscaSprite);
	this.moscaSprite.enableBody = true;

    this.moscaSprite.anchor.setTo(0.5, 1);
	this.moscaSprite.body.collideWorldBounds = true;
	this.moscaSprite.body.bounce.setTo(1, 1);
	this.moscaSprite.body.velocity.x = this.vx;
	this.moscaSprite.body.velocity.y = this.vy;
	this.moscaSprite.body.immovable = true;
	this.moscaSprite.scale.x = -1;
	return this.moscaSprite;
};