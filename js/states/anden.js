/**
 * Cantidad de vagones que vamos a mostrar en el juego.
 */
var cantVagones = 2;

/**
 * Limite que va a tener la pantalla dependiendo de la cantidad de vagones que inicialicemos
 */
var bounds;

/**
 * Puede moverse?
 */
var emilioCanMove;

var Anden = function(game, trainSprite, floorSprite){
    //  We're going to be using physics, so enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.world.setBounds(0, 0, bounds, 600);
    
    var sky = game.add.sprite(0, 0, 'sky');

    sky.fixedToCamera = true;
    
    this.train = new Tren(game);

    // Here we create the ground.
    this.floor = game.add.sprite(0, 536, 'floor');
    
    this.floor.fixedCamera = true;
    
    //  We need to enable physics on the player
    game.physics.arcade.enable(this.floor);

    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    this.floor.scale.setTo(536, 536);

    //  This stops it from falling away when you jump on it
    this.floor.body.immovable = true;
    
    this.cartel = game.add.sprite(50, 336, 'cartel');
    
    return this;

};

var Tren = function(game){
    var vagon;
    this.tren = {};
    this.tren.vagones = {};
    game.physics.startSystem(Phaser.Physics.ARCADE);
    
    this.tren.locomotora = game.add.sprite(0, 0, 'locomotora');
    game.physics.enable(this.tren.locomotora, Phaser.Physics.ARCADE);
    
    var width = this.tren.locomotora.body.width;
    for (var i=2;i<=(cantVagones+1);i++)
    { 
        vagon = game.add.sprite(width, 0, 'vagon'+i);
        game.physics.enable(vagon, Phaser.Physics.ARCADE);
        width += vagon.body.width;
        this.tren.vagones['vagon'+i] = vagon;
    }
    
    bounds = width;
    return this.tren;
};

States.AndenState = function(game){};

States.AndenState.prototype = {
    

    preload : function(){
        
    },
    
    create : function(){
    	emilioCanMove = true;
    	
        // Creamos el anden
        this.anden = new Anden(this, 'tren', 'floor');
        
        //  Our controls.
        this.cursors = this.input.keyboard.createCursorKeys();
        
        //Creamos a Emilio
        this.emilio = new Emilio(this, 'emilio');
        
        // Hacemos que la camara siga a Emilio a donde vaya
        this.camera.follow(this.emilio);
        
        this.pared = new Pared(this, 'pared', bounds);
    },
    
    update : function(){
        this.physics.arcade.collide(this.emilio, this.pared);
        if ((this.emilio.x) < 0){
            this.state.start('EstacionState'); 
        }
        //Esta Emilio en el piso?
        var isEmilioOnTheFloor = this.physics.arcade.collide(this.emilio, this.anden.floor);
        
        //Emilio solamente se mueve si esta en el piso.
        if  (isEmilioOnTheFloor && emilioCanMove){
            if (this.cursors.up.isDown)
            {
                var marcoIzq = this.anden.train.vagones.vagon2.x + 200;
                var marcoDer = this.anden.train.vagones.vagon2.x + 255;
                if ((this.emilio.x > marcoIzq) && (this.emilio.x < marcoDer)){
                	emilioCanMove = false;
                	var emilio = this.emilio;
                	emilio.body.velocity.x = 0;
                    this.emilio.loadTexture('emilioEspaldas');
                    setTimeout(function(){
                    	emilio.body.velocity.x = 0;
                        emilio.body.velocity.y = -200;
                        setTimeout(function(){
                        	emilio.body.velocity.x = 0;
                            emilio.body.velocity.y = -200;
                            setTimeout(function(){
                                game.state.start('VagonState');
                            }, 500);
                        }, 500);
                    }, 500);
                    
                }else{
                    this.emilio.jump();    
                }
            }
            else if (this.cursors.right.isDown)
            {
                this.emilio.shutUp();
                //Move to the right
                this.emilio.moveRight();
            }else if (this.cursors.left.isDown)
            {
                this.emilio.shutUp();
                //Move to the left
                this.emilio.moveLeft();
            }else{
                this.emilio.stand();
            }
        }
    }

};

game.state.add('AndenState',States.AndenState);