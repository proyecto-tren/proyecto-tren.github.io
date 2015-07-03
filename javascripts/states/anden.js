/**
 * Cantidad de vagones que vamos a mostrar en el juego.
 */
var cantVagones = 2;

/**
 * Limite que va a tener la pantalla dependiendo de la cantidad de vagones que
 * inicialicemos
 */
var bounds;



var Anden = function(game, trainSprite, floorSprite) {
	// We're going to be using physics, so enable the Arcade Physics system
	game.physics.startSystem(Phaser.Physics.ARCADE);

	game.world.setBounds(0, 0, bounds, 600);

	/*var sky = game.add.sprite(0, 0, 'sky');

	sky.fixedToCamera = true;*/

	this.train = new Tren(game);

	// Here we create the ground.
	this.floor = new Pared(game, 'pared', 0, 590);
	this.floor.angle = 90;
	this.floor.scale.setTo(3200, 0);
	game.physics.arcade.enable(this.floor);

	this.cartel = game.add.sprite(50, 380, 'cartel');

	return this;

};

var Tren = function(game) {
	
	game.physics.startSystem(Phaser.Physics.ARCADE);
	this.tren = game.add.sprite(0, 0, 'trenyfondo');
	/*
	var vagon;
	this.tren = {};
	this.tren.vagones = {}; 
	this.tren.locomotora = game.add.sprite(0, 0, 'locomotora');
	game.physics.enable(this.tren.locomotora, Phaser.Physics.ARCADE);

	var width = this.tren.locomotora.body.width;
	for (var i = 2; i <= (cantVagones + 1); i++) {
		vagon = game.add.sprite(width, 0, 'vagon' + i);
		game.physics.enable(vagon, Phaser.Physics.ARCADE);
		width += vagon.body.width;
		this.tren.vagones['vagon' + i] = vagon;
	}*/

	bounds = this.tren.width;
	return this.tren;
};

States.AndenState = function(game) {
	this.game = game;
};

States.AndenState.prototype = {

	preload : function() {
	},

	create : function() {
		emilioCanMove = true;

		// Creamos el anden
		this.anden = new Anden(this, 'tren', 'floor');

		// Our controls.
		this.cursors = this.input.keyboard.createCursorKeys();
		
		// Creamos al guardia
		this.guardia = game.add.sprite(2960, 0, 'guardianormal');
		
		this.guardiaenojado = game.add.sprite(2960, 0, 'guardiaenojado');
		this.guardiaenojado.alpha = 0;
		
		this.guardiacontento = game.add.sprite(3030, 0, 'guardiacontento');
		this.guardiacontento.alpha = 0;

		// Creamos a Emilio
		this.emilio = (ultimoEstado == 'VagonState') ? new Emilio(this.game, 2960) : new Emilio(this.game);

		// Hacemos que la camara siga a Emilio a donde vaya
		this.camera.follow(this.emilio);

		this.pared = new Pared(this, 'pared', bounds);

		__load_layout();
	},

	update : function() {
		this.physics.arcade.collide(this.emilio, this.pared);
		if ((this.emilio.x) < 0) {
			transitions.to('EstacionState');
		}
		// Esta Emilio en el piso?
		var isEmilioOnTheFloor = this.physics.arcade.collide(this.emilio,
				this.anden.floor);

		// Emilio solamente se mueve si esta en el piso.
		if (isEmilioOnTheFloor && emilioCanMove) {
			if (this.emilio.x > (this.guardia.x - 100)){
			    game.add.tween(this.guardia).to( { alpha: 0 }, 100, Phaser.Easing.Linear.Out, true, 0, -1);
			    
			    if (ganoMinijuegoPuzzle) {
			    	game.add.tween(this.guardiacontento).to( { alpha: 1 }, 100, Phaser.Easing.Linear.None, true, 0, -1);
			    }else{
			    	game.add.tween(this.guardiaenojado).to( { alpha: 1 }, 100, Phaser.Easing.Linear.None, true, 0, -1);
			    }
			}
			if (this.cursors.up.isDown || keyboard.isUpPressed()) {
				var marcoIzq = 2900;
				var marcoDer = 3130;
				
				if ((this.emilio.x > marcoIzq) && (this.emilio.x < marcoDer)/* && ganoMinijuegoPuzzle*/) {
					//TODO: SACAR COMENTARIO UNA VEZ EN PRODUCCION.
					emilioCanMove = false;
					var emilio = this.emilio;
					emilio.body.velocity.x = 0;
					emilio.animations.stop();
					this.emilio.loadTexture('emilioEspaldas');
					transitions.to('VagonState');
					
					/*setTimeout(function() {
						emilio.body.velocity.x = 0;
						emilio.body.velocity.y = -200;
						setTimeout(function() {
							emilio.body.velocity.x = 0;
							emilio.body.velocity.y = -200;
							setTimeout(function() {
								transitions.to('VagonState');
							}, 500);
						}, 500);
					}, 500);*/
					

				} else {
					this.emilio.jump();
				}
			} else if (this.cursors.right.isDown || keyboard.isRightPressed()) {
				this.emilio.shutUp();
				// Move to the right
				this.emilio.moveRight();
			} else if (this.cursors.left.isDown || keyboard.isLeftPressed()) {
				this.emilio.shutUp();
				// Move to the left
				this.emilio.moveLeft();
			} else {
				this.emilio.stand();
			}
		}
	},
	render: function() {
    	//game.debug.inputInfo(16, 16);
	}

};

game.state.add('AndenState', States.AndenState);